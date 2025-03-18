import { duplicateImageInView } from "../../../src/remotion/utils/duplicate-image-in-view";
import { mockImagePathArr } from "../../mocks/image_path";

describe("duplicateImageInView", () => {
  test("should return 7x6 rows for >= 42 images", () => {
    const result = duplicateImageInView(
      mockImagePathArr,
      "caption-first",
      "second caption"
    );

    expect(result).toHaveLength(7);
    for (let i = 0; i <= 6; i++) {
      expect(result[i]).toHaveLength(6);
    }
  });

  test("should return 7x6 rows for <= 42 images", () => {
    const result = duplicateImageInView(
      mockImagePathArr.slice(0, 20),
      "caption-first",
      "second caption"
    );

    expect(result).toHaveLength(7);
    for (let i = 0; i <= 6; i++) {
      expect(result[i]).toHaveLength(6);
    }
  });
});
