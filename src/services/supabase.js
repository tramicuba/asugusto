// src/services/supabase.js
// Conexión centralizada con Supabase para AsuGusto

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// --- Configuración REAL de tu proyecto ---
const SUPABASE_URL = "https://afbzxslhdrvzrwmaqvwm.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmYnp4c2xoZHJ2enJ3bWFxdndtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkxNTI2MDYsImV4cCI6MjEwNDcyODYwNn0.1Yfuefmker21hljwtdkkU80sv0nhZ1VddLkdKoW2fFs";

// Cliente principal
export const supabaseCliente = createClient(SUPABASE_URL, SUPABASE_KEY);

// --- Funciones base reutilizables ---

// Obtener todos los registros de una tabla
export async function obtenerTodos(tabla) {
    const { data, error } = await supabaseCliente
        .from(tabla)
        .select("*");

    if (error) {
        console.error("Error obteniendo datos:", error);
        return null;
    }

    return data;
}

// Insertar un registro
export async function insertar(tabla, valores) {
    const { data, error } = await supabaseCliente
        .from(tabla)
        .insert(valores)
        .select();

    if (error) {
        console.error("Error insertando:", error);
        return null;
    }

    return data;
}

// Actualizar un registro por ID
export async function actualizar(tabla, id, valores) {
    const { data, error } = await supabaseCliente
        .from(tabla)
        .update(valores)
        .eq("id", id)
        .select();

    if (error) {
        console.error("Error actualizando:", error);
        return null;
    }

    return data;
}

// Eliminar un registro por ID
export async function eliminar(tabla, id) {
    const { error } = await supabaseCliente
        .from(tabla)
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error eliminando:", error);
        return false;
    }

    return true;
}
