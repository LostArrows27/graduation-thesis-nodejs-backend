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
    // ffmpeg -i test.mp4 -profile:v baseline -level 3.0 -hls_time 10 -hls_list_size 0 -f hls output.m3u8
    ffmpeg(inputPath)
      .outputOptions([
        "-profile:v baseline", // Use baseline profile for compatibility
        "-level 3.0", // Set H.264 encoding level
        "-hls_time 10", // Segment length in seconds
        "-hls_list_size 0", // Set list size to 0 (all segments in playlist)
        "-f hls", // Output format is HLS
      ])
      .output(path.join(outputDir, "output.m3u8")) // Output playlist file (m3u8)
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
  try {
    const files = fs.readdirSync(outputDir);

    const uploadPromises = files.map(async (file) => {
      const filePath = path.join(outputDir, file);
      const fileName = file.split("/").pop();
      const supabasePath = `${userID}/${renderQueueId}/${fileName}`;
      const contentType =
        file.split(".").pop() === "m3u8"
          ? "application/vnd.apple.mpegurl"
          : "video/mp2t";

      const { data, error } = await supabase.storage
        .from("chunk_storage")
        .upload(supabasePath, fs.createReadStream(filePath), {
          contentType,
          duplex: "half",
        });

      if (error || !data) {
        throw new Error(`Upload failed: ${error.name} - ${error.message}`);
      }

      // only need to upload the m3u8 file to the database
      if (contentType === "application/vnd.apple.mpegurl") {
        await supabase.from("video_chunk").insert({
          video_id: renderQueueId,
          chunk_name: data.path,
          chunk_bucket_id: "chunk_storage",
        });

        return supabase.storage.from("chunk_storage").getPublicUrl(data.path)
          .data.publicUrl;
      }

      return null;
    });

    const results = await Promise.all(uploadPromises);

    return results.filter((result: string | null) => result !== null);
  } catch (error) {
    logger.error(`Error uploading chunks: ${(error as Error).message}`);
    throw new Error("Error uploading chunks");
  }
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
  );

  const { error } = await supabase
    .from("video_render")
    .update({
      status: "completed",
      updated_at: new Date().toISOString(),
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
  // return [];
};
