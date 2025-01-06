import { Img, interpolate, useCurrentFrame } from "remotion";
import {
  OUTRO_IMAGE_FRAME_FADE_TIME,
  outroAssetPath,
} from "../../constants/constants";
import { memo } from "react";
import { useMemoAssetPath } from "../../hooks/use-memo-asset-path";

type OutroImageFrameProps = {
  path: string;
  startFrame: number;
};

const OutroImageFrame = ({ path, startFrame }: OutroImageFrameProps) => {
  const framePath = useMemoAssetPath(outroAssetPath + "frame.png");

  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + OUTRO_IMAGE_FRAME_FADE_TIME],
    [0, 1],

    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <div
      style={{
        opacity,
      }}
      className="relative w-[350px] h-[364.11px] "
    >
      <div className="absolute overflow-hidden w-[288px] h-[268.5px] top-[19.6px] left-[38px]">
        <Img src={path} className="image-fit-full" />
      </div>
      <Img src={framePath} className="image-fit-full" />
    </div>
  );
};

export default memo(OutroImageFrame);
