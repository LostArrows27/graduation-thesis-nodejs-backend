import { SeasonalAssets } from "../types/asset.type";

export const seasonAssets: SeasonalAssets = {
  spring: {
    images: [],
    videos: [
      ...Array.from({ length: 7 }, (_, i) => {
        if (i === 5) return "/videos/season_bg/spring/spring_6.mov";
        return `/videos/season_bg/spring/spring_${i + 1}.mp4`;
      }),
    ],
    title: ["Spring Story", "Spring Memories"],
  },
  summer: {
    images: [],
    videos: Array.from({ length: 10 }, (_, i) => {
      return `/videos/season_bg/summer/summer_${i + 1}.mp4`;
    }),
    title: ["Summer Story", "Summer Memories"],
  },
  fall: {
    images: [],
    videos: Array.from({ length: 8 }, (_, i) => {
      return `/videos/season_bg/autumn/autumn_${i + 1}.mp4`;
    }),
    title: ["Fall Story", "Fall Memories"],
  },
  winter: {
    images: [],
    videos: Array.from({ length: 9 }, (_, i) => {
      return `/videos/season_bg/winter/winter_${i + 1}.mp4`;
    }),
    title: ["Winter Story", "Winter Memories"],
  },
};
