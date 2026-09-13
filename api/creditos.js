// api/creditos.js
// API de créditos para AsuGusto usando Supabase

import { supabase } from "../src/services/supabase.js";
import { getCurrentUser } from "../src/services/auth.js";
import { requierePermiso } from "../lib/permissions.js";

// Obtener todos los créditos
export async function obtenerCreditos() {
  const user = await getCurrentUser();
  requierePermiso(user, "gestionar_creditos");

  const { data, error } = await supabase
    .from("creditos")
    .select("*");

  if (error) {
    throw new Error("Error al obtener créditos.");
  }

  return data;
}

// Obtener crédito por ID
export async function obtenerCreditoPorId(id) {
  const user = await getCurrentUser();
  requierePermiso(user, "gestionar_creditos");

  const { data, error } = await supabase
    .from("creditos")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Crédito no encontrado.");
  }

  return data;
}

// Crear crédito
export async function crearCredito(credito) {
  const user = await getCurrentUser();
  requierePermiso(user, "gestionar_creditos");

  const { data, error } = await supabase
    .from("creditos")
    .insert(credito)
    .select()
    .single();

  if (error) {
    throw new Error("Error al crear crédito.");
  }

  return data;
}

// Actualizar crédito
export async function actualizarCredito(id, cambios) {
  const user = await getCurrentUser();
  requierePermiso(user, "gestionar_creditos");

  const { data, error } = await supabase
    .from("creditos")
    .update(cambios)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error("Error al actualizar crédito.");
  }

  return data;
}

// Eliminar crédito
export async function eliminarCredito(id) {
  const user = await getCurrentUser();
  requierePermiso(user, "gestionar_creditos");

  const { error } = await supabase
    .from("creditos")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error("Error al eliminar crédito.");
  }

  return { success: true };
}

// RPC: sumar crédito
export async function sumarCredito(params) {
  const user = await getCurrentUser();
  requierePermiso(user, "gestionar_creditos");

  const { data, error } = await supabase.rpc("sumar_credito", params);

  if (error) {
    throw new Error("Error al sumar crédito.");
  }

  return data;
}

// RPC: restar crédito
export async function restarCredito(params) {
  const user = await getCurrentUser();
  requierePermiso(user, "gestionar_creditos");

  const { data, error } = await supabase.rpc("restar_credito", params);

  if (error) {
    throw new Error("Error al restar crédito.");
  }

  return data;
}
