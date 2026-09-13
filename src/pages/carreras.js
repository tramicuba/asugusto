// src/pages/carreras.js
// Página de gestión de carreras para AsuGusto

import { obtenerCarreras, crearCarreraAuto, crearCarrera } from "../../api/carreras.js";
import { supabase } from "../services/supabase.js";
import { tienePermiso } from "../../lib/permissions.js";

export async function renderCarrerasPage(app) {
  // Obtener usuario actual
  const { data } = await supabase.auth.getUser();
  const user = data?.user || null;

  if (!user) {
    app.innerHTML = `<p>Error: no se pudo obtener la sesión del usuario.</p>`;
    return;
  }

  // Validar permisos
  if (!tienePermiso(user, "gestionar_carreras")) {
    app.innerHTML = `<p>No tiene permisos para gestionar carreras.</p>`;
    return;
  }

  // Obtener carreras reales
  let carreras = [];
  try {
    carreras = await obtenerCarreras();
  } catch (err) {
    console.error(err);
    carreras = [];
  }

  // Render principal
  app.innerHTML = `
    <div class="carreras-container">
      <h2>Gestión de Carreras</h2>

      <div class="carreras-actions">
        <button id="crear-auto" class="menu-btn">Crear Carrera Automática</button>
        <button id="crear-manual" class="menu-btn">Crear Carrera Manual</button>
        <button id="volver-dashboard" class="menu-btn">Volver al Dashboard</button>
      </div>

      <div class="carreras-list">
        <h3>Listado de Carreras</h3>
        <div id="carreras-items">
          ${carreras.length === 0 ? "<p>No hay carreras registradas.</p>" : ""}
        </div>
      </div>
    </div>
  `;

  // Insertar carreras en la lista
  const listContainer = document.getElementById("carreras-items");

  carreras.forEach(c => {
    const item = document.createElement("div");
    item.className = "carrera-item";
    item.innerHTML = `
      <p><strong>ID:</strong> ${c.id}</p>
      <p><strong>Cliente:</strong> ${c.cliente || "N/A"}</p>
      <p><strong>Origen:</strong> ${c.origen || "N/A"}</p>
      <p><strong>Destino:</strong> ${c.destino || "N/A"}</p>
      <p><strong>Estado:</strong> ${c.estado || "N/A"}</p>
    `;
    listContainer.appendChild(item);
  });

  // Botón: Crear carrera automática
  const btnAuto = document.getElementById("crear-auto");
  btnAuto.addEventListener("click", async () => {
    try {
      const nueva = await crearCarreraAuto({
        cliente: "Auto",
        origen: "Punto A",
        destino: "Punto B"
      });

      alert("Carrera automática creada con éxito.");
      window.location.hash = "#/carreras";
    } catch (err) {
      console.error(err);
      alert("Error al crear carrera automática.");
    }
  });

  // Botón: Crear carrera manual
  const btnManual = document.getElementById("crear-manual");
  btnManual.addEventListener("click", async () => {
    try {
      const nueva = await crearCarrera({
        cliente: "Manual",
        origen: "Origen manual",
        destino: "Destino manual",
        estado: "pendiente"
      });

      alert("Carrera manual creada con éxito.");
      window.location.hash = "#/carreras";
    } catch (err) {
      console.error(err);
      alert("Error al crear carrera manual.");
    }
  });

  // Botón: Volver al dashboard
  const btnVolver = document.getElementById("volver-dashboard");
  btnVolver.addEventListener("click", () => {
    window.location.hash = "#/dashboard";
  });
}
