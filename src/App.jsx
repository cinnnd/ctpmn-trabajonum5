
/*
 * MEDICONTROL - MÓDULO DE HISTORIAL
 *
 * Esta versión permite probar el trabajo de la Persona 2.
 * Muestra las tomas del día y el historial registrado.
 */

import { useState } from "react";

// Importamos los componentes con sus nombres reales.
import VistaHoy from "./components/visitahoy.jsx";
import Historial from "./components/historial.jsx";

// Funciones para consultar y guardar el historial.
import {
  obtenerHistorial,
  guardarHistorial,
} from "./components/historial.js";

import "./App.css";

// Misma clave que utiliza la Persona 1.
const CLAVE_MEDICAMENTOS = "medicontrol_medicamentos_v1";

/*
 * Recuperar medicamentos desde localStorage.
 * Si todavía no hay registros, devolvemos [].
 */
function cargarMedicamentos() {
  try {
    const datos = localStorage.getItem(CLAVE_MEDICAMENTOS);
    const lista = datos ? JSON.parse(datos) : [];

    return Array.isArray(lista) ? lista : [];
  } catch (error) {
    console.error("Error al cargar medicamentos:", error);
    return [];
  }
}

function App() {
  // Controla cuál pantalla se muestra.
  const [pantalla, setPantalla] = useState("hoy");

  // Lista de medicamentos compartida con VistaHoy.
  const [medicamentos, setMedicamentos] = useState(cargarMedicamentos);

  // Historial compartido entre VistaHoy e Historial.
  const [historial, setHistorial] = useState(obtenerHistorial);

  /*
   * Actualiza el historial en React y localStorage.
   * Esto permite ver inmediatamente las tomas marcadas.
   */
  const actualizarHistorial = (nuevosRegistros) => {
    guardarHistorial(nuevosRegistros);
    setHistorial(nuevosRegistros);
  };

  // Recarga los medicamentos guardados en el navegador.
  const actualizarMedicamentos = () => {
    setMedicamentos(cargarMedicamentos());
  };

  /*
   * Agrega un medicamento ficticio para realizar pruebas
   * cuando todavía no está integrado el módulo de la Persona 1.
   */
  const agregarEjemplo = () => {
    const lista = cargarMedicamentos();

    const ejemplo = {
      id: "medicamento-demo-historial",
      nombre: "Medicamento de prueba",
      dosis: "1 tableta",
      frecuencia: 8,
      horaInicio: "08:00",
      activo: true,
    };

    // Evita registrar dos veces el mismo ejemplo.
    const existe = lista.some(
      (medicamento) => medicamento.id === ejemplo.id
    );

    if (existe) {
      setMedicamentos(lista);
      return;
    }

    const nuevaLista = [...lista, ejemplo];

    try {
      localStorage.setItem(
        CLAVE_MEDICAMENTOS,
        JSON.stringify(nuevaLista)
      );

      setMedicamentos(nuevaLista);
    } catch (error) {
      console.error("Error al guardar medicamento:", error);
    }
  };

  return (
    <div className="app-contenedor">
      {/* Encabezado principal */}
      <header className="app-cabecera">
        <div className="app-cabecera-interior">
          <div>
            <h1>MediControl</h1>
            <p>Seguimiento de medicamentos</p>
          </div>

          <span className="app-modulo">
            Módulo de historial
          </span>
        </div>
      </header>

      <main className="app-principal">
        {/* Botones para cambiar de pantalla */}
        <nav
          className="app-navegacion"
          aria-label="Secciones del historial"
        >
          <button
            type="button"
            className={pantalla === "hoy" ? "seleccionado" : ""}
            onClick={() => setPantalla("hoy")}
          >
            Tomas de hoy
          </button>

          <button
            type="button"
            className={
              pantalla === "historial" ? "seleccionado" : ""
            }
            onClick={() => setPantalla("historial")}
          >
            Historial
          </button>
        </nav>

        {/* Herramientas para consultar medicamentos */}
        <section className="app-herramientas">
          <span>
            {medicamentos.length} medicamento(s) registrado(s)
          </span>

          <div className="app-botones">
            <button
              type="button"
              onClick={actualizarMedicamentos}
            >
              Actualizar medicamentos
            </button>

            {medicamentos.length === 0 && (
              <button
                type="button"
                className="app-demo"
                onClick={agregarEjemplo}
              >
                Agregar medicamento de prueba
              </button>
            )}
          </div>
        </section>

        {/* Mostramos únicamente la pantalla seleccionada */}
        {pantalla === "hoy" ? (
          <VistaHoy
            medicamentos={medicamentos}
            historialCompartido={historial}
            setHistorialCompartido={actualizarHistorial}
          />
        ) : (
          <Historial historialCompartido={historial} />
        )}

        {/* Aviso obligatorio del proyecto */}
        <footer className="app-nota">
          MediControl es un prototipo educativo y no sustituye
          las indicaciones de un profesional de salud.
        </footer>
      </main>
    </div>
  );
}

export default App;
