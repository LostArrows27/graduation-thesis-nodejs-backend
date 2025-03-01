import { random } from "remotion";
import { ImageJSON } from "../../remotion/types/frame.type";
import { calculateVideoTimeline } from "../../remotion/utils/calculate-video-timeline";
import { chooseIntroTitle } from "../../remotion/utils/choose-intro-title";
import { chooseIntroMusic } from "../../remotion/utils/choose-music";
import { getRandomAssetByDate } from "../../remotion/utils/seasonal-helper";
import { uploadAndResizeImages } from "../../remotion/utils/transform-image-size";
import { InputPropsType } from "../../types/render.type";
// import { EXCLUDE_LABELS } from "../constants/constants";

// NOTE: old

export const generateVideoInputSchema = (
  imageJSON: ImageJSON
): InputPropsType => {
  const videoDate = new Date(Date.now());

  return {
    type: "prod",
    videoDate: videoDate.toISOString(),
    introScene: {
      firstScene: {
        images: selectIntroFirstSceneImages(imageJSON),
        title: chooseIntroTitle(videoDate),
      },
      secondScene: {
        images: selectIntroSecondSceneImages(imageJSON),
      },
    },
    contentScene: calculateVideoTimeline(imageJSON),
    // editable props
    bgMusic: chooseIntroMusic(),
    bgVideo: {
      src: getRandomAssetByDate(videoDate, "videos"),
      frameLength: 0, // NOTE: will be calculated later
    },
    titleStyle: Math.floor(random(null) * 2),
  };
};

export const processVideoInputProps = async (
  videoSchema: InputPropsType
): Promise<InputPropsType> => {
  const secondSceneImageResized = await uploadAndResizeImages(
    videoSchema.introScene.secondScene.images
  );

  videoSchema.introScene.secondScene.images = secondSceneImageResized;

  return videoSchema;
};

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
