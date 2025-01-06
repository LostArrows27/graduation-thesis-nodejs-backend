import { FrameMappingProps } from "../../../../types/content.type";
import RemotionTransitionFrameMapping from "./RemotionTransitionFrameMapping";
import SelfBuiltFrameMapping from "./SelfBuiltFrameMapping";
import { memo, useMemo } from "react";

const FrameMapping = ({
  type,
  frame,
  chapterIndex,
  timingInFrame,
  durationInFrames,
  frameIndex,
}: FrameMappingProps) => {
  // NOTE: add dev dep if error:))
  const processedFrame = useMemo(() => {
    return frame.images.map((image) => image.path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  switch (type) {
    case "remotion-transitions":
      return (
        <RemotionTransitionFrameMapping
          frameIndex={frameIndex}
          durationInFrames={durationInFrames}
          inTiming={timingInFrame.in}
          outTiming={timingInFrame.out}
          chapterIndex={chapterIndex}
          frame={processedFrame}
        />
      );
    case "self-built":
      return (
        <SelfBuiltFrameMapping
          frameIndex={frameIndex}
          durationInFrames={durationInFrames}
          inTiming={timingInFrame.in}
          outTiming={timingInFrame.out}
          chapterIndex={chapterIndex}
          frame={processedFrame}
        />
      );
    default:
      return (
        <SelfBuiltFrameMapping
          frameIndex={frameIndex}
          durationInFrames={durationInFrames}
          inTiming={timingInFrame.in}
          outTiming={timingInFrame.out}
          chapterIndex={chapterIndex}
          frame={processedFrame}
        />
      );
  }
};

export default memo(FrameMapping);
