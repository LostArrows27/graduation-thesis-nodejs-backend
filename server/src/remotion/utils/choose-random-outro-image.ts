import { random } from "remotion";
import { ChapterWithDuration } from "../types/frame.type";

// TODO: choose group image with max members instead
export function chooseRandomOutroImage(
  chaptersWithDuration: ChapterWithDuration[]
): string[] {
  const allImagePaths: string[] = [];
  chaptersWithDuration.forEach((chapter) => {
    chapter.frame.forEach((frame) => {
      frame.images.forEach((image) => {
        allImagePaths.push(image.path);
      });
    });
  });

  const shuffledPaths = allImagePaths.sort(() => 0.5 - random(null));

  if (shuffledPaths.length < 5) {
    if (shuffledPaths.length === 0) {
      throw Error("No chapter available");
    }

    if (shuffledPaths.length === 1) {
      return [
        shuffledPaths[0],
        shuffledPaths[0],
        shuffledPaths[0],
        shuffledPaths[0],
        shuffledPaths[0],
      ];
    }

    if (shuffledPaths.length === 2) {
      shuffledPaths.push(shuffledPaths[0], shuffledPaths[1], shuffledPaths[0]);
    }

    if (shuffledPaths.length === 3) {
      shuffledPaths.push(shuffledPaths[0], shuffledPaths[1]);
    }

    if (shuffledPaths.length === 4) {
      shuffledPaths.push(shuffledPaths[0]);
    }
  }

  return shuffledPaths.slice(0, 5);
}
