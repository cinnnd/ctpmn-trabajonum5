
export const CLAVE_MEDICAMENTOS = "medicontrol_medicamentos_v1";

export const FRECUENCIAS = [
  { valor: 8, texto: "Cada 8 horas" },
  { valor: 12, texto: "Cada 12 horas" },
  { valor: 24, texto: "Cada 24 horas" },
];

export function obtenerMedicamentos() {
  try {
    const datos = localStorage.getItem(CLAVE_MEDICAMENTOS);

    if (!datos) return [];

    const medicamentos = JSON.parse(datos);
    return Array.isArray(medicamentos) ? medicamentos : [];
  } catch (error) {
    console.error("Error al cargar medicamentos:", error);
    return [];
  }
}

export function guardarMedicamentos(medicamentos) {
  try {
    localStorage.setItem(
      CLAVE_MEDICAMENTOS,
      JSON.stringify(medicamentos)
    );
    return true;
  } catch (error) {
    console.error("Error al guardar medicamentos:", error);
    return false;
  }
}

export function generarId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function validarMedicamento(datos) {
  const errores = {};

  if (!datos.nombre.trim()) {
    errores.nombre = "Ingrese el nombre del medicamento.";
  }

  if (!datos.dosis.trim()) {
    errores.dosis = "Ingrese la dosis del medicamento.";
  }

  if (![8, 12, 24].includes(Number(datos.frecuencia))) {
    errores.frecuencia = "Seleccione una frecuencia válida.";
  }

  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(datos.horaInicio)) {
    errores.horaInicio = "Seleccione una hora válida.";
  }

  return errores;
}

export function obtenerTextoFrecuencia(frecuencia) {
  return (
    FRECUENCIAS.find(
      (item) => item.valor === Number(frecuencia)
    )?.texto || "Frecuencia desconocida"
  );
}
