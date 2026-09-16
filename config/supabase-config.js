// config/supabase-config.js
// Configuración segura para el cliente Supabase en AsuGusto

const ENV = typeof process !== "undefined" ? process.env : {};

function getViteEnv() {
  try {
    return Function('return (typeof import.meta !== "undefined" ? import.meta.env : {});')();
  } catch {
    return {};
  }
}

const viteEnv = getViteEnv();

export const APP_ENV = viteEnv.MODE || ENV.NODE_ENV || "development";
export const ENABLE_LOGS = APP_ENV !== "production";

export const SUPABASE_URL = viteEnv.VITE_SUPABASE_URL || ENV.VITE_SUPABASE_URL || "";
export const SUPABASE_ANON_KEY = viteEnv.VITE_SUPABASE_ANON_KEY || ENV.VITE_SUPABASE_ANON_KEY || "";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  const isTestEnvironment = typeof process !== "undefined" && process.env?.NODE_ENV === "test";

  if (!isTestEnvironment) {
    console.error("[Supabase Config] Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY en el entorno.");
  }
}
