import { random } from "remotion";

const eventNote = [
  "P/S: Cùng điểm lại 2 sự kiện nổi bật nhất 🧐",
  "P/S: Top 2 sự kiện không thể bỏ qua 😊",
  "P/S: Nhìn lại top 2 sự kiện nổi bật nhất 🥳",
  "P/S: Cùng nhau ôn lại 2 sự kiện then chốt 🙃",
];

const locationNote = [
  "Top những địa điểm không thể bỏ qua trong chuyến đi 🤯",
  "Những trải nghiệm khó quên tại các địa điểm có 102 😎 !",
  "Hành trình dài nhưng đừng quên được những địa điểm này nhé ! 😵‍💫",
  "Những điểm dừng chân đáng giá trong hành trình của bạn 🚗",
  "BREAKING NEWS: Những địa điểm không thể bỏ qua trong chuyến đi 😍",
  "Những địa điểm xịn xò không thể thiếu trong recap lần này ! 🤓",
  "Ngại đi nhưng không ngại chia sẻ những địa điểm đẹp nhất ! 💤",
  "Cùng điểm lại những địa điểm đáng nhớ trong chuyến đi 🫡",
  "Bạn có nhớ mình đã đi qua những địa điểm này ? 🤔",
  "Cùng nhau nhìn lại những địa điểm đặc biệt trong chuyến đi ✈️",
  "Sao mà bỏ qua được địa điểm này trong chuyến đi 😝",
];

export const chooseEventTitleNote = (randomString: string): string => {
  return eventNote[Math.floor(random(randomString) * eventNote.length)];
};

export const chooseLocationTitleNote = (randomString: string): string => {
  return locationNote[Math.floor(random(randomString) * locationNote.length)];
};
