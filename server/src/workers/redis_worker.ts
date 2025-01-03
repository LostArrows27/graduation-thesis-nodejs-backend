import chalk from "chalk";
import { redisClient, redisWorkerClient } from "../configs/redis";
import { logger } from "../helpers/logging/logger";
import { fetchAndUpdateUnlabelImage } from "../helpers/redis/update_unlabel_image";
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
      // listen to insert key -> match key
      const key = channel.split(":").slice(1).join(":");
      const regex = /video:user-([\w-]+):render-([\w-]+)/;
      const match = key.match(regex);

      if (!match) return;

      const [, userId, renderQueueId] = match;

      const videoLinkStatus = await redisClient.get(key);

      // video is / already rendering
      if (videoLinkStatus === "rendering" || videoLinkStatus?.includes("http"))
        return;

      // videoLinkStatus === "start" -> start rendering
      await redisClient.set(key, "rendering");

      const totalImage = fetchAndUpdateUnlabelImage();

      // fake render video -> using totalImage to render video
      await wait(5000);

      await Promise.all([
        redisClient.del(`render:user-${userId}`),
        redisClient.set(
          `video:user-${userId}:render-${renderQueueId}`,
          "https://video.com"
        ),
      ]);

      logger.info(`Finish rendering video for ${chalk.blue(`user-${userId}`)}`);
    }
  );
};
