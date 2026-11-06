import HistorialRegistros from "../components/historial.jsx";

// Muestra los registros reales, no estadísticas ficticias en cero.
export default function Historial() {
  return (
    <section className="pagina pagina-historial">
      <header className="pagina-header">
        <span className="pagina-badge">MEDICONTROL</span>
        <h1>Historial de tomas</h1>
        <p>Consulte las tomas que marcó como tomadas u omitidas.</p>
      </header>
      <HistorialRegistros />
    </section>
  );
}
