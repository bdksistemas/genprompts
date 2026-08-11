const targetModels = [
  ["seedance", "Seedance", "Optimize for Seedance-style image-to-video or text-to-video generation: clear subject control, natural motion, direct camera instructions, and one continuous shot."],
  ["veo", "Veo", "Optimize for Veo-style cinematic realism: precise shot language, natural light, grounded physical motion, and coherent temporal continuity."],
  ["kling", "Kling", "Optimize for Kling-style realistic motion: detailed body movement, consistent face identity, and stable camera choreography."],
  ["runway", "Runway", "Optimize for Runway-style video generation: concise visual direction, strong composition, and controlled camera movement."],
  ["pika", "Pika", "Optimize for Pika-style short video generation: compact instructions, readable action, and clear subject behavior."],
  ["generic", "Generico", "Optimize for a general AI video model: unambiguous visual direction, natural movement, and no scene changes."]
];

const formats = [
  ["ugc", "UGC 1 persona", "A single person looks directly at the camera with authentic UGC energy, natural micro-movements, realistic arm gestures, and a friendly influencer tone."],
  ["podcast", "Podcast", "A single podcast speaker talks naturally, with realistic micro-movements and subtle arm gestures, as if speaking to another person just off camera. Single speaker: only the person from the reference image talks."],
  ["dualcast", "Dualcast", "Two people are in the same frame in a natural conversation. One person actively speaks while the other only listens, occasionally nodding slightly and reacting naturally without interrupting."],
  ["product", "Producto en mano", "The person naturally holds and shows the product to the camera while speaking. The product label and packaging remain clearly visible, sharp, readable, and unchanged."],
  ["broll", "B-roll producto", "A clean product beauty shot with no people. The product is in sharp focus on a realistic surface, with its label clearly visible and unchanged."],
  ["skincare", "Skincare", "A skincare application shot with realistic hand motion and visible product absorption while the person speaks naturally to camera."],
  ["image_edit", "Retoque imagen", "Using the reference image, keep the same person, face, identity, pose, lighting, and framing unless specifically changed by the user. Photorealistic, natural skin texture and realistic integration."]
];

const cameras = [
  ["static", "Plano fijo", "Locked-off static shot, camera completely still on a tripod, no movement at all. Single continuous take, no cuts or scene changes."],
  ["slow_zoom", "Zoom lento rostro", "Slow, continuous zoom-in toward the subject's face, starting from the first frame and moving steadily closer, then holding steady on the close-up. Single continuous take, no cuts or scene changes."],
  ["fast_zoom", "Zoom rapido inicio", "Fast zoom-in to the subject's face at the very start, settling into a close-up exactly as they begin to speak, then holding steady. Single continuous take, no cuts or scene changes."],
  ["handheld", "En mano sutil", "Subtle handheld movement, very slight and natural, for a real human feel without distraction. Single continuous take, no cuts or scene changes."],
  ["push_in", "Push-in suave", "Very gentle, almost imperceptible slow push-in on the speaker, from a medium shot to a medium close-up over the whole clip. Single continuous take, no cuts or scene changes."],
  ["pull_back", "Retroceso entorno", "Slow pull-back from a close-up, revealing the surrounding environment as the subject starts talking, then holding on the wider shot. Single continuous take, no cuts or scene changes."],
  ["orbit", "Orbita lenta", "Slow arc shot, the camera orbiting around the subject in a smooth half-circle while the subject stays centered. Single continuous take, no cuts or scene changes."],
  ["tracking", "Seguimiento caminando", "Tracking shot following alongside the subject as they walk and talk, smooth and steady. Single continuous take, no cuts or scene changes."],
  ["hero_low", "Contrapicado heroico", "Low-angle hero shot looking up at the subject, slow push-in for authority and impact, then holding. Single continuous take, no cuts or scene changes."],
  ["bokeh", "Bokeh cinematografico", "Shallow depth of field with a creamy bokeh background, slow push-in on the in-focus subject, then holding. Single continuous take, no cuts or scene changes."]
];

const voices = [
  ["none", "Sin voz", ""],
  ["male_50", "Hombre mayor 50", "Voice: a deep, warm male voice - a man in his early-to-mid 50s, low and resonant with a slight gravelly texture, calm and unhurried, confident and grounded."],
  ["male_30", "Hombre 30s", "Voice: a male voice in his mid-30s, medium pitch, fuller and more settled than a twenty-something, calm and confident, friendly but grounded."],
  ["male_25", "Hombre joven 25", "Voice: a bright, energetic male voice - a guy in his mid-to-late 20s, medium-high pitch, clear and relaxed, friendly and upbeat, casual conversational pace."],
  ["female_50", "Mujer mayor 50", "Voice: a warm, mature female voice - a woman in her early 50s, rich and slightly smoky lower-mid tone, calm and measured pacing, confident and reassuring."],
  ["female_30", "Mujer 30s", "Voice: a female voice in her mid-30s, medium pitch, fuller and more settled than a twenty-something, calm and confident, warm but grounded."],
  ["female_25", "Mujer joven 25", "Voice: a light, lively female voice - a woman in her mid-20s, bright and clear with a higher pitch, warm and friendly, natural conversational pace."],
  ["custom", "Voz personalizada", ""]
];

const accents = [
  ["none", "Sin acento extra", ""],
  ["spain", "Espanol Madrid", "Spanish with a neutral Peninsular Madrid accent, informal and conversational, like a real casual chat in Spain."],
  ["argentina", "Argentina", "Spanish with an Argentine Rioplatense Buenos Aires accent, including the typical sh sound for ll and y."],
  ["colombia", "Colombia Bogota", "Spanish with a clear, neutral Colombian Bogota accent."],
  ["mexico", "Mexico CDMX", "Spanish with a Mexican central Mexico City accent."],
  ["latam", "Latino neutro", "Spanish with a neutral Latin American accent."],
  ["english_us", "Ingles USA", "English with a natural neutral American accent, clear and conversational."]
];

const actions = [
  ["none", "Sin gesto", ""],
  ["cap", "Recoloca gorra", "adjusts their cap"],
  ["coffee", "Sorbo cafe", "takes a sip of coffee and sets the cup down"],
  ["hair", "Toca pelo", "fixes their hair"],
  ["wave", "Saluda", "waves hello"],
  ["laugh", "Rie", "laughs naturally"],
  ["surprise", "Sorpresa", "reacts with a surprised look on their face"],
  ["nod", "Asiente", "nods slowly while smiling"],
  ["point_up", "Senala arriba", "points up"],
  ["point_left", "Senala izquierda", "points to the left"],
  ["point_right", "Senala derecha", "points to the right"],
  ["product_show", "Muestra producto", "holds the product up and shows it clearly to the camera"]
];

