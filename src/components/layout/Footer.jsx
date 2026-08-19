import { ArrowUpRight, Code2 } from 'lucide-react';

const links = [['Inicio', '#inicio'], ['La técnica', '#tecnica'], ['Proyectos', '#proyectos'], ['Momentos', '#momentos'], ['Estudiantes', '#estudiantes'], ['Contacto', '#contacto']];

export default function Footer() {
  return <footer className="tech-footer">
    <div className="footer-grid-lines" aria-hidden="true" />
    <div className="footer-content">
      <div className="footer-intro footer-reveal">
        <p className="eyebrow"><span />CIERRE DE SESIÓN</p>
        <a className="footer-brand" href="#inicio"><Code2 size={24} /><span>MPB<span>/DEV</span></span></a>
        <p>Técnica en Programación de Software.<br />I.E. Misael Pastrana Borrero.</p>
      </div>
      <nav className="footer-nav footer-reveal" aria-label="Enlaces del pie de página">
        <p>EXPLORAR</p>
        {links.map(([label, href]) => <a key={href} href={href}>{label}<ArrowUpRight size={14} /></a>)}
      </nav>
      <div className="footer-contact footer-reveal">
        <p>CONTACTO</p>
        <span>Canales institucionales<br />por confirmar.</span>
        <a href="#contacto" className="footer-cta">Actualizar información <ArrowUpRight size={15} /></a>
      </div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} · I.E. Misael Pastrana Borrero</span><span>DESIGNED FOR FUTURE BUILDERS <i /></span></div>
  </footer>;
}
