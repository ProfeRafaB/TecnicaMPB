import { useState, useEffect, useRef } from "react";
import ShinyText from '../ShinyText ';

// ─── Design tokens (modernizado a white/black) ───────────────────────────────
const COLORS = {
  white: "#ffffff",
  black: "#000000",
  gray: "#f5f5f5",
  darkGray: "#333333",
  muted: "rgba(255,255,255,0.45)",
  borderDefault: "rgba(255,255,255,0.1)",
  green: "#7cff67",
  yellow: "#d9ff1c",
};

// ─── Micro components ───────────────────────────────────────────────────────

function Badge({ children, color = COLORS.green }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <span 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "6px 14px", borderRadius: 999,
        border: `1.5px solid ${color}${hovered ? "77" : "44"}`,
        background: hovered 
          ? `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`
          : `${color}12`,
        color, fontSize: 11, fontWeight: 700,
        letterSpacing: "0.08em", textTransform: "uppercase",
        whiteSpace: "nowrap",
        transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
        boxShadow: hovered ? `0 8px 24px ${color}33, inset 0 0 12px ${color}22` : `0 0 0 transparent`,
        transform: hovered ? "scale(1.06)" : "scale(1)",
        cursor: "default",
        backdropFilter: "blur(8px)",
      }}>
      {children}
    </span>
  );
}

function StatPill({ label, value, color = COLORS.green }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <div 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: 4, padding: "12px 16px",
        background: hovered 
          ? `linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)`
          : `rgba(255,255,255,0.08)`,
        border: `1.5px solid ${hovered ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.12)"}`,
        borderRadius: 12,
        transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
        transform: hovered ? "translateY(-5px) scale(1.06)" : "translateY(0) scale(1)",
        boxShadow: hovered ? `0 12px 32px rgba(255,255,255,0.12), inset 0 0 16px rgba(255,255,255,0.06)` : "0 4px 12px rgba(0,0,0,0.15)",
        cursor: "default",
        backdropFilter: "blur(8px)",
      }}>
      <span style={{ color: COLORS.white, fontSize: 22, fontWeight: 800, lineHeight: 1 }}>{value}</span>
      <span style={{ color: COLORS.muted, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>{label}</span>
    </div>
  );
}

function ProgressBar({ value, color = COLORS.green, label }) {
  return (
    <div style={{ width: "100%" }}>
      {label && (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ color: COLORS.muted, fontSize: 12, fontWeight: 600 }}>{label}</span>
          <span style={{ color: COLORS.white, fontSize: 12, fontWeight: 700, letterSpacing: "0.05em" }}>{value}%</span>
        </div>
      )}
      <div style={{ height: 7, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden", position: "relative", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(4px)" }}>
        <div style={{
          height: "100%", width: `${value}%`,
          background: `linear-gradient(90deg, ${color}77, ${color}ff, ${color}77)`,
          borderRadius: 99,
          transition: "width 1.2s cubic-bezier(0.23,1,0.32,1)",
          boxShadow: `0 0 16px ${color}66, inset 0 0 10px ${color}44`,
          position: "relative",
        }} />
      </div>
    </div>
  );
}

function TechTag({ children }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <span 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "7px 13px", borderRadius: 10,
        background: hovered 
          ? "rgba(255,255,255,0.13)"
          : "rgba(255,255,255,0.08)",
        border: hovered 
          ? "1px solid rgba(255,255,255,0.28)"
          : "1px solid rgba(255,255,255,0.15)",
        color: hovered ? COLORS.white : COLORS.muted, 
        fontSize: 12, 
        fontWeight: 600,
        whiteSpace: "nowrap",
        transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        cursor: "default",
        boxShadow: hovered ? "0 6px 16px rgba(255,255,255,0.1)" : "none",
        backdropFilter: "blur(8px)",
      }}>{children}</span>
  );
}

function Separator() {
  return <div style={{ width: "100%", height: 1, background: `linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%)`, margin: "16px 0" }} />;
}

function AnimatedCounter({ target, suffix = "", duration = 1500 }) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(ease * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span 
      ref={ref}
      style={{
        display: "inline-block",
        transition: "transform 0.2s ease-out",
      }}
    >
      {count}{suffix}
    </span>
  );
}

