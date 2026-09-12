-- ============================================================
-- POLÍTICAS DE SEGURIDAD (RLS) PARA ASUGUSTO
-- ============================================================

-- ===========================
-- ACTIVAR RLS EN TODAS LAS TABLAS
-- ===========================
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE choferes ENABLE ROW LEVEL SECURITY;
ALTER TABLE gestores ENABLE ROW LEVEL SECURITY;
ALTER TABLE administradores ENABLE ROW LEVEL SECURITY;
ALTER TABLE carreras ENABLE ROW LEVEL SECURITY;
ALTER TABLE creditos ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- TABLA: usuarios
-- ============================================================

-- Lectura: administradores y gestores pueden ver todos
CREATE POLICY usuarios_select_admin_gestor
ON usuarios FOR SELECT
USING (auth.jwt() ->> 'role' IN ('administrador', 'gestor'));

-- Lectura: chofer solo puede verse a sí mismo
CREATE POLICY usuarios_select_chofer
ON usuarios FOR SELECT
USING (auth.uid() = id);

-- Escritura: solo administradores
CREATE POLICY usuarios_update_admin
ON usuarios FOR UPDATE
USING (auth.jwt() ->> 'role' = 'administrador');

-- ============================================================
-- TABLA: choferes
-- ============================================================

-- Lectura: chofer solo puede ver su propio registro
CREATE POLICY choferes_select_chofer
ON choferes FOR SELECT
USING (usuario_id = auth.uid());

-- Lectura: gestores y administradores pueden ver todos
CREATE POLICY choferes_select_admin_gestor
ON choferes FOR SELECT
USING (auth.jwt() ->> 'role' IN ('administrador', 'gestor'));

-- Escritura: solo administradores
CREATE POLICY choferes_update_admin
ON choferes FOR UPDATE
USING (auth.jwt() ->> 'role' = 'administrador');

-- ============================================================
-- TABLA: gestores
-- ============================================================

-- Lectura: gestor solo puede ver su propio registro
CREATE POLICY gestores_select_gestor
ON gestores FOR SELECT
USING (usuario_id = auth.uid());

-- Lectura: administradores pueden ver todos
CREATE POLICY gestores_select_admin
ON gestores FOR SELECT
USING (auth.jwt() ->> 'role' = 'administrador');

-- Escritura: solo administradores
CREATE POLICY gestores_update_admin
ON gestores FOR UPDATE
USING (auth.jwt() ->> 'role' = 'administrador');

-- ============================================================
-- TABLA: administradores
-- ============================================================

-- Lectura: solo administradores
CREATE POLICY administradores_select_admin
ON administradores FOR SELECT
USING (auth.jwt() ->> 'role' = 'administrador');

-- Escritura: solo administradores
CREATE POLICY administradores_update_admin
ON administradores FOR UPDATE
USING (auth.jwt() ->> 'role' = 'administrador');

-- ============================================================
-- TABLA: carreras
-- ============================================================

-- Lectura: chofer solo ve sus carreras
CREATE POLICY carreras_select_chofer
ON carreras FOR SELECT
USING (chofer_id IN (SELECT id FROM choferes WHERE usuario_id = auth.uid()));

-- Lectura: gestor ve carreras de su zona
CREATE POLICY carreras_select_gestor
ON carreras FOR SELECT
USING (gestor_id IN (SELECT id FROM gestores WHERE usuario_id = auth.uid()));

-- Lectura: administrador ve todo
CREATE POLICY carreras_select_admin
ON carreras FOR SELECT
USING (auth.jwt() ->> 'role' = 'administrador');

-- Escritura: chofer puede actualizar estado de su carrera
CREATE POLICY carreras_update_chofer
ON carreras FOR UPDATE
USING (chofer_id IN (SELECT id FROM choferes WHERE usuario_id = auth.uid()));

-- Escritura: gestor puede crear y actualizar carreras
CREATE POLICY carreras_insert_update_gestor
ON carreras FOR INSERT TO PUBLIC
WITH CHECK (auth.jwt() ->> 'role' = 'gestor');

CREATE POLICY carreras_update_gestor
ON carreras FOR UPDATE
USING (auth.jwt() ->> 'role' = 'gestor');

-- Escritura: administrador puede todo
CREATE POLICY carreras_admin_full
ON carreras FOR ALL
USING (auth.jwt() ->> 'role' = 'administrador');

-- ============================================================
-- TABLA: creditos
-- ============================================================

-- Lectura: chofer solo ve sus créditos
CREATE POLICY creditos_select_chofer
ON creditos FOR SELECT
USING (usuario_id = auth.uid());

-- Lectura: gestor ve créditos de choferes de su zona
CREATE POLICY creditos_select_gestor
ON creditos FOR SELECT
USING (
    auth.jwt() ->> 'role' = 'gestor'
);

-- Lectura: administrador ve todo
CREATE POLICY creditos_select_admin
ON creditos FOR SELECT
USING (auth.jwt() ->> 'role' = 'administrador');

-- Escritura: solo administradores
CREATE POLICY creditos_update_admin
ON creditos FOR UPDATE
USING (auth.jwt() ->> 'role' = 'administrador');

CREATE POLICY creditos_insert_admin
ON creditos FOR INSERT
WITH CHECK (auth.jwt() ->> 'role' = 'administrador');
