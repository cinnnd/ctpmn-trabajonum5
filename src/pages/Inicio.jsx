export default function Inicio() {
    return (
    <section className="inicio">
        <h2>Bienvenido a MediControl</h2>
        <p>Organiza tus medicamentos y citas médicas en un solo lugar.</p>
        
        <div className="tarjetas-inicio">

        <div className="tarjeta">
            <h3>Medicamentos</h3>
            <p>Registra tus medicamentos y horarios de toma.</p>
        </div>

        <div className="tarjeta">
            <h3>Citas Médicas</h3>
            <p>Agenda tus citas y recibe avisos próximos.</p>
        </div>

        <div className="tarjeta">
            <h3>Historial</h3>
            <p>Consulta tus tomas cumplidas y omitidas.</p>
        </div>
        </div>
    </section>
    )
}