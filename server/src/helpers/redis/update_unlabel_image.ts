import { redisClient } from "../../configs/redis";
import { ImageMetaData } from "../../types/database.type";
import { logger } from "../logging/logger";
import { pushToStream } from "./redis_service";

export const divideArray = (imagesMetaData: ImageMetaData[]) => {
  return {
    unlabelImages: filterUnlabelImages(imagesMetaData),
    relateImages: filterRelateImages(imagesMetaData),
  };
};

export const filterUnlabelImages = (imagesMetaData: ImageMetaData[]) => {
  return imagesMetaData.filter(
    (image) => image.labels === undefined || image.labels === null
  );
};

export const filterRelateImages = (imagesMetaData: ImageMetaData[]) => {
  return imagesMetaData.filter(
    (image) =>
      image.labels !== undefined &&
      image.labels !== null &&
      image.labels.action_labels.length > 0
  );
};

export const updateUnlabelImage = async (imagesMetaData: ImageMetaData[]) => {
  await Promise.all(
    imagesMetaData.map(async (image) => {
      const { id, image_bucket_id, image_name } = image;

      if (!image_bucket_id || !image_name) {
        logger.error(`Invalid image data: ${JSON.stringify(image)}`);
        return;
      }

      await pushToStream("image_label_stream", {
        image_id: String(id),
        image_bucket_id,
        image_name,
      });
    })
  );
};

export async function waitForLabeledImages(
  imageIds: string[]
): Promise<ImageMetaData[]> {
  const pendingImages = new Set(imageIds);
  const labeledImages: Record<string, ImageMetaData> = {};

  logger.info("Pending images:", pendingImages.size);

  while (pendingImages.size > 0) {
    try {
      // Read messages from the stream
      const messages = (await redisClient.sendCommand([
        "XREAD",
        "STREAMS",
        "image_label_stream",
        "0-0", // Start reading from the beginning
      ])) as Array<[string, Array<[string, string[]]>]> | null | undefined;

      if (!messages) {
        logger.info("No messages in the stream. Exiting loop.");
        break;
      }

      let foundPendingImage = false;

      for (const [, events] of messages) {
        for (const [, fields] of events) {
          const data: Record<string, string> = {};
          for (let i = 0; i < fields.length; i += 2) {
            data[fields[i]] = fields[i + 1];
          }

          const imageId = data.image_id;

          if (pendingImages.has(imageId)) {
            foundPendingImage = true;
            break;
          }
        }

        if (foundPendingImage) break;
      }

      if (!foundPendingImage) {
        logger.info("No pending image IDs found in the stream. Exiting loop.");
        break;
      }
    } catch (err) {
      logger.error("Error reading from stream:", err);
      break;
    }
  }

  try {
    const promises = Array.from(pendingImages).map(async (imageId) => {
      try {
        const imageData = await redisClient.hGetAll(`image_job:${imageId}`);

        if (!imageData) {
          logger.error(`No data found for image ${imageId}`);
          return;
        }

        labeledImages[imageId] = {
          id: parseInt(imageId, 10),
          image_bucket_id: imageData.image_bucket_id,
          image_name: imageData.image_name,
          labels: JSON.parse(imageData.labels),
        };
      } catch (err) {
        logger.error(`Error retrieving data for image ${imageId}:`, err);
      }
    });

    await Promise.all(promises);
  } catch (err) {
    logger.error("Error processing image jobs:", err);
  }

  return Object.values(labeledImages);
}
