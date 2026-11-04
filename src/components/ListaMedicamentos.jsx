
import { useState } from "react";
import TarjetaMedicamento from "./TarjetaMedicamento";

function ListaMedicamentos({
  medicamentos,
  onEditar,
  onEliminar,
}) {
  const [busqueda, setBusqueda] = useState("");

  const medicamentosFiltrados = medicamentos.filter((medicamento) => {
    const texto = busqueda.toLocaleLowerCase().trim();

    return (
      medicamento.nombre.toLocaleLowerCase().includes(texto) ||
      medicamento.dosis.toLocaleLowerCase().includes(texto)
    );
  });

  return (
    <section className="med-panel">
      <div className="med-lista-titulo">
        <h2>Mis medicamentos</h2>
        <span className="med-contador">
          {medicamentos.length} registrados
        </span>
      </div>

      <div className="med-campo">
        <label htmlFor="buscarMedicamento">
          Buscar medicamento
        </label>
        <input
          id="buscarMedicamento"
          type="search"
          value={busqueda}
          onChange={(evento) => setBusqueda(evento.target.value)}
          placeholder="Buscar por nombre o dosis..."
        />
      </div>

      {medicamentosFiltrados.length === 0 ? (
        <p className="med-vacio">
          {medicamentos.length === 0
            ? "Todavía no hay medicamentos registrados."
            : "No se encontraron medicamentos."}
        </p>
      ) : (
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
