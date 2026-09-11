// src/app.js
// Control principal de la interfaz y renderizado dinámico

import { obtenerRutaActual, cargarPagina } from './router.js';

export function iniciarApp() {
    const app = document.getElementById('app');

    if (!app) {
        console.error('Error: No se encontró el contenedor #app');
        return;
    }

    // Render inicial
    renderizar(app);

    // Escuchar cambios de hash (#)
    window.addEventListener('hashchange', () => {
        renderizar(app);
    });
}

function renderizar(app) {
    const ruta = obtenerRutaActual();
    const contenido = cargarPagina(ruta);

    if (!contenido) {
        app.innerHTML = `
            <div style="padding: 40px; text-align: center;">
                <h2>Página no encontrada</h2>
                <p>La ruta <strong>${ruta}</strong> no existe.</p>
            </div>
        `;
        return;
    }

    // Renderiza la página correspondiente
    app.innerHTML = contenido;
}
