import dotenv from "dotenv";

dotenv.config();

export const config = {
  logLevel: process.env.NODE_ENV === "production" ? "info" : "debug",
  node_env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  redis_url: process.env.REDIS_URL || "redis://localhost:6379",
  supabase_url: process.env.SUPABASE_URL as string,
  supabase_key: process.env.SUPABASE_ADMIN_KEY as string,
  gemini_api_key: process.env.GEMINI_API_KEY as string,
};
