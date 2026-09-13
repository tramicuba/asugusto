// src/router.js
// Router seguro con validación de sesión, permisos y página pública inicial + 404

import { supabase } from "./services/supabase.js";
import { renderHomePage } from "./pages/home.js";
import { renderLoginPage } from "./pages/login.js";
import { renderRegisterPage } from "./pages/register.js";
import { renderDashboardPage } from "./pages/dashboard.js";
import { renderCarrerasPage } from "./pages/carreras.js";
import { renderCreditosPage } from "./pages/creditos.js";
import { renderUsuariosPage } from "./pages/usuarios.js";
import { renderNotFoundPage } from "./pages/notfound.js";
import { tienePermiso } from "../lib/permissions.js";

// Mapa de rutas → funciones de renderizado
const routes = {
  "/home": renderHomePage,
  "/login": renderLoginPage,
  "/register": renderRegisterPage,
  "/dashboard": renderDashboardPage,
  "/carreras": renderCarrerasPage,
  "/creditos": renderCreditosPage,
  "/usuarios": renderUsuariosPage,
  "/notfound": renderNotFoundPage
};

// Obtener usuario actual
async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data?.user || null;
}

// Renderizar ruta actual
async function renderRoute(app) {
  const hash = window.location.hash || "#/home";
  const path = hash.replace("#", "");

  const user = await getCurrentUser();

  // 🔹 Si el usuario está logueado y va a /home → enviarlo al dashboard
  if (user && path === "/home") {
    window.location.hash = "#/dashboard";
    return;
  }

  // 🔹 Si el usuario está logueado y va a /login → enviarlo al dashboard
  if (user && path === "/login") {
    window.location.hash = "#/dashboard";
    return;
  }

  // 🔹 Si el usuario está logueado y va a /register → enviarlo al dashboard
  if (user && path === "/register") {
    window.location.hash = "#/dashboard";
    return;
  }

  // 🔹 Rutas privadas
  const rutasPrivadas = ["/dashboard", "/carreras", "/creditos", "/usuarios"];

  if (!user && rutasPrivadas.includes(path)) {
    window.location.hash = "#/login";
    return;
  }

  // 🔹 Validación de permisos por ruta
  if (path === "/dashboard") {
    if (!tienePermiso(user, "ver_dashboard")) {
      window.location.hash = "#/notfound";
      return;
    }
  }

  if (path === "/carreras") {
    if (!tienePermiso(user, "gestionar_carreras")) {
      window.location.hash = "#/notfound";
      return;
    }
  }

  if (path === "/creditos") {
    if (!tienePermiso(user, "gestionar_creditos")) {
      window.location.hash = "#/notfound";
      return;
    }
  }

  if (path === "/usuarios") {
    if (!tienePermiso(user, "gestionar_usuarios")) {
      window.location.hash = "#/notfound";
      return;
    }
  }

  // 🔹 Renderizar la página correspondiente
  const renderFn = routes[path];

  if (renderFn) {
    renderFn(app);
  } else {
    // Fallback automático
    window.location.hash = "#/notfound";
  }
}

// Inicializar router
export function initRouter(app) {
  window.addEventListener("hashchange", () => renderRoute(app));
  renderRoute(app);
}
