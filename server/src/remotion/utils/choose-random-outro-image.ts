import { random } from "remotion";
import { ChapterWithDuration } from "../types/frame.type";

export function chooseRandomOutroImage(
  chaptersWithDuration: ChapterWithDuration[],
): string[] {
  const allImagePaths: string[] = [];

  chaptersWithDuration.forEach((chapter) => {
    chapter.frame.forEach((frame) => {
      frame.images.forEach((image) => {
        allImagePaths.push(image.path);
      });
    });
  });

  const shuffledPaths = allImagePaths.sort(
    () => 0.5 - random(JSON.stringify(chaptersWithDuration)),
  );

  return shuffledPaths.slice(0, 5);
}
