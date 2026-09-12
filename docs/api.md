# 📘 Documentación de APIs Internas — AsuGusto

Este documento describe las **APIs internas** del proyecto AsuGusto.  
Estas APIs no son endpoints públicos, sino módulos JavaScript que centralizan la lógica de acceso a datos y se comunican con Supabase.

---

## 🧱 1. Arquitectura de las APIs

Las APIs internas están organizadas en módulos dentro de la carpeta:

/api

Cada módulo representa una entidad del sistema:

- `creditos.js` → Gestión de créditos  
- `carreras.js` → Gestión de carreras  
- `index.js` → Router interno que agrupa todas las APIs  

Las APIs se conectan con Supabase mediante el cliente centralizado ubicado en:

/services/supabase.js

---

## 📂 2. Estructura de la Carpeta API

api/
│
├── index.js
├── creditos.js
└── carreras.js

---

## 🔌 3. api/index.js — Router Interno

Este archivo centraliza todas las APIs internas:

```js
import * as creditosAPI from "./creditos.js";
import * as carrerasAPI from "./carreras.js";

export const API = {
    creditos: creditosAPI,
    carreras: carrerasAPI
};
Uso:
API.creditos.obtenerCreditos();
API.carreras.crearCarrera();
4. API de Créditos — creditos.js
Este módulo maneja el CRUD de créditos.

Funciones disponibles:
📄 Obtener créditos
obtenerCreditos()
➕ Crear crédito
crearCredito(credito)
✏️ Actualizar crédito
actualizarCredito(id, cambios)
❌ Eliminar crédito
eliminarCredito(id)
Tabla relacionada:
creditos
🚕 5. API de Carreras — carreras.js
Este módulo maneja el CRUD de carreras.

Funciones disponibles:
📄 Obtener carreras
obtenerCarreras()
➕ Crear carrera
crearCarrera(carrera)
✏️ Actualizar carrera
actualizarCarrera(id, cambios)
❌ Eliminar carrera
eliminarCarrera(id)
Tabla relacionada:
carreras
🗄️ 6. Conexión con Supabase
services/supabase.js
Ejemplo:
const { data, error } = await supabase
    .from("creditos")
    .select("*");
🔐 7. Seguridad y Políticas
supabase/policies.sql
Estas políticas determinan:

Qué usuarios pueden leer datos

Qué usuarios pueden escribir

Qué roles tienen permisos especiales
8. Pruebas de APIs
Las pruebas se encuentran en:
tests/
Incluyen:

auth.test.js

creditos.test.js
🏁 9. Conclusión
Las APIs internas de AsuGusto:

Son modulares

Son fáciles de extender

Están integradas con Supabase

Mantienen consistencia en toda la aplicación

Permiten un desarrollo rápido y ordenado

---

# 🟦 Siguiente archivo según tu orden  
### **#10 → [hooks/useAuth.js](ca://s?q=Generar_contenido_para_useAuth_js)**