const visualStyles = [
  "authentic UGC phone video",
  "polished social ad",
  "cinematic realistic commercial",
  "raw selfie video",
  "documentary realism",
  "clean beauty brand style",
  "podcast clip realism"
];

const environments = [
  "cozy bathroom",
  "modern kitchen",
  "neutral studio",
  "home office",
  "podcast studio",
  "street sidewalk",
  "car interior",
  "beauty counter",
  "minimal bedroom",
  "retail store"
];

const lights = [
  "soft natural window light",
  "clean studio lighting",
  "warm indoor lighting",
  "bright bathroom lighting",
  "golden hour light",
  "soft beauty lighting",
  "neutral podcast lighting"
];

const backgroundMusicOptions = [
  ["none", "Sin música", "No background music."],
  ["subtle_emotional", "Emocional sutil", "Add very subtle warm emotional background music, low volume, never overpowering the voice or scene."],
  ["soft_cinematic", "Cinemática suave", "Add soft cinematic background music with a gentle build, restrained and elegant."],
  ["upbeat_light", "Ligera optimista", "Add light upbeat background music, friendly and modern, low volume."],
  ["ambient", "Ambiental", "Add minimal ambient background music, airy and unobtrusive."]
];

const skincareAreas = [
  "under-eye area",
  "cheeks",
  "forehead",
  "neck",
  "hands",
  "around the mouth",
  "full face"
];

const durations = ["5 seconds", "8 seconds", "10 seconds", "15 seconds", "20 seconds"];
const aspectRatios = ["9:16 vertical", "16:9 horizontal", "1:1 square", "4:5 social"];

const state = {
  idea: "",
  inputKind: "script",
  targetModel: "seedance",
  format: "ugc",
  mode: "image_to_video",
  camera: "slow_zoom",
  action: "none",
  actionTiming: "before",
  voice: "female_25",
  customVoice: "",
  accent: "mexico",
  backgroundMusic: "none",
  duration: "8 seconds",
  aspectRatio: "9:16 vertical",
  visualStyle: visualStyles[0],
  environment: environments[0],
  lighting: lights[0],
  speakerSide: "left",
  productSurface: "marble counter",
  skincareArea: skincareAreas[0],
  includeAntiCut: true,
  preserveIdentity: true,
  preserveProduct: true,
  naturalGestures: true,
  clearLipSync: true,
  negativeGuards: true,
  extraNotes: "",
  detailLevel: "detailed"
};

const assistantState = {
  messages: [
    {
      role: "assistant",
      content: "Hola, soy Lía. Cuéntame qué video quieres producir y lo ordenamos."
    }
  ],
  agreedPrompt: "",
  task: "scene_prompt"
};

const $ = (id) => document.getElementById(id);
const optionPrompt = (items, id) => (items.find((item) => item[0] === id) || [])[2] || "";
const clean = (value) => String(value || "").trim().replace(/\s+/g, " ");
const cleanMultiline = (value) => String(value || "").replace(/\r\n?/g, "\n").trim();
let statusToastTimer = 0;
const studioState = {
  data: { version: 1, projects: [] },
  activeProjectId: "",
  activeVideoId: "",
  activeSceneId: "",
  editingProjectId: "",
  activeView: "scene"
};

function createId(prefix) {
  if (window.crypto?.randomUUID) {
    return `${prefix}_${window.crypto.randomUUID()}`;
  }
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function now() {
  return new Date().toISOString();
}

function currentProject() {
  return studioState.data.projects.find((project) => project.id === studioState.activeProjectId);
}

function currentVideo() {
  return currentProject()?.videos.find((video) => video.id === studioState.activeVideoId);
}

function currentScene() {
  return currentVideo()?.scenes.find((scene) => scene.id === studioState.activeSceneId);
}

function resetAssistantConversation() {
  assistantState.messages = [
    {
      role: "assistant",
      content: "Hola, soy Lía. Cuéntame qué video quieres producir y lo ordenamos."
    }
  ];
  assistantState.task = "scene_prompt";
  setAgreedPrompt("");
  renderAssistantMessages();
}

function getProjectContext() {
  const project = currentProject();
  const video = currentVideo();
  const scene = currentScene();

  if (!project) {
    return {};
  }

  return {
    project: {
      name: project.name,
      description: project.description,
      audience: project.audience,
      offer: project.offer,
      tone: project.tone,
      restrictions: project.restrictions
    },
    video: video
      ? {
          title: video.title,
          objective: video.objective,
          platform: video.platform,
          cta: video.cta,
          plan: video.plan
        }
      : {},
    scene: scene ? { name: scene.name } : {}
  };
}

function hasActiveSceneContext() {
  return Boolean(currentScene());
}

function getAssistantTaskForCurrentContext() {
  if (hasActiveSceneContext()) {
    return assistantState.task;
  }

  return currentVideo() ? "video_plan" : assistantState.task;
}

function buildProjectPromptContext() {
  const context = getProjectContext();
  if (!context.project) {
    return "";
  }

  const parts = [
    `Project: ${context.project.name}.`,
    context.project.description && `Product or service context: ${context.project.description}.`,
    context.project.audience && `Target audience: ${context.project.audience}.`,
    context.project.offer && `Offer: ${context.project.offer}.`,
    context.project.tone && `Brand tone: ${context.project.tone}.`,
    context.project.restrictions && `Mandatory restrictions: ${context.project.restrictions}.`,
    context.video?.objective && `Video objective: ${context.video.objective}.`,
    context.video?.platform && `Target platform: ${context.video.platform}.`,
    context.video?.cta && `Call to action: ${context.video.cta}.`
  ];

  return parts.filter(Boolean).join(" ");
}

async function saveStudio() {
  const response = await fetch("/api/studio", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(studioState.data)
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "No se pudo guardar el estudio.");
  }
  studioState.data = data;
}

async function saveActiveScene({ quiet = false } = {}) {
  const scene = currentScene();
  if (!scene) {
    return false;
  }

  readForm();
  scene.settings = { ...state };
  scene.prompt = $("output").value;
  scene.updatedAt = now();

  try {
    await saveStudio();
    if (!quiet) {
      setStatus("Escena guardada.");
    }
    return true;
  } catch (error) {
    setStatus(error instanceof Error ? error.message : "No se pudo guardar la escena.");
    return false;
  }
}

