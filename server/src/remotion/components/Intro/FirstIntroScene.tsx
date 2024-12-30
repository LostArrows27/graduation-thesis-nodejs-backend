import { AbsoluteFill } from "remotion";
import { FirstIntroSceneProps } from "../../types/video.type";
import TitleFrame from "./First/TitleFrame";
import ImageFrameLayer from "./First/ImageFramesLayer";
import { memo } from "react";

const FirstIntroScene = ({ title, time, images }: FirstIntroSceneProps) => {
  return (
    <AbsoluteFill>
      <ImageFrameLayer images={images} />
      <TitleFrame title={title} time={time} />
    </AbsoluteFill>
  );
};

export default memo(FirstIntroScene);
