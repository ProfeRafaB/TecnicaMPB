import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, LogOut, RotateCcw, Star } from "lucide-react";
import { Link } from "react-router-dom";
import projectsData from "../data/projects.json";
import { supabase, supabaseConfigured } from "../lib/supabase";

const adminAccessMessage = "Tu cuenta inició sesión, pero no tiene permisos de administradora. En Supabase, agrega su UUID a public.rating_admins como indica el final de supabase/schema.sql.";
const readableAdminError = (error) => error?.message === "No autorizado" ? adminAccessMessage : error?.message || "Error inesperado.";

export default function RatingResults() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState(null);
  const [stats, setStats] = useState([]);
  const [ratingsEnabled, setRatingsEnabled] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [busy, setBusy] = useState(false);

  const loadStats = useCallback(async () => {
    if (!supabase) return;
    const [{ data, error: statsError }, { data: enabled, error: enabledError }] = await Promise.all([
      supabase.rpc("get_all_project_rating_stats"),
      supabase.rpc("get_project_ratings_enabled"),
    ]);
    if (statsError) throw statsError;
    if (enabledError) throw enabledError;
    setStats(data || []);
    setRatingsEnabled(Boolean(enabled));
  }, []);

  useEffect(() => {
    if (!supabase) return undefined;

    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      if (nextSession) {
        void loadStats().catch((e) => setError(readableAdminError(e)));
      } else {
        setStats([]);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [loadStats]);

  async function signIn(event) {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setError("");
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) setError("No se pudo iniciar sesión. Revisa el correo y la contraseña de administrador.");
    else setSession(data.session);
    setBusy(false);
  }

  async function resetAllRatings() {
    if (!supabase || !window.confirm("¿Quieres borrar todos los votos de todos los proyectos? Esta acción no se puede deshacer.")) return;
    setBusy(true);
    setError("");
    setSuccess("");
    try {
      const { data: deletedCount, error: resetError } = await supabase.rpc("reset_all_project_ratings");
      if (resetError) throw resetError;
      await loadStats();
      setSuccess(`Reinicio completado: se borraron ${Number(deletedCount) || 0} votos. Los dispositivos pueden volver a votar al cargar de nuevo la documentación.`);
    } catch (resetError) {
      setError(resetError.message === "No autorizado"
        ? adminAccessMessage
        : `No se pudieron borrar los votos: ${resetError.message}${resetError.code ? ` (${resetError.code})` : ""}${resetError.details ? ` — ${resetError.details}` : ""}`);
    } finally {
      setBusy(false);
    }
  }

  async function toggleRatings(event) {
    const nextValue = event.target.checked;
    if (!supabase) return;
    setBusy(true);
    setError("");
    try {
      const { data, error: toggleError } = await supabase.rpc("set_project_ratings_enabled", { p_enabled: nextValue });
      if (toggleError) throw toggleError;
      setRatingsEnabled(Boolean(data));
    } catch (toggleError) {
      setError(toggleError.message === "No autorizado"
        ? adminAccessMessage
        : `No se pudo cambiar la visibilidad: ${toggleError.message}`);
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    await supabase?.auth.signOut();
    setSession(null);
    setStats([]);
  }

  const projectById = new Map(projectsData.projects.map((project) => [project.id, project]));

  return (
    <main className="rating-admin-page">
      <header className="rating-admin-top">
        <Link to="/"><ArrowLeft size={17} /> Volver a la landing</Link>
        <span>MPB / ESTADÍSTICAS DE PROYECTOS</span>
      </header>
      <section className="rating-admin-content">
        <p className="eyebrow"><span />PANEL PRIVADO</p>
        <h1>Resultados de <em>calificación.</em></h1>
        {!supabaseConfigured ? (
          <p className="rating-admin-message">Configura VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en el archivo .env para conectar este panel.</p>
        ) : !session ? (
          <form className="rating-admin-login" onSubmit={signIn}>
            <h2>Iniciar sesión</h2>
            <p>Acceso reservado a las cuentas autorizadas en Supabase.</p>
            <label>Correo<input type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
            <label>Contraseña<input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
            <button className="button-primary" disabled={busy}>{busy ? "Ingresando…" : "Entrar al panel"}</button>
            {error && <p className="rating-admin-error" role="alert">{error}</p>}
            {success && <p className="rating-admin-success" role="status">{success}</p>}
          </form>
        ) : (
          <>
            <div className="rating-admin-actions">
              <p>Resumen de votos compartidos de todos los proyectos.</p>
              <label className="rating-toggle">
                <span>Calificaciones visibles en los proyectos</span>
                <input type="checkbox" checked={ratingsEnabled} onChange={toggleRatings} disabled={busy} />
                <span className="rating-toggle-state">{ratingsEnabled ? "Activadas" : "Ocultas"}</span>
              </label>
              <button type="button" onClick={loadStats} disabled={busy}>Actualizar resultados</button>
              <button type="button" onClick={resetAllRatings} disabled={busy}><RotateCcw size={15} /> Reiniciar votos</button>
              <button type="button" onClick={signOut}><LogOut size={15} /> Cerrar sesión</button>
            </div>
            {error && <p className="rating-admin-error" role="alert">{error}</p>}
            <div className="rating-results-grid">
              {stats.map((item) => {
                const project = projectById.get(item.project_id);
                return <article className="rating-result-card" key={item.project_id}>
                  <p className="doc-number">{project?.category || "PROYECTO"} · {project?.year}</p>
                  <h2>{project?.title || item.project_id}</h2>
                  <div className="rating-result-metrics">
                    <p><strong>{item.total_votes}</strong><span>votos</span></p>
                    <p><Star size={19} fill="currentColor" /><strong>{Number(item.average_rating).toFixed(1)}</strong><span>/ 5 promedio</span></p>
                  </div>
                </article>;
              })}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
