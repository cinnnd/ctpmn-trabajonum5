
const CLAVE_HISTORIAL = "medicontrol_historial";

// Obtener la fecha actual
export const obtenerFechaActual = () => {
  const fecha = new Date();

  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");

  return `${anio}-${mes}-${dia}`;
};

// Generar las tomas del medicamento
export const generarTomas = (medicamento, fecha) => {
  const tomas = [];

  const frecuencia = Number(medicamento.frecuencia);

  if (![8, 12, 24].includes(frecuencia)) {
    return tomas;
  }

  const [horas, minutos] = medicamento.horaInicio
    .split(":")
    .map(Number);

  const minutosIniciales = horas * 60 + minutos;

  for (
    let minutosTotales = minutosIniciales;
    minutosTotales < 1440;
    minutosTotales += frecuencia * 60
  ) {
    const hora = Math.floor(minutosTotales / 60);
    const minuto = minutosTotales % 60;

    const horaFormato = String(hora).padStart(2, "0");
    const minutoFormato = String(minuto).padStart(2, "0");

    const horaToma = `${horaFormato}:${minutoFormato}`;

    tomas.push({
      id: `${medicamento.id}_${fecha}_${horaToma}`,
      medicamentoId: medicamento.id,
      nombre: medicamento.nombre,
      dosis: medicamento.dosis,
      fecha,
      hora: horaToma,
      estado: "pendiente",
    });
  }

  return tomas;
};

// Ordenar las tomas por hora
export const ordenarTomas = (tomas) => {
  return [...tomas].sort((a, b) =>
    a.hora.localeCompare(b.hora)
  );
};

// Obtener historial guardado
export const obtenerHistorial = () => {
  const datos = localStorage.getItem(CLAVE_HISTORIAL);

  return datos ? JSON.parse(datos) : [];
};

// Guardar historial
export const guardarHistorial = (historial) => {
  localStorage.setItem(
    CLAVE_HISTORIAL,
    JSON.stringify(historial)
  );
};

// Actualizar o agregar una toma
export const actualizarToma = (historial, toma) => {
  const existe = historial.some(
    (registro) => registro.id === toma.id
  );

  if (existe) {
    return historial.map((registro) =>
      registro.id === toma.id ? toma : registro
    );
  }

  return [...historial, toma];
};
