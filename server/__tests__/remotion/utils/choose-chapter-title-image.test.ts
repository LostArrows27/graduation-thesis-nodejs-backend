import { chooseChapterTitleImage } from "../../../src/remotion/utils/choose-chapter-title-image";
import { mockFrameList } from "../../mocks/frame";

describe("chooseChapterTitleImage", () => {
  test("should throw error image there are no location images", () => {
    expect(() => chooseChapterTitleImage([], "title", 5, 2)).toThrow(
      "No images found for title image"
    );
  });

  test("should return 2 image for 1 location image only", () => {
    const result = chooseChapterTitleImage(
      mockFrameList.slice(0, 2),
      "title",
      5,
      2
    );

    const expectedOutput = ["test2", "test1"];
    expect(result).toEqual(expectedOutput);
  });

  test("should duplicate image for 1 location image only", () => {
    const result = chooseChapterTitleImage(
      mockFrameList.slice(1, 2),
      "title",
      5,
      2
    );

    const expectedOutput = ["test2", "test2"];
    expect(result).toEqual(expectedOutput);
  });

  test("should return 1 high confident image and 1 random image", () => {
    const result = chooseChapterTitleImage(mockFrameList, "title", 5, 2);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual("test3");
    expect(result[1]).toEqual("test2");
  });
});
