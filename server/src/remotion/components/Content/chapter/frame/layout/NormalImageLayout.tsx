import { AbsoluteFill, Img } from "remotion";
import { NormalImageLayoutProps } from "../../../../../types/content.type";
import { randomColor } from "../../../../../utils/randomColor";
import { loadFont } from "@remotion/google-fonts/Frijole";
import { loadFont as loadTitleFont } from "@remotion/google-fonts/AmaticSC";
import { Gif } from "@remotion/gif";
import {
  useMemoAssetArray,
  useMemoAssetPath,
} from "../../../../../hooks/use-memo-asset-path";
import { normalFramePath } from "../../../../../constants/constants";
import { memo, useMemo } from "react";

// TODO: add animation

// 1. not appear if have title transition animation
// 2. not appear if have chapter transition animation

const { fontFamily } = loadFont();

const { fontFamily: titleFontFamily } = loadTitleFont();

// TODO: add location later
export const Layout = memo(
  ({ children, chapterIndex, location, caption }: NormalImageLayoutProps) => {
    const [corner1Path, corner2Path, locationPath] = useMemoAssetArray(
      ["corner_1.png", "corner_2.png", "location.gif"],
      normalFramePath
    );

    const bgPath = useMemoAssetPath("/images/content/title_2/bg.jpg");

    return (
      <AbsoluteFill>
        <AbsoluteFill>
          <Img
            className="object-cover object-center w-full h-full"
            src={bgPath}
          />
        </AbsoluteFill>
        <AbsoluteFill>{children}</AbsoluteFill>
        <AbsoluteFill className="overflow-hidden">
          <Img
            className="absolute -top-[320px] -right-[200px] w-[650px] h-auto -rotate-[145deg]"
            src={corner1Path}
          />
          <Img
            className="absolute -bottom-[300px] -left-[190px] w-[650px] h-auto -rotate-[157deg]"
            src={corner2Path}
          />
          <div className="absolute bottom-[28px] left-3 w-[30px] h-[47.8846px]">
            <Gif width={30} height={47.8846} src={locationPath} />
          </div>
          <div
            style={{
              fontFamily: titleFontFamily,
            }}
            className="absolute text-3xl text-zinc-200 pr-2  w-[150px] h-[60px] bottom-2 left-14 text-left"
          >
            {location}
          </div>
          <ChapterGraphic chapterIndex={chapterIndex} />
        </AbsoluteFill>
        <AbsoluteFill>
          <div className="w-full center h-[200px] tracking-[0.15em] text-6xl absolute top-0 right-0 left-0">
            <h1
              className="uppercase font-bold text-center text-[rgb(93,69,45)]"
              style={{
                fontFamily: titleFontFamily,
              }}
            >
              {caption}
            </h1>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    );
  }
);

const ChapterGraphic = memo(({ chapterIndex }: { chapterIndex: number }) => {
  const graphicArrays = String(chapterIndex + 1).split("");

  const [cPath, hPath, aPath, pPath, tPath, ePath, rPath] = useMemoAssetArray(
    ["c.png", "h.png", "a.png", "p.png", "t.png", "e.png", "r.png"],
    normalFramePath
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // NOTE: add dep if error:)))
  const color = useMemo(() => randomColor(chapterIndex), []);

  return (
    <div className="right-10 bottom-10 absolute">
      <div>
        <div className="gap-x-1 flex items-center w-full h-full">
          <Img className="w-10 h-auto" src={cPath} />
          <Img className="w-10 h-auto" src={hPath} />
          <Img className="w-10 h-auto" src={aPath} />
          <Img className="w-10 h-auto" src={pPath} />
          <Img className="w-10 h-auto" src={tPath} />
          <Img className="w-10 h-auto" src={ePath} />
          <Img className="w-10 h-auto" src={rPath} />
          {graphicArrays.map((item, index) => (
            <span
              key={index}
              style={{
                background: color,
                transform: `rotate(10deg)`,
                fontFamily,
              }}
              className="center w-10 h-12 ml-2 text-2xl font-bold text-white rounded-md"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});
