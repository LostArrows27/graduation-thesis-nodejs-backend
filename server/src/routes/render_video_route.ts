import express, { Response } from "express";
import { checkAccessToken } from "../middlewares/auth_middleware";
import { AuthUserRequest } from "../types/app.type";
import { redisClient } from "../configs/redis";
import { logger } from "../helpers/logging/logger";
import { checkVideoParamsMiddelware } from "../middlewares/check_video_params_middleware";
import chalk from "chalk";

const videoRouter = express.Router();

// TODO: add to HSET create-video-type -> "default" / "selected"

videoRouter.post(
  "/render",
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
        url: videoLink,
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
