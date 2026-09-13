// config/supabase-config.js
// Configuración segura para el cliente Supabase en AsuGusto

const ENV = typeof process !== "undefined" ? process.env : {};

export const APP_ENV = (typeof import.meta !== "undefined" && import.meta.env?.MODE) || ENV.NODE_ENV || "development";
export const ENABLE_LOGS = APP_ENV !== "production";

export const SUPABASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_URL) ||
  ENV.VITE_SUPABASE_URL ||
  "";

export const SUPABASE_ANON_KEY =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
  ENV.VITE_SUPABASE_ANON_KEY ||
  "";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("[Supabase Config] Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY en el entorno.");
}
