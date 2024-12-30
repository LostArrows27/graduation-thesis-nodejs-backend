import { Easing, interpolate, useCurrentFrame } from "remotion";
import {
  CHAPTER_TRANSITION_TIME,
  ONE_IMAGE_FRAME_TRANSITION_DURATION,
  ONE_IMAGE_TRANSITION_DELAY,
} from "../../constants/constants";
import { FrameTransitionTiming } from "../../types/content.type";

// NOTE: in + out transition time
export const useImageMoveAnimation = (
  timingInFrame: FrameTransitionTiming,
  durationInFrames: number,
  startPos: number,
  endPos: number,
  outPos: number = startPos,
  // eslint-disable-next-line max-params
) => {
  const frame = useCurrentFrame();

  const fastForwardIndex =
    timingInFrame.out === CHAPTER_TRANSITION_TIME ? 2 : 3;

  const position = interpolate(
    frame,
    [
      timingInFrame.in / fastForwardIndex,
      timingInFrame.in / fastForwardIndex + ONE_IMAGE_FRAME_TRANSITION_DURATION,
      durationInFrames -
        timingInFrame.out / fastForwardIndex -
        ONE_IMAGE_FRAME_TRANSITION_DURATION,
      durationInFrames - timingInFrame.out / fastForwardIndex,
    ],
    [startPos, endPos, endPos, outPos],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: Easing.inOut(Easing.poly(4)),
    },
  );

  return { position };
};

export const useImageScaleAnimation = (
  timingInFrame: FrameTransitionTiming,
  durationInFrames: number,
) => {
  const frame = useCurrentFrame();

  const fastForwardIndex =
    timingInFrame.out === CHAPTER_TRANSITION_TIME ? 2 : 3;

  const scale = interpolate(
    frame,
    [
      timingInFrame.in / fastForwardIndex +
        ONE_IMAGE_FRAME_TRANSITION_DURATION -
        ONE_IMAGE_TRANSITION_DELAY,
      durationInFrames -
        timingInFrame.out / fastForwardIndex -
        ONE_IMAGE_FRAME_TRANSITION_DURATION +
        ONE_IMAGE_TRANSITION_DELAY,
    ],
    [1, 1.1],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    },
  );

  return { scale };
};
