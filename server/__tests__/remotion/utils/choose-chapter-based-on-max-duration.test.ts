import {
  INTRO_SCENE_LENGTH,
  OUTRO_SCENE_LENGTH,
  VIDEO_FPS,
} from "../../../src/remotion/constants/constants";
import { chooseChapterBasedOnMaxDuration } from "../../../src/remotion/utils/choose-chapter-based-on-max-duration";
import { mockChapterWithDuration } from "../../mocks/chapter_with_duration";

describe("chooseChapterBasedOnMaxDuration", () => {
  test("should return whole chapter without maxDuration", () => {
    const result = chooseChapterBasedOnMaxDuration(
      mockChapterWithDuration,
      false
    );

    expect(result.chapters).toEqual(mockChapterWithDuration);
  });

  test("should return whole chapter with invalid maxDuration", () => {
    const result = chooseChapterBasedOnMaxDuration(
      mockChapterWithDuration,
      false,
      0
    );

    expect(result.chapters).toEqual(mockChapterWithDuration);
  });

  test("should cut chapter if maxDuraton is available", () => {
    const result = chooseChapterBasedOnMaxDuration(
      mockChapterWithDuration,
      false,
      49
    );

    expect(result.chapters.length).toEqual(1);
    expect(
      result.contentTotalDuration + INTRO_SCENE_LENGTH + OUTRO_SCENE_LENGTH
    ).toBeLessThanOrEqual(49 * VIDEO_FPS);
  });

  test("should cut chapter if maxDuraton is available with face", () => {
    const result = chooseChapterBasedOnMaxDuration(
      mockChapterWithDuration,
      true,
      40
    );

    expect(result.chapters.length).toEqual(1);
  });

  test("should cut chapter if maxDuraton is available with face", () => {
    const result = chooseChapterBasedOnMaxDuration(
      mockChapterWithDuration,
      false,
      40
    );

    expect(result.chapters.length).toEqual(1);
  });
});
