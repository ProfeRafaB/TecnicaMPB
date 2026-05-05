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



export default function Home() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">

      {/* 🔵 FONDO (animaciones) */}
      <div className="absolute inset-0 z-0">


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
      <div className="absolute inset-0 z-0">


        <Aurora
          colorStops={["#7cff67", "#d9ff1c", " #39FF14"]}
          blend={0.91}
          amplitude={1.0}
          speed={1}
        />
      </div>



      {/* 🟢 CONTENIDO */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
      </div>

    </div>


  );

}












