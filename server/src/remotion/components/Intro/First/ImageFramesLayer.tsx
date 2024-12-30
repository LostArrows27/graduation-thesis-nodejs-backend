import { AbsoluteFill, staticFile } from "remotion";
import { IMAGE_ROTATION_ANGLE } from "../../../constants/constants";
import ImageFrame from "../ImageFrame";

type ImageFrameLayerProps = {
  images: string[];
};

// TODO: add style 2
// NOTE: Style 1 -> 4 corner images zoom in
// NOTE: Style 2 -> 2 row images slide in -> slide out
const ImageFrameLayer = ({ images }: ImageFrameLayerProps) => {
  return (
    <AbsoluteFill>
      <ImageFrame
        animated
        className="-left-24 absolute"
        url={staticFile(images[0])}
        rotation={-IMAGE_ROTATION_ANGLE}
      />
      <ImageFrame
        animated
        className="-right-12 -top-12 absolute"
        width={500}
        url={staticFile(images[1])}
        rotation={IMAGE_ROTATION_ANGLE}
      />
      <ImageFrame
        animated
        className="-left-12 -bottom-10 absolute"
        url={staticFile(images[2])}
        rotation={IMAGE_ROTATION_ANGLE}
      />
      <ImageFrame
        animated
        className="-right-12 -bottom-10 absolute"
        url={staticFile(images[3])}
        rotation={-IMAGE_ROTATION_ANGLE}
      />
    </AbsoluteFill>
  );
};

export default ImageFrameLayer;
