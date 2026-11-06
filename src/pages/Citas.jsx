import { useState, useEffect } from 'react';
import FormularioCita from '../components/FormularioCita';
import AgendaCitas from '../components/AgendarCitas';

export default function Citas() {
    const [citas, setCitas] = useState([])

    useEffect(() => {
        const citasGuardadas = localStorage.getItem('medicontrol-citas')
        if (citasGuardadas) {
        setCitas(JSON.parse(citasGuardadas))
        }
    }, [])

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

    // Contar citas para las tarjetas de resumen
    const citasProximas = citas.filter(c => !c.completada && new Date(`${c.fecha}T${c.hora}`) >= new Date()).length
    const citasCompletadas = citas.filter(c => c.completada).length

    return (
        <section className="pagina pagina-citas">
        {/* Header */}
        <div className="pagina-header">
            <span className="pagina-badge">MEDICONTROL</span>
            <h1>Gestión de citas médicas</h1>
            <p>Un espacio sencillo para agendar y consultar sus citas médicas.</p>
        </div>

        {/* Aviso importante */}
        <div className="aviso-importante">
            <strong>Importante:</strong> MediControl es un prototipo educativo y no sustituye las indicaciones del médico.
        </div>

        {/* Tarjetas de resumen */}
        <div className="tarjetas-resumen">
            <div className="tarjeta-resumen destacado">
            <h3>Citas</h3>
            <p className="numero-grande">{citas.length}</p>
            <p>Total registradas</p>
            </div>
            <div className="tarjeta-resumen">
            <h3>📅 Próximas</h3>
            <p className="numero-grande">{citasProximas}</p>
            <p>Citas pendientes</p>
            </div>
            <div className="tarjeta-resumen">
            <h3>✓ Completadas</h3>
            <p className="numero-grande">{citasCompletadas}</p>
            <p>Citas realizadas</p>
            </div>
        </div>

        {/* Layout de dos columnas */}
        <div className="seccion-dos-columnas">
            <div className="columna">
            <div className="tarjeta-grande">
                <h2>Nueva cita</h2>
                <p>Registre los datos de su cita médica.</p>
                <FormularioCita onAgregarCita={handleAgregarCita} />
            </div>
            </div>
            <div className="columna">
            <div className="tarjeta-grande">
                <h2>Mis citas</h2>
                <p>Consulte y administre sus citas agendadas.</p>
                <AgendaCitas 
                citas={citas}
                onEliminarCita={handleEliminarCita}
                onCompletarCita={handleCompletarCita}
                />
            </div>
            </div>
        </div>
        </section>
    )
}