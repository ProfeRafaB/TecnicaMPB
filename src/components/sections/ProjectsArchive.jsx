import { useMemo, useState } from "react";
import { ArrowUpRight, FileText } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import data from "../../data/projects.json";

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12 },
};
function Placeholder() {
  return (
    <div className="archive-placeholder">
      <FileText size={29} />
      <span>ARCHIVO VISUAL PENDIENTE</span>
    </div>
  );
}
function ProjectFilters({ years, categories, filters, setFilters }) {
  return (
    <div className="archive-filters">
      <div>
        <small>AÑO</small>
        {["Todos", ...years].map((value) => (
          <button
            key={value}
            className={filters.year === value ? "active" : ""}
            onClick={() => setFilters({ ...filters, year: value })}
          >
            {value}
          </button>
        ))}
      </div>
      <div>
        <small>CATEGORÍA</small>
        {["Todos", ...categories].map((value) => (
          <button
            key={value}
            className={filters.category === value ? "active" : ""}
            onClick={() => setFilters({ ...filters, category: value })}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}
function ProjectCard({ project, index }) {
  return (
    <motion.article
      {...reveal}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="archive-card"
    >
      {project.cover ? (
        <img
          className="archive-cover"
          src={project.cover}
          alt={project.title}
          loading="lazy"
        />
      ) : (
        <Placeholder />
      )}
      <div className="archive-card-body">
        <div className="archive-meta">
          <span>{project.year}</span>
          <span>{project.level}</span>
          <span>{project.category}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="archive-tech">
          {(project.technologies || []).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <div className="archive-actions">
          <Link to={`/proyectos/${project.id}`}>
            Ver documentación <ArrowUpRight size={17} />
          </Link>
          {project.links?.demo && (
            <a href={project.links.demo} target="_blank" rel="noreferrer">
              Visitar sitio web <ArrowUpRight size={17} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
export default function ProjectsArchive() {
  const [filters, setFilters] = useState({ year: "Todos", category: "Todos" });
  const projects = data.projects || [];
  const years = useMemo(
    () =>
      [...new Set(projects.map((p) => String(p.year)).filter(Boolean))].sort(
        (a, b) => b - a,
      ),
    [projects],
  );
  const categories = useMemo(
    () => [...new Set(projects.map((p) => p.category).filter(Boolean))],
    [projects],
  );
  const visible = projects.filter(
    (p) =>
      (filters.year === "Todos" || String(p.year) === filters.year) &&
      (filters.category === "Todos" || p.category === filters.category),
  );
  return (
    <section id="proyectos" className="section section-alt">
      <div className="section-container">
        <motion.div {...reveal} className="archive-heading">
          <p className="eyebrow">
            <span />
            04 / PROJECT ARCHIVE
          </p>
          <h2>
            Proyectos que dejan <em>registro.</em>
          </h2>
          <p>
            Una colección de proyectos creados por los estudiantes de la Técnica
            en Programación de Software.
          </p>
        </motion.div>
        <ProjectFilters
          years={years}
          categories={categories}
          filters={filters}
          setFilters={setFilters}
        />
        <motion.div layout className="archive-grid">
          {visible.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
        {!visible.length && (
          <p className="archive-empty">No hay proyectos con estos filtros.</p>
        )}
      </div>
    </section>
  );
}