async function saveActiveSceneSettings({ quiet = false } = {}) {
  const scene = currentScene();
  if (!scene) {
    return false;
  }

  scene.settings = { ...state };
  scene.updatedAt = now();

  try {
    await saveStudio();
    if (!quiet) {
      setStatus("Configuración guardada.");
    }
    return true;
  } catch (error) {
    setStatus(error instanceof Error ? error.message : "No se pudo guardar la configuración.");
    return false;
  }
}

function renderProductionContext() {
  const project = currentProject();
  const video = currentVideo();
  const scene = currentScene();
  fillProductionSelect(
    "projectSelect",
    studioState.data.projects,
    studioState.activeProjectId,
    "Selecciona un proyecto"
  );
  fillProductionSelect(
    "videoSelect",
    project?.videos || [],
    studioState.activeVideoId,
    project ? "Selecciona un video" : "Selecciona primero un proyecto",
    !project
  );
  fillProductionSelect(
    "sceneSelect",
    video?.scenes || [],
    studioState.activeSceneId,
    video ? "Selecciona una escena" : "Selecciona primero un video",
    !video
  );
  $("newVideoBtn").disabled = !project;
  $("newSceneBtn").disabled = !video;
  $("openProjectsBtn").textContent = project ? "Gestionar" : "Crear proyecto";
  renderWorkspaceViews();
}

function makeDetail(label, value) {
  const item = document.createElement("div");
  item.className = "context-detail";
  const title = document.createElement("span");
  title.textContent = label;
  const content = document.createElement("p");
  content.textContent = value || "Sin definir";
  item.append(title, content);
  return item;
}

function renderProjectDetails() {
  const project = currentProject();
  const container = $("projectDetails");
  container.innerHTML = "";
  $("editProjectTabBtn").disabled = !project;

  if (!project) {
    const empty = document.createElement("p");
    empty.className = "view-empty";
    empty.textContent = "Selecciona o crea un proyecto para ver su contexto.";
    container.appendChild(empty);
    return;
  }

  container.append(
    makeDetail("Proyecto", project.name),
    makeDetail("Producto o servicio", project.description),
    makeDetail("Audiencia", project.audience),
    makeDetail("Oferta principal", project.offer),
    makeDetail("Tono de marca", project.tone),
    makeDetail("Reglas y restricciones", project.restrictions)
  );
}

function renderVideoDetails() {
  const video = currentVideo();
  const form = $("videoDetailsForm");
  $("createVideoPlanBtn").disabled = !video;
  $("videoDetailsEmpty").classList.toggle("hidden", Boolean(video));
  form.classList.toggle("hidden", !video);

  if (!video) {
    return;
  }

  $("videoDetailsTitle").value = video.title || "";
  $("videoDetailsObjective").value = video.objective || "";
  $("videoDetailsPlatform").value = video.platform || "";
  $("videoDetailsCta").value = video.cta || "";
  $("videoDetailsPlan").value = video.plan || "";
}

function renderWorkspaceViews() {
  const project = currentProject();
  const video = currentVideo();
  const scene = currentScene();
  const available = {
    project: Boolean(project),
    video: Boolean(video),
    scene: Boolean(scene)
  };

  if (!available[studioState.activeView]) {
    studioState.activeView = available.video ? "video" : "project";
  }

  document.querySelectorAll("[data-workspace-view]").forEach((button) => {
    const view = button.dataset.workspaceView;
    button.disabled = !available[view];
    button.classList.toggle("active", view === studioState.activeView);
    button.setAttribute("aria-selected", String(view === studioState.activeView));
  });
  $("projectView").classList.toggle("active", studioState.activeView === "project");
  $("videoView").classList.toggle("active", studioState.activeView === "video");
  $("sceneView").classList.toggle("active", studioState.activeView === "scene");
  renderProjectDetails();
  renderVideoDetails();
}

function switchWorkspaceView(view) {
  if (!currentProject() && view === "project") {
    return;
  }
  if (!currentVideo() && view === "video") {
    return;
  }
  if (!currentScene() && view === "scene") {
    return;
  }
  studioState.activeView = view;
  renderWorkspaceViews();
}

function fillProductionSelect(id, items, selectedId, placeholder, disabled = false) {
  const select = $(id);
  select.innerHTML = "";
  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.textContent = placeholder;
  select.appendChild(placeholderOption);

  items.forEach((item, index) => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent =
      id === "sceneSelect" ? `${String(index + 1).padStart(2, "0")} ${item.name}` : item.name || item.title;
    select.appendChild(option);
  });

  select.disabled = disabled;
  select.value = selectedId || "";
}

function loadActiveScene() {
  const scene = currentScene();
  if (!scene) {
    return;
  }

  Object.assign(state, scene.settings || {});
  writeForm();
  $("output").value = scene.prompt || "";
  resetAssistantConversation();
}

async function activateScene(sceneId) {
  if (sceneId === studioState.activeSceneId) {
    return;
  }
  await saveActiveScene({ quiet: true });
  studioState.activeSceneId = sceneId;
  studioState.activeView = "scene";
  loadActiveScene();
  renderProductionContext();
  setStatus("Escena cargada.");
}

async function createScene(button) {
  const videoId = studioState.activeVideoId;
  if (!currentVideo()) {
    setStatus("Primero crea un proyecto y un video.");
    return;
  }

  const originalText = button?.textContent || "";
  if (button) {
    button.disabled = true;
    button.textContent = "Creando";
  }

  try {
    await saveActiveScene({ quiet: true });
    const video = currentProject()?.videos.find((item) => item.id === videoId);
    if (!video) {
      throw new Error("No se encontro el video activo.");
    }

    const nextNumber = video.scenes.length + 1;
    const settings = { ...state, idea: "", extraNotes: "" };
    const scene = {
      id: createId("scene"),
      name: `Escena ${nextNumber}`,
      settings,
      prompt: "",
      updatedAt: now()
    };
    video.scenes.push(scene);
    video.updatedAt = now();
    studioState.activeSceneId = scene.id;
    studioState.activeView = "scene";
    await saveStudio();
    loadActiveScene();
    renderProductionContext();
    setStatus("Escena creada.");
  } catch (error) {
    setStatus(error instanceof Error ? error.message : "No se pudo crear la escena.");
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = originalText;
    }
  }
}

