import dotenv from "dotenv";

dotenv.config();

export const config = {
  logLevel: "debug",
  node_env: "development",
  port: parseInt(process.env.PORT!, 10),
  redis_url: process.env.REDIS_URL,
  supabase_url: process.env.SUPABASE_URL as string,
  supabase_key: process.env.SUPABASE_ADMIN_KEY as string,
  gemini_api_key: process.env.GEMINI_API_KEY as string,
};
