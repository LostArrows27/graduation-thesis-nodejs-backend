import { useCurrentFrame, interpolate, Easing } from "remotion";
import {
  INTRO_POSTS_SCALE_DURATION,
  INTRO_POSTS_SCALE_IDLE_TIME,
  INTRO_POST_SCALE_LEVEL_1,
  INTRO_POST_SCALE_LEVEL_1_EXTRA_TIME,
  INTRO_POST_SCALE_LEVEL_2,
  INTRO_POST_SCALE_LEVEL_3,
} from "../constants/constants";

export const usePostListFrameAnimation = () => {
  const frame = useCurrentFrame();

  // NOTE: wait level 1 a bit -> scale 2 -> wait a bit -> scale 3 -> end
  // add -> EXTRA_TIME cause level 1 a bit short
  const keyframes = [
    0,
    INTRO_POSTS_SCALE_IDLE_TIME + INTRO_POST_SCALE_LEVEL_1_EXTRA_TIME,
    INTRO_POSTS_SCALE_IDLE_TIME +
      INTRO_POSTS_SCALE_DURATION +
      INTRO_POST_SCALE_LEVEL_1_EXTRA_TIME,
    INTRO_POSTS_SCALE_IDLE_TIME * 2 +
      INTRO_POSTS_SCALE_DURATION +
      INTRO_POST_SCALE_LEVEL_1_EXTRA_TIME,
    INTRO_POSTS_SCALE_IDLE_TIME * 2 +
      INTRO_POSTS_SCALE_DURATION * 2 +
      INTRO_POST_SCALE_LEVEL_1_EXTRA_TIME,
  ];

  const values = [
    INTRO_POST_SCALE_LEVEL_3,
    INTRO_POST_SCALE_LEVEL_3,
    INTRO_POST_SCALE_LEVEL_2,
    INTRO_POST_SCALE_LEVEL_2,
    INTRO_POST_SCALE_LEVEL_1,
  ];

  const scale = interpolate(frame, keyframes, values, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.circle),
  });

  return { scale };
};
