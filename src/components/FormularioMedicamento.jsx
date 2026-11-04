
import { useEffect, useState } from "react";
import {
  FRECUENCIAS,
  validarMedicamento,
} from "../utils/medicamentos";

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
  const [formulario, setFormulario] = useState(formularioVacio);
  const [errores, setErrores] = useState({});

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

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));

    setErrores((anterior) => ({
      ...anterior,
      [name]: "",
    }));
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();

    const nuevosErrores = validarMedicamento(formulario);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    const guardado = onGuardar({
      nombre: formulario.nombre.trim(),
      dosis: formulario.dosis.trim(),
      frecuencia: Number(formulario.frecuencia),
      horaInicio: formulario.horaInicio,
    });

    if (guardado && !medicamentoEditar) {
      setFormulario({ ...formularioVacio });
      setErrores({});
    }
  };

  return (
    <section className="med-panel">
      <h2>
        {medicamentoEditar
          ? "Editar medicamento"
          : "Registrar medicamento"}
      </h2>

      <p className="med-descripcion">
        Complete la información indicada en su tratamiento.
      </p>

      <form onSubmit={manejarEnvio} noValidate>
        <div className="med-campo">
          <label htmlFor="nombre">Nombre del medicamento</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={formulario.nombre}
            onChange={manejarCambio}
            placeholder="Ejemplo: Paracetamol"
            maxLength={100}
            aria-invalid={!!errores.nombre}
          />
          {errores.nombre && (
            <span className="med-error" role="alert">
              {errores.nombre}
            </span>
          )}
        </div>

        <div className="med-campo">
          <label htmlFor="dosis">Dosis indicada</label>
          <input
            id="dosis"
            name="dosis"
            type="text"
            value={formulario.dosis}
            onChange={manejarCambio}
            placeholder="Ejemplo: 1 tableta de 500 mg"
            maxLength={100}
            aria-invalid={!!errores.dosis}
          />
          {errores.dosis && (
            <span className="med-error" role="alert">
              {errores.dosis}
            </span>
          )}
        </div>

        <div className="med-campo">
          <label htmlFor="frecuencia">Frecuencia</label>
          <select
            id="frecuencia"
            name="frecuencia"
            value={formulario.frecuencia}
            onChange={manejarCambio}
          >
            {FRECUENCIAS.map((item) => (
              <option key={item.valor} value={item.valor}>
                {item.texto}
              </option>
            ))}
          </select>
          {errores.frecuencia && (
            <span className="med-error" role="alert">
              {errores.frecuencia}
            </span>
          )}
        </div>

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
          {errores.horaInicio && (
            <span className="med-error" role="alert">
              {errores.horaInicio}
            </span>
          )}
        </div>

        <div className="med-acciones">
          <button type="submit" className="med-btn med-btn-primario">
            {medicamentoEditar
              ? "Guardar cambios"
              : "Registrar medicamento"}
          </button>

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
