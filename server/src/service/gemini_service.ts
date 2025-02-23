import model from "../configs/gemini";
import {
  generateChaptersTitlePrompt,
  generateSlidesCaptionPrompt,
  generateSlidesHashtagPrompt,
} from "../helpers/constants/gemini_prompt";
import { logger } from "../helpers/logging/logger";
import { wait } from "../helpers/timer/wait";
import { ChapterWithDuration } from "../remotion/types/frame.type";
import {
  SlideCaptionsRequest,
  ChaperTitleHashTagResponse,
} from "../types/gemini.type";

class GeminiService {
  static BATCH_SIZE = 10;
  static BATCH_DELAY = 1000;

  public static async generateCaptionForVideo(
    videoChapter: ChapterWithDuration[]
  ): Promise<ChapterWithDuration[]> {
    const place_arr = videoChapter.map((chapter) => chapter.title);

    const slide_req = videoChapter.flatMap((chapter) =>
      chapter.frame.map((frame) => {
        const place =
          frame.category === "event"
            ? chapter.title
            : Array.from(
                new Set(
                  frame.images.map((img) => Object.keys(img.labels.location)[0])
                )
              );
        const activities = Array.from(
          new Set(
            frame.images.map((img) => Object.keys(img.labels.activity)[0])
          )
        );
        const events = Array.from(
          new Set(frame.images.map((img) => Object.keys(img.labels.event)[0]))
        );
        return { place, activities: activities[0], events };
      })
    );

    const batchedChapters = [];

    const totalTitles: ChaperTitleHashTagResponse = [];
    const totalCaptions: string[] = [];
    const totalHashtags: string[][] = [];
    for (let i = 0; i < videoChapter.length; i += GeminiService.BATCH_SIZE) {
      const batchPlaceArr = place_arr.slice(i, i + GeminiService.BATCH_SIZE);
      const batchSlideReq = slide_req.slice(
        i * videoChapter.length,
        (i + GeminiService.BATCH_SIZE) * videoChapter.length
      );

      const batchTitlePromise =
        GeminiService.generateChaptersTitle(batchPlaceArr);
      const batchCaptionPromise =
        GeminiService.generateSlidesCaption(batchSlideReq);
      const batchHashtagPromise =
        GeminiService.generateSlidesHashtag(batchSlideReq);

      const [batchTitles, batchCaptions, batchHashtags] = await Promise.all([
        batchTitlePromise,
        batchCaptionPromise,
        batchHashtagPromise,
      ]);

      totalTitles.push(...batchTitles);
      totalCaptions.push(...batchCaptions);
      totalHashtags.push(...batchHashtags);

      console.log("batchSlideReq :>> ", batchSlideReq);
      console.log("batchTitles :>> ", batchTitles);
      console.log("batchCaptions :>> ", batchCaptions);
      console.log("batchHashTags :>> ", batchHashtags);

      if (i + GeminiService.BATCH_SIZE < videoChapter.length) {
        await wait(GeminiService.BATCH_DELAY);
      }
    }

    // map the titles, captions, and hashtags to the chapters
    let frameIndex = 0;
    for (let i = 0; i < videoChapter.length; i++) {
      const chapterTitle = totalTitles[i]?.title;
      const chapterHashtags = totalTitles[i]?.hashtags;

      const updatedFrames = videoChapter[i].frame.map((frame) => {
        const caption = totalCaptions[frameIndex];
        const slideHashtags = totalHashtags[frameIndex] || [];

        frameIndex++;

        return {
          ...frame,
          caption,
          hashtag: slideHashtags,
        };
      });

      batchedChapters.push({
        ...videoChapter[i],
        title: chapterTitle || videoChapter[i].title,
        hashtag: chapterHashtags || [],
        frame: updatedFrames,
      });
    }

    return batchedChapters;
  }

  private static async generateChaptersTitle(place_arr: string[]) {
    try {
      const prompt = generateChaptersTitlePrompt(place_arr);

      const result = await model.generateContent(prompt);

      const titleJSON = JSON.parse(
        result.response.text().split("```json")[1].split("```")[0].trim()
      ) as ChaperTitleHashTagResponse;

      return titleJSON;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  private static async generateSlidesCaption(slide_req: SlideCaptionsRequest) {
    try {
      const prompt = generateSlidesCaptionPrompt(slide_req);

      const result = await model.generateContent(prompt);

      const captionJSON = JSON.parse(
        result.response.text().split("```json")[1].split("```")[0].trim()
      ) as string[];

      return captionJSON;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  private static async generateSlidesHashtag(slide_req: SlideCaptionsRequest) {
    try {
      const prompt = generateSlidesHashtagPrompt(slide_req);

      const result = await model.generateContent(prompt);

      const hashtagJSON = JSON.parse(
        result.response.text().split("```json")[1].split("```")[0].trim()
      ) as string[][];

      return hashtagJSON;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}

export default GeminiService;
