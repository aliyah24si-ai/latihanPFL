import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://rftsokjmxvsisulpjuon.supabase.co";
const SUPABASE_KEY = "sb_publishable_myCeFkQUkc_ZkzMpiYuYjA_J6f9NRBW";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
