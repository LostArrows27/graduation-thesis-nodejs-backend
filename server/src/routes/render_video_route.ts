import express, { Response } from "express";
import { checkAccessToken } from "../middlewares/auth_middleware";
import { AuthUserRequest, CreateSchemaRequest } from "../types/app.type";
import { redisClient } from "../configs/redis";
import { logger } from "../helpers/logging/logger";
import { checkVideoParamsMiddelware } from "../middlewares/check_create_video_params_middleware";
import chalk from "chalk";
import { checkCreateSchemaParamsMiddleware } from "../middlewares/check_create_schema_params_middleware";
import supabase from "../configs/supabase";
import { ImageMetaData } from "../types/database.type";
import { groupImageByLabel } from "../helpers/images/image_grouping";
import { generateVideoInputSchema } from "../helpers/remotion/process_video_input_props";
import { categorizedImage } from "../helpers/redis/update_unlabel_image";
import GeminiService from "../service/gemini_service";

const videoRouter = express.Router();

videoRouter.post(
  "/create-schema",
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

// TODO: add to HSET create-video-type -> "default" / "selected"

videoRouter.post(
  "/create-video",
  checkAccessToken,
  checkVideoParamsMiddelware,
  async (req: AuthUserRequest, res: Response) => {
    // Check if video has already been created
    const { user, renderQueueId } = req.body;

    const userId = user.id;

    const videoLink = await redisClient.get(
      `video:user-${userId}:render-${renderQueueId}`
    );

    if (videoLink && videoLink !== "start" && videoLink !== "rendering") {
      res.status(200).json({
        message: "Video has already been created.",
        url: videoLink.split(", "),
      });
      return;
    }

    // Check video process
    // in step 2 + 3, if video not done
    // -> so the set and hset not do yet
    const videoStatus = await redisClient.hGet(
      `render:user-${userId}`,
      "status"
    );

    if (videoStatus) {
      res.status(429).json({
        message: "Video is already being rendered. Please wait.",
      });
      return;
    }

    // Add video to render queue
    await Promise.all([
      redisClient.hSet(`render:user-${userId}`, "status", "rendering"),
      redisClient.set(`video:user-${userId}:render-${renderQueueId}`, "start"),
    ]);
    logger.info(
      `User ${chalk.blue(user.email?.split("@")[0])} video has started rendering`
    );

    res.json({
      message: "Video has started rendering. Please wait.",
    });
  }
);

export default videoRouter;

/* A USER CAN ONLY REQUEST 1 VIDEO AT A TIME

1. client
  - user send request creat video
  - system create a row 
    - in message table -> video + metadata{status: pending}
    - in video render table -> messageID (if video send in group)
  - system send to server {userId, renderQueueId}
2. server - HSET
  - 1 user create 1 video at a time -> redis save `video:${userId}` with {status, type, renderQueueId}
  - if user send another video request type -> confirm at client side
    - yes -> delete old request -> create new video request
    - no -> reject request  
  - video request type
    1. all image in group
    2. selected image (choose + uploaded) -> image array
3. cache video link
  - SET video:userID:renderQueueId videoLink (0 / https)
4. redis
  - HSET -> mark a user can only have 1 request at a time (status) -> delete after video created
    1. "status: rendering" -> start rendering
    2. disapear after video created
    -> why not use SET ?
    -> because worker is listen to SET
  - SET -> mark a video is created with link
    1. "start" -> start rendering
    2. "rendering" -> in progress
    3, "link" -> video link -> done
*/
