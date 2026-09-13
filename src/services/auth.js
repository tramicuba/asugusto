// src/services/auth.js
// Servicio de autenticación real usando Supabase

import { supabase } from "./supabase.js";

// Iniciar sesión con teléfono y contraseña
export async function login(telefono, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    phone: telefono,
    password: password
  });

  if (error) {
    throw new Error("Credenciales incorrectas.");
  }

  return data;
}

// Cerrar sesión
export async function logout() {
  await supabase.auth.signOut();
}

// Obtener usuario actual
export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data?.user || null;
}

// Obtener rol del usuario
export async function getUserRole() {
  const user = await getCurrentUser();
  return user?.user_metadata?.role || null;
}

// Verificar si hay sesión activa
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}
