import {
  LEADERBOARD_ASSET_FADE_IN_DELAY,
  LEADERBOARD_ASSET_FADE_IN_DURATION,
  LEADERBOARD_ASSET_MOVE_OUT_DURATION,
  LEADERBOARD_ASSET_MOVE_OUT_TIME,
  LEADERBOARD_SECOND_ASSET_APPEAR_DURATION,
  LEADERBOARD_SECOND_ASSET_APPEAR_TIME,
  LEADERBOARD_TEXT_APPEAR_TIME,
  LEADERBOARD_TEXT_MOVE_IN_DURATION,
} from "../../constants/constants";
import { useBounceAnimation } from "./use_bouncing_animation";
import { useEasingSinFunction } from "./use_easing_sin_function";

export const useLeaderboardAssetAnimation = () => {
  const opacity = useEasingSinFunction(
    [
      LEADERBOARD_ASSET_FADE_IN_DELAY,
      LEADERBOARD_ASSET_FADE_IN_DELAY + LEADERBOARD_ASSET_FADE_IN_DURATION,
    ],
    [0, 1]
  );

  return { opacity };
};

export const useAssetBouncingAnimation = () => {
  const bounce1 = useBounceAnimation(15, 80, 0); // Upper right block
  const bounce2 = useBounceAnimation(10, 90, 2); // Upper left block
  const bounce3 = useBounceAnimation(12, 100, 4); // Bottom block

  return { bounce1, bounce2, bounce3 };
};

export const useAssetGoInAnimation = () => {
  const moveFirstBlockIn = useEasingSinFunction(
    [
      LEADERBOARD_SECOND_ASSET_APPEAR_TIME,
      LEADERBOARD_SECOND_ASSET_APPEAR_DURATION +
        LEADERBOARD_SECOND_ASSET_APPEAR_TIME,
      LEADERBOARD_ASSET_MOVE_OUT_TIME,
      LEADERBOARD_ASSET_MOVE_OUT_TIME + LEADERBOARD_ASSET_MOVE_OUT_DURATION,
    ],
    [-570, -250, -250, -570]
  );

  const moveSecondBlockIn = useEasingSinFunction(
    [
      LEADERBOARD_SECOND_ASSET_APPEAR_TIME,
      LEADERBOARD_SECOND_ASSET_APPEAR_DURATION +
        LEADERBOARD_SECOND_ASSET_APPEAR_TIME,
      LEADERBOARD_ASSET_MOVE_OUT_TIME,
      LEADERBOARD_ASSET_MOVE_OUT_TIME + LEADERBOARD_ASSET_MOVE_OUT_DURATION,
    ],
    [-200, 50, 50, -200]
  );

  const moveThirdBlockIn = useEasingSinFunction(
    [
      LEADERBOARD_SECOND_ASSET_APPEAR_TIME,
      LEADERBOARD_SECOND_ASSET_APPEAR_DURATION +
        LEADERBOARD_SECOND_ASSET_APPEAR_TIME,
      LEADERBOARD_ASSET_MOVE_OUT_TIME,
      LEADERBOARD_ASSET_MOVE_OUT_TIME + LEADERBOARD_ASSET_MOVE_OUT_DURATION,
    ],
    [-340, -40, -40, -340]
  );

  const moveBgIn = useEasingSinFunction(
    [
      LEADERBOARD_SECOND_ASSET_APPEAR_TIME,
      LEADERBOARD_SECOND_ASSET_APPEAR_DURATION +
        LEADERBOARD_SECOND_ASSET_APPEAR_TIME,
      LEADERBOARD_ASSET_MOVE_OUT_TIME,
      LEADERBOARD_ASSET_MOVE_OUT_TIME + LEADERBOARD_ASSET_MOVE_OUT_DURATION,
    ],
    [-1190, -300, -300, -1190]
  );

  return { moveFirstBlockIn, moveSecondBlockIn, moveThirdBlockIn, moveBgIn };
};

export const useTitleAnimation = () => {
  const moveFirstTitle = useEasingSinFunction(
    [
      LEADERBOARD_TEXT_APPEAR_TIME,
      LEADERBOARD_TEXT_MOVE_IN_DURATION + LEADERBOARD_TEXT_APPEAR_TIME,
      LEADERBOARD_ASSET_MOVE_OUT_TIME,
      LEADERBOARD_ASSET_MOVE_OUT_TIME + LEADERBOARD_ASSET_MOVE_OUT_DURATION,
    ],
    [-400, -80, -80, -400]
  );

  const moveSecondTitle = useEasingSinFunction(
    [
      LEADERBOARD_TEXT_APPEAR_TIME,
      LEADERBOARD_TEXT_MOVE_IN_DURATION + LEADERBOARD_TEXT_APPEAR_TIME,
      LEADERBOARD_ASSET_MOVE_OUT_TIME,
      LEADERBOARD_ASSET_MOVE_OUT_TIME + LEADERBOARD_ASSET_MOVE_OUT_DURATION,
    ],
    [-600, -60, -60, -600]
  );

  return { moveFirstTitle, moveSecondTitle };
};
