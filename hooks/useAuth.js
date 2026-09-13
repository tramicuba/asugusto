// hooks/useAuth.js
// Hook de autenticación basado en el servicio real de Supabase

import {
  login as loginService,
  logout as logoutService,
  getCurrentUser as getCurrentUserService,
  getUserRole as getUserRoleService,
  isAuthenticated as isAuthenticatedService
} from "../src/services/auth.js";

import { supabase } from "../src/services/supabase.js";

let usuarioActual = null;

export async function iniciarSesion(telefono) {
  const { data, error } = await supabase.auth.signInWithOtp({ phone: telefono });

  if (error) {
    throw new Error(error.message || "Error al iniciar sesión.");
  }

  usuarioActual = data?.user ?? null;
  return data;
}

export async function verificarCodigo(telefono, codigo) {
  const { data, error } = await supabase.auth.verifyOtp({
    phone: telefono,
    token: codigo,
    type: "sms"
  });

  if (error) {
    throw new Error(error.message || "Código incorrecto.");
  }

  usuarioActual = data?.user ?? null;
  return usuarioActual;
}

export function obtenerUsuario() {
  return usuarioActual;
}

export async function cerrarSesion() {
  usuarioActual = null;

  if (supabase?.auth?.signOut) {
    await supabase.auth.signOut();
  }

  return true;
}

export function useAuth() {
  return {
    login: loginService,
    logout: logoutService,
    getCurrentUser: getCurrentUserService,
    getUserRole: getUserRoleService,
    isAuthenticated: isAuthenticatedService,
    iniciarSesion,
    verificarCodigo,
    obtenerUsuario,
    cerrarSesion
  };
}
