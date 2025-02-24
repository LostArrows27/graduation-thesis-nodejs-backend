import {
  CHAPTER_TRANSITION_TIME,
  INTRO_SCENE_LENGTH,
  OUTRO_SCENE_LENGTH,
  VIDEO_FPS,
} from "../constants/constants";
import { ChapterWithDuration } from "../types/frame.type";
import {
  calculateChapterDuration,
  calculateTotalFrameDuration,
  calculateVideoDuration,
} from "./calculate-video-timeline";

type ChoosenChapterContent = {
  chapters: ChapterWithDuration[];
  contentTotalDuration: number;
};

// NOTE:
// 1. choose chapter based on max duration
// 2. recalculate the duration of each chapter (include: transition at end / begin / between chapters)
export const chooseChapterBasedOnMaxDuration = (
  chapters: ChapterWithDuration[],
  maxDuration?: number
): ChoosenChapterContent => {
  if (!maxDuration || maxDuration <= 0)
    return {
      chapters,
      contentTotalDuration: calculateVideoDuration(chapters),
    };

  let totalDuration = INTRO_SCENE_LENGTH + OUTRO_SCENE_LENGTH;

  const choosenChapter: ChapterWithDuration[] = [];

  for (let i = 0; i < chapters.length; i++) {
    const tempDuration =
      totalDuration +
      chapters[i].durationInFrames -
      CHAPTER_TRANSITION_TIME * choosenChapter.length;

    // maxDuration -> seconds -> frames
    if (tempDuration <= maxDuration * VIDEO_FPS) {
      choosenChapter.push(chapters[i]);
      totalDuration = tempDuration;
    } else {
      break;
    }
  }

  // maxDuration too short -> choose the first chapter
  if (choosenChapter.length === 0) {
    choosenChapter.push(chapters[0]);
    totalDuration =
      INTRO_SCENE_LENGTH +
      OUTRO_SCENE_LENGTH +
      choosenChapter[0].durationInFrames;
  }

  return {
    chapters: calculateVideoTimelineFromChapterList(choosenChapter),
    contentTotalDuration: calculateVideoDuration(choosenChapter),
  };
};

const calculateVideoTimelineFromChapterList = (
  chapters: ChapterWithDuration[]
): ChapterWithDuration[] => {
  const newChapters = chapters.map((chapter, index) => {
    const framesTotalDuration = calculateTotalFrameDuration(
      chapter.frame,
      chapter.transition
    );

    const chapterTotalDuration = calculateChapterDuration(
      framesTotalDuration,
      index,
      chapters.length
    );

    return {
      ...chapter,
      durationInFrames: chapterTotalDuration,
    };
  });

  return newChapters;
};
