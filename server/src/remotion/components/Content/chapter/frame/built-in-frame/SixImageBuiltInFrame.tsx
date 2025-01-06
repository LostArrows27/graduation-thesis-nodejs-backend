import { AbsoluteFill, Img, staticFile } from "remotion";
import { BuiltInTransitionProps } from "../../../../../types/content.type";
import BuiltInLayout from "./BuiltInLayout";
import { builtInPath } from "../../../../../constants/constants";
import { loadFont } from "@remotion/google-fonts/Itim";
import {
  useFourImageBuiltInFrameStyle1Animation,
  useSixImageBuiltInFrameAnimation,
} from "../../../../../hooks/built-in-frame-animation/use-built-in-image-frame-animation";
import { Gif } from "@remotion/gif";
import { memo } from "react";
import { useMemoAssetArray } from "../../../../../hooks/use-memo-asset-path";

const { fontFamily } = loadFont();

// NOTE: re-use 3 image layout:)
const SixImageBuiltInFrame = ({
  frame: videoFrame,
  inTiming,
  outTiming,
  durationInFrames,
}: BuiltInTransitionProps) => {
  const { moveUp, moveDown, opacity, scale } =
    useFourImageBuiltInFrameStyle1Animation(
      {
        in: inTiming,
        out: outTiming,
      },
      durationInFrames
    );

  const { moveInLeft1, moveInLeft2, starOpacity } =
    useSixImageBuiltInFrameAnimation({
      in: inTiming,
      out: outTiming,
    });

  const imagesPath = videoFrame.slice(0, 6);

  return (
    <BuiltInLayout bg="dark">
      {/* image layer */}
      <ImageLayerSix
        images={imagesPath}
        moveUp={moveUp}
        moveDown={moveDown}
        opacity={opacity}
        scale={scale}
      />
      {/* 5th + 6th image layer */}
      <ImageLayerSecondSix
        moveInLeft1={moveInLeft1}
        moveInLeft2={moveInLeft2}
        scale={scale}
        images={imagesPath}
      />
      {/* asset layer */}
      <AssetLayerSix starOpacity={starOpacity} opacity={opacity} />
    </BuiltInLayout>
  );
};

type ImageLayerSixProps = {
  images: string[];
  moveUp: number;
  moveDown: number;
  opacity: number;
  scale: number;
};

const ImageLayerSix = memo(
  ({ images, moveUp, moveDown, opacity, scale }: ImageLayerSixProps) => {
    const [markPath, twoFramePath] = useMemoAssetArray(
      ["mark.png", "2 frame V.png"],
      builtInPath
    );

    return (
      <AbsoluteFill>
        <div className="rotate-[5deg] absolute w-[500px] h-[100%] top-1/2 right-8 -translate-y-1/2">
          <div
            style={{
              top: `${moveUp}%`,
            }}
            className="h-4/5 absolute left-0 w-1/2"
          >
            <Img
              style={{
                opacity,
              }}
              src={markPath}
              className="w-[80px] scale-x-[-1] h-auto absolute -rotate-180 -top-12 -left-10"
            />
            <div className="h-1/2 w-full overflow-hidden">
              <Img
                style={{
                  transform: `scale(${scale})`,
                }}
                src={images[0]}
                className="object-cover object-center w-full h-full"
              />
            </div>
            <div className="h-1/2 w-full overflow-hidden">
              <Img
                style={{
                  transform: `scale(${scale})`,
                }}
                src={images[1]}
                className="object-cover object-center w-full h-full"
              />
            </div>
            <Img
              src={twoFramePath}
              className="absolute top-0 object-cover object-center w-full h-full"
            />
          </div>
          <div
            style={{
              top: `${moveDown}%`,
            }}
            className="h-4/5 absolute right-0 w-1/2"
          >
            <Img
              style={{
                opacity,
              }}
              src={markPath}
              className="w-[80px] scale-x-[-1] h-auto absolute -bottom-12 -right-8"
            />
            <div className="h-1/2 w-full overflow-hidden">
              <Img
                style={{
                  transform: `scale(${scale})`,
                }}
                src={images[2]}
                className="object-cover object-center w-full h-full"
              />
            </div>
            <div className="h-1/2 w-full overflow-hidden">
              <Img
                style={{
                  transform: `scale(${scale})`,
                }}
                src={images[3]}
                className="object-cover object-center w-full h-full"
              />
            </div>
            <Img
              src={twoFramePath}
              className="absolute top-0 object-cover object-center w-full h-full"
            />
          </div>
        </div>
      </AbsoluteFill>
    );
  }
);

