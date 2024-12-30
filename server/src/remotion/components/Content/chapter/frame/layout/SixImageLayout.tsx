import { AbsoluteFill, Img } from "remotion";
import { NormalImageProps } from "../../../../../types/content.type";
import { Layout } from "./NormalImageLayout";
import { useSixImageFrameAnimationStyle } from "../../../../../hooks/frame-animation/use-image-frame-animation";
import { useMemoAssetArray } from "../../../../../hooks/use-memo-asset-path";
import { memo } from "react";

const SixImageLayout = ({
  frame: videoFrame,
  inTiming,
  outTiming,

  chapterIndex,
  durationInFrames,
  frameIndex,
}: NormalImageProps) => {
  const imagePath = useMemoAssetArray(videoFrame.slice(0, 6));

  const {
    positionFirstRow,
    positionSecondRow,
    positionThirdRow,
    positionForthRow,
    positionFifthRow,
    positionSixthRow,
    scale,
  } = useSixImageFrameAnimationStyle(
    {
      in: inTiming,
      out: outTiming,
    },
    durationInFrames,
    `random-animation--JSON-${JSON.stringify(videoFrame)}-chapter-${chapterIndex}-frame-${frameIndex}}`,
  );

  return (
    <Layout chapterIndex={chapterIndex}>
      <AbsoluteFill className="overflow-hidden">
        <div
          style={{
            left: `${positionFirstRow}px`,
          }}
          className="overflow-hidden absolute rounded-[20px] top-[23%] w-[390px] h-[220px]"
        >
          <Img
            style={{
              transform: `scale(${scale})`,
            }}
            src={imagePath[0]}
            className="object-cover object-center w-full h-full rounded-[20px]"
          />
        </div>
        <div
          style={{
            left: `${positionSecondRow}px`,
          }}
          className="overflow-hidden absolute rounded-[20px] top-[23%] w-[220px] h-[220px]"
        >
          <Img
            style={{
              transform: `scale(${scale})`,
            }}
            src={imagePath[1]}
            className="object-cover object-center w-full h-full rounded-[20px]"
          />
        </div>
        <div
          style={{
            left: `${positionThirdRow}px`,
          }}
          className="overflow-hidden absolute rounded-[20px] top-[23%] w-[390px] h-[220px]"
        >
          <Img
            style={{
              transform: `scale(${scale})`,
            }}
            src={imagePath[2]}
            className="object-cover object-center w-full h-full rounded-[20px]"
          />
        </div>
        {/* down row */}
        <div
          style={{
            left: `${positionForthRow}px`,
          }}
          className="overflow-hidden absolute rounded-[20px] top-[calc(23%+240px)] w-[250px] h-[220px]"
        >
          <Img
            style={{
              transform: `scale(${scale})`,
            }}
            src={imagePath[3]}
            className="object-cover object-center w-full h-full rounded-[20px]"
          />
        </div>
        <div
          style={{
            left: `${positionFifthRow}px`,
          }}
          className="overflow-hidden absolute rounded-[20px] top-[calc(23%+240px)] w-[500px] h-[220px]"
        >
          <Img
            style={{
              transform: `scale(${scale})`,
            }}
            src={imagePath[4]}
            className="object-cover object-center w-full h-full rounded-[20px]"
          />
        </div>
        <div
          style={{
            left: `${positionSixthRow}px`,
          }}
          className="overflow-hidden absolute rounded-[20px] top-[calc(23%+240px)] w-[250px] h-[220px]"
        >
          <Img
            style={{
              transform: `scale(${scale})`,
            }}
            src={imagePath[5]}
            className="object-cover object-center w-full h-full rounded-[20px]"
          />
        </div>
      </AbsoluteFill>
    </Layout>
  );
};

export default memo(SixImageLayout);
