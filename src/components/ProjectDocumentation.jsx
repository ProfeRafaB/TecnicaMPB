import { useState } from "react";
import {
  ArrowLeft,
  ExternalLink,
  GitFork,
  Users,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import data from "../data/projects.json";

const sections = [
  ["introduction", "Introducción"],
  ["problem", "Problema"],
  ["objectives", "Objetivos"],
  ["solution", "Solución"],
  ["features", "Características"],
  ["development", "Desarrollo"],
  ["challenges", "Retos"],
  ["results", "Resultados"],
];
function Content({ value }) {
  if (Array.isArray(value))
    return value.length ? (
      <ul>
        {value.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    ) : (
      <p>Información pendiente de confirmar.</p>
    );
  return <p>{value || "Información pendiente de confirmar."}</p>;
}
export default function ProjectDocumentation() {
  const { id } = useParams();
  const project = (data.projects || []).find((item) => item.id === id);
  const [image, setImage] = useState(null);
  if (!project) return <Navigate to="/" replace />;
  const gallery = project.gallery || [];
  const move = (d) => setImage((image + d + gallery.length) % gallery.length);
  return (
    <main className="documentation">
      <header className="documentation-top">
        <Link to="/#proyectos">
          <ArrowLeft size={17} /> Volver al archivo
        </Link>
        <span>PROJECT ARCHIVE / {project.year}</span>
      </header>
      <div className="documentation-layout">
        <aside className="documentation-toc">
          <p>CONTENIDO</p>
          {sections.map(([key, label], i) => (
            <a href={"#" + key} key={key}>
              {String(i + 1).padStart(2, "0")} {label}
            </a>
          ))}
        </aside>
        <article className="documentation-body">
          <p className="eyebrow">
            <span />
            PROYECTO
          </p>
          <h1>{project.title}</h1>
          <div className="documentation-meta">
            <span>{project.year}</span>
            <span>{project.level}</span>
            <span>{project.category}</span>
          </div>
          <p className="documentation-lead">{project.description}</p>
          {project.cover && (
            <img
              className="documentation-cover"
              src={project.cover}
              alt={project.title}
            />
          )}{" "}
          {sections.map(([key, label], i) => (
            <section id={key} key={key}>
              <p className="doc-number">{String(i + 1).padStart(2, "0")}</p>
              <h2>{label}</h2>
              <Content value={project.documentation?.[key]} />
            </section>
          ))}
          <section id="technologies">
            <p className="doc-number">09</p>
            <h2>Tecnologías utilizadas</h2>
            <div className="archive-tech">
              {(project.technologies || []).map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </section>
          <section>
            <p className="doc-number">10</p>
            <h2>Estudiantes</h2>
            {project.students?.length ? (
              <ul className="student-list">
                {project.students.map((name) => (
                  <li key={name}>
                    <Users size={16} />
                    {name}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Información pendiente de confirmar.</p>
            )}
          </section>
          {gallery.length > 0 && (
            <section>
              <h2>Galería</h2>
              <div className="documentation-gallery">
                {gallery.map((src, index) => (
                  <button key={src} onClick={() => setImage(index)}>
                    <img
                      src={src}
                      alt={`${project.title} ${index + 1}`}
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </section>
          )}
          <div className="documentation-links">
            {project.links?.repository && (
              <a
                href={project.links.repository}
                target="_blank"
                rel="noreferrer"
              >
                <GitFork size={17} /> Ver GitHub
              </a>
            )}
            {project.links?.demo && (
              <a href={project.links.demo} target="_blank" rel="noreferrer">
                <ExternalLink size={17} /> Ver demo
              </a>
            )}
          </div>
        </article>
      </div>
      {image !== null && (
        <div className="project-lightbox" role="dialog" aria-modal="true">
          <button onClick={() => setImage(null)} aria-label="Cerrar">
            <X />
          </button>
          <button onClick={() => move(-1)} aria-label="Anterior">
            <ChevronLeft />
          </button>
          <img src={gallery[image]} alt={`${project.title} ${image + 1}`} />
          <button onClick={() => move(1)} aria-label="Siguiente">
            <ChevronRight />
          </button>
        </div>
      )}
    </main>
  );
}
