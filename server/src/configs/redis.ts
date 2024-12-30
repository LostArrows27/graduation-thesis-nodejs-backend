import { createClient } from "redis";
import { config } from "./setting";
import { logger } from "../helpers/logging/logger";

const redisClient = createClient({
  url: config.redis_url,
});

const redisWorkerClient = redisClient.duplicate();

redisClient.on("error", (err) => logger.error("Redis Client Error", err));

redisWorkerClient.on("error", (err) =>
  logger.error("Redis Worker Client Error", err)
);

const connectRedisService = async (): Promise<void> => {
  try {
    await redisClient.connect();
    logger.info("Connected to Redis");
  } catch (err) {
    logger.error("Failed to connect to Redis:", err);
    process.exit(1);
  }
};

const connectRedisWorker = async (): Promise<void> => {
  try {
    await redisWorkerClient.connect();
    logger.info("Connected to Redis Worker");
  } catch (err) {
    logger.error("Failed to connect to Redis Worker:", err);
    process.exit(1);
  }
};

const connectAllRedisService = async (): Promise<void> => {
  await connectRedisService();
  await connectRedisWorker();
};

export { redisClient, redisWorkerClient, connectAllRedisService };
