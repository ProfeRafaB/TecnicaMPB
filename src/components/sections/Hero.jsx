import { ArrowDownRight, Braces, TerminalSquare } from 'lucide-react';
import { motion as Motion } from 'motion/react';

export default function Hero() {
  return (
    <section id="inicio" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-orb" aria-hidden="true" />
      <div className="hero-inner">
        <Motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="eyebrow">
          <span />
          TÉCNICA EN PROGRAMACIÓN DE SOFTWARE
        </Motion.p>
        <Motion.h1 id="hero-title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
          Desarrollo y
          <br />
          <em>Análisis</em> de Software.
        </Motion.h1>
        <Motion.p className="hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
          Aprendemos. Creamos. Programamos. Transformamos.
        </Motion.p>
        <Motion.div className="hero-actions" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}>
          <a className="button-primary" href="#proyectos">
            Ver proyectos <ArrowDownRight size={18} />
          </a>
          <a className="text-link" href="#tecnica">
            Conoce la técnica
          </a>
        </Motion.div>
      </div>
      <div className="code-object">
        <div className="object-top">
          <TerminalSquare size={18} /> <span>BUILDING IDEAS</span>
          <i />
        </div>
        <div className="object-code">
          <span>&lt;software /&gt;</span>
          <strong>{'{ }'}</strong>
          <Braces size={30} />
        </div>
        <div className="object-bottom">
          SCROLL TO EXPLORE <b>↓</b>
        </div>
      </div>
    </section>
  );
}
