import { AbsoluteFill, Img } from "remotion";
import { BuiltInTransitionProps } from "../../../../../types/content.type";
import BuiltInLayout from "./BuiltInLayout";
import { builtInPath } from "../../../../../constants/constants";
import { Gif } from "@remotion/gif";
import {
  useFourImageBuiltInFrameAnimation,
  useThreeImageBuiltInFrameAnimation,
} from "../../../../../hooks/built-in-frame-animation/use-built-in-image-frame-animation";
import { loadFont } from "@remotion/google-fonts/Itim";
import { memo } from "react";
import { useMemoAssetArray } from "../../../../../hooks/use-memo-asset-path";

const { fontFamily } = loadFont();

// NOTE: re-use 3 image layout:)
const FourImageBuiltInFrame = ({
  frame: videoFrame,
  inTiming,
  outTiming,
  durationInFrames,
  location,
  hashtag,
  caption,
}: BuiltInTransitionProps) => {
  const { moveUpNote, goDown, rotateImage, opacity, starOpacity, scale } =
    useThreeImageBuiltInFrameAnimation(
      {
        in: inTiming,
        out: outTiming,
      },
      durationInFrames
    );

  const { rotate, moveInLeft } = useFourImageBuiltInFrameAnimation({
    in: inTiming,
    out: outTiming,
  });

  const imagesPath = videoFrame.slice(0, 4);

  return (
    <BuiltInLayout location={location} bg="light" imageNumber={4}>
      {/* image layer */}
      <ImageLayerFour
        images={imagesPath}
        rotateImage={rotateImage}
        opacity={opacity}
        starOpacity={starOpacity}
        scale={scale}
      />
      {/* asset layer */}
      <AsssetLayerFour
        hashtag={hashtag}
        caption={caption}
        moveUpNote={moveUpNote}
        goDown={goDown}
      />
      {/* forth image layer */}
      <ForthImageLayerFour
        moveInLeft={moveInLeft}
        rotate={rotate}
        scale={scale}
        image={imagesPath[3]}
      />
    </BuiltInLayout>
  );
};

type ImageLayerFourProps = {
  images: string[];
  rotateImage: number;
  opacity: number;
  starOpacity: number;
  scale: number;
};

const ImageLayerFour = memo(
  ({
    images,
    rotateImage,
    opacity,
    starOpacity,
    scale,
  }: ImageLayerFourProps) => {
    const [framePath, starFewPath, starManyPath] = useMemoAssetArray(
      ["3 frame H.png", "star_few.gif", "star_many.gif"],
      builtInPath
    );

    return (
      <AbsoluteFill>
        <div
          style={{
            transform: `translateX(-50%) rotate(${rotateImage}deg)`,
            opacity,
          }}
          className="absolute flex top-[15%] w-[1484px] h-[399.7525px]  left-1/2"
        >
          <div className="w-1/3 h-full overflow-hidden">
            <Img
              style={{
                transform: `scale(${scale})`,
              }}
              className="object-cover object-center w-full h-full"
              src={images[0]}
            />
          </div>
          <div className="w-1/3 h-full overflow-hidden">
            <Img
              style={{
                transform: `scale(${scale})`,
              }}
              className="object-cover object-center w-full h-full"
              src={images[1]}
            />
          </div>
          <div className="w-1/3 h-full overflow-hidden">
            <Img
              style={{
                transform: `scale(${scale})`,
              }}
              className="object-cover object-center w-full h-full"
              src={images[2]}
            />
          </div>
          <Img src={framePath} className="absolute w-full h-full" />
        </div>
        <div
          style={{
            opacity: starOpacity,
          }}
          className="absolute w-[60px] h-[60px] top-[30%] right-[380px]"
        >
          <Gif width={80} height={80} loopBehavior="loop" src={starFewPath} />
        </div>
        <div
          style={{
            opacity: starOpacity,
          }}
          className="absolute w-[150px] h-[155.6338px] bottom-[300px] left-[260px] "
        >
          <Gif fit="contain" loopBehavior="loop" src={starManyPath} />
        </div>
      </AbsoluteFill>
    );
  }
);

type AssetLayerFourProps = {
  moveUpNote: number;
  goDown: number;
  caption: string;
  hashtag: string[];
};

const AsssetLayerFour = memo(
  ({ moveUpNote, goDown, caption, hashtag }: AssetLayerFourProps) => {
    const [paperPath, tape2Path, wowPath, tapePath, notePath] =
      useMemoAssetArray(
        ["paper_2.png", "tape_2.png", "wow.gif", "tape.png", "note.png"],
        builtInPath
      );

    return (
      <AbsoluteFill>
        <Img
          className="w-[180px] -rotate-6 h-auto top-20 -right-[136px] absolute"
          src={paperPath}
        />
        <div
          style={{
            top: `${goDown}px`,
          }}
          className="w-[150px] h-[44.6658px] rotate-[5deg] top-20 right-1/4 absolute"
        >
          <Img
            className="absolute z-[1] w-[200px] -left-4 -top-4 min-w-[200px] max-w-[200px] h-auto rotate-6"
            src={tape2Path}
          />
          <Gif
            fit="contain"
            width={150}
            height={(150 / 853) * 254}
            loopBehavior="loop"
            style={{
              position: "absolute",
              zIndex: 5,
            }}
            src={wowPath}
          />
        </div>
        {/* caption layer */}
        <div
          style={{
            bottom: `${moveUpNote}px`,
          }}
          className="absolute w-[350px] right-[20%] h-[250.25px]"
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
    );
  }
);

type ForthImageLayerFourProps = {
  moveInLeft: number;
  rotate: number;
  scale: number;
  image: string;
};

const ForthImageLayerFour = memo(
  ({ moveInLeft, rotate, scale, image }: ForthImageLayerFourProps) => {
    const [framePath, paperPath] = useMemoAssetArray(
      ["1 frame white V.png", "paper_1.png"],
      builtInPath
    );

    return (
      <>
        <AbsoluteFill>
          <div
            style={{
              left: `${moveInLeft}px`,
            }}
            className="w-[470px] absolute h-[384.8125px] left-5 -bottom-20"
          >
            <div className="w-full h-full overflow-hidden">
              <Img
                style={{
                  transform: `scale(${scale})`,
                }}
                className="object-cover object-center w-full h-full"
                src={image}
              />
            </div>
            <Img
              className="absolute z-[1] object-cover object-center top-0 w-full h-full"
              src={framePath}
            />
          </div>
        </AbsoluteFill>
        <AbsoluteFill>
          <Img
            style={{
              rotate: `${rotate}deg`,
              transformOrigin: "0 0 ",
            }}
            className="absolute  z-[1] object-cover object-top -bottom-[95px] -left-[16%] w-[750px] h-auto"
            src={paperPath}
          />
        </AbsoluteFill>
      </>
    );
  }
);

export default memo(FourImageBuiltInFrame);
