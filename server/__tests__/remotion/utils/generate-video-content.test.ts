import { groupImageByLabel } from "../../../src/helpers/images/image_grouping";
import { generateVideoContent } from "../../../src/remotion/utils/generate-video-content";
import { mockImageForVideoContent, mockImageMetaData } from "../../mocks/image";

describe("generateVideoContent", () => {
  test("should return nothing with empty image", () => {
    const result = generateVideoContent({});

    expect(result).toEqual([]);
  });

  test("should return chapters with images", () => {
    const imageJson = groupImageByLabel(mockImageForVideoContent);

    const result = generateVideoContent(imageJson);

    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toEqual(3);
  });

  test("should return no activity chapter", () => {
    const imageJson = groupImageByLabel(mockImageMetaData.slice(6));

    const result = generateVideoContent(imageJson);

    for (const chapter of result) {
      expect(chapter.frame.length).toBeGreaterThan(0);
      expect(chapter.frame[0].category).not.toEqual("event");
      expect(chapter.frame[0].category).not.toEqual("activity");
    }
  });
});
