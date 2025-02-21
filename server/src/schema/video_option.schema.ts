import { z } from "zod";

export const videoTheme = z.enum(["spring", "summer", "autumn", "winter"]);

// NOTE: for edit end point
export const videoOptionSchema = z.object({
  bgVideoTheme: z.enum(["spring", "summer", "autumn", "winter"]),
  bgMusic: z.string(),
  titleStyle: z.number(),
  introScene: z.object({
    firstScene: z.object({
      images: z.array(z.string()).length(4),
      title: z.string(),
    }),
    secondScene: z.object({
      firstCaption: z.string(),
      secondCaption: z.string(),
    }),
  }),
  outroScene: z.object({
    image: z.array(z.string()),
    caption: z.array(z.string()),
  }),
});
