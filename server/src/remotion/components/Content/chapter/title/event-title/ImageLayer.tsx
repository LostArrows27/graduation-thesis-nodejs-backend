import { AbsoluteFill, Img, staticFile } from "remotion";
import { eventAssetPath } from "../../../../../constants/constants";
import { memo, useMemo } from "react";
import { useImageScaleAnimation } from "../../../../../hooks/use-image-scale-animation";
import { useMemoAssetPath } from "../../../../../hooks/use-memo-asset-path";

type ImageLayerProps = {
  images: string[];
  duration: number;
};

const ImageLayer = ({ images, duration }: ImageLayerProps) => {
  const scale = useImageScaleAnimation(duration);

  const newImageURL = useMemo(
    () =>
      images.map((image) =>
        staticFile(
          image.replace(
            "D:/Code Space/AI/image_classification/model/image",
            "/images",
          ),
        ),
      ),
    [images],
  );

  const ghimPath = useMemoAssetPath(eventAssetPath + "ghim.png");

  return (
    <AbsoluteFill>
      <div className="w-[450px] aspect-[7/5] absolute left-10 top-[100px]">
        <div className="w-full border-[16px] border-white h-full overflow-hidden">
          <Img
            style={{
              transform: `scale(${scale})`,
            }}
            src={newImageURL[0]}
            className="image-fit-full "
          />
        </div>
        <Img
          src={ghimPath}
          className="image-fit absolute w-[70px] h-auto left-1/2 -translate-x-[70%] -top-8"
        />
      </div>
      <div className="w-[260px] aspect-[5/6] absolute left-[350px] top-[300px]">
        <div className="w-full h-full overflow-hidden border-[10px] border-white">
          <Img
            style={{
              transform: `scale(${scale})`,
            }}
            src={newImageURL[1]}
            className="image-fit-full"
          />
        </div>
        <Img
          src={ghimPath}
          className="image-fit absolute w-[70px] h-auto left-1/2 -translate-x-[70%] -top-8"
        />
      </div>
      <div className="w-[140px] aspect-[1/1.1] absolute left-[530px] top-[80px]">
        <div className="w-full h-full overflow-hidden border-[8px] border-white">
          <Img
            style={{
              transform: `scale(${scale})`,
            }}
            src={newImageURL[1]}
            className="image-fit-full "
          />
        </div>
        <Img
          src={ghimPath}
          className="image-fit absolute w-[70px] h-auto left-1/2 -translate-x-[70%] -top-10"
        />
      </div>
    </AbsoluteFill>
  );
};

export default memo(ImageLayer);
