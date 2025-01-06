import { AbsoluteFill, Img } from "remotion";
import { NormalImageProps } from "../../../../../types/content.type";
import { Layout } from "./NormalImageLayout";
import { useTwoImageFrameAnimation } from "../../../../../hooks/frame-animation/use-image-frame-animation";
import { memo } from "react";

const ThreeImageLayout = ({
  frame: videoFrame,
  inTiming,
  outTiming,
  chapterIndex,
  durationInFrames,
}: NormalImageProps) => {
  // NOTE: similation 2 images
  const [image1, image2, image3] = videoFrame.slice(0, 3);

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
          className="absolute overflow-hidden w-[500px] top-1/4 h-[460px] rounded-[24px]"
        >
          <Img
            style={{
              transform: `scale(${scale})`,
            }}
            className="object-cover object-center w-full h-full rounded-[24px]"
            src={image1}
          />
        </div>

        <div
          style={{
            right: `${position}px`,
          }}
          className="absolute overflow-hidden gap-y-3 flex flex-col w-[500px] top-1/4 h-[460px] rounded-[24px]"
        >
          <div className="overflow-hidden w-full h-1/2 rounded-[28px]">
            <Img
              style={{
                transform: `scale(${scale})`,
              }}
              className="object-cover object-center w-full h-full rounded-[24px]"
              src={image2}
            />
          </div>
          <div className="overflow-hidden w-full h-1/2 rounded-[28px]">
            <Img
              style={{
                transform: `scale(${scale})`,
              }}
              className="object-cover object-center w-full h-full rounded-[24px]"
              src={image3}
            />
          </div>
        </div>
      </AbsoluteFill>
    </Layout>
  );
};

export default memo(ThreeImageLayout);
