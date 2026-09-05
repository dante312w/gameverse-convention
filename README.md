# GameVerse Convention

Aplicación web de una convención de videojuegos, desarrollada como proyecto académico de Ingeniería de Software. Sin backend: toda la persistencia de datos se maneja con LocalStorage.

## Stack

- React + Vite
- Tailwind CSS 4
- React Router
- Lucide React (iconos)

## Instalación

```bash
npm install
npm run dev
```

## Estructura

```
src/
├── components/   # Componentes reutilizables (layout, comunes)
├── pages/        # Páginas de la aplicación
├── hooks/        # Hooks personalizados
├── services/     # Servicios de acceso a datos (LocalStorage)
├── data/         # Datos semilla iniciales
├── routes/       # Definición de rutas
└── App.jsx
```

## Módulos

- **Home**: landing page con hero, countdown, categorías, destacados y estadísticas.
- **Videojuegos**: CRUD completo 
- **Torneos**: CRUD completo, relacionado con Videojuegos 
