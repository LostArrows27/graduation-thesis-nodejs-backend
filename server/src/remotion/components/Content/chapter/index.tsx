import { linearTiming, TransitionSeries } from "@remotion/transitions";
import ChapterTitle from "./title/ChapterTitle";
import ChapterContent from "./ChapterContent";
import {
  CHAPTER_TRANSITION_TIME,
  TITLE_FRAME_DURATION,
  TITLE_TRANSITION_TIME,
} from "../../../constants/constants";
import { slide } from "@remotion/transitions/slide";
import { VideoChapterProps } from "../../../types/content.type";
import { chooseChapterTitleImage } from "../../../utils/choose-chapter-title-image";
import { Easing } from "remotion";
import { memo, useCallback, useMemo } from "react";

// NOTE: every frame was added a transition time
// 1. if no use remotion-transitions -> none() -> self built
// 2. if use remotion-transitions -> exp: slide()

// NOTE: chapter = title + transition + (content = frame + transition)

const VideoChapter = ({
  title,
  transition,
  durationInFrames,
  frame,
  index,
  titleStyle,
}: VideoChapterProps) => {
  // NOTE: add dev if render error:)
  const chapterTitleImages = useMemo(
    () => chooseChapterTitleImage(frame, title, index, titleStyle),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const easingFunction = useCallback(
    (t: number) => Easing.inOut(Easing.sin)(t),
    [],
  );

  const chapterTitleDuration =
    (index === 0 ? 0 : CHAPTER_TRANSITION_TIME) +
    TITLE_FRAME_DURATION +
    TITLE_TRANSITION_TIME;

  const chapterContentDuration =
    durationInFrames + TITLE_TRANSITION_TIME - chapterTitleDuration;

  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={chapterTitleDuration}>
        <ChapterTitle
          index={index}
          titleStyle={titleStyle}
          title={title}
          frameCategory={frame[0].category}
          images={chapterTitleImages}
          duration={chapterTitleDuration}
        />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({
          direction: "from-right",
        })}
        timing={linearTiming({
          durationInFrames: TITLE_TRANSITION_TIME,
          easing: easingFunction,
        })}
      />
      <TransitionSeries.Sequence durationInFrames={chapterContentDuration}>
        <ChapterContent
          chapterIndex={index}
          transition={transition}
          frames={frame}
        />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};

export default memo(VideoChapter);
