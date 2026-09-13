// src/router.js
// Router seguro con validación de sesión y permisos

import { supabase } from "./services/supabase.js";
import { renderLoginPage } from "./pages/login.js";
import { renderDashboardPage } from "./pages/dashboard.js";
import { tienePermiso } from "./lib/permissions.js";

// Mapa de rutas → funciones de renderizado
const routes = {
  "/login": renderLoginPage,
  "/dashboard": renderDashboardPage
};

// Obtiene el usuario actual desde Supabase
async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data?.user || null;
}

// Renderiza la ruta actual
async function renderRoute(app) {
  const hash = window.location.hash || "#/login";
  const path = hash.replace("#", "");

  const user = await getCurrentUser();

  // Si no hay usuario y no estamos en login → redirigir
  if (!user && path !== "/login") {
    window.location.hash = "#/login";
    return;
  }

  // Si hay usuario pero intenta ir a login → redirigir a dashboard
  if (user && path === "/login") {
    window.location.hash = "#/dashboard";
    return;
  }

  // Validación de permisos (solo dashboard por ahora)
  if (path === "/dashboard") {
    const puedeEntrar = tienePermiso(user, "ver_dashboard");

    if (!puedeEntrar) {
      app.innerHTML = `<p>No tiene permisos para acceder al dashboard.</p>`;
      return;
    }
  }

  // Renderizar la página correspondiente
  const renderFn = routes[path];

  if (renderFn) {
    renderFn(app);
  } else {
    app.innerHTML = `<p>Ruta no encontrada: ${path}</p>`;
  }
}

// Inicializa el router
export function initRouter(app) {
  window.addEventListener("hashchange", () => renderRoute(app));
  renderRoute(app);
}
