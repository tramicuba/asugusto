#!/bin/bash
# scripts/build.sh
# Script de construcción para AsuGusto

echo "🔧 Iniciando proceso de build..."

# ============================
# 1. Verificar dependencias
# ============================
command -v npm >/dev/null 2>&1 || {
  echo "❌ npm no está instalado.";
  exit 1;
}

command -v node >/dev/null 2>&1 || {
  echo "❌ Node.js no está instalado.";
  exit 1;
}

echo "✔ Dependencias verificadas"

# ============================
# 2. Limpiar build anterior
# ============================
echo "🧹 Limpiando carpeta dist..."
rm -rf dist 2>/dev/null
mkdir dist

echo "✔ Limpieza completada"

# ============================
# 3. Instalar dependencias
# ============================
echo "📦 Instalando dependencias..."
npm install || {
  echo "❌ Error instalando dependencias";
  exit 1;
}

echo "✔ Dependencias instaladas"

# ============================
# 4. Ejecutar build
# ============================
echo "🏗 Ejecutando build..."
npm run build || {
  echo "❌ Error durante el build";
  exit 1;
}

echo "✔ Build generado correctamente"

# ============================
# 5. Optimizar archivos
# ============================
echo "⚙ Optimizando archivos..."
find dist -type f -name "*.js" -exec gzip -k {} \;
find dist -type f -name "*.css" -exec gzip -k {} \;

echo "✔ Optimización completada"

# ============================
# 6. Resultado final
# ============================
echo "✨ Build final listo en /dist"
echo "🚀 Puedes proceder al despliegue con scripts/deploy.sh"
