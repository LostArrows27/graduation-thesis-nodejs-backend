import { staticFile } from "remotion";
import { imageJSON } from "../assets/images";
import { calculateVideoTimeline } from "../utils/calculate-video-timeline";
import { VIDEO_FPS } from "./constants";
import { cloudinaryImage } from "./image";
import { RenderType } from "../types/video.type";

export const generateDefaultVideoProps = (fakeDate: Date) => {
  return {
    type: "dev" as RenderType,
    titleStyle: 0,
    contentLength: 60 * VIDEO_FPS,
    videoDate: fakeDate,
    bgMusic: staticFile("/music/intro/accoutic_2.mp3"),
    bgVideo: {
      src: staticFile("/videos/season_bg/spring/spring_6.mov"),
      frameLength: 10 * VIDEO_FPS,
    },
    outroScene: {
      image: [],
      caption: [],
    },
    introScene: {
      firstScene: {
        title: "Our Trip Recap",
        time: fakeDate,
        images: Array.from({ length: 4 }, (_, i) => {
          return staticFile(`/images/intro/first/first_scene_${i + 1}.jpg`);
        }),
      },
      secondScene: {
        firstCaption: "Sẵn sàng ôn lại\nkhoảnh khắc đáng nhớ ?",
        secondCaption: "Bắt đầu ngay thôi !",
        images: cloudinaryImage,
        // images: Array.from({ length: 16 }, (_, i) => {
        //   return `https://inybkzznasdhmswsixhd.supabase.co/storage/v1/object/public/test/test%20(${i + 1}).jpg`;
        // }),
        // direction: "vertical",
      },
    },
    contentScene: calculateVideoTimeline(imageJSON).map(
      (chapterWithDuration) => {
        return {
          ...chapterWithDuration,
          frame: chapterWithDuration.frame.map((frame) => {
            return {
              ...frame,
              images: frame.images.map((img) => {
                return {
                  ...img,
                  path: staticFile(
                    img.path.replace(
                      "D:/Code Space/AI/image_classification/model/image",
                      "/images"
                    )
                  ),
                };
              }),
            };
          }),
        };
      }
    ),
  };
};
