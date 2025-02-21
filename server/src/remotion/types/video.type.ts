import { z } from "zod";
import { compositionSchema, introSceneSchema } from "../schemas/video.schema";
import { ChapterWithDuration } from "./frame.type";
import { contentSceneSchema } from "../schemas/content.schema";

export type MainProps = z.infer<typeof compositionSchema>;

export type IntroProps = z.infer<typeof introSceneSchema>;

export type ContentProps = {
  data: ChapterWithDuration[];
  titleStyle: number;
};

export type FirstIntroSceneProps = IntroProps["firstScene"];

export type SecondIntroSceneProps = IntroProps["secondScene"];

export type ContentSceneProps = z.infer<typeof contentSceneSchema>;

export type OutroProps = {
  data: MainProps["outroScene"];
};

export type RenderType = MainProps["type"];
