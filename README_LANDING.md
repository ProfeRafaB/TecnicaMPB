# 🚀 Landing Page - Técnica en Programación de Software

Una landing page moderna, profesional y completamente responsive para la Técnica en Programación de Software, desarrollada con React, Vite, Tailwind CSS y Anime.js.

## ✨ Características

- **Diseño Moderno** - Estética tipo startup tecnológica (Apple + Stripe + academias tech)
- **Animaciones Avanzadas** - Anime.js para transiciones suaves y efectos profesionales
- **100% Responsive** - Optimizado para desktop, tablet y móvil
- **Paleta Neón** - Negro profundo (#0a0a0a) + Verde neón (#4ade80)
- **Código Limpio** - Componentes modulares y reutilizables
- **Performance** - Optimizado con Vite para máxima velocidad

## 📋 Secciones Incluidas

1. **Navbar Sticky** - Navegación fija con efectos scroll
2. **Hero Section** - Título impactante, CTA y animaciones de entrada
3. **Sobre la Técnica** - Features y habilidades a adquirir
4. **Niveles/Años** - Grado 10, Grado 11, Etapa Productiva
5. **Malla Curricular** - 12 materias con diseño moderno
6. **Proyectos** - Portfolio de trabajos de estudiantes
7. **Contacto** - Formulario y redes sociales
8. **Footer** - Enlaces y copyright

## 🎨 Animaciones Implementadas

✅ **Fade-in y Slide-up** - Elementos aparecen suavemente al cargar
✅ **Scroll Reveal** - Animaciones al hacer scroll (IntersectionObserver)
✅ **Hover Effects** - Cards con efectos de escala y glow
✅ **Stagger Animations** - Elementos aparecen en secuencia
✅ **Floating Elements** - Partículas animadas en hero
✅ **Grid Animations** - Fondo técnico con efectos

## 🛠️ Tecnologías

```
React 19.2.5
Vite 8.0.9
Tailwind CSS 4.2.4
Anime.js 4.3.6
React Router 7.14.2
```

## 🚀 Instalación y Ejecución

### 1. Instalar dependencias
```bash
npm install
```

### 2. Ejecutar servidor de desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`

### 3. Build para producción
```bash
npm run build
```

### 4. Preview de producción
```bash
npm run preview
```

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx      (Navegación principal)
│   │   └── Footer.jsx      (Pie de página)
│   └── sections/
│       ├── Hero.jsx        (Sección de inicio)
│       ├── Sobre.jsx       (Sobre la técnica)
│       ├── Niveles.jsx     (Niveles académicos)
│       ├── Malla.jsx       (Malla curricular)
│       ├── Proyectos.jsx   (Portfolio)
│       └── Contacto.jsx    (Formulario y contacto)
├── pages/
│   └── Home.jsx            (Página principal)
├── routes/
│   └── AppRouter.jsx       (Configuración de rutas)
├── App.jsx                 (Componente raíz)
├── main.jsx                (Entrada de la app)
└── index.css               (Estilos globales)
```

## 🎯 Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Negro Profundo | #0a0a0a | Fondo principal |
| Gris Oscuro | #171717 | Fondos secundarios |
| Verde Neón | #4ade80 | Elementos de énfasis |
| Verde Secundario | #22c55e | Accents y hovers |
| Blanco | #ffffff | Textos principales |

## 🎬 Personalizaciones

### Cambiar Colores
Edita `tailwind.config.js`:
```javascript
colors: {
  darkBg: '#0a0a0a',
  darkSecondary: '#171717',
  neon: '#4ade80',
  neonSecondary: '#22c55e',
}
```

### Modificar Contenido
- **Textos**: Edita las secciones en `src/components/sections/`
- **Imágenes**: Agrega en `src/assets/` e importa
- **Contacto**: Actualiza emails y teléfonos en `Contacto.jsx`
- **Redes Sociales**: Modifica URLs en `Footer.jsx`

### Agregar Nuevas Secciones
1. Crea componente en `src/components/sections/`
2. Importa en `Home.jsx`
3. Agrega a la lista de navegación en `Navbar.jsx`

## 📱 Responsive Design

- **Desktop** (1024px+) - Layout completo con múltiples columnas
- **Tablet** (640px - 1023px) - Layout adaptado
- **Mobile** (< 640px) - Menu hamburguesa y diseño single-column

## ⚡ Performance Tips

- Las imágenes se cargan lazy loading
- Animaciones optimizadas con Anime.js
- Tailwind CSS purga estilos no usados en build
- Vite ofrece HMR (Hot Module Replacement)

## 🔧 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Construye para producción |
| `npm run preview` | Vista previa de producción |
| `npm run lint` | Verifica código con ESLint |

## 📞 Contacto y Soporte

Para editar información de contacto, actualiza:
- `src/components/sections/Contacto.jsx` - Teléfono, email, ubicación
- `src/components/layout/Footer.jsx` - Redes sociales y links

## 📄 Licencia

Este proyecto es de código abierto y puede ser usado libremente.

---

**Desarrollado con ❤️ usando React, Tailwind CSS y Anime.js**
