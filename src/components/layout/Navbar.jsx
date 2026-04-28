import { useState } from "react";

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Niveles", href: "#niveles" },
  { label: "Malla", href: "#malla" },
  { label: "Proyectos", href: "#proyectos" },
];

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-7xl">
        
        {/* Glass Effect */}
        <div className="backdrop-blur-3xl bg-white/10 border border-white/20 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] px-8 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">TP</span>
            </div>

            <h1 className="hidden sm:block text-white font-bold text-lg">
              Técnica Programación
            </h1>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-white/80 hover:text-white transition"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Contact Button */}
          <a
            href="#contacto"
            className="hidden md:block px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
          >
            Contacto
          </a>

          {/* Mobile Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xl z-[60] md:hidden flex flex-col items-center justify-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-white text-2xl font-bold"
              onClick={() => setIsMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}

          <a
            href="#contacto"
            className="px-6 py-3 bg-blue-500 text-white rounded-full"
            onClick={() => setIsMobileOpen(false)}
          >
            Contacto
          </a>
        </div>
      )}
    </>
  );
}