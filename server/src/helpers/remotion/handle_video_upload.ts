import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import path, { dirname } from "path";
import supabase from "../../configs/supabase";
import { fileURLToPath } from "url";
import { logger } from "../logging/logger";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure the directory path is created correctly
const createDirectoryIfNotExists = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Ensure the file exists
const ensureFileExists = (filePath: string) => {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
};

// Split video into chunks
const splitVideoIntoChunks = (inputPath: string, outputDir: string) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions([
        "-c copy",
        "-map 0",
        "-segment_time 00:00:30",
        "-force_key_frames expr:gte(t,n_forced*1)",
        "-f segment",
        "-reset_timestamps 1",
      ])
      .output(path.join(outputDir, "output%03d.mp4"))
      .on("end", resolve)
      .on("error", reject)
      .run();
  });
};

// Upload chunks to Supabase
const uploadChunksToSupabase = async (
  outputDir: string,
  renderQueueId: string,
  userID: string
) => {
  const files = fs.readdirSync(outputDir);
  const uploadPromises = files.map((file, index) => {
    const filePath = path.join(outputDir, file);
    const supabasePath = `${userID}/${renderQueueId}/chunks_${index}.mp4`;
    return supabase.storage
      .from("video_render")
      .upload(supabasePath, fs.createReadStream(filePath), {
        contentType: "video/mp4",
        duplex: "half",
      })
      .then(({ data, error }) => {
        if (error) {
          throw new Error(`Upload failed: ${error.name} - ${error.message}`);
        }

        return supabase.storage.from("video_render").getPublicUrl(data.path)
          .data.publicUrl;
      });
  });
  return Promise.all(uploadPromises);
};

// Delete files and directories
const deleteFilesAndDirectory = async (files: string[], directory: string) => {
  const deletePromises = files.map((file) => fs.promises.unlink(file));
  await Promise.all(deletePromises);
  await fs.promises.rm(directory, { recursive: true });
};

// Upload video chunks to Supabase
export const uploadSplittedVideoToSupabase = async (
  renderQueueId: string,
  userID: string
) => {
  const videoPath = path.join(__dirname, `../../../out/${renderQueueId}.mp4`);
  ensureFileExists(videoPath); // Ensure the video file exists

  const outputDir = path.join(
    __dirname,
    `../../../out/chunks/${renderQueueId}`
  );

  createDirectoryIfNotExists(outputDir); // Ensure the output directory exists

  await splitVideoIntoChunks(videoPath, outputDir); // Split the video into chunks

  const uploadUrls = await uploadChunksToSupabase(
    outputDir,
    renderQueueId,
    userID
  ); // Upload chunks to Supabase

  const { error } = await supabase
    .from("video_render")
    .update({
      status: "completed",
      updated_at: new Date().toISOString(),
      url: uploadUrls.join(", "),
    })
    .eq("id", renderQueueId);

  if (error) {
    logger.error(`Error updating video render: ${error.message}`);
    throw new Error("Error updating video render");
  }

  const chunkFiles = fs
    .readdirSync(outputDir)
    .map((file) => path.join(outputDir, file));
  await deleteFilesAndDirectory([...chunkFiles, videoPath], outputDir); // Delete chunk files, original video file, and chunks directory

  return uploadUrls; // Return array of upload URLs
};
