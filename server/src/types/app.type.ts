import { User } from "@supabase/supabase-js";
import { Request } from "express";
import {
  videoEditSchema,
  videoOptionSchema,
  videoTheme,
} from "../schema/video_option.schema";
import { z } from "zod";
import { InputPropsType } from "./render.type";
import { Json } from "./supabase/database.types";

export interface AuthUserRequest extends Request {
  body: {
    accessToken?: string;
    user: User;
    renderQueueId?: string;
    scale?: number; // 1 / 1.5
  };
}

export interface CreateSchemaRequest extends AuthUserRequest {
  body: AuthUserRequest["body"] & {
    imageIdList: string[] | undefined;
  };
}

export interface EditSchemaRequest extends AuthUserRequest {
  body: AuthUserRequest["body"] & {
    option: SchemaEditOption;
    schema?: InputPropsType;
  };
}

export type SchemaEditOption = z.infer<typeof videoEditSchema>;

export type VideoTheme = z.infer<typeof videoTheme>;

export type VideoOptionSchema = z.infer<typeof videoOptionSchema>;

export type PersonImage = {
  image_id: string;
  cluster_id: number | null;
  coordinate: Json;
  image: {
    image_name: string;
    image_bucket_id: string;
  };
  cluster_mapping: {
    name: string;
  } | null;
}[];
