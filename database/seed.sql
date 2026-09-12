-- ============================================================
-- SEED INICIAL PARA ASUGUSTO
-- Datos de ejemplo para pruebas y desarrollo
-- ============================================================

-- ===========================
-- USUARIOS
-- ===========================
INSERT INTO usuarios (id, nombre, telefono, rol)
VALUES
    (gen_random_uuid(), 'Carlos Pérez', '535000001', 'chofer'),
    (gen_random_uuid(), 'Luis Gómez', '535000002', 'gestor'),
    (gen_random_uuid(), 'Ana Rodríguez', '535000003', 'administrador'),
    (gen_random_uuid(), 'María López', '535000004', 'chofer'),
    (gen_random_uuid(), 'Pedro Hernández', '535000005', 'gestor');

-- ===========================
-- CHOFERES
-- ===========================
INSERT INTO choferes (id, usuario_id, licencia, vehiculo)
SELECT gen_random_uuid(), id, 'LIC-' || telefono, 'Toyota Corolla'
FROM usuarios
WHERE rol = 'chofer';

-- ===========================
-- GESTORES
-- ===========================
INSERT INTO gestores (id, usuario_id, zona)
SELECT gen_random_uuid(), id, 'Zona A'
FROM usuarios
WHERE rol = 'gestor';

-- ===========================
-- ADMINISTRADORES
-- ===========================
INSERT INTO administradores (id, usuario_id, nivel)
SELECT gen_random_uuid(), id, 1
FROM usuarios
WHERE rol = 'administrador';

-- ===========================
-- CARRERAS
-- ===========================
INSERT INTO carreras (id, chofer_id, gestor_id, origen, destino, precio, estado)
SELECT
    gen_random_uuid(),
    (SELECT id FROM choferes LIMIT 1),
    (SELECT id FROM gestores LIMIT 1),
    'Vedado',
    'Centro Habana',
    150.00,
    'pendiente';

INSERT INTO carreras (id, chofer_id, gestor_id, origen, destino, precio, estado)
SELECT
    gen_random_uuid(),
    (SELECT id FROM choferes OFFSET 1 LIMIT 1),
    (SELECT id FROM gestores OFFSET 1 LIMIT 1),
    'Playa',
    'Habana Vieja',
    200.00,
    'en_proceso';

-- ===========================
-- CRÉDITOS
-- ===========================
INSERT INTO creditos (id, usuario_id, monto, descripcion)
SELECT gen_random_uuid(), id, 500.00, 'Crédito inicial'
FROM usuarios
WHERE rol = 'chofer';

INSERT INTO creditos (id, usuario_id, monto, descripcion)
SELECT gen_random_uuid(), id, 300.00, 'Crédito por desempeño'
FROM usuarios
WHERE rol = 'gestor';
