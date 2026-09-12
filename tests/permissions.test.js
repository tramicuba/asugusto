// tests/permissions.test.js
// Pruebas del sistema de permisos de AsuGusto

import {
  puedeVerDashboard,
  puedeGestionarCarreras,
  puedeGestionarCreditos,
  puedeGestionarUsuarios
} from "../lib/permissions.js";

// Mock del usuario autenticado
const crearUsuario = (rol) => ({ rol });

describe("LIB: Sistema de permisos", () => {

  // ============================
  // 1. Permisos del rol: chofer
  // ============================
  test("Chofer: solo puede ver su dashboard", () => {
    const user = crearUsuario("chofer");

    expect(puedeVerDashboard(user)).toBe(true);
    expect(puedeGestionarCarreras(user)).toBe(false);
    expect(puedeGestionarCreditos(user)).toBe(false);
    expect(puedeGestionarUsuarios(user)).toBe(false);
  });

  // ============================
  // 2. Permisos del rol: gestor
  // ============================
  test("Gestor: puede ver dashboard y gestionar carreras", () => {
    const user = crearUsuario("gestor");

    expect(puedeVerDashboard(user)).toBe(true);
    expect(puedeGestionarCarreras(user)).toBe(true);
    expect(puedeGestionarCreditos(user)).toBe(false);
    expect(puedeGestionarUsuarios(user)).toBe(false);
  });

  // ============================
  // 3. Permisos del rol: administrador
  // ============================
  test("Administrador: tiene acceso completo", () => {
    const user = crearUsuario("administrador");

    expect(puedeVerDashboard(user)).toBe(true);
    expect(puedeGestionarCarreras(user)).toBe(true);
    expect(puedeGestionarCreditos(user)).toBe(true);
    expect(puedeGestionarUsuarios(user)).toBe(true);
  });

  // ============================
  // 4. Rol inválido
  // ============================
  test("Rol inválido: no debe tener permisos", () => {
    const user = crearUsuario("invitado");

    expect(puedeVerDashboard(user)).toBe(false);
    expect(puedeGestionarCarreras(user)).toBe(false);
    expect(puedeGestionarCreditos(user)).toBe(false);
    expect(puedeGestionarUsuarios(user)).toBe(false);
  });

  // ============================
  // 5. Usuario sin rol
  // ============================
  test("Usuario sin rol: no debe tener permisos", () => {
    const user = {};

    expect(puedeVerDashboard(user)).toBe(false);
    expect(puedeGestionarCarreras(user)).toBe(false);
    expect(puedeGestionarCreditos(user)).toBe(false);
    expect(puedeGestionarUsuarios(user)).toBe(false);
  });

  // ============================
  // 6. Usuario null
  // ============================
  test("Usuario null: no debe tener permisos", () => {
    const user = null;

    expect(puedeVerDashboard(user)).toBe(false);
    expect(puedeGestionarCarreras(user)).toBe(false);
    expect(puedeGestionarCreditos(user)).toBe(false);
    expect(puedeGestionarUsuarios(user)).toBe(false);
  });
});
