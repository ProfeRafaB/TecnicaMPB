import ShinyText from '../ShinyText ';
import BorderGlow from '../BorderGlow ';

const GLOW_CONFIG = {
  edgeSensitivity: 30,
  glowColor: "40 80 80",
  backgroundColor: "#120F17",
  borderRadius: 28,
  glowRadius: 40,
  glowIntensity: 1,
  coneSpread: 25,
  animated: false,
  colors: ['#7cff67', '#d9ff1c', '#39FF14']
};

const periodos = [
  {
    id: 1,
    numero: "Período 1",
    duracion: "12 semanas",
    color: "#7cff67",
    temas: [
      "HTML & CSS",
      "JavaScript Básico",
      "Git & GitHub",
      "Lógica de Programación"
    ]
  },
  {
    id: 2,
    numero: "Período 2",
    duracion: "12 semanas",
    color: "#39FF14",
    temas: [
      "JavaScript Avanzado",
      "React Fundamentals",
      "APIs REST",
      "Bases de Datos SQL"
    ]
  },
  {
    id: 3,
    numero: "Período 3",
    duracion: "12 semanas",
    color: "#d9ff1c",
    temas: [
      "Backend Node.js",
      "Full Stack Projects",
      "Deploy & DevOps",
      "Portfolio & Entrevistas"
    ]
  }
];

export default function Malla() {
  return (
    <section id="malla" className="py-20">
      <div className="w-full flex flex-col items-center">

        {/* Header */}
        <div className="w-full max-w-5xl px-4 mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            <ShinyText
              text="📚 Malla Curricular"
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
        <div style={{ height: '80px' }}></div>

        {/* Timeline */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-7xl px-4">
            
            {/* Timeline Container */}
            <div className="relative py-12">
              
              {/* Línea conectora animada */}
              <div className="absolute top-1/3 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-400 via-yellow-300 to-transparent transform -translate-y-1/2 z-0 shadow-lg shadow-green-400/50"></div>

              {/* Periodos */}
              <div className="flex justify-between items-center gap-8 relative z-10">
                {periodos.map((periodo, idx) => (
                  <div key={periodo.id} className="flex-1">
                    
                    {/* Punto en la línea - Efecto pulsante */}
                    <div className="flex justify-center mb-12 relative">
                      <div 
                        className="w-8 h-8 rounded-full border-4 shadow-xl animate-pulse"
                        style={{ 
                          borderColor: periodo.color, 
                          backgroundColor: periodo.color,
                          boxShadow: `0 0 20px ${periodo.color}, 0 0 40px ${periodo.color}80`
                        }}
                      ></div>
                      <div 
                        className="absolute w-12 h-12 rounded-full border-2 animate-ping"
                        style={{ borderColor: periodo.color, opacity: 0.75 }}
                      ></div>
                    </div>

                    {/* Card del periodo - Más grande y atractiva */}
                    <BorderGlow
                      {...GLOW_CONFIG}
                      className="w-full h-full hover:scale-105 transition-transform duration-300"
                    >
                      <div style={{ padding: '2.5em' }} className="flex flex-col h-full gap-6 bg-gradient-to-br from-[#1a2a1f] to-[#0f1915]">
                        
                        {/* Header con número de período */}
                        <div className="border-b border-green-400/30 pb-4">
                          <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-4xl font-black" style={{ color: periodo.color }}>
                              {idx + 1}
                            </span>
                            <h3 className="text-2xl font-bold text-white">{periodo.numero}</h3>
                          </div>
                          <p className="text-sm text-green-400 font-semibold">{periodo.duracion}</p>
                        </div>

                        {/* Semanas Visual - Barras progresivas */}
                        <div>
                          <p className="text-xs text-yellow-300 font-bold mb-3 uppercase tracking-wider">Progreso: 12 semanas</p>
                          <div className="flex gap-1.5">
                            {Array.from({ length: 12 }).map((_, i) => (
                              <div
                                key={i}
                                className="flex-1 h-2 rounded-full transition-all duration-500 hover:h-3"
                                style={{ 
                                  backgroundColor: periodo.color,
                                  opacity: 0.3 + (i * 0.055),
                                  boxShadow: `0 0 ${5 + i}px ${periodo.color}80`
                                }}
                              ></div>
                            ))}
                          </div>
                        </div>

                        {/* Temas */}
                        <div className="flex-grow">
                          <p className="text-xs text-green-400 font-bold uppercase mb-3 tracking-widest">📖 Contenido:</p>
                          <ul className="space-y-2.5">
                            {periodo.temas.map((tema, i) => (
                              <li key={i} className="text-sm text-gray-200 flex items-center hover:text-green-300 transition-colors">
                                <span 
                                  className="inline-block w-1.5 h-1.5 rounded-full mr-3"
                                  style={{ backgroundColor: periodo.color, boxShadow: `0 0 8px ${periodo.color}` }}
                                ></span>
                                <span className="font-medium">{tema}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Footer - Badge */}
                        <div className="pt-4 border-t border-green-400/20">
                          <div 
                            className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
                            style={{ 
                              backgroundColor: `${periodo.color}20`,
                              color: periodo.color,
                              border: `1px solid ${periodo.color}40`
                            }}
                          >
                            {idx === 0 ? '🚀 Inicio' : idx === 1 ? '⚡ Aceleración' : '🎯 Especialización'}
                          </div>
                        </div>

                      </div>
                    </BorderGlow>
                  </div>
                ))}
              </div>

            </div>

            {/* Footer Info - Mejorado */}
            

          </div>
        </div>

      </div>
    </section>
  );
}
