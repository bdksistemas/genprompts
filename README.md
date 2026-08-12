# Prompt Studio IA Video

Herramienta local para crear prompts en ingles para videos con IA usando una mezcla de plantillas y ChatGPT.

## Uso

1. Ejecuta `npm start`.
2. Abre `http://localhost:3000`.
3. Usa `Local` para generar con plantillas o `ChatGPT` para refinar con IA.

## Activar ChatGPT

Crea un archivo `.env` basado en `.env.example`:

```env
OPENAI_API_KEY=tu_api_key
OPENAI_MODEL=gpt-5.6-luna
APP_USERNAME=admin
APP_PASSWORD=una_contrasena_larga_y_unica
APP_ORIGIN=https://prompts.serverbdk.com
```

La clave se usa solo en `server.mjs`; nunca se expone al navegador.

## Produccion

Antes de subir a `https://prompts.serverbdk.com/`, configura una contrasena con
`APP_PASSWORD`. Si ejecutas con `NODE_ENV=production`, el servidor no inicia sin
esa variable. En el panel de hosting define tambien `NODE_ENV=production`.

Recomendado:

- Usar HTTPS en el proxy o panel de hosting.
- Mantener `.env`, `data/` y `certs/` fuera del directorio publico.
- No publicar el subdominio como unica proteccion; la app ya incluye Basic Auth
  cuando `APP_PASSWORD` esta definido.
- Limitar el uso de la API key desde el panel de OpenAI si tu cuenta lo permite.

## Archivos principales

- `public/index.html`: interfaz.
- `public/app.js`: opciones, presets y motor local.
- `public/styles.css`: estilos.
- `server.mjs`: servidor local y endpoint seguro para OpenAI.
- `ESTRUCTURA-PROMPTS.txt`: documento base del sistema de prompts.
