import { Response } from "express";
import express from "express";
import { checkAccessToken } from "../middlewares/auth_middleware";
import { CreateSchemaRequest, EditSchemaRequest } from "../types/app.type";
import { logger } from "../helpers/logging/logger";
import { checkCreateSchemaParamsMiddleware } from "../middlewares/check_create_schema_params_middleware";
import supabase from "../configs/supabase";
import { ImageMetaData } from "../types/database.type";
import { groupImageByLabel } from "../helpers/images/image_grouping";
import { generateVideoInputSchema } from "../helpers/remotion/process_video_input_props";
import { categorizedImage } from "../helpers/redis/update_unlabel_image";
import GeminiService from "../service/gemini_service";
import { checkEditSchemaParamsMiddleware } from "../middlewares/check_edit_schema_params_middleware";
import { getRandomAssetByDate } from "../remotion/utils/seasonal-helper";
import { fromSeasonToDate } from "../helpers/timer/from_season_to_date";

const schemaRouter = express.Router();

schemaRouter.post(
  "/create",
  checkAccessToken,
  checkCreateSchemaParamsMiddleware,
  async (req: CreateSchemaRequest, res: Response) => {
    try {
      // delete old image queue + add imageIdList -> video_image
      const { imageIdList, renderQueueId } = req.body;

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

      const contentWithAICaption = await GeminiService.generateCaptionForVideo(
        videoSchema.contentScene
      );

      videoSchema.contentScene = contentWithAICaption;

      await supabase
        .from("video_render")
        .update({
          schema: videoSchema,
        })
        .eq("id", renderQueueId!)
        .throwOnError();

      res
        .status(200)
        .json({ message: "Schema created successfully", data: videoSchema });
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

      res
        .status(200)
        .json({ message: "Schema edited successfully", data: schema });
    } catch (error: unknown) {
      logger.error(`Error editing schema: ${(error as Error).message}`);
      logger.error(`Stack ${(error as Error).stack}`);
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
);

export default schemaRouter;
