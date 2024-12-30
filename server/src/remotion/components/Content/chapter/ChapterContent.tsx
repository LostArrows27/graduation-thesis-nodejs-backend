import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import {
  CHAPTER_TRANSITION_TIME,
  FRAME_TRANSITION_TIME,
  TITLE_TRANSITION_TIME,
} from "../../../constants/constants";
import { Fragment } from "react/jsx-runtime";
import { calculateFrameDuration } from "../../../utils/calculate-video-timeline";
import { ChapterContentProps } from "../../../types/content.type";
import { none } from "@remotion/transitions/none";
import FrameMapping from "./frame/FrameMapping";
import { Easing } from "remotion";
import { memo, useMemo, useCallback } from "react";
import { Frame } from "../../../types/frame.type";

const ChapterContent = ({
  frames,
  transition,
  chapterIndex,
}: ChapterContentProps) => {
  const transitionConfig = useMemo(
    () => ({
      presentation:
        transition.type === "self-built"
          ? none()
          : slide({ direction: "from-right" }),
      easing:
        transition.type === "self-built" ? undefined : Easing.out(Easing.cubic),
    }),
    [transition.type],
  );

  const generateSequence = useCallback(
    (frame: Frame, index: number) => {
      // NOTE: calculate additional time by transition
      const firstChapterAdditionalTime =
        index === 0 ? TITLE_TRANSITION_TIME : 0;

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

      return (
        <TransitionSeries.Sequence
          key={`sequence-${index}`}
          durationInFrames={frameTotalDuration}
        >
          <FrameMapping
            durationInFrames={frameTotalDuration}
            chapterIndex={chapterIndex}
            frame={frame}
            frameIndex={index}
            type={transition.type}
            timingInFrame={{
              in: transitionInDuration,
              out: transitionOutDuration,
            }}
          />
        </TransitionSeries.Sequence>
      );
    },
    [frames, transition, chapterIndex],
  );

  const generateTransition = useCallback(
    (index: number) => {
      if (index !== frames.length - 1) {
        return (
          <TransitionSeries.Transition
            key={`transition-${index}`}
            presentation={transitionConfig.presentation}
            timing={linearTiming({
              durationInFrames: FRAME_TRANSITION_TIME,
              easing: transitionConfig.easing,
            })}
          />
        );
      }
      return null;
    },
    [frames.length, transitionConfig.easing, transitionConfig.presentation],
  );

  return (
    <TransitionSeries>
      {frames.map((frame, index) => (
        <Fragment key={index}>
          {generateSequence(frame, index)}
          {generateTransition(index)}
        </Fragment>
      ))}
    </TransitionSeries>
  );
};

export default memo(ChapterContent);
