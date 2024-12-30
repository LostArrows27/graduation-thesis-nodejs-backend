import { Easing, interpolate, useCurrentFrame } from "remotion";
import { BUILT_IN_ANIMATION_TIME } from "../../constants/constants";
import { FrameTransitionTiming } from "../../types/content.type";
import { useCallback } from "react";

export const useOneImageBuiltInFrameAnimation = (
  timingInFrame: FrameTransitionTiming,
  durationInFrames: number,
) => {
  const frame = useCurrentFrame();

  const easingSinFunction = useCallback(
    (t: number) => Easing.out(Easing.sin)(t),
    [],
  );

  const moveLeft = interpolate(
    frame,
    [0, timingInFrame.in - 20, timingInFrame.in + BUILT_IN_ANIMATION_TIME - 20],
    [-700, -700, -40],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: easingSinFunction,
    },
  );

  const moveRight = interpolate(
    frame,
    [0, timingInFrame.in - 15, timingInFrame.in + BUILT_IN_ANIMATION_TIME - 15],
    [-500, -500, -96],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: easingSinFunction,
    },
  );

  const moveDown = interpolate(
    frame,
    [0, timingInFrame.in - 16, timingInFrame.in + BUILT_IN_ANIMATION_TIME - 16],

    [-30, -30, 1],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: easingSinFunction,
    },
  );

  const moveUp = interpolate(
    frame,
    [0, timingInFrame.in - 16, timingInFrame.in + BUILT_IN_ANIMATION_TIME - 16],

    [90, 90, 65],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: easingSinFunction,
    },
  );

  const moveInImage = interpolate(
    frame,
    [0, timingInFrame.in - 10, timingInFrame.in + BUILT_IN_ANIMATION_TIME - 10],
    [-1240, -1240, 0],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: easingSinFunction,
    },
  );

  const yValue = 108.5;

  const moveInImage2 = interpolate(
    frame,
    [0, timingInFrame.in - 10, timingInFrame.in + BUILT_IN_ANIMATION_TIME - 10],
    [yValue, yValue, 0],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: easingSinFunction,
    },
  );

  const scale = interpolate(
    frame,
    [0, timingInFrame.in + BUILT_IN_ANIMATION_TIME - 10, durationInFrames],
    [1, 1, 1.1],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: easingSinFunction,
    },
  );

  const outImage = interpolate(
    frame,
    [0, durationInFrames - 50, durationInFrames - 20],
    [0, 0, -600],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: easingSinFunction,
    },
  );

  const outLayer = interpolate(
    frame,
    [0, durationInFrames - 50, durationInFrames - 20],
    [0, 0, -600],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: easingSinFunction,
    },
  );

  return {
    moveLeft,
    moveRight,
    moveDown,
    moveUp,
    moveInImage,
    moveInImage2,
    scale,
    outImage,
    outLayer,
  };
};

export const useTwoImageBuiltInFrameAnimation = (
  timingInFrame: FrameTransitionTiming,
  durationInFrames: number,
) => {
  const frame = useCurrentFrame();

  const easingSinFunction = useCallback(
    (t: number) => Easing.out(Easing.sin)(t),
    [],
  );

  const moveUpNote = interpolate(
    frame,
    [0, timingInFrame.in - 16, timingInFrame.in + BUILT_IN_ANIMATION_TIME - 16],

    [-400, -400, 40],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    },
  );

  const scale = interpolate(
    frame,
    [0, timingInFrame.in + BUILT_IN_ANIMATION_TIME - 10, durationInFrames],
    [1.1, 1.1, 1],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: easingSinFunction,
    },
  );

  return {
    moveUpNote,
    scale,
  };
};

