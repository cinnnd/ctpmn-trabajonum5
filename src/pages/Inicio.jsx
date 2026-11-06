import { Link } from "react-router-dom";

// Inicio solo ofrece navegación; los datos de medicamentos están en su módulo.
export default function Inicio() {
  return (
    <section className="pagina pagina-inicio">
      <header className="pagina-header">
        <span className="pagina-badge">MEDICONTROL</span>
        <h1>Bienvenido a MediControl</h1>
        <p>Organice sus tratamientos, consulte sus tomas y lleve el control de sus citas.</p>
      </header>

      <aside className="aviso-importante" role="note">
        <strong>Importante:</strong> MediControl es un prototipo educativo y no sustituye las indicaciones del médico.
      </aside>

      {/* Accesos directos; el inicio no duplica formularios ni estadísticas. */}
      <div className="inicio-accesos">
        <article className="tarjeta-grande">
          <h2>Medicamentos</h2>
          <p>Registre sus medicamentos, consulte las dosis y controle las tomas de hoy.</p>
          <Link to="/medicamentos" className="btn-enlace">Ver medicamentos</Link>
        </article>
        <article className="tarjeta-grande">
          <h2>Citas médicas</h2>
          <p>Programe, consulte y complete sus citas.</p>
          <Link to="/citas" className="btn-enlace">Ver citas</Link>
        </article>
        <article className="tarjeta-grande">
          <h2>Historial</h2>
          <p>Revise las tomas marcadas como tomadas u omitidas.</p>
          <Link to="/historial" className="btn-enlace">Ver historial</Link>
        </article>
      </div>
    </section>
  );
}
