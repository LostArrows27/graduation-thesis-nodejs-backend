import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { Greenscreen } from "../Transition/GreenScreen";
import {
  GREEN_SCREEN_CLOSE_DURATION,
  GREEN_SCREEN_DURATION,
  LEADERBOARD_APPEAR_TIME,
  SPECIAL_CONTENT_REVEAL_TIME,
  SPECIAL_PART_FADE_IN_TIME,
  SPECIAL_PART_FADE_OUT_TIME,
  SPECIAL_PART_LENGTH,
} from "../../constants/constants";
import OutroPrevSpecialPart from "./OutroPrevSpecialPart";
import SpecialPartFade from "./SpecialPartFade";
import { SpecialPartProps } from "../../types/video.type";
import SpecialPartAssetLayer from "./AssetLayer";
import FaceLeaderBoard from "./FaceLeaderBoard";

// frame 1: bay vào -> bay ra
// Chuyến đi này đã được tạo nên bởi 8 con người tuyệt vời !
// <-> Tổng cộng 8 người đã tham gia vào chuyến hành trình này
// Và trong đó có bạn !
// <-> Và làm sao thiếu bạn được !
// animation:
// text 1 -> bay vào
// text 2 -> đi dưới lên
// text 1 -> nhích 1 chút trước text 2 và cùng dừng !
// text 1 + text 2 -> bay ra
// ---------------------------------------
// frame 2:
// Cùng điểm lại top 5 khuôn mặt đáng nhớ nhất nhé
// <-> Nhưng sao quên được top 5 khuôn mặt sau
// Và đây là bảng xếp hạng
// animation:
// giống như frame 1
// ---------------------------------------
// frame 3:
// Top 5 người tham gia -> cột bên trái
// 2 cột bên phải
// cột 1 -> top 1 + top 2
// cột 2 -> top 3 + top 4 + top 5
// animation:
// cột bên trái -> bay vào
// cột 1 bên phải -> bay vào top 1 -> nối tiếp top 2
// cột 2 bên phải -> bay vào top 3 -> nối tiếp top 4 -> nối tiếp top 5
// ---------------------------------------
const VideoSpecialPart = ({ faces, totalFaces }: SpecialPartProps) => {
  return (
    <AbsoluteFill>
      <Sequence
        from={SPECIAL_CONTENT_REVEAL_TIME}
        durationInFrames={
          SPECIAL_PART_LENGTH -
          SPECIAL_CONTENT_REVEAL_TIME -
          SPECIAL_PART_FADE_OUT_TIME
        }
      >
        <SpecialPartAssetLayer total={totalFaces} />
      </Sequence>
      <Sequence
        from={LEADERBOARD_APPEAR_TIME}
        durationInFrames={
          SPECIAL_PART_LENGTH -
          LEADERBOARD_APPEAR_TIME -
          SPECIAL_PART_FADE_OUT_TIME
        }
      >
        <FaceLeaderBoard faces={faces} />
      </Sequence>
      <FadeInVideo />
      <SpecialPartFade />
      <OutroPrevSpecialPart />
      <FadeOutVideo />
    </AbsoluteFill>
  );
};

const FadeInVideo = () => {
  const frame = useCurrentFrame();

  const fadeInOpacity = interpolate(
    frame,
    [0, SPECIAL_PART_FADE_IN_TIME],
    [0.5, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill
      style={{
        opacity: fadeInOpacity,
      }}
    >
      <Sequence durationInFrames={GREEN_SCREEN_DURATION}>
        <Greenscreen videoSrc="/videos/transitions/door_open.mp4" opacity={0} />
      </Sequence>
    </AbsoluteFill>
  );
};

const FadeOutVideo = () => {
  const frame = useCurrentFrame();

  const fadeOutOpacity = interpolate(
    frame,
    [SPECIAL_PART_LENGTH - SPECIAL_PART_FADE_OUT_TIME, SPECIAL_PART_LENGTH],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <Sequence
      from={
        SPECIAL_PART_LENGTH -
        GREEN_SCREEN_CLOSE_DURATION -
        SPECIAL_PART_FADE_OUT_TIME
      }
      durationInFrames={
        GREEN_SCREEN_CLOSE_DURATION + SPECIAL_PART_FADE_OUT_TIME
      }
    >
      <AbsoluteFill
        style={{
          opacity: fadeOutOpacity,
        }}
      >
        <Greenscreen
          videoSrc="/videos/transitions/door_close.mp4"
          opacity={0}
        />
      </AbsoluteFill>
    </Sequence>
  );
};

export default VideoSpecialPart;
