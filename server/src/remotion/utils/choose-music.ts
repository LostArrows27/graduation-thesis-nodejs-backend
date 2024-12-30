import { random, staticFile } from "remotion";

const introCategories = ["accoutic", "folk", "happy", "emotional"];

export const chooseIntroMusic = (): string => {
  const category =
    introCategories[Math.floor(random(null) * introCategories.length)];

  const number = Math.floor(random(null) * 6) + 1;

  return staticFile(`/music/intro/${category}_${number}.mp3`);
};

export const chooseContentMusic = (): string => {
  return `/music/happy_1.mp3`;
};

export const chooseOutroMusic = (): string => {
  return `/music/happy_2.mp3`;
};
