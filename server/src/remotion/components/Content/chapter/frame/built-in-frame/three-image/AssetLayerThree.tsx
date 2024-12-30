import { Gif } from "@remotion/gif";
import { AbsoluteFill, Img } from "remotion";
import { builtInPath } from "../../../../../../constants/constants";
import { loadFont } from "@remotion/google-fonts/Itim";
import { useMemoAssetArray } from "../../../../../../hooks/use-memo-asset-path";
import { memo } from "react";

const { fontFamily } = loadFont();

type AssetLayerThreeProps = {
  goDown: number;
  moveUpNote: number;
};

const AssetLayerThree = ({ goDown, moveUpNote }: AssetLayerThreeProps) => {
  const [paperPath, tape2Path, wowPath, tapePath, notePath] = useMemoAssetArray(
    ["paper_2.png", "tape_2.png", "wow.gif", "tape.png", "note.png"],
    builtInPath,
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
        className="absolute w-[350px] right-1/4 h-[286px]"
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
  );
};

export default memo(AssetLayerThree);
