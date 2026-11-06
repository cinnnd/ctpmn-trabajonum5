import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import Medicamentos from "./pages/Medicamentos";
import Citas from "./pages/Citas";
import Historial from "./pages/Historial";
import "./index.css";

const CLAVE_ACCESIBILIDAD = "mc-accesibilidad";

// Recuperar preferencias sin sobrescribir las que ya tenía el usuario.
function cargarAccesibilidad() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_ACCESIBILIDAD) || "{}");
    return {
      textoGrande: guardado.textoGrande === true,
      altoContraste: guardado.altoContraste === true,
    };
  } catch {
    return { textoGrande: false, altoContraste: false };
  }
}

function App() {
  const [accesibilidad, setAccesibilidad] = useState(cargarAccesibilidad);

  // Un único estado controla la accesibilidad de todas las páginas.
  useEffect(() => {
    const { textoGrande, altoContraste } = accesibilidad;
    document.documentElement.dataset.mcTextoGrande = String(textoGrande);
    document.documentElement.dataset.mcContraste = String(altoContraste);
    document.body.classList.toggle("texto-grande", textoGrande);
    document.body.classList.toggle("alto-contraste", altoContraste);
    try {
      localStorage.setItem(CLAVE_ACCESIBILIDAD, JSON.stringify(accesibilidad));
    } catch (error) {
      console.error("No se pudo guardar accesibilidad:", error);
    }
  }, [accesibilidad]);

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Navbar
          textoGrande={accesibilidad.textoGrande}
          altoContraste={accesibilidad.altoContraste}
          onToggleTexto={() => setAccesibilidad(a => ({ ...a, textoGrande: !a.textoGrande }))}
          onToggleContraste={() => setAccesibilidad(a => ({ ...a, altoContraste: !a.altoContraste }))}
          onRestablecer={() => setAccesibilidad({ textoGrande: false, altoContraste: false })}
        />
        <main className="contenido-principal">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/medicamentos" element={<Medicamentos />} />
            <Route path="/citas" element={<Citas />} />
            <Route path="/historial" element={<Historial />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
