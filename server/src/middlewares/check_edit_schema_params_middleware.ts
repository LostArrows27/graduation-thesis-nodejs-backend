import { Response, NextFunction } from "express";
import { EditSchemaRequest } from "../types/app.type";
import supabase from "../configs/supabase";
import { logger } from "../helpers/logging/logger";
import chalk from "chalk";
import { ZodError } from "zod";
import { videoEditSchema } from "../schema/video_option.schema";
import { InputPropsType } from "../types/render.type";

/*
{ 
	accessToken: "eq433",
	renderQueueId: "12345",
    option: {
        title: 'My video',
        titleStyle: 0 / 1,
        bgMusic: '/assets/audio/1.mp3',
        bgVideoTheme: 'spring' | 'summer' | 'autumn' | 'winter' -> getDateFromSeason,
        maxDuration?: 20,
    }
}
*/
export const checkEditSchemaParamsMiddleware = async (
  req: EditSchemaRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { renderQueueId, option } = req.body;

  if (!renderQueueId) {
    res.status(400).json({ error: "renderQueueId is required" });
    return;
  }

  if (!option) {
    res.status(400).json({ error: "video option is required" });
    return;
  }

  try {
    videoEditSchema.parse(option);
  } catch (error) {
    logger.error(
      "Error parsing video option schema",
      (error as ZodError).message
    );
    res.status(400).json({
      error: `Invalid video option schema: ${(error as ZodError).errors
        .map((e) => `${e.path} is ${e.message}`)
        .reduce((acc, curr) => acc + " " + curr, "")}`,
    });
    return;
  }

  const { data, error } = await supabase
    .from("video_render")
    .select("schema")
    .eq("id", renderQueueId)
    .single();

  if (!data || error) {
    res.status(400).json({ error: "Invalid renderQueueId" });
    return;
  }

  logger.info(
    `User ${chalk.blue(req.body.user.email?.split("@")[0])} request edit schema.`
  );

  req.body.schema = data.schema as InputPropsType;

  next();
};
