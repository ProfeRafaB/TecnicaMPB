import { useState, useEffect, useRef, useMemo } from 'react';
import ShinyText from '../ShinyText ';

export default function Proyectos() {
  const [scrollData, setScrollData] = useState({ progress: 0, bgOpacity: 0 });
  const sectionRef = useRef(null);

  // Actualizar scroll con throttling optimizado
  useEffect(() => {
    let lastUpdate = 0;
    const throttleDelay = 16; // ~60fps

    const handleScroll = () => {
      const now = Date.now();
      if (now - lastUpdate < throttleDelay) return;
      lastUpdate = now;

      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        const scrollProgress = 1 - (rect.top / windowHeight);
        const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

        // Calcular opacidad de fondo
        let bgOpacity = 0;
        if (clampedProgress >= 0.2 && clampedProgress <= 0.8) {
          bgOpacity = (clampedProgress - 0.2) / 0.6;
        } else if (clampedProgress > 0.8) {
          bgOpacity = 1;
        }

        setScrollData({ progress: clampedProgress, bgOpacity });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="proyectos"
      className="relative min-h-screen"
      style={{ minHeight: '300vh' }}
    >
      {/* Fondo que cambia de negro a blanco */}
      <div
        className="fixed top-0 left-0 w-full h-screen -z-10"
        style={{
          backgroundColor: `rgba(255, 255, 255, ${scrollData.bgOpacity})`,
          willChange: 'background-color',
          pointerEvents: 'none'
        }}
      />

      {/* Contenido con scroll */}
      <div className="relative z-10 w-full">
        
        {/* Sección 1: Título */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <div className="text-center mb-20">
            <h2
              style={{
                fontSize: 'clamp(4rem, 15vw, 18rem)',
                opacity: 1 - Math.max(0, scrollData.progress - 0.5) * 1.5,
                color: '#999999',
                fontWeight: 'bold',
                willChange: 'opacity'
              }}
            >
              <ShinyText
                text=" Proyectos Destacados"
                speed={2}
                delay={0}
                color="#121111"
                shineColor="#cccccc"
                spread={120}
                direction="left"
                yoyo={false}
                pauseOnHover={false}
                disabled={false}
              />
            </h2>
          </div>

          {/* Instrucciones iniciales */}
          <div
            className="text-center"
            style={{ color: scrollData.bgOpacity > 0.5 ? '#333333' : '#999999' }}
          >
            <p className="text-lg">Scrollea hacia abajo para viajar a otra dimensión</p>
            <p className="text-sm mt-2">Scrollea hacia arriba para regresar</p>
          </div>
        </div>

        {/* Sección 2: Otra dimensión blanca */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <div
            style={{
              opacity: Math.max(0, scrollData.progress - 0.3),
              willChange: 'opacity',
              color: '#000000'
            }}
            className="text-center"
          >
            <h3 className="text-4xl font-bold mb-4">
              Bienvenido alos mejores proyecto de la tecnca de programación 2026
            </h3>
            
          </div>
        </div>

        {/* Sección 3: Mini Tutorial - Estilo Videojuego */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
          <div
            style={{
              opacity: Math.max(0, Math.min(1, (scrollData.progress - 0.5) * 2)),
              willChange: 'opacity',
              color: '#000000'
            }}
            className="text-center"
          >
            <h3 className="text-3xl font-bold mb-16">
              CONTROLES
            </h3>
            
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-32 items-center justify-center">
                {/* Teclas WASD - Movimiento */}
                <div className="flex flex-col items-center">
                  <p className="text-xl font-bold mb-12 text-gray-900">MOVIMIENTO</p>
                  
                  <div className="flex flex-col items-center gap-5">
                    {/* W */}
                    <div className="flex gap-5">
                      <div className="w-20 h-20 border-4 border-black rounded flex items-center justify-center transition-transform duration-200 hover:scale-110 cursor-pointer shadow-lg">
                        <span className="text-black font-bold text-4xl">W</span>
                      </div>
                    </div>
                    
                    {/* A S D */}
                    <div className="flex gap-5">
                      <div className="w-20 h-20 border-4 border-black rounded flex items-center justify-center transition-transform duration-200 hover:scale-110 cursor-pointer shadow-lg">
                        <span className="text-black font-bold text-4xl">A</span>
                      </div>
                      <div className="w-20 h-20 border-4 border-black rounded flex items-center justify-center transition-transform duration-200 hover:scale-110 cursor-pointer shadow-lg">
                        <span className="text-black font-bold text-4xl">S</span>
                      </div>
                      <div className="w-20 h-20 border-4 border-black rounded flex items-center justify-center transition-transform duration-200 hover:scale-110 cursor-pointer shadow-lg">
                        <span className="text-black font-bold text-4xl">D</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tecla E - Interactuar */}
                <div className="flex flex-col items-center">
                  <p className="text-xl font-bold mb-12 text-gray-900">INTERACTUAR</p>
                  
                  <div className="w-24 h-24 border-4 border-black rounded flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110 cursor-pointer">
                    <span className="text-black font-bold text-5xl">E</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mt-20 text-sm text-center">
                Presiona las teclas para explorar
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
