import { random } from "remotion";

const colorList = [
  "rgb(30,41,59)",
  "rgb(239,68,68)",
  "rgb(249,115,22)",
  "rgb(234,179,8)",
  "rgb(132,204,22)",
  "rgb(34,197,94)",
  "rgb(6,182,212)",
  "rgb(124,58,237)",
];
export function randomColor(index: number) {
  return colorList[
    Math.floor(random(`chapter-color-${index}`) * colorList.length)
  ];
}
