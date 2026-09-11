// src/router.js
// Sistema de rutas para la aplicación AsuGusto

// Importar páginas
import { paginaLogin } from './pages/login.js';
import { paginaDashboard } from './pages/dashboard.js';
import { paginaChoferes } from './pages/choferes.js';
import { paginaGestores } from './pages/gestores.js';
import { paginaAdministradores } from './pages/administradores.js';
import { paginaReportes } from './pages/reportes.js';
import { paginaCarreras } from './pages/carreras.js';

// Definición de rutas
const rutas = {
    '': paginaLogin,
    'login': paginaLogin,
    'dashboard': paginaDashboard,
    'choferes': paginaChoferes,
    'gestores': paginaGestores,
    'administradores': paginaAdministradores,
    'reportes': paginaReportes,
    'carreras': paginaCarreras
};

// Obtener la ruta actual del hash
export function obtenerRutaActual() {
    return window.location.hash.replace('#', '') || '';
}

// Cargar la página correspondiente
export function cargarPagina(ruta) {
    return rutas[ruta] ? rutas[ruta]() : null;
}

// Inicializar rutas (si necesitas lógica adicional)
export function cargarRutas() {
    console.log('Rutas cargadas correctamente');
}
