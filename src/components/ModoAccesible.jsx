
/*modo accesible. permite personalizar la interfaz para adultos mayores, activa las letras grandes, activa el modo blanco y negro, guarda las preferencias en el local storage*/

import { useEffect, useState } from "react";
import "../styles/modoAccesible.css";

// Configuración predeterminada de la aplicación.
// false significa que la opción está desactivada.
const estadoInicial = {
  textoGrande: false,
  altoContraste: false,
};

/*recupera las preferencias ya guardadas.*/
function obtenerConfiguracion() {
  try {
    const guardado = localStorage.getItem("mc-accesibilidad");

    if (!guardado) {
      return { ...estadoInicial };
    }

    const configuracion = JSON.parse(guardado);

    return {
      textoGrande: configuracion.textoGrande === true,
      altoContraste: configuracion.altoContraste === true,
    };
  } catch (error) {
    console.error("Error al cargar accesibilidad:", error);
    return { ...estadoInicial };
  }
}

/*aplica la configuracion al documento HTML. los tributos data-mc-* permite activar reglas css dependiendo de las opciones*/
function aplicarConfiguracion(configuracion) {
  const raiz = document.documentElement;

  raiz.setAttribute(
    "data-mc-texto-grande",
    configuracion.textoGrande ? "true" : "false"
  );

  raiz.setAttribute(
    "data-mc-contraste",
    configuracion.altoContraste ? "true" : "false"
  );
}

function ModoAccesible() {
  /*useState controla si el menú de accesibilidad está abierto o cerrado.*/
  const [abierto, setAbierto] = useState(false);

  /* Guarda las preferencias del usuario.*/
  const [configuracion, setConfiguracion] = useState(
    obtenerConfiguracion
  );

  /*useeffect se ejecuta cuando cambia la configuracion. aplica los estilos y la preferencia*/
  useEffect(() => {
    aplicarConfiguracion(configuracion);

    try {
      localStorage.setItem(
        "mc-accesibilidad",
        JSON.stringify(configuracion)
      );
    } catch (error) {
      console.error("Error al guardar accesibilidad:", error);
    }
  }, [configuracion]);

  /*cambiar opcion. recibe el nombre de la opcion que se quiere modificar. invierte su valor: false -> true       true->false*/
  const cambiarOpcion = (opcion) => {
    setConfiguracion((anterior) => ({
      ...anterior,
      [opcion]: !anterior[opcion],
    }));
  };

  /*restablecer. descativa las opciones para regresar al tema original*/
  const restablecer = () => {
    setConfiguracion({ ...estadoInicial });
  };

  // Comprueba si existe alguna opción activada.
  const hayAccesibilidadActiva =
    configuracion.textoGrande || configuracion.altoContraste;

  return (
    <div className="mc-accesibilidad">
      {/* Botón para abrir las opciones de accesibilidad */}
      <button
        type="button"
        className="mc-accesibilidad-boton"
        onClick={() => setAbierto(!abierto)}
        aria-expanded={abierto}
        aria-controls="mc-panel-accesibilidad"
      >
        <span>Accesibilidad</span>

        {/* 
          + : no hay opciones activas y el panel está cerrado.
          - : el panel está abierto o hay accesibilidad activa.
        */}
        <strong>
          {abierto || hayAccesibilidadActiva ? "−" : "+"}
        </strong>
      </button>

      {/* El panel solo se muestra cuando abierto es true */}
      {abierto && (
        <section
          id="mc-panel-accesibilidad"
          className="mc-accesibilidad-panel"
          aria-label="Opciones de accesibilidad"
        >
          <h2>Opciones de accesibilidad</h2>

          <p>
            Ajuste la visualización para leer
            con mayor comodidad.
          </p>

          {/* OPCIÓN 1: AUMENTAR LETRAS */}
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

          {/* OPCIÓN 2: BLANCO Y NEGRO */}
          <label className="mc-accesibilidad-opcion">
            <span>
              <strong>Blanco y negro</strong>
              <small>
                Utilizar colores de alto contraste.
              </small>
            </span>

            <input
              type="checkbox"
              checked={configuracion.altoContraste}
              onChange={() => cambiarOpcion("altoContraste")}
            />
          </label>

          {/* Botón para volver al diseño normal */}
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