function renderProjects() {
  const list = $("projectsList");
  const selectedId = studioState.editingProjectId || studioState.activeProjectId;
  list.innerHTML = "";

  if (!studioState.data.projects.length) {
    const empty = document.createElement("p");
    empty.className = "project-list-empty";
    empty.textContent = "Crea tu primer proyecto para conservar su contexto.";
    list.appendChild(empty);
    return;
  }

  studioState.data.projects.forEach((project) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "project-list-item";
    button.classList.toggle("active", project.id === selectedId);
    button.dataset.projectId = project.id;
    button.textContent = project.name;
    list.appendChild(button);
  });
}

function fillProjectEditor() {
  const project = studioState.data.projects.find(
    (item) => item.id === studioState.editingProjectId
  );
  const hasProject = Boolean(project);

  $("projectEditorTitle").textContent = hasProject ? "Editar proyecto" : "Nuevo proyecto";
  $("projectName").value = project?.name || "";
  $("projectDescription").value = project?.description || "";
  $("projectAudience").value = project?.audience || "";
  $("projectOffer").value = project?.offer || "";
  $("projectTone").value = project?.tone || "";
  $("projectRestrictions").value = project?.restrictions || "";
}

function openProjects() {
  studioState.editingProjectId = studioState.activeProjectId;
  renderProjects();
  fillProjectEditor();
  $("projectsDialog").showModal();
}

async function selectProject(projectId) {
  await saveActiveScene({ quiet: true });
  const project = studioState.data.projects.find((item) => item.id === projectId);
  if (!project) {
    return;
  }

  studioState.activeProjectId = project.id;
  studioState.editingProjectId = project.id;
  studioState.activeVideoId = project.videos[0]?.id || "";
  studioState.activeSceneId = project.videos[0]?.scenes[0]?.id || "";
  loadActiveScene();
  renderProjects();
  fillProjectEditor();
  renderProductionContext();
}

async function saveProject(event) {
  event.preventDefault();
  const button = event.submitter;
  const originalText = button?.textContent || "";
  const name = clean($("projectName").value);
  if (!name) {
    setStatus("Escribe el nombre del proyecto.");
    return;
  }

  if (button) {
    button.disabled = true;
    button.textContent = "Guardando";
  }

  try {
    let project = studioState.data.projects.find(
      (item) => item.id === studioState.editingProjectId
    );
    if (!project) {
      project = { id: createId("project"), videos: [] };
      studioState.data.projects.push(project);
      studioState.activeProjectId = project.id;
      studioState.editingProjectId = project.id;
      studioState.activeVideoId = "";
      studioState.activeSceneId = "";
    }

    Object.assign(project, {
      name,
      description: cleanMultiline($("projectDescription").value),
      audience: clean($("projectAudience").value),
      offer: clean($("projectOffer").value),
      tone: clean($("projectTone").value),
      restrictions: cleanMultiline($("projectRestrictions").value),
      updatedAt: now()
    });
    await saveStudio();
    renderProjects();
    fillProjectEditor();
    renderProductionContext();
    setStatus("Proyecto guardado.");
  } catch (error) {
    setStatus(error instanceof Error ? error.message : "No se pudo guardar el proyecto.");
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = originalText;
    }
  }
}

async function createVideo(event) {
  event.preventDefault();
  const button = event.submitter;
  const originalText = button?.textContent || "";
  const project = currentProject();
  const title = clean($("videoTitle").value);
  if (!project || !title) {
    setStatus("Selecciona un proyecto y escribe el nombre del video.");
    return;
  }

  if (button) {
    button.disabled = true;
    button.textContent = "Guardando";
  }

  try {
    const video = {
      id: createId("video"),
      title,
      objective: clean($("videoObjective").value),
      platform: clean($("videoPlatform").value),
      cta: clean($("videoCta").value),
      plan: "",
      scenes: [],
      updatedAt: now()
    };
    project.videos.push(video);
    project.updatedAt = now();
    studioState.activeVideoId = video.id;
    studioState.activeSceneId = "";
    studioState.activeView = "video";
    $("videoForm").reset();
    await saveStudio();
    renderProductionContext();
    $("videoDialog").close();
    setStatus("Video creado.");
  } catch (error) {
    setStatus(error instanceof Error ? error.message : "No se pudo crear el video.");
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = originalText;
    }
  }
}

async function saveVideoDetails(event) {
  event.preventDefault();
  const button = event.submitter;
  const originalText = button?.textContent || "";
  const video = currentVideo();
  const title = clean($("videoDetailsTitle").value);
  if (!video || !title) {
    setStatus("Escribe el nombre del video.");
    return;
  }

  if (button) {
    button.disabled = true;
    button.textContent = "Guardando";
  }

  try {
    Object.assign(video, {
      title,
      objective: clean($("videoDetailsObjective").value),
      platform: clean($("videoDetailsPlatform").value),
      cta: clean($("videoDetailsCta").value),
      plan: String($("videoDetailsPlan").value || "").trim(),
      updatedAt: now()
    });
    await saveStudio();
    renderProductionContext();
    setStatus("Video guardado.");
  } catch (error) {
    setStatus(error instanceof Error ? error.message : "No se pudo guardar el video.");
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = originalText;
    }
  }
}

function openVideoDialog() {
  const project = currentProject();
  if (!project) {
    setStatus("Selecciona un proyecto antes de crear un video.");
    return;
  }

  $("videoForm").reset();
  $("videoDialogProject").textContent = project.name;
  $("videoDialog").showModal();
  $("videoTitle").focus();
}

async function activateVideo(videoId) {
  await saveActiveScene({ quiet: true });
  const video = currentProject()?.videos.find((item) => item.id === videoId);
  if (!video) {
    return;
  }
  studioState.activeVideoId = video.id;
  studioState.activeSceneId = video.scenes[0]?.id || "";
  studioState.activeView = studioState.activeSceneId ? "scene" : "video";
  loadActiveScene();
  renderProductionContext();
  $("projectsDialog").close();
  setStatus("Video cargado.");
}

async function loadStudio() {
  try {
    const response = await fetch("/api/studio");
    if (!response.ok) {
      throw new Error("No se pudo cargar el estudio local.");
    }
    studioState.data = await response.json();
    const project = studioState.data.projects[0];
    studioState.activeProjectId = project?.id || "";
    studioState.activeVideoId = project?.videos[0]?.id || "";
    studioState.activeSceneId = project?.videos[0]?.scenes[0]?.id || "";
    loadActiveScene();
  } catch (error) {
    setStatus(error instanceof Error ? error.message : "No se pudo cargar el estudio.");
  }
  renderProductionContext();
}

