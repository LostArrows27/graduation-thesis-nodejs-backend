import OneImageBuiltInFrame from "./built-in-frame/OneImageBuiltInFrame";
import { BuiltInTransitionProps } from "../../../../types/content.type";
import TwoImageBuiltInTransition from "./built-in-frame/TwoImageBuiltInFrame";
import ThreeImageBuiltInFrame from "./built-in-frame/ThreeImageBuiltInFrame";
import FourImageBuiltInFrame from "./built-in-frame/FourImageBuiltInFrame";
import FourImageBuiltInFrameStyle1 from "./built-in-frame/FourImageBuiltInFrameStyle1";
import SixImageBuiltInFrame from "./built-in-frame/SixImageBuiltInFrame";
import { memo } from "react";

/* NOTE:
- 1 image -> 1 frame H
- 2 image -> 2 frame H
- 3 image -> 3 frame H
- 4 image -> 4 frame V / 3 frame H + 1 frame H
- 5 image -> 3 frame H + 2 frame H / 3 frame H + 1 frame H + 1 frame H
- 6 image -> 3 frame H + 3 frame H  
*/

// TODO: add move layer before slide transition

const RemotionTransitionFrameMapping = ({
  frame,
  inTiming,
  outTiming,
  chapterIndex,
  durationInFrames,
  frameIndex,
}: BuiltInTransitionProps) => {
  const imageCount = frame.length;

  switch (imageCount) {
    case 1:
      return (
        <OneImageBuiltInFrame
          frame={frame}
          inTiming={inTiming}
          outTiming={outTiming}
          chapterIndex={chapterIndex}
          durationInFrames={durationInFrames}
          frameIndex={frameIndex}
        />
      );

    case 2:
      return (
        <TwoImageBuiltInTransition
          frame={frame}
          inTiming={inTiming}
          outTiming={outTiming}
          chapterIndex={chapterIndex}
          durationInFrames={durationInFrames}
          frameIndex={frameIndex}
        />
      );

    case 3:
      return (
        <ThreeImageBuiltInFrame
          frame={frame}
          inTiming={inTiming}
          outTiming={outTiming}
          chapterIndex={chapterIndex}
          durationInFrames={durationInFrames}
          frameIndex={frameIndex}
        />
      );

    case 4:
      return (
        <FourImageBuiltInFrame
          frame={frame}
          inTiming={inTiming}
          outTiming={outTiming}
          chapterIndex={chapterIndex}
          durationInFrames={durationInFrames}
          frameIndex={frameIndex}
        />
      );

    case 5:
      return (
        <FourImageBuiltInFrameStyle1
          frame={frame}
          inTiming={inTiming}
          outTiming={outTiming}
          chapterIndex={chapterIndex}
          durationInFrames={durationInFrames}
          frameIndex={frameIndex}
        />
      );

    case 6:
      return (
        <SixImageBuiltInFrame
          frame={frame}
          inTiming={inTiming}
          outTiming={outTiming}
          chapterIndex={chapterIndex}
          durationInFrames={durationInFrames}
          frameIndex={frameIndex}
        />
      );

    default:
      return (
        <SixImageBuiltInFrame
          frame={frame}
          inTiming={inTiming}
          outTiming={outTiming}
          chapterIndex={chapterIndex}
          durationInFrames={durationInFrames}
          frameIndex={frameIndex}
        />
      );
  }
};

export default memo(RemotionTransitionFrameMapping);
