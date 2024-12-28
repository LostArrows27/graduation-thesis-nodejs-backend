import { User } from "@supabase/supabase-js";
import { Request } from "express";

export interface AuthUserRequest extends Request {
  body: {
    accessToken?: string;
    user?: User;
    messageID?: string;
  };
}
