import { redisClient, redisWorkerClient } from "../configs/redis";
import { logger } from "../helpers/logging/logger";
import { wait } from "../helpers/timer/wait";

// TODO: add un-labeled image logic
// 1. fetch image from supabase (messageID -> image link -> ....)
// 2. render image

// TODO: add render video logic

export const redisWorker = async () => {
  logger.info("Background task started and listening for Redis hash changes.");

  await redisWorkerClient.configSet("notify-keyspace-events", "K$");

  await redisWorkerClient.pSubscribe(
    "__keyspace@0__:video:user-*:render-*",
    async (_, channel) => {
      const key = channel.split(":").slice(1).join(":");

      const regex = /video:user-([\w-]+):render-([\w-]+)/;

      const match = key.match(regex);

      if (!match) {
        logger.error(`Invalid key pattern: ${key}`);
        return;
      }

      const [, userId, renderQueueId] = match;

      const videoLinkStatus = await redisClient.get(key);

      if (videoLinkStatus === "rendering") {
        logger.info(`Video is being rendered for user-${userId}`);
        return;
      }

      if (videoLinkStatus !== "start") {
        logger.info(
          `Video has been created for user-${userId}. Link is ${videoLinkStatus}`
        );
        return;
      }

      // videoLinkStatus === "start" -> start rendering
      await redisClient.set(key, "rendering");

      // NOTE: fake rendering
      await wait(5000);

      await Promise.all([
        redisClient.del(`render:user-${userId}`),
        redisClient.set(
          `video:user-${userId}:render-${renderQueueId}`,
          "https://video.com"
        ),
      ]);
    }
  );
};