function fillSelect(id, items, selected) {
  const select = $(id);
  select.innerHTML = "";
  for (const item of items) {
    const option = document.createElement("option");
    option.value = Array.isArray(item) ? item[0] : item;
    option.textContent = Array.isArray(item) ? item[1] : item;
    select.appendChild(option);
  }
  select.value = selected;
}

function optionValue(item) {
  return Array.isArray(item) ? item[0] : item;
}

function optionLabel(item) {
  return Array.isArray(item) ? item[1] : item;
}

function optionList(items) {
  return items.map((item) => ({
    value: optionValue(item),
    label: optionLabel(item)
  }));
}

function validOption(value, items, fallback) {
  const normalized = String(value || "");
  return items.some((item) => String(optionValue(item)) === normalized)
    ? normalized
    : fallback;
}

function validValue(value, items, fallback) {
  const normalized = String(value || "");
  return items.includes(normalized) ? normalized : fallback;
}

function sceneSettingsOptions() {
  return {
    inputKind: [
      { value: "idea", label: "Idea libre" },
      { value: "script", label: "Guion exacto" }
    ],
    targetModel: optionList(targetModels),
    format: optionList(formats),
    mode: [
      { value: "image_to_video", label: "Imagen a video" },
      { value: "text_to_video", label: "Texto a video" },
      { value: "image_edit", label: "Retoque imagen" }
    ],
    camera: optionList(cameras),
    action: optionList(actions),
    actionTiming: [
      { value: "before", label: "Antes de hablar" },
      { value: "during", label: "Mientras habla" },
      { value: "after", label: "Despues de hablar" }
    ],
    voice: optionList(voices),
    accent: optionList(accents),
    backgroundMusic: optionList(backgroundMusicOptions),
    duration: durations,
    aspectRatio: aspectRatios,
    visualStyle: visualStyles,
    environment: environments,
    lighting: lights,
    speakerSide: [
      { value: "left", label: "Izquierda" },
      { value: "right", label: "Derecha" }
    ],
    skincareArea: skincareAreas,
    detailLevel: [
      { value: "detailed", label: "Detallado" },
      { value: "compact", label: "Compacto" }
    ]
  };
}

function applySuggestedSettings(settings) {
  const suggestion = settings && typeof settings === "object" ? settings : {};

  state.inputKind = ["idea", "script"].includes(suggestion.inputKind)
    ? suggestion.inputKind
    : state.inputKind;
  state.targetModel = validOption(suggestion.targetModel, targetModels, state.targetModel);
  state.format = validOption(suggestion.format, formats, state.format);
  state.mode = validValue(
    suggestion.mode,
    ["image_to_video", "text_to_video", "image_edit"],
    state.mode
  );
  state.camera = validOption(suggestion.camera, cameras, state.camera);
  state.action = validOption(suggestion.action, actions, state.action);
  state.actionTiming = validValue(
    suggestion.actionTiming,
    ["before", "during", "after"],
    state.actionTiming
  );
  state.voice = validOption(suggestion.voice, voices, state.voice);
  state.accent = validOption(suggestion.accent, accents, state.accent);
  state.backgroundMusic = validOption(
    suggestion.backgroundMusic,
    backgroundMusicOptions,
    state.backgroundMusic
  );
  state.duration = validValue(suggestion.duration, durations, state.duration);
  state.aspectRatio = validValue(suggestion.aspectRatio, aspectRatios, state.aspectRatio);
  state.visualStyle = validValue(suggestion.visualStyle, visualStyles, state.visualStyle);
  state.environment = validValue(suggestion.environment, environments, state.environment);
  state.lighting = validValue(suggestion.lighting, lights, state.lighting);
  state.speakerSide = validValue(suggestion.speakerSide, ["left", "right"], state.speakerSide);
  state.productSurface = clean(suggestion.productSurface || state.productSurface);
  state.skincareArea = validValue(suggestion.skincareArea, skincareAreas, state.skincareArea);
  state.detailLevel = validValue(
    suggestion.detailLevel,
    ["detailed", "compact"],
    state.detailLevel
  );

  for (const key of [
    "includeAntiCut",
    "preserveIdentity",
    "preserveProduct",
    "naturalGestures",
    "clearLipSync",
    "negativeGuards"
  ]) {
    if (typeof suggestion[key] === "boolean") {
      state[key] = suggestion[key];
    }
  }

  if (state.voice === "none") {
    state.accent = "none";
    state.clearLipSync = false;
  }

  if (state.format === "broll") {
    state.voice = "none";
    state.clearLipSync = false;
  }

  if (suggestion.extraNotes) {
    state.extraNotes = cleanMultiline(suggestion.extraNotes);
  }

  writeForm();
  syncConditionalFields();
}

