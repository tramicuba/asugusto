// tests/creditos.test.js
// Pruebas del módulo de créditos de AsuGusto

import * as creditosAPI from "../api/creditos.js";

// Mock del cliente Supabase
jest.mock("../src/services/supabase.js", () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(),
      insert: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    }))
  }
}));

const { supabase } = require("../src/services/supabase.js");

describe("API: Créditos", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ============================
  // 1. Obtener créditos
  // ============================
  test("Debe obtener créditos correctamente", async () => {
    const mockData = [{ id: "1", monto: 50 }];

    supabase.from().select.mockResolvedValue({
      data: mockData,
      error: null
    });

    const resultado = await creditosAPI.obtenerCreditos();

    expect(resultado).toEqual(mockData);
    expect(supabase.from).toHaveBeenCalledWith("creditos");
  });

  // ============================
  // 2. Crear crédito
  // ============================
  test("Debe crear crédito correctamente", async () => {
    const nuevoCredito = { usuario_id: "123", monto: 100, descripcion: "Pago" };

    supabase.from().insert.mockResolvedValue({
      data: [{ id: "abc123", ...nuevoCredito }],
      error: null
    });

    const resultado = await creditosAPI.crearCredito(nuevoCredito);

    expect(resultado.id).toBe("abc123");
    expect(supabase.from().insert).toHaveBeenCalledWith(nuevoCredito);
  });

  // ============================
  // 3. Actualizar crédito
  // ============================
  test("Debe actualizar crédito correctamente", async () => {
    const cambios = { monto: 200 };

    supabase.from().update.mockResolvedValue({
      data: [{ id: "1", monto: 200 }],
      error: null
    });

    const resultado = await creditosAPI.actualizarCredito("1", cambios);

    expect(resultado.monto).toBe(200);
    expect(supabase.from().update).toHaveBeenCalledWith(cambios);
  });

  // ============================
  // 4. Eliminar crédito
  // ============================
  test("Debe eliminar crédito correctamente", async () => {
    supabase.from().delete.mockResolvedValue({
      data: [{ id: "1" }],
      error: null
    });

    const resultado = await creditosAPI.eliminarCredito("1");

    expect(resultado.id).toBe("1");
    expect(supabase.from().delete).toHaveBeenCalled();
  });

  // ============================
  // 5. Manejo de errores
  // ============================
  test("Debe manejar errores al obtener créditos", async () => {
    supabase.from().select.mockResolvedValue({
      data: null,
      error: { message: "Error de lectura" }
    });

    await expect(creditosAPI.obtenerCreditos())
      .rejects.toThrow("Error de lectura");
  });

  test("Debe manejar errores al crear crédito", async () => {
    supabase.from().insert.mockResolvedValue({
      data: null,
      error: { message: "Error creando crédito" }
    });

    await expect(creditosAPI.crearCredito({}))
      .rejects.toThrow("Error creando crédito");
  });
});
