// src/pages/usuarios.js
// Página de gestión de usuarios para AsuGusto

import { 
  obtenerUsuarios, 
  crearUsuario, 
  actualizarUsuario, 
  eliminarUsuario 
} from "../../api/usuarios.js";

import { supabase } from "../services/supabase.js";
import { tienePermiso } from "../../lib/permissions.js";

export async function renderUsuariosPage(app) {
  // Obtener usuario actual
  const { data } = await supabase.auth.getUser();
  const user = data?.user || null;

  if (!user) {
    app.innerHTML = `<p>Error: no se pudo obtener la sesión del usuario.</p>`;
    return;
  }

  // Validar permisos
  if (!tienePermiso(user, "gestionar_usuarios")) {
    app.innerHTML = `<p>No tiene permisos para gestionar usuarios.</p>`;
    return;
  }

  // Obtener usuarios reales
  let usuarios = [];
  try {
    usuarios = await obtenerUsuarios();
  } catch (err) {
    console.error(err);
    usuarios = [];
  }

  // Render principal
  app.innerHTML = `
    <div class="usuarios-container">
      <h2>Gestión de Usuarios</h2>

      <div class="usuarios-actions">
        <button id="crear-usuario" class="menu-btn">Crear Usuario</button>
        <button id="volver-dashboard" class="menu-btn">Volver al Dashboard</button>
      </div>

      <div class="usuarios-list">
        <h3>Listado de Usuarios</h3>
        <div id="usuarios-items">
          ${usuarios.length === 0 ? "<p>No hay usuarios registrados.</p>" : ""}
        </div>
      </div>

      <div id="modal" class="modal hidden"></div>
    </div>
  `;

  // Insertar usuarios en la lista
  const listContainer = document.getElementById("usuarios-items");

  usuarios.forEach(u => {
    const item = document.createElement("div");
    item.className = "usuario-item";
    item.innerHTML = `
      <p><strong>ID:</strong> ${u.id}</p>
      <p><strong>Teléfono:</strong> ${u.telefono || "N/A"}</p>
      <p><strong>Rol:</strong> ${u.rol || "N/A"}</p>

      <button class="menu-btn editar-btn" data-id="${u.id}">Editar</button>
      <button class="menu-btn eliminar-btn" data-id="${u.id}">Eliminar</button>
    `;
    listContainer.appendChild(item);
  });

  // Modal
  const modal = document.getElementById("modal");

  function abrirModal(html) {
    modal.innerHTML = html;
    modal.classList.remove("hidden");
  }

  function cerrarModal() {
    modal.classList.add("hidden");
    modal.innerHTML = "";
  }

  // Botón: Crear usuario
  const btnCrear = document.getElementById("crear-usuario");
  btnCrear.addEventListener("click", () => {
    abrirModal(`
      <div class="modal-content">
        <h3>Crear Usuario</h3>

        <label>Nombre</label>
        <input id="nuevo-nombre" type="text" required />

        <label>Teléfono</label>
        <input id="nuevo-telefono" type="text" required />

        <label>Rol</label>
        <select id="nuevo-rol">
          <option value="chofer">Chofer</option>
          <option value="gestor">Gestor</option>
          <option value="administrador">Administrador</option>
        </select>

        <button id="guardar-nuevo" class="menu-btn">Guardar</button>
        <button id="cerrar-modal" class="menu-btn">Cancelar</button>
      </div>
    `);

    document.getElementById("cerrar-modal").onclick = cerrarModal;

    document.getElementById("guardar-nuevo").onclick = async () => {
      const nombre = document.getElementById("nuevo-nombre").value.trim();
      const telefono = document.getElementById("nuevo-telefono").value.trim();
      const rol = document.getElementById("nuevo-rol").value;

      if (!nombre || !telefono || !rol) {
        alert("Nombre, teléfono y rol son obligatorios.");
        return;
      }

      try {
        await crearUsuario({ nombre, telefono, rol });
        alert("Usuario creado con éxito.");
        window.location.hash = "#/usuarios";
      } catch (err) {
        console.error(err);
        alert("Error al crear usuario.");
      }
    };
  });

  // Botón: Editar usuario
  document.querySelectorAll(".editar-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const usuario = usuarios.find(u => u.id == id);

      abrirModal(`
        <div class="modal-content">
          <h3>Editar Usuario</h3>

          <label>Nombre</label>
          <input id="edit-nombre" type="text" value="${usuario.nombre || ""}" required />

          <label>Teléfono</label>
          <input id="edit-telefono" type="text" value="${usuario.telefono || ""}" required />

          <label>Rol</label>
          <select id="edit-rol">
            <option value="chofer" ${usuario.rol === "chofer" ? "selected" : ""}>Chofer</option>
            <option value="gestor" ${usuario.rol === "gestor" ? "selected" : ""}>Gestor</option>
            <option value="administrador" ${usuario.rol === "administrador" ? "selected" : ""}>Administrador</option>
          </select>

          <button id="guardar-edit" class="menu-btn">Guardar Cambios</button>
          <button id="cerrar-modal" class="menu-btn">Cancelar</button>
        </div>
      `);

      document.getElementById("cerrar-modal").onclick = cerrarModal;

      document.getElementById("guardar-edit").onclick = async () => {
        const nombre = document.getElementById("edit-nombre").value.trim();
        const telefono = document.getElementById("edit-telefono").value.trim();
        const rol = document.getElementById("edit-rol").value;

        if (!nombre || !telefono || !rol) {
          alert("Nombre, teléfono y rol son obligatorios.");
          return;
        }

        try {
          await actualizarUsuario(id, { nombre, telefono, rol });
          alert("Usuario actualizado con éxito.");
          window.location.hash = "#/usuarios";
        } catch (err) {
          console.error(err);
          alert("Error al actualizar usuario.");
        }
      };
    });
  });

  // Botón: Eliminar usuario
  document.querySelectorAll(".eliminar-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;

      if (!confirm("¿Eliminar este usuario?")) return;

      try {
        await eliminarUsuario(id);
        alert("Usuario eliminado con éxito.");
        window.location.hash = "#/usuarios";
      } catch (err) {
        console.error(err);
        alert("Error al eliminar usuario.");
      }
    });
  });

  // Botón: Volver al dashboard
  const btnVolver = document.getElementById("volver-dashboard");
  btnVolver.addEventListener("click", () => {
    window.location.hash = "#/dashboard";
  });
}
