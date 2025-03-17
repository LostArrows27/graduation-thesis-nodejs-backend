import { random } from "remotion";
import { ImageJSON } from "../../remotion/types/frame.type";
import { calculateVideoTimeline } from "../../remotion/utils/calculate-video-timeline";
import { chooseIntroTitle } from "../../remotion/utils/choose-intro-title";
import { chooseIntroMusic } from "../../remotion/utils/choose-music";
import { getRandomAssetByDate } from "../../remotion/utils/seasonal-helper";
import { InputPropsType } from "../../types/render.type";
import { selectIntroFirstSceneImages, selectIntroSecondSceneImages } from "./process_video_input_props";
import { uploadAndResizeImages } from "../../remotion/utils/transform-image-size";

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
