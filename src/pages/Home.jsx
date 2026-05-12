import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import Sobre from '../components/sections/Sobre';
import Niveles from '../components/sections/Niveles';
import Malla from '../components/sections/Malla';
import Proyectos from '../components/sections/Proyectos';
import Contacto from '../components/sections/Contacto';
import LiquidEther from '../components/LiquidEther ';
import Aurora from '../components/Aurora';
import Galeria from '../components/sections/Galeria';
import Profesores from '../components/sections/Profesores';
import { useInView } from '../hooks/useInView';
import { useState, useEffect, useRef } from 'react';




export default function Home() {
  const [proyectosOpacity, setProyectosOpacity] = useState(0);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const proyectosRef = useRef(null);
  const heroRef = useRef(null);
  
  // Refs para animaciones de entrada
  const [galeriaRef, galeriaInView] = useInView();
  const [profesoresRef, profesoresInView] = useInView();
  const [mallaRef, mallaInView] = useInView();

  // Detectar scroll en la sección Proyectos y Hero
  useEffect(() => {
    let lastUpdate = 0;
    const throttleDelay = 16;

    const handleScroll = () => {
      const now = Date.now();
      if (now - lastUpdate < throttleDelay) return;
      lastUpdate = now;

      // Detectar scroll en Hero
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Si Hero está completamente fuera de vista (scrolleó pasado), opacidad 0
        if (rect.bottom < 0) {
          setHeroOpacity(0);
        } else {
          setHeroOpacity(1);
        }
      }

      // Detectar scroll en Proyectos
      if (proyectosRef.current) {
        const rect = proyectosRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        const scrollProgress = 1 - (rect.top / windowHeight);
        const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

        if (clampedProgress < 0.2) {
          setProyectosOpacity(0);
        } else if (clampedProgress > 0.8) {
          setProyectosOpacity(1);
        } else {
          const transitionProgress = (clampedProgress - 0.2) / 0.6;
          setProyectosOpacity(transitionProgress);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Efectos - Solo Navbar + Hero */}
      <div 
        className="fixed top-0 left-0 right-0 w-full pointer-events-none z-0 overflow-hidden" 
        style={{ 
          height: 'calc(80px + 100vh)',
          opacity: heroOpacity,
          transition: 'opacity 0.3s ease-out'
        }}
      >
        <div className="absolute inset-0">
          <LiquidEther
            colors={['#39FF14', '#5BB328', '#39FF14']}
            mouseForce={20}
            cursorSize={100}
            isViscous
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
            color0="#7cff67"
            color1="#d9ff1c"
            color2="#39FF14"
          />
        </div>
        <div className="absolute inset-0">
          <Aurora
            colorStops={["#7cff67", "#d9ff1c", "#39FF14"]}
            blend={0.5}
            amplitude={0.2}
            speed={1}
          />
        </div>
      </div>

      {/* 🟢 CONTENIDO */}
      <div className="relative z-10 w-full">
        <div 
          className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
          style={{
            opacity: proyectosOpacity > 0.5 ? 0 : 1,
            pointerEvents: proyectosOpacity > 0.5 ? 'none' : 'auto',
            visibility: proyectosOpacity > 0.8 ? 'hidden' : 'visible'
          }}
        >
          <Navbar />
        </div>
        <div className="flex flex-col w-full gap-12">
          <div style={{ height: '120px' }} />
          <div ref={heroRef}>
            <Hero />
          </div>
          <div style={{ height: '200px' }}></div>
          <Sobre />
          <div style={{ height: '160px' }}></div>
          
          {/* Galeria con animación */}
          <div
            ref={galeriaRef}
            style={{
              opacity: galeriaInView ? 1 : 0,
              transform: galeriaInView ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
              willChange: 'transform, opacity'
            }}
          >
            <Galeria />
          </div>
          <div style={{ height: '160px' }}></div>
          
          {/* Profesores con animación */}
          <div
            ref={profesoresRef}
            style={{
              opacity: profesoresInView ? 1 : 0,
              transform: profesoresInView ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
              willChange: 'transform, opacity'
            }}
          >
            <Profesores />
          </div>
          <div style={{ height: '160px' }}></div>
          
          {/* Malla con animación */}
          <div
            ref={mallaRef}
            style={{
              opacity: mallaInView ? 1 : 0,
              transform: mallaInView ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
              willChange: 'transform, opacity'
            }}
          >
            <Malla/>
          </div>
          <div style={{ height: '160px' }}></div>
          
          <div ref={proyectosRef}>
            <Proyectos />
          </div>
          {/* <Niveles />
          
          
          <Contacto />
          <Footer /> */}

        </div>
      </div>

    </div>


  );

}












