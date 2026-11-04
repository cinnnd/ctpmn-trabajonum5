
import { useState } from "react";
import FormularioMedicamento from "../components/FormularioMedicamento";
import ListaMedicamentos from "../components/ListaMedicamentos";
import {
  obtenerMedicamentos,
  guardarMedicamentos,
  generarId,
} from "../utils/medicamentos";
import "../styles/medicamentos.css";

function Medicamentos() {
  const [medicamentos, setMedicamentos] = useState(
    obtenerMedicamentos
  );

  const [medicamentoEditar, setMedicamentoEditar] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const guardar = (datos) => {
    const fechaActual = new Date().toISOString();

    let nuevaLista;

    if (medicamentoEditar) {
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
      const nuevoMedicamento = {
        id: generarId(),
        ...datos,
        creadoEn: fechaActual,
        actualizadoEn: fechaActual,
      };

      nuevaLista = [...medicamentos, nuevoMedicamento];
    }

    if (!guardarMedicamentos(nuevaLista)) {
      setError("No se pudieron guardar los datos en este navegador.");
      setMensaje("");
      return false;
    }

    setMedicamentos(nuevaLista);
    setMedicamentoEditar(null);
    setError("");
    setMensaje(
      medicamentoEditar
        ? "Medicamento actualizado correctamente."
        : "Medicamento registrado correctamente."
    );

    return true;
  };

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
    setError("");
    setMensaje("Medicamento eliminado correctamente.");

    if (medicamentoEditar?.id === id) {
      setMedicamentoEditar(null);
    }
  };

  const editar = (medicamento) => {
    setMedicamentoEditar(medicamento);
    setMensaje("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="med-contenedor">
      <header className="med-encabezado">
        <div>
          <span className="med-etiqueta">MediControl</span>
          <h1>Gestión de medicamentos</h1>
          <p>
            Organice sus medicamentos y horarios de forma sencilla.
          </p>
        </div>
      </header>

      <div className="med-aviso">
        Prototipo educativo. Esta aplicación no sustituye
        las indicaciones de un profesional de salud.
      </div>

      {mensaje && (
        <p className="med-mensaje-exito" role="status">
          {mensaje}
        </p>
      )}

      {error && (
        <p className="med-mensaje-error" role="alert">
          {error}
        </p>
      )}

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
    </main>
  );
}

export default Medicamentos;
