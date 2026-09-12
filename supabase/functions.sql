-- ============================================================
-- FUNCIONES SQL PARA ASUGUSTO
-- ============================================================

-- ============================================================
-- 1. FUNCIÓN DE AUDITORÍA
-- ============================================================

CREATE TABLE IF NOT EXISTS auditoria (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID,
    accion TEXT,
    entidad TEXT,
    datos JSONB,
    fecha TIMESTAMP DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION registrar_auditoria()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO auditoria (usuario_id, accion, entidad, datos)
    VALUES (
        auth.uid(),
        TG_OP,
        TG_TABLE_NAME,
        row_to_json(NEW)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- 2. FUNCIÓN: AUTO-ASIGNAR GESTOR SEGÚN ZONA
-- ============================================================

CREATE OR REPLACE FUNCTION asignar_gestor_por_zona(zona TEXT)
RETURNS UUID AS $$
DECLARE
    gestor_id UUID;
BEGIN
    SELECT id INTO gestor_id
    FROM gestores
    WHERE zona = zona
    ORDER BY RANDOM()
    LIMIT 1;

    RETURN gestor_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- 3. FUNCIÓN: CREAR CARRERA AUTOMÁTICAMENTE
-- ============================================================

CREATE OR REPLACE FUNCTION crear_carrera_auto(
    p_chofer_id UUID,
    p_origen TEXT,
    p_destino TEXT,
    p_precio NUMERIC,
    p_zona TEXT
)
RETURNS UUID AS $$
DECLARE
    nueva_carrera UUID;
    gestor_auto UUID;
BEGIN
    gestor_auto := asignar_gestor_por_zona(p_zona);

    INSERT INTO carreras (id, chofer_id, gestor_id, origen, destino, precio, estado)
    VALUES (
        gen_random_uuid(),
        p_chofer_id,
        gestor_auto,
        p_origen,
        p_destino,
        p_precio,
        'pendiente'
    )
    RETURNING id INTO nueva_carrera;

    RETURN nueva_carrera;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- 4. FUNCIÓN: SUMAR CRÉDITO
-- ============================================================

CREATE OR REPLACE FUNCTION sumar_credito(
    p_usuario_id UUID,
    p_monto NUMERIC,
    p_descripcion TEXT
)
RETURNS UUID AS $$
DECLARE
    nuevo_credito UUID;
BEGIN
    INSERT INTO creditos (id, usuario_id, monto, descripcion)
    VALUES (
        gen_random_uuid(),
        p_usuario_id,
        p_monto,
        p_descripcion
    )
    RETURNING id INTO nuevo_credito;

    RETURN nuevo_credito;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- 5. FUNCIÓN: RESTAR CRÉDITO
-- ============================================================

CREATE OR REPLACE FUNCTION restar_credito(
    p_usuario_id UUID,
    p_monto NUMERIC,
    p_descripcion TEXT
)
RETURNS UUID AS $$
DECLARE
    nuevo_credito UUID;
BEGIN
    INSERT INTO creditos (id, usuario_id, monto, descripcion)
    VALUES (
        gen_random_uuid(),
        p_usuario_id,
        -ABS(p_monto),
        p_descripcion
    )
    RETURNING id INTO nuevo_credito;

    RETURN nuevo_credito;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- 6. TRIGGER: AUDITORÍA AUTOMÁTICA
-- ============================================================

CREATE TRIGGER auditoria_usuarios
AFTER INSERT OR UPDATE ON usuarios
FOR EACH ROW EXECUTE FUNCTION registrar_auditoria();

CREATE TRIGGER auditoria_carreras
AFTER INSERT OR UPDATE ON carreras
FOR EACH ROW EXECUTE FUNCTION registrar_auditoria();

CREATE TRIGGER auditoria_creditos
AFTER INSERT OR UPDATE ON creditos
FOR EACH ROW EXECUTE FUNCTION registrar_auditoria();
