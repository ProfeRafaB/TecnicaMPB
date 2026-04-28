import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import Sobre from '../components/sections/Sobre';
import Niveles from '../components/sections/Niveles';
import Malla from '../components/sections/Malla';
import Proyectos from '../components/sections/Proyectos';
import Contacto from '../components/sections/Contacto';
import FloatingLines from '../components/FloatingLines';


export default function Home() {
  return (
    <div className="min-h-screen bg-black relative">
      {/* Fondo FloatingLines */}
      <div className="absolute inset-0 w-full h-screen pointer-events-none">
        <FloatingLines
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={8}
          lineDistance={8}
          bendRadius={8}
          bendStrength={-2}
          interactive
          parallax={true}
          animationSpeed={1}
          gradientStart="#000000"
          gradientMid="#25d83a"
          gradientEnd="#c5df1c"
        />
      </div>

      {/* Contenido encima */}
      <div className="relative z-10">





        
        <Navbar />
        <Hero />
      </div>
      
    </div>
    
  );
  
}












