import { Gif } from "@remotion/gif";
import { AbsoluteFill, Img } from "remotion";
import { builtInPath } from "../../../../../../constants/constants";
import { useMemoAssetArray } from "../../../../../../hooks/use-memo-asset-path";
import { memo } from "react";

type AssetLayerProps = {
  moveLeft: number;
  moveRight: number;
  moveDown: number;
  moveUp: number;
};

const AssetLayerOne = ({
  moveLeft,
  moveRight,
  moveDown,
  moveUp,
}: AssetLayerProps) => {
  const [oneFrameDarkH, paper1, paper2, tape, paper3, starFew, starMany] =
    useMemoAssetArray(
      [
        "1 frame dark H.png",
        "paper_1.png",
        "paper_2.png",
        "tape.png",
        "paper_3.png",
        "star_few.gif",
        "star_many.gif",
      ],
      builtInPath,
    );

  return (
    <AbsoluteFill>
      <div className="absolute flex top-[15%] rotate-[-5deg]">
        <Img
          className="w-[620px] aspect-[800/523] object-center object-cover"
          src={oneFrameDarkH}
        />
        <Img
          className="w-[620px] aspect-[800/523] object-center object-cover"
          src={oneFrameDarkH}
        />
      </div>
      <Img
        style={{
          left: `${moveLeft}px`,
        }}
        src={paper1}
        className="w-[400px] h-auto absolute top-[15%]"
      />
      <Img
        style={{
          right: `${moveRight}px`,
        }}
        src={paper2}
        className="w-[180px] rotate-[-5deg] h-auto absolute top-[7.5%]"
      />
      <Img
        style={{
          top: `${moveDown}%`,
        }}
        src={tape}
        className="-rotate-[47deg] absolute w-[180px] h-auto left-[40%]"
      />
      <Img
        style={{
          top: `${moveUp}%`,
        }}
        className="-rotate-[5deg] absolute w-[360px] h-auto  left-[35%]"
        src={paper3}
      />
      <div className="absolute w-[40px] aspect-square bottom-[125px] left-[40px]">
        <Gif width={50} loopBehavior="loop" fit="contain" src={starFew} />
      </div>
      <div className="absolute w-[200px] aspect-[639/663] top-[9%] right-[300px]">
        <Gif fit="contain" loopBehavior="loop" src={starMany} />
      </div>
    </AbsoluteFill>
  );
};

export default memo(AssetLayerOne);
