import path from "path";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
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
