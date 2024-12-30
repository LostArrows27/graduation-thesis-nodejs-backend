import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { none } from "@remotion/transitions/none";
import { slide } from "@remotion/transitions/slide";
import { Fragment } from "react/jsx-runtime";
import { Easing } from "remotion";
import {
  TITLE_TRANSITION_TIME,
  CHAPTER_TRANSITION_TIME,
  FRAME_TRANSITION_TIME,
} from "../../../../constants/constants";
import { calculateFrameDuration } from "../../../../utils/calculate-video-timeline";
import FrameMapping from "./FrameMapping";
import { Frame, Transition } from "../../../../types/frame.type";

type ChapterContentProps = {
  frame: Frame;
  transition: Transition;
  chapterIndex: number;
  index: number;
  transitionType: Transition["type"];
};

const ChapterFrame = ({
  frame,
  transition,
  chapterIndex,
  index,
  transitionType,
}: ChapterContentProps) => {
  // NOTE: calculate additional time by transition
  const firstChapterAdditionalTime = index === 0 ? TITLE_TRANSITION_TIME : 0;

  const lastChapterAdditionalTime =
    index === frames.length - 1 ? CHAPTER_TRANSITION_TIME : 0;

  const frameTotalDuration =
    calculateFrameDuration(frame, index, frames.length, transition) +
    firstChapterAdditionalTime +
    lastChapterAdditionalTime;

  // NOTE: calculate in + out for each chapter -> during that time don't do anything
  // 1. first chapter -> only out-trans
  // 2. last chapter -> only in-trans

  const transitionInDuration =
    firstChapterAdditionalTime + (index === 0 ? 0 : FRAME_TRANSITION_TIME);

  const transitionOutDuration =
    lastChapterAdditionalTime +
    (index === frames.length - 1 ? 0 : FRAME_TRANSITION_TIME);

  const imagesNews = frame.images.map((image) => {
    return {
      ...image,
      path: image.path.replace(
        "D:/Code Space/AI/image_classification/model/image",
        "/images",
      ),
    };
  });

  frame.images = imagesNews;

  return (
    <Fragment key={index}>
      <TransitionSeries.Sequence durationInFrames={frameTotalDuration}>
        <FrameMapping
          durationInFrames={frameTotalDuration}
          chapterIndex={chapterIndex}
          frame={frame}
          frameIndex={index}
          type={transitionType}
          timingInFrame={{
            in: transitionInDuration,
            out: transitionOutDuration,
          }}
        />
      </TransitionSeries.Sequence>
      {index !== frames.length - 1 && (
        <TransitionSeries.Transition
          presentation={
            transitionType === "self-built"
              ? none()
              : slide({
                  direction: "from-right",
                })
          }
          timing={linearTiming({
            durationInFrames: FRAME_TRANSITION_TIME,
            easing:
              transitionType === "self-built"
                ? undefined
                : Easing.out(Easing.cubic),
          })}
        />
      )}
    </Fragment>
  );
};

export default ChapterFrame;
