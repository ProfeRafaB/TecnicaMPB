import { useState, useEffect, useRef } from "react";
import ShinyText from '../ShinyText ';

// ─── Design tokens (preserving original palette) ───────────────────────────
const COLORS = {
  green: "#7cff67",
  yellow: "#d9ff1c",
  neon: "#39FF14",
  bg: "#120F17",
  bgCard: "#17131E",
  bgCardHover: "rgba(124,255,103,0.06)",
  border: "rgba(124,255,103,0.15)",
  borderHover: "rgba(124,255,103,0.35)",
  muted: "rgba(255,255,255,0.45)",
  mutedLo: "rgba(255,255,255,0.25)",
  white: "#ffffff",
};

// ─── Micro components ───────────────────────────────────────────────────────

function Badge({ children, color = COLORS.green }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "2px 10px", borderRadius: 999,
      border: `1px solid ${color}33`,
      background: `${color}11`,
      color, fontSize: 10, fontWeight: 600,
      letterSpacing: "0.08em", textTransform: "uppercase",
      whiteSpace: "nowrap",
    }}>
      {children}
    </span>
  );
}

function StatPill({ label, value, color = COLORS.green }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      gap: 2, padding: "8px 14px",
      background: `${color}0D`,
      border: `1px solid ${color}22`,
      borderRadius: 12,
    }}>
      <span style={{ color, fontSize: 18, fontWeight: 700, lineHeight: 1 }}>{value}</span>
      <span style={{ color: COLORS.muted, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</span>
    </div>
  );
}

