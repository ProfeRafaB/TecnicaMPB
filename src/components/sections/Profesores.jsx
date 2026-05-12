
import { useRef, useEffect, useState } from "react";
import ShinyText from '../ShinyText ';

// ─── InstructorCard premium ───────────────────────────────────────────────────
function InstructorCard({ nombre, titulo, handle, estado, avatarUrl }) {
  const [hovered, setHovered] = useState(false);
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setShinePos({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        minHeight: "400px",
        width: "100%",
        maxWidth: "360px",
        borderRadius: "24px",
        padding: "2px",
        background: hovered
          ? "linear-gradient(135deg, rgba(124, 255, 103, 0.15), rgba(217, 255, 28, 0.08))"
          : "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.02))",
        boxShadow: hovered
          ? "0 32px 64px rgba(124, 255, 103, 0.3), 0 0 0 2px rgba(124, 255, 103, 0.4), inset 0 1px 0 rgba(217, 255, 28, 0.2)"
          : "0 16px 40px rgba(0,0,0,0.40), 0 0 0 1px rgba(255,255,255,0.06)",
        transform: hovered ? "translateY(-8px) scale(1.01)" : "translateY(0) scale(1)",
        transition: "transform 0.40s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.40s ease, background 0.40s ease",
        cursor: "pointer",
        overflow: "hidden",
      }}
    >
      {/* Spotlight shine on hover */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "24px",
            pointerEvents: "none",
            background: `radial-gradient(circle at ${shinePos.x}% ${shinePos.y}%, rgba(255,255,255,0.07) 0%, transparent 65%)`,
            zIndex: 1,
          }}
        />
      )}

      {/* Inner card */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          borderRadius: "22px",
          background:
            "linear-gradient(160deg, rgba(30,30,35,0.95) 0%, rgba(18,18,22,0.98) 100%)",
          backdropFilter: "blur(20px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "44px 32px 36px",
          gap: "0",
        }}
      >
        {/* Status badge */}
        <div
          style={{
            alignSelf: "flex-end",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(34,197,94,0.12)",
            border: "1px solid rgba(34,197,94,0.30)",
            borderRadius: "100px",
            padding: "4px 12px",
          }}
        >
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "#22c55e",
              boxShadow: "0 0 6px rgba(34,197,94,0.8)",
              animation: "pulse 2s infinite",
            }}
          />
          <span
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: "#22c55e",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontFamily: "inherit",
            }}
          >
            {estado}
          </span>
        </div>

        {/* Avatar ring */}
        <div
          style={{
            position: "relative",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              padding: "2px",
              background: hovered
                ? "linear-gradient(135deg, rgba(255,255,255,0.5), rgba(255,255,255,0.1))"
                : "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.04))",
              transition: "background 0.4s ease",
              boxShadow: hovered
                ? "0 0 30px rgba(255,255,255,0.12)"
                : "none",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                overflow: "hidden",
                background: "linear-gradient(135deg, #2a2a32, #1a1a22)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "36px",
              }}
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={nombre}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
              ) : null}
              <span style={{ display: avatarUrl ? "none" : "flex" }}>
                {nombre.charAt(0)}
              </span>
            </div>
          </div>
        </div>

        {/* Name */}
        <h3
          style={{
            margin: "0 0 8px",
            fontSize: "20px",
            fontWeight: 700,
            color: "#f0f0f2",
            letterSpacing: "-0.02em",
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          {nombre}
        </h3>

        {/* Title badge */}
        <div
          style={{
            marginBottom: "20px",
            background: hovered
              ? "rgba(124, 255, 103, 0.15)"
              : "rgba(255,255,255,0.06)",
            border: hovered
              ? "1px solid rgba(124, 255, 103, 0.5)"
              : "1px solid rgba(255,255,255,0.10)",
            borderRadius: "8px",
            padding: "5px 14px",
            transition: "all 0.3s ease",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              fontWeight: 500,
              color: hovered ? "#7cff67" : "rgba(180,180,195,0.9)",
              letterSpacing: "0.04em",
              transition: "color 0.3s ease",
            }}
          >
            {titulo}
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            width: "100%",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
            marginBottom: "20px",
          }}
        />

        {/* Handle */}
        <p
          style={{
            margin: "0 0 28px",
            fontSize: "13px",
            color: "rgba(130,130,150,0.85)",
            letterSpacing: "0.02em",
          }}
        >
          @{handle}
        </p>

        {/* Interactive Profile Link */}
        <div
          style={{
            marginTop: "auto",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "16px 0 0",
            borderTop: hovered
              ? "1px solid rgba(124, 255, 103, 0.3)"
              : "1px solid rgba(255,255,255,0.08)",
            transition: "all 0.3s ease",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: hovered ? "#7cff67" : "rgba(180,180,195,0.7)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              transition: "color 0.3s ease",
            }}
          >
            Explorar Perfil
          </span>
          <span
            style={{
              display: "inline-block",
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              background: hovered ? "#d9ff1c" : "rgba(255,255,255,0.4)",
              transition: "all 0.3s ease",
              boxShadow: hovered ? "0 0 8px rgba(217, 255, 28, 0.6)" : "none",
              animation: hovered ? "pulse 1.5s infinite" : "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const instructores = [
  {
    id: 1,
    nombre: "Instructor Principal",
    titulo: "Desarrollo Full Stack",
    handle: "fullstack_dev",
    estado: "Online",
    avatarUrl: "/avatars/instructor1.jpg",
  },
  {
    id: 2,
    nombre: "Diseñadora UI/UX",
    titulo: "Interfaz de Usuario",
    handle: "uiux_design",
    estado: "Online",
    avatarUrl: "/avatars/instructor2.jpg",
  },
  {
    id: 3,
    nombre: "Mentor Académico",
    titulo: "Guía Educativa",
    handle: "academic_mentor",
    estado: "Online",
    avatarUrl: "/avatars/instructor3.jpg",
  },
];

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Profesores() {
  return (
    <>
      {/* Pulse keyframe for status dot */}
      <style>{`
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.6; transform:scale(1.3); }
        }
      `}</style>

      <section id="profesores" className="py-20">
        <div className="w-full flex flex-col items-center">

          {/* Header */}
          <div className="w-full max-w-5xl px-4 mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              <ShinyText
                text="👨‍🏫 Nuestros Instructores"
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
          </div>

          {/* Spacer */}
          <div style={{ height: "80px" }} />

          {/* Cards */}
          <div className="w-full flex justify-center">
            <div className="w-full max-w-7xl px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
                {instructores.map((instructor) => (
                  <InstructorCard key={instructor.id} {...instructor} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}