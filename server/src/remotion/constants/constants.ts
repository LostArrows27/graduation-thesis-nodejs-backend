// video metadata
export const VIDEO_WIDTH = 1280;
export const VIDEO_HEIGHT = 720;
export const VIDEO_FPS = 30;
export const AUDIO_VOLUME = 0.7;
export const VIDEO_COMPOSITION_ID = "MainVideo";

// intro
export const INTRO_FADE_IN_TIME = 0.8 * VIDEO_FPS;

export const INTRO_SCENE_LENGTH = 13.5 * VIDEO_FPS;
export const INTRO_FIRST_SCENE_LENGTH = 7 * VIDEO_FPS;
export const INTRO_SECOND_SCENE_LENGTH =
  INTRO_SCENE_LENGTH - INTRO_FIRST_SCENE_LENGTH;

export const INTRO_FIRST_SCENE_FADE_TIME = VIDEO_FPS;
export const INTRO_SECOND_SCENE_FADE_TIME = 0.6 * VIDEO_FPS;

export const IMAGE_FRAME_WIDTH = 450;
export const IMAGE_ROTATION_ANGLE = 12;
export const IMAGE_FRAME_SCALE_DURATION = 1.4 * VIDEO_FPS;
export const IMAGE_CONTENT_SCALE_DELAY_TIME = 0.05 * VIDEO_FPS;

export const TITLE_FRAME_SCALE_DURATION = 0.6 * VIDEO_FPS;
export const TITLE_FRAME_DELAY_TIME = IMAGE_FRAME_SCALE_DURATION;

export const TYPE_WRITER_SPEED = 2;

export const SUBTEXT_DELAY_DURATION = 0.3 * VIDEO_FPS;

export const INTRO_SECOND_SCENE_TRANSITION_TIME = 0.8 * VIDEO_FPS;
export const INTRO_POST_SCALE_LEVEL_1 = 1.03;
export const INTRO_POST_SCALE_LEVEL_2 = 1.45;
export const INTRO_POST_SCALE_LEVEL_3 = 2.4;

export const INTRO_POST_SCROLL_SPEED = 3;
export const INTRO_POST_SCROLL_DOWN_INIT = -500;

export const INTRO_POSTS_SCALE_DURATION = 0.8 * VIDEO_FPS;
export const INTRO_POSTS_SCALE_IDLE_TIME = 1.2 * VIDEO_FPS;
export const INTRO_POST_SCALE_LEVEL_1_EXTRA_TIME = 0.5 * VIDEO_FPS;

export const INTRO_SECOND_SCENE_CAPTION_DURATION =
  INTRO_POSTS_SCALE_IDLE_TIME * 2 +
  INTRO_POSTS_SCALE_DURATION +
  INTRO_POST_SCALE_LEVEL_1_EXTRA_TIME;

// content
// NOTE: for now 72 images -> 2:12 mins
export const CHAPTER_TRANSITION_TIME = 1.5 * VIDEO_FPS;
export const TITLE_TRANSITION_TIME = 0.9 * VIDEO_FPS;
export const FRAME_TRANSITION_TIME = 0.9 * VIDEO_FPS;
export const FIRST_CHAPTER_IN_TRANSITION_TIME = 0.8 * VIDEO_FPS;

// NOTE: this duration is not count the transition time
export const TITLE_FRAME_DURATION = 2 * VIDEO_FPS;
export const SINGLE_IMAGE_FRAME_DURATION = 4 * VIDEO_FPS;
export const MULTI_IMAGE_FRAME_DURATION = 5 * VIDEO_FPS;

// self built frame transition
export const ONE_IMAGE_FRAME_TRANSITION_DURATION = 1.5 * VIDEO_FPS;
export const ONE_IMAGE_TRANSITION_DELAY = FRAME_TRANSITION_TIME / 2;

export const builtInPath = "/images/content/built_in_frame/";

export const normalFramePath = "/images/content/normal_frame/";

// built in frame
export const BUILT_IN_SINGLE_FRAME_DURATION = 2.5 * VIDEO_FPS;
export const BUILT_IN_MULTI_FRAME_DURATION = 3 * VIDEO_FPS;

export const BUILT_IN_FADE_IN_TIME = 0.8 * VIDEO_FPS;

export const BUILT_IN_ANIMATION_TIME = 0.7 * VIDEO_FPS;

// content -> event title
export const eventAssetPath = "/images/content/title_event/";

// outro
export const OUTRO_FADE_TIME = VIDEO_FPS;
export const OUTRO_PREV_PART_CONTENT_LENGTH = 0.5 * VIDEO_FPS;
export const OUTRO_PREV_PART_TOTAL_LENGTH =
  OUTRO_FADE_TIME + OUTRO_PREV_PART_CONTENT_LENGTH;

export const OUTRO_SCENE_LENGTH = 8 * VIDEO_FPS;
export const OUTRO_IDLE_TIME = 0.4 * VIDEO_FPS;
export const OUTRO_MAIN_FADE_TIME = 0.5 * VIDEO_FPS;

export const OUTRO_IMAGE_FRAME_FADE_TIME = 0.6 * VIDEO_FPS;
export const OUTRO_IMAGE_FRAME_WAIT_TIME = 0.4 * VIDEO_FPS;

export const OUTRO_CAPTION_APPEAR_TIME =
  OUTRO_MAIN_FADE_TIME + OUTRO_IMAGE_FRAME_WAIT_TIME * 2;

export const OUTRO_CAPTION_FADE_TIME = VIDEO_FPS;

// outro -> animated caption
export const OUTRO_FIRST_CAPTION_DELAY = VIDEO_FPS;
export const OUTRO_SECOND_CAPTION_DELAY = 0.7 * VIDEO_FPS;

export const outroAssetPath = "/images/outro/";
