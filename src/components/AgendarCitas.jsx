export default function AgendaCitas({ citas, onEliminarCita, onCompletarCita }) {
    // Ordenar citas por fecha y hora
    const citasOrdenadas = [...citas].sort((a, b) => {
        const fechaA = new Date(`${a.fecha}T${a.hora}`)
        const fechaB = new Date(`${b.fecha}T${b.hora}`)
        return fechaA - fechaB
    })

    // Filtrar citas futuras y pasadas
    const ahora = new Date()
    const citasProximas = citasOrdenadas.filter(cita => {
        const fechaCita = new Date(`${cita.fecha}T${cita.hora}`)
        return fechaCita >= ahora && !cita.completada
    })

    const citasPasadas = citasOrdenadas.filter(cita => {
        const fechaCita = new Date(`${cita.fecha}T${cita.hora}`)
        return fechaCita < ahora || cita.completada
    })

    // Función para formatear fecha
    const formatearFecha = (fechaStr) => {
        const opciones = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(fechaStr).toLocaleDateString('es-ES', opciones)
    }

    return (
        <section className="agenda-citas">
        <h2>Citas Agendadas</h2>
        
        {citas.length === 0 ? (
            <p className="sin-citas">No tienes citas agendadas</p>
        ) : (
            <>
            {/* Citas próximas */}
            {citasProximas.length > 0 && (
                <div className="seccion-citas">
                <h3>Próximas Citas</h3>
                <div className="lista-citas">
                    {citasProximas.map(cita => (
                    <div key={cita.id} className="tarjeta-cita proxima">
                        <div className="cita-info">
                        <h4>{cita.especialidad}</h4>
                        {cita.doctor && <p>doctor {cita.doctor}</p>}
                        <p>fecha{formatearFecha(cita.fecha)} - hora {cita.hora}</p>
                        <p>lugar {cita.lugar}</p>
                        </div>
                        <div className="cita-acciones">
                        <button 
                            className="btn-completar"
                            onClick={() => onCompletarCita(cita.id)}
                        >
                            ✓ Completada
                        </button>
                        <button 
                            className="btn-eliminar"
                            onClick={() => onEliminarCita(cita.id)}
                        >
                            Eliminar
                        </button>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            )}

            {/* Citas pasadas/completadas */}
            {citasPasadas.length > 0 && (
                <div className="seccion-citas">
                <h3>Historial de Citas</h3>
                <div className="lista-citas">
                    {citasPasadas.map(cita => (
                    <div key={cita.id} className={`tarjeta-cita ${cita.completada ? 'completada' : 'omitida'}`}>
                        <div className="cita-info">
                        <h4>{cita.especialidad}</h4>
                        {cita.doctor && <p>doctor{cita.doctor}</p>}
                        <p>fecha{formatearFecha(cita.fecha)} - hora {cita.hora}</p>
                        <p>lugar{cita.lugar}</p>
                        {cita.completada && <span className="badge">✓ Completada</span>}
                        </div>
                        <button 
                        className="btn-eliminar"
                        onClick={() => onEliminarCita(cita.id)}
                        >
                        Eliminar
                        </button>
                    </div>
                    ))}
                </div>
                </div>
            )}
            </>
        )}
        </section>
    )
}