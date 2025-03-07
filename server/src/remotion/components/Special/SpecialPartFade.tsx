import {
  useCurrentFrame,
  interpolate,
  AbsoluteFill,
  Img,
  Sequence,
} from "remotion";
import {
  outroAssetPath,
  SPECIAL_PART_FADE_IN_TIME,
} from "../../constants/constants";
import { useMemoAssetPath } from "../../hooks/use-memo-asset-path";

const SpecialPartFade = () => {
  const bg = useMemoAssetPath(outroAssetPath + "bg.jpg");

  return (
    <Sequence durationInFrames={SPECIAL_PART_FADE_IN_TIME}>
      <AbsoluteFill style={{ opacity: 0.5 }}>
        <AbsoluteFill>
          <Img className="image-fit-full" src={bg} />
        </AbsoluteFill>
      </AbsoluteFill>
    </Sequence>
  );
};

export default SpecialPartFade;
