import { AbsoluteFill, Img } from "remotion";
import { NormalImageProps } from "../../../../../../types/content.type";
import { Layout } from "../NormalImageLayout";
import { useFourImageFrameAnimationStyle1 } from "../../../../../../hooks/frame-animation/use-image-frame-animation";
import { memo } from "react";

const FourImageStyle1 = ({
  frame: videoFrame,
  inTiming,
  outTiming,
  chapterIndex,
  durationInFrames,
  caption,
  location,
}: NormalImageProps) => {
  const imagePath = videoFrame.slice(0, 4);

  const { positionFirstRow, positionSecondRow, scale } =
    useFourImageFrameAnimationStyle1(
      {
        in: inTiming,
        out: outTiming,
      },
      durationInFrames
    );

  return (
    <Layout caption={caption} location={location} chapterIndex={chapterIndex}>
      <AbsoluteFill className="overflow-hidden">
        <div
          style={{
            left: `${positionFirstRow}px`,
          }}
          className="overflow-hidden absolute rounded-[28px] top-[23%] w-[500px] h-[240px]"
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
            right: `${positionFirstRow}px`,
          }}
          className="overflow-hidden shadow-2xl absolute rounded-[28px] top-[calc(23%+252px)] w-[500px] h-[240px]"
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
            left: `${positionSecondRow}px`,
          }}
          className="overflow-hidden absolute rounded-[28px] top-[23%] w-[500px] h-[240px]"
        >
          <Img
            style={{
              transform: `scale(${scale})`,
            }}
            className="object-cover object-center w-full h-full rounded-[28px]"
            src={imagePath[2]}
          />
        </div>
        <div
          style={{
            right: `${positionSecondRow}px`,
          }}
          className="overflow-hidden absolute rounded-[28px] top-[calc(23%+252px)] w-[500px] h-[240px]"
        >
          <Img
            style={{
              transform: `scale(${scale})`,
            }}
            className="object-cover object-center w-full h-full rounded-[28px]"
            src={imagePath[3]}
          />
        </div>
      </AbsoluteFill>
    </Layout>
  );
};

export default memo(FourImageStyle1);
