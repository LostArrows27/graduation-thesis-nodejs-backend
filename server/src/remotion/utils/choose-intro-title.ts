import { random } from "remotion";
import { getSeasonalAssetsByDate } from "./seasonal-helper";

const introTitles = [
  "Our memorable\nmoments",
  "Our memorable\ntrip",
  "Our memories",
  "Our journey\ntogether",
  "Our trip recap",
  "Our moments recap",
];

export const chooseIntroTitle = (time?: Date): string => {
  let seasonTitles: string[] = [];

  if (time) {
    seasonTitles = getSeasonalAssetsByDate(time, "title");
  }

  const allTitles = [...introTitles, ...seasonTitles];

  return allTitles[Math.floor(random(null) * allTitles.length)];
};

export const chooseIntroSubText = (time: Date): string => {
  const month = time.getMonth() + 1;
  const year = time.getFullYear();

  return `Tháng ${month} - ${year}`;
};
