import { useState, useEffect, useRef } from "react";

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre la técnica", href: "#sobre" },
  { label: "Niveles / Años", href: "#niveles" },
  { label: "Malla curricular", href: "#malla" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Recursos", href: "#recursos" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [bubbleStyle, setBubbleStyle] = useState({});
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    moveBubbleTo(activeIndex);
  }, [activeIndex]);

  const moveBubbleTo = (index) => {
    const el = itemRefs.current[index];
    if (!el || !navRef.current) return;
    const navRect = navRef.current.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setBubbleStyle({
      left: elRect.left - navRect.left,
      width: elRect.width,
      height: elRect.height,
    });
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${
        scrolled ? "pt-3" : "pt-6"
      }`}
    >
      <nav
        ref={navRef}
        className={`relative flex items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-500 ${
          scrolled
            ? "shadow-[0_8px_32px_rgba(0,0,0,0.18)]"
            : "shadow-[0_4px_20px_rgba(0,0,0,0.10)]"
        }`}
        style={{
          background: scrolled
            ? "rgba(255,255,255,0.18)"
            : "rgba(255,255,255,0.12)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.28)",
        }}
      >
        {/* Burbuja deslizante */}
        <span
          className="absolute rounded-xl transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] pointer-events-none"
          style={{
            left: bubbleStyle.left ?? 0,
            width: bubbleStyle.width ?? 0,
            height: bubbleStyle.height ?? 0,
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.35)",
            border: "1px solid rgba(255,255,255,0.55)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
          }}
        />

        {navItems.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            ref={(el) => (itemRefs.current[i] = el)}
            onClick={() => setActiveIndex(i)}
            onMouseEnter={() => moveBubbleTo(i)}
            onMouseLeave={() => moveBubbleTo(activeIndex)}
            className={`relative z-10 px-4 py-2 text-sm font-medium rounded-xl whitespace-nowrap transition-colors duration-200 cursor-pointer select-none ${
              activeIndex === i
                ? "text-white drop-shadow-sm"
                : "text-white/70 hover:text-white"
            }`}
            style={{ fontFamily: "'Sora', sans-serif", letterSpacing: "0.01em" }}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Google Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
    </div>
  );
}