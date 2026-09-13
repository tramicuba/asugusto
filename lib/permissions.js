// lib/permissions.js
// Sistema de permisos para AsuGusto

// Mapa de permisos por rol
const permisosPorRol = {
  chofer: [
    "ver_dashboard"
  ],

  gestor: [
    "ver_dashboard",
    "gestionar_carreras",
    "gestionar_creditos"
  ],

  administrador: [
    "ver_dashboard",
    "gestionar_carreras",
    "gestionar_creditos",
    "gestionar_usuarios"
  ]
};

// Obtener rol del usuario desde Supabase Auth
export function obtenerRol(user) {
  return user?.user_metadata?.role || null;
}

// Verificar si un usuario tiene un permiso
export function tienePermiso(user, permiso) {
  const rol = obtenerRol(user);
  if (!rol) return false;

  const permisos = permisosPorRol[rol];
  if (!permisos) return false;

  return permisos.includes(permiso);
}

// Requerir permiso (usado en APIs)
export function requierePermiso(user, permiso) {
  if (!tienePermiso(user, permiso)) {
    throw new Error(`No tiene permiso para: ${permiso}`);
  }
}
