import { createClient } from "@supabase/supabase-js";

const URL = "https://vkgywtvdgwhyzegcvpgb.supabase.co";
const KEY = "sb_publishable_No5s_SDAoTrmVdK1_2LV0w_SktCXxRv";

export const supabase = createClient(URL, KEY);
