// src/pages/creditos.js
// Página de gestión de créditos para AsuGusto

import { obtenerCreditos, sumarCredito, restarCredito } from "../../api/creditos.js";
import { supabase } from "../services/supabase.js";
import { tienePermiso } from "../../lib/permissions.js";

export async function renderCreditosPage(app) {
  // Obtener usuario actual
  const { data } = await supabase.auth.getUser();
  const user = data?.user || null;

  if (!user) {
    app.innerHTML = `<p>Error: no se pudo obtener la sesión del usuario.</p>`;
    return;
  }

  // Validar permisos
  if (!tienePermiso(user, "gestionar_creditos")) {
    app.innerHTML = `<p>No tiene permisos para gestionar créditos.</p>`;
    return;
  }

  // Obtener créditos reales
  let creditos = [];
  try {
    creditos = await obtenerCreditos();
  } catch (err) {
    console.error(err);
    creditos = [];
  }

  // Render principal
  app.innerHTML = `
    <div class="creditos-container">
      <h2>Gestión de Créditos</h2>

      <div class="creditos-actions">
        <button id="sumar-btn" class="menu-btn">Sumar Crédito</button>
        <button id="restar-btn" class="menu-btn">Restar Crédito</button>
        <button id="volver-dashboard" class="menu-btn">Volver al Dashboard</button>
      </div>

      <div class="creditos-list">
        <h3>Listado de Créditos</h3>
        <div id="creditos-items">
          ${creditos.length === 0 ? "<p>No hay créditos registrados.</p>" : ""}
        </div>
      </div>
    </div>
  `;

  // Insertar créditos en la lista
  const listContainer = document.getElementById("creditos-items");

  creditos.forEach(c => {
    const item = document.createElement("div");
    item.className = "credito-item";
    item.innerHTML = `
      <p><strong>ID:</strong> ${c.id}</p>
      <p><strong>Usuario:</strong> ${c.usuario || "N/A"}</p>
      <p><strong>Monto:</strong> ${c.monto || 0}</p>
      <p><strong>Descripción:</strong> ${c.descripcion || "N/A"}</p>
    `;
    listContainer.appendChild(item);
  });

  // Botón: Sumar crédito
  const btnSumar = document.getElementById("sumar-btn");
  btnSumar.addEventListener("click", async () => {
    try {
      await sumarCredito({
        usuario_id: 1,
        monto: 10
      });

      alert("Crédito sumado con éxito.");
      window.location.hash = "#/creditos";
    } catch (err) {
      console.error(err);
      alert("Error al sumar crédito.");
    }
  });

  // Botón: Restar crédito
  const btnRestar = document.getElementById("restar-btn");
  btnRestar.addEventListener("click", async () => {
    try {
      await restarCredito({
        usuario_id: 1,
        monto: 5
      });

      alert("Crédito restado con éxito.");
      window.location.hash = "#/creditos";
    } catch (err) {
      console.error(err);
      alert("Error al restar crédito.");
    }
  });

  // Botón: Volver al dashboard
  const btnVolver = document.getElementById("volver-dashboard");
  btnVolver.addEventListener("click", () => {
    window.location.hash = "#/dashboard";
  });
}