function buildLocalPrompt() {
  const idea = clean(state.idea);
  const lines = [];
  const format = optionPrompt(formats, state.format);
  const camera = optionPrompt(cameras, state.camera);
  const model = optionPrompt(targetModels, state.targetModel);
  const selectedAction = optionPrompt(actions, state.action);
  const voice = state.voice === "custom" ? clean(state.customVoice) : optionPrompt(voices, state.voice);
  const accent = optionPrompt(accents, state.accent);
  const backgroundMusic = optionPrompt(backgroundMusicOptions, state.backgroundMusic);
  const projectContext = buildProjectPromptContext();

  lines.push(`AI video prompt for ${state.targetModel.toUpperCase()} (${state.duration}, ${state.aspectRatio}).`);
  if (projectContext) {
    lines.push(projectContext);
  }
  lines.push(model);
  lines.push(`${format} Visual style: ${state.visualStyle}. Environment: ${state.environment}. Lighting: ${state.lighting}.`);

  if (state.mode === "image_to_video") {
    lines.push("Use the reference image as the visual source. Keep the subject's face, identity, wardrobe, pose, and overall framing consistent unless the scene instructions explicitly require a change.");
  }

  if (state.mode === "image_edit") {
    lines.push("Image edit prompt: use the reference image as the base and apply only the requested visual changes while preserving realistic integration.");
  }

  lines.push(camera);

  if (state.format === "dualcast") {
    const active = state.speakerSide === "left" ? "LEFT" : "RIGHT";
    const listener = state.speakerSide === "left" ? "RIGHT" : "LEFT";
    lines.push(`The person on the ${active} is actively speaking in a natural conversation. The person on the ${listener} is only listening, occasionally nodding slightly, reacting naturally and looking at the speaker, with no interruption.`);
  }

  if (state.format === "broll") {
    lines.push(`A clean beauty shot of the product on a ${state.productSurface}, slow gentle camera move, soft realistic lighting, the product in sharp focus with its label clearly visible and unchanged. No people.`);
  } else if (state.inputKind === "script" && state.voice !== "none") {
    if (selectedAction && state.actionTiming === "before") {
      lines.push(`The person ${selectedAction}, then looks at the camera and says exactly: "${idea}"`);
    } else if (selectedAction && state.actionTiming === "during") {
      lines.push(`The person looks at the camera and says exactly: "${idea}" while they ${selectedAction}.`);
    } else if (selectedAction && state.actionTiming === "after") {
      lines.push(`The person looks at the camera and says exactly: "${idea}", then ${selectedAction}.`);
    } else {
      lines.push(`The person looks at the camera and says exactly: "${idea}"`);
    }
  } else {
    lines.push(`Scene brief: "${idea}". Keep the action natural, believable, and visually clear.`);
    if (selectedAction) {
      lines.push(`Include this natural micro-action: the person ${selectedAction}.`);
    }
  }

  if (state.format === "skincare") {
    lines.push(`While speaking, they gradually blend the visible cream into the ${state.skincareArea} until it is smoothly absorbed into the skin. The amount of visible cream continuously decreases throughout the clip, leaving no residue, streaks, or buildup.`);
  }

  if (state.format === "product" || state.preserveProduct) {
    lines.push("Keep the product label, logo, packaging shape, colors, and text clearly visible and unchanged. Hands and contact with the product must look anatomically realistic.");
  }

  if (state.preserveIdentity) {
    lines.push("Preserve the same face and identity across the entire clip, with stable facial features and natural skin texture.");
  }

  if (state.naturalGestures) {
    lines.push("Use realistic arm movements, subtle facial micro-expressions, natural blinking, and restrained gestures.");
  }

  if (state.clearLipSync && state.voice !== "none" && state.format !== "broll") {
    lines.push("Clear lip sync: the mouth movement matches the spoken words naturally, without exaggerated jaw motion.");
  }

  if (voice && state.format !== "broll" && state.mode !== "image_edit") {
    lines.push(voice);
  }

  if (state.voice === "none" && state.format !== "broll" && state.mode !== "image_edit") {
    lines.push("No voiceover, no spoken dialogue, and no visible lip movement.");
  }

  if (accent && state.voice !== "none" && state.format !== "broll" && state.mode !== "image_edit") {
    lines.push(accent);
  }

  if (backgroundMusic && state.mode !== "image_edit") {
    lines.push(backgroundMusic);
  }

  if (state.includeAntiCut) {
    lines.push("Single continuous take, no cuts, no scene changes, no jump cuts - the camera holds steady on the framing after the move.");
  }

  if (state.negativeGuards) {
    lines.push("Avoid distorted hands, extra fingers, warped product labels, unreadable text, identity drift, frozen cream, abrupt camera changes, unnatural smiles, and overacting.");
  }

  if (state.extraNotes.trim()) {
    lines.push(`Additional direction: ${clean(state.extraNotes)}`);
  }

  return state.detailLevel === "compact" ? lines.filter(Boolean).join(" ") : lines.filter(Boolean).join("\n");
}

function exampleByFormat(format) {
  return {
    ugc: "Llevaba semanas probando cremas y esta fue la primera que senti ligera, sin brillo grasoso.",
    podcast: "Lo interesante es que la gente no compra solo el producto, compra la sensacion de que por fin encontro algo que le funciona.",
    dualcast: "Exacto, y por eso el primer segundo del video tiene que sentirse real, no como un anuncio.",
    product: "Mira la textura, se absorbe rapidisimo y el envase cabe perfecto en mi bolsa.",
    broll: "Producto de skincare premium sobre una superficie limpia, con gotas de agua y luz suave.",
    skincare: "Me lo pongo justo aqui debajo de los ojos y en segundos se siente mucho mas fresco.",
    image_edit: "Convertir la foto en un close-up de la misma persona, en un bano moderno, con piel natural y luz suave."
  }[format] || "";
}

function setStatus(text) {
  $("status").textContent = text;
  const toast = $("statusToast");
  if (!toast) {
    return;
  }

  window.clearTimeout(statusToastTimer);
  toast.textContent = text;
  toast.classList.add("visible");
  statusToastTimer = window.setTimeout(() => {
    toast.classList.remove("visible");
  }, 2600);
}

function syncConditionalFields() {
  $("customVoiceWrap").classList.toggle("hidden", state.voice !== "custom");
  $("accentWrap").classList.toggle("hidden", state.voice === "none");
  $("speakerSideWrap").classList.toggle("hidden", state.format !== "dualcast");
  $("productSurfaceWrap").classList.toggle("hidden", !["broll", "product"].includes(state.format));
  $("skincareAreaWrap").classList.toggle("hidden", state.format !== "skincare");
}

function readForm() {
  for (const key of [
    "idea",
    "targetModel",
    "format",
    "mode",
    "camera",
    "action",
    "actionTiming",
    "voice",
    "customVoice",
    "accent",
    "backgroundMusic",
    "duration",
    "aspectRatio",
    "visualStyle",
    "environment",
    "lighting",
    "speakerSide",
    "productSurface",
    "skincareArea",
    "extraNotes"
  ]) {
    state[key] = $(key).value;
  }

  for (const key of [
    "includeAntiCut",
    "preserveIdentity",
    "preserveProduct",
    "naturalGestures",
    "clearLipSync",
    "negativeGuards"
  ]) {
    state[key] = $(key).checked;
  }
}

function writeForm() {
  for (const key of [
    "idea",
    "targetModel",
    "format",
    "mode",
    "camera",
    "action",
    "actionTiming",
    "voice",
    "customVoice",
    "accent",
    "backgroundMusic",
    "duration",
    "aspectRatio",
    "visualStyle",
    "environment",
    "lighting",
    "speakerSide",
    "productSurface",
    "skincareArea",
    "extraNotes"
  ]) {
    $(key).value = state[key];
  }

  for (const key of [
    "includeAntiCut",
    "preserveIdentity",
    "preserveProduct",
    "naturalGestures",
    "clearLipSync",
    "negativeGuards"
  ]) {
    $(key).checked = state[key];
  }

  document.querySelectorAll("[data-input-kind]").forEach((button) => {
    button.classList.toggle("active", button.dataset.inputKind === state.inputKind);
  });
  document.querySelectorAll("[data-detail-level]").forEach((button) => {
    button.classList.toggle("active", button.dataset.detailLevel === state.detailLevel);
  });
  syncConditionalFields();
}

