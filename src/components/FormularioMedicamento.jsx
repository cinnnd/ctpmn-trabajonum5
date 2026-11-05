
/*formulario de medicamentos. Permite registrar nuevos medicamentos y editar existentes.*/

import { useEffect, useState } from "react";

import {
  FRECUENCIAS,
  validarMedicamento,
} from "../utils/medicamentos";

// Valores iniciales del formulario.
const formularioVacio = {
  nombre: "",
  dosis: "",
  frecuencia: "8",
  horaInicio: "",
};

function FormularioMedicamento({
  onGuardar,
  medicamentoEditar,
  onCancelar,
}) {
  /*
   ** useState guarda temporalmente los datos del formulario.
   ** Cada vez que cambia un campo, React actualiza el estado.
   */
  const [formulario, setFormulario] = useState(formularioVacio);

  // Guarda los mensajes de error del formulario.
  const [errores, setErrores] = useState({});

  /*
   ** useEffect se ejecuta al cambiar medicamentoEditar.
   **Si estamos editando, rellena los campos con los datos.
   ** Si no estamos editando, limpia el formulario.
   */
  useEffect(() => {
    if (medicamentoEditar) {
      setFormulario({
        nombre: medicamentoEditar.nombre,
        dosis: medicamentoEditar.dosis,
        frecuencia: String(medicamentoEditar.frecuencia),
        horaInicio: medicamentoEditar.horaInicio,
      });
    } else {
      setFormulario({ ...formularioVacio });
    }

    setErrores({});
  }, [medicamentoEditar]);

  /*maneja el cambio, detecta que campo escribio el usuario y actualiza unicamente esa propiedad del formulario*/
  const manejarCambio = (evento) => {
    const { name, value } = evento.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));

    // Limpia el error del campo que se está modificando.
    setErrores((anterior) => ({
      ...anterior,
      [name]: "",
    }));
  };

  /*maneja el envio, evita recargar la pagina, valida los campos y envia los datos al componente padre   */
  const manejarEnvio = (evento) => {
    evento.preventDefault();

    const nuevosErrores = validarMedicamento(formulario);
    setErrores(nuevosErrores);

    // Si encontramos errores, detenemos el guardado.
    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    // onGuardar es una función recibida mediante props.
    const guardado = onGuardar({
      nombre: formulario.nombre.trim(),
      dosis: formulario.dosis.trim(),
      frecuencia: Number(formulario.frecuencia),
      horaInicio: formulario.horaInicio,
    });

    // Limpiamos el formulario después de registrar.
    if (guardado && !medicamentoEditar) {
      setFormulario({ ...formularioVacio });
      setErrores({});
    }
  };

  return (
    <section className="med-panel med-formulario-panel">
      {/* Título que cambia entre registro y edición */}
      <div className="med-seccion-titulo">
        <span className="med-seccion-icono" aria-hidden="true">
          ✚
        </span>

        <div>
          <h2>
            {medicamentoEditar
              ? "Editar medicamento"
              : "Nuevo medicamento"}
          </h2>

          <p>
            {medicamentoEditar
              ? "Actualice los datos del tratamiento."
              : "Registre los datos de su tratamiento."}
          </p>
        </div>
      </div>

      {/* Formulario controlado de React */}
      <form onSubmit={manejarEnvio} noValidate>
        {/* NOMBRE */}
        <div className="med-campo">
          <label htmlFor="nombre">Nombre del medicamento</label>

          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Ej. Medicamento A"
            value={formulario.nombre}
            onChange={manejarCambio}
            maxLength={100}
            aria-invalid={!!errores.nombre}
          />

          {errores.nombre && (
            <span className="med-error" role="alert">
              {errores.nombre}
            </span>
          )}
        </div>

        {/* DOSIS */}
        <div className="med-campo">
          <label htmlFor="dosis">Dosis indicada</label>

          <input
            id="dosis"
            name="dosis"
            type="text"
            placeholder="Ej. 1 tableta de 500 mg"
            value={formulario.dosis}
            onChange={manejarCambio}
            maxLength={100}
            aria-invalid={!!errores.dosis}
          />

          {errores.dosis && (
            <span className="med-error" role="alert">
              {errores.dosis}
            </span>
          )}
        </div>

        {/* FRECUENCIA */}
        <div className="med-campo">
          <label htmlFor="frecuencia">Frecuencia de toma</label>

          <select
            id="frecuencia"
            name="frecuencia"
            value={formulario.frecuencia}
            onChange={manejarCambio}
          >
            {FRECUENCIAS.map((frecuencia) => (
              <option
                key={frecuencia.valor}
                value={frecuencia.valor}
              >
                {frecuencia.texto}
              </option>
            ))}
          </select>

          {errores.frecuencia && (
            <span className="med-error" role="alert">
              {errores.frecuencia}
            </span>
          )}
        </div>

        {/* HORA DE INICIO */}
        <div className="med-campo">
          <label htmlFor="horaInicio">Hora de inicio</label>

          <input
            id="horaInicio"
            name="horaInicio"
            type="time"
            value={formulario.horaInicio}
            onChange={manejarCambio}
            aria-invalid={!!errores.horaInicio}
          />

          <small className="med-ayuda">
            Utilice la hora indicada para el tratamiento.
          </small>

          {errores.horaInicio && (
            <span className="med-error" role="alert">
              {errores.horaInicio}
            </span>
          )}
        </div>

        {/* BOTONES DEL FORMULARIO */}
        <div className="med-acciones">
          <button
            type="submit"
            className="med-btn med-btn-primario"
          >
            {medicamentoEditar
              ? "✓ Guardar cambios"
              : "＋ Registrar medicamento"}
          </button>

          {/* Solo aparece cuando editamos un registro */}
          {medicamentoEditar && (
            <button
              type="button"
              className="med-btn med-btn-secundario"
              onClick={onCancelar}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default FormularioMedicamento;
