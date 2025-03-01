import { Response } from "express";
import express from "express";
import { checkAccessToken } from "../middlewares/auth_middleware";
import { AuthUserRequest } from "../types/app.type";
import { redisClient } from "../configs/redis";
import { logger } from "../helpers/logging/logger";
import { checkVideoParamsMiddelware } from "../middlewares/check_create_video_params_middleware";
import chalk from "chalk";
import supabase from "../configs/supabase";

const videoRenderRouter = express.Router();

videoRenderRouter.post(
  "/create-video",
  checkAccessToken,
  checkVideoParamsMiddelware,
  async (req: AuthUserRequest, res: Response) => {
    try {
      // Check 1 Redis -> if video has already been created
      const { user, renderQueueId, scale } = req.body;

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

      // Check 2 Database -> fetch on database if video is already created
      const [{ data }, { data: statusData }] = await Promise.all([
        supabase
          .from("video_chunk")
          .select("chunk_name, chunk_bucket_id")
          .eq("video_id", renderQueueId!)
          .throwOnError(),
        supabase
          .from("video_render")
          .select("status")
          .eq("id", renderQueueId!)
          .single()
          .throwOnError(),
      ]);

      if (data && data.length > 0 && statusData?.status === "completed") {
        const videoLink = data.map(
          (video) =>
            supabase.storage
              .from(video.chunk_bucket_id)
              .getPublicUrl(video.chunk_name).data.publicUrl
        );

        res.status(200).json({
          message: "Video has already been created.",
          url: videoLink,
        });
        return;
      }

      // render:user exist while video is rendering -> allow 1 user create 1 video at a time !
      // 1. exist -> not allow to create video
      // 2. not exist -> allow to create video
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
        redisClient.hSet(`render:user-${userId}`, {
          status: "rendering",
          scale: scale!.toString(),
        }),
        redisClient.set(
          `video:user-${userId}:render-${renderQueueId}`,
          "start"
        ),
      ]);
      logger.info(
        `User ${chalk.blue(user.email?.split("@")[0])} video has started rendering`
      );

      res.json({
        message: "Video has started rendering. Please wait.",
      });
    } catch (error) {
      logger.error(`Error request creating video: ${(error as Error).message}`);
      logger.error(`Stack ${(error as Error).stack}`);
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
);

export default videoRenderRouter;

/* A USER CAN ONLY REQUEST 1 VIDEO AT A TIME

1. client
  - user send request creat video
  - client create a row 
    - in message table -> video + metadata{status: pending}
    - in video render table
  - client system send to server {userId, renderQueueId}
2. server - HSET
  - 1 user create 1 video at a time -> redis save `video:${userId}` with {status, type, renderQueueId}
  - if user send another video request type -> confirm at client side
    - yes -> delete old request -> create new video request
    - no -> reject request  
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
