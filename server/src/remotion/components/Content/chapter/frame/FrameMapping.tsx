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
          caption={frame.caption || "Let's review our trip."}
          hashtag={
            frame.hashtag && frame.hashtag.length >= 2
              ? frame.hashtag.slice(0, 2)
              : ["trip_recap", "holiday"]
          }
          location={frame.location || "Hà Nội, Việt Nam"}
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
          hashtag={
            frame.hashtag && frame.hashtag.length >= 2
              ? frame.hashtag.slice(0, 2)
              : ["trip_recap", "holiday"]
          }
          caption={frame.caption || "Let's review our trip."}
          location={frame.location || "Hà Nội, Việt Nam"}
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
          hashtag={
            frame.hashtag && frame.hashtag.length >= 2
              ? frame.hashtag.slice(0, 2)
              : ["trip_recap", "holiday"]
          }
          caption={frame.caption || "Let's review our trip !"}
          location={frame.location || "Hà Nội, Việt Nam"}
        />
      );
  }
};

export default memo(FrameMapping);
