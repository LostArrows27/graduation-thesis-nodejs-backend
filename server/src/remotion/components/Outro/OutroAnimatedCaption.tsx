import { useCurrentFrame } from "remotion";
import { AbsoluteFill, Img, interpolate, staticFile } from "remotion";
import {
  OUTRO_CAPTION_APPEAR_TIME,
  OUTRO_CAPTION_FADE_TIME,
  OUTRO_FIRST_CAPTION_DELAY,
  OUTRO_SECOND_CAPTION_DELAY,
  outroAssetPath,
} from "../../constants/constants";

import { loadFont } from "@remotion/google-fonts/Inter";
import { Animated, Fade, Move } from "remotion-animated";
import { memo } from "react";

const { fontFamily } = loadFont();

type OutroAnimatedCaptionProps = {
  captions: string[];
};

const OutroAnimatedCaption = ({ captions }: OutroAnimatedCaptionProps) => {
  const frame = useCurrentFrame();

  const captionAppearEndFrame =
    OUTRO_CAPTION_APPEAR_TIME + OUTRO_CAPTION_FADE_TIME;

  const opacity = interpolate(
    frame,
    [OUTRO_CAPTION_APPEAR_TIME, captionAppearEndFrame],
    [0, 1],

    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const paperPath = staticFile(outroAssetPath + "paper.png");

  return (
    <AbsoluteFill>
      <div
        style={{
          opacity,
        }}
        className="absolute overflow-hidden w-[570px] h-[331.636px] -left-[60px] top-1/2 -translate-y-1/2"
      >
        <div
          style={{
            fontFamily,
          }}
          className="absolute right-0 text-zinc-700 font-bold text-[40px] uppercase w-[calc(100%-60px)] h-full p-5 leading-relaxed tracking-normal px-7 pl-10 center text-center"
        >
          {frame <
          captionAppearEndFrame +
            OUTRO_FIRST_CAPTION_DELAY +
            OUTRO_SECOND_CAPTION_DELAY ? (
            <Animated
              animations={[
                Fade({
                  initial: 1,
                  to: 0,
                }),
              ]}
              delay={captionAppearEndFrame + OUTRO_FIRST_CAPTION_DELAY}
            >
              {captions[0]}
            </Animated>
          ) : (
            <Animated
              animations={[
                Fade({
                  initial: 0,
                  to: 1,
                  start:
                    captionAppearEndFrame +
                    OUTRO_FIRST_CAPTION_DELAY +
                    OUTRO_SECOND_CAPTION_DELAY,
                }),
                Move({
                  initialY: 100,
                  y: 0,
                  start:
                    captionAppearEndFrame +
                    OUTRO_FIRST_CAPTION_DELAY +
                    OUTRO_SECOND_CAPTION_DELAY,
                }),
              ]}
            >
              {captions[1]}
            </Animated>
          )}
        </div>
        <Img src={paperPath} className="image-fit-full" />
      </div>
    </AbsoluteFill>
  );
};

export default memo(OutroAnimatedCaption);
