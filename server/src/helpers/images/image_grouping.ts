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

export const groupImageByLabel = (
  images: DatabaseImageMetadata[]
): ImageJSON => {
  // Step 1: group image by top 1 location_labels
  const imageGroup = images.reduce((acc: ImageJSON, image) => {
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

  const broadLabelGroup = readBroadLabelGroup();

  // Step 2: group all image group <= 3 images based on broader label group that they belong to
  const groupLabelGroup = Object.keys(imageGroup).reduce(
    (prev: ImageJSON, groupName) => {
      const images = imageGroup[groupName];

      if (images.length > CLUSTER_MIN_LENGTH) {
        prev[groupName] = images;
        return prev;
      }

      const category = Object.keys(broadLabelGroup).find((key) =>
        broadLabelGroup[key].includes(groupName)
      );

      if (category) {
        prev[category] = prev[category]
          ? [...prev[category], ...images]
          : images;
      }

      return prev;
    },
    {}
  );

  // Step 3: Find top 1 labels group that a broad group can be merged into (with the least images)
  const finalGroups = { ...groupLabelGroup };
  Object.keys(finalGroups).forEach((broadLabel) => {
    if (finalGroups[broadLabel].length < CLUSTER_MIN_LENGTH) {
      const potentialTop1Groups = Object.keys(finalGroups)
        .filter(
          (key) =>
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

  // Step 4: Group small images into "Small Group"
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
