import { Link } from 'react-router-dom'

export default function Inicio() {
    return (
        <section className="pagina pagina-inicio">
        {/* Header de la página */}
        <div className="pagina-header">
            <span className="pagina-badge">MEDICONTROL</span>
            <h1>Gestión de medicamentos y citas</h1>
            <p>Un espacio sencillo para organizar sus medicamentos y consultar sus horarios.</p>
        </div>

        {/* Aviso importante */}
        <div className="aviso-importante">
            <strong>Importante:</strong> MediControl es un prototipo educativo y no sustituye las indicaciones del médico.
        </div>

        {/* Tarjetas de resumen */}
        <div className="tarjetas-resumen">
            <div className="tarjeta-resumen destacado">
            <h3>Medicamentos</h3>
            <p className="numero-grande">0</p>
            <p>Total registrados</p>
            </div>
            <div className="tarjeta-resumen">
            <h3>Cada 8 horas</h3>
            <p className="numero-grande">0</p>
            <p>Medicamentos</p>
            </div>
            <div className="tarjeta-resumen">
            <h3>Cada 12 horas</h3>
            <p className="numero-grande">0</p>
            <p>Medicamentos</p>
            </div>
            <div className="tarjeta-resumen">
            <h3>Cada 24 horas</h3>
            <p className="numero-grande">0</p>
            <p>Medicamentos</p>
            </div>
        </div>

        {/* Sección de accesos rápidos */}
        <div className="seccion-dos-columnas">
            <div className="columna">
            <div className="tarjeta-grande">
                <h2>Medicamentos</h2>
                <p>Registra tus medicamentos y horarios de toma.</p>
                <Link to="/medicamentos" className="btn-enlace">Ir a Medicamentos →</Link>
            </div>
            </div>
            <div className="columna">
            <div className="tarjeta-grande">
                <h2>Citas Médicas</h2>
                <p>Agenda tus citas y recibe avisos próximos.</p>
                <Link to="/citas" className="btn-enlace">Ir a Citas →</Link>
            </div>
            </div>
        </div>

        <div className="seccion-dos-columnas">
            <div className="columna">
            <div className="tarjeta-grande">
                <h2>Historial</h2>
                <p>Consulta tus tomas cumplidas y omitidas.</p>
                <Link to="/historial" className="btn-enlace">Ir al Historial →</Link>
            </div>
            </div>
        </div>
        </section>
    )
}