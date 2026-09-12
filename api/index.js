// api/index.js
// Punto central de las APIs internas de AsuGusto

import * as creditosAPI from "./creditos.js";
import * as carrerasAPI from "./carreras.js";

/**
 * Router simple para manejar endpoints internos.
 * Cada módulo expone sus funciones y aquí se agrupan.
 */

export const API = {
    creditos: creditosAPI,
    carreras: carrerasAPI
};

/**
 * Ejemplo de uso:
 * 
 * API.creditos.obtenerCreditos()
 * API.carreras.crearCarrera()
 */

console.log("API interna cargada correctamente.");
