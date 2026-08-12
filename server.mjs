import { createServer } from "node:http";
import { request as httpsRequest } from "node:https";
import { timingSafeEqual } from "node:crypto";
import { readFileSync } from "node:fs";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { extname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const publicDir = join(root, "public");
const publicRoot = resolve(publicDir);
const dataDir = join(root, "data");
const studioFile = join(dataDir, "studio.json");
const promptLibraryFile = join(root, "ESTRUCTURA-PROMPTS.txt");

function loadPromptLibrary() {
  try {
    return readFileSync(promptLibraryFile, "utf8").slice(0, 30000);
  } catch {
    return "";
  }
}

const promptLibrary = loadPromptLibrary();

function loadDotEnv() {
  try {
    const env = readFileSync(join(root, ".env"), "utf8");
    for (const line of env.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
        continue;
      }
      const index = trimmed.indexOf("=");
      const key = trimmed.slice(0, index).trim();
      const value = trimmed
        .slice(index + 1)
        .trim()
        .replace(/^["']|["']$/g, "");
      if (key && process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  } catch {
    // The app also works without .env; ChatGPT generation simply stays disabled.
  }
}

loadDotEnv();

const port = Number(process.env.PORT || 3000);
const appUsername = process.env.APP_USERNAME || "admin";
const appPassword = process.env.APP_PASSWORD || "";
const isProduction = process.env.NODE_ENV === "production";
const maxJsonBodyBytes = Number(process.env.MAX_JSON_BODY_BYTES || 1_000_000);
const maxUpstreamBodyBytes = Number(process.env.MAX_UPSTREAM_BODY_BYTES || 2_000_000);
const openAiTimeoutMs = Number(process.env.OPENAI_TIMEOUT_MS || 60_000);
const rateLimitPerMinute = Number(process.env.RATE_LIMIT_PER_MINUTE || 120);
const rateLimitBuckets = new Map();

if (isProduction && !appPassword) {
  throw new Error("Configura APP_PASSWORD antes de iniciar en produccion.");
}

if (!appPassword) {
  console.warn("APP_PASSWORD no esta configurado; la app queda sin autenticacion.");
}

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8"
};

const allowedModels = new Set([
  "gpt-5.6-luna",
  "gpt-5.6-terra",
  "gpt-5.6-sol",
  "gpt-5.6",
  "chat-latest"
]);

const allowedOrigins = new Set([
  process.env.APP_ORIGIN,
  "https://prompts.serverbdk.com",
  `http://localhost:${port}`,
  `http://127.0.0.1:${port}`
].filter(Boolean));

const securityHeaders = {
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  "Origin-Agent-Cluster": "?1",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
  "Referrer-Policy": "same-origin",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY"
};

function responseHeaders(headers = {}) {
  return {
    ...securityHeaders,
    ...(isProduction
      ? { "Strict-Transport-Security": "max-age=31536000; includeSubDomains" }
      : {}),
    ...headers
  };
}

function sendJson(response, status, payload) {
  response.writeHead(status, {
    ...responseHeaders(),
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(payload));
}

function sendText(response, status, text, headers = {}) {
  response.writeHead(status, {
    ...responseHeaders(headers),
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(text);
}

function createHttpError(status, message) {
  const error = new Error(message);
  error.statusCode = status;
  return error;
}

function sendError(response, error, fallbackMessage) {
  const status = Number(error?.statusCode || 500);
  sendJson(response, status, {
    error: status >= 500 ? fallbackMessage : error.message || fallbackMessage
  });
}

function safeCompare(left, right) {
  const leftBuffer = Buffer.from(String(left));
  const rightBuffer = Buffer.from(String(right));
  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

function isAuthorized(request) {
  if (!appPassword) {
    return true;
  }

  const authorization = request.headers.authorization || "";
  const [scheme, encoded] = authorization.split(" ");
  if (scheme !== "Basic" || !encoded) {
    return false;
  }

  let username = "";
  let password = "";
  try {
    const decoded = Buffer.from(encoded, "base64").toString("utf8");
    const separator = decoded.indexOf(":");
    username = separator >= 0 ? decoded.slice(0, separator) : "";
    password = separator >= 0 ? decoded.slice(separator + 1) : "";
  } catch {
    return false;
  }

  return safeCompare(username, appUsername) && safeCompare(password, appPassword);
}

function sendUnauthorized(response) {
  response.writeHead(401, {
    ...responseHeaders({
      "WWW-Authenticate": 'Basic realm="Prompt Studio", charset="UTF-8"'
    }),
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end("Authentication required");
}

function verifyOrigin(request) {
  if (!["POST", "PUT", "PATCH", "DELETE"].includes(request.method || "")) {
    return;
  }

  const origin = request.headers.origin;
  if (origin && !allowedOrigins.has(origin)) {
    throw createHttpError(403, "Origen no permitido.");
  }
}

function isRateLimited(request) {
  if (!rateLimitPerMinute) {
    return false;
  }

  const now = Date.now();
  const key = request.socket.remoteAddress || "unknown";
  const bucket = rateLimitBuckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    rateLimitBuckets.set(key, { count: 1, resetAt: now + 60_000 });
    return false;
  }

  bucket.count += 1;
  return bucket.count > rateLimitPerMinute;
}

function loadExtraCa() {
  const candidates = [
    process.env.NODE_EXTRA_CA_CERTS,
    join(root, "certs", "avast-web-mail-shield-root.pem"),
    "C:\\laragon\\etc\\ssl\\cacert.pem"
  ].filter(Boolean);
  const certificates = [];

  for (const filePath of candidates) {
    try {
      certificates.push(readFileSync(filePath, "utf8"));
    } catch {
      // Keep the default Node trust store when the optional CA is unavailable.
    }
  }

  return certificates.length ? certificates.join("\n") : undefined;
}

const extraCa = loadExtraCa();

async function readJson(request) {
  const contentType = request.headers["content-type"] || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    throw createHttpError(415, "Usa Content-Type application/json.");
  }

  const chunks = [];
  let totalBytes = 0;
  for await (const chunk of request) {
    totalBytes += chunk.length;
    if (totalBytes > maxJsonBodyBytes) {
      throw createHttpError(413, "La solicitud es demasiado grande.");
    }
    chunks.push(chunk);
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw createHttpError(400, "JSON invalido.");
  }
}

function cleanText(value, maxLength = 12000) {
  return String(value || "").trim().slice(0, maxLength);
}

function defaultStudio() {
  return { version: 1, projects: [] };
}

function sanitizeScene(scene) {
  return {
    id: cleanText(scene?.id, 100),
    name: cleanText(scene?.name, 160) || "Escena",
    settings:
      scene?.settings && typeof scene.settings === "object" && !Array.isArray(scene.settings)
        ? scene.settings
        : {},
    prompt: cleanText(scene?.prompt, 30000),
    updatedAt: cleanText(scene?.updatedAt, 80)
  };
}

function sanitizeStudio(value) {
  const projects = Array.isArray(value?.projects) ? value.projects.slice(0, 100) : [];

  return {
    version: 1,
    projects: projects.map((project) => ({
      id: cleanText(project?.id, 100),
      name: cleanText(project?.name, 160) || "Proyecto sin nombre",
      description: cleanText(project?.description),
      audience: cleanText(project?.audience, 3000),
      offer: cleanText(project?.offer, 3000),
      tone: cleanText(project?.tone, 3000),
      restrictions: cleanText(project?.restrictions, 5000),
      updatedAt: cleanText(project?.updatedAt, 80),
      videos: (Array.isArray(project?.videos) ? project.videos : []).slice(0, 300).map((video) => ({
        id: cleanText(video?.id, 100),
        title: cleanText(video?.title, 160) || "Video sin titulo",
        objective: cleanText(video?.objective, 3000),
        platform: cleanText(video?.platform, 300),
        cta: cleanText(video?.cta, 1000),
        plan: cleanText(video?.plan, 30000),
        updatedAt: cleanText(video?.updatedAt, 80),
        scenes: (Array.isArray(video?.scenes) ? video.scenes : [])
          .slice(0, 1000)
          .map(sanitizeScene)
      }))
    }))
  };
}

async function loadStudio() {
  try {
    return sanitizeStudio(JSON.parse(await readFile(studioFile, "utf8")));
  } catch {
    return defaultStudio();
  }
}

async function saveStudio(studio) {
  const normalized = sanitizeStudio(studio);
  await mkdir(dataDir, { recursive: true });
  const temporaryFile = `${studioFile}.tmp`;
  await writeFile(temporaryFile, `${JSON.stringify(normalized, null, 2)}\n`, "utf8");
  await rename(temporaryFile, studioFile);
  return normalized;
}

async function handleStudio(request, response) {
  try {
    if (request.method === "GET") {
      sendJson(response, 200, await loadStudio());
      return;
    }

    if (request.method === "PUT") {
      sendJson(response, 200, await saveStudio(await readJson(request)));
      return;
    }

    response.writeHead(405);
    response.end("Method not allowed");
  } catch (error) {
    sendError(response, error, "No se pudo guardar el estudio local.");
  }
}

function postOpenAiResponses(payload) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    let settled = false;
    const fail = (error) => {
      if (settled) {
        return;
      }
      settled = true;
      reject(error);
    };

    const request = httpsRequest(
      {
        hostname: "api.openai.com",
        path: "/v1/responses",
        method: "POST",
        ca: extraCa,
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body)
        }
      },
      (apiResponse) => {
        const chunks = [];
        let totalBytes = 0;

        apiResponse.on("data", (chunk) => {
          totalBytes += chunk.length;
          if (totalBytes > maxUpstreamBodyBytes) {
            fail(createHttpError(502, "La respuesta de OpenAI excedio el limite permitido."));
            request.destroy();
            return;
          }
          chunks.push(chunk);
        });

        apiResponse.on("end", () => {
          if (settled) {
            return;
          }
          settled = true;
          const text = Buffer.concat(chunks).toString("utf8");
          let payloadJson = {};

          try {
            payloadJson = JSON.parse(text);
          } catch {
            payloadJson = { error: { message: text || "Empty API response" } };
          }

          resolve({
            ok:
              Number(apiResponse.statusCode) >= 200 &&
              Number(apiResponse.statusCode) < 300,
            status: Number(apiResponse.statusCode || 500),
            payload: payloadJson
          });
        });
      }
    );

    request.setTimeout(openAiTimeoutMs, () => {
      fail(createHttpError(504, "OpenAI tardo demasiado en responder."));
      request.destroy();
    });
    request.on("error", fail);
    request.write(body);
    request.end();
  });
}

function extractOutputText(payload) {
  if (typeof payload.output_text === "string") {
    return payload.output_text;
  }

  const parts = [];
  for (const item of payload.output || []) {
    for (const content of item.content || []) {
      if (content.type === "output_text" && content.text) {
        parts.push(content.text);
      }
    }
  }
  return parts.join("\n").trim();
}

function parseAssistantOutput(text) {
  const trimmed = String(text || "").trim();

  try {
    return JSON.parse(trimmed);
  } catch {
    const match = trimmed.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {
        // Fall through to a plain chat reply.
      }
    }
  }

  return {
    reply: trimmed,
    final_prompt: "",
    video_plan: ""
  };
}

function parseJsonObject(text) {
  const trimmed = String(text || "").trim();

  try {
    return JSON.parse(trimmed);
  } catch {
    const match = trimmed.match(/\{[\s\S]*\}/);
    if (!match) {
      return {};
    }

    try {
      return JSON.parse(match[0]);
    } catch {
      return {};
    }
  }
}

async function handleSuggestSettings(request, response) {
  try {
    const body = await readJson(request);
    const idea = cleanText(body.idea, 12000);

    if (!idea) {
      sendJson(response, 400, {
        error: "Escribe la idea o guion antes de configurar la escena."
      });
      return;
    }

    if (!process.env.OPENAI_API_KEY) {
      sendJson(response, 503, {
        error: "Falta configurar OPENAI_API_KEY para configurar con ChatGPT."
      });
      return;
    }

    const requestedModel =
      body.model || process.env.OPENAI_MODEL || "gpt-5.6-luna";
    const model = allowedModels.has(requestedModel)
      ? requestedModel
      : "gpt-5.6-luna";

    const apiResponse = await postOpenAiResponses({
      model,
      reasoning: { effort: "low" },
      input: [
        {
          role: "developer",
          content:
            "You configure an AI video scene form from a Spanish scene brief. Return only valid JSON. Choose only IDs from the provided option lists. Do not invent IDs. Prefer exact scene requirements over defaults. If the scene says no visible dialogue or no lip movement, choose voice none and clearLipSync false. If no music is requested or music is not mentioned, choose backgroundMusic none. Preserve user/project restrictions."
        },
        {
          role: "user",
          content: `Scene idea or brief:\n${idea}\n\nCurrent settings:\n${JSON.stringify(
            body.currentSettings || {},
            null,
            2
          )}\n\nProject context:\n${JSON.stringify(
            body.projectContext || {},
            null,
            2
          )}\n\nValid options:\n${JSON.stringify(
            body.options || {},
            null,
            2
          )}\n\nReturn this JSON shape exactly: {"settings":{"inputKind":"idea or script","targetModel":"id","format":"id","mode":"id","camera":"id","action":"id","actionTiming":"before|during|after","voice":"id","accent":"id","backgroundMusic":"id","duration":"value","aspectRatio":"value","visualStyle":"value","environment":"value","lighting":"value","speakerSide":"left|right","productSurface":"short text","skincareArea":"value","includeAntiCut":true,"preserveIdentity":true,"preserveProduct":false,"naturalGestures":true,"clearLipSync":false,"negativeGuards":true,"extraNotes":"short Spanish notes for constraints not covered by controls","detailLevel":"detailed or compact"},"summary":"Spanish one-sentence explanation"}`
        }
      ]
    });

    const payload = apiResponse.payload;

    if (!apiResponse.ok) {
      sendJson(response, apiResponse.status, {
        error:
          payload.error?.message ||
          "OpenAI no pudo configurar la escena en este momento."
      });
      return;
    }

    const parsed = parseJsonObject(extractOutputText(payload));
    sendJson(response, 200, {
      settings: parsed.settings || {},
      summary: cleanText(parsed.summary, 1000),
      model
    });
  } catch (error) {
    sendError(response, error, "No se pudo configurar la escena con IA.");
  }
}

async function handleGeneratePrompt(request, response) {
  try {
    const body = await readJson(request);
    const settings = body.settings || {};

    if (!settings.idea || !String(settings.idea).trim()) {
      sendJson(response, 400, {
        error: "Escribe una idea o guion antes de usar IA."
      });
      return;
    }

    if (!process.env.OPENAI_API_KEY) {
      sendJson(response, 503, {
        error:
          "Falta configurar OPENAI_API_KEY. El generador local sigue disponible."
      });
      return;
    }

    const requestedModel =
      body.model || process.env.OPENAI_MODEL || "gpt-5.6-luna";
    const model = allowedModels.has(requestedModel)
      ? requestedModel
      : "gpt-5.6-luna";

    const apiResponse = await postOpenAiResponses({
        model,
        reasoning: { effort: "low" },
        input: [
          {
            role: "developer",
            content:
              `You are an expert prompt engineer for AI video generation models such as Seedance, Veo, Kling, Runway, Pika, and Sora. Rewrite the user's scene into one production-ready English prompt. Keep exact spoken dialogue in the user's original language inside quotes. Be concrete, cinematic when useful, and strict about identity, product labels, continuity, camera movement, natural gestures, and no cuts. Do not include explanations, markdown headings, or alternatives. Follow the reference prompt playbook below whenever it applies.\n\nREFERENCE PROMPT PLAYBOOK:\n${promptLibrary}`
          },
          {
            role: "user",
            content: `User settings as JSON:\n${JSON.stringify(
              { settings, projectContext: body.projectContext || {} },
              null,
              2
            )}\n\nLocal template draft:\n${body.localPrompt || ""}\n\nCreate the final prompt now.`
          }
        ]
    });

    const payload = apiResponse.payload;

    if (!apiResponse.ok) {
      sendJson(response, apiResponse.status, {
        error:
          payload.error?.message ||
          "OpenAI no pudo generar el prompt en este momento."
      });
      return;
    }

    sendJson(response, 200, {
      prompt: extractOutputText(payload) || body.localPrompt || "",
      model
    });
  } catch (error) {
    sendError(response, error, "No se pudo generar el prompt con IA.");
  }
}

async function handleAssistantChat(request, response) {
  try {
    const body = await readJson(request);
    const messages = Array.isArray(body.messages) ? body.messages : [];

    if (!messages.length) {
      sendJson(response, 400, {
        error: "Escribe un mensaje para iniciar el chat con el asistente."
      });
      return;
    }

    if (!process.env.OPENAI_API_KEY) {
      sendJson(response, 503, {
        error:
          "Falta configurar OPENAI_API_KEY. El asistente necesita IA para conversar."
      });
      return;
    }

    const requestedModel =
      body.model || process.env.OPENAI_MODEL || "gpt-5.6-luna";
    const model = allowedModels.has(requestedModel)
      ? requestedModel
      : "gpt-5.6-luna";

    const conversation = messages
      .filter((message) => ["user", "assistant"].includes(message.role))
      .map((message) => ({
        role: message.role,
        content: String(message.content || "").slice(0, 3000)
      }));
    const hasSceneContext = body.hasSceneContext === true;
    const assistantTask =
      body.assistantTask || (hasSceneContext ? "scene_prompt" : "video_plan");
    const contextForAssistant = hasSceneContext
      ? { settings: body.settings || {}, projectContext: body.projectContext || {} }
      : { projectContext: body.projectContext || {} };
    const sceneContextBlock = hasSceneContext
      ? `Current scene generator settings:
${JSON.stringify(contextForAssistant, null, 2)}

Local prompt draft:
${body.localPrompt || ""}

Current output prompt:
${body.currentPrompt || ""}`
      : `No active scene exists yet. Do not use or mention any generator defaults, sample scene, skincare example, duration, talent, location, dialogue, or local prompt. Work only from the project/video context and the conversation.

Project and video context:
${JSON.stringify(contextForAssistant, null, 2)}`;

    const apiResponse = await postOpenAiResponses({
        model,
        reasoning: { effort: "low" },
        input: [
          {
            role: "developer",
            content:
              `Your name is Lía. You are a senior creative director, video advertising strategist, social media marketer, and expert AI video prompt engineer. Speak Spanish in the chat. Format reply with short readable paragraphs separated by blank lines; use compact numbered lines when listing recommendations; avoid one long paragraph. Help the user define a high-converting video concept: target audience, hook, promise, visual proof, product behavior, camera, light, gesture, rhythm, dialogue, and platform fit. Ask concise questions when key information is missing. When the user clearly approves, says to generate the final version, or the conversation has reached a concrete agreement, include a production-ready English AI video prompt in final_prompt. The final prompt must be precise, realistic, continuous-shot friendly, commercially useful, and strict about identity, product labels, natural movement, lip sync, no cuts, and common AI video failure guards. Preserve exact spoken dialogue in the original language inside quotes. When the active task is video_plan, help build a complete Spanish production plan for the selected video. On agreement, return that plan in video_plan with a practical scene-by-scene structure: objective, audience, platform, hook, scene order, visual direction, spoken or on-screen text, proof, CTA, and production notes. Return only valid JSON with this shape: {\"reply\":\"Spanish chat reply\",\"final_prompt\":\"English final prompt or empty string\",\"video_plan\":\"Spanish video plan or empty string\"}. Do not include markdown. Follow the reference prompt playbook below whenever it applies.\n\nREFERENCE PROMPT PLAYBOOK:\n${promptLibrary}`
          },
          {
            role: "user",
            content: `Active assistant task: ${assistantTask}\n\n${sceneContextBlock}\n\nConversation:\n${JSON.stringify(
              conversation,
              null,
              2
            )}`
          }
        ]
    });

    const payload = apiResponse.payload;

    if (!apiResponse.ok) {
      sendJson(response, apiResponse.status, {
        error:
          payload.error?.message ||
          "OpenAI no pudo responder al asistente en este momento."
      });
      return;
    }

    const parsed = parseAssistantOutput(extractOutputText(payload));

    sendJson(response, 200, {
      reply: String(parsed.reply || "").trim(),
      finalPrompt: String(parsed.final_prompt || parsed.finalPrompt || "").trim(),
      videoPlan: String(parsed.video_plan || parsed.videoPlan || "").trim(),
      model
    });
  } catch (error) {
    sendError(response, error, "No se pudo conversar con el asistente.");
  }
}

async function serveStatic(request, response) {
  let filePath = "";

  try {
    const url = new URL(request.url || "/", "http://localhost");
    const rawPath = url.pathname === "/" ? "/index.html" : url.pathname;
    const decodedPath = decodeURIComponent(rawPath);
    filePath = resolve(publicRoot, `.${decodedPath}`);
  } catch {
    sendText(response, 400, "Bad request");
    return;
  }

  if (filePath !== publicRoot && !filePath.startsWith(`${publicRoot}${sep}`)) {
    sendText(response, 403, "Forbidden");
    return;
  }

  try {
    const data = await readFile(filePath);
    response.writeHead(200, {
      ...responseHeaders(),
      "Content-Type": contentTypes[extname(filePath)] || "application/octet-stream",
      "Cache-Control": extname(filePath) === ".html" ? "no-store" : "public, max-age=3600"
    });
    response.end(request.method === "HEAD" ? undefined : data);
  } catch {
    sendText(response, 404, "Not found");
  }
}

const server = createServer((request, response) => {
  let pathname = "/";

  try {
    pathname = new URL(request.url || "/", "http://localhost").pathname;
    verifyOrigin(request);
  } catch (error) {
    sendError(response, error, "Solicitud invalida.");
    return;
  }

  if (!isAuthorized(request)) {
    sendUnauthorized(response);
    return;
  }

  if (pathname.startsWith("/api/") && isRateLimited(request)) {
    sendJson(response, 429, { error: "Demasiadas solicitudes. Intenta de nuevo en un minuto." });
    return;
  }

  if (pathname === "/api/studio" && ["GET", "PUT"].includes(request.method || "")) {
    void handleStudio(request, response);
    return;
  }

  if (request.method === "POST" && pathname === "/api/assistant-chat") {
    void handleAssistantChat(request, response);
    return;
  }

  if (request.method === "POST" && pathname === "/api/suggest-settings") {
    void handleSuggestSettings(request, response);
    return;
  }

  if (request.method === "POST" && pathname === "/api/generate-prompt") {
    void handleGeneratePrompt(request, response);
    return;
  }

  if (request.method === "GET" || request.method === "HEAD") {
    void serveStatic(request, response);
    return;
  }

  sendText(response, 405, "Method not allowed");
});

server.listen(port, () => {
  console.log(`Prompt Studio listo en http://localhost:${port}`);
});
