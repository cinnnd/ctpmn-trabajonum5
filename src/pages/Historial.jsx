export default function Historial() {
    return (
        <section className="pagina pagina-historial">
        {/* Header */}
        <div className="pagina-header">
            <span className="pagina-badge">MEDICONTROL</span>
            <h1>Historial de tomas y citas</h1>
            <p>Consulte el registro de sus medicamentos tomados y citas realizadas.</p>
        </div>

        {/* Aviso importante */}
        <div className="aviso-importante">
            <strong>Importante:</strong> MediControl es un prototipo educativo y no sustituye las indicaciones del médico.
        </div>

        {/* Tarjetas de resumen */}
        <div className="tarjetas-resumen">
            <div className="tarjeta-resumen destacado">
            <h3>Historial</h3>
            <p className="numero-grande">0</p>
            <p>Total de registros</p>
            </div>
            <div className="tarjeta-resumen">
            <h3>✓ Completados</h3>
            <p className="numero-grande">0</p>
            <p>Registros</p>
            </div>
            <div className="tarjeta-resumen">
            <h3>✗ Omitidos</h3>
            <p className="numero-grande">0</p>
            <p>Registros</p>
            </div>
        </div>

        {/* Contenido del historial (temporal) */}
        <div className="seccion-dos-columnas">
            <div className="columna columna-completa">
            <div className="tarjeta-grande">
                <h2>Registros del historial</h2>
                <p>Aquí aparecerá el historial de tomas de medicamentos y citas completadas.</p>
                <p className="texto-placeholder">📋 Próximamente: Integración con el módulo de medicamentos de su compañera.</p>
            </div>
            </div>
        </div>
        </section>
    )
}