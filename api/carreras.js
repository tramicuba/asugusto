// api/carreras.js
// API interna para gestionar carreras en AsuGusto

import { supabase } from "../services/supabase.js";

/**
 * Obtener todas las carreras
 */
export async function obtenerCarreras() {
    const { data, error } = await supabase
        .from("carreras")
        .select("*");

    if (error) {
        console.error("Error obteniendo carreras:", error);
        throw error;
    }

    return data;
}

/**
 * Crear una nueva carrera
 */
export async function crearCarrera(carrera) {
    const { data, error } = await supabase
        .from("carreras")
        .insert([carrera]);

    if (error) {
        console.error("Error creando carrera:", error);
        throw error;
    }

    return data;
}

/**
 * Actualizar una carrera por ID
 */
export async function actualizarCarrera(id, cambios) {
    const { data, error } = await supabase
        .from("carreras")
        .update(cambios)
        .eq("id", id);

    if (error) {
        console.error("Error actualizando carrera:", error);
        throw error;
    }

    return data;
}

/**
 * Eliminar una carrera por ID
 */
export async function eliminarCarrera(id) {
    const { data, error } = await supabase
        .from("carreras")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error eliminando carrera:", error);
        throw error;
    }

    return data;
}

console.log("API de carreras cargada correctamente.");
