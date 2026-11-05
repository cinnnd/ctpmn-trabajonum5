
/*Guarda todo en el localstorage, recupera los medicamentos, valida los datos */

//Se identifican los datos en localStorage.
// No cambiarla sin coordinarlo con la Persona 2.
export const CLAVE_MEDICAMENTOS = "medicontrol_medicamentos_v1";

// Frecuencias permitidas por los requisitos del proyecto.
// El valor representa las horas entre cada toma.
export const FRECUENCIAS = [
  { valor: 8, texto: "Cada 8 horas" },
  { valor: 12, texto: "Cada 12 horas" },
  { valor: 24, texto: "Cada 24 horas" },
];

/*Se obtienen los medicamentos, los recupera, JSON.parse convierte el texto guardado en un arreglo, si no existen datos entonces los da vacios.*/
export function obtenerMedicamentos() {
  try {
    const datos = localStorage.getItem(CLAVE_MEDICAMENTOS);

    // Si todavía no hay medicamentos, devuelve [].
    if (!datos) {
      return [];
    }

    const medicamentos = JSON.parse(datos);

    // Verificamos que lo recuperado sea realmente un arreglo.
    return Array.isArray(medicamentos) ? medicamentos : [];
  } catch (error) {
    console.error("Error al cargar medicamentos:", error);
    return [];
  }
}

/*guardar medicamentos, recibe el arreglo completo. devuelve un true si todo se guardo bien y un false si hubo algun error*/
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


/*generarId, cada medicamento ocupo un id unico, permite editarlo o eliminarlo*/

export function generarId() {
  // Utilizamos randomUUID cuando está disponible.
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Alternativa para navegadores sin randomUUID.
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
/*valida medicamentos, que complete los campos y si no hay errores*/
export function validarMedicamento(datos) {
  const errores = {};

  // Validar nombre.
  if (!datos.nombre.trim()) {
    errores.nombre = "Ingrese el nombre del medicamento.";
  }

  // Validar dosis.
  if (!datos.dosis.trim()) {
    errores.dosis = "Ingrese la dosis indicada.";
  }

  // Validar frecuencia: solo 8, 12 o 24 horas.
  if (![8, 12, 24].includes(Number(datos.frecuencia))) {
    errores.frecuencia = "Seleccione una frecuencia válida.";
  }

  // Validar hora en formato HH:MM.
  const formatoHora = /^([01]\d|2[0-3]):[0-5]\d$/;

  if (!formatoHora.test(datos.horaInicio)) {
    errores.horaInicio = "Seleccione una hora válida.";
  }

  return errores;
}

/*convierte frecuencia numerica a texto*/
export function obtenerTextoFrecuencia(frecuencia) {
  const encontrada = FRECUENCIAS.find(
    (item) => item.valor === Number(frecuencia)
  );

  return encontrada?.texto || "Frecuencia desconocida";
}
