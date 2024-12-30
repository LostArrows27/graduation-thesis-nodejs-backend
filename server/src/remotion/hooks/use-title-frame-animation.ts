import { useCurrentFrame, interpolate } from "remotion";
import {
  INTRO_FIRST_SCENE_FADE_TIME,
  INTRO_FIRST_SCENE_LENGTH,
} from "../constants/constants";

const useTitleFrameAnimation = (
  durationInFrames: number,
  delay: number = 0,
) => {
  const frame = useCurrentFrame();

  const opacityIn = interpolate(
    frame,
    [delay, durationInFrames + delay],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const opacityOut = interpolate(
    frame,
    [
      INTRO_FIRST_SCENE_LENGTH - INTRO_FIRST_SCENE_FADE_TIME,
      INTRO_FIRST_SCENE_LENGTH,
    ],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const opacity =
    frame < INTRO_FIRST_SCENE_LENGTH - INTRO_FIRST_SCENE_FADE_TIME
      ? opacityIn
      : opacityOut;

  const scale = interpolate(
    frame,
    [
      INTRO_FIRST_SCENE_LENGTH - INTRO_FIRST_SCENE_FADE_TIME,
      INTRO_FIRST_SCENE_LENGTH,
    ],
    [1, 0.8],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return { opacity, scale };
};

export default useTitleFrameAnimation;
