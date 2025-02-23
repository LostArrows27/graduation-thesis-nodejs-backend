import { AbsoluteFill, Img } from "remotion";
import { eventAssetPath } from "../../../../../constants/constants";
import { memo, useMemo } from "react";
import { loadFont } from "@remotion/google-fonts/Itim";
import { chooseEventTitleNote } from "../../../../../utils/choose-random-title-note";
import { useMemoAssetPath } from "../../../../../hooks/use-memo-asset-path";

const { fontFamily } = loadFont();

type CaptionLayerProps = {
  index: number;
  duration: number;
  images: string[];
  title: string;
  hashtag?: string[];
};

const CaptionLayer = ({
  index,
  duration,
  images,
  title,
  hashtag,
}: CaptionLayerProps) => {
  const notePath = useMemoAssetPath(eventAssetPath + "note.png");

  const eventTitleNote = useMemo(
    () =>
      chooseEventTitleNote(
        `event-${index}-duration-${duration}-image-${JSON.stringify(images)}`
      ),
    [duration, images, index]
  );

  return (
    <AbsoluteFill>
      <div className="w-[380px] h-[423.98px] absolute bottom-[20%] right-[10%]">
        <Img src={notePath} className="image-fit-full" />
        <div
          style={{
            fontFamily,
          }}
          className="absolute center flex-col  top-[38px] h-[calc(100%-38px)] w-full px-6 py-8"
        >
          <h1 className="text-4xl font-bold leading-normal text-center">
            {title && title !== "" ? title : `Event Chapter ${index + 1}`}
          </h1>

          <div className="mt-7 flex justify-around flex-wrap w-full">
            {(hashtag && hashtag.length > 0
              ? hashtag.slice(0, 3)
              : ["good_morning", "sunrise", "beautiful_day", "traveling"]
            ).map((word, index2) => (
              <span key={index2} className="text-xl">
                #{word}
              </span>
            ))}
          </div>
          <div className="mt-7 text-rose-500 underline-offset-4 w-full text-lg font-bold text-center underline">
            {eventTitleNote}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default memo(CaptionLayer);
