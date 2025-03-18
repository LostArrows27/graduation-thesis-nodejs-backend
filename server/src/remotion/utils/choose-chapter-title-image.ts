// NOTE: choose 2 image (top + random) for title image

import { random } from "remotion";
import { Frame } from "../types/frame.type";

const getRandomImage = (
  images: { path: string; confidence: number }[],
  title: string,
  index: number,
  titleStyle: number
): string => {
  const randomIndex = Math.floor(
    random(
      `random-title-image-title-${title}-index-${index}-titleStyle-${titleStyle}-JSON-${JSON.stringify(images)}`
    ) * images.length
  );
  return images[randomIndex].path;
};

// return 1 image with highest confident + 1 random image
export const chooseChapterTitleImage = (
  frames: Frame[],
  title: string,
  index: number,
  titleStyle: number
): string[] => {
  const imagesWithConfidence: { path: string; confidence: number }[] = [];

  frames.forEach((frame) => {
    frame.images.forEach((image) => {
      const locationLabels = image.labels.location;

      const maxLocationConfidence = Math.max(...Object.values(locationLabels));

      imagesWithConfidence.push({
        path: image.path,
        confidence: maxLocationConfidence,
      });
    });
  });

  imagesWithConfidence.sort((a, b) => b.confidence - a.confidence);

  if (imagesWithConfidence.length === 0) {
    throw new Error("No images found for title image");
  }

  const highestConfidenceImage = imagesWithConfidence[0];

  const remainingImages = imagesWithConfidence.filter(
    (image) => image !== highestConfidenceImage
  );

  const randomImage =
    remainingImages.length === 0
      ? highestConfidenceImage.path
      : getRandomImage(remainingImages, title, index, titleStyle);

  return [highestConfidenceImage.path, randomImage];
};
