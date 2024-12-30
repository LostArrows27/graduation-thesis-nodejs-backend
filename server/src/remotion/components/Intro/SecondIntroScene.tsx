import { memo, useMemo } from "react";
import { AbsoluteFill } from "remotion";
import { SecondIntroSceneProps } from "../../types/video.type";
import AnimatedCaption from "./Second/AnimatedCaption";
import { useIntroSecondFrameAnimation } from "../../hooks/use-intro-second-frame-animation";
import PostListContainer from "./Second/PostListContainer";

// NOTE: 3 level scale
// 1. -> 1.03
// 2. -> 1.45
// 3. -> 2.4
// NOTE: every row have to have 6 image to be in view -> 7 row -> 42 image

const SecondIntroScene = ({
  firstCaption,
  secondCaption,
  images,
}: SecondIntroSceneProps) => {
  const { opacity, scale } = useIntroSecondFrameAnimation();

  const containerStyle = useMemo(
    () => ({
      opacity,
      transform: `scale(${scale})`,
      willChange: "transform, opacity",
    }),
    [opacity, scale],
  );

  return (
    <AbsoluteFill
      style={containerStyle}
      className="!justify-center !items-center"
    >
      <PostListContainer
        firstCaption={firstCaption}
        secondCaption={secondCaption}
        images={images}
      />
      <AbsoluteFill>
        <div className="bg-black/75 absolute right-0 left-0 w-[200%] -translate-x-1/4 -translate-y-1/4 h-[200%]" />
      </AbsoluteFill>
      <AbsoluteFill>
        <div className="center flex-col w-full h-full gap-5">
          <AnimatedCaption
            firstCaption={firstCaption}
            secondCaption={secondCaption}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default memo(SecondIntroScene, (prevProps, nextProps) => {
  return (
    prevProps.firstCaption === nextProps.firstCaption &&
    prevProps.secondCaption === nextProps.secondCaption &&
    prevProps.images.length === nextProps.images.length
  );
});
