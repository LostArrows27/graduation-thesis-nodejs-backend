import chalk from "chalk";
import { redisClient, redisWorkerClient } from "../configs/redis";
import { logger } from "../helpers/logging/logger";
import { fetchAndUpdateUnlabelImage } from "../helpers/redis/update_unlabel_image";
import { groupImageByLabel } from "../helpers/images/image_grouping";
import { renderVideo } from "../helpers/remotion/remotion_render";
import supabase from "../configs/supabase";

// TODO:
/* WORK WITH REDIS WORKER VIDEO FILE -> NOT THISS FILE !!!!!!!!!!!
  1. update video render progress to database
  2. find a way to upload video to supabase -> reference to Github upwrapped 2023

  TODO: if have time -> upload image of content part -> cloudinary
*/

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

      // videoLinkStatus === "start" -> start rendering video
      await Promise.all([
        redisClient.set(key, "rendering"),
        supabase
          .from("video_render")
          .update({
            status: "in_progress",
            updated_at: new Date().toISOString(),
          })
          .eq("id", renderQueueId),
      ]);

      // start rendering video
      const imageLabeled = await fetchAndUpdateUnlabelImage();

      const imageGroupJSON = groupImageByLabel(imageLabeled);

      try {
        const chunkURLs = await renderVideo(
          imageGroupJSON,
          renderQueueId,
          userId
        );

        // end rendering video
        await Promise.all([
          redisClient.del(`render:user-${userId}`),
          redisClient.set(
            `video:user-${userId}:render-${renderQueueId}`,
            chunkURLs.join(", ")
          ),
        ]);
      } catch (error: unknown) {
        logger.error(`Error rendering: ${(error as Error).message}`);

        await supabase
          .from("video_render")
          .update({
            status: "failed",
            updated_at: new Date().toISOString(),
          })
          .eq("id", renderQueueId);

        return;
      }

      logger.info(`Finish rendering video for ${chalk.blue(`user-${userId}`)}`);
    }
  );
};
