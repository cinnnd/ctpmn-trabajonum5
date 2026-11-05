export default function ModoAccesible({ activo, onToggle }) {
    return (
        <button 
        className={`btn-accesible ${activo ? 'activo' : ''}`} 
        onClick={onToggle}
        aria-label="Activar o desactivar modo de alto contraste y letra grande"
        >
        {activo ? ' Modo Normal' : ' Modo Accesible'}
        </button>
    )
}