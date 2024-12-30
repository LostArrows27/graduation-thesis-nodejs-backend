import { chooseRandomStuff } from "../utils/choose-random-stuff";

type CaptionAsset = {
  firstCaption: string;
  secondCaption: string;
};

const captionAssets: CaptionAsset[] = [
  {
    firstCaption: "Những ký ức tuyệt vời\nđang chờ đón bạn !",
    secondCaption: "Hãy cùng khám phá ngay bây giờ !",
  },
  {
    firstCaption: "Chúng ta đã tạo nên\nnhững điều thật đáng nhớ !",
    secondCaption: "Let's rewind !",
  },
  {
    firstCaption: "Mỗi giây phút\nđều chứa đựng ý nghĩa riêng ...",
    secondCaption: "Bắt đầu thôi nào !",
  },
  {
    firstCaption: "Có thể bạn đã quên\nnhưng chúng tôi thì không !",
    secondCaption: "Cùng bật mí những khoảnh khắc bất ngờ !",
  },
  {
    firstCaption: "Hành trình đã đi qua của bạn",
    secondCaption: "nhưng được kể bằng phong cách mới !",
  },
  {
    firstCaption: "Mỗi hình ảnh là một câu chuyện nhỏ ...",
    secondCaption: "Cùng ôn lại từng kỉ niệm nhé !",
  },
  {
    firstCaption: "Những phút giây\nđáng giá nhất đang chờ bạn !",
    secondCaption: "Cùng bắt đầu chuyến phiêu lưu này !",
  },
  {
    firstCaption: "Hạnh phúc là khi\nchúng ta sẻ chia cùng nhau",
    secondCaption: "Bắt đầu thôi nào !",
  },
  {
    firstCaption: "Bạn đã tạo nên\nnhững khoảnh khắc thật tuyệt vời",
    secondCaption: "It's time to rewind !",
  },
  {
    firstCaption: "Memories that speak\nthe language of joy",
    secondCaption: "Let's celebrate them once again !",
  },
  {
    firstCaption: "Every moment is a piece\nof the bigger story",
    secondCaption: "Let's relive it all together !",
  },
  {
    firstCaption: "You've written the chapters\nof a beautiful journey",
    secondCaption: "Let's rediscover them now !",
  },
  {
    firstCaption: "These are the moments that define us",
    secondCaption: "Let's relive the journey of joy !",
  },
  {
    firstCaption: "Một hành trình đã qua ...",
    secondCaption: "nhưng kỷ niệm thì vẫn còn mãi !",
  },
];

export const chooseRandomCaption = () => {
  return chooseRandomStuff<CaptionAsset>(captionAssets);
};
