import { eventCategories } from "../constants/label";

export function getGroupByLabel(label: string): string {
  for (const group in eventCategories) {
    if (
      eventCategories[group as keyof typeof eventCategories].includes(label)
    ) {
      return group;
    }
  }

  throw Error(`Label ${label} not found in event categories`);
}
