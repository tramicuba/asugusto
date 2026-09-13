// src/pages/notfound.js
// Página 404 para rutas inexistentes

import { supabase } from "../services/supabase.js";

export async function renderNotFoundPage(app) {
  const { data } = await supabase.auth.getUser();
  const user = data?.user || null;

  app.innerHTML = `
    <div class="notfound-container">
      <h2>404 - Página no encontrada</h2>
      <p>La ruta que intentó acceder no existe.</p>

      <div class="notfound-actions">
        ${
          user
            ? `<button id="volver-dashboard" class="menu-btn">Volver al Dashboard</button>`
            : `<button id="volver-home" class="menu-btn">Ir al Inicio</button>`
        }
      </div>
    </div>
  `;

  if (user) {
    document.getElementById("volver-dashboard").onclick = () => {
      window.location.hash = "#/dashboard";
    };
  } else {
    document.getElementById("volver-home").onclick = () => {
      window.location.hash = "#/home";
    };
  }
}
