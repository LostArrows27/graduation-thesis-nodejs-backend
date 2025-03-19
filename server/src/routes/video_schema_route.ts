/* eslint-disable @remotion/deterministic-randomness */
import { Response } from "express";
import express from "express";
import { checkAccessToken } from "../middlewares/auth_middleware";
import {
  CreateSchemaRequest,
  EditSchemaRequest,
  PersonImage,
} from "../types/app.type";
import { logger } from "../helpers/logging/logger";
import { checkCreateSchemaParamsMiddleware } from "../middlewares/check_create_schema_params_middleware";
import supabase from "../configs/supabase";
import { ImageMetaData } from "../types/database.type";
import { groupImageByLabel } from "../helpers/images/image_grouping";
import { categorizedImage } from "../helpers/redis/update_unlabel_image";
import GeminiService from "../service/gemini_service";
import { checkEditSchemaParamsMiddleware } from "../middlewares/check_edit_schema_params_middleware";
import {
  getRandomAssetByDate,
  getSeasonFromDate,
} from "../remotion/utils/seasonal-helper";
import { fromSeasonToDate } from "../helpers/timer/from_season_to_date";
import { renderVideoThumbnail } from "../helpers/remotion/remotion_render";
import { generateVideoInputSchema } from "../helpers/remotion/generate_video_schema";

const schemaRouter = express.Router();

schemaRouter.post(
  "/create",
  checkAccessToken,
  checkCreateSchemaParamsMiddleware,
  async (req: CreateSchemaRequest, res: Response) => {
    try {
      // delete old image queue + add imageIdList -> video_image
      const { imageIdList, renderQueueId, user } = req.body;

      await supabase
        .from("video_image")
        .delete()
        .eq("video_id", renderQueueId!)
        .throwOnError();

      await supabase
        .from("video_image")
        .insert(
          imageIdList!.map((imageId) => ({
            video_id: renderQueueId!,
            image_id: imageId!,
          }))
        )
        .throwOnError();

      // fetch all image from image

      const { data } = await supabase
        .from("video_image")
        .select("image_id, image(id, image_name, image_bucket_id, labels)")
        .eq("video_id", renderQueueId!)
        .throwOnError();

      const imageList = data?.map((image) => ({
        ...image.image,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })) as ImageMetaData[];

      const imageListProcessed = await categorizedImage(imageList);

      // create schema + update on database

      const imageJSON = groupImageByLabel(imageListProcessed);

      const videoSchema = generateVideoInputSchema(imageJSON);

      // get AI caption
      const getAICaption = async () => {
        const [contentWithAICaption, thumbnailUrl] = await Promise.all([
          GeminiService.generateCaptionForVideo(videoSchema.contentScene),
          renderVideoThumbnail(videoSchema, renderQueueId!, user.id),
        ]);

        return { contentWithAICaption, thumbnailUrl };
      };

      // get top 4 face
      const getFaceImage = async () => {
        const { data: faceData } = await supabase
          .from("person")
          .select(
            "image_id, cluster_id, coordinate, image(image_name, image_bucket_id), cluster_mapping(name)"
          )
          .in("image_id", imageIdList!)
          .returns<PersonImage>()
          .throwOnError();

        const clusterGroups: Record<string, PersonImage> = {};

        faceData?.forEach((person) => {
          if (!person.cluster_id) return;

          if (!clusterGroups[person.cluster_id]) {
            clusterGroups[person.cluster_id] = [];
          }
          clusterGroups[person.cluster_id].push(person);
        });

        Object.entries(clusterGroups).forEach(([clusterId, persons]) => {
          if (persons.length <= 1) {
            delete clusterGroups[clusterId];
          }
        });

        const sortedClusters = Object.entries(clusterGroups)
          .map(([clusterId, persons]) => ({
            clusterId,
            persons,
            count: persons.length,
          }))
          .sort((a, b) => b.count - a.count);

        const topClusters = sortedClusters.slice(0, 4);

        const faces = topClusters.map((cluster) => {
          const randomPerson =
            cluster.persons[Math.floor(Math.random() * cluster.persons.length)];

          return {
            image: supabase.storage
              .from(randomPerson.image.image_bucket_id)
              .getPublicUrl(randomPerson.image.image_name).data.publicUrl,
            name: randomPerson.cluster_mapping?.name || "Unknown",
            coordinate: (randomPerson.coordinate as number[]) || [0, 0, 0, 0],
            times: cluster.count,
          };
        });

        return {
          totalFaces: sortedClusters.length,
          faces,
        };
      };

      const [specialPartData, { contentWithAICaption, thumbnailUrl }] =
        await Promise.all([getFaceImage(), getAICaption()]);

      videoSchema.specialPart = specialPartData;
      videoSchema.contentScene = contentWithAICaption;

      await supabase
        .from("video_render")
        .update({
          schema: videoSchema,
          thumbnail_url: thumbnailUrl,
        })
        .eq("id", renderQueueId!)
        .throwOnError();

      // final String videoRenderId;
      // final String videoTitle;
      // final int titleStyle;
      // final String bgMusic;
      // final String bgVideoTheme;
      // final int maxDuration;

      const returnData = {
        videoRenderId: renderQueueId,
        videoTitle: videoSchema.introScene.firstScene.title,
        titleStyle: videoSchema.titleStyle,
        bgMusic: videoSchema.bgMusic,
        bgVideoTheme: getSeasonFromDate(new Date(Date.now())),
        maxDuration: videoSchema.maxDuration,
        thumbnailUrl,
        specialPart: specialPartData,
      };

      res
        .status(200)
        .json({ message: "Schema created successfully", data: returnData });
    } catch (error: unknown) {
      logger.error(`Error creating schema: ${(error as Error).message}`);
      logger.error(`Stack ${(error as Error).stack}`);
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
);

schemaRouter.post(
  "/edit",
  checkAccessToken,
  checkEditSchemaParamsMiddleware,
  async (req: EditSchemaRequest, res: Response) => {
    try {
      const { option, schema, renderQueueId } = req.body;

      schema!.introScene.firstScene.title = option.title;
      schema!.titleStyle = option.titleStyle;
      schema!.bgMusic = option.bgMusic;
      schema!.bgVideo.src = getRandomAssetByDate(
        fromSeasonToDate(option.bgVideoTheme),
        "videos"
      );
      schema!.maxDuration = option?.maxDuration;

      await supabase
        .from("video_render")
        .update({
          schema: schema!,
        })
        .eq("id", renderQueueId!)
        .throwOnError();

      const returnData = {
        videoRenderId: renderQueueId,
        videoTitle: schema!.introScene.firstScene.title,
        titleStyle: schema!.titleStyle,
        bgMusic: schema!.bgMusic,
        bgVideoTheme: option.bgVideoTheme,
        maxDuration: schema!.maxDuration,
      };

      res
        .status(200)
        .json({ message: "Schema edited successfully", data: returnData });
    } catch (error: unknown) {
      logger.error(`Error editing schema: ${(error as Error).message}`);
      logger.error(`Stack ${(error as Error).stack}`);
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
);

export default schemaRouter;
