import { groupImageByLabel } from "../../../src/helpers/images/image_grouping";
import {
  selectIntroFirstSceneImages,
  selectIntroSecondSceneImages,
} from "../../../src/helpers/remotion/process_video_input_props";
import { mockImageMetaData } from "../../mocks/image";

describe("selectIntroSecondSceneImages", () => {
  test("should cut image group to 42 image", () => {
    const mockArray = [
      ...mockImageMetaData,
      ...mockImageMetaData,
      ...mockImageMetaData,
      ...mockImageMetaData,
      ...mockImageMetaData,
    ];

    const result = groupImageByLabel(mockArray);

    expect(selectIntroSecondSceneImages(result)).toHaveLength(42);
  });

  test("shouldn't crop image group <= 42 images", () => {
    const mockArray = [...mockImageMetaData, ...mockImageMetaData];

    const result = groupImageByLabel(mockArray);

    expect(selectIntroSecondSceneImages(result).length < 42).toBeTruthy();
  });
});

describe("selectIntroFirstSceneImages", () => {
  test("should return 4 images for long group", () => {
    const result = groupImageByLabel(mockImageMetaData);

    expect(selectIntroFirstSceneImages(result).length).toBe(4);
  });

  test("should throw error when no images", () => {
    const result = groupImageByLabel([]);

    expect(() => selectIntroFirstSceneImages(result)).toThrow(
      "No images found"
    );
  });

  test("should fill image if not enough 4 for 2 image", () => {
    const result = groupImageByLabel(mockImageMetaData.slice(0, 2));

    expect(selectIntroFirstSceneImages(result).length).toBe(4);
  });

  test("should fill image if not enough 4 for 1 image", () => {
    const result = groupImageByLabel(mockImageMetaData.slice(0, 1));

    expect(selectIntroFirstSceneImages(result).length).toBe(4);
  });
});
