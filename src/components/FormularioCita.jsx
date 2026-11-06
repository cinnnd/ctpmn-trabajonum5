import { useState } from 'react'

export default function FormularioCita({ onAgregarCita }) {
    // Estado del formulario (formulario controlado)
    const [cita, setCita] = useState({
    especialidad: '',
    fecha: '',
    hora: '',
    lugar: '',
    doctor: ''
    })

    // Estado para los mensajes de error
    const [errores, setErrores] = useState({})

    // Función para actualizar los campos (manejador de cambios)
    const handleChange = (e) => {
        const { name, value } = e.target
        setCita({ ...cita, [name]: value })

        // Limpiar el error cuando el usuario escribe
        if (errores[name]) {
            setErrores({ ...errores, [name]: '' })
        }
    }

    // Función de validación
    const validar = () => {
        const nuevosErrores = {}

        if (!cita.especialidad.trim()) {
            nuevosErrores.especialidad = 'La especialidad es obligatoria'
        }

        if (!cita.fecha) {
            nuevosErrores.fecha = 'La fecha es obligatoria'
        } else {
            // Validar que la fecha no sea en el pasado
            const fechaSeleccionada = new Date(`${cita.fecha}T12:00:00`)
            const hoy = new Date()
            hoy.setHours(0, 0, 0, 0)
            if (fechaSeleccionada < hoy) {
                nuevosErrores.fecha = 'No puedes agendar citas en el pasado'
            }
        }

    if (!cita.hora) {
        nuevosErrores.hora = 'La hora es obligatoria'
    }

    if (!cita.lugar.trim()) {
        nuevosErrores.lugar = 'El lugar es obligatorio'
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
    }

    // Función para enviar el formulario
    const handleSubmit = (e) => {
        e.preventDefault() // Evita que la página se recargue

        if (validar()) {
            // Crear la cita con un ID único
            const nuevaCita = {
                id: Date.now(),
                ...cita,
                completada: false
            }

        onAgregarCita(nuevaCita)

        // Limpiar el formulario
        setCita({
            especialidad: '',
            fecha: '',
            hora: '',
            lugar: '',
            doctor: ''
        })
        setErrores({})
        }
    }

    return (
    <section className="formulario-cita">
        <h2> Agendar Nueva Cita</h2>
        <form onSubmit={handleSubmit}>
        <div className="campo-formulario">
            <label htmlFor="especialidad">Especialidad *</label>
            <input
            type="text"
            id="especialidad"
            name="especialidad"
            value={cita.especialidad}
            onChange={handleChange}
            placeholder="Ej: Cardiología, Odontología..."
            />
            {errores.especialidad && <span className="error">{errores.especialidad}</span>}
        </div>

        <div className="campo-formulario">
            <label htmlFor="doctor">Doctor(a)</label>
            <input
                type="text"
                id="doctor"
                name="doctor"
                value={cita.doctor}
                onChange={handleChange}
                placeholder="Nombre del doctor (opcional)"
            />
        </div>

        <div className="campo-formulario">
            <label htmlFor="fecha">Fecha *</label>
            <input
                type="date"
                id="fecha"
                name="fecha"
                value={cita.fecha}
                onChange={handleChange}
            />
            {errores.fecha && <span className="error">{errores.fecha}</span>}
        </div>

        <div className="campo-formulario">
            <label htmlFor="hora">Hora *</label>
            <input
                type="time"
                id="hora"
                name="hora"
                value={cita.hora}
                onChange={handleChange}
            />
            {errores.hora && <span className="error">{errores.hora}</span>}
        </div>

        <div className="campo-formulario">
            <label htmlFor="lugar">Lugar *</label>
            <input
                type="text"
                id="lugar"
                name="lugar"
                value={cita.lugar}
                onChange={handleChange}
                placeholder="Ej: EBAIS Mercedes Norte, Hospital San Vicente..."
            />
            {errores.lugar && <span className="error">{errores.lugar}</span>}
        </div>

        <button type="submit" className="btn-agregar">
            Agendar Cita
        </button>

        </form>
    </section>
    )
}