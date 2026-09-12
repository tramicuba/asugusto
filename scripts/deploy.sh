#!/bin/bash
# scripts/deploy.sh
# Script de despliegue para AsuGusto

echo "🚀 Iniciando despliegue de AsuGusto..."

# ============================
# 1. Verificar dependencias
# ============================
command -v supabase >/dev/null 2>&1 || {
  echo "❌ Supabase CLI no está instalado. Instálalo con: npm i -g supabase";
  exit 1;
}

command -v npm >/dev/null 2>&1 || {
  echo "❌ npm no está instalado.";
  exit 1;
}

# ============================
# 2. Verificar variables de entorno
# ============================
if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_ANON_KEY" ]; then
  echo "❌ Variables de entorno faltantes. Revisa tu archivo .env";
  exit 1;
fi

echo "✔ Variables de entorno cargadas"

# ============================
# 3. Construir proyecto
# ============================
echo "📦 Construyendo proyecto..."
npm run build || {
  echo "❌ Error durante el build";
  exit 1;
}

echo "✔ Build completado"

# ============================
# 4. Aplicar migraciones SQL
# ============================
echo "🗄 Aplicando schema.sql..."
supabase db push --file ./database/schema.sql || {
  echo "❌ Error aplicando schema.sql";
  exit 1;
}

echo "✔ Migraciones aplicadas"

# ============================
# 5. Insertar datos iniciales
# ============================
echo "🌱 Insertando seed.sql..."
supabase db push --file ./database/seed.sql || {
  echo "❌ Error aplicando seed.sql";
  exit 1;
}

echo "✔ Seed insertado"

# ============================
# 6. Sincronizar políticas y funciones
# ============================
echo "🔐 Aplicando policies.sql..."
supabase db push --file ./supabase/policies.sql || {
  echo "❌ Error aplicando policies.sql";
  exit 1;
}

echo "⚙ Aplicando functions.sql..."
supabase db push --file ./supabase/functions.sql || {
  echo "❌ Error aplicando functions.sql";
  exit 1;
}

echo "✔ Políticas y funciones sincronizadas"

# ============================
# 7. Limpieza final
# ============================
echo "🧹 Limpiando caché..."
rm -rf .cache dist/.cache 2>/dev/null

echo "✨ Despliegue completado exitosamente"
