import { chooseRandomOutroImage } from "../../../src/remotion/utils/choose-random-outro-image";
import { mockChapterList } from "../../mocks/chapter";

describe("chooseRandomOutroImage", () => {
  test("should throw error with empty chapter", () => {
    expect(() => chooseRandomOutroImage([])).toThrow("No chapter available");
  });

  test("should return 5 images with 1 image only", () => {
    const result = chooseRandomOutroImage(mockChapterList.slice(0, 1));

    expect(result).toHaveLength(5);
  });

  test("should return 5 images with 2 image only", () => {
    const result = chooseRandomOutroImage(mockChapterList.slice(0, 2));

    expect(result).toHaveLength(5);
  });

  test("should return 5 images with 2 image only (2)", () => {
    const result = chooseRandomOutroImage([
      mockChapterList[0],
      mockChapterList[0],
    ]);

    expect(result).toHaveLength(5);
  });

  test("should return 5 images with 3 image only", () => {
    const result = chooseRandomOutroImage(mockChapterList.slice(0, 3));

    expect(result).toHaveLength(5);
  });

  test("should return 5 images with 4 image only", () => {
    const result = chooseRandomOutroImage(mockChapterList.slice(0, 4));

    expect(result).toHaveLength(5);
  });

  test("should return 5 images with >= 5 image", () => {
    const result = chooseRandomOutroImage(mockChapterList);

    expect(result).toHaveLength(5);
  });
});
