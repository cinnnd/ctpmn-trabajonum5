
/*Lista de medicamentos, muestra todos los medicamentos registrados, incluye un buscador por nombre o dosis*/

import { useState } from "react";
import TarjetaMedicamento from "./TarjetaMedicamento";

function ListaMedicamentos({
  medicamentos,
  onEditar,
  onEliminar,
}) {
  // Guarda el texto que el usuario escribe en el buscador.
  const [busqueda, setBusqueda] = useState("");

  /*filter() devuelve únicamente los medicamentos que coinciden con el texto buscado. toLocaleLowerCase() permite ignorar mayúsculas.*/
  const medicamentosFiltrados = medicamentos.filter(
    (medicamento) => {
      const texto = busqueda.toLocaleLowerCase().trim();

      return (
        medicamento.nombre
          .toLocaleLowerCase()
          .includes(texto) ||
        medicamento.dosis
          .toLocaleLowerCase()
          .includes(texto)
      );
    }
  );

  return (
    <section className="med-panel med-lista-panel">
      {/* Título y cantidad de medicamentos */}
      <div className="med-lista-titulo">
        <div>
          <h2>Mis medicamentos</h2>
          <p>Consulte y administre sus tratamientos.</p>
        </div>

        <span className="med-contador">
          {medicamentos.length} registrados
        </span>
      </div>

      {/* Buscador controlado por useState */}
      <div className="med-campo">
        <label htmlFor="buscarMedicamento">
          Buscar medicamento
        </label>

        <div className="med-buscador">
          <span aria-hidden="true">⌕</span>

          <input
            id="buscarMedicamento"
            type="search"
            value={busqueda}
            onChange={(evento) =>
              setBusqueda(evento.target.value)
            }
            placeholder="Buscar por nombre o dosis..."
          />
        </div>
      </div>

      {/* Mensaje cuando la lista está vacía */}
      {medicamentosFiltrados.length === 0 ? (
        <div className="med-vacio">
          <span aria-hidden="true">🌿</span>

          <h3>
            {medicamentos.length === 0
              ? "No hay medicamentos registrados"
              : "No se encontraron resultados"}
          </h3>

          <p>
            {medicamentos.length === 0
              ? "Registre su primer medicamento usando el formulario."
              : "Intente buscar con otro nombre o dosis."}
          </p>
        </div>
      ) : (
        /*map() recorre el arreglo y crea una tarjeta por cada medicamento encontrado. key permite a React identificar cada tarjeta. */
        <div className="med-tarjetas">
          {medicamentosFiltrados.map((medicamento) => (
            <TarjetaMedicamento
              key={medicamento.id}
              medicamento={medicamento}
              onEditar={onEditar}
              onEliminar={onEliminar}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ListaMedicamentos;
