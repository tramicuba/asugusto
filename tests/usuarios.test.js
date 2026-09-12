// tests/usuarios.test.js
// Pruebas del módulo de usuarios de AsuGusto

import * as usuariosAPI from "../api/usuarios.js";

// Mock del cliente Supabase
jest.mock("../services/supabase.js", () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(),
      insert: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    }))
  }
}));

const { supabase } = require("../services/supabase.js");

describe("API: Usuarios", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ============================
  // 1. Obtener usuarios
  // ============================
  test("Debe obtener usuarios correctamente", async () => {
    const mockData = [
      { id: "1", nombre: "Andy", rol: "chofer" }
    ];

    supabase.from().select.mockResolvedValue({
      data: mockData,
      error: null
    });

    const resultado = await usuariosAPI.obtenerUsuarios();

    expect(resultado).toEqual(mockData);
    expect(supabase.from).toHaveBeenCalledWith("usuarios");
  });

  // ============================
  // 2. Obtener usuario por ID
  // ============================
  test("Debe obtener un usuario por ID", async () => {
    const mockUser = { id: "123", nombre: "Andy", rol: "gestor" };

    supabase.from().select.mockResolvedValue({
      data: [mockUser],
      error: null
    });

    const resultado = await usuariosAPI.obtenerUsuarioPorId("123");

    expect(resultado).toEqual(mockUser);
    expect(supabase.from().select).toHaveBeenCalled();
  });

  // ============================
  // 3. Crear usuario
  // ============================
  test("Debe crear usuario correctamente", async () => {
    const nuevoUsuario = {
      nombre: "Carlos",
      telefono: "+5355555555",
      rol: "chofer"
    };

    supabase.from().insert.mockResolvedValue({
      data: [{ id: "abc123", ...nuevoUsuario }],
      error: null
    });

    const resultado = await usuariosAPI.crearUsuario(nuevoUsuario);

    expect(resultado.id).toBe("abc123");
    expect(supabase.from().insert).toHaveBeenCalledWith(nuevoUsuario);
  });

  // ============================
  // 4. Actualizar usuario
  // ============================
  test("Debe actualizar usuario correctamente", async () => {
    const cambios = { nombre: "Andy Modificado" };

    supabase.from().update.mockResolvedValue({
      data: [{ id: "1", ...cambios }],
      error: null
    });

    const resultado = await usuariosAPI.actualizarUsuario("1", cambios);

    expect(resultado.nombre).toBe("Andy Modificado");
    expect(supabase.from().update).toHaveBeenCalledWith(cambios);
  });

  // ============================
  // 5. Eliminar usuario
  // ============================
  test("Debe eliminar usuario correctamente", async () => {
    supabase.from().delete.mockResolvedValue({
      data: [{ id: "1" }],
      error: null
    });

    const resultado = await usuariosAPI.eliminarUsuario("1");

    expect(resultado.id).toBe("1");
    expect(supabase.from().delete).toHaveBeenCalled();
  });

  // ============================
  // 6. Manejo de errores
  // ============================
  test("Debe manejar errores al obtener usuarios", async () => {
    supabase.from().select.mockResolvedValue({
      data: null,
      error: { message: "Error obteniendo usuarios" }
    });

    await expect(usuariosAPI.obtenerUsuarios())
      .rejects.toThrow("Error obteniendo usuarios");
  });

  test("Debe manejar errores al crear usuario", async () => {
    supabase.from().insert.mockResolvedValue({
      data: null,
      error: { message: "Error creando usuario" }
    });

    await expect(usuariosAPI.crearUsuario({}))
      .rejects.toThrow("Error creando usuario");
  });
});
