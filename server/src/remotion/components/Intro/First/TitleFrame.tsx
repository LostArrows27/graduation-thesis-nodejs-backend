import { AbsoluteFill, useCurrentFrame } from "remotion";
import { chooseIntroSubText } from "../../../utils/choose-intro-title";
import { loadFont } from "@remotion/google-fonts/LexendDeca";
import { loadFont as loadSubFont } from "@remotion/google-fonts/BalsamiqSans";
import useTitleFrameAnimation from "../../../hooks/use-title-frame-animation";
import {
  SUBTEXT_DELAY_DURATION,
  TITLE_FRAME_DELAY_TIME,
  TITLE_FRAME_SCALE_DURATION,
  TYPE_WRITER_SPEED,
} from "../../../constants/constants";
import TypeWriter from "../TypeWriter";
import { memo } from "react";

const { fontFamily } = loadFont();
const { fontFamily: subFontFamily } = loadSubFont();

type TitleFrameProps = {
  title: string;
  time: Date;
};

const TitleFrame = ({ title, time }: TitleFrameProps) => {
  const frame = useCurrentFrame();

  const { opacity, scale } = useTitleFrameAnimation(
    TITLE_FRAME_SCALE_DURATION,
    TITLE_FRAME_DELAY_TIME,
  );

  const animationCompleteFrame =
    TITLE_FRAME_DELAY_TIME + TITLE_FRAME_SCALE_DURATION;

  const titleTypingDuration = title.length * TYPE_WRITER_SPEED;
  const subtextStartFrame =
    animationCompleteFrame + titleTypingDuration + SUBTEXT_DELAY_DURATION;

  return (
    <AbsoluteFill
      style={{
        fontFamily,
      }}
    >
      <AbsoluteFill className="center">
        <div
          className="center bg flex-col"
          style={{
            width: 800,
            opacity,
            transform: `scale(${scale})`,
          }}
        >
          <span className="box-decoration-clone uppercase w-auto text-white text-[80px] leading-[1.1] font-bold rounded-2xl px-3 py-4 text-center bg-blue-500">
            <TypeWriter
              text={title}
              delayInframe={animationCompleteFrame - 8} // start faster of 8 frames
            />
          </span>

          <span
            style={{ fontFamily: subFontFamily }}
            className={`box-decoration-clone text-white rounded-2xl text-[40px] font-semibold mt-10 px-3 py-0 text-center bg-blue-500 ${
              frame < subtextStartFrame ? "opacity-0" : "opacity-100"
            }`}
          >
            <TypeWriter
              text={chooseIntroSubText(time)}
              delayInframe={subtextStartFrame}
            />
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default memo(TitleFrame);
