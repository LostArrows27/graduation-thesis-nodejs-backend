import { redisClient } from "../../configs/redis";
import { logger } from "../logging/logger";

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
    const reply = await redisClient.sendCommand(["XADD", ...commandArgs]);
    logger.info(`Data added to stream ${streamName} with ID: ${reply}`);
  } catch (err) {
    logger.error("Error adding data to stream:", err);
  }
}
