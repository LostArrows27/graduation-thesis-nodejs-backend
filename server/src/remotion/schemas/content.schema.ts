import { z } from "zod";

// NOTE: every time update frame -> update this
const transitionSchema = z.object({
  in: z.union([
    z.literal("slide-from-left"),
    z.literal("slide-in-from-2-side"),
    z.literal("from-right"),
    z.literal("from-top"),
    z.literal("from-bottom"),
    z.literal("from-left"),
  ]),
  out: z.union([
    z.literal("slide-to-right"),
    z.literal("slide-out-from-2-side"),
    z.literal("to-left"),
    z.literal("to-bottom"),
    z.literal("to-top"),
    z.literal("to-right"),
  ]),
  type: z.union([z.literal("self-built"), z.literal("remotion-transitions")]),
});

const ImageMetadataSchema = z.object({
  path: z.string(),
  labels: z.object({
    location: z.record(z.number()),
    activity: z.record(z.number()),
    event: z.record(z.number()),
  }),
});

export const contentSceneSchema = z.array(
  z.object({
    title: z.string(),
    frame: z.array(
      z.object({
        type: z.union([z.literal("single"), z.literal("multi")]),
        category: z.union([z.literal("activity"), z.literal("event")]),
        images: z.array(ImageMetadataSchema),
      }),
    ),
    transition: transitionSchema,
    durationInFrames: z.number(),
  }),
);
