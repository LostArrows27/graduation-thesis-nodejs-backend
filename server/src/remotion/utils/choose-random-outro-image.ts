import { random } from "remotion";
import { ChapterWithDuration } from "../types/frame.type";

// TODO: choose group image with max members instead
export async function chooseRandomOutroImage(
  chaptersWithDuration: ChapterWithDuration[]
): Promise<string[]> {
  const allImagePaths: string[] = [];
  chaptersWithDuration.forEach((chapter) => {
    chapter.frame.forEach((frame) => {
      frame.images.forEach((image) => {
        allImagePaths.push(image.path);
      });
    });
  });
  const shuffledPaths = allImagePaths.sort(() => 0.5 - random(null));
  return shuffledPaths.slice(0, 5);

  // // 1. query all images (person with cluster id)

  // const {data, error} = await supabase.from('image').select(', person()')
}
