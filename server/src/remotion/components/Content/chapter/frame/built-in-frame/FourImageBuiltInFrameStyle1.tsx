import { AbsoluteFill, Img } from "remotion";
import { BuiltInTransitionProps } from "../../../../../types/content.type";
import BuiltInLayout from "./BuiltInLayout";
import { builtInPath } from "../../../../../constants/constants";
import { loadFont } from "@remotion/google-fonts/Itim";
import { useFourImageBuiltInFrameStyle1Animation } from "../../../../../hooks/built-in-frame-animation/use-built-in-image-frame-animation";
import { Gif } from "@remotion/gif";
import { memo } from "react";
import { useMemoAssetArray } from "../../../../../hooks/use-memo-asset-path";

const { fontFamily } = loadFont();

// NOTE: re-use 3 image layout:)
const FourImageBuiltInFrameStyle1 = ({
  frame: videoFrame,
  inTiming,
  outTiming,
  durationInFrames,
  location,
  hashtag,
  caption,
}: BuiltInTransitionProps) => {
  const { moveUp, moveDown, opacity, appearFromLeft, scale, starOpacity } =
    useFourImageBuiltInFrameStyle1Animation(
      {
        in: inTiming,
        out: outTiming,
      },
      durationInFrames
    );

  const imagesPath = videoFrame.slice(0, 4);

  return (
    <BuiltInLayout location={location} bg="dark">
      {/* image layer */}
      <ImageLayerFourStyle1
        moveDown={moveDown}
        moveUp={moveUp}
        opacity={opacity}
        scale={scale}
        images={imagesPath}
      />
      {/* asset layer */}
      <AssetLayerFourStyle1
        caption={caption}
        hashtag={hashtag}
        appearFromLeft={appearFromLeft}
        starOpacity={starOpacity}
      />
    </BuiltInLayout>
  );
};

type ImageLayerFourStyle1Props = {
  images: string[];
  moveUp: number;
  moveDown: number;
  opacity: number;
  scale: number;
};

const ImageLayerFourStyle1 = memo(
  ({ images, moveUp, moveDown, opacity, scale }: ImageLayerFourStyle1Props) => {
    const [markPath, twoFramePath] = useMemoAssetArray(
      ["mark.png", "2 frame V.png"],
      builtInPath
    );

    return (
      <AbsoluteFill>
        <div className="rotate-[5deg] absolute w-[600px] h-[117%] top-1/2 right-20 -translate-y-1/2">
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
              className="w-[120px] scale-x-[-1] h-auto absolute -rotate-180 -top-16 -left-12"
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
              className="w-[120px] h-auto absolute scale-x-[-1] -bottom-16 -right-12"
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

type AssetLayerFourStyle1Props = {
  appearFromLeft: number;
  starOpacity: number;
  caption: string;
  hashtag: string[];
};

const AssetLayerFourStyle1 = memo(
  ({
    appearFromLeft,
    starOpacity,
    caption,
    hashtag,
  }: AssetLayerFourStyle1Props) => {
    const [tapePath, notePath, starFewPath, starManyPath] = useMemoAssetArray(
      ["tape.png", "note.png", "star_few.gif", "star_many.gif"],
      builtInPath
    );

    return (
      <>
        <AbsoluteFill>
          <div
            style={{
              bottom: `${200}px`,
              left: `${appearFromLeft}px`,
            }}
            className="absolute w-[350px] left-32 h-[250.25px]"
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
              <h1 className="mb-5">{caption}</h1>
              <div style={{ fontFamily }} className="flex gap-4">
                {hashtag.map((text, index) => (
                  <span key={index} className="text-2xl">
                    #{text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </AbsoluteFill>
        <AbsoluteFill>
          <div
            style={{
              opacity: starOpacity,
            }}
            className="absolute w-[40px] h-[40px] top-[10%] right-[350px]"
          >
            <Gif
              width={50}
              loopBehavior="loop"
              fit="contain"
              src={starFewPath}
            />
          </div>
        </AbsoluteFill>
        <AbsoluteFill>
          <div
            style={{
              opacity: starOpacity,
            }}
            className="absolute w-[150px] h-[155.6338px] bottom-[220px] left-[450px] "
          >
            <Gif fit="contain" loopBehavior="loop" src={starManyPath} />
          </div>
        </AbsoluteFill>
      </>
    );
  }
);

export default memo(FourImageBuiltInFrameStyle1);
