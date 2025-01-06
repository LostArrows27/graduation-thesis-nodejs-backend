import { AbsoluteFill, Img } from "remotion";
import { NormalImageProps } from "../../../../../types/content.type";
import { Layout } from "./NormalImageLayout";
import { useOneImageFrameAnimation } from "../../../../../hooks/frame-animation/use-image-frame-animation";
import { memo } from "react";

export const OneImageLayout = memo(
  ({
    frame: videoFrame,
    inTiming,
    outTiming,
    chapterIndex,
    durationInFrames,
  }: NormalImageProps) => {
    // NOTE: simulation 1 images
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const imagePath = videoFrame[0];

    const { position: left, scale } = useOneImageFrameAnimation(
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
              left: `${left}%`,
            }}
            className="absolute overflow-hidden shadow-2xl rounded-[36px] -translate-x-1/2 w-[800px] h-[450px] top-[25%] "
          >
            <Img
              style={{
                transform: `scale(${scale})`,
              }}
              className="object-cover shadow-2xl object-center w-full h-full rounded-[36px]"
              src={imagePath}
            />
          </div>
        </AbsoluteFill>
      </Layout>
    );
  }
);