async function generateLocal() {
  readForm();
  if (!clean(state.idea)) {
    $("output").value = "";
    setStatus("Escribe la idea o guion antes de generar.");
    return;
  }

  $("output").value = buildLocalPrompt();
  syncConditionalFields();
  if (await saveActiveScene({ quiet: true })) {
    setStatus("Prompt generado y guardado en la escena activa.");
  } else {
    setStatus("Prompt generado con plantillas locales.");
  }
}

function formatAssistantContent(value) {
  const text = String(value || "").trim();
  if (!text || text.includes("\n")) {
    return text;
  }

  const sectioned = text.replace(
    /\s+(Primero|Segundo|Tercero|Cuarto|Quinto|Sexto|También|Además|En resumen|Mi recomendación|Siguiente paso)([,.:]?)/g,
    "\n\n$1$2"
  );
  if (sectioned !== text) {
    return sectioned;
  }

  const sentences = text.match(/[^.!?]+[.!?]+["”]?|[^.!?]+$/g) || [text];
  const paragraphs = [];
  let current = "";

  for (const sentence of sentences) {
    const next = sentence.trim();
    if (!next) {
      continue;
    }

    if (current && `${current} ${next}`.length > 220) {
      paragraphs.push(current);
      current = next;
    } else {
      current = current ? `${current} ${next}` : next;
    }
  }

  if (current) {
    paragraphs.push(current);
  }

  return paragraphs.join("\n\n");
}

function renderAssistantMessages() {
  const feed = $("assistantMessages");
  feed.innerHTML = "";

  for (const message of assistantState.messages) {
    const bubble = document.createElement("article");
    bubble.className = `assistant-message ${message.role}`;
    bubble.setAttribute(
      "aria-label",
      message.role === "user" ? "Mensaje tuyo" : "Mensaje de Lía"
    );

    const content = document.createElement("p");
    content.textContent =
      message.role === "assistant" ? formatAssistantContent(message.content) : message.content;

    bubble.appendChild(content);
    feed.appendChild(bubble);
  }

  feed.scrollTop = feed.scrollHeight;
}

function setAssistantLoading(isLoading) {
  const button = $("assistantSendBtn");
  const input = $("assistantInput");
  button.disabled = isLoading;
  input.disabled = isLoading;
  button.textContent = isLoading ? "Pensando" : "Enviar a Lía";
}

function setAgreedPrompt(prompt) {
  assistantState.agreedPrompt = String(prompt || "").trim();
  $("applyAssistantPromptBtn").disabled = !assistantState.agreedPrompt;
}

function applyAssistantPrompt() {
  if (!assistantState.agreedPrompt) {
    return;
  }

  $("output").value = assistantState.agreedPrompt;
  setStatus("Prompt acordado con el asistente colocado en la seccion final.");
  void saveActiveScene({ quiet: true });
}

async function applyAssistantVideoPlan(plan) {
  const video = currentVideo();
  if (!video || !plan) {
    return false;
  }

  video.plan = String(plan).trim();
  video.updatedAt = now();
  try {
    await saveStudio();
    renderProductionContext();
    return true;
  } catch (error) {
    setStatus(error instanceof Error ? error.message : "No se pudo guardar el plan maestro.");
    return false;
  }
}

async function configureSceneWithAi({ quiet = false } = {}) {
  readForm();
  if (!clean(state.idea)) {
    $("output").value = "";
    setStatus("Escribe la idea o guion antes de configurar.");
    return false;
  }

  const button = $("autoSettingsBtn");
  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = "Configurando";
  if (!quiet) {
    setStatus("ChatGPT esta seleccionando los parámetros...");
  }

  try {
    const response = await fetch("/api/suggest-settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idea: state.idea,
        currentSettings: state,
        projectContext: getProjectContext(),
        options: sceneSettingsOptions(),
        model: $("chatModel").value
      })
    });
    const data = await response.json();

    if (!response.ok || !data.settings) {
      setStatus(data.error || "No se pudo configurar la escena.");
      return false;
    }

    applySuggestedSettings(data.settings);
    await saveActiveSceneSettings({ quiet: true });
    if (!quiet) {
      setStatus("Configuración IA aplicada.");
    }
    return true;
  } catch {
    setStatus("No se pudo conectar con ChatGPT para configurar.");
    return false;
  } finally {
    button.disabled = false;
    button.textContent = originalText;
  }
}

function beginVideoPlanWithAssistant() {
  const video = currentVideo();
  if (!video) {
    setStatus("Selecciona un video antes de crear su plan maestro.");
    return;
  }

  assistantState.task = "video_plan";
  $("assistantInput").value = `Quiero crear el plan maestro del video "${video.title}". Usa el contexto del proyecto y del video. Hazme solo las preguntas imprescindibles antes de preparar el plan completo.`;
  void sendAssistantMessage({ preventDefault() {} });
}

