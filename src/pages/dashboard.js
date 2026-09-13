// src/pages/dashboard.js
// Dashboard principal de AsuGusto

import { supabase } from "../services/supabase.js";

export async function renderDashboardPage(app) {
  // Obtener usuario actual
  const { data } = await supabase.auth.getUser();
  const user = data?.user || null;

  if (!user) {
    app.innerHTML = `<p>Error: no se pudo obtener la sesión del usuario.</p>`;
    return;
  }

  // Datos del usuario
  const telefono = user.phone || "Sin teléfono";
  const rol = user.user_metadata?.role || "Sin rol";

  app.innerHTML = `
    <div class="dashboard-container">
      <h2>Panel Principal</h2>

      <div class="dashboard-card">
        <h3>Información del Usuario</h3>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Rol:</strong> ${rol}</p>
      </div>

      <div class="dashboard-card">
        <h3>Acciones</h3>
        <button id="logout-btn" class="logout-btn">Cerrar Sesión</button>
      </div>
    </div>
  `;

  // Botón de logout
  const logoutBtn = document.getElementById("logout-btn");

  logoutBtn.addEventListener("click", async () => {
    await supabase.auth.signOut();
    window.location.hash = "#/login";
  });
}
