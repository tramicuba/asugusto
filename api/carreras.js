// api/carreras.js
// API de carreras para AsuGusto usando Supabase

import { supabase } from "../src/services/supabase.js";
import { getCurrentUser } from "../src/services/auth.js";
import { requierePermiso } from "../lib/permissions.js";

// Obtener todas las carreras
export async function obtenerCarreras() {
  const user = await getCurrentUser();
  requierePermiso(user, "gestionar_carreras");

  const { data, error } = await supabase
    .from("carreras")
    .select("*");

  if (error) {
    throw new Error("Error al obtener carreras.");
  }

  return data;
}

// Obtener carrera por ID
export async function obtenerCarreraPorId(id) {
  const user = await getCurrentUser();
  requierePermiso(user, "gestionar_carreras");

  const { data, error } = await supabase
    .from("carreras")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Carrera no encontrada.");
  }

  return data;
}

// Crear carrera manual
export async function crearCarrera(carrera) {
  const user = await getCurrentUser();
  requierePermiso(user, "gestionar_carreras");

  const { data, error } = await supabase
    .from("carreras")
    .insert(carrera)
    .select()
    .single();

  if (error) {
    throw new Error("Error al crear carrera.");
  }

  return data;
}

// Actualizar carrera
export async function actualizarCarrera(id, cambios) {
  const user = await getCurrentUser();
  requierePermiso(user, "gestionar_carreras");

  const { data, error } = await supabase
    .from("carreras")
    .update(cambios)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error("Error al actualizar carrera.");
  }

  return data;
}

// Eliminar carrera
export async function eliminarCarrera(id) {
  const user = await getCurrentUser();
  requierePermiso(user, "gestionar_carreras");

  const { error } = await supabase
    .from("carreras")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error("Error al eliminar carrera.");
  }

  return { success: true };
}

// Crear carrera automáticamente (RPC requerido por las pruebas)
export async function crearCarreraAuto(params) {
  const user = await getCurrentUser();
  requierePermiso(user, "gestionar_carreras");

  const { data, error } = await supabase.rpc("crear_carrera_auto", params);

  if (error) {
    throw new Error("Error al crear carrera automáticamente.");
  }

  return data;
}
