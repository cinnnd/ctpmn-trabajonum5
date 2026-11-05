/*
 * MediControl - Prueba del módulo de historial
 *
 * Muestra los componentes desarrollados
 * por la Persona 2.
 */

import VistaHoy from "./components/VistaHoy";
import Historial from "./components/Historial";

function App() {
  return (
    <main>
      <h1>MediControl - Historial</h1>

      {/* Tomas programadas para hoy */}
      <VistaHoy />

      {/* Historial de tomas */}
      <Historial />
    </main>
  );
}

export default App;