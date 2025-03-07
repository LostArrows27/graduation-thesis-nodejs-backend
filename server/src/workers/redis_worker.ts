import chalk from "chalk";
import { redisClient, redisWorkerClient } from "../configs/redis";
import { logger } from "../helpers/logging/logger";
import { renderVideo } from "../helpers/remotion/remotion_render";
import supabase from "../configs/supabase";
import { InputPropsType } from "../types/render.type";

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
      const [scaleStr] = await Promise.all([
        redisClient.hGet(`render:user-${userId}`, "scale"),
        redisClient.set(key, "rendering"),
        supabase
          .from("video_render")
          .update({
            status: "in_progress",
            updated_at: new Date().toISOString(),
          })
          .eq("id", renderQueueId),
      ]);

      try {
        // start rendering video
        // const imageLabeled = await fetchAndUpdateUnlabelImage(renderQueueId);
        // const imageGroupJSON = groupImageByLabel(imageLabeled);

        const { data } = await supabase
          .from("video_render")
          .select("schema")
          .eq("id", renderQueueId)
          .single()
          .throwOnError();

        if (!data?.schema) {
          throw new Error("Schema is not found. Please request again.");
        }

        const chunkURLs = await renderVideo(
          data!.schema! as InputPropsType,
          renderQueueId,
          userId,
          parseInt(scaleStr || "1", 10)
        );

        // end rendering video
        await Promise.all([
          redisClient.del(`render:user-${userId}`),
          redisClient.set(
            `video:user-${userId}:render-${renderQueueId}`,
            chunkURLs.join(", "),
            {
              EX: 60 * 60 * 24, // 1 day
            }
          ),
        ]);

        logger.info(
          `Finish rendering video for ${chalk.blue(`user-${userId}`)} - scale ${chalk.blue(scaleStr)}`
        );
      } catch (error: unknown) {
        logger.error(`Error rendering: ${(error as Error).message}`);

        await Promise.all([
          supabase
            .from("video_render")
            .update({
              status: "failed",
              updated_at: new Date().toISOString(),
            })
            .eq("id", renderQueueId),
          redisClient.del(`render:user-${userId}`),
        ]);
      }
    }
  );
};
