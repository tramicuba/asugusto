// api/usuarios.js
// API de usuarios para AsuGusto usando Supabase

import { supabase } from "../src/services/supabase.js";
import { getCurrentUser } from "../src/services/auth.js";
import { requierePermiso } from "../lib/permissions.js";

// Obtener todos los usuarios
export async function obtenerUsuarios() {
  const user = await getCurrentUser();
  requierePermiso(user, "gestionar_usuarios");

  const { data, error } = await supabase
    .from("usuarios")
    .select("*");

  if (error) {
    throw new Error("Error al obtener usuarios.");
  }

  return data;
}

// Obtener un usuario por ID
export async function obtenerUsuarioPorId(id) {
  const user = await getCurrentUser();
  requierePermiso(user, "gestionar_usuarios");

  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Usuario no encontrado.");
  }

  return data;
}

// Crear un nuevo usuario
export async function crearUsuario(usuario) {
  const user = await getCurrentUser();
  requierePermiso(user, "gestionar_usuarios");

  const { data, error } = await supabase
    .from("usuarios")
    .insert(usuario)
    .select()
    .single();

  if (error) {
    throw new Error("Error al crear usuario.");
  }

  return data;
}

// Actualizar usuario
export async function actualizarUsuario(id, cambios) {
  const user = await getCurrentUser();
  requierePermiso(user, "gestionar_usuarios");

  const { data, error } = await supabase
    .from("usuarios")
    .update(cambios)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error("Error al actualizar usuario.");
  }

  return data;
}

// Eliminar usuario
export async function eliminarUsuario(id) {
  const user = await getCurrentUser();
  requierePermiso(user, "gestionar_usuarios");

  const { error } = await supabase
    .from("usuarios")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error("Error al eliminar usuario.");
  }

  return { success: true };
}