function ProgressBar({ value, color = COLORS.green, label }) {
  return (
    <div style={{ width: "100%" }}>
      {label && (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ color: COLORS.muted, fontSize: 11 }}>{label}</span>
          <span style={{ color, fontSize: 11, fontWeight: 600 }}>{value}%</span>
        </div>
      )}
      <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 99, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${value}%`,
          background: `linear-gradient(90deg, ${color}99, ${color})`,
          borderRadius: 99,
          transition: "width 1.2s cubic-bezier(0.16,1,0.3,1)",
        }} />
      </div>
    </div>
  );
}

function TechTag({ children }) {
  return (
    <span style={{
      padding: "4px 10px", borderRadius: 8,
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.1)",
      color: COLORS.mutedLo, fontSize: 11, fontWeight: 500,
      whiteSpace: "nowrap",
    }}>{children}</span>
  );
}

function Separator() {
  return <div style={{ width: "100%", height: 1, background: `${COLORS.green}22`, margin: "12px 0" }} />;
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

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Card 1 — "Aprende Creando" (2×2 hero) ─────────────────────────────────
function Card1({ hovered }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 16 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <div style={{
            fontSize: 44, lineHeight: 1,
            transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
            transform: hovered ? "scale(1.15) rotate(-4deg)" : "scale(1)",
            display: "inline-block", marginBottom: 10,
          }}>💻</div>
          <h3 style={{
            margin: 0, fontSize: 22, fontWeight: 700,
            color: hovered ? COLORS.yellow : COLORS.green,
            letterSpacing: "-0.03em",
            transition: "color 0.3s",
          }}>Formación Integral</h3>
          <p style={{ margin: "2px 0 0", color: COLORS.muted, fontSize: 12, letterSpacing: "0.04em" }}>
            Técnica en Desarrollo y Análisis de Software
          </p>
        </div>
        <Badge color={COLORS.neon}>2026</Badge>
      </div>

      {/* Description */}
      <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13.5, lineHeight: 1.7, margin: 0 }}>
        Aprende las habilidades más demandadas en la industria del software. Formación práctica que te prepara para el mercado laboral actual con enfoque en desarrollo web, análisis de sistemas y mejores prácticas profesionales.
      </p>

      <Separator />

      {/* Progress bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <ProgressBar value={100} color={COLORS.green} label="Cobertura curricular" />
        <ProgressBar value={88} color={COLORS.yellow} label="Empleabilidad alumni" />
        <ProgressBar value={92} color={COLORS.neon} label="Satisfacción estudiantes" />
      </div>

      <Separator />

      {/* Bullet features */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {["3 niveles de profundización", "Certificación profesional", "Proyectos reales en equipo", "Mentoría directa"].map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 6, height: 6, borderRadius: "50%",
              background: [COLORS.green, COLORS.yellow, COLORS.neon, COLORS.green][i],
              flexShrink: 0,
            }} />
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 12.5 }}>{f}</span>
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
    { name: "Desarrollo Backend", level: 90, color: COLORS.yellow },
    { name: "Gestión de Datos", level: 85, color: COLORS.neon },
    { name: "Análisis de Sistemas", level: 90, color: COLORS.green },
    { name: "Trabajo en Equipo", level: 100, color: COLORS.yellow },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 14 }}>
      <div>
        <div style={{
          fontSize: 38, transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          transform: hovered ? "scale(1.15)" : "scale(1)", display: "inline-block", marginBottom: 8,
        }}>🎯</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <h3 style={{
            margin: 0, fontSize: 18, fontWeight: 700,
            color: hovered ? COLORS.yellow : COLORS.green,
            letterSpacing: "-0.02em", transition: "color 0.3s",
          }}>Habilidades Clave</h3>
          <Badge color={COLORS.yellow}>5 PILARES</Badge>
        </div>
        <p style={{ margin: "4px 0 0", color: COLORS.muted, fontSize: 11 }}>Lo que desarrollarás en 24 meses</p>
      </div>

      <Separator />

      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {skills.map((s) => (
          <ProgressBar key={s.name} value={s.level} color={s.color} label={s.name} />
        ))}
      </div>

      <Separator />

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
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
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 12 }}>
      {/* Title row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            fontSize: 28, display: "inline-block",
            transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
            transform: hovered ? "scale(1.15)" : "scale(1)",
          }}>🛠️</span>
          <div>
            <h3 style={{
              margin: 0, fontSize: 17, fontWeight: 700,
              color: hovered ? COLORS.yellow : COLORS.green,
              letterSpacing: "-0.02em", transition: "color 0.3s",
            }}>Tecnologías</h3>
            <p style={{ margin: 0, color: COLORS.muted, fontSize: 11 }}>Stack moderno y demandado en la industria</p>
          </div>
        </div>
        <Badge color={COLORS.green}>4 ÁREAS</Badge>
      </div>

      {/* Tech grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, flex: 1 }}>
        {techs.map((t, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.04)",
            border: `1px solid ${COLORS.green}18`,
            borderRadius: 12, padding: "10px 8px",
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: 4, textAlign: "center",
            transition: "border-color 0.3s, background 0.3s",
            ...(hovered ? { borderColor: `${COLORS.green}35`, background: `${COLORS.green}08` } : {}),
          }}>
            <span style={{ fontSize: 20 }}>{t.icon}</span>
            <span style={{ color: COLORS.green, fontSize: 11, fontWeight: 600, lineHeight: 1.2 }}>{t.label}</span>
            <span style={{ color: COLORS.muted, fontSize: 10 }}>{t.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Card 4 — "Comunidad Técnica" (1×1) ──────────────────────────────────────
function Card4({ hovered }) {
  const avatars = ["A", "B", "C", "D", "E"];
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <span style={{
            fontSize: 32, display: "inline-block",
            transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
            transform: hovered ? "scale(1.15)" : "scale(1)", marginBottom: 6,
          }}>👨‍💻</span>
          <h3 style={{
            margin: 0, fontSize: 16, fontWeight: 700,
            color: hovered ? COLORS.yellow : COLORS.green,
            transition: "color 0.3s",
          }}>Comunidad</h3>
        </div>
        <div style={{
          background: `${COLORS.green}15`, border: `1px solid ${COLORS.green}30`,
          borderRadius: 8, padding: "4px 10px",
          color: COLORS.green, fontSize: 11, fontWeight: 700,
        }}>
          <AnimatedCounter target={80} suffix="+" /> activos
        </div>
      </div>

      {/* Avatar stack */}
      <div style={{ display: "flex", alignItems: "center", gap: -6 }}>
        {avatars.map((a, i) => (
          <div key={i} style={{
            width: 28, height: 28, borderRadius: "50%",
            background: [`${COLORS.green}55`, `${COLORS.yellow}55`, `${COLORS.neon}55`, `${COLORS.green}33`, `${COLORS.yellow}33`][i],
            border: `2px solid rgba(18, 15, 23, 0.8)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: COLORS.green, fontSize: 10, fontWeight: 700,
            marginLeft: i === 0 ? 0 : -8,
            zIndex: avatars.length - i,
          }}>{a}</div>
        ))}
        <span style={{ marginLeft: 10, color: COLORS.muted, fontSize: 11 }}>más…</span>
      </div>

      <Separator />

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {[
          { label: "Principiantes", color: COLORS.green },
          { label: "Intermedios", color: COLORS.yellow },
          { label: "Avanzados", color: COLORS.neon },
        ].map(({ label, color }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: color, flexShrink: 0 }} />
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Card 5 — "Metodología Técnica" (1×1) ─────────────────────────────────────
function Card5({ hovered }) {
  const methods = [
    { n: "01", title: "Clases Prácticas", color: COLORS.green, pct: 100 },
    { n: "02", title: "Proyectos Reales", color: COLORS.yellow, pct: 100 },
    { n: "03", title: "Mentoría Grupal", color: COLORS.neon, pct: 100 },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <span style={{
            fontSize: 32, display: "inline-block",
            transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
            transform: hovered ? "scale(1.15)" : "scale(1)", marginBottom: 6,
          }}>🔬</span>
          <h3 style={{
            margin: 0, fontSize: 16, fontWeight: 700,
            color: hovered ? COLORS.yellow : COLORS.green,
            transition: "color 0.3s",
          }}>Metodología</h3>
        </div>
        <Badge color={COLORS.neon}>100% APLICADA</Badge>
      </div>

      <Separator />

      <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1, justifyContent: "center" }}>
        {methods.map((m) => (
          <div key={m.n} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8, flexShrink: 0,
              background: `${m.color}20`, border: `1px solid ${m.color}40`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: m.color, fontSize: 10, fontWeight: 800,
            }}>{m.n}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>{m.title}</span>
                <span style={{ color: m.color, fontSize: 10 }}>{m.pct}%</span>
              </div>
              <div style={{ height: 3, background: "rgba(255,255,255,0.07)", borderRadius: 99 }}>
                <div style={{
                  height: "100%", width: `${m.pct}%`,
                  background: m.color, borderRadius: 99,
                }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Card 6 — "Inserción Laboral" (1×1) ──────────────────────────────────────
function Card6({ hovered }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{
          fontSize: 32, display: "inline-block",
          transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          transform: hovered ? "scale(1.15) rotate(5deg)" : "scale(1)", marginBottom: 6,
        }}>🚀</span>
        <Badge color={COLORS.yellow}>88% EMPLEADOS</Badge>
      </div>

      <h3 style={{
        margin: 0, fontSize: 16, fontWeight: 700,
        color: hovered ? COLORS.yellow : COLORS.green,
        transition: "color 0.3s",
      }}>Oportunidades</h3>

      {/* Opportunities mockup */}
      <div style={{
        flex: 1,
        border: `1px solid ${COLORS.yellow}30`,
        borderRadius: 10,
        background: `${COLORS.yellow}06`,
        padding: "10px 12px",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{
            width: 16, height: 16, borderRadius: "50%",
            background: `${COLORS.yellow}40`, border: `1px solid ${COLORS.yellow}60`,
            flexShrink: 0,
          }} />
          <span style={{ color: COLORS.yellow, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em" }}>
            RED DE EMPRESAS
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ height: 6, width: "80%", background: `${COLORS.yellow}25`, borderRadius: 3 }} />
          <div style={{ height: 4, width: "55%", background: `${COLORS.yellow}15`, borderRadius: 3 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: COLORS.muted, fontSize: 10 }}>Startups + Empresas</span>
          <div style={{
            width: 24, height: 24, borderRadius: "50%",
            background: `${COLORS.yellow}20`, border: `1px solid ${COLORS.yellow}40`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: COLORS.yellow, fontSize: 12,
          }}>✓</div>
        </div>
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
  const Content = CARD_CONTENT[index];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: `span ${item.colSpan}`,
        gridRow: `span ${item.rowSpan}`,
        background: COLORS.bgCard,
        border: `1px solid ${hovered ? COLORS.borderHover : COLORS.border}`,
        borderRadius: 20,
        padding: "20px 22px",
        cursor: "default",
        transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, box-shadow 0.3s, background 0.3s",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 20px 60px rgba(124,255,103,0.07), 0 0 0 1px ${COLORS.borderHover}`
          : "0 2px 12px rgba(0,0,0,0.3)",
        background: hovered
          ? `linear-gradient(145deg, rgba(124,255,103,0.06) 0%, ${COLORS.bgCard} 60%)`
          : COLORS.bgCard,
        position: "relative",
        overflow: "hidden",
        display: "flex", flexDirection: "column",
      }}
    >
      {/* Subtle corner glow */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: 120, height: 120,
        background: hovered
          ? `radial-gradient(circle at 100% 0%, ${COLORS.green}12 0%, transparent 70%)`
          : "transparent",
        transition: "background 0.4s",
        pointerEvents: "none",
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
      style={{ minHeight: "100vh", padding: "80px 0" }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <Badge color={COLORS.green}>TÉCNICA EN PROGRAMACIÓN</Badge>
          </div>
          <h2 style={{ margin: 0, fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            <ShinyText
              text="🏫 Sobre Nosotros"
              speed={2}
              color="#b5b5b5"
              shineColor="#ffffff"
              spread={120}
            />
          </h2>
          <p style={{ margin: "12px 0 0", color: COLORS.muted, fontSize: 15, maxWidth: 620, lineHeight: 1.6 }}>
            Formación técnica de 24 meses con 3 niveles de profundización. Aprende desarrollo web moderno, análisis de sistemas y mejores prácticas profesionales de la mano de instructores activos en la industria.
          </p>
        </div>

        {/* Bento Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridAutoRows: "200px",
          gap: 16,
        }}>
          {gridItemsMeta.map((item, i) => (
            <GridCard key={item.id} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}