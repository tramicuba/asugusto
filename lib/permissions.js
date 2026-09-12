// lib/permissions.js
// Sistema de permisos por rol para AsuGusto

import { obtenerUsuario } from "../hooks/useAuth.js";
import { info, warn } from "./logger.js";

/**
 * Permisos por rol
 * Cada acción del sistema se define aquí.
 */
const PERMISOS = {
    chofer: {
        carreras: ["leer", "actualizar"],
        creditos: ["leer"],
        usuarios: ["leer_propios"]
    },

    gestor: {
        carreras: ["leer", "crear", "actualizar"],
        creditos: ["leer"],
        usuarios: ["leer"]
    },

    administrador: {
        carreras: ["leer", "crear", "actualizar", "eliminar"],
        creditos: ["leer", "crear", "actualizar", "eliminar"],
        usuarios: ["leer", "crear", "actualizar", "eliminar"]
    }
};

/**
 * Verificar si el usuario tiene permiso para una acción
 */
export function tienePermiso(entidad, accion) {
    const usuario = obtenerUsuario();

    if (!usuario) {
        warn("Intento de acceso sin sesión activa");
        return false;
    }

    const rol = usuario.rol;

    if (!PERMISOS[rol]) {
        warn(`Rol desconocido: ${rol}`);
        return false;
    }

    const accionesPermitidas = PERMISOS[rol][entidad] || [];

    const permitido = accionesPermitidas.includes(accion);

    info(`Permiso verificado: rol=${rol}, entidad=${entidad}, acción=${accion}, permitido=${permitido}`);

    return permitido;
}

/**
 * Middleware interno para validar permisos antes de ejecutar acciones
 */
export function requierePermiso(entidad, accion, callback) {
    if (!tienePermiso(entidad, accion)) {
        throw new Error(`No tienes permiso para ${accion} en ${entidad}`);
    }

    return callback();
}
