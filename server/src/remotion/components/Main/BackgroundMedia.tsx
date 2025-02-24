import { staticFile, useVideoConfig } from "remotion";
import { interpolate } from "remotion";
import { Audio } from "remotion";
import { Loop, OffthreadVideo } from "remotion";
import {
  AUDIO_VOLUME,
  INTRO_FADE_IN_TIME,
  OUTRO_FADE_TIME,
  OUTRO_IDLE_TIME,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../../constants/constants";

type BackgroundMediaProps = {
  bgMusic: string;
  bgVideo: { src: string; frameLength: number };
};

const BackgroundMedia = ({ bgMusic, bgVideo }: BackgroundMediaProps) => {
  const { durationInFrames } = useVideoConfig();

  return (
    <>
      <Loop durationInFrames={bgVideo.frameLength}>
        <OffthreadVideo
          muted
          style={{
            height: VIDEO_HEIGHT,
            width: VIDEO_WIDTH,
          }}
          src={bgVideo.src}
        />
      </Loop>
      {/* NOTE: use this if perfomance down well (2:51 -> 2:41 :v) */}
      <Audio
        loop
        loopVolumeCurveBehavior="extend"
        src={staticFile(bgMusic)}
        volume={(frame) =>
          interpolate(
            frame,
            [
              0,
              INTRO_FADE_IN_TIME,
              durationInFrames - OUTRO_FADE_TIME - OUTRO_IDLE_TIME,
              durationInFrames - OUTRO_IDLE_TIME,
              durationInFrames,
            ],
            [0, AUDIO_VOLUME, AUDIO_VOLUME, 0, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          )
        }
      />
      {/* <AudioLoop src={bgMusic} /> */}
    </>
  );
};

export default BackgroundMedia;
