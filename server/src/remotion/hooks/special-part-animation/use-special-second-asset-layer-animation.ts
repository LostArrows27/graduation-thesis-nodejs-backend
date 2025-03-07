import {
  SECOND_ASSET_LAYER_TEXT_APPEAR_TIME,
  SECOND_ASSET_LAYER_TEXT_MOVE_IN_DURATION,
  SECOND_ASSET_TEXT_LAYER_MOVE_OUT_TIME,
  SECOND_ASSET_TEXT_LAYER_MOVE_OUT_DURATION,
  SECOND_ASSET_LAYER_TEXT_MOVE_UP_TIME,
  SECOND_ASSET_LAYER_TEXT_MOVE_UP_DURATION,
  SECOND_ASSET_LAYER_CAPTION_MOVE_UP_TIME,
  SECOND_ASSET_LAYER_CAPTION_MOVE_UP_DURATION,
} from "../../constants/constants";
import { useEasingSinFunction } from "./use_easing_sin_function";

export const useSpecialSecondAssetLayerAnimation = () => {
  const moveSecondTitleIn = useEasingSinFunction(
    [
      SECOND_ASSET_LAYER_TEXT_APPEAR_TIME,
      SECOND_ASSET_LAYER_TEXT_APPEAR_TIME +
        SECOND_ASSET_LAYER_TEXT_MOVE_IN_DURATION,
      SECOND_ASSET_TEXT_LAYER_MOVE_OUT_TIME,
      SECOND_ASSET_TEXT_LAYER_MOVE_OUT_TIME +
        SECOND_ASSET_TEXT_LAYER_MOVE_OUT_DURATION,
    ],
    [-33, 50, 50, -33]
  );

  const moveSecondTitleUp = useEasingSinFunction(
    [
      SECOND_ASSET_LAYER_TEXT_MOVE_UP_TIME,
      SECOND_ASSET_LAYER_TEXT_MOVE_UP_TIME +
        SECOND_ASSET_LAYER_TEXT_MOVE_UP_DURATION,
    ],
    [270, 250]
  );

  const moveSecondCaptionUp = useEasingSinFunction(
    [
      SECOND_ASSET_LAYER_CAPTION_MOVE_UP_TIME,
      SECOND_ASSET_LAYER_CAPTION_MOVE_UP_TIME +
        SECOND_ASSET_LAYER_CAPTION_MOVE_UP_DURATION,
    ],
    [450, 420]
  );

  const moveSecondCaptionOut = useEasingSinFunction(
    [
      SECOND_ASSET_LAYER_CAPTION_MOVE_UP_TIME,
      SECOND_ASSET_TEXT_LAYER_MOVE_OUT_TIME,
      SECOND_ASSET_TEXT_LAYER_MOVE_OUT_TIME +
        SECOND_ASSET_TEXT_LAYER_MOVE_OUT_DURATION,
    ],
    [50, 50, -15]
  );

  return {
    moveSecondTitleIn,
    moveSecondTitleUp,
    moveSecondCaptionUp,
    moveSecondCaptionOut,
  };
};
