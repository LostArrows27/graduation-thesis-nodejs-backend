import express, { Response } from "express";
import { checkAccessToken } from "../middlewares/auth_middleware";
import { AuthUserRequest } from "../types/app.type";
import redisClient from "../configs/redis";
import { logger } from "../helpers/logging/logger";
import { wait } from "../helpers/timer/wait";
import supabase from "../configs/supabase";

const videoRouter = express.Router();

// TODO: add to HSET create-video-type -> "default" / "selected"

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
  - HSET -> mark a user is request a video with (status + process %) -> delete after video created
  - SET -> mark a video is created with link -> 0 if not created

*/
videoRouter.post(
  "/render",
  checkAccessToken,
  async (req: AuthUserRequest, res: Response) => {
    // 1. check params
    const { user, renderQueueId } = req.body;

    if (!renderQueueId) {
      res.status(400).json({ error: "renderQueueId is required" });
      return;
    }

    const { data } = await supabase
      .from("video_render")
      .select("*")
      .eq("id", renderQueueId)
      .single();

    if (!data) {
      res.status(400).json({ error: "Invalid renderQueueId" });
      return;
    }

    logger.warn(`${user.email} is requesting to render a video.`);

    // 2. check if video has already been created
    const userId = user.id;

    const videoLink = await redisClient.get(
      `video:user-${userId}:render-${renderQueueId}`
    );

    if (videoLink && videoLink !== "0") {
      res.status(200).json({
        message: "Video has already been created.",
        url: videoLink,
      });
      return;
    }

    // 3. check video process -> later add process %
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

    // 4. add video to render queue
    await Promise.all([
      redisClient.hSet(`render:user-${userId}`, "status", "rendering"),
      redisClient.set(`video:user-${userId}:render-${renderQueueId}`, "0"),
    ]);
    logger.warn(`Video is being rendered for ${user.email}`);

    // Wait video render -> later turn to background process
    // router just a place to add queue to render video
    // bg task will see change in redis and start rendering
    await wait(5000);

    // 5. Done rendering
    await Promise.all([
      redisClient.del(`render:user-${userId}`),
      redisClient.set(
        `video:user-${userId}:render-${renderQueueId}`,
        "https://video.com"
      ),
    ]);

    logger.info(`Video has been created for ${user.email}`);

    res.json({
      message: "Video has already been created.",
      url: "https://video.com",
    });
  }
);

export default videoRouter;
