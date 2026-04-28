import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import Sobre from '../components/sections/Sobre';
import Niveles from '../components/sections/Niveles';
import Malla from '../components/sections/Malla';
import Proyectos from '../components/sections/Proyectos';
import Contacto from '../components/sections/Contacto';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        <Hero />
        <Sobre />
        <Niveles />
        <Malla />
        <Proyectos />
        <Contacto />
      </main>

      <Footer />
    </div>
  );
}