import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'          //el useState, useEffect es para activar o desactivar la clase en body
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Inicio from './pages/Inicio'
import Medicamentos from './pages/Medicamentos'
import Citas from './pages/Citas'
import Historial from './pages/Historial'
import './index.css'

function App() {
  // Estado para saber si el modo accesible está activo
  const [modoAccesible, setModoAccesible] = useState(false)

  // Efecto: Cada vez que cambie 'modoAccesible', agregamos o quitamos la clase al body
  useEffect(() => {
    if (modoAccesible) {
      document.body.classList.add('modo-accesible')
    } else {
      document.body.classList.remove('modo-accesible')
    }
  }, [modoAccesible])

  // Función para cambiar el estado
  const toggleModoAccesible = () => {
    setModoAccesible(!modoAccesible)
  }

  return (
    <BrowserRouter>
      <div className="app-layout">
        {/* eso hace que el boton aparesca y funcione en el navbar */}
        <Navbar 
          modoAccesible={modoAccesible} 
          onToggleAccesible={toggleModoAccesible} 
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
  )
}

export default App