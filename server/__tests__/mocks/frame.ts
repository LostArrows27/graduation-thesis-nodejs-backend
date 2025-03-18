import { Frame } from "../../src/remotion/types/frame.type";

export const mockFrameList: Frame[] = [
  {
    type: "single",
    category: "activity",
    images: [
      {
        path: "test1",
        labels: {
          location: {},
          activity: {},
          event: {},
        },
      },
    ],
  },
  {
    type: "single",
    category: "activity",
    images: [
      {
        path: "test2",
        labels: {
          location: {
            beach: 0.9,
            coast: 0.1,
          },
          activity: {},
          event: {},
        },
      },
    ],
  },
  {
    type: "single",
    category: "activity",
    images: [
      {
        path: "test3",
        labels: {
          location: {
            beach: 0.95,
            coast: 0.1,
          },
          activity: {},
          event: {},
        },
      },
    ],
  },
];
