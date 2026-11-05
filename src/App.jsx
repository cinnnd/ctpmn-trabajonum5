
/*
 * MEDICONTROL - COMPONENTE PRINCIPAL
 *
 * App es el componente inicial de React.
 * En esta versión mostramos el módulo de medicamentos.
 *
 * La Persona 3 integrará posteriormente React Router
 * para mostrar también las citas y el historial.
 */

// Importamos la página de gestión de medicamentos.
import Medicamentos from "./pages/Medicamentos";

function App() {
  // Mostramos nuestro módulo en la pantalla principal.
  return <Medicamentos />;
}

// Exportamos App para que React pueda utilizarlo.
export default App;
