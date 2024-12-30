import { interpolate, useCurrentFrame } from "remotion";

export const useImageScaleAnimation = (duration: number) => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [0, duration], [1.3, 1]);

  return scale;
};
