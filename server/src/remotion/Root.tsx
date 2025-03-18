import "./styles/tailwind.css";
import {
  CalculateMetadataFunction,
  Composition,
  random,
  staticFile,
} from "remotion";
import {
  INTRO_SCENE_LENGTH,
  OUTRO_SCENE_LENGTH,
  SPECIAL_PART_LENGTH,
  VIDEO_COMPOSITION_ID,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "./constants/constants";
import MainVideo from "./Main.";
import { compositionSchema } from "./schemas/video.schema";
import { MainProps } from "./types/video.type";
import { chooseIntroMusic } from "./utils/choose-music";
import { chooseIntroTitle } from "./utils/choose-intro-title";
import { getRandomAssetByDate } from "./utils/seasonal-helper";
import { chooseRandomCaption } from "./assets/caption_assets";
import { getVideoMetadata } from "@remotion/media-utils";
import { chooseRandomOutroImage } from "./utils/choose-random-outro-image";
import { chooseRandomOutroCaption } from "./utils/choose-random-outro-caption";
import { generateDefaultVideoProps } from "./constants/video-props";
import { chooseChapterBasedOnMaxDuration } from "./utils/choose-chapter-based-on-max-duration";

// TODO: upload image to cloudinary -> resize -> finish delete

// NOTE: can random by time render -> more random:))

// NOTE: NEW !!!!!
/*
  - past -> generate random based on input props
  - now -> remove it !
*/
const calculateMetadata: CalculateMetadataFunction<MainProps> = async ({
  props,
}) => {
  const videoDate = new Date(props.videoDate);

  const bgVideoSrc = staticFile(
    props?.bgVideo?.src || getRandomAssetByDate(videoDate, "videos")
  );

  const { durationInSeconds } = await getVideoMetadata(bgVideoSrc);

  if (!durationInSeconds) {
    throw new Error("Cannot get video metadata");
  }

  const { chapters, contentTotalDuration } = chooseChapterBasedOnMaxDuration(
    props.contentScene,
    props?.maxDuration
  );

  const captions = chooseRandomCaption();

  props.bgMusic = props?.bgMusic || chooseIntroMusic();
  props.bgVideo.src = bgVideoSrc;
  props.bgVideo.frameLength = durationInSeconds * VIDEO_FPS;
  props.introScene.firstScene.title =
    props?.introScene?.firstScene?.title || chooseIntroTitle(videoDate);
  props.introScene.secondScene.firstCaption = captions.firstCaption;
  props.introScene.secondScene.secondCaption = captions.secondCaption;
  props.contentLength = contentTotalDuration;
  props.contentScene = chapters;
  props.titleStyle = props?.titleStyle || Math.floor(random(null) * 2);
  props.outroScene.image = chooseRandomOutroImage(props.contentScene);
  props.outroScene.caption = chooseRandomOutroCaption();

  const totalDurationInFrames =
    INTRO_SCENE_LENGTH +
    contentTotalDuration +
    OUTRO_SCENE_LENGTH +
    (props?.specialPart &&
    props?.specialPart.totalFaces > 0 &&
    props.specialPart.faces.length > 0
      ? SPECIAL_PART_LENGTH
      : 0);

  return {
    durationInFrames: totalDurationInFrames,
    props,
  };
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        component={MainVideo}
        id={VIDEO_COMPOSITION_ID}
        durationInFrames={200}
        fps={VIDEO_FPS}
        schema={compositionSchema}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        calculateMetadata={calculateMetadata}
        defaultProps={
          generateDefaultVideoProps(new Date("2024-04-02")) as MainProps
        }
      />
    </>
  );
};
