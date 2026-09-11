// src/main.js
// Punto de entrada inicial de la aplicación

import { iniciarApp } from './app.js';
import { cargarRutas } from './router.js';

// Cuando el DOM esté listo, iniciamos la aplicación
document.addEventListener('DOMContentLoaded', () => {
    console.log('AsuGusto iniciado...');
    
    cargarRutas();   // Configura las rutas
    iniciarApp();    // Renderiza la app en #app
});
