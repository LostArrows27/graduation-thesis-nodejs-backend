import supabase from "../../configs/supabase";
import { ImageMetaData } from "../../types/database.type";
import { logger } from "../logging/logger";

type FetchImageReturnType = {
  imageId: string;
  image: ImageMetaData;
};

const relatedImage = (image: ImageMetaData) => {
  if (image.labels === undefined || image.labels === null) return true;

  if (image.labels.action_labels.length > 0) return true;

  return false;
};

// TODO: fake fetch user images
export async function fakeFetchRenderImage() {
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

export async function fetchRenderImage(videoRenderId: string) {
  const { data, error } = await supabase
    .from("video_image")
    .select(
      "image_id, image(id, created_at, updated_at, uploader_id, image_name, image_bucket_id, labels)"
    )
    .eq("video_id", videoRenderId)
    .returns<FetchImageReturnType[]>();

  if (!data || error) {
    logger.error("Error fetching image meta data", error);
    throw new Error("Error fetching image meta data");
  }

  if (data.length === 0) {
    logger.error("No image found for video render id", videoRenderId);
    throw new Error("No image found for video render id");
  }

  return data
    .filter((imageRes) => relatedImage(imageRes.image))
    .map((image) => image.image) as ImageMetaData[];
}