export const useThreeImageBuiltInFrameAnimation = (
  timingInFrame: FrameTransitionTiming,
  durationInFrames: number,
) => {
  const frame = useCurrentFrame();

  const easingSinFunction = useCallback(
    (t: number) => Easing.out(Easing.sin)(t),
    [],
  );

  const moveUpNote = interpolate(
    frame,
    [0, timingInFrame.in - 16, timingInFrame.in + BUILT_IN_ANIMATION_TIME - 16],

    [-400, -400, 0],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    },
  );

  const rotateImage = interpolate(
    frame,
    [0, timingInFrame.in - 16, timingInFrame.in + BUILT_IN_ANIMATION_TIME - 16],
    [-50, -50, 5],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const opacity = interpolate(
    frame,
    [0, timingInFrame.in - 16, timingInFrame.in + BUILT_IN_ANIMATION_TIME - 16],
    [0, 0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const goDown = interpolate(
    frame,
    [0, timingInFrame.in - 16, timingInFrame.in + BUILT_IN_ANIMATION_TIME - 16],
    [-50, -50, 80],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const starOpacity = interpolate(
    frame,
    [
      0,
      timingInFrame.in + BUILT_IN_ANIMATION_TIME - 18,
      timingInFrame.in + BUILT_IN_ANIMATION_TIME - 18 + 1,
    ],
    [0, 0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const scale = interpolate(
    frame,
    [0, timingInFrame.in + BUILT_IN_ANIMATION_TIME - 10, durationInFrames],
    [1, 1, 1.1],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: easingSinFunction,
    },
  );

  return {
    moveUpNote,
    starOpacity,
    rotateImage,
    opacity,
    goDown,
    scale,
  };
};

export const useFourImageBuiltInFrameAnimation = (
  timingInFrame: FrameTransitionTiming,
) => {
  const frame = useCurrentFrame();

  const rotate = interpolate(
    frame,
    [0, timingInFrame.in - 16, timingInFrame.in + BUILT_IN_ANIMATION_TIME - 16],

    [-90, -90, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const moveInLeft = interpolate(
    frame,
    [0, timingInFrame.in - 14, timingInFrame.in + BUILT_IN_ANIMATION_TIME - 14],

    [-360, -360, 20],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return {
    rotate,
    moveInLeft,
  };
};

export const useFourImageBuiltInFrameStyle1Animation = (
  timingInFrame: FrameTransitionTiming,
  durationInFrames: number,
) => {
  const frame = useCurrentFrame();

  const easingSinFunction = useCallback(
    (t: number) => Easing.out(Easing.sin)(t),
    [],
  );

  const moveUp = interpolate(
    frame,
    [0, timingInFrame.in - 16, timingInFrame.in + BUILT_IN_ANIMATION_TIME - 16],

    [130, 130, 20],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easingSinFunction,
    },
  );

  const moveDown = interpolate(
    frame,
    [0, timingInFrame.in - 16, timingInFrame.in + BUILT_IN_ANIMATION_TIME - 16],

    [-50, -50, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easingSinFunction,
    },
  );

  const appearFromLeft = interpolate(
    frame,
    [0, timingInFrame.in - 16, timingInFrame.in + BUILT_IN_ANIMATION_TIME - 16],

    [-200, -200, 128],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easingSinFunction,
    },
  );

  const opacity = interpolate(
    frame,
    [
      0,
      timingInFrame.in + BUILT_IN_ANIMATION_TIME - 16,
      timingInFrame.in + BUILT_IN_ANIMATION_TIME - 16 + 10,
    ],

    [0, 0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const scale = interpolate(
    frame,
    [0, timingInFrame.in + BUILT_IN_ANIMATION_TIME - 10, durationInFrames],
    [1.1, 1.1, 1],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: easingSinFunction,
    },
  );

  const starOpacity = interpolate(
    frame,
    [
      0,
      timingInFrame.in + BUILT_IN_ANIMATION_TIME - 18,
      timingInFrame.in + BUILT_IN_ANIMATION_TIME - 18 + 1,
    ],
    [0, 0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return { moveUp, moveDown, opacity, appearFromLeft, scale, starOpacity };
};

export const useSixImageBuiltInFrameAnimation = (
  timingInFrame: FrameTransitionTiming,
) => {
  const frame = useCurrentFrame();

  const easingSinFunction = useCallback(
    (t: number) => Easing.out(Easing.sin)(t),
    [],
  );

  const moveInLeft1 = interpolate(
    frame,
    [0, timingInFrame.in - 16, timingInFrame.in + BUILT_IN_ANIMATION_TIME - 16],

    [-400, -400, 50],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easingSinFunction,
    },
  );

  const moveInLeft2 = interpolate(
    frame,
    [
      0,
      timingInFrame.in + BUILT_IN_ANIMATION_TIME - 30,
      timingInFrame.in + BUILT_IN_ANIMATION_TIME - 30 + BUILT_IN_ANIMATION_TIME,
    ],

    [-400, -400, 100],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easingSinFunction,
    },
  );

  const starOpacity = interpolate(
    frame,
    [
      0,
      timingInFrame.in + BUILT_IN_ANIMATION_TIME - 18,
      timingInFrame.in + BUILT_IN_ANIMATION_TIME - 18 + 1,
    ],
    [0, 0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return {
    moveInLeft1,
    moveInLeft2,
    starOpacity,
  };
};
