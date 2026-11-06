import { useState } from "react";
import FormularioCita from "../components/FormularioCita";
import AgendaCitas from "../components/AgendarCitas";

const CLAVE_CITAS = "medicontrol-citas";

// Leer antes del primer render; evita sobrescribir citas existentes con [].
function obtenerCitas() {
  try {
    const datos = JSON.parse(localStorage.getItem(CLAVE_CITAS) || "[]");
    return Array.isArray(datos) ? datos : [];
  } catch (error) {
    console.error("Error al leer citas:", error);
    return [];
  }
}

export default function Citas() {
  const [citas, setCitas] = useState(obtenerCitas);
  const [errorGuardado, setErrorGuardado] = useState("");

  const guardarCambio = (actualizar) => {
    try {
      const nuevas = actualizar(citas);
      localStorage.setItem(CLAVE_CITAS, JSON.stringify(nuevas));
      setCitas(nuevas);
      setErrorGuardado("");
    } catch (error) {
      console.error(error);
      setErrorGuardado("No se pudieron guardar las citas en este navegador.");
    }
  };

  const citasProximas = citas.filter(c => !c.completada && new Date(`${c.fecha}T${c.hora}`) >= new Date()).length;
  const citasCompletadas = citas.filter(c => c.completada).length;

  return (
    <section className="pagina pagina-citas">
      <header className="pagina-header">
        <span className="pagina-badge">MEDICONTROL</span>
        <h1>Gestión de citas médicas</h1>
        <p>Agende, consulte y administre sus citas.</p>
      </header>
      <aside className="aviso-importante" role="note"><strong>Importante:</strong> MediControl es un prototipo educativo y no sustituye las indicaciones del médico.</aside>
      {errorGuardado && <p role="alert" className="error">{errorGuardado}</p>}
      <section className="tarjetas-resumen" aria-label="Resumen de citas">
        <div className="tarjeta-resumen destacado"><h3>Citas registradas</h3><p className="numero-grande">{citas.length}</p></div>
        <div className="tarjeta-resumen"><h3>Próximas</h3><p className="numero-grande">{citasProximas}</p></div>
        <div className="tarjeta-resumen"><h3>Completadas</h3><p className="numero-grande">{citasCompletadas}</p></div>
      </section>
      <div className="seccion-dos-columnas">
        <div className="columna"><div className="tarjeta-grande"><h2>Nueva cita</h2><p>Registre los datos de su cita médica.</p><FormularioCita onAgregarCita={(c) => guardarCambio(lista => [...lista, c])} /></div></div>
        <div className="columna"><div className="tarjeta-grande"><h2>Mis citas</h2><p>Consulte sus citas agendadas.</p><AgendaCitas citas={citas} onEliminarCita={(id) => guardarCambio(lista => lista.filter(c => c.id !== id))} onCompletarCita={(id) => guardarCambio(lista => lista.map(c => c.id === id ? { ...c, completada: true } : c))} /></div></div>
      </div>
    </section>
  );
}