// ─── Card 1 — "Aprende Creando" (2×2 hero) ─────────────────────────────────
function Card1({ hovered }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 16 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <div style={{
            fontSize: 48, lineHeight: 1,
            transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
          transform: hovered ? "scale(1.2) rotate(-8deg) translateY(-6px)" : "scale(1) rotate(0deg)",
          display: "inline-block", marginBottom: 10,
          textShadow: hovered ? `0 0 24px rgba(255,255,255,0.3)` : "none",
        }}>💻</div>
          <h3 style={{
            margin: 0, fontSize: 26, fontWeight: 800,
            color: hovered ? COLORS.white : COLORS.white,
            letterSpacing: "-0.02em",
            transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
          }}>Formación Integral</h3>
          <p style={{ margin: "4px 0 0", color: COLORS.muted, fontSize: 12, letterSpacing: "0.04em", fontWeight: 500 }}>
            Técnica en Desarrollo y Análisis de Software
          </p>
        </div>
        <Badge color={COLORS.neon}>2026</Badge>
      </div>

      {/* Description */}
      <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.8, margin: 0, fontWeight: 500 }}>
        Aprende las habilidades más demandadas en la industria del software. Formación práctica que te prepara para el mercado laboral actual con enfoque en desarrollo web, análisis de sistemas y mejores prácticas profesionales.
      </p>

      <Separator />

      {/* Progress bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <ProgressBar value={100} color={COLORS.green} label="Cobertura curricular" />
        <ProgressBar value={88} color={COLORS.green} label="Empleabilidad alumni" />
        <ProgressBar value={92} color={COLORS.green} label="Satisfacción estudiantes" />
      </div>

      <Separator />

      {/* Bullet features */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {["3 niveles de profundización", "Certificación profesional", "Proyectos reales en equipo", "Mentoría directa"].map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, transition: "transform 0.3s ease-out", transform: hovered ? "translateX(4px)" : "translateX(0)" }}>
            <div style={{
              width: 7, height: 7, borderRadius: "50%",
              background: COLORS.green,
              flexShrink: 0,
              boxShadow: `0 0 10px ${COLORS.green}77`,
            }} />
            <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, fontWeight: 500 }}>{f}</span>
          </div>
        ))}
      </div>

      {/* Bottom stat row */}
      <div style={{ marginTop: "auto", display: "flex", gap: 8 }}>
        <StatPill label="Estudiantes" value={<AnimatedCounter target={80} suffix="+" />} color={COLORS.green} />
        <StatPill label="Proyectos" value={<AnimatedCounter target={45} suffix="+" />} color={COLORS.yellow} />
        <StatPill label="Meses" value={<AnimatedCounter target={24} />} color={COLORS.neon} />
      </div>
    </div>
  );
}

// ─── Card 2 — "Habilidades Clave" (1×2) ─────────────────────────────────────
function Card2({ hovered }) {
  const skills = [
    { name: "Desarrollo Frontend", level: 95, color: COLORS.green },
    { name: "Desarrollo Backend", level: 90, color: COLORS.green },
    { name: "Gestión de Datos", level: 85, color: COLORS.green },
    { name: "Análisis de Sistemas", level: 90, color: COLORS.green },
    { name: "Trabajo en Equipo", level: 100, color: COLORS.green },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 14 }}>
      <div>
        <div style={{
          fontSize: 42, transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
          transform: hovered ? "scale(1.2) rotate(8deg) translateY(-4px)" : "scale(1) rotate(0deg)", 
          display: "inline-block", marginBottom: 10,
          textShadow: hovered ? `0 0 20px rgba(255,255,255,0.3)` : "none",
        }}>🎯</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <h3 style={{
            margin: 0, fontSize: 22, fontWeight: 800,
            color: COLORS.white,
            letterSpacing: "-0.01em", transition: "color 0.4s",
          }}>Habilidades Clave</h3>
          <Badge color={COLORS.green}>5 PILARES</Badge>
        </div>
        <p style={{ margin: "6px 0 0", color: COLORS.muted, fontSize: 11.5, fontWeight: 500 }}>Lo que desarrollarás en 24 meses</p>
      </div>

      <Separator />

      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        {skills.map((s) => (
          <ProgressBar key={s.name} value={s.level} color={s.color} label={s.name} />
        ))}
      </div>

      <Separator />

      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
        {["Código", "Testing", "Deploy", "Agile"].map(t => <TechTag key={t}>{t}</TechTag>)}
      </div>
    </div>
  );
}

