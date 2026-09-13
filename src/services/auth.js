// src/services/auth.js
// Servicio de autenticación real usando Supabase

import { supabase } from "./supabase.js";

function resolveUserRole(user) {
  return user?.user_metadata?.role ?? user?.app_metadata?.role ?? user?.role ?? user?.rol ?? null;
}

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
  if (!supabase?.auth?.getUser) {
    return null;
  }

  const { data } = await supabase.auth.getUser();
  return data?.user || null;
}

// Obtener rol del usuario
export async function getUserRole() {
  const user = await getCurrentUser();
  return resolveUserRole(user);
}

// Verificar si hay sesión activa
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}
