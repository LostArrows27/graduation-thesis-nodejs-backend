import supabase from "../../../src/configs/supabase";
import {
  consolidateSmallGroupsIntoBroadCategories,
  groupImageByLabel,
  groupImagesByLocationLabel,
  handleSingletonGroups,
  labelMapping,
  mergeSmallBroadGroups,
} from "../../../src/helpers/images/image_grouping";
import { readBroadLabelGroup } from "../../../src/helpers/images/read_broad_label_group";
import { ImageJSON, Labels } from "../../../src/remotion/types/frame.type";
import {
  Label,
  ImageMetaData as DatabaseImageMetadata,
} from "../../../src/types/database.type";
import { mockImageMetaData } from "../../mocks/image";

describe("labelMapping", () => {
  test("should correctly flat label array", () => {
    const input: Label[] = [
      { beach: 0.8, coast: 0.1 },
      { mountain: 0.4, camping: 0.2 },
    ];

    const expectedOutput: Labels = {
      beach: 0.8,
      coast: 0.1,
      mountain: 0.4,
      camping: 0.2,
    };

    expect(labelMapping(input)).toEqual(expectedOutput);
  });

  test("should handle empty array", () => {
    const input: Label[] = [];
    const expectedOutput: Labels = {};
    expect(labelMapping(input)).toEqual(expectedOutput);
  });

  test("should handle labels with single property", () => {
    const input = [
      { beach: 0.8 } as Label,
      {
        coast: 0.1,
      } as Label,
    ];

    const expectedOutput: Labels = {
      beach: 0.8,
      coast: 0.1,
    };

    expect(labelMapping(input)).toEqual(expectedOutput);
  });
});

describe("groupImagesByLocationLabel", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // TODO: add image without image_bucket_id = ''

  test("should handle empty image array", () => {
    const input: DatabaseImageMetadata[] = [];
    const expectedOutput = {};

    expect(groupImagesByLocationLabel(input)).toEqual(expectedOutput);
  });

  test("should group images by location label", () => {
    const input: DatabaseImageMetadata[] = mockImageMetaData.slice(0, 2);

    const expectedOutput: ImageJSON = {
      beach: [
        {
          path: supabase.storage
            .from(mockImageMetaData[0].image_bucket_id)
            .getPublicUrl(mockImageMetaData[0].image_name).data.publicUrl,
          labels: {
            location: { beach: 0.8, coast: 0.1 },
            activity: labelMapping(mockImageMetaData[0].labels!.action_labels),
            event: labelMapping(mockImageMetaData[0].labels!.event_labels),
          },
        },
        {
          path: supabase.storage
            .from(mockImageMetaData[1].image_bucket_id)
            .getPublicUrl(mockImageMetaData[1].image_name).data.publicUrl,
          labels: {
            location: { beach: 0.9, forest: 0.1 },
            activity: labelMapping(mockImageMetaData[1].labels!.action_labels),
            event: labelMapping(mockImageMetaData[1].labels!.event_labels),
          },
        },
      ],
    };

    expect(groupImagesByLocationLabel(input)).toEqual(expectedOutput);
  });
});

describe("consolidateSmallGroupsIntoBroadCategories", () => {
  test("should merge small groups into broader categories", () => {
    const input = mockImageMetaData;

    const broadLabelGroup = readBroadLabelGroup();

    const result = consolidateSmallGroupsIntoBroadCategories(
      groupImagesByLocationLabel(input),
      broadLabelGroup
    );

    expect(result.beach.length).toEqual(4);

    expect(result.public_and_event_spaces.length).toEqual(3);

    expect(result.highschool.length).toEqual(1);
  });
});

describe("mergeSmallBroadGroups", () => {
  test("should merge small broad group into small label group belong to it", () => {
    const input = mockImageMetaData;

    const broadLabelGroup = readBroadLabelGroup();

    const group = consolidateSmallGroupsIntoBroadCategories(
      groupImagesByLocationLabel(input),
      broadLabelGroup
    );

    // before group
    expect(group.natural_and_rural_areas.length).toEqual(1);

    const result = mergeSmallBroadGroups(group, broadLabelGroup);

    expect(result.beach.length).toEqual(5);

    // after group
    expect(result.natural_and_rural_areas).toEqual(undefined);
  });
});

describe("handleSingletonGroups", () => {
  test("should merge small group into one", () => {
    const input = mockImageMetaData;

    const broadLabelGroup = readBroadLabelGroup();

    const group = consolidateSmallGroupsIntoBroadCategories(
      groupImagesByLocationLabel(input),
      broadLabelGroup
    );

    const finalGroup = mergeSmallBroadGroups(group, broadLabelGroup);

    expect(finalGroup.highschool.length).toEqual(1);
    expect(finalGroup.kindergarten.length).toEqual(1);

    const result = handleSingletonGroups(finalGroup);

    expect(result.small_group.length).toEqual(2);
  });
});

describe("groupImageByLabel", () => {
  test("should group image by label and merge small group", () => {
    const result = groupImageByLabel(mockImageMetaData);

    expect(result.beach.length).toEqual(5);
    expect(result.public_and_event_spaces.length).toEqual(3);
    expect(result.small_group.length).toEqual(2);
  });
});