// ─── Card 3 — "Stack Tecnológico" (3×1 wide) ────────────────────────────────
function Card3({ hovered }) {
  const techs = [
    { icon: "⚛️", label: "Frontend", desc: "React, JavaScript" },
    { icon: "🔧", label: "Backend", desc: "Node.js, Express" },
    { icon: "🗄️", label: "Datos", desc: "SQL, MongoDB" },
    { icon: "☁️", label: "DevOps", desc: "Deploy, Cloud" },
  ];
  
  const [hoveredTech, setHoveredTech] = useState(null);
  
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 14 }}>
      {/* Title row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{
            fontSize: 32, display: "inline-block",
            transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
        transform: hovered ? "scale(1.2) rotate(-10deg) translateY(-4px)" : "scale(1) rotate(0deg)",
        textShadow: hovered ? `0 0 20px rgba(255,255,255,0.3)` : "none",
      }}>🛠️</span>
          <div>
            <h3 style={{
              margin: 0, fontSize: 21, fontWeight: 800,
              color: COLORS.white,
              letterSpacing: "-0.01em", transition: "color 0.4s",
            }}>Tecnologías</h3>
            <p style={{ margin: 0, color: COLORS.muted, fontSize: 11.5, fontWeight: 500 }}>Stack moderno y demandado en la industria</p>
          </div>
        </div>
        <Badge color={COLORS.green}>4 ÁREAS</Badge>
      </div>

      {/* Tech grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, flex: 1 }}>
        {techs.map((t, i) => (
          <div 
            key={i}
            onMouseEnter={() => setHoveredTech(i)}
            onMouseLeave={() => setHoveredTech(null)}
            style={{
            background: hoveredTech === i ? "rgba(255,255,255,0.13)" : "rgba(255,255,255,0.08)",
            border: `1.5px solid ${hoveredTech === i ? `rgba(255,255,255,0.28)` : `rgba(255,255,255,0.12)`}`,
            borderRadius: 14, padding: "14px 12px",
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: 8, textAlign: "center",
            transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
            transform: hoveredTech === i ? "translateY(-8px) scale(1.1)" : "translateY(0) scale(1)",
            boxShadow: hoveredTech === i ? `0 16px 40px rgba(255,255,255,0.15), inset 0 0 16px rgba(255,255,255,0.08)` : "0 4px 16px rgba(0,0,0,0.2)",
            cursor: "default",
            backdropFilter: "blur(8px)",
            }}>
            <span style={{ 
              fontSize: 24,
              transition: "transform 0.3s ease-out",
              transform: hoveredTech === i ? "scale(1.3)" : "scale(1)",
            }}>{t.icon}</span>
            <span style={{ color: COLORS.white, fontSize: 12, fontWeight: 700, lineHeight: 1.2 }}>{t.label}</span>
            <span style={{ color: COLORS.muted, fontSize: 10.5, fontWeight: 500 }}>{t.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Card 4 — "Acreditaciones" (1×1) ───────────────────────────────────────────
function Card4({ hovered }) {
  const certifications = [
    { icon: "📜", label: "Registro oficial" },
    { icon: "✓", label: "Título reconocido" },
    { icon: "🏆", label: "Calidad educativa" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <span style={{
            fontSize: 36, display: "inline-block",
            transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
        transform: hovered ? "scale(1.2) rotate(-8deg) translateY(-4px)" : "scale(1) rotate(0deg)", 
        marginBottom: 8,
        textShadow: hovered ? `0 0 20px rgba(255,255,255,0.3)` : "none",
      }}>🎓</span>
          <h3 style={{
            margin: 0, fontSize: 20, fontWeight: 800,
            color: COLORS.white,
            transition: "color 0.4s",
          }}>Acreditaciones</h3>
        </div>
        <div style={{
          background: "rgba(255,255,255,0.12)", border: `1.5px solid rgba(255,255,255,0.25)`,
          borderRadius: 10, padding: "8px 14px",
          color: COLORS.white, fontSize: 12, fontWeight: 700,
          transition: "all 0.3s",
          boxShadow: hovered ? `0 0 16px rgba(255,255,255,0.2)` : "none",
          backdropFilter: "blur(8px)",
        }}>
          <AnimatedCounter target={3} suffix="" /> verificadas
        </div>
      </div>

      <p style={{ margin: 0, color: COLORS.muted, fontSize: 11.5, fontWeight: 500, lineHeight: 1.6 }}>
        Programa aprobado por entes reguladores con estándares internacionales
      </p>

      <Separator />

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {certifications.map(({ icon, label }, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, transition: "transform 0.3s ease-out", transform: hovered ? "translateX(4px)" : "translateX(0)" }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, flexShrink: 0,
              background: "rgba(255,255,255,0.10)",
              border: `1.5px solid rgba(255,255,255,0.20)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16,
              boxShadow: `0 0 12px rgba(255,255,255,0.1)`,
            }}>{icon}</div>
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 600 }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Card 5 — "Infraestructura" (1×1) ──────────────────────────────────────────
function Card5({ hovered }) {
  const facilities = [
    { icon: "💻", label: "Laboratorios de cómputo", desc: "Equipados" },
    { icon: "📚", label: "Biblioteca digital", desc: "Acceso 24/7" },
    { icon: "🌐", label: "Plataforma virtual", desc: "LMS avanzado" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <span style={{
            fontSize: 36, display: "inline-block",
            transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
            transform: hovered ? "scale(1.2) rotate(12deg)" : "scale(1) rotate(0deg)", 
            marginBottom: 8,
            textShadow: hovered ? `0 0 14px rgba(217,255,28,0.3)` : "none",
          }}>🏢</span>
          <h3 style={{
            margin: 0, fontSize: 18, fontWeight: 800,
            color: hovered ? COLORS.yellow : COLORS.green,
            transition: "color 0.4s",
          }}>Infraestructura</h3>
        </div>
        <Badge color={COLORS.neon}>MODERNA</Badge>
      </div>

      <p style={{ margin: 0, color: COLORS.muted, fontSize: 11.5, fontWeight: 500, lineHeight: 1.6 }}>
        Instalaciones tecnológicas de última generación
      </p>

      <Separator />

      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        {facilities.map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, transition: "transform 0.3s ease-out", transform: hovered ? "translateX(4px)" : "translateX(0)" }}>
            <span style={{ fontSize: 20 }}>{f.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, fontWeight: 700 }}>{f.label}</div>
              <div style={{ color: COLORS.muted, fontSize: 10.5, marginTop: 2 }}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Card 6 — "Reconocimientos" (1×1) ───────────────────────────────────────────
function Card6({ hovered }) {
  const achievements = [
    { year: "2024", award: "Programa Destacado" },
    { year: "2025", award: "Innovación Educativa" },
    { year: "2026", award: "Excelencia Académica" },
  ];
  
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{
          fontSize: 36, display: "inline-block",
          transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
        transform: hovered ? "scale(1.2) rotate(15deg) translateY(-6px)" : "scale(1) rotate(0deg)", 
        marginBottom: 8,
        textShadow: hovered ? `0 0 24px rgba(255,255,255,0.3)` : "none",
      }}>⭐</span>
        <Badge color={COLORS.green}>3 PREMIOS</Badge>
      </div>

      <h3 style={{
        margin: 0, fontSize: 20, fontWeight: 800,
        color: COLORS.white,
        transition: "color 0.4s",
      }}>Trayectoria</h3>

      <Separator />

      <div style={{
        flex: 1,
        display: "flex", flexDirection: "column", gap: 10,
        justifyContent: "space-between",
      }}>
        {achievements.map((a, i) => (
          <div key={i} style={{
            borderLeft: `2.5px solid rgba(255,255,255,0.3)`,
            paddingLeft: 12,
            transition: "all 0.3s",
            transform: hovered ? "translateX(4px)" : "translateX(0)",
          }}>
            <div style={{ 
              color: COLORS.white, 
              fontSize: 14, 
              fontWeight: 800 
            }}>
              {a.year}
            </div>
            <div style={{ 
              color: "rgba(255,255,255,0.7)", 
              fontSize: 12, 
              fontWeight: 600,
              marginTop: 2,
            }}>
              {a.award}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Grid Card wrapper ───────────────────────────────────────────────────────
const CARD_CONTENT = [Card1, Card2, Card3, Card4, Card5, Card6];

const gridItemsMeta = [
  { id: 1, colSpan: 2, rowSpan: 2 },
  { id: 2, colSpan: 1, rowSpan: 2 },
  { id: 3, colSpan: 3, rowSpan: 1 },
  { id: 4, colSpan: 1, rowSpan: 1 },
  { id: 5, colSpan: 1, rowSpan: 1 },
  { id: 6, colSpan: 1, rowSpan: 1 },
];

function GridCard({ item, index }) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const ref = useRef(null);
  const Content = CARD_CONTENT[index];

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        gridColumn: `span ${item.colSpan}`,
        gridRow: `span ${item.rowSpan}`,
        background: `linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)`,
        border: `2px solid ${hovered ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)"}`,
        borderRadius: 20,
        padding: "24px 26px",
        cursor: "default",
        transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1), border-color 0.4s, box-shadow 0.4s, background 0.4s",
        transform: hovered ? "translateY(-12px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: hovered
          ? `0 40px 100px rgba(255,255,255,0.15), 0 0 0 2px rgba(255,255,255,0.25), inset 0 0 40px rgba(255,255,255,0.08)`
          : "0 4px 20px rgba(0,0,0,0.3), inset 0 0 1px rgba(255,255,255,0.05)",
        background: hovered
          ? `linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 70%)`
          : `linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)`,
        position: "relative",
        overflow: "hidden",
        display: "flex", flexDirection: "column",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Dynamic glow following cursor */}
      <div style={{
        position: "absolute",
        width: 220,
        height: 220,
        background: hovered
          ? `radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)`
          : "transparent",
        left: mousePos.x - 110,
        top: mousePos.y - 110,
        pointerEvents: "none",
        transition: "background 0.3s",
        borderRadius: "50%",
      }} />

      {/* Corner glow accent */}
      <div style={{
        position: "absolute", top: -20, right: -20,
        width: 160, height: 160,
        background: hovered
          ? `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)`
          : "transparent",
        transition: "background 0.5s ease-out",
        pointerEvents: "none",
        borderRadius: "50%",
      }} />

      {/* Bottom corner accent */}
      <div style={{
        position: "absolute", bottom: -30, left: -30,
        width: 120, height: 120,
        background: hovered
          ? `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 65%)`
          : "transparent",
        transition: "background 0.5s ease-out",
        pointerEvents: "none",
        borderRadius: "50%",
      }} />

      <Content hovered={hovered} />
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────
export default function Sobre() {
  return (
    <section
      id="sobre"
      style={{ minHeight: "100vh", padding: "100px 0" }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <Badge color={COLORS.green}>TÉCNICA EN PROGRAMACIÓN</Badge>
          </div>
          <h2 style={{ 
            margin: 0, 
            fontSize: "clamp(36px, 6vw, 52px)", 
            fontWeight: 900, 
            lineHeight: 1.1, 
            letterSpacing: "-0.03em",
            color: COLORS.white,
            animation: "none",
          }}
          >
            <ShinyText
              text="🏫 Sobre Nosotros"
              speed={2}
              delay={0}
              color="#b5b5b5"
              shineColor="#ffffff"
              spread={120}
              direction="left"
              yoyo={false}
              pauseOnHover={false}
              disabled={false}
            />
          </h2>
          <p style={{ 
            margin: "16px 0 0", 
            color: COLORS.muted, 
            fontSize: 16, 
            maxWidth: 680, 
            lineHeight: 1.7,
            fontWeight: 500,
          }}>
            Formación técnica de 24 meses con 3 niveles de profundización. Aprende desarrollo web moderno, análisis de sistemas y mejores prácticas profesionales de la mano de instructores activos en la industria.
          </p>
        </div>

        {/* Bento Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridAutoRows: "220px",
          gap: 18,
        }}>
          {gridItemsMeta.map((item, i) => (
            <GridCard key={item.id} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}