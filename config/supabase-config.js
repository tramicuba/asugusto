// config/supabase-config.js
// Configuración segura para el cliente Supabase en AsuGusto

// IMPORTANTE:
// Solo se exponen claves públicas (ANON KEY) en el frontend.
// Las claves SERVICE ROLE JAMÁS deben estar en el navegador.

// Variables de entorno públicas para el frontend
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validación mínima para evitar errores silenciosos
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("[Supabase Config] Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY en el entorno.");
}
