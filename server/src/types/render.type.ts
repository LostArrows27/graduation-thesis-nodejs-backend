import { RenderMediaOptions } from "@remotion/renderer";
import { ChapterWithDuration } from "../remotion/types/frame.type";
import {
  ContentSceneProps,
  IntroProps,
  RenderType,
} from "../remotion/types/video.type";

export type RenderVideoOptions = Omit<
  RenderMediaOptions,
  "composition" | "serveUrl"
> & {
  inputProps: InputPropsType;
};

export type InputPropsType = {
  type: RenderType;
  introScene: {
    firstScene: {
      images: string[];
    };
    secondScene: {
      images: string[];
    };
  };
  contentScene: ChapterWithDuration[];
};

// NOTE: all props that user can modify !
export type VideoSchema = {
  type: RenderType;
  bgMusic: string;
  introScene: IntroProps;
  contentScene: ContentSceneProps;
  outroScene: {
    images: string[];
    caption: string[];
  };
};
