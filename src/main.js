// src/main.js
// Punto de entrada principal de AsuGusto

import { initRouter } from "./router.js";
import "../styles/global.css";

// Selecciona el contenedor principal donde se renderizará la app
const app = document.getElementById("app");

// Inicializa el router y la aplicación
initRouter(app);
