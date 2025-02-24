import { Season } from "../../remotion/types/asset.type";

export const fromSeasonToDate = (season: Season): Date => {
  const year = new Date().getFullYear();

  const seasons = {
    spring: new Date(year, 2, 20), // March 20th
    summer: new Date(year, 5, 21), // June 21st
    fall: new Date(year, 8, 22), // September 22nd
    winter: new Date(year, 11, 21), // December 21st
  };

  return seasons[season];
};
