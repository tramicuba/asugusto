// tests/creditos.test.js
// Pruebas del módulo de créditos de AsuGusto

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

import * as creditosAPI from "../api/creditos.js";

const { supabase } = require("../src/services/supabase.js");

describe("API: Créditos", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Debe obtener créditos correctamente", async () => {
    const mockData = [{ id: "1", monto: 50 }];

    supabase.from.mockReturnValue({
      select: jest.fn().mockResolvedValue({ data: mockData, error: null })
    });

    const resultado = await creditosAPI.obtenerCreditos();

    expect(resultado).toEqual(mockData);
    expect(supabase.from).toHaveBeenCalledWith("creditos");
  });

  test("Debe crear crédito correctamente", async () => {
    const nuevoCredito = { usuario_id: "123", monto: 100, descripcion: "Pago" };

    const query = {
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({
        data: { id: "abc123", ...nuevoCredito },
        error: null
      })
    };

    supabase.from.mockReturnValue(query);

    const resultado = await creditosAPI.crearCredito(nuevoCredito);

    expect(resultado.id).toBe("abc123");
    expect(query.insert).toHaveBeenCalledWith(nuevoCredito);
  });

  test("Debe actualizar crédito correctamente", async () => {
    const cambios = { monto: 200 };

    const query = {
      update: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({
        data: { id: "1", monto: 200 },
        error: null
      })
    };

    supabase.from.mockReturnValue(query);

    const resultado = await creditosAPI.actualizarCredito("1", cambios);

    expect(resultado.monto).toBe(200);
    expect(query.update).toHaveBeenCalledWith(cambios);
  });

  test("Debe eliminar crédito correctamente", async () => {
    const query = {
      delete: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      select: jest.fn().mockResolvedValue({ data: [{ id: "1" }], error: null })
    };

    supabase.from.mockReturnValue(query);

    const resultado = await creditosAPI.eliminarCredito("1");

    expect(resultado.id).toBe("1");
    expect(query.delete).toHaveBeenCalled();
  });

  test("Debe manejar errores al obtener créditos", async () => {
    supabase.from.mockReturnValue({
      select: jest.fn().mockResolvedValue({
        data: null,
        error: { message: "Error de lectura" }
      })
    });

    await expect(creditosAPI.obtenerCreditos()).rejects.toThrow("Error de lectura");
  });

  test("Debe manejar errores al crear crédito", async () => {
    const query = {
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({
        data: null,
        error: { message: "Error creando crédito" }
      })
    };

    supabase.from.mockReturnValue(query);

    await expect(creditosAPI.crearCredito({})).rejects.toThrow("Error creando crédito");
  });
});
