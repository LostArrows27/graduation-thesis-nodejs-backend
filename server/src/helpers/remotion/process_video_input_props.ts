import { ImageJSON } from "../../remotion/types/frame.type";
// import { EXCLUDE_LABELS } from "../constants/constants";

// NOTE: old

export const selectIntroFirstSceneImages = (
  groups: ImageJSON,
  // excluded = EXCLUDE_LABELS,
  count = 4
) => {
  const bestImages = Object.entries(groups)
    // .filter(([label]) => !excluded.includes(label))
    .sort(([, a], [, b]) => b.length - a.length)
    .slice(0, count)
    .map(
      ([, images]) =>
        images.reduce((best, img) =>
          Math.max(...Object.values(img.labels.location)) >
          Math.max(...Object.values(best.labels.location))
            ? img
            : best
        ).path
    );

  // If there are fewer than 4 images, fill the remaining slots with random images
  if (bestImages.length < count) {
    const allImages = Object.values(groups).flat();
    const remainingImages = allImages
      .filter((img) => !bestImages.includes(img.path))
      // eslint-disable-next-line @remotion/deterministic-randomness
      .sort(() => Math.random() - 0.5)
      .slice(0, count - bestImages.length)
      .map((img) => img.path);

    bestImages.push(...remainingImages);
  }

  // If there are more than 4 images, remove the least relevant ones
  if (bestImages.length === 3) {
    bestImages.push(bestImages[0]);
  }

  if (bestImages.length === 2) {
    bestImages.push(bestImages[0], bestImages[1]);
  }

  if (bestImages.length === 1) {
    bestImages.push(...bestImages, ...bestImages, ...bestImages);
  }

  if (bestImages.length === 0) {
    throw new Error("No images found");
  }

  return bestImages;
};

export const selectIntroSecondSceneImages = (groups: ImageJSON) => {
  const allImages = Object.values(groups).flat();
  if (allImages.length <= 42) {
    return allImages.map((img) => img.path);
  }
  return (
    allImages
      // eslint-disable-next-line @remotion/deterministic-randomness
      .sort(() => Math.random() - 0.5)
      .slice(0, 42)
      .map((img) => img.path)
  );
};
