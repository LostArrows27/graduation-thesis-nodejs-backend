import { spring, useCurrentFrame } from "remotion";
import { VIDEO_FPS } from "../../../constants/constants";
import { memo } from "react";

type SpringAnimationcaptionProps = {
  index: number;
  part: string;
};

const SpringAnimationcaption = ({
  index,
  part,
}: SpringAnimationcaptionProps) => {
  const frame = useCurrentFrame();

  const delay = index * 5;

  const scale = spring({
    fps: VIDEO_FPS,
    frame: frame - delay * 7,
    config: {
      damping: 150,
    },
  });

  return (
    <div
      key={index}
      style={{
        transform: `scale(${scale})`,
      }}
    >
      {part}
    </div>
  );
};

export default memo(SpringAnimationcaption);
