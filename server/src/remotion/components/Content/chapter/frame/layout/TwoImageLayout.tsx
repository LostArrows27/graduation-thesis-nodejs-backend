import { AbsoluteFill, Img } from "remotion";
import { NormalImageProps } from "../../../../../types/content.type";
import { Layout } from "./NormalImageLayout";
import { useTwoImageFrameAnimation } from "../../../../../hooks/frame-animation/use-image-frame-animation";
import { memo } from "react";

const TwoImageLayout = ({
  frame: videoFrame,
  inTiming,
  outTiming,
  chapterIndex,
  durationInFrames,
}: NormalImageProps) => {
  // NOTE: similation 2 images
  const [image1, image2] = [videoFrame[0], videoFrame[1]];

  const { position, scale } = useTwoImageFrameAnimation(
    {
      in: inTiming,
      out: outTiming,
    },
    durationInFrames
  );

  return (
    <Layout chapterIndex={chapterIndex}>
      <AbsoluteFill className="overflow-hidden">
        <div
          style={{
            left: `${position}px`,
          }}
          className="absolute overflow-hidden w-[500px] top-1/4 h-[460px] rounded-[36px]"
        >
          <Img
            style={{
              transform: `scale(${scale})`,
            }}
            className="object-cover shadow-2xl object-center w-full h-full rounded-[36px]"
            src={image1}
          />
        </div>
        <div
          style={{
            right: `${position}px`,
          }}
          className="absolute overflow-hidden w-[500px] top-1/4 h-[460px] rounded-[36px]"
        >
          <Img
            style={{
              transform: `scale(${scale})`,
            }}
            className="object-cover shadow-2xl object-center w-full h-full rounded-[36px]"
            src={image2}
          />
        </div>
      </AbsoluteFill>
    </Layout>
  );
};

export default memo(TwoImageLayout);
