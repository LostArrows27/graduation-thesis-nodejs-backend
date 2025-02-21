import supabase from "../../configs/supabase";
import { ImageMetaData } from "../../types/database.type";
import { logger } from "../logging/logger";

const relatedImage = (image: ImageMetaData) => {
  if (image.labels === undefined || image.labels === null) return true;

  if (image.labels.action_labels.length > 0) return true;

  return false;
};

// TODO: fake fetch user images
export async function fetchRenderImage() {
  const { data, error } = await supabase
    .from("image")
    .select("*")
    .returns<ImageMetaData[]>();

  if (error) {
    logger.error("Error fetching image meta data", error);
    return [];
  }

  return data.filter((image: ImageMetaData) =>
    relatedImage(image)
  ) as ImageMetaData[];
}
