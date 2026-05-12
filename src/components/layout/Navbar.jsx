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
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
        }
      `}</style>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center animate-fade-in-down backdrop-blur-md bg-black/20">
        <div className="flex items-center justify-between h-20 px-6 w-full max-w-7xl gap-20">

          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-3">
            <div className="w-16 h-16   flex items-center justify-center">
              <img src="/logo.png" alt="" />
            </div>

            <h1 className="hidden sm:block text-white font-bold text-lg">
              MPB /
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

       
          <button
            className="md:hidden text-white text-2xl"
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
            className="p-60px bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            onClick={() => setIsMobileOpen(false)}
          >
            Contacto
          </a>
        </div>
      )}
    </>
  );
}