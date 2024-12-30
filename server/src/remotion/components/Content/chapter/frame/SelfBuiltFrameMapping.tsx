import { memo } from "react";
import { SelfBuiltFrameProps } from "../../../../types/content.type";
import FiveImageLayoutMapping from "./layout/five-image/FiveImageLayoutMapping";
import FourImageStyleMapping from "./layout/four-image/FourImageStyle";
import { OneImageLayout } from "./layout/OneImageLayout";
import SixImageLayout from "./layout/SixImageLayout";
import ThreeImageLayout from "./layout/ThreeImageLayout";
import TwoImageLayout from "./layout/TwoImageLayout";

// TODO: custom event / activity frames
// 1. event frame -> instagram
// 2. activity frame -> normal frame

// NOTE: keyword for UI layout -> "n photo collage"

const SelfBuiltFrameMapping = ({
  frame,
  chapterIndex,
  inTiming,
  outTiming,
  durationInFrames,
  frameIndex,
}: SelfBuiltFrameProps) => {
  const imageCount = frame.length;

  switch (imageCount) {
    case 1:
      return (
        <OneImageLayout
          frameIndex={frameIndex}
          inTiming={inTiming}
          outTiming={outTiming}
          durationInFrames={durationInFrames}
          frame={frame}
          chapterIndex={chapterIndex}
        />
      );
    case 2:
      return (
        <TwoImageLayout
          frameIndex={frameIndex}
          inTiming={inTiming}
          outTiming={outTiming}
          durationInFrames={durationInFrames}
          frame={frame}
          chapterIndex={chapterIndex}
        />
      );
    case 3:
      return (
        <ThreeImageLayout
          frameIndex={frameIndex}
          inTiming={inTiming}
          outTiming={outTiming}
          durationInFrames={durationInFrames}
          frame={frame}
          chapterIndex={chapterIndex}
        />
      );
    case 4:
      return (
        <FourImageStyleMapping
          frameIndex={frameIndex}
          inTiming={inTiming}
          outTiming={outTiming}
          durationInFrames={durationInFrames}
          frame={frame}
          chapterIndex={chapterIndex}
        />
      );
    case 5:
      return (
        <FiveImageLayoutMapping
          frameIndex={frameIndex}
          inTiming={inTiming}
          outTiming={outTiming}
          durationInFrames={durationInFrames}
          frame={frame}
          chapterIndex={chapterIndex}
        />
      );
    case 6:
      return (
        <SixImageLayout
          frameIndex={frameIndex}
          inTiming={inTiming}
          outTiming={outTiming}
          durationInFrames={durationInFrames}
          frame={frame}
          chapterIndex={chapterIndex}
        />
      );
    default:
      return (
        <SixImageLayout
          frameIndex={frameIndex}
          inTiming={inTiming}
          outTiming={outTiming}
          durationInFrames={durationInFrames}
          frame={frame}
          chapterIndex={chapterIndex}
        />
      );
  }
};

export default memo(SelfBuiltFrameMapping);
