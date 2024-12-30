/* eslint-disable @remotion/volume-callback */
import { Audio, useCurrentFrame, useVideoConfig } from "remotion";
import { interpolate } from "remotion";
import {
  INTRO_FADE_IN_TIME,
  OUTRO_FADE_TIME,
  OUTRO_IDLE_TIME,
  AUDIO_VOLUME,
} from "../../constants/constants";
const AudioLoop = ({ src }: { src: string }) => {
  const frame = useCurrentFrame();

  const { durationInFrames } = useVideoConfig();

  const volume = interpolate(
    frame,
    [
      0,
      INTRO_FADE_IN_TIME,
      durationInFrames - OUTRO_FADE_TIME - OUTRO_IDLE_TIME,
      durationInFrames - OUTRO_IDLE_TIME,
      durationInFrames,
    ],
    [0, AUDIO_VOLUME, AUDIO_VOLUME, 0, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return <Audio loop src={src} volume={volume} />;
};

export default AudioLoop;
