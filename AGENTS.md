# Repository Guidelines

## Project Structure & Module Organization 

This repository is a small local Node.js app for generating AI video prompts.

- `server.mjs` contains the HTTP server, static file handling, `.env` loading, and the secure OpenAI proxy endpoint.
- `public/index.html` defines the browser UI.
- `public/app.js` contains prompt options, presets, local generation logic, and client-side interactions.
- `public/styles.css` contains all visual styling.
- `ESTRUCTURA-PROMPTS.txt` is the source reference for prompt structure and wording.
- `.env.example` documents required local configuration. Keep real secrets in `.env`, which must not be committed.
- `PROGRESO.md` tracks project progress and implementation notes.

There is currently no dedicated `tests/` directory or build output directory.

## Build, Test, and Development Commands

- `npm start` or `npm run dev`: starts the local server with `node server.mjs`.
- `npm run check`: runs syntax checks for `server.mjs` and `public/app.js`.

After starting the app, open `http://localhost:3000`. Use the `PORT` environment variable to run on another port, for example `PORT=3001 npm start`.

## Coding Style & Naming Conventions

Use modern JavaScript with ES modules, matching `"type": "module"` in `package.json`. Prefer `const` by default and `let` only when reassignment is needed. Keep indentation at two spaces and preserve the existing semicolon style.

Use descriptive camelCase names for functions, variables, arrays, and object properties. Keep UI option identifiers short and stable, such as `slow_zoom`, `female_30`, or `image_edit`, because they may be used by form values or saved presets.

## Testing Guidelines

No automated test framework is configured yet. For now, run `npm run check` before submitting changes. Manually verify the main workflow in the browser: load the app, generate a local prompt, and confirm ChatGPT generation fails gracefully when `OPENAI_API_KEY` is absent.

If tests are added later, prefer colocated JavaScript tests or a top-level `tests/` directory, and name files after the behavior under test, for example `prompt-builder.test.js`.

## Commit & Pull Request Guidelines

This workspace does not include Git history, so no repository-specific commit convention is visible. Use concise imperative commit messages, for example `Add prompt preset controls` or `Fix OpenAI error handling`.

Pull requests should include a short summary, manual verification steps, any configuration changes, and screenshots or screen recordings for UI changes. Link related issues when available.

## Security & Configuration Tips

Never expose `OPENAI_API_KEY` in client-side files. Add new secrets only through `.env` and document safe defaults in `.env.example`.
