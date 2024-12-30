import { Gif } from "@remotion/gif";
import { AbsoluteFill, Img } from "remotion";
import { builtInPath } from "../../../../../../constants/constants";
import { useMemoAssetArray } from "../../../../../../hooks/use-memo-asset-path";
import { memo } from "react";

type ImageLayerThreeProps = {
  images: string[];
  rotateImage: number;
  opacity: number;
  starOpacity: number;
  scale: number;
};

const ImageLayerThree = ({
  images,
  rotateImage,
  opacity,
  starOpacity,
  scale,
}: ImageLayerThreeProps) => {
  const [framePath, starFewPath, starManyPath] = useMemoAssetArray(
    ["3 frame H.png", "star_few.gif", "star_many.gif"],
    builtInPath,
  );

  return (
    <AbsoluteFill>
      <div
        style={{
          transform: `translateX(-50%) rotate(${rotateImage}deg)`,
          opacity,
        }}
        className="absolute flex top-[15%] w-[1484px] h-[399.7525px]  left-1/2"
      >
        <div className="w-1/3 h-full overflow-hidden">
          <Img
            style={{
              transform: `scale(${scale})`,
            }}
            className="object-cover object-center w-full h-full"
            src={images[0]}
          />
        </div>
        <div className="w-1/3 h-full overflow-hidden">
          <Img
            style={{
              transform: `scale(${scale})`,
            }}
            className="object-cover object-center w-full h-full"
            src={images[1]}
          />
        </div>
        <div className="w-1/3 h-full overflow-hidden">
          <Img
            style={{
              transform: `scale(${scale})`,
            }}
            className="object-cover object-center w-full h-full"
            src={images[2]}
          />
        </div>
        <Img src={framePath} className="absolute w-full h-full" />
      </div>
      <div
        style={{
          opacity: starOpacity,
        }}
        className="absolute w-[40px] h-[40px] top-[10%] right-[150px]"
      >
        <Gif width={50} loopBehavior="loop" fit="contain" src={starFewPath} />
      </div>
      <div
        style={{
          opacity: starOpacity,
        }}
        className="absolute w-[150px] h-[155.6338px] bottom-[160px] left-[220px] "
      >
        <Gif fit="contain" loopBehavior="loop" src={starManyPath} />
      </div>
    </AbsoluteFill>
  );
};

export default memo(ImageLayerThree);
