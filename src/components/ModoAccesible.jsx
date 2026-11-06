
import { useEffect, useState } from "react";
import "../styles/modoAccesible.css";

// Configuración inicial
const estadoInicial = {
  textoGrande: false,
  altoContraste: false,
};

// Recuperar preferencias
function obtenerConfiguracion() {
  try {
    const datos = localStorage.getItem("mc-accesibilidad");

    if (!datos) return { ...estadoInicial };

    const guardado = JSON.parse(datos);

    return {
      textoGrande: guardado?.textoGrande === true,
      altoContraste: guardado?.altoContraste === true,
    };
  } catch (error) {
    console.error("Error al cargar accesibilidad:", error);
    return { ...estadoInicial };
  }
}

// Aplicar estilos de accesibilidad
function aplicarConfiguracion(configuracion) {
  const raiz = document.documentElement;
  const cuerpo = document.body;

  raiz.dataset.mcTextoGrande = String(
    configuracion.textoGrande
  );

  raiz.dataset.mcContraste = String(
    configuracion.altoContraste
  );

  cuerpo.classList.toggle(
    "texto-grande",
    configuracion.textoGrande
  );

  cuerpo.classList.toggle(
    "alto-contraste",
    configuracion.altoContraste
  );
}

function ModoAccesible({
  textoGrande,
  altoContraste,
  onToggleTexto,
  onToggleContraste,
  onRestablecer,
}) {
  // Estado del panel
  const [panelAbierto, setPanelAbierto] = useState(false);

  // Preferencias independientes
  const [configuracionLocal, setConfiguracionLocal] =
    useState(obtenerConfiguracion);

  // Detectar configuración compartida
  const modoCompartido =
    typeof textoGrande === "boolean" &&
    typeof altoContraste === "boolean";

  // Seleccionar configuración
  const configuracion = modoCompartido
    ? { textoGrande, altoContraste }
    : configuracionLocal;

  // Aplicar y guardar preferencias
  useEffect(() => {
    aplicarConfiguracion(configuracion);

    if (!modoCompartido) {
      try {
        localStorage.setItem(
          "mc-accesibilidad",
          JSON.stringify(configuracion)
        );
      } catch (error) {
        console.error("Error al guardar accesibilidad:", error);
      }
    }
  }, [
    configuracion.textoGrande,
    configuracion.altoContraste,
    modoCompartido,
  ]);

  // Cambiar una opción
  const cambiarOpcion = (opcion) => {
    if (modoCompartido) {
      if (opcion === "textoGrande") {
        onToggleTexto?.();
      } else {
        onToggleContraste?.();
      }

      return;
    }

    setConfiguracionLocal((anterior) => ({
      ...anterior,
      [opcion]: !anterior[opcion],
    }));
  };

  // Restablecer apariencia
  const restablecer = () => {
    if (modoCompartido) {
      onRestablecer?.();
    } else {
      setConfiguracionLocal({ ...estadoInicial });
    }
  };

  // Identificar opciones activas
  const hayOpcionesActivas =
    configuracion.textoGrande ||
    configuracion.altoContraste;

  return (
    <div className="mc-accesibilidad">
      {/* Botón principal */}
      <button
        type="button"
        className="mc-accesibilidad-boton"
        onClick={() => setPanelAbierto(!panelAbierto)}
        aria-expanded={panelAbierto}
      >
        <span>Accesibilidad</span>

        <strong aria-hidden="true">
          {panelAbierto || hayOpcionesActivas ? "−" : "+"}
        </strong>
      </button>

      {/* Panel de opciones */}
      {panelAbierto && (
        <section className="mc-accesibilidad-panel">
          <h2>Opciones de accesibilidad</h2>

          <p>
            Ajuste la visualización para leer
            con mayor comodidad.
          </p>

          {/* Texto grande */}
          <label className="mc-accesibilidad-opcion">
            <span>
              <strong>Texto grande</strong>
              <small>
                Aumentar el tamaño de las letras.
              </small>
            </span>

            <input
              type="checkbox"
              checked={configuracion.textoGrande}
              onChange={() => cambiarOpcion("textoGrande")}
            />
          </label>

          {/* Alto contraste */}
          <label className="mc-accesibilidad-opcion">
            <span>
              <strong>Alto contraste</strong>
              <small>
                Utilizar colores blanco y negro.
              </small>
            </span>

            <input
              type="checkbox"
              checked={configuracion.altoContraste}
              onChange={() => cambiarOpcion("altoContraste")}
            />
          </label>

          {/* Restablecer */}
          <button
            type="button"
            className="mc-accesibilidad-restablecer"
            onClick={restablecer}
          >
            Restablecer apariencia
          </button>
        </section>
      )}
    </div>
  );
}

export default ModoAccesible;

