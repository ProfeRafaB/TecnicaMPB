import { useRef } from 'react';
import { motion } from 'framer-motion';
import ShinyText from '../ShinyText ';
import { ProjectCard } from '../3d/ProjectCard';

// ─── Design tokens ──────────────────────────────────────────────────────────
const COLORS = {
  white: "#ffffff",
  black: "#000000",
  gray: "#f5f5f5",
  darkGray: "#333333",
  bg: "#120F17",
  bgCard: "#17131E",
  bgCardHover: "rgba(255,255,255,0.06)",
  border: "rgba(255,255,255,0.15)",
  borderDefault: "rgba(255,255,255,0.15)",
  borderHover: "rgba(255,255,255,0.35)",
  muted: "rgba(255,255,255,0.45)",
  mutedLo: "rgba(255,255,255,0.25)",
};

// ─── Proyectos Data with Full Details ─────────────────────────────────────────────────────────
const PROYECTOS = [
  {
    id: 1,
    titulo: "Landing Page Interactiva",
    descripcion: "Página de bienvenida con animaciones 3D y efectos visuales avanzados",
    descripcionCompleta: "Landing page revolucionaria con animaciones 3D usando React Three Fiber, efectos de parallax, scroll triggers y diseño totalmente responsivo. Incluye hero section dinámica, componentes interactivos y galería de proyectos con efectos visuales premium.",
    imagen: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800&h=600&fit=crop",
    tecnologias: ["React", "Three.js", "Tailwind CSS", "Framer Motion", "Vite"],
    color: COLORS.white,
    estado: "Completado",
    fechaInicio: "Enero 2026",
    duracion: "6 semanas",
    progreso: 100,
    integrantes: [
      { nombre: "Juan Pérez", rol: "Lead Developer" },
      { nombre: "María García", rol: "UI/UX Designer" },
      { nombre: "Carlos López", rol: "Backend Dev" },
      { nombre: "Ana Rodríguez", rol: "QA Engineer" }
    ],
    links: [
      { nombre: "GitHub", url: "#", icono: "💻" },
      { nombre: "Demo", url: "#", icono: "🚀" },
      { nombre: "Figma", url: "#", icono: "🎨" }
    ],
    metricas: [
      { nombre: "Performance", valor: 95 },
      { nombre: "Accessibility", valor: 88 },
      { nombre: "Best Practices", valor: 92 }
    ]
  },
  {
    id: 2,
    titulo: "Dashboard de Análisis",
    descripcion: "Sistema de análisis de datos en tiempo real con gráficas interactivas",
    descripcionCompleta: "Dashboard profesional con visualización de datos en tiempo real, gráficas interactivas con Chart.js, filtros avanzados y exportación de reportes. Integración con múltiples fuentes de datos y estadísticas en vivo.",
    imagen: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop",
    tecnologias: ["React", "Chart.js", "Node.js", "PostgreSQL", "WebSocket"],
    color: COLORS.black,
    estado: "En desarrollo",
    fechaInicio: "Febrero 2026",
    duracion: "8 semanas",
    progreso: 65,
    integrantes: [
      { nombre: "David Chen", rol: "Full Stack Dev" },
      { nombre: "Sofia Martínez", rol: "Data Analyst" },
      { nombre: "Miguel Torres", rol: "DevOps Engineer" }
    ],
    links: [
      { nombre: "GitHub", url: "#", icono: "💻" },
      { nombre: "Documentación", url: "#", icono: "📖" }
    ],
    metricas: [
      { nombre: "Data Processing", valor: 80 },
      { nombre: "API Response Time", valor: 92 },
      { nombre: "Code Coverage", valor: 75 }
    ]
  },
  {
    id: 3,
    titulo: "E-Commerce Platform",
    descripcion: "Plataforma de comercio electrónico completa con carrito y pagos",
    descripcionCompleta: "Plataforma e-commerce de nivel empresarial con catálogo de productos, carrito de compras, sistema de pagos integrado con Stripe/PayPal, gestión de inventario, panel administrativo y seguimiento de órdenes.",
    imagen: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&h=600&fit=crop",
    tecnologias: ["React", "Express", "MongoDB", "Stripe API", "AWS S3"],
    color: COLORS.white,
    estado: "Completado",
    fechaInicio: "Diciembre 2025",
    duracion: "10 semanas",
    progreso: 100,
    integrantes: [
      { nombre: "Lucas Fernández", rol: "Frontend Lead" },
      { nombre: "Isabella Rossi", rol: "Backend Lead" },
      { nombre: "Alex Kumar", rol: "DevOps" },
      { nombre: "Emma White", rol: "Product Manager" },
      { nombre: "James Brown", rol: "QA Lead" }
    ],
    links: [
      { nombre: "GitHub", url: "#", icono: "💻" },
      { nombre: "Demo en Vivo", url: "#", icono: "🌐" },
      { nombre: "API Docs", url: "#", icono: "📚" }
    ],
    metricas: [
      { nombre: "Performance", valor: 98 },
      { nombre: "Seguridad", valor: 96 },
      { nombre: "Uptime", valor: 99.9 }
    ]
  },
  {
    id: 4,
    titulo: "App de Productividad",
    descripcion: "Aplicación móvil para gestión de tareas con sincronización nube",
    descripcionCompleta: "App nativa multiplataforma para gestión de tareas con sincronización en tiempo real con Firebase, categorización inteligente, recordatorios, colaboración en equipo y análisis de productividad.",
    imagen: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    tecnologias: ["React Native", "Firebase", "Redux", "Expo", "TypeScript"],
    color: COLORS.black,
    estado: "En desarrollo",
    fechaInicio: "Marzo 2026",
    duracion: "12 semanas",
    progreso: 45,
    integrantes: [
      { nombre: "Priya Singh", rol: "Mobile Lead" },
      { nombre: "Marco Rossi", rol: "Backend Dev" },
      { nombre: "Lisa Wong", rol: "UI Designer" }
    ],
    links: [
      { nombre: "GitHub", url: "#", icono: "💻" },
      { nombre: "TestFlight", url: "#", icono: "📱" }
    ],
    metricas: [
      { nombre: "App Performance", valor: 85 },
      { nombre: "User Experience", valor: 79 },
      { nombre: "Battery Usage", valor: 88 }
    ]
  },
  {
    id: 5,
    titulo: "Sistema de Chat",
    descripcion: "Plataforma de mensajería en tiempo real con salas y notificaciones",
    descripcionCompleta: "Sistema de chat con soporte para mensajería directa, salas de grupo, notificaciones push, typing indicators, historial persistente y soporte para multimedia (imágenes, archivos).",
    imagen: "https://images.unsplash.com/photo-1611925591517-40b6d4fefbf7?w=800&h=600&fit=crop",
    tecnologias: ["WebSocket", "React", "Node.js", "Socket.io", "MongoDB"],
    color: COLORS.white,
    estado: "Completado",
    fechaInicio: "Noviembre 2025",
    duracion: "7 semanas",
    progreso: 100,
    integrantes: [
      { nombre: "Raj Patel", rol: "Full Stack Dev" },
      { nombre: "Nina Müller", rol: "Frontend Dev" },
      { nombre: "Oscar García", rol: "DevOps Engineer" }
    ],
    links: [
      { nombre: "GitHub", url: "#", icono: "💻" },
      { nombre: "Live Demo", url: "#", icono: "🌐" },
      { nombre: "Documentación API", url: "#", icono: "📖" }
    ],
    metricas: [
      { nombre: "Latencia de Mensajes", valor: 97 },
      { nombre: "Disponibilidad", valor: 99.8 },
      { nombre: "Satisfacción de Usuarios", valor: 94 }
    ]
  },
  {
    id: 6,
    titulo: "Generador de Portafolios",
    descripcion: "Herramienta para crear portafolios profesionales sin código",
    descripcionCompleta: "Generador drag-and-drop de portafolios con múltiples plantillas premium, editor visual en tiempo real, integración con Figma para diseños importados, hosting automático y SEO optimizado.",
    imagen: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    tecnologias: ["React", "Figma API", "Strapi", "Next.js", "Vercel"],
    color: COLORS.black,
    estado: "En desarrollo",
    fechaInicio: "Abril 2026",
    duracion: "9 semanas",
    progreso: 55,
    integrantes: [
      { nombre: "Yuki Tanaka", rol: "Frontend Architect" },
      { nombre: "Emma Johnson", rol: "Designer" },
      { nombre: "Liam O'Brien", rol: "Backend Dev" },
      { nombre: "Zara Khan", rol: "Product Designer" }
    ],
    links: [
      { nombre: "GitHub", url: "#", icono: "💻" },
      { nombre: "Beta", url: "#", icono: "🎯" }
    ],
    metricas: [
      { nombre: "Ease of Use", valor: 82 },
      { nombre: "Template Library", valor: 70 },
      { nombre: "Performance", valor: 91 }
    ]
  },
  {
    id: 7,
    titulo: "API REST Escalable",
    descripcion: "Backend robusto con autenticación, validación y documentación Swagger",
    descripcionCompleta: "API RESTful de producción con autenticación JWT, validación de datos, rate limiting, caching con Redis, documentación Swagger completa, tests unitarios exhaustivos y CI/CD pipeline.",
    imagen: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
    tecnologias: ["Node.js", "Express", "PostgreSQL", "Redis", "Docker"],
    color: COLORS.white,
    estado: "Completado",
    fechaInicio: "Octubre 2025",
    duracion: "8 semanas",
    progreso: 100,
    integrantes: [
      { nombre: "Viktor Petrov", rol: "Backend Architect" },
      { nombre: "Chen Wei", rol: "Database Admin" },
      { nombre: "Sandra López", rol: "DevOps Lead" }
    ],
    links: [
      { nombre: "GitHub", url: "#", icono: "💻" },
      { nombre: "API Docs", url: "#", icono: "📚" },
      { nombre: "Swagger UI", url: "#", icono: "🔍" }
    ],
    metricas: [
      { nombre: "Uptime", valor: 99.95 },
      { nombre: "Test Coverage", valor: 94 },
      { nombre: "API Response Time", valor: 96 }
    ]
  },
  {
    id: 8,
    titulo: "Plataforma de Cursos",
    descripcion: "LMS completo con videos, quiz, certificados y seguimiento",
    descripcionCompleta: "Plataforma de Learning Management System con reproductor de video adaptativo, cuestionarios interactivos, certificados digitales, seguimiento de progreso del estudiante, foros de discusión y análisis de aprendizaje.",
    imagen: "https://images.unsplash.com/photo-1516534775068-bb4e360b5f5f?w=800&h=600&fit=crop",
    tecnologias: ["React", "Django", "Redis", "PostgreSQL", "AWS Lambda"],
    color: COLORS.black,
    estado: "En desarrollo",
    fechaInicio: "Mayo 2026",
    duracion: "14 semanas",
    progreso: 38,
    integrantes: [
      { nombre: "Professor André", rol: "Product Lead" },
      { nombre: "Giulia Rossi", rol: "Frontend Dev" },
      { nombre: "Hassan Al-Rashid", rol: "Backend Dev" },
      { nombre: "Rebecca Stone", rol: "Content Manager" },
      { nombre: "Tom Wilson", rol: "QA Specialist" }
    ],
    links: [
      { nombre: "GitHub", url: "#", icono: "💻" },
      { nombre: "Preview", url: "#", icono: "👁️" }
    ],
    metricas: [
      { nombre: "Video Streaming Quality", valor: 93 },
      { nombre: "Interactive Engagement", valor: 81 },
      { nombre: "Mobile Optimization", valor: 89 }
    ]
  }
];

