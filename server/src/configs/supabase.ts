import { createClient } from "@supabase/supabase-js";
import { config } from "./setting";
import { Database } from "../supabase/database.types";

const supabase = createClient<Database>(
  config.supabase_url,
  config.supabase_key
);

export default supabase;
