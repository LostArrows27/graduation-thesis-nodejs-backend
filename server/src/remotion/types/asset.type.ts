export type Asset = {
  images: string[];
  videos: string[];
  title: string[];
  music?: string[];
};

export type Season = "spring" | "summer" | "fall" | "winter";

export type AssetsType = "images" | "videos" | "music" | "title";

export type SeasonalAssets = {
  [key in Season]: Asset;
};
