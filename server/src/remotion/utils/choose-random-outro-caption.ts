import { random } from "remotion";

// TODO: combine all outro helper -> folder
const outroCaptions = [
  [
    "Hành trình khép lại, nhưng kỷ niệm còn mãi !",
    "Hẹn gặp lại bạn ở những chuyến đi tiếp theo !",
  ],
  [
    "Mỗi chuyến đi là một câu chuyện đẹp...",
    "Cảm ơn vì đã đồng hành cùng chúng tôi !",
  ],
  [
    "Niềm vui hôm nay sẽ là kỷ niệm mãi mãi !",
    "Hẹn gặp nhau ở những sự kiện tới !",
  ],
];

export const chooseRandomOutroCaption = () => {
  return outroCaptions[Math.floor(random(null) * outroCaptions.length)];
};
