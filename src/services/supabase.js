// src/services/supabase.js
// Cliente Supabase unificado para toda la aplicación AsuGusto

import { createClient } from "@supabase/supabase-js";

const ENV = typeof process !== "undefined" ? process.env : {};

const SUPABASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_URL) ||
  ENV.VITE_SUPABASE_URL ||
  "";

const SUPABASE_ANON_KEY =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
  ENV.VITE_SUPABASE_ANON_KEY ||
  "";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("[Supabase] Faltan variables de entorno VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY");
}

export const supabase = createClient(SUPABASE_URL || "https://placeholder.supabase.co", SUPABASE_ANON_KEY || "anon-key");
