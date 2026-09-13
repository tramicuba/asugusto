// src/pages/register.js
// Página de registro real usando Supabase Auth

import { supabase } from "../services/supabase.js";

export function renderRegisterPage(app) {
  app.innerHTML = `
    <div class="register-container">
      <h2>Crear Cuenta</h2>

      <form id="register-form">
        <label for="telefono">Teléfono</label>
        <input type="text" id="telefono" placeholder="+53 50000000" required />

        <label for="password">Contraseña</label>
        <input type="password" id="password" placeholder="••••••••" required />

        <button type="submit" class="register-btn">Crear Cuenta</button>

        <p id="register-error" class="error-msg"></p>
      </form>
    </div>
  `;

  const form = document.getElementById("register-form");
  const errorMsg = document.getElementById("register-error");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorMsg.textContent = "";

    const telefono = document.getElementById("telefono").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!telefono || !password) {
      errorMsg.textContent = "Debe completar todos los campos.";
      return;
    }

    try {
      // El rol administrativo solo debe asignarse desde un backend seguro.
      const { error } = await supabase.auth.signUp({
        phone: telefono,
        password: password,
        options: {
          data: {
            role: "chofer"
          }
        }
      });

      if (error) {
        console.error(error);
        errorMsg.textContent = "Error al crear la cuenta.";
        return;
      }

      window.location.hash = "#/login";
    } catch (err) {
      console.error("[Register Error]", err);
      errorMsg.textContent = "Error inesperado. Intente nuevamente.";
    }
  });
}
