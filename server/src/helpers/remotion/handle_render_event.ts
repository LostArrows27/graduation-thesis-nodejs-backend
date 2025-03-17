import { logger } from "../logging/logger";
import { InputPropsType, RenderVideoOptions } from "../../types/render.type";
import supabase from "../../configs/supabase";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { processVideoInputProps } from "./generate_video_schema";

export const onBundleProgress = (progress: number) => {
  if (Number.isInteger(progress * 100) && (progress * 100) % 10 === 0) {
    logger.info(`Webpack bundling progress: ${progress}%`);
  }
};

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const onRenderProgress = async (
  renderedFrames: number,
  totalFrame: number,
  lastUpdatedValue: { value: number },
  renderQueueId: string
) => {
  const currentProgress = Math.floor((renderedFrames / totalFrame) * 100);
  if (
    currentProgress !== lastUpdatedValue.value &&
    currentProgress % 10 === 0
  ) {
    logger.info(`Rendering progress: ${currentProgress}%`);
    lastUpdatedValue.value = currentProgress;

    const { error } = await supabase
      .from("video_render")
      .update({
        progress: currentProgress,
        updated_at: new Date().toISOString(),
      })
      .eq("id", renderQueueId);

    if (error) {
      logger.error("Error updating render progress", error);
    }
  }
};

export const generateRenderOption = async (
  videoSchema: InputPropsType,
  renderQueueId: string,
  scale = 1
): Promise<RenderVideoOptions> => {
  const inputProps = await processVideoInputProps(videoSchema);

  return {
    imageFormat: "jpeg",
    overwrite: true,
    codec: "h264",
    audioCodec: "mp3",
    outputLocation: path.join(__dirname, `../../../out/${renderQueueId}.mp4`), // NOTE: preview for local testing
    scale: scale ? scale : 1, // scale 1.5 -> FHD (1080p) / scale 1 HD (720p - default)
    concurrency: 10,
    chromiumOptions: {
      gl: "angle",
      headless: true,
    },
    inputProps,
  };
};
