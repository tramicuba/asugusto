// tests/auth.test.js
// Pruebas del sistema de autenticación de AsuGusto

import {
  iniciarSesion,
  verificarCodigo,
  obtenerUsuario,
  cerrarSesion
} from "../hooks/useAuth.js";

// Mock del cliente Supabase
jest.mock("../src/services/supabase.js", () => ({
  supabase: {
    auth: {
      signInWithOtp: jest.fn(),
      verifyOtp: jest.fn(),
      signOut: jest.fn()
    }
  }
}));

const { supabase } = require("../src/services/supabase.js");

describe("Auth: Sistema de autenticación OTP", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ============================
  // 1. Enviar OTP
  // ============================
  test("Debe enviar OTP correctamente", async () => {
    supabase.auth.signInWithOtp.mockResolvedValue({
      data: { status: "otp_sent" },
      error: null
    });

    const resultado = await iniciarSesion("+5355555555");

    expect(resultado.status).toBe("otp_sent");
    expect(supabase.auth.signInWithOtp).toHaveBeenCalledWith({
      phone: "+5355555555"
    });
  });

  // ============================
  // 2. Verificar código OTP
  // ============================
  test("Debe verificar OTP y devolver usuario", async () => {
    const usuarioMock = { id: "123", rol: "chofer" };

    supabase.auth.verifyOtp.mockResolvedValue({
      data: { user: usuarioMock },
      error: null
    });

    const usuario = await verificarCodigo("+5355555555", "123456");

    expect(usuario).toEqual(usuarioMock);
    expect(obtenerUsuario()).toEqual(usuarioMock);
  });

  // ============================
  // 3. Cerrar sesión
  // ============================
  test("Debe cerrar sesión correctamente", async () => {
    supabase.auth.signOut.mockResolvedValue({ error: null });

    await cerrarSesion();

    expect(supabase.auth.signOut).toHaveBeenCalled();
    expect(obtenerUsuario()).toBe(null);
  });

  // ============================
  // 4. Manejo de errores
  // ============================
  test("Debe manejar errores en OTP", async () => {
    supabase.auth.signInWithOtp.mockResolvedValue({
      data: null,
      error: { message: "Número inválido" }
    });

    await expect(iniciarSesion("123")).rejects.toThrow("Número inválido");
  });

  test("Debe manejar errores al verificar código", async () => {
    supabase.auth.verifyOtp.mockResolvedValue({
      data: null,
      error: { message: "Código incorrecto" }
    });

    await expect(verificarCodigo("+5355555555", "000000"))
      .rejects.toThrow("Código incorrecto");
  });
});
