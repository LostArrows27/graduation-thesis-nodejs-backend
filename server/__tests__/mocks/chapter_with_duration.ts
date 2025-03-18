import { VIDEO_FPS } from "../../src/remotion/constants/constants";
import { ChapterWithDuration } from "../../src/remotion/types/frame.type";

export const mockChapterWithDuration: ChapterWithDuration[] = [
  {
    title: "Chapter 1",
    frame: [
      {
        type: "multi",
        category: "event",
        images: [],
        caption: "Caption",
      },
      {
        type: "multi",
        category: "event",
        images: [],
        caption: "Caption",
      },
    ],
    transition: {
      in: "from-top",
      out: "to-bottom",
      type: "remotion-transitions",
    },
    durationInFrames: 20 * VIDEO_FPS,
  },
  {
    title: "Chapter 2",
    frame: [
      {
        type: "single",
        category: "activity",
        images: [],
        caption: "Caption",
      },
      {
        type: "single",
        category: "activity",
        images: [],
        caption: "Caption",
      },
    ],
    transition: {
      in: "from-top",
      out: "to-bottom",
      type: "remotion-transitions",
    },
    durationInFrames: 20 * VIDEO_FPS,
  },
];
