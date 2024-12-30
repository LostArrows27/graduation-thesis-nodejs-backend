import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";
import {
  OUTRO_PREV_PART_TOTAL_LENGTH,
  outroAssetPath,
} from "../../constants/constants";
import { memo } from "react";
import { useMemoAssetPath } from "../../hooks/use-memo-asset-path";

const OutroPrevPast = () => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [0, OUTRO_PREV_PART_TOTAL_LENGTH], [0, 0.5], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const bg = useMemoAssetPath(outroAssetPath + "bg.jpg");

  return (
    <AbsoluteFill style={{ opacity: fade }}>
      <AbsoluteFill>
        <Img className="image-fit-full" src={bg} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default memo(OutroPrevPast);
