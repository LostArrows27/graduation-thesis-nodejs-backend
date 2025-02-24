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
  const { renderQueueId, scale } = req.body;

  if (!renderQueueId) {
    res.status(400).json({ error: "renderQueueId is required" });
    return;
  }

  if (scale && ![1, 1.5].includes(scale)) {
    res.status(400).json({ error: "Invalid scale" });
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

  if (data.request_user_id !== req.body.user.id) {
    res.status(403).json({ error: "User does not have permission" });
    return;
  }

  logger.info(
    `User ${chalk.blue(req.body.user.email?.split("@")[0])} request create video.`
  );

  next();
};
