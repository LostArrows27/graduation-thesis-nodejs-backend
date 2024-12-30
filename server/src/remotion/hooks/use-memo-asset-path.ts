import { useMemo } from "react";
import { staticFile } from "remotion";

export const useMemoAssetPath = (assetPath: string) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => staticFile(assetPath), []);
};

export const useMemoAssetArray = (assetPaths: string[], prefix?: string) => {
  return useMemo(
    () => assetPaths.map((path) => staticFile(prefix ? prefix + path : path)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
};
