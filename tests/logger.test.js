// tests/logger.test.js
// Pruebas del módulo de logging de AsuGusto

import { logInfo, logWarn, logError } from "../lib/logger.js";

// Mock de console
global.console = {
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
};

describe("LIB: Logger", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ============================
  // 1. Log de información
  // ============================
  test("logInfo debe imprimir mensaje con prefijo INFO", () => {
    logInfo("Sistema iniciado");

    expect(console.log).toHaveBeenCalled();
    const mensaje = console.log.mock.calls[0][0];

    expect(mensaje).toMatch(/INFO/);
    expect(mensaje).toMatch(/Sistema iniciado/);
    expect(mensaje).toMatch(/\d{4}-\d{2}-\d{2}/); // timestamp
  });

  // ============================
  // 2. Log de advertencia
  // ============================
  test("logWarn debe imprimir mensaje con prefijo WARN", () => {
    logWarn("Uso elevado de memoria");

    expect(console.warn).toHaveBeenCalled();
    const mensaje = console.warn.mock.calls[0][0];

    expect(mensaje).toMatch(/WARN/);
    expect(mensaje).toMatch(/Uso elevado de memoria/);
    expect(mensaje).toMatch(/\d{4}-\d{2}-\d{2}/);
  });

  // ============================
  // 3. Log de error
  // ============================
  test("logError debe imprimir mensaje con prefijo ERROR", () => {
    logError("Fallo en Supabase");

    expect(console.error).toHaveBeenCalled();
    const mensaje = console.error.mock.calls[0][0];

    expect(mensaje).toMatch(/ERROR/);
    expect(mensaje).toMatch(/Fallo en Supabase/);
    expect(mensaje).toMatch(/\d{4}-\d{2}-\d{2}/);
  });

  // ============================
  // 4. Manejo de objetos
  // ============================
  test("Logger debe manejar objetos correctamente", () => {
    const obj = { id: 1, nombre: "Andy" };

    logInfo(obj);

    const mensaje = console.log.mock.calls[0][0];
    expect(mensaje).toMatch(/INFO/);
    expect(mensaje).toMatch(/"id": 1/);
    expect(mensaje).toMatch(/"nombre": "Andy"/);
  });

  // ============================
  // 5. Manejo de mensajes vacíos
  // ============================
  test("Logger debe manejar mensajes vacíos sin fallar", () => {
    logWarn("");

    const mensaje = console.warn.mock.calls[0][0];
    expect(mensaje).toMatch(/WARN/);
  });

  // ============================
  // 6. Manejo de null
  // ============================
  test("Logger debe manejar null sin fallar", () => {
    logError(null);

    const mensaje = console.error.mock.calls[0][0];
    expect(mensaje).toMatch(/ERROR/);
  });
});
