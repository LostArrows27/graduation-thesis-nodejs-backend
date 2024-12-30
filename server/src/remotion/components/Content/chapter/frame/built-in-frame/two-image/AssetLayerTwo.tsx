import { Gif } from "@remotion/gif";
import { AbsoluteFill, Img } from "remotion";
import { builtInPath } from "../../../../../../constants/constants";
import { memo } from "react";
import { useMemoAssetArray } from "../../../../../../hooks/use-memo-asset-path";
import { loadFont } from "@remotion/google-fonts/Itim";

const { fontFamily } = loadFont();

type AssetLayerProps = {
  moveLeft: number;
  moveRight: number;
  moveDown: number;
  moveUp: number;
  moveUpNote: number;
};

const AssetLayerTwo = ({
  moveLeft,
  moveRight,
  moveDown,
  moveUp,
  moveUpNote,
}: AssetLayerProps) => {
  const [
    framePath,
    paper1Path,
    paper2Path,
    tapePath,
    paper3Path,
    starFewPath,
    starManyPath,
    notePath,
  ] = useMemoAssetArray(
    [
      "1 frame dark H.png",
      "paper_1.png",
      "paper_2.png",
      "tape.png",
      "paper_3.png",
      "star_few.gif",
      "star_many.gif",
      "note.png",
    ],
    builtInPath,
  );

  return (
    <AbsoluteFill>
      <div className="absolute flex top-[15%] rotate-[-5deg]">
        <Img
          className="w-[620px] h-[405.325px] object-center object-cover"
          src={framePath}
        />
        <Img
          className="w-[620px] h-[405.325px] object-center object-cover"
          src={framePath}
        />
      </div>
      <Img
        style={{
          left: `${moveLeft}px`,
        }}
        src={paper1Path}
        className="w-[400px] h-auto absolute top-[15%]"
      />
      <Img
        style={{
          right: `${moveRight}px`,
        }}
        src={paper2Path}
        className="w-[180px] rotate-[-5deg] h-auto absolute top-[7.5%]"
      />
      <Img
        style={{
          top: `${moveDown}%`,
        }}
        src={tapePath}
        className="-rotate-[47deg] absolute w-[180px] h-auto left-[40%]"
      />
      <Img
        style={{
          top: `${moveUp}%`,
        }}
        className="-rotate-[5deg] absolute w-[360px] h-auto  left-[35%]"
        src={paper3Path}
      />
      <div className="absolute w-[40px] h-[40px] bottom-[100px] left-[50px]">
        <Gif width={50} loopBehavior="loop" fit="contain" src={starFewPath} />
      </div>
      <div className="absolute w-[200px] h-[207.5117px] top-[10%] right-[300px]">
        <Gif fit="contain" loopBehavior="loop" src={starManyPath} />
      </div>
      {/* caption */}
      <div
        style={{
          bottom: `${moveUpNote}px`,
        }}
        className="absolute -rotate-[5deg] w-[350px] right-20 overflow-hidden rounded-2xl h-[250.25px]"
      >
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
  );
};

export default memo(AssetLayerTwo);
