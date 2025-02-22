import { random } from "remotion";
import { Chapter, Frame, ImageJSON, ImageMetadata } from "../types/frame.type";
import {
  MAX_EVENT_FRAME,
  MAX_IMAGE_PER_FRAME,
  MIN_CONFIDENCE,
  transitionEffects,
} from "../constants/frame";
import { getGroupByLabel } from "./label-helpers";
// import { imageJSON } from "../assets/images";

/* Video -> Chapter -> Frame -> Image
  A. First 2 chapter -> "Event chapter" with event frames
  B. Other chapter -> "Location chapter" with activity frames
*/

/* - Every chapter only contain 1 transition -> maintain consistency
   - Filter image first -> confidence > 0.2
      A. Group by events -> 2 first chapter
        1. group by top-1 event label
        2. all event label group <= 2 image -> re-group using broader labels
        3. choose max 6 images from each group -> in 2 most images group event  
        4. push 2 events group to 2 frame -> 2 beginning chapter
      B. Group by activity -> other chapter
        1. group by label first
        2. choose max 6 images from each group -> max 6 images per frame
        3. each group -> 1 frame 
        4. push all frame to chapter (or location chapter)
*/

// NOTE: slice to auto have self-built type -> remove remotion-type
export const chooseRandomTransition = () => {
  const transitionEffectsNew = transitionEffects;
  // .slice(2);
  // .slice(0, 2);

  return transitionEffectsNew[
    Math.floor(random(null) * transitionEffectsNew.length)
  ];
};

export const removeLowActivityConfidence = (images: ImageJSON) => {
  const filterImages: ImageJSON = {};
  // eslint-disable-next-line guard-for-in
  for (const key in images) {
    filterImages[key] = images[key].filter(
      (image) => Object.values(image.labels.activity)[0] > MIN_CONFIDENCE
    );
  }
  return filterImages;
};

export const removeLowEventConfidence = (images: ImageJSON) => {
  const filterImages: ImageJSON = {};
  // eslint-disable-next-line guard-for-in
  for (const key in images) {
    filterImages[key] = images[key].filter(
      (image) => Object.values(image.labels.event)[0] > MIN_CONFIDENCE
    );
  }
  return filterImages;
};

export const generateVideoContent = (images: ImageJSON): Chapter[] => {
  const chapters: Chapter[] = [];

  // only take image > 0.2 confidence
  const filterActivityImages = removeLowActivityConfidence(images);

  const filterEventImages = removeLowEventConfidence(filterActivityImages);

  // 1. group by event
  const eventGroups: { [key: string]: ImageMetadata[] } = {};
  Object.values(filterEventImages).forEach((imageGroup) => {
    imageGroup.forEach((image) => {
      const firstEventLabel = Object.entries(image.labels.event)[0]?.[0];
      if (firstEventLabel) {
        if (!eventGroups[firstEventLabel]) {
          eventGroups[firstEventLabel] = [];
        }
        eventGroups[firstEventLabel].push(image);
      }
    });
  });

  const processedEventGroups: { [key: string]: ImageMetadata[] } = {};
  Object.keys(eventGroups).forEach((eventLabel) => {
    const group = eventGroups[eventLabel];
    if (group.length <= 2) {
      const broaderGroup = getGroupByLabel(eventLabel);
      if (!processedEventGroups[broaderGroup]) {
        processedEventGroups[broaderGroup] = [];
      }
      processedEventGroups[broaderGroup].push(...group);
    } else {
      processedEventGroups[eventLabel] = group;
    }
  });

  const sortedEventGroups = Object.entries(processedEventGroups)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, MAX_EVENT_FRAME);

  for (const [eventLabel, group] of sortedEventGroups) {
    const selectedImages = group
      .sort(() => random(null) - 0.5)
      .slice(0, MAX_IMAGE_PER_FRAME);

    const frame: Frame = {
      type: selectedImages.length > 1 ? "multi" : "single",
      category: "event",
      images: selectedImages,
      activity: eventLabel,
    };

    chapters.push({
      title: eventLabel,
      frame: [frame],
      transition: chooseRandomTransition(),
    });
  }

  // 2. group by activity
  Object.keys(filterActivityImages).forEach((key) => {
    // ignore group with 0 confident image
    if (filterActivityImages[key].length === 0) return;

    const frames: Frame[] = [];

    // TODO: maybe remove acitivity group <= 2 image (if result bad)
    const activityGroups: { [key: string]: ImageMetadata[] } = {};
    filterActivityImages[key].forEach((image) => {
      const firstActivityLabel = Object.entries(image.labels.activity)[0]?.[0];
      if (firstActivityLabel) {
        if (!activityGroups[firstActivityLabel]) {
          activityGroups[firstActivityLabel] = [];
        }
        activityGroups[firstActivityLabel].push(image);
      }
    });

    Object.keys(activityGroups).forEach((activityLabel) => {
      const group = activityGroups[activityLabel];

      const frame: Frame = {
        type: group.length > 1 ? "multi" : "single",
        category: "activity",
        images: group,
        activity: activityLabel,
      };

      if (group.length >= MAX_IMAGE_PER_FRAME) {
        const selectedImages = group
          .sort(() => random(null) - 0.5)
          .slice(0, MAX_IMAGE_PER_FRAME);

        frame.images = selectedImages;
      }
      frames.push(frame);
    });

    chapters.push({
      title: key,
      frame: frames,
      transition: chooseRandomTransition(),
    });
  });

  return chapters;
};

// // Function to test the generateVideoContent function

// const chapters = generateVideoContent(imageJSON);

// let frameNumber = 0;
// let imageNumber = 0;

// for (const chapter of chapters) {
//   console.log("---------------------------------------");
//   console.log(chapter.title);
//   for (const frame of chapter.frame) {
//     console.log(frame.category);
//     frameNumber++;
//     console.log(
//       frame.images.map(
//         (image) => Object.keys(image.labels.activity)[0] + " " + image.path,
//       ),
//     );

//     imageNumber += frame.images.length;
//   }
// }

// // calculate total
// console.log("---------------------------------------");

// console.log("Total image:", imageNumber, "");

// console.log("Total chapter:", chapters.length, "");

// console.log("Total frame:", frameNumber, "");

// /*
// Total image: 64
// Total chapter: 10
// Total frame: 23
// */
