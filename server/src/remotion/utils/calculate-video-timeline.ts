import {
  BUILT_IN_MULTI_FRAME_DURATION,
  BUILT_IN_SINGLE_FRAME_DURATION,
  CHAPTER_TRANSITION_TIME,
  FRAME_TRANSITION_TIME,
  MULTI_IMAGE_FRAME_DURATION,
  OUTRO_FADE_TIME,
  SINGLE_IMAGE_FRAME_DURATION,
  TITLE_FRAME_DURATION,
  TITLE_TRANSITION_TIME,
} from "../constants/constants";
import {
  ChapterWithDuration,
  Frame,
  ImageJSON,
  Transition,
} from "../types/frame.type";
import { generateVideoContent } from "./generate-video-content";

// called transition time = b
/* 1. Video -> have transition after every chapter (end transition)
    - 1st chapter -> b (1b of next)
    - other chapter -> 2b (1b of cur + 1b of next)
    - remove -> (n-1) * b
   2. Chapter = title + transition = content (no end transition)
    - title -> 1b 
    - content -> 1b
    - remove -> 1b
   3. Content = frame + transition (no end transition)
    - 1st frame / last frame -> 1b
    - other frame -> 2b
    - remove -> (n-1) * b
*/
export const calculateVideoTimeline = (
  imageData: ImageJSON,
): ChapterWithDuration[] => {
  const chapters = generateVideoContent(imageData);

  // NOTE: slide "chapters" if wanna test with fewer chaps
  const newChapters = chapters.map((chapter, index) => {
    const framesTotalDuration = calculateTotalFrameDuration(
      chapter.frame,
      chapter.transition,
    );

    const chapterTotalDuration = calculateChapterDuration(
      framesTotalDuration,
      index,
      chapters.length,
    );

    return {
      ...chapter,
      durationInFrames: chapterTotalDuration,
    };
  });

  return newChapters;
};

export const calculateVideoDuration = (chapters: ChapterWithDuration[]) => {
  const totalChapterDuration = chapters.reduce(
    (acc, chapter) => acc + chapter.durationInFrames,
    0,
  );

  const totalDuration =
    totalChapterDuration - CHAPTER_TRANSITION_TIME * (chapters.length - 1);

  return totalDuration;
};

export const calculateChapterDuration = (
  framesTotalDuration: number,
  index: number,
  total: number,
) => {
  // NOTE: every chap have in + out transition
  //       -> add chap trans time at begin + end of chap
  // except first chapter -> no in transitionc
  const chapterDuration =
    (index === 0 ? 0 : CHAPTER_TRANSITION_TIME) +
    TITLE_FRAME_DURATION +
    TITLE_TRANSITION_TIME;

  const contentDuration =
    TITLE_TRANSITION_TIME +
    framesTotalDuration +
    (index === total - 1 ? OUTRO_FADE_TIME : CHAPTER_TRANSITION_TIME); // NOTE :last chapter faster fade out for outro appear

  const totalDuration =
    chapterDuration + contentDuration - TITLE_TRANSITION_TIME;

  return totalDuration;
};

export const calculateTotalFrameDuration = (
  frames: Frame[],
  chapterTransitionType: Transition,
) => {
  const chapterTotalFrameDuration =
    frames.reduce((acc, frame, frameIndex) => {
      return (
        acc +
        calculateFrameDuration(
          frame,
          frameIndex,
          frames.length,
          chapterTransitionType,
        )
      );
    }, 0) -
    FRAME_TRANSITION_TIME * (frames.length - 1);

  return chapterTotalFrameDuration;
};

export const calculateFrameDuration = (
  frame: Frame,
  index: number,
  total: number,
  chapterTransitionType: Transition,
) => {
  if (total === 1 && frame.type === "single") {
    if (chapterTransitionType.type === "self-built") {
      return SINGLE_IMAGE_FRAME_DURATION;
    }

    return BUILT_IN_SINGLE_FRAME_DURATION;
  }

  if (total === 1 && frame.type === "multi") {
    if (chapterTransitionType.type === "self-built") {
      return MULTI_IMAGE_FRAME_DURATION;
    }

    return BUILT_IN_MULTI_FRAME_DURATION;
  }

  const frameDuration =
    chapterTransitionType.type === "self-built"
      ? frame.type === "single"
        ? SINGLE_IMAGE_FRAME_DURATION
        : MULTI_IMAGE_FRAME_DURATION
      : frame.type === "single"
        ? BUILT_IN_SINGLE_FRAME_DURATION
        : BUILT_IN_MULTI_FRAME_DURATION;

  const additionalTime =
    index === 0 || index === total - 1
      ? FRAME_TRANSITION_TIME
      : FRAME_TRANSITION_TIME * 2;

  return frameDuration + additionalTime;
};
