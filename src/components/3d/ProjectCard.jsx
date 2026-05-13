import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { AnimatedImage } from './AnimatedImage';
import { TeamMembers } from './TeamMembers';
import { ProjectDetailsModal } from './ProjectDetailsModal';

const COLORS = {
  white: "#ffffff",
  gray: "#f5f5f5",
  darkGray: "#333333",
  muted: "rgba(255,255,255,0.45)",
  borderDefault: "rgba(255,255,255,0.1)",
};

export function ProjectCard({ proyecto, index }) {
  const [hovered, setHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.23, 1, 0.32, 1],
      },
    },
    hover: {
      y: -16,
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  // Efecto de parallax sutil en hover
  const parallaxX = hovered ? (mousePos.x - 0.5) * 8 : 0;
  const parallaxY = hovered ? (mousePos.y - 0.5) * 8 : 0;

  return (
    <>
      <motion.div
        ref={cardRef}
        className="h-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setMousePos({ x: 0, y: 0 });
        }}
        onMouseMove={handleMouseMove}
      >
        <motion.div
          style={{
            position: "relative",
            height: "100%",
            borderRadius: "16px",
            overflow: "hidden",
            background: `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.1) 100%)`,
            border: `2px solid ${hovered ? `${proyecto.color}44` : COLORS.borderDefault}`,
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            x: parallaxX,
            y: parallaxY,
          }}
          animate={{
            boxShadow: hovered
              ? `0 32px 64px ${proyecto.color}20, 0 0 48px ${proyecto.color}15, inset 0 0 32px ${proyecto.color}08`
              : `0 8px 24px rgba(0,0,0,0.2), inset 0 0 16px rgba(0,0,0,0.1)`,
          }}
          transition={{ duration: 0.4 }}
        >
          {/* Glow background effect */}
          {hovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, ${proyecto.color}12 0%, transparent 60%)`,
              }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          )}

          {/* Image Container with shine effect */}
          <motion.div
            className="relative w-full overflow-hidden bg-black/20 flex-shrink-0"
            style={{ height: "240px" }}
            animate={{
              background: hovered ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.2)",
            }}
            transition={{ duration: 0.3 }}
          >
            <AnimatedImage
              src={proyecto.imagen}
              alt={proyecto.titulo}
              hovering={hovered}
            />

            {/* Shine effect overlay */}
            {hovered && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
                  width: "200%",
                }}
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 2.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
            )}

            {/* Progress bar - appears on hover */}
            {hovered && proyecto.progreso && (
              <motion.div
                className="absolute bottom-0 left-0 w-full h-1.5"
                style={{
                  background: "rgba(0,0,0,0.4)",
                  overflow: "hidden",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  style={{
                    height: "100%",
                    background: `linear-gradient(90deg, ${proyecto.color} 0%, ${proyecto.color}dd 100%)`,
                    boxShadow: `0 0 12px ${proyecto.color}66`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${proyecto.progreso}%` }}
                  transition={{ duration: 1.2, ease: "easeOut", type: "spring", stiffness: 60 }}
                />
              </motion.div>
            )}

            {/* Status badge overlay */}
            <motion.div
              className="absolute top-3 right-3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: hovered ? 1 : 0.8, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.span
                style={{
                  display: "inline-block",
                  fontSize: "10px",
                  fontWeight: "700",
                  padding: "5px 14px",
                  borderRadius: "20px",
                  background: proyecto.estado === "Completado"
                    ? "rgba(255,255,255,0.15)"
                    : "rgba(0,0,0,0.15)",
                  color: proyecto.estado === "Completado"
                    ? COLORS.white
                    : proyecto.color,
                  border: `1.5px solid ${proyecto.estado === "Completado" ? COLORS.white : proyecto.color}55`,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  backdropFilter: "blur(12px)",
                  boxShadow: `0 8px 24px ${proyecto.color}15`,
                }}
                whileHover={{ scale: 1.1 }}
              >
                {proyecto.estado}
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Content Container */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: "20px",
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* Title */}
            <motion.h3
              className="font-bold mb-2 line-clamp-2"
              style={{
                fontSize: "18px",
                color: COLORS.white,
                lineHeight: "1.3",
              }}
              animate={{
                scale: hovered ? 1.02 : 1,
                color: hovered ? proyecto.color : COLORS.white,
              }}
              transition={{ duration: 0.3 }}
            >
              {proyecto.titulo}
            </motion.h3>

            {/* Description */}
            <motion.p
              style={{
                fontSize: "13px",
                color: COLORS.muted,
                marginBottom: "12px",
                lineHeight: "1.5",
                flex: 1,
                display: "-webkit-box",
                WebkitLineClamp: hovered ? 3 : 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
              animate={{
                color: hovered
                  ? "rgba(255,255,255,0.65)"
                  : "rgba(255,255,255,0.45)",
              }}
              transition={{ duration: 0.3 }}
            >
              {proyecto.descripcion}
            </motion.p>

            {/* Team Section */}
            <motion.div
              className="flex items-center justify-between mb-3 pb-3 border-b"
              style={{
                borderColor: COLORS.borderDefault,
              }}
              animate={{
                borderColor: hovered ? `${proyecto.color}44` : COLORS.borderDefault,
              }}
              transition={{ duration: 0.3 }}
            >
              <span style={{ fontSize: "11px", color: COLORS.muted, fontWeight: "600" }}>
                Equipo
              </span>
              <TeamMembers
                integrantes={proyecto.integrantes}
                color={proyecto.color}
              />
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              className="mb-4"
              animate={{
                opacity: hovered ? 1 : 0.8,
              }}
            >
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {proyecto.tecnologias.slice(0, 3).map((tech, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: hovered ? idx * 0.05 : 0, duration: 0.3 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    style={{
                      fontSize: "11px",
                      padding: "5px 10px",
                      borderRadius: "6px",
                      border: `1.5px solid ${proyecto.color}55`,
                      background: `${proyecto.color}12`,
                      color: proyecto.color,
                      fontWeight: "600",
                      cursor: "default",
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
                {proyecto.tecnologias.length > 3 && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      fontSize: "11px",
                      color: COLORS.muted,
                      alignSelf: "center",
                      fontWeight: "600",
                    }}
                  >
                    +{proyecto.tecnologias.length - 3}
                  </motion.span>
                )}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex gap-2"
              animate={{ opacity: hovered ? 1 : 0.7 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                onClick={() => setShowModal(true)}
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: `2px solid ${proyecto.color}`,
                  background: proyecto.color,
                  color: COLORS.black,
                  fontSize: "12px",
                  fontWeight: "700",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
                  position: "relative",
                  overflow: "hidden",
                }}
                whileHover={{
                  scale: 1.08,
                  boxShadow: `0 12px 32px ${proyecto.color}40`,
                  y: -2,
                }}
                whileTap={{ scale: 0.92 }}
              >
                Detalles
              </motion.button>

              <motion.button
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: `2px solid ${proyecto.color}66`,
                  background: `${proyecto.color}10`,
                  color: proyecto.color,
                  fontSize: "12px",
                  fontWeight: "700",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
                }}
                whileHover={{
                  background: `${proyecto.color}25`,
                  borderColor: proyecto.color,
                  scale: 1.08,
                  y: -2,
                }}
                whileTap={{ scale: 0.92 }}
              >
                Ver Más
              </motion.button>
            </motion.div>
          </div>

          {/* Border glow effect */}
          {hovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{
                border: `2px solid ${proyecto.color}`,
              }}
              animate={{
                boxShadow: [
                  `inset 0 0 24px ${proyecto.color}15, 0 0 24px ${proyecto.color}25`,
                  `inset 0 0 32px ${proyecto.color}20, 0 0 32px ${proyecto.color}35`,
                  `inset 0 0 24px ${proyecto.color}15, 0 0 24px ${proyecto.color}25`,
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
            />
          )}
        </motion.div>
      </motion.div>

      {/* Modal */}
      <ProjectDetailsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        proyecto={proyecto}
      />
    </>
  );
}
