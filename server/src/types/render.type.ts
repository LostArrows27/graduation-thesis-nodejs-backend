import { RenderMediaOptions } from "@remotion/renderer";
import { ChapterWithDuration } from "../remotion/types/frame.type";
import { RenderType } from "../remotion/types/video.type";

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
