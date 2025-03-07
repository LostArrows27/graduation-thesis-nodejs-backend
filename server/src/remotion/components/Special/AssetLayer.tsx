import { AbsoluteFill, Img, Sequence, useCurrentFrame } from "remotion";
import { useMemoAssetArray } from "../../hooks/use-memo-asset-path";
import {
  FIRST_ASSET_LAYER_CAPTION_MOVE_UP_TIME,
  SECOND_ASSET_LAYER_APPEAR_TIME,
  SECOND_ASSET_LAYER_CAPTION_MOVE_UP_TIME,
  SECOND_ASSET_TEXT_LAYER_MOVE_OUT_DURATION,
  SECOND_ASSET_TEXT_LAYER_MOVE_OUT_TIME,
  SPECIAL_CONTENT_REVEAL_TIME,
  specialPath,
} from "../../constants/constants";
import {
  useSpecialFirstAssetLayerAnimation,
  useSpecialFirstAssetTextAnimation,
} from "../../hooks/special-part-animation/use-special-first-asset-layer-animation";
import { useSpecialSecondAssetLayerAnimation } from "../../hooks/special-part-animation/use-special-second-asset-layer-animation";
import { useBounceAnimation } from "../../hooks/special-part-animation/use_bouncing_animation";
import { loadFont as loadTitleFont } from "@remotion/google-fonts/NotoSans";

const { fontFamily } = loadTitleFont();

const SpecialPartAssetLayer = ({ total }: { total: number }) => {
  const [fadeSvgPath, pattern2Path, dotCirclePath] = useMemoAssetArray(
    ["fade.svg", "pattern_2.png", "dot_circle.png"],
    specialPath
  );

  const frame = useCurrentFrame();

  const { moveFadeSvg, movePattern2 } = useSpecialFirstAssetLayerAnimation();

  const bounce1 = useBounceAnimation(10, 100, 0);
  const bounce2 = useBounceAnimation(10, 110, 0);
  const bounce3 = useBounceAnimation(10, 90, 0);

  const { moveTitleIn, moveTitleUp, moveCaptionUp, moveCaptionOut } =
    useSpecialFirstAssetTextAnimation();

  const {
    moveSecondTitleIn,
    moveSecondTitleUp,
    moveSecondCaptionUp,
    moveSecondCaptionOut,
  } = useSpecialSecondAssetLayerAnimation();

  return (
    <AbsoluteFill className="bg-[rgb(94,23,235)]">
      {/* first caption layer */}
      <Sequence
        from={SPECIAL_CONTENT_REVEAL_TIME}
        durationInFrames={
          SECOND_ASSET_LAYER_APPEAR_TIME - SPECIAL_CONTENT_REVEAL_TIME
        }
      >
        <AbsoluteFill>
          <h1
            style={{
              fontFamily,
              left: `${moveTitleIn}%`,
              top: `${moveTitleUp}px`,
            }}
            className="text-white w-full absolute -translate-x-1/2 center text-5xl uppercase leading-snug font-black text-center"
          >
            Trips này đã được tạo nên bởi
            <br />
            {total} con người tuyệt vời !
          </h1>
          <div
            style={{
              fontFamily,
              opacity: frame < FIRST_ASSET_LAYER_CAPTION_MOVE_UP_TIME ? 0 : 1,
              top: `${moveCaptionUp}px`,
              left: `${moveCaptionOut}%`,
            }}
            className="text-white absolute -translate-x-1/2 text-3xl leading-snug text-center"
          >
            Và trong đó có bạn !
          </div>
        </AbsoluteFill>
      </Sequence>
      {/* second caption layer */}
      <Sequence
        durationInFrames={
          SECOND_ASSET_TEXT_LAYER_MOVE_OUT_DURATION +
          SECOND_ASSET_TEXT_LAYER_MOVE_OUT_TIME -
          SECOND_ASSET_LAYER_APPEAR_TIME
        }
        from={SECOND_ASSET_LAYER_APPEAR_TIME}
      >
        <AbsoluteFill>
          <h1
            style={{
              fontFamily,
              left: `${moveSecondTitleIn}%`,
              top: `${moveSecondTitleUp}px`,
            }}
            className="text-white w-full absolute -translate-x-1/2 center text-5xl uppercase leading-snug font-black text-center"
          >
            Nhưng làm sao quên được <br />
            top 4 khuôn mặt sau !
          </h1>
          <div
            style={{
              fontFamily,
              opacity: frame < SECOND_ASSET_LAYER_CAPTION_MOVE_UP_TIME ? 0 : 1,
              top: `${moveSecondCaptionUp}px`,
              left: `${moveSecondCaptionOut}%`,
            }}
            className="text-white absolute -translate-x-1/2 text-3xl leading-snug text-center"
          >
            Và sau đây là bảng xếp hạng
          </div>
        </AbsoluteFill>
      </Sequence>
      <AbsoluteFill>
        <div
          style={{
            top: `${movePattern2}px`,
            transform: `translateY(${bounce1}px)`,
          }}
          className="absolute right-[200px]"
        >
          <Img
            src={dotCirclePath}
            className="w-[250px] h-auto object-center object-cover"
          />
        </div>
        <div
          style={{
            bottom: `${movePattern2}px`,
            transform: `translateY(${bounce1}px)`,
          }}
          className="absolute left-[250px]"
        >
          <Img
            src={dotCirclePath}
            className="w-[250px] h-auto object-center object-cover"
          />
        </div>
      </AbsoluteFill>
      <AbsoluteFill>
        <div
          style={{
            left: `${movePattern2}px`,
            transform: `translateY(${bounce2}px)`,
          }}
          className="absolute bottom-[50px]"
        >
          <Img
            src={pattern2Path}
            className="w-[300px] h-auto object-center object-cover"
          />
        </div>
        <div
          style={{
            right: `${movePattern2}px`,
            transform: `translateY(${bounce2}px)`,
          }}
          className="absolute top-[50px]"
        >
          <Img
            src={pattern2Path}
            className="w-[300px] h-full oject-center object-cover"
          />
        </div>
      </AbsoluteFill>
      <AbsoluteFill>
        <div
          style={{
            left: `${moveFadeSvg}px`,
            transform: `translateY(${bounce3}px)`,
          }}
          className="absolute top-[-290px]"
        >
          <Img
            src={fadeSvgPath}
            className="w-[500px] h-auto object-center object-cover"
          />
        </div>
        <div
          style={{
            right: `${moveFadeSvg}px`,
            transform: `translateY(${bounce3}px)`,
          }}
          className="absolute rotate-180 bottom-[-290px]"
        >
          <Img
            src={fadeSvgPath}
            className="w-[500px] h-auto object-center object-cover"
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default SpecialPartAssetLayer;
