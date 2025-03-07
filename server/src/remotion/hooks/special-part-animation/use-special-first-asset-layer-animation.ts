import {
  FIRST_ASSET_LAYER_APPEAR_TIME,
  FIRST_ASSET_LAYER_CAPTION_MOVE_UP_DURATION,
  FIRST_ASSET_LAYER_CAPTION_MOVE_UP_TIME,
  FIRST_ASSET_LAYER_TEXT_APPEAR_TIME,
  FIRST_ASSET_LAYER_TEXT_MOVE_IN_DURATION,
  FIRST_ASSET_LAYER_TEXT_MOVE_UP_DURATION,
  FIRST_ASSET_LAYER_TEXT_MOVE_UP_TIME,
  FIRST_ASSET_TEXT_LAYER_MOVE_OUT_DURATION,
  FIRST_ASSET_TEXT_LAYER_MOVE_OUT_TIME,
  LEADERBOARD_APPEAR_TIME,
} from "../../constants/constants";
import { useEasingSinFunction } from "./use_easing_sin_function";

export const useSpecialFirstAssetTextAnimation = () => {
  const moveTitleIn = useEasingSinFunction(
    [
      FIRST_ASSET_LAYER_TEXT_APPEAR_TIME,
      FIRST_ASSET_LAYER_TEXT_APPEAR_TIME +
        FIRST_ASSET_LAYER_TEXT_MOVE_IN_DURATION,
      FIRST_ASSET_TEXT_LAYER_MOVE_OUT_TIME,
      FIRST_ASSET_TEXT_LAYER_MOVE_OUT_TIME +
        FIRST_ASSET_TEXT_LAYER_MOVE_OUT_DURATION,
    ],
    [-33, 50, 50, -33]
  );

  const moveTitleUp = useEasingSinFunction(
    [
      FIRST_ASSET_LAYER_TEXT_MOVE_UP_TIME,
      FIRST_ASSET_LAYER_TEXT_MOVE_UP_TIME +
        FIRST_ASSET_LAYER_TEXT_MOVE_UP_DURATION,
    ],
    [270, 250]
  );

  const moveCaptionUp = useEasingSinFunction(
    [
      FIRST_ASSET_LAYER_CAPTION_MOVE_UP_TIME,
      FIRST_ASSET_LAYER_CAPTION_MOVE_UP_TIME +
        FIRST_ASSET_LAYER_CAPTION_MOVE_UP_DURATION,
    ],
    [450, 420]
  );

  const moveCaptionOut = useEasingSinFunction(
    [
      FIRST_ASSET_LAYER_CAPTION_MOVE_UP_TIME,
      FIRST_ASSET_TEXT_LAYER_MOVE_OUT_TIME,
      FIRST_ASSET_TEXT_LAYER_MOVE_OUT_TIME +
        FIRST_ASSET_TEXT_LAYER_MOVE_OUT_DURATION,
    ],
    [50, 50, -12]
  );

  return { moveTitleIn, moveTitleUp, moveCaptionUp, moveCaptionOut };
};

export const useSpecialFirstAssetLayerAnimation = () => {
  const moveFadeSvg = useEasingSinFunction(
    [
      FIRST_ASSET_LAYER_APPEAR_TIME,
      FIRST_ASSET_LAYER_APPEAR_TIME + 20,

      LEADERBOARD_APPEAR_TIME - 20,
      LEADERBOARD_APPEAR_TIME,
    ],
    [-440, -290, -290, -500]
  );

  const movePattern2 = useEasingSinFunction(
    [
      FIRST_ASSET_LAYER_APPEAR_TIME,
      FIRST_ASSET_LAYER_APPEAR_TIME + 20,
      LEADERBOARD_APPEAR_TIME - 20,
      LEADERBOARD_APPEAR_TIME,
    ],
    [-250, -100, -100, -300]
  );

  return { moveFadeSvg, movePattern2 };
};

