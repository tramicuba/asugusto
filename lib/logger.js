// lib/logger.js
// Sistema de logs interno para AsuGusto

import { APP_ENV, ENABLE_LOGS } from "../config/supabase-config.js";

/**
 * Formato estándar de logs
 */
function formatearMensaje(tipo, mensaje, datos = null) {
    const timestamp = new Date().toISOString();

    return {
        timestamp,
        tipo,
        mensaje,
        datos,
        entorno: APP_ENV
    };
}

/**
 * Log informativo
 */
export function info(mensaje, datos = null) {
    if (!ENABLE_LOGS) return;

    const log = formatearMensaje("INFO", mensaje, datos);
    console.log(`[INFO] ${log.timestamp} — ${log.mensaje}`, log.datos || "");
}

/**
 * Log de advertencia
 */
export function warn(mensaje, datos = null) {
    if (!ENABLE_LOGS) return;

    const log = formatearMensaje("WARN", mensaje, datos);
    console.warn(`[WARN] ${log.timestamp} — ${log.mensaje}`, log.datos || "");
}

/**
 * Log de error
 */
export function error(mensaje, datos = null) {
    const log = formatearMensaje("ERROR", mensaje, datos);
    console.error(`[ERROR] ${log.timestamp} — ${log.mensaje}`, log.datos || "");
}

/**
 * Log de depuración (solo en development)
 */
export function debug(mensaje, datos = null) {
    if (!ENABLE_LOGS || APP_ENV !== "development") return;

    const log = formatearMensaje("DEBUG", mensaje, datos);
    console.log(`[DEBUG] ${log.timestamp} — ${log.mensaje}`, log.datos || "");
}
