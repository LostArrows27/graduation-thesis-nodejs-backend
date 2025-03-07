// contain schema + props
import { z } from "zod";
import { contentSceneSchema } from "./content.schema";

/** 0. Overall
 * background music
 * background video / background image
 */

/** 1. First Scene
 * title over all
 * time title
 * 4 images
 */

/** 2. Second Scene
 * first caption
 * second caption
 * images[4][5]
 */

export const introSceneSchema = z.object({
  firstScene: z.object({
    title: z.string(),
    time: z.date(),
    images: z.array(z.string()).length(4),
  }),
  secondScene: z.object({
    firstCaption: z.string(),
    secondCaption: z.string(),
    images: z.array(z.string()),
    // direction: z
    //   .union([z.literal("vertical"), z.literal("horizontal")])
    //   .default("vertical"),
  }),
});

export const faceSchema = z.object({
  image: z.string(),
  name: z.string(),
  coordinate: z.array(z.number()).length(5),
  times: z.number(),
});

export const specialPartSchema = z.object({
  totalFaces: z.number(),
  faces: z.array(faceSchema),
});

export const compositionSchema = z.object({
  type: z.enum(["dev", "prod"]),
  contentLength: z.number(),
  videoDate: z.union([z.string(), z.date()]),
  introScene: introSceneSchema,
  contentScene: contentSceneSchema,
  specialPart: specialPartSchema,
  outroScene: z.object({
    image: z.array(z.string()),
    caption: z.array(z.string()),
  }),
  bgMusic: z.string(),
  bgVideo: z.object({
    src: z.string(),
    frameLength: z.number(),
  }),
  titleStyle: z.number(),
  maxDuration: z.number().optional(),
});
