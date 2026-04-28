# 🚀 Quick Start Guide - Landing Page

## ⚡ 3 Pasos para Empezar

### Paso 1: Abrir Terminal
```bash
cd c:\Users\RAFAEL_BOADA\Desktop\Tecnica_Programacion_2026\Tecnica_Programacion_2026
```

### Paso 2: Ejecutar
```bash
npm run dev
```

### Paso 3: Abrir en Navegador
```
http://localhost:5173
```

**¡Listo! Tu landing page está corriendo** 🎉

---

## 📱 Probar Responsividad

1. Abre DevTools: `F12` o `Ctrl + Shift + I`
2. Haz clic en el ícono móvil (responsive mode)
3. Prueba diferentes tamaños

---

## ✏️ Personalizar en 5 Minutos

### Cambiar Título Principal
**Archivo:** `src/components/sections/Hero.jsx` (línea 68)
```jsx
// Cambia:
"Técnica en Programación de Software"
// Por tu título
```

### Cambiar Información de Contacto
**Archivo:** `src/components/sections/Contacto.jsx` (línea 120+)
```jsx
"📍 Ubicación": "Tu ciudad",
"📞 Teléfono": "Tu teléfono",
"✉️ Email": "tu@email.com",
```

### Cambiar Color Principal
**Archivo:** `tailwind.config.js` (línea 6)
```javascript
neon: '#4ade80',        // Verde actual
neonSecondary: '#22c55e', // Verde secundario
```

---

## 📚 Documentos Importantes

| Documento | Para qué |
|-----------|----------|
| `README_LANDING.md` | Guía completa |
| `PERSONALIZACION_GUIA.md` | Mejoras avanzadas |
| `CHECKLIST_VERIFICACION.md` | Verificar todo |
| `VISTA_GENERAL.md` | Entender estructura |
| `INDICE_ARCHIVOS.md` | Mapa del proyecto |

---

## 🎯 Tareas Comunes

### Agregar una Imagen
```jsx
// En cualquier componente
<img 
  src="/tu-imagen.jpg" 
  alt="Descripción"
  className="w-full rounded-xl"
/>
```

### Cambiar un Texto
1. Busca el texto en los componentes
2. Edítalo directamente
3. Guarda el archivo
4. La app se actualiza automáticamente (HMR)

### Cambiar Colores
Edita `tailwind.config.js`:
```javascript
colors: {
  neon: '#tu-color-hex',
}
```

### Agregar Nueva Sección
1. Copia `src/components/sections/Sobre.jsx`
2. Renómbrala (ej: `Testimonios.jsx`)
3. Edita el contenido
4. Importa en `Home.jsx`
5. Agrega a navbar

---

## 🔧 Troubleshooting Rápido

| Problema | Solución |
|----------|----------|
| App no carga | `npm install` luego `npm run dev` |
| Puertos ocupados | `npm run dev -- --port 3000` |
| Estilos raros | Reinicia servidor (Ctrl+C, `npm run dev`) |
| Cambios no se ven | Refresca navegador (F5) |
| Error de módulos | Elimina `node_modules` e instala de nuevo |

---

## 📞 Contacto y Ayuda

### Para cambiar información:
- Edita archivos en `src/components/sections/`
- Busca los textos que quieres cambiar
- Guarda y ve los cambios en vivo

### Para agregar funcionalidad:
- Lee `PERSONALIZACION_GUIA.md`
- Hay ejemplos de código listos para copiar

### Para entender la estructura:
- Lee `INDICE_ARCHIVOS.md`
- Cada archivo tiene propósito claro

---

## ✨ Lo Que Tiene tu Landing Page

✅ Navbar sticky  
✅ 6 Secciones completas  
✅ Formulario de contacto  
✅ Animaciones profesionales  
✅ Diseño responsive  
✅ Dark mode moderno  
✅ Efectos glow neón  
✅ Código limpio  

---

## 🎬 Siguientes Pasos

1. **Ejecuta ahora:** `npm run dev`
2. **Personaliza:** Cambia textos e imágenes
3. **Prueba:** En móvil y desktop
4. **Publica:** Cuando esté listo

---

## 📊 Tu Landing Page Tiene

| Sección | Contenido |
|---------|-----------|
| Hero | Título, subtítulo, CTA, stats |
| Sobre | 6 cards con features |
| Niveles | 3 cards de años académicos |
| Malla | 12 materias a estudiar |
| Proyectos | 6 proyectos de estudiantes |
| Contacto | Formulario + info contacto |

---

## 🎨 Paleta Neón (Editable)

```
Fondo:     #0a0a0a (Negro profundo)
Secundario: #171717 (Gris)
Neón:      #4ade80 (Verde brillante)
Texto:     #ffffff (Blanco)
```

Cámbialos en `tailwind.config.js`

---

## 🚀 Deploying (Próximamente)

Cuando esté lista, puedes publicar en:
- **Vercel** (recomendado)
- **Netlify**
- **GitHub Pages**
- **Firebase Hosting**

---

## ❓ Preguntas Frecuentes

**¿Cómo cambio el logo?**
- Edita Navbar.jsx (línea 25-28)

**¿Cómo agrego más proyectos?**
- Edita la array en Proyectos.jsx

**¿Cómo envío emails reales?**
- Lee PERSONALIZACION_GUIA.md (EmailJS)

**¿Es responsivo?**
- Sí, 100% funcional en móvil

**¿Puedo agregar más secciones?**
- Sí, copia una existente y personaliza

---

## ⏱️ Tiempo de Ejecución

```
npm run dev    → 3-5 segundos
npm run build  → 10-15 segundos
npm run preview → 2 segundos
```

---

## 🎉 ¡Listo!

Tu landing page profesional está lista.

**Ejecuta:**
```bash
npm run dev
```

**Abre:**
```
http://localhost:5173
```

**¡Disfruta!** 🚀

---

**Última actualización:** 2024  
**Estado:** Producción-Ready  
**Versión:** 1.0.0
