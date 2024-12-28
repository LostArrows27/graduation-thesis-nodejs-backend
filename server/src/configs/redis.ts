import { createClient } from "redis";
import { config } from "./setting";
import { logger } from "../helpers/logging/logger";

const redisClient = createClient({
  url: config.redis_url,
});

redisClient.on("error", (err) => logger.error("Redis Client Error", err));

export const connectRedis = async (): Promise<void> => {
  try {
    await redisClient.connect();
    logger.info("Connected to Redis");
  } catch (err) {
    logger.error("Failed to connect to Redis:", err);
    process.exit(1);
  }
};

export default redisClient;
