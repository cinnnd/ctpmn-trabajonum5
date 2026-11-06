# MediControl — cambios de integración

- **Inicio**: únicamente presentación, aviso y enlaces a Medicamentos, Citas e Historial. Sin estadísticas de medicamentos duplicadas.
- **Medicamentos**: mantiene CRUD y estadísticas reales e incluye el seguimiento de tomas del día mediante `VistaHoy`.
- **Historial**: utiliza el componente real que lee `medicontrol_historial`, no estadísticas ficticias.
- **Accesibilidad**: un solo botón en la barra; guarda `mc-accesibilidad` y aplica texto grande/alto contraste a toda la aplicación.
- **Citas**: carga primero el contenido de `medicontrol-citas` para evitar que un efecto inicial borre los registros previos; se añadieron controles para errores de lectura/escritura.
- **Almacenamiento**: el proyecto NO incluye base de datos en servidor. Sus registros se guardan en el `localStorage` del navegador. Se conservaron las claves `medicontrol_medicamentos_v1`, `medicontrol_historial`, `medicontrol-citas` y `mc-accesibilidad` para no perder datos existentes.
- **Integración**: se preservaron los módulos originales y se excluyeron `.git`, `node_modules`, `dist` y la copia `revision-historial` del paquete final.

## Ejecutar

```powershell
npm.cmd install
npm.cmd run dev
```

Abra la dirección indicada por Vite. Para validar la compilación:

```powershell
npm.cmd run build
```

## Atención

Los datos guardados en otro equipo o navegador no se sincronizan automáticamente; para compartir datos entre usuarios se necesita backend y base de datos reales.
