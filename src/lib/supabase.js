import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const isExampleValue = (value = "") => /tu-proyecto|tu_clave|placeholder|your-|example/i.test(value);
const hasValidProjectUrl = (value = "") => {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" && parsed.hostname.endsWith(".supabase.co") && !isExampleValue(parsed.hostname);
  } catch {
    return false;
  }
};

export const supabase = hasValidProjectUrl(url) && publishableKey && !isExampleValue(publishableKey)
  ? createClient(url, publishableKey)
  : null;

export const supabaseConfigured = Boolean(supabase);
