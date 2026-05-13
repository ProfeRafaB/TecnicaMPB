import { motion } from 'framer-motion';

const COLORS = {
  white: "#ffffff",
  black: "#000000",
};

export function TeamMembers({ integrantes = [], color = COLORS.white }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.6 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 14,
      },
    },
  };

  if (integrantes.length === 0) {
    return (
      <div className="flex items-center gap-2">
        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
          Sin equipo asignado
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <motion.div
        className="flex items-center -space-x-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {integrantes.slice(0, 3).map((integrante, idx) => (
          <motion.div
            key={idx}
            variants={item}
            whileHover={{
              scale: 1.25,
              zIndex: 20,
              transition: { duration: 0.2 },
            }}
            className="relative group"
          >
            {/* Avatar Container */}
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: color === COLORS.white 
                  ? "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)"
                  : "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
                border: `1.5px solid ${color === COLORS.white ? "#ffffff33" : "#ffffff11"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px",
                fontWeight: "700",
                color: color === COLORS.white ? COLORS.black : COLORS.white,
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                backdropFilter: "blur(8px)",
                boxShadow: color === COLORS.white 
                  ? "0 4px 12px rgba(255,255,255,0.08), inset 0 1px 2px rgba(255,255,255,0.2)"
                  : "0 4px 12px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.05)",
              }}
              title={integrante.nombre}
            >
              {/* Glow Effect */}
              <div
                style={{
                  position: "absolute",
                  inset: "-4px",
                  background: `radial-gradient(circle, ${color === COLORS.white ? "#ffffff22" : "#ffffff11"} 0%, transparent 70%)`,
                  borderRadius: "8px",
                  opacity: 0,
                  animation: "glowEffect 2.5s ease-in-out infinite",
                  pointerEvents: "none",
                }}
              />

              {/* Iniciales */}
              <span style={{ position: "relative", zIndex: 2, letterSpacing: "-0.5px" }}>
                {integrante.nombre.split(" ")
                  .slice(0, 2)
                  .map(n => n.charAt(0).toUpperCase())
                  .join("")}
              </span>
            </div>

            {/* Tooltip Mejorado */}
            <motion.div
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 pointer-events-none"
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              whileHover={{ opacity: 1, y: -4, scale: 1 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div
                style={{
                  padding: "8px 12px",
                  borderRadius: "8px",
                  background: color === COLORS.white
                    ? "rgba(30, 30, 30, 0.95)"
                    : "rgba(240, 240, 240, 0.95)",
                  backdropFilter: "blur(12px)",
                  border: `1px solid ${color === COLORS.white ? "#ffffff15" : "#ffffff25"}`,
                  boxShadow: color === COLORS.white
                    ? "0 8px 24px rgba(0,0,0,0.25), 0 1px 3px rgba(0,0,0,0.15)"
                    : "0 8px 24px rgba(255,255,255,0.08)",
                  whiteSpace: "nowrap",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: color === COLORS.white ? "#ffffff" : "#1a1a1a",
                    marginBottom: "2px",
                  }}
                >
                  {integrante.nombre}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: color === COLORS.white ? "rgba(255,255,255,0.6)" : "rgba(26,26,26,0.6)",
                    fontWeight: "500",
                    letterSpacing: "0.3px",
                  }}
                >
                  {integrante.rol}
                </div>
              </div>

              {/* Tooltip Arrow */}
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "6px",
                  height: "6px",
                  background: color === COLORS.white
                    ? "rgba(30, 30, 30, 0.95)"
                    : "rgba(240, 240, 240, 0.95)",
                  border: `0.5px solid ${color === COLORS.white ? "#ffffff15" : "#ffffff25"}`,
                  borderTop: "none",
                  borderLeft: "none",
                  transform: "translateX(-50%) rotate(45deg)",
                }}
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Contador para más integrantes */}
      {integrantes.length > 3 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
          style={{
            fontSize: "11px",
            color: "rgba(255,255,255,0.5)",
            fontWeight: "600",
            letterSpacing: "0.3px",
            paddingLeft: "4px",
          }}
        >
          +{integrantes.length - 3}
        </motion.div>
      )}

      <style>{`
        @keyframes glowEffect {
          0%, 100% { 
            opacity: 0;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}
