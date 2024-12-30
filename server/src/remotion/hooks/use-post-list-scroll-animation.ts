// 1 post length = 238px
// speed -> 3 -> total can scroll 180 * 3 = 540px
// -> total can see 3-4 image in a row
// -> for 7 rows need at least 6 image in view = 6 * 7 = 42 image

// up -> stick to top -> translateY decrease
// down -> stick to bottom -> translateY increase

import { useCurrentFrame } from "remotion";
import {
  INTRO_POST_SCROLL_DOWN_INIT,
  INTRO_POST_SCROLL_SPEED,
  INTRO_SCENE_LENGTH,
  INTRO_SECOND_SCENE_FADE_TIME,
} from "../constants/constants";

export const usePostListScrollAnimation = () => {
  const frame = useCurrentFrame();

  const speed =
    frame < INTRO_SCENE_LENGTH - INTRO_SECOND_SCENE_FADE_TIME
      ? INTRO_POST_SCROLL_SPEED
      : 20;

  return {
    up: `translateY(${INTRO_POST_SCROLL_DOWN_INIT + frame * speed}px)`,
    down: `translateY(-${frame * speed}px)`,
  };
};
