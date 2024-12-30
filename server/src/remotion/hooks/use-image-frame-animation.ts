import { useCurrentFrame, interpolate } from "remotion";
import {
  IMAGE_CONTENT_SCALE_DELAY_TIME,
  INTRO_FIRST_SCENE_FADE_TIME,
  INTRO_FIRST_SCENE_LENGTH,
} from "../constants/constants";

const useImageFrameAnimation = (
  durationInFrames: number,
  animated: boolean,
) => {
  const frame = useCurrentFrame();
  if (!animated) return { opacity: 1, scale: 1, imageScale: 1 };

  const opacity = interpolate(
    frame,
    [
      0,
      durationInFrames,
      INTRO_FIRST_SCENE_LENGTH - INTRO_FIRST_SCENE_FADE_TIME,
      INTRO_FIRST_SCENE_LENGTH,
    ],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const scale = interpolate(
    frame,
    [
      0,
      durationInFrames,
      INTRO_FIRST_SCENE_LENGTH - INTRO_FIRST_SCENE_FADE_TIME,
      INTRO_FIRST_SCENE_LENGTH,
    ],
    [0.8, 1, 1, 0.8],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const imageScale = interpolate(
    frame,
    [
      durationInFrames + IMAGE_CONTENT_SCALE_DELAY_TIME,
      INTRO_FIRST_SCENE_LENGTH - INTRO_FIRST_SCENE_FADE_TIME,
    ],
    [1, 1.2],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return { opacity, scale, imageScale };
};

export default useImageFrameAnimation;
