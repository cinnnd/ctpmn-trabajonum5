
/*modo accesible. permite personalizar la interfaz para adultos mayores, activa las letras grandes, activa el modo blanco y negro, guarda las preferencias en el local storage*/

import { useEffect, useState } from "react";
import "../styles/modoAccesible.css";

// Clave utilizada para guardar las preferencias.
const CLAVE = "mc-accesibilidad";

// Opciones predeterminadas.
const estadoInicial = {
  textoGrande: false,
  altoContraste: false,
};

/*recupera las preferencias ya guardadas.*/
function obtenerConfiguracion() {
    try {
        const datos = localStorage.getItem(CLAVE);

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

/*aplica la configuracion al documento HTML. los tributos data-mc-* permite activar reglas css dependiendo de las opciones*/
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
  // Controla si las opciones están visibles.
  const [panelAbierto, setPanelAbierto] = useState(false);

  // Configuración local utilizada por Medicamentos.
    const [configuracionLocal, setConfiguracionLocal] = useState(
        obtenerConfiguracion
    );
    /*detecta si App.jsx administra las preferencias.*/
    const modoCompartido =
    typeof textoGrande === "boolean" &&
    typeof altoContraste === "boolean";

    // Selecciona la configuración que corresponde utilizar.
    const configuracion = modoCompartido
        ? { textoGrande, altoContraste }
        : configuracionLocal;

    // Aplica los cambios cuando se modifica la configuración.
    useEffect(() => {
        aplicarConfiguracion(configuracion);
        if (!modoCompartido) {
            try {
                localStorage.setItem(
                CLAVE,
                JSON.stringify(configuracion)
                );
            } catch (error) {
                console.error(
                "Error al guardar accesibilidad:",
                error
                );
            }
        }
    },[
        configuracion.textoGrande,
        configuracion.altoContraste,
        modoCompartido,
    ]);
    /*alterna una opcion. Si App.jsx administra las opciones, ejecuta la función recibida mediante props. Si no, modifica el estado local.*/
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
    /*Restablece la apariencia original.*/
    const restablecer = () => {
        if (modoCompartido) {
        onRestablecer?.();
        } else {
        setConfiguracionLocal({ ...estadoInicial });
        }
    };
    // Comprueba si hay alguna opción activa.
    const hayOpcionesActivas =
        configuracion.textoGrande ||
        configuracion.altoContraste;

    return (
        <div className="mc-accesibilidad">
        {/* Abre y cierra el panel de accesibilidad */}
        <button
            type="button"
            className="mc-accesibilidad-boton"
            onClick={() => setPanelAbierto((anterior) => !anterior)}
            aria-expanded={panelAbierto}
            aria-controls="mc-panel-accesibilidad"
        >
            <span>Accesibilidad</span>

            {/* Muestra menos si el panel está abierto o hay opciones activas */}
            <strong aria-hidden="true">
            {panelAbierto || hayOpcionesActivas ? "−" : "+"}
            </strong>
        </button>

        {/* Opciones visibles cuando el panel está abierto */}
        {panelAbierto && (
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

            {/* Aumentar el tamaño de las letras */}
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

            {/* Activar modo blanco y negro */}
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

            {/* Recuperar la apariencia normal */}
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
