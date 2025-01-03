import { redisClient } from "../../configs/redis";
import { logger } from "../logging/logger";

// NOTE: file for more readable syntax -> XSTREAM / XREAD / ...
export async function pushToStream(
  streamName: string,
  data: Record<string, string>
) {
  try {
    const commandArgs = [streamName, "*"];
    for (const [field, value] of Object.entries(data)) {
      commandArgs.push(field, value);
    }

    // Send the XADD command
    await redisClient.sendCommand(["XADD", ...commandArgs]);
  } catch (err) {
    logger.error("Error adding data to stream:", err);
  }
}
