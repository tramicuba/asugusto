// tests/carreras.test.js
// Pruebas del módulo de carreras de AsuGusto

jest.mock("../src/services/auth.js", () => ({
  getCurrentUser: jest.fn().mockResolvedValue({
    user_metadata: { role: "administrador" }
  })
}));

jest.mock("../src/services/supabase.js", () => ({
  supabase: {
    from: jest.fn(),
    rpc: jest.fn()
  }
}));

import * as carrerasAPI from "../api/carreras.js";

const { supabase } = require("../src/services/supabase.js");

describe("API: Carreras", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Debe obtener carreras correctamente", async () => {
    const mockData = [{ id: "1", origen: "A", destino: "B", estado: "pendiente" }];

    supabase.from.mockReturnValue({
      select: jest.fn().mockResolvedValue({ data: mockData, error: null })
    });

    const resultado = await carrerasAPI.obtenerCarreras();

    expect(resultado).toEqual(mockData);
    expect(supabase.from).toHaveBeenCalledWith("carreras");
  });

  test("Debe crear carrera correctamente", async () => {
    const nuevaCarrera = {
      chofer_id: "123",
      origen: "A",
      destino: "B",
      precio: 50
    };

    const query = {
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({
        data: { id: "abc123", ...nuevaCarrera },
        error: null
      })
    };

    supabase.from.mockReturnValue(query);

    const resultado = await carrerasAPI.crearCarrera(nuevaCarrera);

    expect(resultado.id).toBe("abc123");
    expect(query.insert).toHaveBeenCalledWith(nuevaCarrera);
  });

  test("Debe actualizar carrera correctamente", async () => {
    const cambios = { estado: "completada" };

    const query = {
      update: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({
        data: { id: "1", estado: "completada" },
        error: null
      })
    };

    supabase.from.mockReturnValue(query);

    const resultado = await carrerasAPI.actualizarCarrera("1", cambios);

    expect(resultado.estado).toBe("completada");
    expect(query.update).toHaveBeenCalledWith(cambios);
  });

  test("Debe eliminar carrera correctamente", async () => {
    const query = {
      delete: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      select: jest.fn().mockResolvedValue({ data: [{ id: "1" }], error: null })
    };

    supabase.from.mockReturnValue(query);

    const resultado = await carrerasAPI.eliminarCarrera("1");

    expect(resultado.id).toBe("1");
    expect(query.delete).toHaveBeenCalled();
  });

  test("Debe crear carrera automática usando RPC", async () => {
    const mockId = "rpc123";

    supabase.rpc.mockResolvedValue({ data: mockId, error: null });

    const resultado = await carrerasAPI.crearCarreraAuto({
      chofer_id: "123",
      origen: "A",
      destino: "B",
      precio: 40,
      zona: "centro"
    });

    expect(resultado).toBe(mockId);
    expect(supabase.rpc).toHaveBeenCalledWith("crear_carrera_auto", {
      p_chofer_id: "123",
      p_origen: "A",
      p_destino: "B",
      p_precio: 40,
      p_zona: "centro"
    });
  });

  test("Debe manejar errores al obtener carreras", async () => {
    supabase.from.mockReturnValue({
      select: jest.fn().mockResolvedValue({
        data: null,
        error: { message: "Error de lectura" }
      })
    });

    await expect(carrerasAPI.obtenerCarreras()).rejects.toThrow("Error de lectura");
  });

  test("Debe manejar errores al crear carrera", async () => {
    const query = {
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({
        data: null,
        error: { message: "Error creando carrera" }
      })
    };

    supabase.from.mockReturnValue(query);

    await expect(carrerasAPI.crearCarrera({})).rejects.toThrow("Error creando carrera");
  });

  test("Debe manejar errores en RPC de carrera automática", async () => {
    supabase.rpc.mockResolvedValue({
      data: null,
      error: { message: "Error RPC" }
    });

    await expect(carrerasAPI.crearCarreraAuto({})).rejects.toThrow("Error RPC");
  });
});
