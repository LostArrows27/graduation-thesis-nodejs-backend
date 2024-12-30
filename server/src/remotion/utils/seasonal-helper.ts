import { random } from "remotion";
import { seasonAssets } from "../assets/seasonal_assets";
import { Season, AssetsType, Asset } from "../types/asset.type";

const getSeasonFromDate = (date: Date): Season => {
  const year = date.getFullYear();
  const seasons = [
    { name: "spring", start: new Date(year, 2, 20) }, // March 20th
    { name: "summer", start: new Date(year, 5, 21) }, // June 21st
    { name: "fall", start: new Date(year, 8, 22) }, // September 22nd
    { name: "winter", start: new Date(year, 11, 21) }, // December 21st
  ];

  for (let i = 0; i < seasons.length; i++) {
    if (date >= seasons[i].start) {
      if (i === seasons.length - 1 || date < seasons[i + 1].start) {
        return seasons[i].name as Season;
      }
    }
  }
  return "winter";
};

export const getSeasonalAssetsBySeason = (
  season: Season,
  assetType: AssetsType,
): string[] => {
  if (seasonAssets[season][assetType]) return seasonAssets[season][assetType];
  return [];
};

export const getSeasonalAssetsByDate = (
  date: Date,
  assetType: AssetsType,
): string[] => {
  const season = getSeasonFromDate(date);
  return seasonAssets[season][assetType] || [];
};

export const getAllAssetsBySeason = (season: Season): Asset => {
  return seasonAssets[season];
};

export const getRandomAssetByDate = (
  date: Date,
  assetType: AssetsType,
): string => {
  const season = getSeasonFromDate(date);
  const assets = getSeasonalAssetsBySeason(season, assetType);
  return assets[Math.floor(random(null) * assets.length)];
};
