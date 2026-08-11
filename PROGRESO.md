# Progreso - Prompt Studio IA Video

Fecha: 2026-08-08

## Estado actual

La V1 de la web ya esta creada y funcionando localmente con servidor Node nativo, sin dependencias externas. El archivo `.env` real ya fue creado y validado con una API key de OpenAI.

URL local:

```txt
http://localhost:3000
```

## Lo que ya quedo hecho

- Interfaz principal para crear prompts de video IA.
- Motor local de prompts basado en `ESTRUCTURA-PROMPTS.txt`.
- Integracion preparada con ChatGPT mediante endpoint seguro en servidor.
- La API key no se expone al navegador.
- Opciones para Seedance, Veo, Kling, Runway, Pika y generico.
- Formatos: UGC, podcast, dualcast, producto en mano, B-roll, skincare y retoque de imagen.
- Opciones de camara, voz, acento, gesto, duracion, formato, estilo visual, entorno, luz y reglas anti-errores.
- Botones: ejemplo, limpiar, generar local, generar con ChatGPT y copiar.
- Archivo `.env.example` creado.
- README con instrucciones basicas.
- Archivo `AGENTS.md` creado como guia para colaboradores/agentes.
- `.env` real creado y validado sin exponer la clave.
- Validacion de sintaxis completada con `npm.cmd run check`.
- Servidor validado en `http://localhost:3000` con respuesta `200`.
- Asistente lateral integrado para definir y aplicar prompts acordados.
- Estructura de produccion local: proyecto, video y escena.
- Cada escena conserva su configuracion y prompt final actual, sin historial de intentos.
- Contexto de proyecto y video enviado automaticamente al asistente y al refinamiento IA.
- Biblioteca `ESTRUCTURA-PROMPTS.txt` usada por el servidor como referencia de reglas para IA.
- Selector jerarquico en una sola fila: Proyecto -> Video -> Escena, con bloqueos entre niveles.
- Pestañas de trabajo para Proyecto, Video y Escena.
- Pestaña Proyecto para consultar el contexto completo y editarlo.
- Pestaña Video con objetivo, plataforma, CTA y campo persistente de Plan maestro del video.
- Boton para que el asistente cree y guarde el plan maestro del video activo.
- Campos largos de proyecto conservan saltos de linea al guardar y mostrarse.
- Chat: Enter envia; Ctrl+Enter, Shift+Enter, Alt+Enter y Cmd+Enter insertan salto de linea.

## Archivos principales

- `server.mjs`: servidor local y endpoints de IA y persistencia del estudio.
- `public/index.html`: estructura de la interfaz.
- `public/app.js`: motor local, presets y logica de interaccion.
- `public/styles.css`: estilos visuales.
- `.env.example`: plantilla para configurar OpenAI.
- `README.md`: instrucciones de uso.
- `ESTRUCTURA-PROMPTS.txt`: documento base original.
- `data/studio.json`: almacenamiento local creado al guardar el primer proyecto (ignorado por Git).

## Pendiente para la proxima sesion

1. Probar en navegador el flujo completo: crear proyecto, video, plan maestro con asistente y escenas.
2. Confirmar que el asistente guarda correctamente un plan maestro cuando se llega a un acuerdo.
3. Probar el boton `ChatGPT` desde el navegador con una generacion real.
4. Si la API devuelve error de modelo, ajustar `OPENAI_MODEL` a un modelo disponible para la cuenta.
5. Revisar calidad de prompts generados para:
   - UGC skincare.
   - Producto en mano.
   - Podcast.
   - Dualcast.
   - B-roll.
   - Retoque de imagen.
6. Pulir UI:
   - Ajustar textos y labels.
   - Revisar mobile.
   - Mejorar jerarquia visual si hace falta.
   - Agregar presets rapidos si conviene.
7. Revisar si conviene separar presets por modelo:
   - Seedance.
   - Veo.
   - Kling.
   - Runway.
8. Validar comportamiento cuando falta API key.

## Comandos utiles

Arrancar app:

```bash
npm.cmd run dev
```

Tambien funciona `npm.cmd start`. En PowerShell, usar `npm.cmd` evita el bloqueo comun de `npm.ps1` por politicas de ejecucion.

Validar sintaxis:

```bash
npm.cmd run check
```

Configurar IA:

```env
OPENAI_API_KEY=tu_api_key
OPENAI_MODEL=gpt-5.6-luna
```

## Nota tecnica

Se intento montar una app con Next.js, pero `npm install` se quedo bloqueado al consultar/instalar dependencias. Para avanzar sin depender de ese bloqueo, se construyo una version ligera con Node nativo, HTML, CSS y JavaScript puro. Esto mantiene la app simple, rapida y suficiente para la V1.
