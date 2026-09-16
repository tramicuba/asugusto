// lib/permissions.js
// Sistema de permisos para AsuGusto

const permisosPorRol = {
  chofer: ["ver_dashboard"],
  gestor: ["ver_dashboard", "gestionar_carreras"],
  administrador: [
    "ver_dashboard",
    "gestionar_carreras",
    "gestionar_creditos",
    "gestionar_usuarios"
  ]
};

export function obtenerRol(user) {
  const rol = user?.user_metadata?.role ?? user?.app_metadata?.role ?? user?.role ?? user?.rol ?? null;
  return typeof rol === "string" ? rol : null;
}

export function tienePermiso(user, permiso) {
  const rol = obtenerRol(user);
  if (!rol) return false;

  const permisos = permisosPorRol[rol];
  if (!permisos) return false;

  return permisos.includes(permiso);
}

export function requierePermiso(user, permiso) {
  if (!tienePermiso(user, permiso)) {
    throw new Error(`No tiene permiso para: ${permiso}`);
  }
}

export function puedeVerDashboard(user) {
  return tienePermiso(user, "ver_dashboard");
}

export function puedeGestionarCarreras(user) {
  return tienePermiso(user, "gestionar_carreras");
}

export function puedeGestionarCreditos(user) {
  return tienePermiso(user, "gestionar_creditos");
}

export function puedeGestionarUsuarios(user) {
  return tienePermiso(user, "gestionar_usuarios");
}
