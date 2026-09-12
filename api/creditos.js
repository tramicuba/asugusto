// api/creditos.js
// API interna para gestionar créditos en AsuGusto

import { supabase } from "../services/supabase.js";

/**
 * Obtener todos los créditos
 */
export async function obtenerCreditos() {
    const { data, error } = await supabase
        .from("creditos")
        .select("*");

    if (error) {
        console.error("Error obteniendo créditos:", error);
        throw error;
    }

    return data;
}

/**
 * Crear un nuevo crédito
 */
export async function crearCredito(credito) {
    const { data, error } = await supabase
        .from("creditos")
        .insert([credito]);

    if (error) {
        console.error("Error creando crédito:", error);
        throw error;
    }

    return data;
}

/**
 * Actualizar un crédito por ID
 */
export async function actualizarCredito(id, cambios) {
    const { data, error } = await supabase
        .from("creditos")
        .update(cambios)
        .eq("id", id);

    if (error) {
        console.error("Error actualizando crédito:", error);
        throw error;
    }

    return data;
}

/**
 * Eliminar un crédito por ID
 */
export async function eliminarCredito(id) {
    const { data, error } = await supabase
        .from("creditos")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error eliminando crédito:", error);
        throw error;
    }

    return data;
}

console.log("API de créditos cargada correctamente.");