// ─── ProjectCard Component (Old - Remove) ──────────────────────────────────
// Ahora usamos el nuevo ProjectCard de components/3d/ProjectCard.jsx

export default function Proyectos() {
  const sectionRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="proyectos"
      className="relative w-full overflow-hidden"
      style={{
        minHeight: '100vh',
        paddingTop: 'clamp(60px, 10vw, 100px)',
        paddingBottom: 'clamp(60px, 10vw, 100px)',
        paddingLeft: '16px',
        paddingRight: '16px',
      }}
    >

      {/* Contenido */}
      <div className="relative z-10 w-full">
        
        {/* Título principal con animación */}
        <motion.div 
          className="w-full px-4 mb-24 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            variants={itemVariants}
            style={{
              fontSize: 'clamp(2.5rem, 10vw, 4rem)',
              fontWeight: 'bold',
              marginBottom: '16px',
              transition: 'all 0.6s ease-out',
            }}
          >
            <ShinyText
              text="Proyectos Destacados"
              speed={2}
              delay={0}
              color="#ffffff"
              shineColor="#888888"
              spread={120}
              direction="left"
              yoyo={false}
              pauseOnHover={false}
              disabled={false}
            />
          </motion.h2>

          <motion.p
            variants={itemVariants}
            style={{
              fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
              color: COLORS.muted,
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6',
            }}
          >
            Explora nuestros proyectos más destacados desarrollados durante el programa de Técnica de Programación 2026. 
            Cada proyecto representa innovación, creatividad y excelencia técnica.
          </motion.p>
        </motion.div>

        {/* Grid de Proyectos Premium */}
        <motion.div
          className="w-full px-4 flex justify-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "32px",
              marginBottom: "80px",
              maxWidth: "1280px",
              width: "100%",
            }}
          >
            {PROYECTOS.map((proyecto, index) => (
              <motion.div
                key={proyecto.id}
                variants={itemVariants}
                style={{ height: "100%" }}
              >
                <ProjectCard proyecto={proyecto} index={index} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </section>
  );
}
