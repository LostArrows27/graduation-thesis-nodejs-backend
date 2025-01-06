import { BuiltInTransitionProps } from "../../../../../types/content.type";
import BuiltInLayout from "./BuiltInLayout";
import { useThreeImageBuiltInFrameAnimation } from "../../../../../hooks/built-in-frame-animation/use-built-in-image-frame-animation";
import ImageLayerThree from "./three-image/ImageLayerThree";
import AssetLayerThree from "./three-image/AssetLayerThree";
import { memo } from "react";

const ThreeImageBuiltInFrame = ({
  frame: videoFrame,
  inTiming,
  outTiming,
  durationInFrames,
}: BuiltInTransitionProps) => {
  const { moveUpNote, goDown, rotateImage, opacity, starOpacity, scale } =
    useThreeImageBuiltInFrameAnimation(
      {
        in: inTiming,
        out: outTiming,
      },
      durationInFrames
    );

  const imagePath = videoFrame.slice(0, 3);

  return (
    <BuiltInLayout bg="dark">
      {/* image layer */}
      <ImageLayerThree
        images={imagePath}
        opacity={opacity}
        scale={scale}
        rotateImage={rotateImage}
        starOpacity={starOpacity}
      />
      {/* asset layer */}
      <AssetLayerThree moveUpNote={moveUpNote} goDown={goDown} />
    </BuiltInLayout>
  );
};

export default memo(ThreeImageBuiltInFrame);
