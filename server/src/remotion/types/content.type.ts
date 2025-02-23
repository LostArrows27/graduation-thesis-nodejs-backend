import {
  ChapterWithDuration,
  Frame,
  FrameCategory,
  Transition,
} from "./frame.type";

// chapter props
export type VideoChapterProps = ChapterWithDuration & {
  index: number;
  titleStyle: number;
};

export type ChapterTitleProps = {
  title: string;
  images: string[];
  index: number;
  titleStyle: number;
  frameCategory: FrameCategory;
  duration: number;
  hashtag?: string[];
};

export type ChapterStyleProps = {
  title: string;
  images: string[];
  index: number;
  hashtag?: string[];
};

export type EventTitleProps = {
  title: string;
  images: string[];
  index: number;
  duration: number;
  hashtag?: string[];
};

export type ChapterContentProps = {
  frames: Frame[];
  transition: Transition;
  chapterIndex: number;
};

// frame props
export type FrameMappingProps = {
  type: Transition["type"];
  frame: Frame;
  chapterIndex: number;
  timingInFrame: FrameTransitionTiming;
  durationInFrames: number;
  frameIndex: number;
};

export type FrameTransitionTiming = {
  in: number;
  out: number;
};

export type SelfBuiltFrameProps = Omit<
  FrameMappingProps,
  "type" | "frame" | "timingInFrame"
> & {
  frame: string[];
  inTiming: number;
  outTiming: number;
  caption: string;
  hashtag: string[];
  location: string;
};

export type BuiltInTransitionProps = Omit<
  FrameMappingProps,
  "type" | "frame" | "timingInFrame"
> & {
  frame: string[];
  inTiming: number;
  outTiming: number;
  caption: string;
  hashtag: string[];
  location: string;
};

export type BuiltInTransitionLayoutProps = {
  children: React.ReactNode;
  bg: "light" | "dark";
  imageNumber?: number;
  location: string;
};

export type NormalImageProps = SelfBuiltFrameProps;

export type NormalImageLayoutProps = {
  children: React.ReactNode;
  chapterIndex: number;
  location: string;
  caption: string;
};
