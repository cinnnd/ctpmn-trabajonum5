
/*medicontrol, es la pagina principal. coordina el formulario de registro y edicion, la lista de medicamentos, el localstorage, las operaciones CRUD, los mensajes de error y confirmación.*/

import { useState } from "react";
import FormularioMedicamento from "../components/FormularioMedicamento";
import ListaMedicamentos from "../components/ListaMedicamentos";
import VistaHoy from "../components/visitahoy.jsx";

import {
  obtenerMedicamentos,
  guardarMedicamentos,
  generarId,
} from "../utils/medicamentos";

import "../styles/medicamentos.css";

function Medicamentos() {
  /* useState(obtenerMedicamentos) carga los medicamentos guardados al inicializar la página.*/
  const [medicamentos, setMedicamentos] = useState(
    obtenerMedicamentos
  );

  // Guarda el medicamento seleccionado para editar.
  const [medicamentoEditar, setMedicamentoEditar] = useState(null);

  // Mensajes que informan el resultado de las operaciones.
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  /*Calculamos el total y cuántos medicamentos pertenecen a cada frecuencia. reduce() recorre el arreglo y acumula cantidades*/
  const resumen = medicamentos.reduce(
    (acumulador, medicamento) => {
      acumulador.total += 1;

      if (medicamento.frecuencia === 8) {
        acumulador.cada8 += 1;
      }

      if (medicamento.frecuencia === 12) {
        acumulador.cada12 += 1;
      }

      if (medicamento.frecuencia === 24) {
        acumulador.cada24 += 1;
      }

      return acumulador;
    },
    { total: 0, cada8: 0, cada12: 0, cada24: 0 }
  );

  /*Realiza dos operaciones: CREATE: agrega un medicamento nuevo. UPDATE: modifica un medicamento existente.*/
  const guardar = (datos) => {
    const fechaActual = new Date().toISOString();

    let nuevaLista;

    if (medicamentoEditar) {
      /* map() recorre los registros y reemplaza únicamente el medicamento cuyo ID coincide.*/
      nuevaLista = medicamentos.map((medicamento) =>
        medicamento.id === medicamentoEditar.id
          ? {
              ...medicamento,
              ...datos,
              actualizadoEn: fechaActual,
            }
          : medicamento
      );
    } else {
      /*Creamos un objeto con ID único y fechas. Después lo agregamos al arreglo existente.*/
      const nuevoMedicamento = {
        id: generarId(),
        ...datos,
        creadoEn: fechaActual,
        actualizadoEn: fechaActual,
      };

      nuevaLista = [...medicamentos, nuevoMedicamento];
    }

    // Guardamos primero en localStorage.
    if (!guardarMedicamentos(nuevaLista)) {
      setError("No se pudieron guardar los datos.");
      setMensaje("");
      return false;
    }

    // Actualizamos la pantalla solo si el guardado funcionó.
    setMedicamentos(nuevaLista);

    // Salimos del modo edición.
    setMedicamentoEditar(null);

    setError("");
    setMensaje(
      medicamentoEditar
        ? "Medicamento actualizado correctamente."
        : "Medicamento registrado correctamente."
    );

    return true;
  };

  /*DELETE: elimina el medicamento seleccionado. filter() conserva todos los registros excepto el que tiene el ID indicado.*/
  const eliminar = (id) => {
    const nuevaLista = medicamentos.filter(
      (medicamento) => medicamento.id !== id
    );

    if (!guardarMedicamentos(nuevaLista)) {
      setError("No se pudo eliminar el medicamento.");
      setMensaje("");
      return;
    }

    setMedicamentos(nuevaLista);

    // Si eliminamos el medicamento en edición, cancelamos.
    if (medicamentoEditar?.id === id) {
      setMedicamentoEditar(null);
    }

    setError("");
    setMensaje("Medicamento eliminado correctamente.");
  };

  /*Selecciona el medicamento y lo envía al formulario. No modifica el registro hasta presionar Guardar.*/
  const editar = (medicamento) => {
    setMedicamentoEditar(medicamento);
    setMensaje("");
    setError("");

    // Lleva al usuario al formulario.
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="med-contenedor">
      <header className="med-encabezado">
        <div className="med-encabezado-principal">
          <span className="med-badge">MEDICONTROL</span>
          <h1>Gestión de medicamentos</h1>
          <p>
            Un espacio sencillo para organizar sus medicamentos y consultar sus horarios.
          </p>
        </div>

      </header>

      {/* AVISO OBLIGATORIO DEL PROYECTO */}
      <aside className="med-aviso" role="note">
        <span aria-hidden="true"></span>

        <p>
          <strong>Importante:</strong> MediControl es un prototipo
          educativo y no sustituye las indicaciones del médico.
        </p>
      </aside>

      {/* TARJETAS DE RESUMEN */}
      <section className="med-resumen" aria-label="Resumen de medicamentos">
        {/*contiene la cantidad total de registros guardados*/}
        <div className="med-resumen-card med-resumen-destacado">
          <span>Total de medicamentos</span>
          <strong>{resumen.total}</strong>
          <small>Tratamientos registrados</small>
        </div>
        {/*cuenta cuantos medicamentos fueron configurados con frecuencia de 8 horas*/}
        <div className="med-resumen-card">
          <span>◷ Cada 8 horas</span>
          <strong>{resumen.cada8}</strong>
          <small>Medicamentos</small>
        </div>
        {/*muestra los medicamentos con frecuencia de 12 horas*/}
        <div className="med-resumen-card">
          <span>◷ Cada 12 horas</span>
          <strong>{resumen.cada12}</strong>
          <small>Medicamentos</small>
        </div>
        {/*muestra los medicamentos cuya frecuencia son de 24horas*/}
        <div className="med-resumen-card">
          <span>◷ Cada 24 horas</span>
          <strong>{resumen.cada24}</strong>
          <small>Medicamentos</small>
        </div>
      </section>

      {/* CONFIRMACIONES DE LAS OPERACIONES */}
      {mensaje && (
        <p className="med-mensaje-exito" role="status">
          ✓ {mensaje}
        </p>
      )}

      {error && (
        <p className="med-mensaje-error" role="alert">
          {error}
        </p>
      )}

      {/* FORMULARIO Y LISTADO */}
      <div className="med-grid">
        <FormularioMedicamento
          onGuardar={guardar}
          medicamentoEditar={medicamentoEditar}
          onCancelar={() => setMedicamentoEditar(null)}
        />

        <ListaMedicamentos
          medicamentos={medicamentos}
          onEditar={editar}
          onEliminar={eliminar}
        />
      </div>

      {/* Las tomas se consultan solo dentro de Medicamentos. */}
      <section className="med-tomas-panel" aria-label="Control de tomas de hoy">
        <VistaHoy medicamentos={medicamentos} />
      </section>
    </main>
  );
}

export default Medicamentos;
