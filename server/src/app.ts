import express from "express";
import cors from "cors";
import { pinoHttpLogger } from "./helpers/logging/logger";
import { homeRouter } from "./routes/home_route";
import videoRouter from "./routes/render_video_route";
import schemaRouter from "./routes/video_schema_route";

const app = express();

app.use(cors());

app.use(pinoHttpLogger);

app.use(express.json());

app.use("/api/video", videoRouter);

app.use("/api/schema", schemaRouter);

app.use("/", homeRouter);

export default app;
