import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectRedis } from "./configs/redis";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectRedis();
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

startServer();
