// config/supabase-config.js
// Configuración centralizada de Supabase para AsuGusto

// Estas variables deben venir desde tu archivo .env
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
export const SUPABASE_SERVICE_ROLE_KEY = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || "";

// Nombre del proyecto
export const APP_NAME = import.meta.env.VITE_APP_NAME || "AsuGusto";

// Entorno actual
export const APP_ENV = import.meta.env.VITE_APP_ENV || "development";

// Puerto del servidor local
export const PORT = import.meta.env.VITE_PORT || 3000;

// Activar logs internos
export const ENABLE_LOGS = import.meta.env.VITE_ENABLE_LOGS === "true";

// Tablas del sistema
export const TABLAS = {
    choferes: "choferes",
    gestores: "gestores",
    administradores: "administradores",
    carreras: "carreras",
    creditos: "creditos",
    usuarios: "usuarios"
};
