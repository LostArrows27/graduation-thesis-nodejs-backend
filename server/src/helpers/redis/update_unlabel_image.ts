import { redisClient } from "../../configs/redis";
import { ImageMetaData } from "../../types/database.type";
import { fetchRenderImage } from "../fakers/fetch_render_image";
import { logger } from "../logging/logger";
import { pushToStream } from "./redis_function_service";

export const categorizedImage = async (images: ImageMetaData[]) => {
  const { unlabelImages, relateImages } = groupByLabelStatus(images);

  await addUnlabelImageToRedisStream(unlabelImages);

  const imageLabled = await waitForImageLabelingJobDone(
    unlabelImages.map((image) => String(image.id))
  );

  return [...imageLabled, ...relateImages];
};

// Main function
export const fetchAndUpdateUnlabelImage = async () => {
  // Fake fetch user images
  const imagesMetaData = await fetchRenderImage();

  const { unlabelImages, relateImages } = groupByLabelStatus(imagesMetaData);

  await addUnlabelImageToRedisStream(unlabelImages);

  const imageLabled = await waitForImageLabelingJobDone(
    unlabelImages.map((image) => String(image.id))
  );

  return [...imageLabled, ...relateImages];
};

export const addUnlabelImageToRedisStream = async (
  imagesMetaData: ImageMetaData[]
) => {
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

export async function waitForImageLabelingJobDone(
  imageIds: string[]
): Promise<ImageMetaData[]> {
  const pendingImages = new Set(imageIds);
  const labeledImages: Record<string, ImageMetaData> = {};

  while (pendingImages.size > 0) {
    try {
      // Read messages from the stream
      const messages = (await redisClient.sendCommand([
        "XREAD",
        "STREAMS",
        "image_label_stream",
        "0-0", // Start reading from the beginning
      ])) as Array<[string, Array<[string, string[]]>]> | null | undefined;

      if (!messages) break;

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

      if (!foundPendingImage) break;
    } catch (err) {
      logger.error("Error reading from stream:", err);
      break;
    }
  }

  try {
    const promises = Array.from(pendingImages).map(async (imageId) => {
      try {
        const imageData = await redisClient.hGetAll(`image_job:${imageId}`);

        // if (!imageData) return;

        labeledImages[imageId] = {
          id: imageId,
          image_bucket_id: imageData.image_bucket_id,
          image_name: imageData.image_name,
          labels: JSON.parse(imageData.labels),
          image_features: null,
          location: null,
          uploader_id: "uploader_id",
          album_id: "album_id",
          updated_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
        };

        return [];
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

// Utils
export const groupByLabelStatus = (imagesMetaData: ImageMetaData[]) => {
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
