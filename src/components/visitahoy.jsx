
import { useEffect, useMemo, useState } from "react";

import TarjetaToma from "./tarjetatomar.jsx";

import {
  obtenerFechaActual,
  generarTomas,
  ordenarTomas,
  obtenerHistorial,
  guardarHistorial,
  actualizarToma,
} from "./historial.jsx";

function VistaHoy({
  medicamentos = [],
  historialCompartido,
  setHistorialCompartido,
}) {
  const [historialLocal, setHistorialLocal] = useState(
    () => obtenerHistorial()
  );

  const historial = historialCompartido ?? historialLocal;

  const fechaActual = obtenerFechaActual();

  useEffect(() => {
    if (historialCompartido === undefined) {
      guardarHistorial(historialLocal);
    }
  }, [historialLocal, historialCompartido]);

  const tomasProgramadas = useMemo(() => {
    return medicamentos
      .filter(
        (medicamento) =>
          medicamento.activo !== false &&
          (!medicamento.fechaInicio || medicamento.fechaInicio <= fechaActual)
      )
      .flatMap((medicamento) =>
        generarTomas(medicamento, fechaActual)
      );
  }, [medicamentos, fechaActual]);

  const tomasHoy = tomasProgramadas.map((toma) => {
    const registro = historial.find(
      (item) => item.id === toma.id
    );

    return registro || toma;
  });

  const tomasOrdenadas = ordenarTomas(tomasHoy);

  const cambiarEstado = (toma, estado) => {
    const nuevaToma = {
      ...toma,
      estado,
      fechaRegistro: new Date().toISOString(),
    };

    const nuevoHistorial = actualizarToma(
      historial,
      nuevaToma
    );

    if (setHistorialCompartido) {
      setHistorialCompartido(nuevoHistorial);
    } else {
      setHistorialLocal(nuevoHistorial);
    }

    guardarHistorial(nuevoHistorial);
  };

  const tomasCumplidas = tomasOrdenadas.filter(
    (toma) => toma.estado === "tomado"
  ).length;

  return (
    <main className="vista-hoy">
      <header className="encabezado-hoy">
        <h1>Medicamentos de hoy</h1>

        <p>
          Consulta tus medicamentos y lleva el
          control de tus tomas.
        </p>
      </header>

      <section className="resumen-tomas">
        <p>
          Tomas cumplidas: {tomasCumplidas}
        </p>

        <p>
          Tomas pendientes:{" "}
          {tomasOrdenadas.filter(
            (toma) => toma.estado === "pendiente"
          ).length}
        </p>
      </section>

      <section className="lista-tomas">
        {tomasOrdenadas.length === 0 ? (
          <p>
            No hay medicamentos programados para hoy.
          </p>
        ) : (
          tomasOrdenadas.map((toma) => (
            <TarjetaToma
              key={toma.id}
              toma={toma}
              onCambiarEstado={cambiarEstado}
            />
          ))
        )}
      </section>
    </main>
  );
}

export default VistaHoy;
