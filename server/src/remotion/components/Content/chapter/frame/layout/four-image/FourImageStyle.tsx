import { random } from "remotion";
import { NormalImageProps } from "../../../../../../types/content.type";
import FourImageStyle1 from "./FourImageStyle1";
import FourImageStyle2 from "./FourImageStyle2";
import FourImageStyle3 from "./FourImageStyle3";
import { memo, useMemo } from "react";

const FourImageStyleMapping = ({
  frame: videoFrame,
  inTiming,
  outTiming,
  chapterIndex,
  frameIndex,
  durationInFrames,
  location,
  caption,
  hashtag,
}: NormalImageProps) => {
  const index = useMemo(
    () =>
      Math.floor(
        random(
          `four-image-chapter-${chapterIndex}-frame-${frameIndex}-JSON-${JSON.stringify(videoFrame)}`
        ) * 3
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  switch (index) {
    case 0:
      return (
        <FourImageStyle1
          location={location}
          caption={caption}
          hashtag={hashtag}
          frameIndex={frameIndex}
          inTiming={inTiming}
          outTiming={outTiming}
          durationInFrames={durationInFrames}
          frame={videoFrame}
          chapterIndex={chapterIndex}
        />
      );

    case 1:
      return (
        <FourImageStyle2
          location={location}
          caption={caption}
          hashtag={hashtag}
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
        <FourImageStyle3
          location={location}
          caption={caption}
          hashtag={hashtag}
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
        <FourImageStyle3
          location={location}
          caption={caption}
          hashtag={hashtag}
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

export default memo(FourImageStyleMapping);
