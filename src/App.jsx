import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'   //el useState, useEffect es para activar o desactivar la clase en body
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Inicio from './pages/Inicio'
import Medicamentos from './pages/Medicamentos'
import Citas from './pages/Citas'
import Historial from './pages/Historial'
import './index.css'

function App() {
  const [textoGrande, setTextoGrande] = useState(false)   //letras grandes para el modo accesible 
  const [altoContraste, setAltoContraste] = useState(false)  ///contraste alto para el modo accesible 

  useEffect(() => {
    const body = document.body
    
    if (textoGrande) {
      body.classList.add('texto-grande')
    } else {
      body.classList.remove('texto-grande')
    }

    if (altoContraste) {
      body.classList.add('alto-contraste')
    } else {
      body.classList.remove('alto-contraste')
    }
  }, [textoGrande, altoContraste])

  const toggleTextoGrande = () => setTextoGrande(!textoGrande)
  const toggleAltoContraste = () => setAltoContraste(!altoContraste)
  
  const restablecer = () => {
    setTextoGrande(false)
    setAltoContraste(false)
  }

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Navbar 
          textoGrande={textoGrande}
          altoContraste={altoContraste}
          onToggleTexto={toggleTextoGrande}
          onToggleContraste={toggleAltoContraste}
          onRestablecer={restablecer}
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