# PeKeys Store — Frontend

Tienda de videojuegos digitales construida con **React + Vite**. Repositorio independiente que consume una API REST externa (ver repositorio `PW-Back`).

## Tecnologías

- **Framework:** React 19
- **Bundler:** Vite 8
- **Routing:** React Router DOM v7
- **HTTP:** Fetch API nativa (sin Axios ni librerías extra)
- **Estilos:** CSS Variables + Vanilla CSS

## Estructura del proyecto

```
PWProyecto/
├── src/
│   ├── App.jsx                   # Raíz: carga juegos desde API, maneja sesión y carrito
│   ├── services/
│   │   └── api.js                # Capa de servicio centralizada (todas las llamadas HTTP)
│   ├── components/
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── Home.jsx              # Hero carousel + grid de juegos del backend
│   │   ├── Catalog.jsx           # Catálogo con filtros (datos del backend)
│   │   ├── GameDetails.jsx       # Detalle de producto
│   │   ├── Login.jsx             # Autenticación contra POST /api/auth/login
│   │   ├── Admin.jsx             # CRUD de juegos vía API (solo rol admin)
│   │   ├── Cart.jsx              # Carrito + checkout vía POST /api/checkout
│   │   ├── Library.jsx           # Biblioteca de product keys adquiridas
│   │   └── Toast.jsx             # Notificación al agregar al carrito
│   ├── mocks/
│   │   └── games.js              # (Legacy — ya no se usa, reemplazado por la API)
│   └── assets/                   # Logos de plataformas
├── .env.local                    # VITE_API_URL (no se sube al repo)
├── .env.example
└── package.json
```

## Instalación y uso

```bash
# 1. Instalar dependencias
npm install

# 2. Crear archivo de entorno
cp .env.example .env.local
# o crear manualmente .env.local con:
# VITE_API_URL=http://localhost:3000/api

# 3. Iniciar el servidor de desarrollo
npm run dev

# La app queda disponible en:
# http://localhost:5173
```

> ⚠️ **Importante:** El backend (`PW-Back`) debe estar corriendo en `http://localhost:3000` antes de abrir la app. Si no, aparecerá un banner de error de conexión.

## Variables de entorno

| Variable | Valor por defecto | Descripción |
|----------|------------------|-------------|
| `VITE_API_URL` | `http://localhost:3000/api` | URL base del backend |

## Funcionalidades conectadas al backend

| Página | Endpoint consumido |
|--------|--------------------|
| **Home / Catálogo** | `GET /api/games` |
| **Detalle de juego** | Datos del array cargado en App.jsx |
| **Login** | `POST /api/auth/login` |
| **Panel Admin** | `POST`, `PUT`, `DELETE /api/games` |
| **Checkout** | `POST /api/checkout` |

## Usuarios de prueba

| Email | Contraseña | Acceso |
|-------|-----------|--------|
| admin@pekeys.com | admin123 | Panel Admin + toda la app |
| usuario1@pekeys.com | pass123 | Carrito + Biblioteca |

## Scripts disponibles

```bash
npm run dev      # Servidor de desarrollo con HMR
npm run build    # Build de producción en /dist
npm run preview  # Vista previa del build de producción
npm run lint     # ESLint
```
