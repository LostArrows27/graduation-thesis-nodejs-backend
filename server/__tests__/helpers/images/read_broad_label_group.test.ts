import { readBroadLabelGroup } from "../../../src/helpers/images/read_broad_label_group";

describe("readBroadLabelGroup", () => {
  test("should correctly read broad label group", () => {
    const input = Object.keys(readBroadLabelGroup());

    const expectedOutput = [
      "transportation_and_travel",
      "accommodation_and_living_spaces",
      "natural_and_rural_areas",
      "lifestyle_and_entertainment",
      "food_and_dining",
      "work_and_education_spaces",
      "sports_and_fitness_spaces",
      "historical_and_cultural_sites",
      "public_and_event_spaces",
    ];

    expect(input).toEqual(expectedOutput);
  });
});
