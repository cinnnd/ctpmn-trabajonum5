
import { useState } from "react";

import { obtenerHistorial } from "./historial.js";

import "./historial.css";

function Historial({ historialCompartido }) {
  const [busqueda, setBusqueda] = useState("");

  const historial =
    historialCompartido ?? obtenerHistorial();

  const historialFiltrado = historial
    .filter((registro) => {
      const texto = busqueda.toLowerCase();

      return (
        registro.nombre.toLowerCase().includes(texto) ||
        registro.fecha.includes(texto)
      );
    })
    .sort((a, b) => {
      return (
        b.fecha.localeCompare(a.fecha) ||
        b.hora.localeCompare(a.hora)
      );
    });

  const cumplidas = historialFiltrado.filter(
    (registro) => registro.estado === "tomado"
  ).length;

  const omitidas = historialFiltrado.filter(
    (registro) => registro.estado === "omitido"
  ).length;

  return (
    <main className="historial">
      <header>
        <h1>Historial de medicamentos</h1>

        <p>
          Consulta tus registros anteriores.
        </p>
      </header>

      <div className="buscador-historial">
        <label htmlFor="buscarHistorial">
          Buscar medicamento o fecha
        </label>

        <input
          id="buscarHistorial"
          type="text"
          placeholder="Ej. Medicamento A"
          value={busqueda}
          onChange={(e) =>
            setBusqueda(e.target.value)
          }
        />
      </div>

      <section className="resumen-historial">
        <article>
          <h2>{cumplidas}</h2>
          <p>Tomas cumplidas</p>
        </article>

        <article>
          <h2>{omitidas}</h2>
          <p>Tomas omitidas</p>
        </article>
      </section>

      <section className="lista-historial">
        {historialFiltrado.length === 0 ? (
          <p>No se encontraron registros.</p>
        ) : (
          historialFiltrado.map((registro) => (
            <article
              key={registro.id}
              className="tarjeta-historial"
            >
              <h3>{registro.nombre}</h3>

              <p>Dosis: {registro.dosis}</p>

              <p>
                Fecha: {registro.fecha}
              </p>

              <p>
                Hora: {registro.hora}
              </p>

              <span
                className={`estado ${registro.estado}`}
              >
                {registro.estado}
              </span>
            </article>
          ))
        )}
      </section>
    </main>
  );
}

export default Historial;
