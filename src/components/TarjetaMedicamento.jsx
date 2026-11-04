
import { obtenerTextoFrecuencia } from "../utils/medicamentos";

function TarjetaMedicamento({
  medicamento,
  onEditar,
  onEliminar,
}) {
  const confirmarEliminacion = () => {
    const confirmado = window.confirm(
      `¿Desea eliminar el medicamento "${medicamento.nombre}"?`
    );

    if (confirmado) {
      onEliminar(medicamento.id);
    }
  };

  return (
    <article className="med-tarjeta">
      <div className="med-tarjeta-contenido">
        <div className="med-tarjeta-encabezado">
          <span className="med-icono" aria-hidden="true">
            💊
          </span>
          <h3>{medicamento.nombre}</h3>
        </div>

        <dl className="med-detalles">
          <div>
            <dt>Dosis</dt>
            <dd>{medicamento.dosis}</dd>
          </div>

          <div>
            <dt>Frecuencia</dt>
            <dd>
              {obtenerTextoFrecuencia(medicamento.frecuencia)}
            </dd>
          </div>

          <div>
            <dt>Hora de inicio</dt>
            <dd>{medicamento.horaInicio}</dd>
          </div>
        </dl>
      </div>

      <div className="med-tarjeta-acciones">
        <button
          type="button"
          className="med-btn med-btn-secundario"
          onClick={() => onEditar(medicamento)}
          aria-label={`Editar ${medicamento.nombre}`}
        >
          Editar
        </button>

        <button
          type="button"
          className="med-btn med-btn-peligro"
          onClick={confirmarEliminacion}
          aria-label={`Eliminar ${medicamento.nombre}`}
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}

export default TarjetaMedicamento;
