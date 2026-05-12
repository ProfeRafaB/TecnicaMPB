import { useState } from 'react';

export default function InstructorCard({ nombre, titulo, handle, estado, avatarUrl }) {
  const [isHovered, setIsHovered] = useState(false);

  // Descripciones basadas en el título
  const descripciones = {
    "Desarrollo Full Stack": "Experto en Frontend y Backend con tecnologías modernas. Enseña desde lo básico hasta arquitecturas escalables.",
    "Interfaz de Usuario": "Especialista en diseño de experiencias visuales atractivas. Crea interfaces intuitivas y funcionales.",
    "Guía Educativa": "Acompañamiento personalizado en el proceso de aprendizaje. Resolución de dudas y orientación académica."
  };

  const skills = {
    "Desarrollo Full Stack": ["React", "Node.js", "PostgreSQL"],
    "Interfaz de Usuario": ["Figma", "Tailwind", "WebGL"],
    "Guía Educativa": ["Mentoring", "Planificación", "Evaluación"]
  };

  const descripcion = descripciones[titulo] || "Profesional dedicado a la educación de calidad.";
  const skillsList = skills[titulo] || [];

  return (
    <div
      className="relative w-full max-w-sm h-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background glow - más grande */}
      <div
        className="absolute -inset-1 rounded-3xl opacity-0 transition-all duration-300 -z-10"
        style={{
          opacity: isHovered ? 0.4 : 0,
          background: 'radial-gradient(circle, #7cff67 0%, transparent 70%)',
          filter: 'blur(30px)',
          pointerEvents: 'none'
        }}
      />

      {/* Card - más largo */}
      <div
        className="relative rounded-3xl border border-white/15 backdrop-blur-lg p-8 transition-all duration-300 flex flex-col h-full"
        style={{
          background: 'linear-gradient(145deg, rgba(124, 255, 103, 0.08), rgba(217, 255, 28, 0.03))',
          transform: isHovered ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
          boxShadow: isHovered
            ? '0 30px 60px rgba(124, 255, 103, 0.2), inset 0 1px 0 rgba(217, 255, 28, 0.1)'
            : '0 10px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(124, 255, 103, 0.1)'
        }}
      >
        {/* Avatar section */}
        <div className="flex justify-center mb-6">
          <div className="relative w-28 h-28 group">
            <div
              className="absolute inset-0 rounded-full transition-all duration-300"
              style={{
                background: isHovered
                  ? 'linear-gradient(145deg, #7cff67, #d9ff1c)'
                  : 'linear-gradient(145deg, #7cff67, #39FF14)',
                opacity: 0.3,
                filter: 'blur(15px)'
              }}
            />
            <img
              src={avatarUrl}
              alt={nombre}
              className="relative w-full h-full rounded-full object-cover border-3 border-[#7cff67] transition-all duration-300"
              style={{
                boxShadow: isHovered ? '0 0 30px rgba(124, 255, 103, 0.5)' : '0 0 15px rgba(124, 255, 103, 0.3)'
              }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/112?bg=39FF14&text=👨';
              }}
            />
            {/* Online indicator - más grande */}
            {estado === 'Online' && (
              <div
                className="absolute bottom-1 right-1 w-6 h-6 bg-[#7cff67] rounded-full border-3 border-black shadow-lg animate-pulse"
                style={{
                  boxShadow: '0 0 15px rgba(124, 255, 103, 0.6)'
                }}
              />
            )}
          </div>
        </div>

        {/* Content section */}
        <div className="text-center space-y-3 mb-2 flex-1">
          {/* Nombre */}
          <h3 className="text-2xl font-bold text-white transition-all duration-300">
            {nombre}
          </h3>

          {/* Título */}
          <p
            className="text-sm font-semibold transition-all duration-300 tracking-wide"
            style={{
              color: isHovered ? '#d9ff1c' : '#7cff67',
              textShadow: isHovered ? '0 0 10px rgba(217, 255, 28, 0.5)' : 'none'
            }}
          >
            {titulo}
          </p>

          {/* Handle */}
          <p className="text-xs text-white/40 font-mono">@{handle}</p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#7cff67] to-transparent my-4 opacity-50" />

        {/* Descripción */}
        <p
          className="text-sm text-white/70 mb-5 leading-relaxed transition-all duration-300"
          style={{
            color: isHovered ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.7)'
          }}
        >
          {descripcion}
        </p>

        {/* Skills */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-[#7cff67] mb-3 uppercase tracking-wider">
            Especialidades
          </p>
          <div className="flex flex-wrap gap-2">
            {skillsList.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full text-xs font-medium border transition-all duration-300"
                style={{
                  background: isHovered ? 'rgba(124, 255, 103, 0.2)' : 'rgba(124, 255, 103, 0.1)',
                  borderColor: isHovered ? '#d9ff1c' : '#7cff67',
                  color: isHovered ? '#d9ff1c' : '#7cff67'
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Conocer Más button */}
        <button
          className="w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 relative overflow-hidden group uppercase tracking-wider"
          style={{
            background: isHovered ? '#7cff67' : 'rgba(124, 255, 103, 0.15)',
            color: isHovered ? '#120F17' : '#7cff67',
            border: `2px solid #7cff67`,
            boxShadow: isHovered ? '0 10px 25px rgba(124, 255, 103, 0.4)' : 'none',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        >
          <span className="relative z-10">Conocer Más</span>
        </button>
      </div>
    </div>
  );
}

