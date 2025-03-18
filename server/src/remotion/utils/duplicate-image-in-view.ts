// NOTE: helper function -> duplicate image in view
// input: images: string[]
// output: string[][] -> 42 images for 7 row
// Case 1: if >= 42 image -> just fill the columns directly
// Case 2: if < 42 images -> shuffle and duplicate images

import { random } from "remotion";

export const duplicateImageInView = (
  images: string[],
  firstCaption: string,
  secondCaption: string,
  totalLength = 42,
): string[][] => {
  const numColumns = 7;
  const numRows = 6;
  const totalImages = numColumns * numRows;

  const result: string[][] = [];

  if (images.length >= totalImages) {
    let index = 0;
    for (let i = 0; i < numColumns; i++) {
      const column = [];
      for (let j = 0; j < numRows; j++) {
        column.push(images[index % images.length]);
        index++;
      }
      result.push(column);
    }
  } else {
    let extendedImages = [...images];
    while (extendedImages.length < totalImages) {
      extendedImages = extendedImages.concat(images);
    }

    for (let i = extendedImages.length - 1; i > 0; i--) {
      const j = Math.floor(
        random(
          `duplicate-image-in-view-firstCaption-${firstCaption}-secondCaption-${secondCaption}-totalLength-${totalLength}`,
        ) *
          (i + 1),
      );
      [extendedImages[i], extendedImages[j]] = [
        extendedImages[j],
        extendedImages[i],
      ];
    }

    let index = 0;
    for (let i = 0; i < numColumns; i++) {
      const column = [];
      for (let j = 0; j < numRows; j++) {
        column.push(extendedImages[index % extendedImages.length]);
        index++;
      }
      result.push(column);
    }
  }

  return result;
};
