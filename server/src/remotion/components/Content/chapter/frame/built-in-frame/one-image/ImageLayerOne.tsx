import { AbsoluteFill, Img } from "remotion";
import { loadFont } from "@remotion/google-fonts/Itim";
import { memo } from "react";
import { useMemoAssetPath } from "../../../../../../hooks/use-memo-asset-path";

const { fontFamily } = loadFont();

type ImageLayerProps = {
  moveInImage: number;
  moveInImage2: number;
  scale: number;
  images: string[];
};

const ImageLayerOne = ({
  moveInImage,
  moveInImage2,
  scale,
  images,
}: ImageLayerProps) => {
  const imagePath = useMemoAssetPath(images[0]);

  return (
    <AbsoluteFill>
      <div
        style={{
          transform: `translate(${moveInImage}px, ${moveInImage2}px) rotate(-5deg)`,
        }}
        className="absolute flex top-[15%]"
      >
        <div className="w-[620px] bg-slate-800 relative h-[405.325px]">
          {/* <Img
                className="absolute object-cover object-center w-full h-full"
                src={staticFile(builtInPath + "bg_dark.png")}
              /> */}
          <div className="absolute center text-white text-center flex-col w-full h-full py-[70px] px-[90px]">
            <h1 style={{ fontFamily }} className="mb-10 text-5xl font-bold">
              This is our caption. Replace later
            </h1>
            <div style={{ fontFamily }} className="flex justify-between gap-4">
              {["fire_camp", "holiday"].map((text, index) => (
                <span key={index} className="text-2xl">
                  #{text}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="w-[620px] overflow-hidden h-[405.325px]">
          <Img
            style={{
              transform: `scale(${scale})`,
            }}
            className="object-cover object-center w-full h-full"
            src={imagePath}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default memo(ImageLayerOne);
