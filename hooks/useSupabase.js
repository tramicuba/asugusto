// hooks/useSupabase.js
// Cliente centralizado de Supabase para AsuGusto

import { createClient } from "@supabase/supabase-js";
import {
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    ENABLE_LOGS
} from "../config/supabase-config.js";

/**
 * Crear cliente Supabase
 */
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    }
});

/**
 * Ejecutar consultas con logs opcionales
 */
export async function ejecutar(queryCallback) {
    try {
        const resultado = await queryCallback(supabase);

        if (ENABLE_LOGS) {
            console.log("Consulta ejecutada:", resultado);
        }

        return resultado;
    } catch (error) {
        console.error("Error ejecutando consulta:", error);
        throw error;
    }
}

/**
 * Obtener tabla con sintaxis limpia
 */
export function tabla(nombre) {
    return supabase.from(nombre);
}

/**
 * Subir archivos al bucket de Supabase Storage
 */
export async function subirArchivo(bucket, ruta, archivo) {
    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(ruta, archivo, {
            upsert: true
        });

    if (error) {
        console.error("Error subiendo archivo:", error);
        throw error;
    }

    if (ENABLE_LOGS) console.log("Archivo subido:", data);

    return data;
}

/**
 * Obtener URL pública de un archivo
 */
export function obtenerURLPublica(bucket, ruta) {
    return supabase.storage.from(bucket).getPublicUrl(ruta).data.publicUrl;
}
