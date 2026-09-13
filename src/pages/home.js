// src/pages/home.js
// Página pública inicial de AsuGusto

export function renderHomePage(app) {
  app.innerHTML = `
    <div class="home-container">
      <h1>Bienvenido a AsuGusto</h1>
      <p>La plataforma de gestión de carreras, choferes y créditos.</p>

      <div class="home-actions">
        <button id="go-login" class="home-btn">Iniciar Sesión</button>
        <button id="go-register" class="home-btn">Crear Cuenta</button>
      </div>
    </div>
  `;

  const goLogin = document.getElementById("go-login");
  const goRegister = document.getElementById("go-register");

  goLogin.addEventListener("click", () => {
    window.location.hash = "#/login";
  });

  goRegister.addEventListener("click", () => {
    window.location.hash = "#/register";
  });
}
