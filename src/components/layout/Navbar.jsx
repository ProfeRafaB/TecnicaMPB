import { useState } from "react";
import { Code2, Menu, X } from "lucide-react";
const navItems = [
  ["Inicio", "#inicio"],
  ["La técnica", "#tecnica"],
  ["Proyectos", "#proyectos"],
  ["Momentos", "#momentos"],
  ["Docentes", "#docentes"],
  ["Estudiantes", "#estudiantes"],
  ["Contacto", "#contacto"],
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-nav-wrap">
      <nav className="site-nav" aria-label="Navegación principal">
        <a href="#inicio" className="brand" onClick={() => setOpen(false)}>
          <Code2 size={21} />
          <span>
            MPB<span className="brand-mark">/DEV</span>
          </span>
        </a>
        <div className="nav-links">
          {navItems.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </div>
        <button
          className="menu-button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="mobile-menu">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
