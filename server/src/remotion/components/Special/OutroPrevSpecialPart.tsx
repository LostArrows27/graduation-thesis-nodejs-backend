import {
  useCurrentFrame,
  interpolate,
  AbsoluteFill,
  Img,
  Sequence,
} from "remotion";
import {
  outroAssetPath,
  SPECIAL_PART_FADE_OUT_TIME,
  SPECIAL_PART_LENGTH,
} from "../../constants/constants";
import { useMemoAssetPath } from "../../hooks/use-memo-asset-path";

const OutroPrevSpecialPart = () => {
  const frame = useCurrentFrame();
  const fade = interpolate(
    frame,
    [SPECIAL_PART_LENGTH - SPECIAL_PART_FADE_OUT_TIME, SPECIAL_PART_LENGTH],
    [0, 0.5],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    }
  );

  const bg = useMemoAssetPath(outroAssetPath + "bg.jpg");

  return (
    <Sequence
      from={SPECIAL_PART_LENGTH - SPECIAL_PART_FADE_OUT_TIME}
      durationInFrames={SPECIAL_PART_FADE_OUT_TIME}
    >
      <AbsoluteFill style={{ opacity: fade }}>
        <AbsoluteFill>
          <Img className="image-fit-full" src={bg} />
        </AbsoluteFill>
      </AbsoluteFill>
    </Sequence>
  );
};

export default OutroPrevSpecialPart;
