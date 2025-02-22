import { SlideCaptionsRequest } from "../../types/gemini.type";

// chapter[] -> {name, title, hashtag}[]
export const generateChaptersTitlePrompt = (place_arr: string[]) => {
  const prompt = `Bạn là một nhà biên kịch sáng tạo, hãy tạo ra những tiêu đề và hashtag cho các chapter trong video recap chuyến đi. Mỗi chapter sẽ có 1 tiêu đề và 2 hashtag. 
  - Tiêu đề: Tiêu đề cần ngắn gọn, tự nhiên, tối đa 6 từ và hấp dẫn.
  - Hashtag: Mỗi chapter sẽ có 2 hashtag, có thể bằng tiếng Việt hoặc tiếng Anh, nhưng mỗi chapter chỉ sử dụng một ngôn ngữ duy nhất (hoặc toàn bộ tiếng Việt hoặc toàn bộ tiếng Anh). Hashtag cần liên quan đến các yếu tố trong chapter như địa điểm và sự kiện.
  
  Cho input là mảng label địa điểm của những chapter đó, bạn hãy trả về một mảng các đối tượng JSON, mỗi đối tượng chứa tiêu đề chapter và 2 hashtag của chapter dưới dạng:
  [ 
  { {"name": "place", "title": "Tên chapter", "hashtags": ["hashtag1", "hashtag2"]} },
  { {"name": "place", "title": "Tên chapter", "hashtags": ["hashtag3", "hashtag4"]} }
  ].
  Không cần thêm bất kỳ thông tin nào khác.
  
  Input: ${JSON.stringify(place_arr)}.
  
  Lưu ý:
  0. Trường hợp đặc biệt: địa điểm là "small_group" thì tiêu đề là "Khoảnh khắc khác".
  1. Mỗi tiêu đề tối đa 6 từ.
  2. Mỗi chapter phải có 2 hashtag khác nhau, không vượt quá 12 ký tự mỗi hashtag.
  3. Hashtag nên có thể sử dụng cho mạng xã hội, và phải dễ hiểu, phổ biến (tiếng Việt hoặc tiếng Anh).
  4. Đan xen giữa tiếng Việt và tiếng Anh giữa các chapter khác nhau.
  5. Hashtag nên ở dạng chữ thường và dùng "_" để phân cách các từ (nếu cần) (kể cả với tiếng Việt hay tiếng Anh).
  6. Chọn ngẫu nhiên một phong cách dưới đây cho mỗi chapter, đảm bảo mỗi chapter có caption theo phong cách khác nhau:
   - Phong cách mô tả thông thường.
   - Phong cách kể chuyện (Storytelling).
   - Phong cách hài hước.
   - Phong cách chuyên nghiệp.
   - Phong cách cảm xúc, chân thật.
   - Phong cách khám phá (Adventure).
  7. Không được tạo tiêu đề mới giống với các tiêu đề đã tạo trước đó.`;

  return prompt;
};

// slide[] -> caption[
export const generateSlidesCaptionPrompt = (
  slide_req: SlideCaptionsRequest
) => {
  const prompt = `Bạn là một nhà biên kịch sáng tạo, hãy tạo ra những caption tiếng Việt thật tự nhiên, ngắn gọn, mỗi caption không vượt quá 10 từ và hấp dẫn cho các slide ảnh trong video recap chuyến đi. 
  Input của bạn là mảng thông tin về các slide ảnh, bao gồm:
  - Địa điểm của slide (place).
  - Hoạt động trong slide (activity).
  - Các sự kiện diễn ra trong slide (events).
  Dựa trên thông tin này, hãy tạo ra một mảng các caption cho từng slide (mỗi phần tử object trong input tạo 1 caption), mỗi caption có độ dài tối đa 10 từ, không có dấu câu hoặc thông tin thừa. Hãy trả về mảng caption dưới dạng JSON string, ví dụ: ["Caption slide 1", "Caption slide 2"]. Không cần thêm bất kỳ thông tin nào khác.
  Một số lưu ý:
  1. Mỗi caption phải khác nhau, ngay cả khi các slide có địa điểm và hoạt động giống nhau.
  2. Mỗi phần tử object trong input chỉ được tạo 1 caption. 
  3. Các caption có thể sử dụng cho mạng xã hội và phải dễ hiểu, tự nhiên và phổ biến đối với người Việt Nam.
  4. Chọn ngẫu nhiên một trong các phong cách sau để tạo caption cho từng slide, đảm bảo mỗi slide có caption theo phong cách khác nhau:
     - Phong cách mô tả thông thường.
     - Phong cách kể chuyện (Storytelling).
     - Phong cách hài hước.
     - Phong cách chuyên nghiệp.
     - Phong cách cảm xúc, chân thật.
     - Phong cách khám phá (Adventure).
  5. Không được tạo caption mới giống với các caption đã tạo trước đó.
  6. Văn phong caption phải thật tự nhiên với ngôn ngữ tiếng Việt.
  Input: ${JSON.stringify(slide_req)}.
  Lưu ý: Các caption cần phải ngắn gọn, tự nhiên và dễ hiểu với người Việt.`;

  return prompt;
};

// slide[] -> hashtag[]
export const generateSlidesHashtagPrompt = (
  slide_req: SlideCaptionsRequest
) => {
  const prompt = `Bạn là một chuyên gia sáng tạo, hãy tạo ra 2 hashtag cho mỗi slide ảnh trong video recap chuyến đi. Mỗi slide sẽ có 2 hashtag, và các hashtag này có thể bằng tiếng Việt hoặc tiếng Anh, nhưng mỗi slide chỉ sử dụng một ngôn ngữ duy nhất (hoặc toàn bộ tiếng Việt hoặc toàn bộ tiếng Anh).

Input của bạn là mảng thông tin về các slide ảnh, bao gồm:
- Địa điểm của slide (place).
- Hoạt động trong slide (activity).
- Các sự kiện diễn ra trong slide (events).

Dựa trên thông tin này, hãy tạo ra một mảng các hashtag cho từng slide. Mỗi slide sẽ có 2 hashtag, và mỗi hashtag cần phải liên quan đến các yếu tố trong slide như địa điểm, hoạt động, hoặc sự kiện. Hãy trả về mảng hashtag dưới dạng JSON string, ví dụ: [["hashtag1", "hashtag2"], ["hashtag3", "hashtag4"]]. Không cần thêm bất kỳ thông tin nào khác.

Một số lưu ý:
1. Mỗi slide phải có 2 hashtag khác nhau.
2. Mỗi phần tử object trong input chỉ được tạo 1 mảng hashtag.
3. Các hashtag cần phải dễ hiểu và có thể sử dụng cho mạng xã hội (tiếng Việt hoặc tiếng Anh).
4. Mỗi hashtag không vượt quá 12 ký tự.
5. Đan xen giữa tiếng Việt và tiếng Anh với các slide khác nhau.
6. Hashtag nên ở dạng chữ thường và dùng "_" để phân cách các từ (nếu cần).
7. Không được tạo hashtag mới giống với các hashtag đã tạo trước đó.

Input: ${JSON.stringify(slide_req)}.

Lưu ý: Các hashtag cần phải ngắn gọn, dễ hiểu và phổ biến với người Việt.`;

  return prompt;
};
