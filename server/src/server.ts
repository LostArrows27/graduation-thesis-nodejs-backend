import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectRedis } from "./configs/redis";
import { logger } from "./helpers/logging/logger";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectRedis();
  app.listen(PORT, () => {
    logger.info(`Server running at http://localhost:${PORT}`);
  });
};

startServer();
