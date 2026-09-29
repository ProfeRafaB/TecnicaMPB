import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { getRatingDeviceId } from "../lib/ratingDevice";
import { supabase, supabaseConfigured } from "../lib/supabase";

const votedKey = (projectId) => `tecnica-mpb-voted-${projectId}-v1`;

export function ProjectQr({ projectId, title }) {
  const url = new URL(`/proyectos/${encodeURIComponent(projectId)}`, window.location.origin).href;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=${encodeURIComponent(url)}`;

  return (
    <section className="project-qr" aria-label={`Código QR de ${title}`}>
      <div>
        <p className="doc-number">COMPARTIR PROYECTO</p>
        <h2>Abre esta documentación desde tu celular</h2>
        <p>Escanea el código para visitar esta página.</p>
        <a href={url}>{url}</a>
      </div>
      <img src={qrUrl} alt={`Código QR que lleva a la documentación de ${title}`} loading="lazy" />
    </section>
  );
}

export function ProjectRating({ projectId }) {
  const [summary, setSummary] = useState({ total: 0, average: 0 });
  const [selected, setSelected] = useState(0);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showRating, setShowRating] = useState(null);

  useEffect(() => {
    let active = true;
    async function loadRating() {
      if (!supabase) {
        setShowRating(true);
        setLoading(false);
        return;
      }
      try {
        const { data: enabled, error: settingsError } = await supabase.rpc("get_project_ratings_enabled");
        if (settingsError) throw settingsError;
        if (!enabled) {
          if (active) {
            setShowRating(false);
            setLoading(false);
          }
          return;
        }
        if (active) setShowRating(true);
        const deviceId = getRatingDeviceId();
        const [{ data, error: queryError }, { data: hasVoted, error: voteCheckError }] = await Promise.all([
          supabase.rpc("get_project_rating", { p_project_id: projectId }),
          supabase.rpc("has_device_voted", { p_project_id: projectId, p_device_id: deviceId }),
        ]);
        if (queryError) throw queryError;
        if (voteCheckError) throw voteCheckError;
        if (active) {
          setSummary({ total: Number(data?.total) || 0, average: Number(data?.average) || 0 });
          setSaved(Boolean(hasVoted));
          if (hasVoted) {
            setSelected(Number(localStorage.getItem(votedKey(projectId))) || 0);
          } else {
            localStorage.removeItem(votedKey(projectId));
            setSelected(0);
          }
        }
      } catch (loadError) {
        if (active) setShowRating(true);
        if (active) setError("No fue posible cargar las calificaciones. Intenta recargar la página.");
        console.error("No se pudieron cargar los votos:", loadError);
      } finally {
        if (active) setLoading(false);
      }
    }
    loadRating();
    return () => { active = false; };
  }, [projectId]);

  if (showRating === false) return null;

  async function submitRating(value) {
    if (saved || loading || !supabase) return;
    setError("");
    try {
      const { data, error: voteError } = await supabase.rpc("submit_project_rating", {
        p_project_id: projectId,
        p_device_id: getRatingDeviceId(),
        p_rating: value,
      });
      if (voteError) throw voteError;
      localStorage.setItem(votedKey(projectId), String(value));
      setSummary({ total: Number(data?.total) || 0, average: Number(data?.average) || 0 });
      setSelected(value);
      setSaved(true);
      if (data?.already_voted) setError("Este navegador ya había enviado una calificación para este proyecto.");
    } catch (voteError) {
      setError("No fue posible guardar tu voto. Intenta nuevamente.");
      console.error("No se pudo guardar el voto:", voteError?.message || voteError);
    }
  }

  return (
    <section className="project-rating" aria-labelledby={`project-rating-${projectId}`}>
      <div className="rating-summary">
        <p className="doc-number">OPINIONES</p>
        <h2 id={`project-rating-${projectId}`}>Califica este proyecto</h2>
        <p className="rating-average"><Star size={20} fill="currentColor" /> {summary.total ? summary.average.toFixed(1) : "—"}<span>/ 5</span></p>
        <p>{summary.total} {summary.total === 1 ? "voto" : "votos"}</p>
      </div>
      <div className="rating-input">
        <div className="rating-stars" role="group" aria-label="Tu calificación, de 1 a 5 estrellas">
          {[1, 2, 3, 4, 5].map((value) => (
            <button key={value} type="button" onClick={() => submitRating(value)} disabled={saved || loading || !supabaseConfigured} aria-label={`${value} ${value === 1 ? "estrella" : "estrellas"}`} aria-pressed={selected === value}>
              <Star size={30} fill={value <= selected ? "currentColor" : "none"} />
            </button>
          ))}
        </div>
        <p aria-live="polite">{error || (loading ? "Cargando resultados…" : !supabaseConfigured ? "La conexión de calificaciones aún no está configurada." : saved ? "Ya registraste tu calificación desde este navegador." : "Selecciona una calificación. Solo puedes votar una vez desde este navegador.")}</p>
      </div>
    </section>
  );
}

export default function ProjectEngagement({ projectId, title }) {
  return <><ProjectQr projectId={projectId} title={title} /><ProjectRating projectId={projectId} /></>;
}
