// src/utils/validators.js
// Validadores generales para AsuGusto

// Validar teléfono cubano (8 dígitos o formato 53xxxxxx)
export function validarTelefono(telefono) {
    const limpio = telefono.trim();
    const regex = /^(5\d{7}|53\d{7})$/;
    return regex.test(limpio);
}

// Validar nombre (mínimo 3 caracteres, solo letras y espacios)
export function validarNombre(nombre) {
    if (!nombre) return false;
    const limpio = nombre.trim();
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{3,}$/;
    return regex.test(limpio);
}

// Validar placa de vehículo (formato cubano típico: B12345, T98765, P54321)
export function validarPlaca(placa) {
    const limpio = placa.trim().toUpperCase();
    const regex = /^[A-Z]\d{5}$/;
    return regex.test(limpio);
}

// Validar contraseña (mínimo 6 caracteres)
export function validarPassword(password) {
    return password && password.length >= 6;
}

// Validar precio (número positivo)
export function validarPrecio(precio) {
    return !isNaN(precio) && Number(precio) > 0;
}

// Validar distancia en km (número positivo)
export function validarDistancia(km) {
    return !isNaN(km) && Number(km) > 0;
}

// Validar fecha ISO
export function validarFechaISO(fecha) {
    const d = new Date(fecha);
    return d instanceof Date && !isNaN(d);
}

// Validar objeto carrera completo
export function validarCarrera(carrera) {
    if (!carrera) return false;

    return (
        validarNombre(carrera.chofer) &&
        validarDistancia(carrera.distancia) &&
        validarPrecio(carrera.precio) &&
        validarFechaISO(carrera.fecha) &&
        carrera.origen?.trim().length > 2 &&
        carrera.destino?.trim().length > 2
    );
}

// Validar objeto chofer completo
export function validarChofer(chofer) {
    if (!chofer) return false;

    return (
        validarNombre(chofer.nombre) &&
        validarTelefono(chofer.telefono) &&
        validarPlaca(chofer.placa)
    );
}

// Validar objeto gestor completo
export function validarGestor(gestor) {
    if (!gestor) return false;

    return (
        validarNombre(gestor.nombre) &&
        validarTelefono(gestor.telefono)
    );
}

// Validar objeto administrador completo
export function validarAdministrador(admin) {
    if (!admin) return false;

    return (
        validarNombre(admin.nombre) &&
        validarTelefono(admin.telefono)
    );
}
