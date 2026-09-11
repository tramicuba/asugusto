// src/utils/helpers.js
// Funciones utilitarias generales para AsuGusto

// Formatear moneda en CUP
export function formatearCUP(valor) {
    return `${Number(valor).toFixed(2)} CUP`;
}

// Formatear moneda en USD
export function formatearUSD(valor) {
    return `$${Number(valor).toFixed(2)}`;
}

// Formatear fecha a formato legible
export function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

// Obtener fecha y hora actual en formato ISO
export function fechaActualISO() {
    return new Date().toISOString();
}

// Generar un ID único (para registros temporales)
export function generarID() {
    return crypto.randomUUID();
}

// Capitalizar la primera letra de un texto
export function capitalizar(texto) {
    if (!texto) return "";
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// Validar si un número es válido
export function esNumero(valor) {
    return !isNaN(parseFloat(valor)) && isFinite(valor);
}

// Limpiar texto (eliminar espacios dobles, saltos innecesarios)
export function limpiarTexto(texto) {
    return texto.trim().replace(/\s+/g, " ");
}

// Convertir un número a kilómetros con formato
export function formatearKM(valor) {
    return `${Number(valor).toFixed(1)} km`;
}

// Convertir un número a precio estándar del sistema
export function formatearPrecio(valor) {
    return `${Number(valor).toFixed(0)} CUP`;
}

// Obtener hora actual en formato HH:MM
export function horaActual() {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

// Crear un objeto estándar de error
export function crearError(mensaje) {
    return { exito: false, mensaje };
}

// Crear un objeto estándar de éxito
export function crearExito(data = null, mensaje = "OK") {
    return { exito: true, mensaje, data };
}
