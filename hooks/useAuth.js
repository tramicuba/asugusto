// hooks/useAuth.js
// Hook de autenticación centralizado para AsuGusto

import { supabase } from "../services/supabase.js";
import { ENABLE_LOGS } from "../config/supabase-config.js";

/**
 * Estado global de sesión
 */
let usuarioActual = null;

/**
 * Iniciar sesión con teléfono y código (OTP)
 */
export async function iniciarSesion(telefono) {
    const { data, error } = await supabase.auth.signInWithOtp({
        phone: telefono
    });

    if (error) {
        console.error("Error iniciando sesión:", error);
        throw error;
    }

    if (ENABLE_LOGS) console.log("OTP enviado a:", telefono);

    return data;
}

/**
 * Verificar OTP y obtener sesión
 */
export async function verificarCodigo(telefono, codigo) {
    const { data, error } = await supabase.auth.verifyOtp({
        phone: telefono,
        token: codigo,
        type: "sms"
    });

    if (error) {
        console.error("Error verificando código:", error);
        throw error;
    }

    usuarioActual = data.user;

    if (ENABLE_LOGS) console.log("Usuario autenticado:", usuarioActual);

    return usuarioActual;
}

/**
 * Obtener usuario actual
 */
export function obtenerUsuario() {
    return usuarioActual;
}

/**
 * Cerrar sesión
 */
export async function cerrarSesion() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error("Error cerrando sesión:", error);
        throw error;
    }

    usuarioActual = null;

    if (ENABLE_LOGS) console.log("Sesión cerrada correctamente");
}

/**
 * Escuchar cambios de sesión
 */
export function escucharCambiosSesion(callback) {
    supabase.auth.onAuthStateChange((event, session) => {
        usuarioActual = session?.user || null;

        if (ENABLE_LOGS) console.log("Cambio de sesión:", event);

        callback(event, session);
    });
}
