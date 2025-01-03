import { redisClient, redisWorkerClient } from "../configs/redis";
import { fetchRenderImage } from "../helpers/fakers/fetch_render_image";
import { logger } from "../helpers/logging/logger";
import {
  divideArray,
  updateUnlabelImage,
  waitForLabeledImages,
} from "../helpers/redis/update_unlabel_image";
import { wait } from "../helpers/timer/wait";

// TODO: add un-labeled image logic
// 1. fetch image from supabase (messageID -> image link -> ....)
// 2. render image

// TODO: add render video logic

export const redisWorker = async () => {
  logger.info("Redis Worker start listening to key insert.");

  await redisWorkerClient.configSet("notify-keyspace-events", "K$");

  await redisWorkerClient.pSubscribe(
    "__keyspace@0__:video:user-*:render-*",
    async (_, channel) => {
      // NOTE: process redis

      const key = channel.split(":").slice(1).join(":");
      const regex = /video:user-([\w-]+):render-([\w-]+)/;
      const match = key.match(regex);

      // only process video:user-<userId>:render-<renderQueueId>
      if (!match) return;

      const [, userId, renderQueueId] = match;

      const videoLinkStatus = await redisClient.get(key);

      // video is / already rendering
      if (videoLinkStatus === "rendering" || videoLinkStatus !== "start")
        return;

      // videoLinkStatus === "start" -> start rendering
      await redisClient.set(key, "rendering");

      // NOTE: fake fetch user images
      const imagesMetaData = await fetchRenderImage();

      // NOTE: update unlabel image
      const { unlabelImages, relateImages } = divideArray(imagesMetaData);

      await updateUnlabelImage(unlabelImages);

      // NOTE: wait all label image done
      const imageLabled = await waitForLabeledImages(
        unlabelImages.map((image) => String(image.id))
      );

      const totalImage = [...imageLabled, relateImages];

      // TODO: fake render video -> using totalImage to render video
      await wait(5000);

      await Promise.all([
        redisClient.del(`render:user-${userId}`),
        redisClient.set(
          `video:user-${userId}:render-${renderQueueId}`,
          "https://video.com"
        ),
      ]);

      logger.info(`Finish rendering video for user-${userId}`);
    }
  );
};
