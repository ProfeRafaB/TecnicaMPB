import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { TeamMembers } from './TeamMembers';

const COLORS = {
  white: "#ffffff",
  black: "#000000",
  gray: "#f5f5f5",
  darkGray: "#333333",
  muted: "rgba(255,255,255,0.45)",
  borderDefault: "rgba(255,255,255,0.1)",
};

export function ProjectDetailsModal({ isOpen, onClose, proyecto }) {
  const [activeTab, setActiveTab] = useState('overview');

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const contentVariants = {
    hidden: { y: 60, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1],
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  const tabs = ['overview', 'equipo', 'detalles', 'métricas'];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40"
            style={{
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(8px)",
            }}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 overflow-y-auto"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              className="w-full max-w-4xl rounded-2xl overflow-hidden"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.1) 100%)`,
                border: `2px solid ${proyecto.color}33`,
                backdropFilter: "blur(12px)",
                boxShadow: `0 32px 80px ${proyecto.color}25, 0 0 60px ${proyecto.color}15, inset 0 0 40px ${proyecto.color}08`,
              }}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header con imagen */}
              <motion.div
                className="relative h-64 overflow-hidden bg-gradient-to-b from-transparent to-black/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.img
                  src={proyecto.imagen}
                  alt={proyecto.titulo}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
                    width: "200%",
                  }}
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 3,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                />

                {/* Overlay gradiente */}
                <motion.div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%)`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />

                {/* Close button */}
                <motion.button
                  className="absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center z-10"
                  style={{
                    background: "rgba(0,0,0,0.5)",
                    border: `1.5px solid ${proyecto.color}55`,
                    color: proyecto.color,
                    cursor: "pointer",
                    fontSize: "18px",
                    backdropFilter: "blur(8px)",
                    fontWeight: "600",
                  }}
                  whileHover={{
                    background: proyecto.color,
                    color: COLORS.black,
                    scale: 1.15,
                    boxShadow: `0 0 24px ${proyecto.color}66`,
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                >
                  ✕
                </motion.button>

                {/* Status badge */}
                <motion.div
                  className="absolute bottom-4 left-4"
                  variants={itemVariants}
                >
                  <motion.span
                    style={{
                      display: "inline-block",
                      fontSize: "11px",
                      fontWeight: "700",
                      padding: "7px 16px",
                      borderRadius: "20px",
                      background: proyecto.estado === "Completado"
                        ? "rgba(255,255,255,0.15)"
                        : `${proyecto.color}15`,
                      color: proyecto.estado === "Completado"
                        ? COLORS.white
                        : proyecto.color,
                      border: `1.5px solid ${proyecto.estado === "Completado" ? COLORS.white : proyecto.color}55`,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      backdropFilter: "blur(8px)",
                      boxShadow: `0 8px 24px ${proyecto.color}15`,
                    }}
                    whileHover={{ scale: 1.08 }}
                  >
                    {proyecto.estado}
                  </motion.span>
                </motion.div>
              </motion.div>

              {/* Content */}
              <div className="p-8">
                {/* Title y descripción corta - Separado */}
                <motion.div
                  variants={itemVariants}
                  className="mb-12 pb-8"
                  style={{
                    borderBottom: `2px solid ${COLORS.borderDefault}`,
                  }}
                >
                  <motion.h2
                    style={{
                      fontSize: "36px",
                      fontWeight: "800",
                      color: COLORS.white,
                      marginBottom: "16px",
                      lineHeight: "1.2",
                    }}
                    animate={{ color: proyecto.color }}
                    transition={{ duration: 0.5 }}
                  >
                    {proyecto.titulo}
                  </motion.h2>
                  <motion.p
                    style={{
                      color: COLORS.muted,
                      fontSize: "15px",
                      lineHeight: "1.7",
                    }}
                    animate={{ color: "rgba(255,255,255,0.65)" }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    {proyecto.descripcion}
                  </motion.p>
                </motion.div>

                {/* Tabs */}
                <motion.div
                  className="flex gap-2 mb-8"
                  style={{
                    borderBottom: `1px solid ${COLORS.borderDefault}`,
                  }}
                  variants={itemVariants}
                >
                  {tabs.map((tab) => (
                    <motion.button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className="relative px-5 py-4 font-semibold text-sm transition-all"
                      style={{
                        color: activeTab === tab ? proyecto.color : COLORS.muted,
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        textTransform: "capitalize",
                      }}
                      whileHover={{ color: proyecto.color }}
                    >
                      {tab === 'overview' && '📋 General'}
                      {tab === 'equipo' && '👥 Equipo'}
                      {tab === 'detalles' && '⚙️ Detalles'}
                      {tab === 'métricas' && '📊 Métricas'}

                      {/* Underline animation */}
                      {activeTab === tab && (
                        <motion.div
                          className="absolute bottom-0 left-5 right-5 h-0.5"
                          style={{
                            background: proyecto.color,
                            boxShadow: `0 0 12px ${proyecto.color}66`,
                          }}
                          layoutId="underline"
                          transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </motion.div>

                {/* Tab Content */}
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                >
                  {activeTab === 'overview' && (
                    <div className="space-y-4">
                      <motion.div
                        variants={itemVariants}
                        className="p-5 rounded-lg"
                        style={{
                          background: "rgba(255,255,255,0.08)",
                          border: "1.5px solid rgba(255,255,255,0.15)",
                          backdropFilter: "blur(8px)",
                        }}
                        whileHover={{
                          background: "rgba(255,255,255,0.12)",
                          borderColor: "rgba(255,255,255,0.25)",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.h4
                          style={{
                            color: proyecto.color,
                            fontWeight: "700",
                            marginBottom: "10px",
                            fontSize: "15px",
                          }}
                        >
                          Descripción Completa
                        </motion.h4>
                        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "14px", lineHeight: "1.7" }}>
                          {proyecto.descripcionCompleta || proyecto.descripcion}
                        </p>
                      </motion.div>

                      <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-2 gap-4"
                      >
                        {[{ label: "Fecha de Inicio", value: proyecto.fechaInicio || "Enero 2026" }, { label: "Duración", value: proyecto.duracion || "3 meses" }].map((item, idx) => (
                          <motion.div
                            key={idx}
                            className="p-5 rounded-lg"
                            style={{
                              background: "rgba(255,255,255,0.08)",
                              border: "1.5px solid rgba(255,255,255,0.15)",
                              backdropFilter: "blur(8px)",
                            }}
                            whileHover={{
                              background: "rgba(255,255,255,0.12)",
                              borderColor: "rgba(255,255,255,0.25)",
                              y: -2,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <motion.div style={{ color: COLORS.muted, fontSize: "12px", marginBottom: "8px", fontWeight: "600" }}>
                              {item.label}
                            </motion.div>
                            <motion.div style={{ color: COLORS.white, fontSize: "15px", fontWeight: "700" }}>
                              {item.value}
                            </motion.div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  )}

                  {activeTab === 'equipo' && (
                    <div className="space-y-4">
                      <motion.div variants={itemVariants}>
                        <h4 style={{ color: proyecto.color, fontWeight: "600", marginBottom: "12px" }}>
                          Miembros del Equipo
                        </h4>
                        <div className="space-y-3">
                          {proyecto.integrantes.map((integrante, idx) => (
                            <motion.div
                              key={idx}
                              variants={itemVariants}
                              className="flex items-center gap-4 p-4 rounded-lg"
                              style={{
                                background: "rgba(255,255,255,0.08)",
                                border: "1.5px solid rgba(255,255,255,0.15)",
                                backdropFilter: "blur(8px)",
                              }}
                              whileHover={{
                                background: "rgba(255,255,255,0.13)",
                                borderColor: "rgba(255,255,255,0.28)",
                                x: 4,
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              <motion.div
                                style={{
                                  width: "44px",
                                  height: "44px",
                                  borderRadius: "8px",
                                  background: `linear-gradient(135deg, ${proyecto.color}33 0%, ${proyecto.color}11 100%)`,
                                  border: `1.5px solid ${proyecto.color}55`,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "14px",
                                  fontWeight: "700",
                                  color: proyecto.color,
                                  flexShrink: 0,
                                }}
                                whileHover={{ scale: 1.1 }}
                              >
                                {integrante.nombre.split(' ').map(n => n.charAt(0)).join('').substring(0, 2).toUpperCase()}
                              </motion.div>
                              <div className="flex-1">
                                <motion.div
                                  style={{
                                    color: COLORS.white,
                                    fontWeight: "700",
                                    fontSize: "14px",
                                  }}
                                >
                                  {integrante.nombre}
                                </motion.div>
                                <motion.div
                                  style={{
                                    color: proyecto.color,
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    marginTop: "2px",
                                  }}
                                >
                                  {integrante.rol}
                                </motion.div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  )}

                  {activeTab === 'detalles' && (
                    <div className="space-y-4">
                      <motion.div variants={itemVariants}>
                        <h4 style={{ color: proyecto.color, fontWeight: "600", marginBottom: "12px" }}>
                          Tecnologías Utilizadas
                        </h4>
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                          {proyecto.tecnologias.map((tech, idx) => (
                            <motion.span
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.05, duration: 0.3 }}
                              whileHover={{ scale: 1.08, y: -2 }}
                              style={{
                                fontSize: "12px",
                                padding: "7px 14px",
                                borderRadius: "6px",
                                border: `1.5px solid ${proyecto.color}55`,
                                background: `${proyecto.color}15`,
                                color: proyecto.color,
                                fontWeight: "600",
                                cursor: "default",
                                backdropFilter: "blur(6px)",
                              }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>

                      <motion.div
                        variants={itemVariants}
                        className="p-5 rounded-lg"
                        style={{
                          background: "rgba(255,255,255,0.08)",
                          border: "1.5px solid rgba(255,255,255,0.15)",
                          backdropFilter: "blur(8px)",
                        }}
                        whileHover={{
                          background: "rgba(255,255,255,0.12)",
                          borderColor: "rgba(255,255,255,0.25)",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.h4 style={{ color: proyecto.color, fontWeight: "700", marginBottom: "12px", fontSize: "15px" }}>
                          Links y Recursos
                        </motion.h4>
                        <div className="space-y-2">
                          {proyecto.links && proyecto.links.map((link, idx) => (
                            <motion.a
                              key={idx}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              variants={itemVariants}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                color: proyecto.color,
                                fontSize: "13px",
                                textDecoration: "none",
                                padding: "6px 0",
                                fontWeight: "500",
                              }}
                              whileHover={{
                                x: 6,
                                color: COLORS.white,
                                textDecoration: "underline",
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <span style={{ fontSize: "16px" }}>{link.icono}</span>
                              {link.nombre}
                            </motion.a>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  )}

                  {activeTab === 'métricas' && (
                    <div className="space-y-4">
                      {proyecto.metricas && proyecto.metricas.map((metrica, idx) => (
                        <motion.div
                          key={idx}
                          variants={itemVariants}
                          className="space-y-3 p-4 rounded-lg"
                          style={{
                            background: "rgba(255,255,255,0.08)",
                            border: "1.5px solid rgba(255,255,255,0.15)",
                          }}
                          whileHover={{
                            background: "rgba(255,255,255,0.12)",
                            borderColor: "rgba(255,255,255,0.25)",
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                            <span style={{ color: COLORS.muted, fontSize: "13px", fontWeight: "600" }}>
                              {metrica.nombre}
                            </span>
                            <motion.span
                              style={{
                                color: proyecto.color,
                                fontSize: "14px",
                                fontWeight: "700",
                              }}
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ delay: idx * 0.1 + 1, duration: 0.5 }}
                            >
                              {metrica.valor}%
                            </motion.span>
                          </div>
                          <div
                            style={{
                              width: "100%",
                              height: "8px",
                              borderRadius: "4px",
                              background: "rgba(255,255,255,0.1)",
                              border: `1px solid ${proyecto.color}33`,
                              overflow: "hidden",
                              backdropFilter: "blur(4px)",
                            }}
                          >
                            <motion.div
                              style={{
                                height: "100%",
                                background: `linear-gradient(90deg, ${proyecto.color}66 0%, ${proyecto.color} 100%)`,
                                borderRadius: "4px",
                                boxShadow: `0 0 12px ${proyecto.color}66`,
                              }}
                              initial={{ width: 0 }}
                              animate={{ width: `${metrica.valor}%` }}
                              transition={{
                                duration: 1.2,
                                delay: idx * 0.12,
                                ease: "easeOut",
                                type: "spring",
                                stiffness: 60,
                              }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* Action buttons */}
                <motion.div
                  variants={itemVariants}
                  className="flex gap-4 mt-8 pt-8"
                  style={{
                    borderTop: `1px solid ${COLORS.borderDefault}`,
                  }}
                >
                  <motion.button
                    style={{
                      flex: 1,
                      padding: "13px 28px",
                      borderRadius: "8px",
                      border: `2px solid ${proyecto.color}`,
                      background: proyecto.color,
                      color: COLORS.black,
                      fontSize: "13px",
                      fontWeight: "700",
                      cursor: "pointer",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                    whileHover={{
                      scale: 1.06,
                      boxShadow: `0 16px 40px ${proyecto.color}50`,
                      y: -2,
                    }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ duration: 0.3 }}
                  >
                    Ver Proyecto
                  </motion.button>

                  <motion.button
                    style={{
                      flex: 1,
                      padding: "13px 28px",
                      borderRadius: "8px",
                      border: `2px solid ${proyecto.color}55`,
                      background: `${proyecto.color}10`,
                      color: proyecto.color,
                      fontSize: "13px",
                      fontWeight: "700",
                      cursor: "pointer",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      backdropFilter: "blur(8px)",
                    }}
                    whileHover={{
                      background: `${proyecto.color}20`,
                      borderColor: proyecto.color,
                      scale: 1.06,
                      y: -2,
                    }}
                    whileTap={{ scale: 0.92 }}
                    onClick={onClose}
                    transition={{ duration: 0.3 }}
                  >
                    Cerrar
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
