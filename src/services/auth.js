// src/services/auth.js
// Servicio de autenticación para AsuGusto

import { supabaseCliente } from './supabase.js';

// --- Autenticación simulada temporal (hasta conectar Supabase) ---
const usuariosSimulados = [
    { telefono: "53555555", password: "123456", rol: "admin" },
    { telefono: "53444444", password: "111111", rol: "gestor" },
    { telefono: "53333333", password: "222222", rol: "chofer" }
];

// --- Login con Supabase (cuando esté listo) ---
export async function login(telefono, password) {
    console.log("Intentando login…");

    // Modo simulado temporal
    const usuario = usuariosSimulados.find(
        u => u.telefono === telefono && u.password === password
    );

    if (usuario) {
        console.log("Login exitoso (simulado):", usuario);
        return {
            exito: true,
            rol: usuario.rol,
            mensaje: "Acceso concedido"
        };
    }

    return {
        exito: false,
        mensaje: "Credenciales incorrectas"
    };

    /*
    // --- Versión real con Supabase (cuando activemos supabase.js) ---
    const { data, error } = await supabaseCliente
        .from('usuarios')
        .select('*')
        .eq('telefono', telefono)
        .eq('password', password)
        .single();

    if (error || !data) {
        return { exito: false, mensaje: "Credenciales incorrectas" };
    }

    return { exito: true, rol: data.rol, mensaje: "Acceso concedido" };
    */
}

// --- Logout ---
export function logout() {
    console.log("Sesión cerrada");
    window.location.hash = "#login";
}
