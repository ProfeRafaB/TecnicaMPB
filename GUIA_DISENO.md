# 📋 GUÍA DE DISEÑO - Tecnica 2026

## 🎨 Paleta de Colores y Estructura

### Secciones por ID del Navbar:
```
1. #inicio    → Hero.jsx         (OSCURO)
2. #sobre     → Sobre.jsx        (BLANCO)
3. #niveles   → Niveles.jsx      (GRIS CLARO)
4. #malla     → Malla.jsx        (BLANCO)
5. #proyectos → Proyectos.jsx    (GRIS CLARO)
6. #contacto  → Contacto.jsx     (BLANCO)
```

---

## 🎯 ESTRUCTURA ESTÁNDAR PARA CADA COMPONENTE

### 📌 HERO (Oscuro - ya existe)
```jsx
<section id="inicio" className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 py-20 pt-20">
  {/* Contenido con texto blanco/gris claro */}
</section>
```

### 📌 SOBRE - NIVELES - MALLA - PROYECTOS - CONTACTO
**Template Estándar:**
```jsx
<section id="[id]" className="py-20 bg-[COLOR]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* HEADER */}
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Titulo</h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">Descripción</p>
    </div>

    {/* CONTENIDO */}
    {/* Cards, Grillas, Tablas, etc */}
  </div>
</section>
```

---

## 🎨 SCHEMA DE COLORES

| Sección | BG | Texto | Cards | Estado |
|---------|----|----|-----|--------|
| Hero | `from-gray-900 to-gray-800` | `text-white` | - | ✅ LISTO |
| Sobre | `bg-white` | `text-gray-900` | `bg-gray-50` | 🔧 MEJORAR |
| Niveles | `bg-gray-50` | `text-gray-900` | `bg-white` | 🔧 MEJORAR |
| Malla | `bg-white` | `text-gray-900` | `bg-gray-50` | 🔧 MEJORAR |
| Proyectos | `bg-gray-50` | `text-gray-900` | `bg-white` | 🔧 MEJORAR |
| Contacto | `bg-white` | `text-gray-900` | `bg-gray-50` | 🔧 MEJORAR |

---

## 📐 COMPONENTES REUTILIZABLES

### Card Estándar
```jsx
<div className="p-6 bg-[BG-CARD] rounded-lg hover:shadow-lg transition">
  <h3 className="text-xl font-semibold text-gray-900 mb-3">Título</h3>
  <p className="text-gray-600">Descripción</p>
</div>
```

### Heading Estándar
```jsx
<div className="text-center mb-16">
  <h2 className="text-4xl font-bold text-gray-900 mb-4">Título</h2>
  <p className="text-xl text-gray-600 max-w-3xl mx-auto">Subtítulo</p>
</div>
```

### Grid Estándar
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* Cards */}
</div>
```

---

## ✨ ANIMACIONES GLOBALES

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

---

## 🔧 CHECKLIST PARA CADA COMPONENTE

- [ ] ID correcto en `<section>`
- [ ] Color de fondo correcto
- [ ] Heading con título y descripción
- [ ] Grid layout responsive (1 → md:2 → lg:3)
- [ ] Padding estándar `py-20`
- [ ] Max-width `max-w-7xl`
- [ ] Gap consistente `gap-8`
- [ ] Hover effects en cards
- [ ] Texto con colores correctos
- [ ] Mobile responsive

---

## 🎯 PRIORIDAD DE CAMBIOS

1. **Sobre.jsx** - Agregar animaciones fadeInUp
2. **Niveles.jsx** - Mejorar card styles y agregar animaciones
3. **Malla.jsx** - Completar estructura de tabla
4. **Proyectos.jsx** - Completar cards con tecnologías
5. **Contacto.jsx** - Agregar validación y styling
6. **Footer.jsx** - Crear nuevo componente oscuro

---

**Nota:** Cuando modifiques un componente, mantén esta estructura y avísame si necesitas ajustes.