type AssetLayerSixProps = {
  starOpacity: number;
  opacity: number;
};

const AssetLayerSix = memo(({ starOpacity, opacity }: AssetLayerSixProps) => {
  const [starFewPath, starManyPath, tapePath, notePath] = useMemoAssetArray(
    ["star_few.gif", "star_many.gif", "tape.png", "note.png"],
    builtInPath
  );

  return (
    <>
      <AbsoluteFill>
        <AbsoluteFill>
          <div
            style={{
              bottom: `${200}px`,
              left: `${400}px`,
              opacity,
            }}
            className="absolute w-[340px] left-32 h-[243.1px]"
          >
            <Img
              className="object-cover absolute -top-8 -left-8 object-center z-20 rotate-90 w-[100px] h-auto "
              src={tapePath}
            />
            <Img
              className="absolute object-cover object-center w-full h-full rotate-180"
              src={notePath}
            />
            <div
              className="absolute flex-col center text-4xl text-center z-[10] w-full h-[80%] p-5"
              style={{
                fontFamily,
              }}
            >
              <h1 className="mb-5">This is our caption. Replace later</h1>
              <div style={{ fontFamily }} className="flex gap-4">
                {["fire_camp", "holiday"].map((text, index) => (
                  <span key={index} className="text-2xl">
                    #{text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
      <AbsoluteFill>
        <div
          style={{
            opacity: starOpacity,
          }}
          className="absolute w-[40px] h-[40px] top-[12%] right-[250px]"
        >
          <Gif width={50} loopBehavior="loop" fit="contain" src={starFewPath} />
        </div>
      </AbsoluteFill>
      <AbsoluteFill>
        <div
          style={{
            opacity: starOpacity,
          }}
          className="absolute w-[150px] h-[155.6338px] bottom-[250px] left-[120px] "
        >
          <Gif fit="contain" loopBehavior="loop" src={starManyPath} />
        </div>
      </AbsoluteFill>
    </>
  );
});

type ImageLayerSecondSixProps = {
  moveInLeft1: number;
  moveInLeft2: number;
  scale: number;
  images: string[];
};

const ImageLayerSecondSix = memo(
  ({ moveInLeft1, moveInLeft2, scale, images }: ImageLayerSecondSixProps) => {
    return (
      <>
        <AbsoluteFill>
          <div
            style={{
              left: `${moveInLeft1}px`,
            }}
            className="w-[250px] -rotate-12 -top-4 absolute h-[384.6154px]"
          >
            <div className="w-full h-full overflow-hidden">
              <Img
                style={{
                  transform: `scale(${scale})`,
                }}
                src={images[4]}
                className="object-cover object-center w-full h-full"
              />
            </div>
            <Img
              src={staticFile(builtInPath + "1 frame dark V.png")}
              className="absolute top-0 object-cover object-center w-full h-full"
            />
          </div>
        </AbsoluteFill>
        <AbsoluteFill>
          <div
            style={{
              left: `${moveInLeft2}px`,
            }}
            className="w-[250px] rotate-12 -bottom-10 absolute h-[369.2308px]"
          >
            <div className="w-full h-full overflow-hidden">
              <Img
                style={{
                  transform: `scale(${scale})`,
                }}
                src={images[5]}
                className="object-cover object-center w-full h-full"
              />
            </div>
            <Img
              src={staticFile(builtInPath + "1 frame dark V.png")}
              className="absolute top-0 object-cover object-center w-full h-full"
            />
          </div>
        </AbsoluteFill>
      </>
    );
  }
);

export default memo(SixImageBuiltInFrame);
