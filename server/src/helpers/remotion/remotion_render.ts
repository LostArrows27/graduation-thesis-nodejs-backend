import path from "path";
import { bundle } from "@remotion/bundler";
import {
  renderMedia,
  renderStill,
  selectComposition,
} from "@remotion/renderer";
import { enableTailwind } from "@remotion/tailwind";
import { logger } from "../logging/logger";
import { VIDEO_COMPOSITION_ID } from "../../remotion/constants/constants";
import { deleteImagesByUrl } from "../../remotion/utils/transform-image-size";
import {
  onBundleProgress,
  generateRenderOption,
  onRenderProgress,
} from "./handle_render_event";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { uploadSplittedVideoToSupabase } from "./handle_video_upload";
import { InputPropsType } from "../../types/render.type";
import sharp from "sharp";
import supabase from "../../configs/supabase";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

// TODO: could bundled and re-used for multiple render
export const renderVideo = async (
  videoSchema: InputPropsType,
  renderQueueId: string,
  userID: string,
  scale = 1
) => {
  const bundled = await bundle({
    entryPoint: path.join(__dirname, "../../remotion/index.ts"),
    webpackOverride: enableTailwind,
    onProgress: onBundleProgress,
  });

  const renderOption = await generateRenderOption(
    videoSchema,
    renderQueueId,
    scale
  );

  const composition = await selectComposition({
    serveUrl: bundled,
    id: VIDEO_COMPOSITION_ID,
    inputProps: renderOption.inputProps,
  });

  const lastUpdatedValue = { value: 0 };

  const result = await renderMedia({
    composition,
    serveUrl: bundled,
    ...renderOption,
    onProgress: async ({ renderedFrames }) => {
      await onRenderProgress(
        renderedFrames,
        composition.durationInFrames,
        lastUpdatedValue,
        renderQueueId
      );
    },
  });

  logger.warn(`10 slowest frames, ${JSON.stringify(result.slowestFrames)}`);

  const chunkURLs = await uploadSplittedVideoToSupabase(renderQueueId, userID);

  await deleteImagesByUrl(
    renderOption.inputProps.introScene.secondScene.images
  );

  return chunkURLs;
};

export const renderVideoThumbnail = async (
  videoSchema: InputPropsType,
  renderQueueId: string,
  userID: string,
  scale = 1
) => {
  try {
    const bundled = await bundle({
      entryPoint: path.join(__dirname, "../../remotion/index.ts"),
      webpackOverride: enableTailwind,
    });

    const renderOption = await generateRenderOption(
      videoSchema,
      renderQueueId,
      scale
    );

    const composition = await selectComposition({
      serveUrl: bundled,
      id: VIDEO_COMPOSITION_ID,
      inputProps: renderOption.inputProps,
    });

    const res = await renderStill({
      composition,
      serveUrl: bundled,
      inputProps: renderOption.inputProps,
      imageFormat: "jpeg",
      frame: 162,
      scale,
    });

    if (res === null) {
      throw new Error("Error rendering thumbnail");
    }

    const thumbnailBuffer = await sharp(res.buffer!).jpeg().toBuffer();

    const filePath = `${userID}/${renderQueueId}/thumbnail`;

    const { data, error } = await supabase.storage
      .from("video_thumbnail")
      .upload(filePath, thumbnailBuffer, {
        contentType: "image/jpeg",
        duplex: "half",
        upsert: true,
      });

    if (error || !data) {
      throw new Error(`Upload failed: ${error.name} - ${error.message}`);
    }

    return supabase.storage.from("video_thumbnail").getPublicUrl(data.path).data
      .publicUrl;
  } catch (error) {
    logger.error(`Error rendering thumbnail: ${(error as Error).message}`);
    throw new Error("Error rendering thumbnail");
  }
};
