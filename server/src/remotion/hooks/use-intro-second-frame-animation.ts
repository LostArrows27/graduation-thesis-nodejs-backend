import { useCurrentFrame, interpolate, Easing } from "remotion";
import {
  INTRO_SECOND_SCENE_FADE_TIME,
  INTRO_SECOND_SCENE_LENGTH,
  INTRO_SECOND_SCENE_TRANSITION_TIME,
} from "../constants/constants";

export const useIntroSecondFrameAnimation = () => {
  const frame = useCurrentFrame();

  const startKeyFrame = [0, INTRO_SECOND_SCENE_TRANSITION_TIME];

  const endKeyFrame = [
    INTRO_SECOND_SCENE_LENGTH - INTRO_SECOND_SCENE_FADE_TIME,
    INTRO_SECOND_SCENE_LENGTH,
  ];

  const totalKeyFrame = [...startKeyFrame, ...endKeyFrame];

  const opacity = interpolate(frame, totalKeyFrame, [0, 1, 1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const scale =
    frame < INTRO_SECOND_SCENE_LENGTH - INTRO_SECOND_SCENE_FADE_TIME
      ? interpolate(frame, startKeyFrame, [0.6, 1], {
          extrapolateRight: "clamp",
          extrapolateLeft: "clamp",
          easing: Easing.out(Easing.poly(5)),
        })
      : interpolate(frame, endKeyFrame, [1, 2], {
          extrapolateRight: "clamp",
          extrapolateLeft: "clamp",
        });

  return {
    opacity,
    scale,
  };
};
