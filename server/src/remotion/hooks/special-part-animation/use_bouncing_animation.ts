import { useCurrentFrame } from "remotion";

export const useBounceAnimation = (
  amplitude = 15, // How high it bounces (pixels)
  frequency = 120, // How fast it bounces (lower = faster)
  phase = 0 // Offset the starting position
) => {
  const frame = useCurrentFrame();

  // Create a continuous bouncing effect using sine wave
  // sin() returns values between -1 and 1
  const position =
    amplitude * Math.sin((frame / frequency) * Math.PI * 2 + phase);

  return position;
};
