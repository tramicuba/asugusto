// src/services/supabase.js
// Cliente Supabase unificado para toda la aplicación AsuGusto

import { createClient } from "@supabase/supabase-js";

// Variables de entorno seguras (solo ANON KEY en frontend)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validación mínima para evitar errores silenciosos
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("[Supabase] Faltan variables de entorno VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY");
}

// Cliente Supabase único para toda la app
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
