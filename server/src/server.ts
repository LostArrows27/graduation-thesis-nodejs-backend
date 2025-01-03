import dotenv from "dotenv";

dotenv.config();

import app from "./app";
import { logger } from "./helpers/logging/logger";
import { redisWorker } from "./workers/redis_worker";
import { config } from "./configs/setting";
import { connectAllRedisService } from "./configs/redis";

const startExternalServices = async () => {
  await connectAllRedisService();
  await redisWorker();
};

const startServer = async () => {
  await startExternalServices();

  app.listen(config.port, () => {
    logger.info(`Server running at port ${config.port}`);
  });
};

startServer();
