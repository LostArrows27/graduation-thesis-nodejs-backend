import { Response, NextFunction } from "express";
import { CreateSchemaRequest } from "../types/app.type";
import supabase from "../configs/supabase";
import { logger } from "../helpers/logging/logger";
import chalk from "chalk";

/*
{ 
	accessToken: "eq433",
	imageIdList: ["1", "2", "3"],
	renderQueueId: "12345"
}
*/
export const checkCreateSchemaParamsMiddleware = async (
  req: CreateSchemaRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { renderQueueId, imageIdList } = req.body;

  if (!renderQueueId) {
    res.status(400).json({ error: "renderQueueId is required" });
    return;
  }

  if (!imageIdList || imageIdList.length === 0) {
    res.status(400).json({ error: "imageIdList is required" });
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
    `User ${chalk.blue(req.body.user.email?.split("@")[0])} request create video`
  );

  next();
};
