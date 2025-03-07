import { Easing, interpolate, useCurrentFrame } from "remotion";
import { useCallback } from "react";

export const useEasingSinFunction = (
  frameRange: number[],
  positionRange: number[]
) => {
  const easingSinFunction = useCallback(
    (t: number) => Easing.out(Easing.sin)(t),
    []
  );

  const frame = useCurrentFrame();

  const position = interpolate(frame, frameRange, positionRange, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingSinFunction,
  });

  return position;
};

export const useEasingOutCubicFunction = (
  frameRange: number[],
  positionRange: number[]
) => {
  const easingOutCubicFunction = useCallback(
    (t: number) => Easing.out(Easing.cubic)(t),
    []
  );

  const frame = useCurrentFrame();

  const position = interpolate(frame, frameRange, positionRange, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingOutCubicFunction,
  });

  return position;
};
