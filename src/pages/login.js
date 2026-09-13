// src/pages/login.js
// Página de Login con autenticación real usando Supabase

import { supabase } from "../services/supabase.js";

export function renderLoginPage(app) {
  app.innerHTML = `
    <div class="login-container">
      <h2>Iniciar Sesión</h2>

      <form id="login-form">
        <label for="telefono">Teléfono</label>
        <input type="text" id="telefono" placeholder="+53 50000000" required />

        <label for="password">Contraseña</label>
        <input type="password" id="password" placeholder="••••••••" required />

        <button type="submit" class="login-btn">Entrar</button>

        <p id="login-error" class="error-msg"></p>
      </form>
    </div>
  `;

  const form = document.getElementById("login-form");
  const errorMsg = document.getElementById("login-error");

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
      // Autenticación real con Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        phone: telefono,
        password: password
      });

      if (error) {
        errorMsg.textContent = "Credenciales incorrectas.";
        return;
      }

      // Sesión válida → redirigir al dashboard
      window.location.hash = "#/dashboard";

    } catch (err) {
      console.error("[Login Error]", err);
      errorMsg.textContent = "Error inesperado. Intente nuevamente.";
    }
  });
}
