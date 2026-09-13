// src/pages/dashboard.js
// Dashboard principal de AsuGusto con menú dinámico según rol

import { supabase } from "../services/supabase.js";
import { tienePermiso } from "../../lib/permissions.js";

function resolveUserRole(user) {
  return user?.user_metadata?.role ?? user?.app_metadata?.role ?? user?.role ?? user?.rol ?? "Sin rol";
}

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
  const rol = resolveUserRole(user);

  // Construir menú dinámico según permisos
  const menu = [];

  if (tienePermiso(user, "gestionar_carreras")) {
    menu.push({
      label: "Gestión de Carreras",
      route: "#/carreras"
    });
  }

  if (tienePermiso(user, "gestionar_creditos")) {
    menu.push({
      label: "Gestión de Créditos",
      route: "#/creditos"
    });
  }

  if (tienePermiso(user, "gestionar_usuarios")) {
    menu.push({
      label: "Gestión de Usuarios",
      route: "#/usuarios"
    });
  }

  // Renderizado del dashboard
  app.innerHTML = `
    <div class="dashboard-container">
      <h2>Panel Principal</h2>

      <div class="dashboard-card">
        <h3>Información del Usuario</h3>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Rol:</strong> ${rol}</p>
      </div>

      <div class="dashboard-card">
        <h3>Acciones Disponibles</h3>
        <div id="menu-actions" class="menu-actions">
          ${menu.length === 0 ? "<p>No tiene acciones disponibles.</p>" : ""}
        </div>
      </div>

      <div class="dashboard-card">
        <h3>Sesión</h3>
        <button id="logout-btn" class="logout-btn">Cerrar Sesión</button>
      </div>
    </div>
  `;

  // Insertar botones del menú
  const menuContainer = document.getElementById("menu-actions");

  menu.forEach(item => {
    const btn = document.createElement("button");
    btn.textContent = item.label;
    btn.className = "menu-btn";
    btn.addEventListener("click", () => {
      window.location.hash = item.route;
    });
    menuContainer.appendChild(btn);
  });

  // Botón de logout
  const logoutBtn = document.getElementById("logout-btn");

  logoutBtn.addEventListener("click", async () => {
    await supabase.auth.signOut();
    window.location.hash = "#/login";
  });
}
