import { Img } from "remotion";
import { AbsoluteFill } from "remotion";
import { NormalImageProps } from "../../../../../../types/content.type";
import { Layout } from "../NormalImageLayout";
import { useFourImageFrameAnimationStyle2 } from "../../../../../../hooks/frame-animation/use-image-frame-animation";
import { useMemoAssetArray } from "../../../../../../hooks/use-memo-asset-path";
import { memo } from "react";

const FourImageStyle2 = ({
  frame: videoFrame,
  inTiming,
  outTiming,
  chapterIndex,
  durationInFrames,
}: NormalImageProps) => {
  const imagePath = useMemoAssetArray(videoFrame.slice(0, 4));

  const { positionFirstRow, positionSecondRow, positionThirdRow, scale } =
    useFourImageFrameAnimationStyle2(
      {
        in: inTiming,
        out: outTiming,
      },
      durationInFrames,
    );

  return (
    <Layout chapterIndex={chapterIndex}>
      <AbsoluteFill className="overflow-hidden">
        <div
          style={{
            left: `${positionFirstRow}px`,
          }}
          className="overflow-hidden absolute rounded-[28px] top-[23%] w-[340px] h-[460px]"
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
          className="overflow-hidden flex flex-col gap-y-3 w-[320px] absolute top-[23%] h-[460px]"
        >
          <div className="h-1/2 w-full overflow-hidden rounded-[28px]">
            <Img
              src={imagePath[1]}
              style={{
                transform: `scale(${scale})`,
              }}
              className="object-cover object-center w-full h-full rounded-[28px]"
            />
          </div>
          <div className="h-1/2 w-full overflow-hidden rounded-[28px]">
            <Img
              src={imagePath[2]}
              style={{
                transform: `scale(${scale})`,
              }}
              className="object-cover object-center w-full h-full rounded-[28px]"
            />
          </div>
        </div>
        <div
          style={{
            left: `${positionThirdRow}px`,
          }}
          className="overflow-hidden absolute rounded-[28px] top-[23%] w-[340px] h-[460px]"
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

export default memo(FourImageStyle2);