async function sendAssistantMessage(event) {
  event.preventDefault();
  const hasSceneContext = hasActiveSceneContext();

  if (hasSceneContext) {
    readForm();
  }

  const input = $("assistantInput");
  const text = clean(input.value);

  if (!text) {
    setStatus("Escribe un mensaje para el asistente.");
    return;
  }

  assistantState.messages.push({ role: "user", content: text });
  input.value = "";
  renderAssistantMessages();
  setAssistantLoading(true);
  setStatus("El asistente esta analizando la estrategia del video...");

  try {
    const payload = {
      messages: assistantState.messages.slice(-12),
      projectContext: getProjectContext(),
      assistantTask: getAssistantTaskForCurrentContext(),
      hasSceneContext,
      model: $("chatModel").value
    };

    if (hasSceneContext) {
      payload.settings = state;
      payload.localPrompt = buildLocalPrompt();
      payload.currentPrompt = $("output").value;
    }

    const response = await fetch("/api/assistant-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    let data;
    try {
      data = await response.json();
    } catch {
      data = {
        error:
          "El servidor actual no tiene activo el chat del asistente. Abre la version actualizada o reinicia el servidor."
      };
    }

    if (!response.ok || !data.reply) {
      assistantState.messages.push({
        role: "assistant",
        content: data.error || "No pude responder ahora. Revisa la configuracion de IA."
      });
      renderAssistantMessages();
      setStatus(data.error || "No se pudo usar el asistente.");
      return;
    }

    assistantState.messages.push({ role: "assistant", content: data.reply });

    if (data.finalPrompt && hasSceneContext) {
      setAgreedPrompt(data.finalPrompt);
      applyAssistantPrompt();
      await saveActiveScene({ quiet: true });
    }

    const savedVideoPlan = data.videoPlan
      ? await applyAssistantVideoPlan(data.videoPlan)
      : false;
    if (savedVideoPlan) {
      assistantState.task = "scene_prompt";
    }

    renderAssistantMessages();
    setStatus(
      savedVideoPlan
        ? "Plan maestro acordado y guardado en el video."
        : data.finalPrompt && hasSceneContext
        ? "Prompt final acordado y colocado en la salida."
        : "El asistente respondio. Sigue afinando la idea."
    );
  } catch {
    assistantState.messages.push({
      role: "assistant",
      content: "No pude conectar con la IA. El generador local sigue funcionando."
    });
    renderAssistantMessages();
    setStatus("No se pudo conectar con el asistente.");
  } finally {
    setAssistantLoading(false);
  }
}

async function generateWithAi() {
  readForm();
  if (!clean(state.idea)) {
    $("output").value = "";
    setStatus("Escribe la idea o guion antes de usar ChatGPT.");
    return;
  }

  if (!(await configureSceneWithAi({ quiet: true }))) {
    return;
  }

  const localPrompt = buildLocalPrompt();
  const button = $("aiBtn");
  button.disabled = true;
  button.textContent = "Generando";
  setStatus("ChatGPT esta refinando el prompt...");

  try {
    const response = await fetch("/api/generate-prompt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
      settings: state,
        projectContext: getProjectContext(),
        model: $("chatModel").value,
        localPrompt
      })
    });
    const data = await response.json();

    if (!response.ok || !data.prompt) {
      setStatus(data.error || "No se pudo usar IA. Conserva el modo local.");
      return;
    }

    $("output").value = data.prompt;
    await saveActiveScene({ quiet: true });
    setStatus(`Prompt refinado con ${data.model || $("chatModel").value}.`);
  } catch {
    setStatus("No se pudo conectar con la IA. El modo local sigue disponible.");
  } finally {
    button.disabled = false;
    button.textContent = "ChatGPT";
  }
}

async function init() {
  fillSelect("targetModel", targetModels, state.targetModel);
  fillSelect("format", formats, state.format);
  fillSelect("camera", cameras, state.camera);
  fillSelect("voice", voices, state.voice);
  fillSelect("accent", accents, state.accent);
  fillSelect("backgroundMusic", backgroundMusicOptions, state.backgroundMusic);
  fillSelect("duration", durations, state.duration);
  fillSelect("aspectRatio", aspectRatios, state.aspectRatio);
  fillSelect("visualStyle", visualStyles, state.visualStyle);
  fillSelect("environment", environments, state.environment);
  fillSelect("lighting", lights, state.lighting);
  fillSelect("skincareArea", skincareAreas, state.skincareArea);
  writeForm();
  $("output").value = "";

  document.querySelectorAll("input, select, textarea").forEach((element) => {
    element.addEventListener("change", () => {
      readForm();
      syncConditionalFields();
    });
  });

  document.querySelectorAll("[data-input-kind]").forEach((button) => {
    button.addEventListener("click", () => {
      state.inputKind = button.dataset.inputKind;
      writeForm();
    });
  });

  document.querySelectorAll("[data-detail-level]").forEach((button) => {
    button.addEventListener("click", () => {
      state.detailLevel = button.dataset.detailLevel;
      writeForm();
    });
  });

  $("localBtn").addEventListener("click", generateLocal);
  $("aiBtn").addEventListener("click", generateWithAi);
  $("autoSettingsBtn").addEventListener("click", () => {
    void configureSceneWithAi();
  });
  $("assistantForm").addEventListener("submit", sendAssistantMessage);
  $("assistantInput").addEventListener("keydown", (event) => {
    if (event.key !== "Enter" || event.isComposing) {
      return;
    }

    if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) {
      event.stopPropagation();
      return;
    }

    event.preventDefault();
    $("assistantForm").requestSubmit();
  });
  $("applyAssistantPromptBtn").addEventListener("click", applyAssistantPrompt);
  $("copyBtn").addEventListener("click", async () => {
    await navigator.clipboard.writeText($("output").value);
    setStatus("Prompt copiado al portapapeles.");
  });
  $("exampleBtn").addEventListener("click", () => {
    readForm();
    state.idea = exampleByFormat(state.format);
    writeForm();
    void generateLocal();
  });
  $("resetBtn").addEventListener("click", () => {
    window.location.reload();
  });
  $("openProjectsBtn").addEventListener("click", openProjects);
  $("newProjectQuickBtn").addEventListener("click", () => {
    studioState.editingProjectId = "";
    renderProjects();
    fillProjectEditor();
    $("projectsDialog").showModal();
    $("projectName").focus();
  });
  $("closeProjectsBtn").addEventListener("click", () => {
    $("projectsDialog").close();
  });
  $("newProjectBtn").addEventListener("click", () => {
    studioState.editingProjectId = "";
    fillProjectEditor();
    renderProjects();
    $("projectName").focus();
  });
  $("projectForm").addEventListener("submit", (event) => {
    void saveProject(event);
  });
  $("videoForm").addEventListener("submit", (event) => {
    void createVideo(event);
  });
  $("videoDetailsForm").addEventListener("submit", (event) => {
    void saveVideoDetails(event);
  });
  $("createVideoPlanBtn").addEventListener("click", beginVideoPlanWithAssistant);
  $("editProjectTabBtn").addEventListener("click", openProjects);
  document.querySelectorAll("[data-workspace-view]").forEach((button) => {
    button.addEventListener("click", () => {
      switchWorkspaceView(button.dataset.workspaceView);
    });
  });
  $("projectsList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-project-id]");
    if (button) {
      void selectProject(button.dataset.projectId);
    }
  });
  $("projectSelect").addEventListener("change", (event) => {
    if (event.target.value) {
      void selectProject(event.target.value);
    }
  });
  $("videoSelect").addEventListener("change", (event) => {
    if (event.target.value) {
      void activateVideo(event.target.value);
    }
  });
  $("sceneSelect").addEventListener("change", (event) => {
    if (event.target.value) {
      void activateScene(event.target.value);
    }
  });
  $("newSceneBtn").addEventListener("click", (event) => {
    void createScene(event.currentTarget);
  });
  $("newVideoBtn").addEventListener("click", () => {
    openVideoDialog();
  });
  $("closeVideoBtn").addEventListener("click", () => {
    $("videoDialog").close();
  });
  await loadStudio();
}

void init();
renderAssistantMessages();
