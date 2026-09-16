// tests/usuarios.test.js
// Pruebas del módulo de usuarios de AsuGusto

jest.mock("../src/services/auth.js", () => ({
  getCurrentUser: jest.fn().mockResolvedValue({
    user_metadata: { role: "administrador" }
  })
}));

jest.mock("../src/services/supabase.js", () => ({
  supabase: {
    from: jest.fn()
  }
}));

import * as usuariosAPI from "../api/usuarios.js";

const { supabase } = require("../src/services/supabase.js");

describe("API: Usuarios", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Debe obtener usuarios correctamente", async () => {
    const mockData = [{ id: "1", nombre: "Andy", rol: "chofer" }];

    supabase.from.mockReturnValue({
      select: jest.fn().mockResolvedValue({ data: mockData, error: null })
    });

    const resultado = await usuariosAPI.obtenerUsuarios();

    expect(resultado).toEqual(mockData);
    expect(supabase.from).toHaveBeenCalledWith("usuarios");
  });

  test("Debe obtener un usuario por ID", async () => {
    const mockUser = { id: "123", nombre: "Andy", rol: "gestor" };

    const query = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: mockUser, error: null })
    };

    supabase.from.mockReturnValue(query);

    const resultado = await usuariosAPI.obtenerUsuarioPorId("123");

    expect(resultado).toEqual(mockUser);
    expect(query.select).toHaveBeenCalledWith("*");
  });

  test("Debe crear usuario correctamente", async () => {
    const nuevoUsuario = {
      nombre: "Carlos",
      telefono: "+5355555555",
      rol: "chofer"
    };

    const query = {
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({
        data: { id: "abc123", ...nuevoUsuario },
        error: null
      })
    };

    supabase.from.mockReturnValue(query);

    const resultado = await usuariosAPI.crearUsuario(nuevoUsuario);

    expect(resultado.id).toBe("abc123");
    expect(query.insert).toHaveBeenCalledWith(nuevoUsuario);
  });

  test("Debe actualizar usuario correctamente", async () => {
    const cambios = { nombre: "Andy Modificado" };

    const query = {
      update: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({
        data: { id: "1", ...cambios },
        error: null
      })
    };

    supabase.from.mockReturnValue(query);

    const resultado = await usuariosAPI.actualizarUsuario("1", cambios);

    expect(resultado.nombre).toBe("Andy Modificado");
    expect(query.update).toHaveBeenCalledWith(cambios);
  });

  test("Debe eliminar usuario correctamente", async () => {
    const query = {
      delete: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      select: jest.fn().mockResolvedValue({ data: [{ id: "1" }], error: null })
    };

    supabase.from.mockReturnValue(query);

    const resultado = await usuariosAPI.eliminarUsuario("1");

    expect(resultado.id).toBe("1");
    expect(query.delete).toHaveBeenCalled();
  });

  test("Debe manejar errores al obtener usuarios", async () => {
    supabase.from.mockReturnValue({
      select: jest.fn().mockResolvedValue({
        data: null,
        error: { message: "Error obteniendo usuarios" }
      })
    });

    await expect(usuariosAPI.obtenerUsuarios()).rejects.toThrow("Error obteniendo usuarios");
  });

  test("Debe manejar errores al crear usuario", async () => {
    const query = {
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({
        data: null,
        error: { message: "Error creando usuario" }
      })
    };

    supabase.from.mockReturnValue(query);

    await expect(usuariosAPI.crearUsuario({})).rejects.toThrow("Error creando usuario");
  });
});
