import { random } from "remotion";
import { ImageJSON } from "../types/frame.type";
import { MIN_CONFIDENCE, transitionEffects } from "../constants/frame";

// NOTE: slice to auto have self-built type -> remove remotion-type
export const chooseRandomTransition = () => {
  const transitionEffectsNew = transitionEffects;
  // .slice(2);
  // .slice(0, 2);

  return transitionEffectsNew[
    Math.floor(random(null) * transitionEffectsNew.length)
  ];
};

export const removeLowActivityConfidence = (images: ImageJSON) => {
  const filterImages: ImageJSON = {};
  // eslint-disable-next-line guard-for-in
  for (const key in images) {
    filterImages[key] = images[key].filter(
      (image) => Object.values(image.labels.activity)[0] > MIN_CONFIDENCE
    );
  }
  return filterImages;
};

export const removeLowEventConfidence = (images: ImageJSON) => {
  const filterImages: ImageJSON = {};
  // eslint-disable-next-line guard-for-in
  for (const key in images) {
    filterImages[key] = images[key].filter(
      (image) => Object.values(image.labels.event)[0] > MIN_CONFIDENCE
    );
  }
  return filterImages;
};
