// src/services/carreras.js
// Gestión de carreras usando Supabase

import { supabase } from './supabase.js';

// Obtener todas las carreras
export async function obtenerCarreras() {
    const { data, error } = await supabase
        .from('carreras')
        .select('*');

    if (error) {
        console.error("Error obteniendo carreras:", error);
        return null;
    }

    return data;
}

// Obtener carreras por chofer
export async function obtenerCarrerasPorChofer(chofer_id) {
    const { data, error } = await supabase
        .from('carreras')
        .select('*')
        .eq('chofer_id', chofer_id);

    if (error) {
        console.error("Error obteniendo carreras del chofer:", error);
        return null;
    }

    return data;
}

// Agregar carrera
export async function agregarCarrera(carrera) {
    const { data, error } = await supabase
        .from('carreras')
        .insert(carrera)
        .select();

    if (error) {
        console.error("Error agregando carrera:", error);
        return null;
    }

    return data;
}

// Actualizar carrera
export async function actualizarCarrera(id, valores) {
    const { data, error } = await supabase
        .from('carreras')
        .update(valores)
        .eq('id', id)
        .select();

    if (error) {
        console.error("Error actualizando carrera:", error);
        return null;
    }

    return data;
}

// Eliminar carrera
export async function eliminarCarrera(id) {
    const { error } = await supabase
        .from('carreras')
        .delete()
        .eq('id', id);

    if (error) {
        console.error("Error eliminando carrera:", error);
        return false;
    }

    return true;
}
