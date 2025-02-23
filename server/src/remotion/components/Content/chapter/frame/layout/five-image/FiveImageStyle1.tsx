import { AbsoluteFill, Img } from "remotion";
import { NormalImageProps } from "../../../../../../types/content.type";
import { Layout } from "../NormalImageLayout";
import { useFiveImageFrameAnimationStyle1 } from "../../../../../../hooks/frame-animation/use-image-frame-animation";
import { memo } from "react";

const FiveImageStyle1 = ({
  frame: videoFrame,
  inTiming,
  outTiming,
  chapterIndex,
  durationInFrames,
  location,
  caption,
}: NormalImageProps) => {
  const imagePath = videoFrame.slice(0, 5);

  const { positionFirstCol, positionSecondCol, positionThirdCol, scale } =
    useFiveImageFrameAnimationStyle1(
      {
        in: inTiming,
        out: outTiming,
      },
      durationInFrames
    );

  return (
    <Layout location={location} caption={caption} chapterIndex={chapterIndex}>
      <AbsoluteFill className="overflow-hidden">
        {/* first column */}
        <div
          style={{
            left: `${positionFirstCol}px`,
          }}
          className="overflow-hidden flex flex-col gap-y-4 w-[320px] absolute top-[23%] h-[460px]"
        >
          <div className="h-1/2 w-full overflow-hidden rounded-[20px]">
            <Img
              src={imagePath[0]}
              style={{
                transform: `scale(${scale})`,
              }}
              className="object-cover object-center w-full h-full rounded-[20px]"
            />
          </div>
          <div className="h-1/2 w-full overflow-hidden rounded-[20px]">
            <Img
              src={imagePath[1]}
              style={{
                transform: `scale(${scale})`,
              }}
              className="object-cover object-center w-full h-full  rounded-[20px]"
            />
          </div>
        </div>
        {/* second column */}
        <div
          style={{
            left: `${positionSecondCol}px`,
          }}
          className="overflow-hidden absolute w-[360px] rounded-[20px] top-[23%] h-[460px]"
        >
          <Img
            src={imagePath[2]}
            style={{
              transform: `scale(${scale})`,
            }}
            className="object-cover object-center w-full h-full  rounded-[20px]"
          />
        </div>
        {/* third column */}
        <div
          style={{
            left: `${positionThirdCol}px`,
          }}
          className="overflow-hidden flex flex-col gap-y-4 w-[320px] absolute top-[23%] h-[460px]"
        >
          <div className="h-1/2 w-full overflow-hidden rounded-[20px]">
            <Img
              src={imagePath[3]}
              style={{
                transform: `scale(${scale})`,
              }}
              className="object-cover object-center w-full h-full  rounded-[20px]"
            />
          </div>

          <div className="h-1/2 w-full overflow-hidden rounded-[20px]">
            <Img
              src={imagePath[4]}
              style={{
                transform: `scale(${scale})`,
              }}
              className="object-cover object-center w-full h-full  rounded-[20px]"
            />
          </div>
        </div>
      </AbsoluteFill>
    </Layout>
  );
};

export default memo(FiveImageStyle1);
