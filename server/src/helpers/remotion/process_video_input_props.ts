import { ImageJSON } from "../../remotion/types/frame.type";
import { calculateVideoTimeline } from "../../remotion/utils/calculate-video-timeline";
import { uploadAndResizeImages } from "../../remotion/utils/transform-image-size";
import { InputPropsType } from "../../types/render.type";
import { EXCLUDE_LABELS } from "../constants/constants";

export const processVideoInputProps = async (
  imageJSON: ImageJSON
): Promise<InputPropsType> => {
  const secondSceneImages = selectIntroSecondSceneImages(imageJSON);

  const secondSceneImageResized =
    await uploadAndResizeImages(secondSceneImages);

  return {
    type: "prod",
    introScene: {
      firstScene: {
        images: selectIntroFirstSceneImages(imageJSON),
      },
      secondScene: {
        images: secondSceneImageResized,
      },
    },
    contentScene: calculateVideoTimeline(imageJSON),
  };
};

export const selectIntroFirstSceneImages = (
  groups: ImageJSON,
  excluded = EXCLUDE_LABELS,
  count = 4
) => {
  return Object.entries(groups)
    .filter(([label]) => !excluded.includes(label))
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
