import { memo } from "react";
import { AbsoluteFill, Img } from "remotion";

type ImageLayerTwoProps = {
  moveInImage: number;
  moveInImage2: number;
  scale: number;
  image1: string;
  image2: string;
};

const ImageLayerTwo = ({
  moveInImage,
  moveInImage2,
  scale,
  image1,
  image2,
}: ImageLayerTwoProps) => {
  return (
    <AbsoluteFill>
      <div
        style={{
          transform: `translate(${moveInImage}px, ${moveInImage2}px) rotate(-5deg)`,
        }}
        className="absolute flex top-[15%]"
      >
        <div className="w-[620px] h-[405.325px] overflow-hidden">
          <Img
            style={{
              transform: `scale(${scale})`,
            }}
            className="object-cover object-center w-full h-full"
            src={image1}
          />
        </div>
        <div className="w-[620px] h-[405.325px] overflow-hidden">
          <Img
            style={{
              transform: `scale(${scale})`,
            }}
            className="object-cover object-center w-full h-full"
            src={image2}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default memo(ImageLayerTwo);
