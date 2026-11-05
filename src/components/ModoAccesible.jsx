
/*modo accesible. permite adoptar la aplicación para adultos mayores. Aumenta el tamaño de las letras, activa el alto contraste y guarda las preferencias en localStorage*/

import { useEffect, useState } from "react";
import "../styles/modoAccesible.css";

// Clave para almacenar las preferencias del usuario.
const CLAVE_ACCESIBILIDAD = "medicontrol_accesibilidad";

// Configuración predeterminada.
const configuracionInicial = {
  letraGrande: false,
  altoContraste: false,
};

/* recupera las preferencias guardadas.*/
function cargarConfiguracion() {
  try {
    const datos = localStorage.getItem(CLAVE_ACCESIBILIDAD);

    if (!datos) {
      return { ...configuracionInicial };
    }

    const guardado = JSON.parse(datos);

    return {
      letraGrande: guardado.letraGrande === true,
      altoContraste: guardado.altoContraste === true,
    };
  } catch (error) {
    console.error("Error al cargar accesibilidad:", error);
    return { ...configuracionInicial };
  }
}

function ModoAccesible() {
  // Controla si el panel de accesibilidad está abierto.
  const [abierto, setAbierto] = useState(false);

  // Guarda las preferencias seleccionadas por el usuario.
  const [configuracion, setConfiguracion] = useState(
    cargarConfiguracion
  );

  /*UseEffect aplica las preferencias al documento. se utilizan atributos data en <html> para q el css pueda cambiar el estilo de toda la aplicacion, guarda los cambios en localstorage.*/
  useEffect(() => {
    const raiz = document.documentElement;

    raiz.dataset.mcTextoGrande =
      String(configuracion.letraGrande);

    raiz.dataset.mcContraste =
      String(configuracion.altoContraste);

    try {
      localStorage.setItem(
        CLAVE_ACCESIBILIDAD,
        JSON.stringify(configuracion)
      );
    } catch (error) {
      console.error("No se guardaron las preferencias:", error);
    }
  }, [configuracion]);

  /*Cambia una opción sin modificar la otra.*/
  const cambiarOpcion = (nombre) => {
    setConfiguracion((anterior) => ({
      ...anterior,
      [nombre]: !anterior[nombre],
    }));
  };

  /*Devuelve ambas opciones a su estado normal.*/
  const restablecer = () => {
    setConfiguracion({ ...configuracionInicial });
  };

  return (
    <div className="mc-accesibilidad">
      {/* Botón para abrir o cerrar las opciones */}
      <button
        type="button"
        className="mc-accesibilidad-boton"
        onClick={() => setAbierto((anterior) => !anterior)}
        aria-expanded={abierto}
        aria-controls="mc-panel-accesibilidad"
      >
        Accesibilidad
        <span aria-hidden="true">{abierto ? "−" : "+"}</span>
      </button>

      {/* Solo mostramos el panel cuando está abierto */}
      {abierto && (
        <section
          id="mc-panel-accesibilidad"
          className="mc-accesibilidad-panel"
          aria-label="Opciones de accesibilidad"
        >
          <h2>Opciones de accesibilidad</h2>

          <p>
            Ajuste la visualización para leer con mayor comodidad.
          </p>

          {/* Opción 1: Aumentar tamaño de letra */}
          <label className="mc-accesibilidad-opcion">
            <span>
              <strong>Texto grande</strong>
              <small>Aumentar el tamaño de las letras.</small>
            </span>

            <input
              type="checkbox"
              checked={configuracion.letraGrande}
              onChange={() => cambiarOpcion("letraGrande")}
            />
          </label>

          {/* Opción 2: Alto contraste */}
          <label className="mc-accesibilidad-opcion">
            <span>
              <strong>Alto contraste</strong>
              <small>Utilizar colores blanco y negro.</small>
            </span>

            <input
              type="checkbox"
              checked={configuracion.altoContraste}
              onChange={() => cambiarOpcion("altoContraste")}
            />
          </label>

          {/* Recuperar el diseño original */}
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
