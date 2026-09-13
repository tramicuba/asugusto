// hooks/useAuth.js
// Hook de autenticación basado en el servicio real de Supabase

import { 
  login as loginService,
  logout as logoutService,
  getCurrentUser as getCurrentUserService,
  getUserRole as getUserRoleService,
  isAuthenticated as isAuthenticatedService
} from "../src/services/auth.js";

// Hook simple que expone las funciones de autenticación
export function useAuth() {
  return {
    login: loginService,
    logout: logoutService,
    getCurrentUser: getCurrentUserService,
    getUserRole: getUserRoleService,
    isAuthenticated: isAuthenticatedService
  };
}
