import { Img, staticFile, useCurrentFrame } from "remotion";
import {
  INTRO_SECOND_SCENE_CAPTION_DURATION,
  INTRO_SECOND_SCENE_FADE_TIME,
  INTRO_SECOND_SCENE_LENGTH,
  INTRO_SECOND_SCENE_TRANSITION_TIME,
} from "../../../constants/constants";
import { Animated, Fade, Move, Scale } from "remotion-animated";
import { loadFont } from "@remotion/google-fonts/Inter";
import SpringAnimationcaption from "./SpringAnimation";
import { memo, useMemo } from "react";

const { fontFamily } = loadFont();

type AnimatedCaptionProps = {
  firstCaption: string;
  secondCaption: string;
};

const AnimatedCaption = ({
  firstCaption,
  secondCaption,
}: AnimatedCaptionProps) => {
  const frame = useCurrentFrame();

  const firstCaptionParts = firstCaption.split("\n");
  const secondCaptionParts = secondCaption.split("\n");

  const bgImage = useMemo(
    () => staticFile("/images/intro/second/paper_bg.jpg"),
    [],
  );

  const memoizedFirstCaptionParts = useMemo(
    () =>
      firstCaptionParts.map((part, index) => (
        <SpringAnimationcaption key={index} index={index} part={part} />
      )),
    [firstCaptionParts],
  );

  return (
    <>
      <Animated
        style={{
          fontFamily,
          opacity: frame > INTRO_SECOND_SCENE_CAPTION_DURATION ? 0 : 1,
        }}
        className="absolute w-[80%]"
        delay={INTRO_SECOND_SCENE_TRANSITION_TIME}
        animations={[
          Move({
            initialY: 0,
            y: 100,
            start: INTRO_SECOND_SCENE_CAPTION_DURATION - 35,
          }),
          Fade({
            initial: 1,
            to: 0,
            start: INTRO_SECOND_SCENE_CAPTION_DURATION - 35,
          }),
        ]}
      >
        <h1 className="text-[50px] relative bg-cover bg-center rounded-lg uppercase bg-white w-full p-5 text-center font-bold text-blue-500">
          <Img
            src={bgImage}
            className="absolute top-0 left-0 w-full h-full rounded-lg"
          />
          {memoizedFirstCaptionParts}
        </h1>
      </Animated>
      <Animated
        style={{
          fontFamily,
        }}
        delay={INTRO_SECOND_SCENE_CAPTION_DURATION - 5}
        animations={[
          Fade({ initial: 0.5, to: 1 }),
          Scale({ by: 1, initial: 0 }),
        ]}
      >
        <h1
          style={{
            opacity:
              frame >= INTRO_SECOND_SCENE_CAPTION_DURATION - 5 &&
              frame <= INTRO_SECOND_SCENE_LENGTH - INTRO_SECOND_SCENE_FADE_TIME
                ? 1
                : 0,
          }}
          className="text-[50px] relative bg-cover bg-center rounded-lg uppercase bg-white w-full p-5 text-center font-bold text-blue-500"
        >
          <Img
            src={bgImage}
            className="absolute top-0 left-0 w-full h-full rounded-lg"
          />
          {secondCaptionParts.map((part, index) => (
            <div key={index} className="scale-100">
              {part}
            </div>
          ))}
        </h1>
      </Animated>
    </>
  );
};

export default memo(AnimatedCaption);
