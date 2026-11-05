import { useState, useEffect } from 'react'
import FormularioCita from '../components/FormularioCita'
import AgendaCitas from '../components/AgendarCitas'

export default function Citas() {
    const [citas, setCitas] = useState([])

    // Cargar citas de localStorage al iniciar
    useEffect(() => {
        const citasGuardadas = localStorage.getItem('medicontrol-citas')
        if (citasGuardadas) {
        setCitas(JSON.parse(citasGuardadas))
        }
    }, [])

    // Guardar citas en localStorage cuando cambien
    useEffect(() => {
        localStorage.setItem('medicontrol-citas', JSON.stringify(citas))
    }, [citas])

    const handleAgregarCita = (nuevaCita) => {
        setCitas([...citas, nuevaCita])
    }

    const handleEliminarCita = (id) => {
        setCitas(citas.filter(cita => cita.id !== id))
    }

    const handleCompletarCita = (id) => {
        setCitas(citas.map(cita => 
        cita.id === id ? { ...cita, completada: true } : cita
        ))
    }

    return (
        <section className="pagina">
        <h2>Citas Médicas</h2>
        <FormularioCita onAgregarCita={handleAgregarCita} />
        <AgendaCitas 
            citas={citas}
            onEliminarCita={handleEliminarCita}
            onCompletarCita={handleCompletarCita}
        />
        </section>
    )
}