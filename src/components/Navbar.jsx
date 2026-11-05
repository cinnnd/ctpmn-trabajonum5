import { Link, useLocation } from 'react-router-dom'
import ModoAccesible from './ModoAccesible' // esto es lo del boton de modo accesible

export default function Navbar({ modoAccesible, onToggleAccesible }) {
    const location = useLocation()

    return (
        <nav className="navbar">
        <div className="navbar-contenido">
            <div className="navbar-info">
            <h1 className="navbar-titulo">MediControl</h1>
            <p className="navbar-subtitulo">Recordatorio de medicamentos y citas</p>
            </div>
            
            {/*  el botón de modo accesible */}
            <ModoAccesible 
            activo={modoAccesible} 
            onToggle={onToggleAccesible} 
            />
        </div>

        <ul className="navbar-menu">
            <li>
            <Link to="/" className={location.pathname === '/' ? 'activo' : ''}>
                Inicio
            </Link>
            </li>

            <li>
            <Link to="/medicamentos" className={location.pathname === '/medicamentos' ? 'activo' : ''}>
                Medicamentos
            </Link>
            </li>

            <li>
            <Link to="/citas" className={location.pathname === '/citas' ? 'activo' : ''}>
                Citas
            </Link>
            </li>

            <li>
            <Link to="/historial" className={location.pathname === '/historial' ? 'activo' : ''}>
                Historial
            </Link>
            </li>
        </ul>
        </nav>
    )
}