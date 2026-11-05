
/*Permite a personas adultas mayores, aumenta el tamaño del texto, activar colores y restablecer el diseño.*/

import { useEffect, useState } from "react";
import "../styles/modoAccesible.css";

// Identificador utilizado para guardar la configuración.
const CLAVE = "medicontrol_accesibilidad";

// Configuración normal de la aplicación.
const configuracionInicial = {
  letraGrande: false,
  altoContraste: false,
};

// Recupera las preferencias guardadas en el navegador.
function obtenerConfiguracion() {
  try {
    const datos = localStorage.getItem(CLAVE);

    if (!datos) {
      return { ...configuracionInicial };
    }

    const configuracion = JSON.parse(datos);

    return {
      letraGrande: configuracion?.letraGrande === true,
      altoContraste: configuracion?.altoContraste === true,
    };
  } catch (error) {
    console.error("Error al cargar accesibilidad:", error);
    return { ...configuracionInicial };
  }
}

function ModoAccesible() {
  // Controla si el panel está abierto o cerrado.
  const [abierto, setAbierto] = useState(false);

  // Guarda las opciones seleccionadas.
  const [configuracion, setConfiguracion] = useState(
    obtenerConfiguracion
  );

  /*Aplica las preferencias a la pagina, los archivos data permiten que el css identifique cuando esta activado el modo accesible,*/
  useEffect(() => {
    const raiz = document.documentElement;

    raiz.dataset.mcTextoGrande = String(
      configuracion.letraGrande
    );

    raiz.dataset.mcContraste = String(
      configuracion.altoContraste
    );

    // Guarda las preferencias al modificarlas.
    try {
      localStorage.setItem(
        CLAVE,
        JSON.stringify(configuracion)
      );
    } catch (error) {
      console.error("Error al guardar preferencias:", error);
    }
  }, [configuracion]);

  // Cambia únicamente la opción seleccionada.
  const cambiarOpcion = (opcion) => {
    setConfiguracion((anterior) => ({
      ...anterior,
      [opcion]: !anterior[opcion],
    }));
  };

  // Regresa al tamaño y colores normales.
  const restablecer = () => {
    setConfiguracion({ ...configuracionInicial });
  };

  return (
    <div className="mc-accesibilidad">
      {/* Botón principal */}
      <button
        type="button"
        className="mc-accesibilidad-boton"
        onClick={() => setAbierto(!abierto)}
        aria-expanded={abierto}
        aria-controls="mc-panel-accesibilidad"
      >
        Accesibilidad
        <span aria-hidden="true">{abierto ? "−" : "+"}</span>
      </button>

      {/* Panel que aparece al presionar el botón */}
      {abierto && (
        <section
          id="mc-panel-accesibilidad"
          className="mc-accesibilidad-panel"
          aria-label="Opciones de accesibilidad"
        >
          <h2>Opciones de accesibilidad</h2>

          <p>
            Personalice la pantalla para leer con mayor
            comodidad.
          </p>

          {/* Opción para aumentar las letras */}
          <label className="mc-accesibilidad-opcion">
            <span>
              <strong>Texto grande</strong>
              <small>Aumenta el tamaño de las letras.</small>
            </span>

            <input
              type="checkbox"
              checked={configuracion.letraGrande}
              onChange={() => cambiarOpcion("letraGrande")}
            />
          </label>

          {/* Opción para cambiar a blanco y negro */}
          <label className="mc-accesibilidad-opcion">
            <span>
              <strong>Alto contraste</strong>
              <small>Activa el modo blanco y negro.</small>
            </span>

            <input
              type="checkbox"
              checked={configuracion.altoContraste}
              onChange={() => cambiarOpcion("altoContraste")}
            />
          </label>

          {/* Botón para recuperar el diseño original */}
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
