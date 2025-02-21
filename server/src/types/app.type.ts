import { User } from "@supabase/supabase-js";
import { Request } from "express";
import { videoOptionSchema, videoTheme } from "../schema/video_option.schema";
import { z } from "zod";
import { Json } from "../supabase/database.types";

export interface AuthUserRequest extends Request {
  body: {
    accessToken?: string;
    user: User;
    renderQueueId?: string;
  };
}

export interface CreateSchemaRequest extends AuthUserRequest {
  body: AuthUserRequest["body"] & {
    imageIdList: string[] | undefined;
  };
}

export type VideoTheme = z.infer<typeof videoTheme>;

export type VideoOptionSchema = z.infer<typeof videoOptionSchema>;
