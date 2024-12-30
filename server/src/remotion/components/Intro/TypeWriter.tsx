import { memo } from "react";
import { useCurrentFrame } from "remotion";
import { TYPE_WRITER_SPEED } from "../../constants/constants";

type TypeWriterProps = {
  text: string;
  delayInframe?: number;
  speed?: number;
};

const TypeWriter = ({
  text,
  speed = TYPE_WRITER_SPEED,
  delayInframe = 0,
}: TypeWriterProps) => {
  const frame = useCurrentFrame();

  const adjustedFrame = frame - delayInframe;

  const charsShown = adjustedFrame > 0 ? Math.floor(adjustedFrame / speed) : 0;

  const textToShow = text.slice(0, charsShown);

  const cursorShown =
    textToShow.length === text.length ? Math.floor(frame / 10) % 2 === 1 : true;

  return (
    <>
      {textToShow}
      <span
        className={`inline-block w-[3px] h-[60px] bg-white ml-1 align-middle transition-opacity ${
          cursorShown ? "opacity-100" : "opacity-0"
        } ${textToShow.length === text.length ? "!opacity-0" : "!opacity-100"}`}
      />
    </>
  );
};

export default memo(TypeWriter);
