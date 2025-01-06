import { Img } from "remotion";
import { AbsoluteFill } from "remotion";
import { ChapterStyleProps } from "../../../../types/content.type";
import { loadFont as loadSubFont } from "@remotion/google-fonts/DancingScript";
import { loadFont as loadTitleFont } from "@remotion/google-fonts/Itim";
import { chooseLocationTitleNote } from "../../../../utils/choose-random-title-note";
import { memo, useMemo } from "react";
import { useMemoAssetArray } from "../../../../hooks/use-memo-asset-path";

// TODO: add AI title or based-case title

const { fontFamily: subFontFamily } = loadSubFont();

const { fontFamily: titleFontFamily } = loadTitleFont();

const BeigeStyleTitle = ({ images, index, title }: ChapterStyleProps) => {
  const locationTitleNote = useMemo(
    () =>
      chooseLocationTitleNote(
        `index-${index}-title-${title}-image-${JSON.stringify(images)}`
      ),
    [images, index, title]
  );

  const [
    bgPath,
    leafSPath,
    leafTPath,
    paperPath,
    frameVPath,
    tapePath,
    frameHPath,
  ] = useMemoAssetArray(
    [
      "bg.jpg",
      "leaf_s.png",
      "leaf_t.png",
      "paper.png",
      "frame_v.png",
      "tape.png",
      "frame_h.png",
    ],
    "/images/content/title_2/"
  );

  return (
    <AbsoluteFill>
      <AbsoluteFill>
        <Img
          src={bgPath}
          className="object-cover object-center w-full h-full"
        />
      </AbsoluteFill>
      <AbsoluteFill>
        <AbsoluteFill>
          <div className="top-1/3 center flex-col left-10 absolute w-[450px] center">
            <h1
              style={{
                fontFamily: subFontFamily,
              }}
              className="text-6xl font-bold text-center leading-[1.5] uppercase text-[rgb(93,69,45)]"
            >
              Khu cắm trại
            </h1>
            <div
              style={{
                fontFamily: titleFontFamily,
              }}
              className="text-2xl leading-normal italic mt-4 px-4 text-center text-[rgb(93,69,45)]"
            >
              {locationTitleNote}
            </div>
          </div>
        </AbsoluteFill>
        <AbsoluteFill>
          {/* NOTE: 2 leaf later */}
          <AbsoluteFill>
            <Img
              className="w-[200px] h-auto absolute right-20 top-1 rotate-12"
              src={leafSPath}
            />
          </AbsoluteFill>
          <AbsoluteFill>
            <Img
              className="w-[150px] h-auto absolute right-[49%] bottom-1 -rotate-[30deg]"
              src={leafTPath}
            />
          </AbsoluteFill>
        </AbsoluteFill>
        <AbsoluteFill>
          <Img
            className="w-[550px] absolute right-36 top-1/4 h-auto"
            src={paperPath}
          />
        </AbsoluteFill>
        <AbsoluteFill>
          <div className="w-[300px] h-[350.877px] absolute right-[35%] top-[18%]">
            <Img
              className="object-cover object-center w-full h-full"
              src={images[0]}
            />
            <Img
              className="!w-[320px] -top-1 absolute h-[370px] max-h-[370px] -left-1 max-w-[320px]"
              src={frameVPath}
            />
            <Img
              className="absolute -top-[55px] w-[45px] right-1/3 h-auto -rotate-90"
              src={tapePath}
            />
            <div className="top-[5%] -right-[105%] w-[360px] max-w-[360px] h-[300px] absolute">
              <Img
                className="absolute w-full scale-[1.04] h-auto"
                src={frameHPath}
              />
              <Img
                className="object-cover object-center w-full h-full"
                src={images[1]}
              />
              <Img
                className="absolute -bottom-[55px] w-[60px] -right-6 h-auto"
                src={tapePath}
              />
            </div>
          </div>
        </AbsoluteFill>
        <AbsoluteFill>
          <div
            style={{
              fontFamily: titleFontFamily,
            }}
            className="w-[550px] px-5 pl-10 items-center pb-5 flex absolute right-36 top-[64%] h-[130px]"
          >
            <div className="mr-32 text-3xl text-[rgb(93,69,45)] font-medium">
              #camp_fire
            </div>
            <div className="text-3xl font-medium text-[rgb(93,69,45)]">
              #our_holiday
            </div>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default memo(BeigeStyleTitle);
