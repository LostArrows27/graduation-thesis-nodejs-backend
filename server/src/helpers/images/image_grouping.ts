import supabase from "../../configs/supabase";
import {
  ImageJSON,
  ImageMetadata,
  Labels,
} from "../../remotion/types/frame.type";
import {
  ImageMetaData as DatabaseImageMetadata,
  Label,
} from "../../types/database.type";
import { CLUSTER_MIN_LENGTH } from "../constants/constants";
import { readBroadLabelGroup } from "./read_broad_label_group";

// flat the label array
export const labelMapping = (label: Label[]): Labels => {
  return label.reduce((prev: Labels, acc: Label) => {
    const label1 = Object.keys(acc)[0];

    const label2 = Object.keys(acc)[1];

    return {
      ...prev,
      [label1]: acc[label1],
      [label2]: acc[label2],
    };
  }, {});
};

/**
 * step 1: group image by location_labels
 */
export const groupImagesByLocationLabel = (
  images: DatabaseImageMetadata[]
): ImageJSON => {
  return images.reduce((acc: ImageJSON, image) => {
    const locationLabel = labelMapping(image.labels!.location_labels);
    const locationLabelKey = Object.keys(locationLabel)[0];

    if (!acc[locationLabelKey]) {
      acc[locationLabelKey] = [];
    }

    if (!image.image_bucket_id || !image.image_name) {
      return acc;
    }

    acc[locationLabelKey].push({
      path: supabase.storage
        .from(image.image_bucket_id)
        .getPublicUrl(image.image_name).data.publicUrl,
      labels: {
        location: locationLabel,
        activity: labelMapping(image.labels!.action_labels),
        event: labelMapping(image.labels!.event_labels),
      },
    });

    return acc;
  }, {});
};

/**
 * Step 2: merge small groups into broader categories
 */
export const consolidateSmallGroupsIntoBroadCategories = (
  imageGroups: ImageJSON,
  broadLabelGroup: Record<string, string[]>
): ImageJSON => {
  return Object.keys(imageGroups).reduce((prev: ImageJSON, groupName) => {
    const images = imageGroups[groupName];

    if (images.length > CLUSTER_MIN_LENGTH) {
      prev[groupName] = images;
      return prev;
    }

    const category = Object.keys(broadLabelGroup).find((key) =>
      broadLabelGroup[key].includes(groupName)
    );

    if (category) {
      prev[category] = prev[category] ? [...prev[category], ...images] : images;
    } else {
      // keep group if no matched
      prev[groupName] = images;
    }

    return prev;
  }, {});
};

/**
 * Step 3: merge smaller broad groups
 */
export const mergeSmallBroadGroups = (
  groupLabelGroup: ImageJSON,
  broadLabelGroup: Record<string, string[]>
): ImageJSON => {
  const finalGroups = { ...groupLabelGroup };

  Object.keys(finalGroups).forEach((broadLabel) => {
    if (finalGroups[broadLabel].length < CLUSTER_MIN_LENGTH) {
      const potentialTop1Groups = Object.keys(finalGroups)
        .filter(
          (key) =>
            // broadLabelGroup[broadLabel]? -> check if current label is 1 of the broad label
            broadLabelGroup[broadLabel]?.includes(key) &&
            finalGroups[key].length >= CLUSTER_MIN_LENGTH
        )
        .map((key) => ({ key, count: finalGroups[key].length }));

      if (potentialTop1Groups.length > 0) {
        const bestMatch = potentialTop1Groups.reduce((prev, current) =>
          current.count < prev.count ? current : prev
        ).key;

        finalGroups[bestMatch] = [
          ...finalGroups[bestMatch],
          ...finalGroups[broadLabel],
        ];
        delete finalGroups[broadLabel];
      }
    }
  });

  return finalGroups;
};

/**
 * Step 4: merge all group have only 1 image
 */
export const handleSingletonGroups = (groups: ImageJSON): ImageJSON => {
  const finalGroups = { ...groups };
  const smallGroup: ImageMetadata[] = [];

  Object.keys(finalGroups).forEach((label) => {
    if (finalGroups[label].length === 1) {
      smallGroup.push(...finalGroups[label]);
      delete finalGroups[label];
    }
  });

  if (smallGroup.length > 0) {
    finalGroups.small_group = smallGroup;
  }

  return finalGroups;
};

/*
  input: array of images
  output: group images by location_labels
*/
export const groupImageByLabel = (
  images: DatabaseImageMetadata[]
): ImageJSON => {
  //  * step 1: group image by location_labels
  const imageGroup = groupImagesByLocationLabel(images);

  const broadLabelGroup = readBroadLabelGroup();

  // * Step 2: merge small groups into broader categories
  const groupLabelGroup = consolidateSmallGroupsIntoBroadCategories(
    imageGroup,
    broadLabelGroup
  );

  // * Step 3: merge smaller broad groups
  const mergedGroups = mergeSmallBroadGroups(groupLabelGroup, broadLabelGroup);

  // * Step 4: merge all group have only 1 image
  const finalGroups = handleSingletonGroups(mergedGroups);

  return finalGroups;
};
