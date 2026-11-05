
/*tarjeta de medicamento, muentra la info de un medicamento y permite editarlo o eliminarlo*/

import { obtenerTextoFrecuencia } from "../utils/medicamentos";

function TarjetaMedicamento({
  medicamento,
  onEditar,
  onEliminar,
}) {
  /*confirmar eliminacion, solicita confirmacion antes de eliminar*/
  const confirmarEliminacion = () => {
    const confirmado = window.confirm(
      `¿Desea eliminar "${medicamento.nombre}"?`
    );

    if (confirmado) {
      onEliminar(medicamento.id);
    }
  };

  return (
    <article className="med-tarjeta">
      {/* Encabezado de la tarjeta */}
      <div className="med-tarjeta-encabezado">
        <span className="med-icono" aria-hidden="true">
          💊
        </span>

        <div className="med-tarjeta-identidad">
          <span className="med-tarjeta-etiqueta">
            Medicamento registrado
          </span>

          <h3>{medicamento.nombre}</h3>
        </div>
      </div>

      {/* Información principal del medicamento */}
      <dl className="med-detalles">
        <div className="med-detalle">
          <dt>Dosis</dt>
          <dd>{medicamento.dosis}</dd>
        </div>

        <div className="med-detalle">
          <dt>Frecuencia</dt>
          <dd>
            {obtenerTextoFrecuencia(medicamento.frecuencia)}
          </dd>
        </div>

        <div className="med-detalle">
          <dt>Hora de inicio</dt>
          <dd>{medicamento.horaInicio}</dd>
        </div>
      </dl>

      {/* Acciones disponibles */}
      <div className="med-tarjeta-acciones">
        <button
          type="button"
          className="med-btn med-btn-secundario"
          onClick={() => onEditar(medicamento)}
          aria-label={`Editar ${medicamento.nombre}`}
        >
          ✎ Editar
        </button>

        <button
          type="button"
          className="med-btn med-btn-peligro"
          onClick={confirmarEliminacion}
          aria-label={`Eliminar ${medicamento.nombre}`}
        >
          ✕ Eliminar
        </button>
      </div>
    </article>
  );
}

export default TarjetaMedicamento;
