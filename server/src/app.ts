import express from "express";
import cors from "cors";
import videoRouter from "./routes/render_video_route";
import { pinoHttpLogger } from "./helpers/logging/logger";

const app = express();

app.use(cors());

app.use(pinoHttpLogger);

app.use(express.json());

app.use("/api/video", videoRouter);

export default app;
