
import "../styles/historial.css";

function TarjetaToma({ toma, onCambiarEstado }) {
  return (
    <article className="tarjeta-toma">
      <div className="toma-hora">
        {toma.hora}
      </div>

      <div className="toma-informacion">
        <h3>{toma.nombre}</h3>

        <p>{toma.dosis}</p>

        <span className={`estado ${toma.estado}`}>
          {toma.estado === "tomado"
            ? "✓ Tomado"
            : toma.estado === "omitido"
            ? "Omitido"
            : "Pendiente"}
        </span>
      </div>

      {toma.estado === "pendiente" && (
        <div className="toma-botones">
          <button
            className="boton-tomado"
            onClick={() =>
              onCambiarEstado(toma, "tomado")
            }
          >
            Marcar tomado
          </button>

          <button
            className="boton-omitido"
            onClick={() =>
              onCambiarEstado(toma, "omitido")
            }
          >
            Marcar omitido
          </button>
        </div>
      )}
    </article>
  );
}

export default TarjetaToma;
