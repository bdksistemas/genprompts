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
```

La clave se usa solo en `server.mjs`; nunca se expone al navegador.

## Archivos principales

- `public/index.html`: interfaz.
- `public/app.js`: opciones, presets y motor local.
- `public/styles.css`: estilos.
- `server.mjs`: servidor local y endpoint seguro para OpenAI.
- `ESTRUCTURA-PROMPTS.txt`: documento base del sistema de prompts.
