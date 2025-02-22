import { transitionEffects } from "../constants/frame";

// Video -> Chapter -> Frame -> Image
export type Chapter = {
  title: string;
  frame: Frame[];
  transition: Transition;
  hashtag?: string[];
};

export type ChapterWithDuration = Chapter & {
  durationInFrames: number;
};

export type Frame = {
  type: FrameType;
  category: FrameCategory;
  images: ImageMetadata[];
  caption?: string;
  hashtag?: string[];
  location?: string;
  activity?: string;
};

export type FrameType = "single" | "multi";

export type FrameCategory = "activity" | "event";

type TransitionEffect = (typeof transitionEffects)[number];

// Dynamically generate the Transition type
export type Transition = {
  in: TransitionEffect["in"];
  out: TransitionEffect["out"];
  type: TransitionEffect["type"];
};

export type ImageJSON = {
  [key: string]: ImageMetadata[];
};

export type ImageMetadata = {
  path: string;
  labels: {
    location: Labels;
    activity: Labels;
    event: Labels;
  };
};

export type Labels = {
  [key: string]: number;
};
