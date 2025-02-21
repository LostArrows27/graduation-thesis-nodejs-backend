import { Response, NextFunction } from "express";
import { AuthUserRequest } from "../types/app.type";
import supabase from "../configs/supabase";
import { logger } from "../helpers/logging/logger";
import chalk from "chalk";

// check video render route params
export const checkVideoParamsMiddelware = async (
  req: AuthUserRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { renderQueueId } = req.body;

  if (!renderQueueId) {
    res.status(400).json({ error: "renderQueueId is required" });
    return;
  }

  const { data } = await supabase
    .from("video_render")
    .select("*")
    .eq("id", renderQueueId)
    .single();

  if (!data) {
    res.status(400).json({ error: "Invalid renderQueueId" });
    return;
  }

  logger.info(
    `User ${chalk.blue(req.body.user.email?.split("@")[0])} request create schema.`
  );

  next();
};
