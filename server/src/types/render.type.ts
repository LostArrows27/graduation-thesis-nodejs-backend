import { RenderMediaOptions } from "@remotion/renderer";
import { ChapterWithDuration } from "../remotion/types/frame.type";
import {
  ContentSceneProps,
  IntroProps,
  RenderType,
  SpecialPartProps,
} from "../remotion/types/video.type";

export type RenderVideoOptions = Omit<
  RenderMediaOptions,
  "composition" | "serveUrl"
> & {
  inputProps: InputPropsType;
};

export type InputPropsType = {
  type: RenderType;
  videoDate: string;
  introScene: {
    firstScene: {
      images: string[];
      title: string;
    };
    secondScene: {
      images: string[];
    };
  };
  specialPart?: SpecialPartProps;
  contentScene: ChapterWithDuration[];
  // editable props -> refers to video.schema.ts
  bgMusic: string;
  bgVideo: {
    src: string;
    frameLength: number;
  };
  titleStyle: number;
  maxDuration?: number;
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
