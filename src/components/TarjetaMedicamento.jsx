
/*muestra cada medicamento registrado
 ** Recibe tres propiedades:
 ** medicamento: contiene los datos del tratamiento.
 ** onEditar: función para modificarlo.
 ** onEliminar: función para eliminarlo.
 */

import {
  obtenerTextoFrecuencia,
} from "../utils/medicamentos";

function TarjetaMedicamento({
  medicamento,
  onEditar,
  onEliminar,
}) {
  /*muestra la confirmacion. se llama el oneliminar utilizando el identificador del medicamento. */
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
      {/* ENCABEZADO DE LA TARJETA */}
      <div className="med-tarjeta-encabezado">
        <div className="med-tarjeta-identidad">
          <span className="med-tarjeta-etiqueta">
            Tratamiento registrado
          </span>

          {/* Nombre del medicamento */}
          <h3>{medicamento.nombre}</h3>
        </div>

        {/* Muestra cada cuántas horas se toma */}
        <span className="med-frecuencia-pill">
          {obtenerTextoFrecuencia(medicamento.frecuencia)}
        </span>
      </div>

      {/* INFORMACIÓN DEL MEDICAMENTO */}
      <dl className="med-detalles">
        {/* Dosis registrada */}
        <div className="med-detalle">
          <dt>Dosis indicada</dt>
          <dd>{medicamento.dosis}</dd>
        </div>

        {/* Frecuencia de administración */}
        <div className="med-detalle">
          <dt>Frecuencia</dt>
          <dd>
            {obtenerTextoFrecuencia(medicamento.frecuencia)}
          </dd>
        </div>

        {/* Hora inicial de la programación */}
        <div className="med-detalle">
          <dt>Hora de inicio</dt>
          <dd>{medicamento.horaInicio}</dd>
        </div>
      </dl>

      {/* Información adicional para el usuario */}
      <p className="med-tarjeta-ayuda">
        Consulte la dosis y los horarios registrados
        para este medicamento.
      </p>

      {/* BOTONES DE ACCIÓN */}
      <div className="med-tarjeta-acciones">
        {/* Envía el medicamento al formulario para editarlo */}
        <button
          type="button"
          className="med-btn med-btn-secundario"
          onClick={() => onEditar(medicamento)}
          aria-label={`Editar ${medicamento.nombre}`}
        >
          Editar
        </button>

        {/* Solicita confirmación antes de eliminar */}
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
