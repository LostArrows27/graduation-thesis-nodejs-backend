import { AbsoluteFill } from "remotion";
import { memo, useMemo } from "react";
import { duplicateImageInView } from "../../../utils/duplicate-image-in-view";
import VerticalPostsList from "./VerticalPostsList";
import { usePostListScrollAnimation } from "../../../hooks/use-post-list-scroll-animation";
import { usePostListFrameAnimation } from "../../../hooks/use-post-list-frame-animation";

type PostListContainerProps = {
  firstCaption: string;
  secondCaption: string;
  images: string[];
};

const PostListContainer = ({
  firstCaption,
  secondCaption,
  images,
}: PostListContainerProps) => {
  const duplicateImages = useMemo(
    () =>
      duplicateImageInView(images, firstCaption, secondCaption, images.length),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const { up, down } = usePostListScrollAnimation();

  const { scale: postScale } = usePostListFrameAnimation();

  return (
    <AbsoluteFill
      className="!flex-row !w-[100%] !absolute center px-8 gap-4"
      style={{
        transform: `scale(${postScale})`,
        willChange: "transform",
      }}
    >
      {duplicateImages.map((image, i) => (
        <VerticalPostsList
          key={i}
          images={image}
          translateY={i % 2 === 0 ? up : down}
        />
      ))}
    </AbsoluteFill>
  );
};

export default memo(PostListContainer, (prevProps, nextProps) => {
  return (
    prevProps.firstCaption === nextProps.firstCaption &&
    prevProps.secondCaption === nextProps.secondCaption &&
    prevProps.images.length === nextProps.images.length
  );
});
