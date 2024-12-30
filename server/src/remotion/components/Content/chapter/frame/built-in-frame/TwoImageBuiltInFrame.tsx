import { AbsoluteFill } from "remotion";
import { BuiltInTransitionProps } from "../../../../../types/content.type";
import BuiltInLayout from "./BuiltInLayout";
import {
  useOneImageBuiltInFrameAnimation,
  useTwoImageBuiltInFrameAnimation,
} from "../../../../../hooks/built-in-frame-animation/use-built-in-image-frame-animation";
import AssetLayerTwo from "./two-image/AssetLayerTwo";
import { useMemoAssetArray } from "../../../../../hooks/use-memo-asset-path";
import ImageLayerTwo from "./two-image/ImageLayerTwo";
import { memo } from "react";

const TwoImageBuiltInFrame = ({
  frame: videoFrame,
  inTiming,
  outTiming,
  durationInFrames,
}: BuiltInTransitionProps) => {
  const images = videoFrame.slice(0, 2);

  const { moveLeft, moveRight, moveDown, moveUp, moveInImage, moveInImage2 } =
    useOneImageBuiltInFrameAnimation(
      {
        in: inTiming,
        out: outTiming,
      },
      durationInFrames,
    );

  const { moveUpNote, scale } = useTwoImageBuiltInFrameAnimation(
    {
      in: inTiming,
      out: outTiming,
    },
    durationInFrames,
  );

  const [image1, image2] = useMemoAssetArray([images[0], images[1]]);

  return (
    <BuiltInLayout bg="dark">
      <AbsoluteFill>
        {/* image layer */}
        <ImageLayerTwo
          moveInImage={moveInImage}
          moveInImage2={moveInImage2}
          scale={scale}
          image1={image1}
          image2={image2}
        />
        {/* asset layer */}
        <AssetLayerTwo
          moveUpNote={moveUpNote}
          moveDown={moveDown}
          moveLeft={moveLeft}
          moveRight={moveRight}
          moveUp={moveUp}
        />
      </AbsoluteFill>
    </BuiltInLayout>
  );
};

export default memo(TwoImageBuiltInFrame);
