import { random } from "remotion";
import { NormalImageProps } from "../../../../../../types/content.type";
import FiveImageStyle1 from "./FiveImageStyle1";
import FiveImageStyle2 from "./FiveImageStyle2";
import { memo, useMemo } from "react";

const FiveImageLayoutMapping = ({
  frame: videoFrame,
  inTiming,
  outTiming,
  chapterIndex,
  durationInFrames,
  frameIndex,
}: NormalImageProps) => {
  const index = useMemo(
    () =>
      Math.floor(
        random(
          `four-image-chapter-${chapterIndex}-frame-${frameIndex}-JSON-${JSON.stringify(videoFrame)}`,
        ) * 2,
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  switch (index) {
    case 1:
      return (
        <FiveImageStyle1
          frameIndex={frameIndex}
          inTiming={inTiming}
          outTiming={outTiming}
          durationInFrames={durationInFrames}
          frame={videoFrame}
          chapterIndex={chapterIndex}
        />
      );

    case 2:
      return (
        <FiveImageStyle2
          frameIndex={frameIndex}
          inTiming={inTiming}
          outTiming={outTiming}
          durationInFrames={durationInFrames}
          frame={videoFrame}
          chapterIndex={chapterIndex}
        />
      );
    default:
      return (
        <FiveImageStyle2
          frameIndex={frameIndex}
          inTiming={inTiming}
          outTiming={outTiming}
          durationInFrames={durationInFrames}
          frame={videoFrame}
          chapterIndex={chapterIndex}
        />
      );
  }
};

export default memo(FiveImageLayoutMapping);
