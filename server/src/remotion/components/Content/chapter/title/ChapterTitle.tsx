import { memo } from "react";
import { ChapterTitleProps } from "../../../../types/content.type";
import BeigeStyleTitle from "./BeigeStyleTitle";
import EventPostTitle from "./EventPostTitle";
import PaperStyleTitle from "./PaperStyleTitle";

// TODO: do many title styles

const ChapterTitle = ({
  title,
  images,
  index,
  titleStyle,
  frameCategory,
  duration,
  hashtag,
}: ChapterTitleProps) => {
  if (frameCategory === "event") {
    return (
      <EventPostTitle
        duration={duration}
        title={title}
        images={images}
        index={index}
        hashtag={hashtag}
      />
    );
  }

  switch (titleStyle) {
    case 0:
      return <PaperStyleTitle hashtag={hashtag} title={title} images={images} index={index} />;
    case 1:
      return <BeigeStyleTitle hashtag={hashtag} title={title} images={images} index={index} />;
    default:
      return <BeigeStyleTitle hashtag={hashtag} title={title} images={images} index={index} />;
  }
};

export default memo(ChapterTitle);
