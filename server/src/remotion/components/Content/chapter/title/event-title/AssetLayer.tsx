import { AbsoluteFill, Img } from "remotion";
import { eventAssetPath } from "../../../../../constants/constants";
import { memo } from "react";
import { useMemoAssetArray } from "../../../../../hooks/use-memo-asset-path";

const AssetLayer = () => {
  const [mapPath, map2Path, flyPath, laBanPath, fly2Path, flowerPath] =
    useMemoAssetArray(
      [
        "map.png",
        "map_2.png",
        "fly.png",
        "la_ban.png",
        "fly_2.png",
        "flower.png",
      ],
      eventAssetPath,
    );

  return (
    <AbsoluteFill>
      <Img
        src={mapPath}
        className="w-[800px] h-auto object-center rotate-[-25deg] -top-[600px] -right-[350px] absolute object-cover"
      />
      <Img
        src={map2Path}
        className="w-[350px] h-auto object-center -bottom-[350px] -right-[50px] absolute object-cover"
      />
      <Img
        src={flyPath}
        className="w-[120px] -top-5 rotate-12 right-[350px] h-auto object-center absolute object-cover"
      />
      <Img
        src={laBanPath}
        className="w-[110px] top-28 rotate-12 right-16 h-auto object-center absolute object-cover"
      />
      <Img
        src={fly2Path}
        className="w-[200px] bottom-28 right-16 h-auto object-center absolute object-cover"
      />
      <Img
        src={flowerPath}
        className="w-[120px] bottom-4 left-28 h-auto object-center absolute object-cover"
      />
      <Img
        src={flowerPath}
        className="w-[70px] bottom-16 left-4 h-auto object-center absolute object-cover"
      />
    </AbsoluteFill>
  );
};

export default memo(AssetLayer);
