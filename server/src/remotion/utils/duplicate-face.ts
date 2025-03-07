/* eslint-disable no-else-return */
/* eslint-disable prefer-destructuring */
import { FaceProps } from "../types/video.type";

export const duplicateFace = (faces: FaceProps[]): FaceProps[] => {
  // if have 1 face A -> AAAA
  // if have 2 faces A B -> AABB
  // if have 3 faces A B C -> AABC
  // if have 4 faces A B C D -> ABCD

  const length = faces.length;

  if (length === 0) {
    return [];
  } else if (length === 1) {
    return [faces[0], faces[0], faces[0], faces[0]];
  } else if (length === 2) {
    return [faces[0], faces[0], faces[1], faces[1]];
  } else if (length === 3) {
    return [faces[0], faces[0], faces[1], faces[2]];
  } else {
    return faces.slice(0, 4);
  }
};
