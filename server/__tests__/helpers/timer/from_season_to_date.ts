import { fromSeasonToDate } from "../../../src/helpers/timer/from_season_to_date";

describe("fromSeasonToDate", () => {
  test("should return first day of spring", () => {
    const season = fromSeasonToDate("spring");

    expect(season.getDate()).toBe(20);
    expect(season.getMonth()).toBe(2);
  });
});
