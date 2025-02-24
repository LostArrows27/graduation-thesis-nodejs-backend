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

export const videoEditSchema = z.object({
  title: z
    .string()
    .max(50, "Title must be less than 50 characters")
    .min(1, "Title is required"),
  titleStyle: z.number().refine((value) => value === 0 || value === 1, {
    message: "titleStyle must be either 0 or 1",
  }),
  bgMusic: z.string().min(1, "bgMusic is required"),
  bgVideoTheme: z
    .enum(["spring", "summer", "fall", "winter"])
    .refine((value) => ["spring", "summer", "fall", "winter"].includes(value), {
      message:
        "bgVideoTheme must be one of the following: spring, summer, fall, winter",
    }),
  maxDuration: z.number().optional(),
});
