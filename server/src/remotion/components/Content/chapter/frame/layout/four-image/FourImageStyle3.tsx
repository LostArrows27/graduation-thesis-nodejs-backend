import { AbsoluteFill, Img } from "remotion";
import { NormalImageProps } from "../../../../../../types/content.type";
import { Layout } from "../NormalImageLayout";
import { useFourImageFrameAnimationStyle3 } from "../../../../../../hooks/frame-animation/use-image-frame-animation";
import { memo } from "react";

const FourImageStyle3 = ({
  frame: videoFrame,
  inTiming,
  outTiming,
  chapterIndex,
  durationInFrames,
  frameIndex,
}: NormalImageProps) => {
  const imagePath = videoFrame.slice(0, 4);

  const {
    positionFirstRow,
    positionSecondRow,
    positionForthRow,
    positionThirdRow,
    scale,
  } = useFourImageFrameAnimationStyle3(
    {
      in: inTiming,
      out: outTiming,
    },
    durationInFrames,
    `random-animation--JSON-${JSON.stringify(videoFrame)}-chapter-${chapterIndex}-frame-${frameIndex}}`
  );

  return (
    <Layout chapterIndex={chapterIndex}>
      <AbsoluteFill className="overflow-hidden">
        <div
          style={{
            left: `${positionFirstRow}px`,
          }}
          className="overflow-hidden absolute rounded-[28px] top-[23%] w-[280px] h-[460px]"
        >
          <Img
            style={{
              transform: `scale(${scale})`,
            }}
            className="object-cover object-center w-full h-full rounded-[28px]"
            src={imagePath[0]}
          />
        </div>
        <div
          style={{
            left: `${positionSecondRow}px`,
          }}
          className="overflow-hidden absolute rounded-[28px] top-[23%] w-[280px] h-[460px]"
        >
          <Img
            style={{
              transform: `scale(${scale})`,
            }}
            className="object-cover object-center w-full h-full rounded-[28px]"
            src={imagePath[1]}
          />
        </div>
        <div
          style={{
            left: `${positionThirdRow}px`,
          }}
          className="overflow-hidden absolute rounded-[28px] top-[23%] w-[280px] h-[460px]"
        >
          <Img
            style={{
              transform: `scale(${scale})`,
            }}
            className="object-cover object-center w-full h-full rounded-[28px]"
            src={imagePath[1]}
          />
        </div>
        <div
          style={{
            left: `${positionForthRow}px`,
          }}
          className="overflow-hidden absolute rounded-[28px] top-[23%] w-[280px] h-[460px]"
        >
          <Img
            style={{
              transform: `scale(${scale})`,
            }}
            className="object-cover object-center w-full h-full rounded-[28px]"
            src={imagePath[1]}
          />
        </div>
      </AbsoluteFill>
    </Layout>
  );
};

export default memo(FourImageStyle3);
