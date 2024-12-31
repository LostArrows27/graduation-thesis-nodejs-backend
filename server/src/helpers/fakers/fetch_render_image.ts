import supabase from "../../configs/supabase";
import { ImageMetaData } from "../../types/database.type";
import { logger } from "../logging/logger";

const relatedImage = (image: ImageMetaData) => {
  if (image.labels === undefined || image.labels === null) return true;

  if (image.labels.action_labels.length > 0) return true;

  return false;
};

export async function fetchRenderImage() {
  const { data, error } = await supabase.from("image_meta_data").select("*");

  if (error) {
    logger.error("Error fetching image meta data", error);
    return [];
  }

  logger.info(`Fetched ${data.length} image meta data`);

  return data.filter((image: ImageMetaData) =>
    relatedImage(image)
  ) as ImageMetaData[];
}
