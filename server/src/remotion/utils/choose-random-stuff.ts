import { random } from "remotion";

export function chooseRandomStuff<T>(arr: T[]): T {
  return arr[Math.floor(random(null) * arr.length)];
}
