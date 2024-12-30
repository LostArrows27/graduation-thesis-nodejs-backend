import { AbsoluteFill, Img } from "remotion";
import { EventTitleProps } from "../../../../types/content.type";
import { eventAssetPath } from "../../../../constants/constants";
import CaptionLayer from "./event-title/CaptionLayer";
import AssetLayer from "./event-title/AssetLayer";
import { useMemoAssetPath } from "../../../../hooks/use-memo-asset-path";
import { memo } from "react";
import ImageLayer from "./event-title/ImageLayer";

// TODO: add opacity for first chapter
const EventPostTitle = ({ images, index, duration }: EventTitleProps) => {
  const bgPath = useMemoAssetPath(eventAssetPath + "bg.jpg");

  return (
    <AbsoluteFill className="overflow-hidden">
      <AbsoluteFill>
        <Img src={bgPath} className="image-fit-full" />
      </AbsoluteFill>
      {/* caption layer */}
      <CaptionLayer index={index} duration={duration} images={images} />
      {/* asset layer */}
      <AssetLayer />
      {/* image layer */}
      <ImageLayer images={images} duration={duration} />
    </AbsoluteFill>
  );
};

export default memo(EventPostTitle);
