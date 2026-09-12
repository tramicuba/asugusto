-- ============================================================
-- SCHEMA PRINCIPAL DE ASUGUSTO
-- Base de datos optimizada para Supabase (PostgreSQL)
-- ============================================================

-- ===========================
-- TIPOS PERSONALIZADOS
-- ===========================
CREATE TYPE rol_usuario AS ENUM ('chofer', 'gestor', 'administrador');

CREATE TYPE estado_carrera AS ENUM ('pendiente', 'en_proceso', 'finalizada', 'cancelada');

-- ===========================
-- TABLA: usuarios
-- ===========================
CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre TEXT NOT NULL,
    telefono TEXT UNIQUE NOT NULL,
    rol rol_usuario NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    creado_en TIMESTAMP DEFAULT NOW(),
    actualizado_en TIMESTAMP DEFAULT NOW()
);

-- ===========================
-- TABLA: choferes
-- ===========================
CREATE TABLE choferes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    licencia TEXT NOT NULL,
    vehiculo TEXT NOT NULL,
    creado_en TIMESTAMP DEFAULT NOW(),
    actualizado_en TIMESTAMP DEFAULT NOW()
);

-- ===========================
-- TABLA: gestores
-- ===========================
CREATE TABLE gestores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    zona TEXT NOT NULL,
    creado_en TIMESTAMP DEFAULT NOW(),
    actualizado_en TIMESTAMP DEFAULT NOW()
);

-- ===========================
-- TABLA: administradores
-- ===========================
CREATE TABLE administradores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    nivel INTEGER DEFAULT 1,
    creado_en TIMESTAMP DEFAULT NOW(),
    actualizado_en TIMESTAMP DEFAULT NOW()
);

-- ===========================
-- TABLA: carreras
-- ===========================
CREATE TABLE carreras (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chofer_id UUID NOT NULL REFERENCES choferes(id) ON DELETE SET NULL,
    gestor_id UUID REFERENCES gestores(id) ON DELETE SET NULL,
    origen TEXT NOT NULL,
    destino TEXT NOT NULL,
    precio NUMERIC(10,2) NOT NULL,
    estado estado_carrera DEFAULT 'pendiente',
    creado_en TIMESTAMP DEFAULT NOW(),
    actualizado_en TIMESTAMP DEFAULT NOW()
);

-- ===========================
-- TABLA: creditos
-- ===========================
CREATE TABLE creditos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    monto NUMERIC(10,2) NOT NULL,
    descripcion TEXT,
    creado_en TIMESTAMP DEFAULT NOW(),
    actualizado_en TIMESTAMP DEFAULT NOW()
);

-- ===========================
-- ÍNDICES
-- ===========================
CREATE INDEX idx_usuarios_telefono ON usuarios(telefono);
CREATE INDEX idx_carreras_estado ON carreras(estado);
CREATE INDEX idx_creditos_usuario ON creditos(usuario_id);

-- ===========================
-- TRIGGER: actualizar timestamp
-- ===========================
CREATE OR REPLACE FUNCTION actualizar_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.actualizado_en = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger a todas las tablas principales
CREATE TRIGGER trg_update_usuarios
BEFORE UPDATE ON usuarios
FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

CREATE TRIGGER trg_update_choferes
BEFORE UPDATE ON choferes
FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

CREATE TRIGGER trg_update_gestores
BEFORE UPDATE ON gestores
FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

CREATE TRIGGER trg_update_administradores
BEFORE UPDATE ON administradores
FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

CREATE TRIGGER trg_update_carreras
BEFORE UPDATE ON carreras
FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

CREATE TRIGGER trg_update_creditos
BEFORE UPDATE ON creditos
FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();
