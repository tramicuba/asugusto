# 📁 Estructura del Proyecto — AsuGusto

Este documento describe la estructura completa del proyecto **AsuGusto**, explicando la función de cada carpeta y archivo para facilitar el desarrollo, mantenimiento y escalabilidad del sistema.

---

## 🧱 1. Arquitectura General

AsuGusto está organizado en una arquitectura modular:

- **Frontend + lógica interna**
- **APIs internas**
- **Servicios externos (Supabase)**
- **Base de datos**
- **Documentación**
- **Scripts de despliegue**
- **Pruebas automatizadas**

---

## 📂 2. Estructura de Carpetas
asugusto/
│
├── api/
│   ├── index.js
│   ├── creditos.js
│   └── carreras.js
│
├── config/
│   ├── env.example
│   └── supabase-config.js
│
├── database/
│   ├── schema.sql
│   └── seed.sql
│
├── docs/
│   ├── estructura.md
│   └── api.md
│
├── hooks/
│   ├── useAuth.js
│   └── useSupabase.js
│
├── lib/
│   ├── logger.js
│   └── permissions.js
│
├── public/
│   ├── favicon.ico
│   └── manifest.json
│
├── styles/
│   ├── global.css
│   ├── dashboard.css
│   └── login.css
│
├── scripts/
│   ├── deploy.sh
│   └── build.sh
│
├── supabase/
│   ├── policies.sql
│   └── functions.sql
│
└── tests/
├── auth.test.js
└── creditos.test.js

---

## 🔧 3. Descripción de Carpetas

### **api/**
Contiene las APIs internas del proyecto.  
No son endpoints públicos, sino módulos que centralizan la lógica de datos.

- `index.js` → Router interno  
- `creditos.js` → CRUD de créditos  
- `carreras.js` → CRUD de carreras  

---

### **config/**
Variables de entorno y configuración global.

- `env.example` → Plantilla para `.env`  
- `supabase-config.js` → Configuración centralizada de Supabase  

---

### **database/**
Base de datos del sistema.

- `schema.sql` → Estructura completa de tablas  
- `seed.sql` → Datos iniciales para pruebas  

---

### **docs/**
Documentación oficial del proyecto.

- `estructura.md` → Este documento  
- `api.md` → Documentación de las APIs internas  

---

### **hooks/**
Hooks reutilizables para autenticación y Supabase.

- `useAuth.js` → Manejo de sesión  
- `useSupabase.js` → Cliente centralizado de Supabase  

---

### **lib/**
Librerías internas.

- `logger.js` → Sistema de logs  
- `permissions.js` → Control de permisos por rol  

---

### **public/**
Archivos públicos del proyecto.

- `favicon.ico`  
- `manifest.json`  

---

### **styles/**
Estilos globales y específicos.

- `global.css`  
- `dashboard.css`  
- `login.css`  

---

### **scripts/**
Scripts de automatización.

- `deploy.sh` → Despliegue  
- `build.sh` → Construcción del proyecto  

---

### **supabase/**
Configuración avanzada de Supabase.

- `policies.sql` → Políticas RLS  
- `functions.sql` → Funciones SQL  

---

### **tests/**
Pruebas automatizadas.

- `auth.test.js`  
- `creditos.test.js`  

---

## 🔄 4. Flujo Interno del Proyecto

1. **Frontend** llama a módulos internos.  
2. Los módulos internos usan **API interna**.  
3. La API interna usa **Supabase**.  
4. Supabase ejecuta **policies**, **functions** y **triggers**.  
5. La base de datos responde.  
6. El frontend actualiza la UI.

---

## 🧪 5. Pruebas

Las pruebas se ejecutan sobre:

- Autenticación  
- Créditos  
- Carreras  
- Permisos  

---

## 🏁 6. Conclusión

Esta estructura permite:

- Escalabilidad  
- Mantenimiento sencillo  
- Separación clara de responsabilidades  
- Integración limpia con Supabase  
- Documentación profesional  

