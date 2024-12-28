export const config = {
  logLevel: process.env.NODE_ENV === "production" ? "info" : "debug",
  node_env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  redis_url: process.env.REDIS_URL || "redis://localhost:6379",
  supabase_url: process.env.SUPABASE_URL as string,
  supabase_key: process.env.SUPABASE_ANON_KEY as string,
};
