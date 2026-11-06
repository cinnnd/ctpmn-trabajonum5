import { useState } from 'react'

export default function ModoAccesible({ textoGrande, altoContraste, onToggleTexto, onToggleContraste, onRestablecer }) {
    const [panelAbierto, setPanelAbierto] = useState(false)

    return (
        <div className="accesible-contenedor">
        <button 
            className="btn-accesible"
            onClick={() => setPanelAbierto(!panelAbierto)}
            aria-label="Abrir opciones de accesibilidad"
        >
            Accesibilidad
        </button>

        {panelAbierto && (
            <div className="panel-accesible">
            <h3>Opciones de accesibilidad</h3>
            <p>Ajuste la visualización para leer con mayor comodidad.</p>

            <div className="opcion-accesible">
                <div className="opcion-info">
                <h4>Texto grande</h4>
                <p>Aumentar el tamaño de las letras.</p>
                </div>
                <label className="checkbox-container">
                <input 
                    type="checkbox" 
                    checked={textoGrande}
                    onChange={onToggleTexto}
                />
                <span className="checkmark">✓</span>
                </label>
            </div>

            <div className="opcion-accesible">
                <div className="opcion-info">
                <h4>Alto contraste</h4>
                <p>Utilizar colores blanco y negro.</p>
                </div>
                <label className="checkbox-container">
                <input 
                    type="checkbox" 
                    checked={altoContraste}
                    onChange={onToggleContraste}
                />
                <span className="checkmark">✓</span>
                </label>
            </div>

            <button className="btn-restablecer" onClick={onRestablecer}>
                Restablecer apariencia
            </button>
            </div>
        )}
        </div>
    )
}