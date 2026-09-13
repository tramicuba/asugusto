// lib/permissions.js
// Sistema de permisos basado en roles para AsuGusto

// Mapa de permisos por rol
const permisosPorRol = {
  administrador: [
    "ver_dashboard",
    "gestionar_carreras",
    "gestionar_creditos",
    "gestionar_usuarios"
  ],

  gestor: [
    "ver_dashboard",
    "gestionar_carreras"
  ],

  chofer: [
    "ver_dashboard"
  ]
};

// Verifica si un usuario tiene un permiso específico
export function tienePermiso(user, permiso) {
  if (!user) return false;

  const rol = user.user_metadata?.role;

  if (!rol) return false;

  const permisos = permisosPorRol[rol];

  if (!permisos) return false;

  return permisos.includes(permiso);
}

// Middleware simple para proteger funciones internas
export function requierePermiso(user, permiso) {
  if (!tienePermiso(user, permiso)) {
    throw new Error(`Permiso denegado: ${permiso}`);
  }
}
