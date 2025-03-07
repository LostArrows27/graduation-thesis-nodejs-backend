import { AbsoluteFill } from "remotion";
import { FaceProps } from "../../types/video.type";
import CroppedImage from "./CroppedImage";
import { duplicateFace } from "../../utils/duplicate-face";
import { useAvatarListAnimation } from "../../hooks/special-part-animation/use-avatar-list-animation";

type FaceListLayerProps = {
  faces: FaceProps[];
};

const FaceListLayer = ({ faces }: FaceListLayerProps) => {
  const _faces = duplicateFace(faces);

  const {
    moveFirstAvatar,
    moveSecondAvatar,
    moveThirdAvatar,
    moveForthAvatar,
  } = useAvatarListAnimation();

  return (
    <AbsoluteFill>
      <div
        style={{
          left: `${moveFirstAvatar}px`,
        }}
        className="flex items-center absolute top-[80px]"
      >
        <h1 className="text-[75px] mr-10 font-bold text-white">1</h1>
        <CroppedImage
          imageURL={_faces[0].image}
          coordinate={[
            _faces[0].coordinate[0],
            _faces[0].coordinate[1],
            _faces[0].coordinate[2],
            _faces[0].coordinate[3],
          ]}
          containerWidth={100}
          containerHeight={100}
        />
        <div className="ml-5 mb-3">
          <h1 className="text-2xl mb-1 font-bold text-white">
            {_faces[0].name}
          </h1>
          <h1 className="text-xl font-medium text-white">
            {_faces[0].times} lần
          </h1>
        </div>
      </div>
      <div
        style={{
          left: `${moveSecondAvatar}px`,
        }}
        className="flex items-center absolute top-[230px]"
      >
        <h1 className="text-[75px] mr-10 font-bold text-white">2</h1>
        <CroppedImage
          imageURL={_faces[1].image}
          coordinate={[
            _faces[1].coordinate[0],
            _faces[1].coordinate[1],
            _faces[1].coordinate[2],
            _faces[1].coordinate[3],
          ]}
          containerWidth={100}
          containerHeight={100}
        />
        <div className="ml-5 mb-3">
          <h1 className="text-2xl mb-1 font-bold text-white">
            {_faces[1].name}
          </h1>
          <h1 className="text-xl font-medium text-white">
            {_faces[1].times} lần
          </h1>
        </div>
      </div>
      <div
        style={{
          left: `${moveThirdAvatar}px`,
        }}
        className="flex items-center absolute top-[380px]"
      >
        <h1 className="text-[75px] mr-10 font-bold text-white">3</h1>
        <CroppedImage
          imageURL={_faces[2].image}
          coordinate={[
            _faces[2].coordinate[0],
            _faces[2].coordinate[1],
            _faces[2].coordinate[2],
            _faces[2].coordinate[3],
          ]}
          containerWidth={100}
          containerHeight={100}
        />
        <div className="ml-5 mb-3">
          <h1 className="text-2xl mb-1 font-bold text-white">
            {_faces[2].name}
          </h1>
          <h1 className="text-xl font-medium text-white">
            {_faces[2].times} lần
          </h1>
        </div>
      </div>
      <div
        style={{
          left: `${moveForthAvatar}px`,
        }}
        className="flex items-center absolute top-[530px]"
      >
        <h1 className="text-[75px] mr-10 font-bold text-white">4</h1>
        <CroppedImage
          imageURL={_faces[3].image}
          coordinate={[
            _faces[3].coordinate[0],
            _faces[3].coordinate[1],
            _faces[3].coordinate[2],
            _faces[3].coordinate[3],
          ]}
          containerWidth={100}
          containerHeight={100}
        />
        <div className="ml-5 mb-3">
          <h1 className="text-2xl mb-1 font-bold text-white">
            {_faces[3].name}
          </h1>
          <h1 className="text-xl font-medium text-white">
            {_faces[3].times} lần
          </h1>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default FaceListLayer;
