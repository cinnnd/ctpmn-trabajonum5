import { useId, useState } from "react";
import "../styles/modoAccesible.css";

// Las preferencias se administran desde App.jsx para toda la aplicación.
export default function ModoAccesible({
  textoGrande,
  altoContraste,
  onToggleTexto,
  onToggleContraste,
  onRestablecer,
}) {
  const [panelAbierto, setPanelAbierto] = useState(false);
  const panelId = useId();
  const activo = textoGrande || altoContraste;

  return (
    <div className="mc-accesibilidad">
      <button
        type="button"
        className="mc-accesibilidad-boton"
        onClick={() => setPanelAbierto(a => !a)}
        aria-expanded={panelAbierto}
        aria-controls={panelId}
      >
        <span>Accesibilidad{activo ? " activada" : ""}</span>
        <span aria-hidden="true">{panelAbierto ? "−" : "+"}</span>
      </button>

      {panelAbierto && (
        <div className="mc-accesibilidad-panel" id={panelId}>
          <h2>Opciones de accesibilidad</h2>
          <p>Personalice el tamaño del texto y los colores.</p>

          <label className="mc-accesibilidad-opcion">
            <span><strong>Texto grande</strong><small>Facilita la lectura.</small></span>
            <input type="checkbox" checked={Boolean(textoGrande)} onChange={onToggleTexto} />
          </label>

          <label className="mc-accesibilidad-opcion">
            <span><strong>Blanco y negro</strong><small>Mayor contraste en toda la aplicación.</small></span>
            <input type="checkbox" checked={Boolean(altoContraste)} onChange={onToggleContraste} />
          </label>

          <button type="button" className="mc-accesibilidad-restablecer" onClick={onRestablecer}>
            Restablecer apariencia
          </button>
        </div>
      )}
    </div>
  );
}
