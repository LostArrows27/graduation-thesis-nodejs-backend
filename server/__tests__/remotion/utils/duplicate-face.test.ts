import { duplicateFace } from "../../../src/remotion/utils/duplicate-face";
import { mockFaceList } from "../../mocks/face";

describe("duplicateFace", () => {
  test("should return empty array with no face", () => {
    const result = duplicateFace([]);

    expect(result.length).toEqual(0);
  });

  test("should duplicate 4 face with 1 face list", () => {
    const result = duplicateFace(mockFaceList.slice(0, 1));

    expect(result.length).toEqual(4);
  });

  test("should duplicate 4 face with 2 face list", () => {
    const result = duplicateFace(mockFaceList.slice(0, 2));

    expect(result.length).toEqual(4);
  });

  test("should duplicate 4 face with 3 face list", () => {
    const result = duplicateFace(mockFaceList.slice(0, 3));

    expect(result.length).toEqual(4);
  });

  test("should duplicate 4 face with 5 face list", () => {
    const result = duplicateFace(mockFaceList);

    expect(result.length).toEqual(4);
  });
});
