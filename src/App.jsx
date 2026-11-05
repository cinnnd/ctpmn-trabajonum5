import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Inicio from './pages/Inicio'
import Medicamentos from './pages/Medicamentos'
import Citas from './pages/Citas'
import Historial from './pages/Historial'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Navbar />
        <main className="contenido-principal">
          <Routes>                                  /* el route y routes definen que componentes muestra segun su url */
            <Route path="/" element={<Inicio />} />
            <Route path="/medicamentos" element={<Medicamentos />} />
            <Route path="/citas" element={<Citas />} />
            <Route path="/historial" element={<Historial />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter> /*METE todo en una app para habilitar la edicion*/
  )
}

export default App