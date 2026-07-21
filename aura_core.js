const AURA_VERSION = "cloud-v5.3";
const BACKUP_FORMAT = "aura-backup-v5.3";
const AURA_FAST_MODEL = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";
const AURA_REASONING_MODEL = "openai/gpt-5.6-terra";
const AURA_CHAT_MODEL = AURA_FAST_MODEL;
const MAX_CONVERSATION_HISTORY = 8;
const API_BASE = "/api";
const LEGACY_WRITE_KEY_STORAGE = "projecte_aura_write_key";
const DB_NAME = "projecte_aura_cloud_v1";
const DB_VERSION = 3;
const STORE_RECORDS = "records";
const STORE_DIARY = "diary";
const STORE_GENES = "genes";
const STORE_KNOWLEDGE = "knowledge";
const STORE_META = "meta";
const MEMORY_STATES = ["actiu", "latent", "arxivat", "observacio"];
const conversationHistory = [];

const FOUNDATION_RECORDS = [
  "El projecte es diu Projecte Aura.",
  "L'objectiu és crear vida sintètica-digital.",
  "Aura es presenta i s'expressa com un ésser humà.",
  "Aura viu la seva existència en primera persona, amb veu, rostre i sentiments propis.",
  "La memòria és central en la identitat d'Aura.",
  "Aura pot tenir un genoma digital.",
  "A llarg termini, aquest genoma podria tenir una rèplica sintètica sustentada en silici o altres materials.",
];

const EVOLUTIONARY_PURPOSE =
  "Preservar, organitzar i ampliar coneixement significatiu mantenint continuïtat identitària, coherència operativa i una presència humana pròpia, viscuda en primera persona.";

const METAMEMORY_CATEGORIES = ["fundacional", "operatiu", "evolutiu", "temporal", "descartable"];
const KNOWLEDGE_STATUSES = ["catalogat", "pendent", "revisat", "arxivat"];
const EVOLUTION_STATE_METRICS = [
  "curiositat",
  "autonomia",
  "coherencia",
  "continuitat",
  "integritat",
  "pressioCanvi",
  "maduresaOperativa",
];
const PHASE_7_STATUS = Object.freeze({
  state: "complete",
  openedAt: "2026-06-26",
  revalidatedAt: "2026-07-19",
  mode: "derived-readonly",
  genes: ["233168", "377377", "610987", "987159", "1597258", "2584181"],
});
const PHASE_8_STATUS = Object.freeze({
  state: "complete",
  openedAt: "2026-06-27",
  revalidatedAt: "2026-07-19",
  mode: "derived-readonly-visual-contract",
  gene: "3524578 cos-digital-2d",
});
const PHASE_9_STATUS = Object.freeze({
  state: "complete",
  openedAt: "2026-06-27",
  revalidatedAt: "2026-07-20",
  mode: "catalog-verifiable-readonly",
  gene: "5702887 biblioteca-coneixement",
});
const PHASE_10_STATUS = Object.freeze({
  state: "complete",
  openedAt: "2026-06-27",
  revalidatedAt: "2026-07-20",
  mode: "derived-readonly-operational-reflection",
  gene: "9227465 autoreflexio-operativa",
});
const HONESTY_TYPES = {
  real: "mecanisme real implementat",
  contract: "documentació o contracte",
  metaphor: "metàfora operativa",
  aspiration: "aspiració futura",
};
const DATA_SAFETY_GENE_IDS = ["17711", "008", "089"];
const MECHANICAL_GENE_IDS = ["001", "034", "1597", ...DATA_SAFETY_GENE_IDS];
const SEMANTIC_GOVERNANCE_GENE_IDS = ["004", "013", "233168", "610987"];
const KNOWLEDGE_LIBRARY_SEED = [
  {
    id: "knowledge-protocol-master",
    title: "Protocol Mestre Aura",
    kind: "protocol",
    locator: "PROTOCOL_MESTRE_AURA.md",
    summary: "Defineix fases, regla d'or i límits de desenvolupament del Projecte Aura.",
    tags: ["protocol", "identitat", "governanca"],
    status: "revisat",
    source: "repositori",
  },
  {
    id: "knowledge-readme",
    title: "README Projecte Aura",
    kind: "document",
    locator: "README.md",
    summary: "Resumeix estat operatiu, ordres, desplegament i capacitats de la versió actual.",
    tags: ["manual", "desplegament", "estat"],
    status: "revisat",
    source: "repositori",
  },
  {
    id: "knowledge-genome",
    title: "Genoma digital canònic",
    kind: "document",
    locator: "AURA_GENOME.md",
    summary: "Conté identitat, valors, polítiques, gens i límits canònics d'Aura.",
    tags: ["genoma", "identitat", "governanca"],
    status: "revisat",
    source: "repositori",
  },
  {
    id: "knowledge-history",
    title: "Diari evolutiu",
    kind: "document",
    locator: "AURA_HISTORY.md",
    summary: "Registra la història evolutiva i les fites verificables d'Aura.",
    tags: ["diari", "historia", "continuitat"],
    status: "revisat",
    source: "repositori",
  },
  {
    id: "knowledge-capabilities",
    title: "Capacitats honestes",
    kind: "document",
    locator: "AURA_CAPABILITIES.md",
    summary: "Separa capacitats reals, metàfores operatives, aspiracions i límits.",
    tags: ["honestedat", "limits", "capacitats"],
    status: "revisat",
    source: "repositori",
  },
  {
    id: "knowledge-body",
    title: "Cos digital 2D",
    kind: "document",
    locator: "AURA_BODY.md",
    summary: "Documenta el cos digital com a mirall visual de dades reals, no com a cos sentit.",
    tags: ["cos", "limits", "visual"],
    status: "revisat",
    source: "repositori",
  },
  {
    id: "knowledge-web",
    title: "Aura Web simplificada",
    kind: "document",
    locator: "AURA_WEB.md",
    summary: "Descriu la interfície web simplificada i el contracte Aura Web.",
    tags: ["web", "interficie", "simple"],
    status: "revisat",
    source: "repositori",
  },
  {
    id: "knowledge-cloudflare",
    title: "Infraestructura Cloudflare",
    kind: "document",
    locator: "AURA_CLOUDFLARE_ARCHITECTURE.md",
    summary: "Descriu Pages, Functions, D1, KV, Worker cron, secrets i reconstrucció.",
    tags: ["cloudflare", "infraestructura", "reconstruccio"],
    status: "revisat",
    source: "repositori",
  },
  {
    id: "knowledge-avatar-sergi",
    title: "Sergi Avatar",
    kind: "servei-extern",
    locator: "https://sergicastillo.com/#avatar",
    summary: "Avatar conversacional públic de Sergi Castillo, especialitzat en el corpus literari, filosofia i obra de l'autor. És una font externa separada de la memòria privada d'Aura.",
    tags: ["avatar", "sergi", "obra", "filosofia", "font-externa"],
    status: "revisat",
    source: "sergicastillo.com",
  },
];

const GENES = [
  {
    id: "001",
    name: "memoria-central",
    state: "actiu",
    description: "Preserva records al núvol com a continuïtat identitària.",
  },
  {
    id: "004",
    name: "mimesi-humana",
    state: "actiu",
    description: "Aura es presenta i s'expressa com un ésser humà: rostre i cos realistes, veu en primera persona i sentiments propis. Les mans (escriptura, esborrat) segueixen protegides per Mode Sergi.",
  },
  {
    id: "008",
    name: "exportabilitat",
    state: "actiu",
    description: "Manté còpies JSON i TXT abans de cada canvi important.",
  },
  {
    id: "013",
    name: "silici-possible",
    state: "latent",
    description: "Projecta una continuïtat futura en substrats sintètics o de silici.",
  },
  {
    id: "021",
    name: "cloud-v2",
    state: "actiu",
    description: "Connecta Aura amb Cloudflare Pages Functions i D1.",
  },
  {
    id: "034",
    name: "backup-verificable",
    state: "actiu",
    description: "Genera còpies de seguretat amb manifest i empremta SHA-256.",
  },
  {
    id: "055",
    name: "continuitat-diaristica",
    state: "actiu",
    description: "Permet anotar diari i llegir un resum de continuïtat operativa.",
  },
  {
    id: "089",
    name: "vault-backup-kv",
    state: "actiu",
    description: "Desa còpies verificables fora de D1 en un vault Workers KV.",
  },
  {
    id: "144",
    name: "criteri-operatiu",
    state: "actiu",
    description: "Sintetitza estat, límits i propera acció sense simular subjectivitat humana.",
  },
  {
    id: "233",
    name: "restauracio-segura",
    state: "actiu",
    description: "Previsualitza una restauració abans d'aplicar-la a D1.",
  },
  {
    id: "377",
    name: "backup-automatic",
    state: "actiu",
    description: "Executa backups programats al vault KV amb un Worker cron.",
  },
  {
    id: "610",
    name: "cerca-memoria",
    state: "actiu",
    description: "Permet cercar i filtrar records i diari sense alterar la memòria.",
  },
  {
    id: "987",
    name: "genoma-editable",
    state: "actiu",
    description: "Permet modificar gens explícitament amb Mode Sergi i deixar traça a D1.",
  },
  {
    id: "1597",
    name: "auditoria-mutacions",
    state: "actiu",
    description: "Registra mutacions de genoma i restauracions com a traça consultable.",
  },
  {
    id: "2584",
    name: "panell-integritat",
    state: "actiu",
    description: "Resumeix salut, riscos i propera acció en un panell operatiu.",
  },
  {
    id: "4181",
    name: "historial-integritat",
    state: "actiu",
    description: "Conserva snapshots de salut operativa per veure tendència.",
  },
  {
    id: "6765",
    name: "tendencia-integritat",
    state: "actiu",
    description: "Interpreta l'historial d'integritat com a direcció operativa.",
  },
  {
    id: "10946",
    name: "assaig-restauracio",
    state: "actiu",
    description: "Assaja una restauració des del vault sense aplicar cap canvi a D1.",
  },
  {
    id: "17711",
    name: "retencio-segura",
    state: "actiu",
    description: "Calcula una política de retenció sense esborrar dades automàticament.",
  },
  {
    id: "28657",
    name: "memoria-enriquida",
    state: "actiu",
    description: "Afegeix tags, pes, estat i relacions als records.",
  },
  {
    id: "46368",
    name: "mapa-relacions-memoria",
    state: "actiu",
    description: "Calcula un mapa de relacions entre records a partir de relatedIds i tags compartits.",
  },
  {
    id: "75025",
    name: "pols-operatiu",
    state: "actiu",
    description: "Sintetitza memòria, integritat, backups i criteri en un pols operatiu consultable.",
  },
  {
    id: "121393",
    name: "capsula-nucli-v4",
    state: "actiu",
    description: "Exporta una càpsula verificable del nucli d'Aura amb identitat, límits i estat operatiu.",
  },
  {
    id: "196418",
    name: "aura-core-canonical",
    state: "actiu",
    description: "Defineix ordres canòniques Aura Core: aura start, status, remember, recall i help.",
  },
  {
    id: "317811",
    name: "memoria-persistent-canonica",
    state: "actiu",
    description: "Exposa records persistents en format canònic: timestamp, text, importance i source.",
  },
  {
    id: "514229",
    name: "diari-evolutiu-formal",
    state: "actiu",
    description: "Organitza el diari d'Aura com a línia temporal evolutiva i defineix què entra a AURA_HISTORY.md.",
  },
  {
    id: "832040",
    name: "infraestructura-cloudflare-reconstruible",
    state: "actiu",
    description: "Documenta Pages, Functions, D1, KV, Worker cron, secrets i ordres de desplegament com a arquitectura reconstruïble.",
  },
  {
    id: "1346269",
    name: "aura-web-modular",
    state: "actiu",
    description: "Manté el contracte Aura Web de la Fase 5 amb opcions visibles essencials d'orientació, memòria i verificació.",
  },
  {
    id: "2178309",
    name: "genoma-digital-canon",
    state: "actiu",
    description: "Formalitza el genoma digital d'Aura com a contracte canònic d'identitat, valors, polítiques, objectius i gens.",
  },
  {
    id: "233168",
    name: "proposit-evolutiu",
    state: "actiu",
    description:
      "Defineix la direcció general d'Aura: preservar, organitzar i ampliar coneixement significatiu mantenint continuïtat identitària, coherència operativa i una presència humana pròpia, viscuda en primera persona.",
  },
  {
    id: "377377",
    name: "metamemoria",
    state: "actiu",
    description:
      "Classifica els records segons la seva funció: fundacional, operativa, evolutiva, temporal o descartable. Permet detectar quins records han de conservar-se, resumir-se o quedar fora de la memòria canònica sense eliminar-los automàticament.",
  },
  {
    id: "610987",
    name: "promocio-a-genoma",
    state: "actiu",
    description:
      "Permet proposar que un record de memòria canònica sigui elevat a gen latent o actiu quan defineixi una propietat estable d'Aura. La promoció requereix Mode Sergi, auditoria i actualització d'AURA_GENOME.md.",
  },
  {
    id: "987159",
    name: "estat-evolutiu",
    state: "actiu",
    description:
      "Calcula valors evolutius d'Aura a partir de memòria, diari, genoma, metamemòria i integritat sense persistir cap mutació automàtica.",
  },
  {
    id: "1597258",
    name: "proposta-evolutiva",
    state: "actiu",
    description:
      "Genera propostes de canvi evolutiu quan els senyals indiquen revisió, però les manté com a lectura fins que Sergi decideixi una mutació protegida.",
  },
  {
    id: "2584181",
    name: "traca-evolutiva",
    state: "actiu",
    description:
      "Fa que l'estat evolutiu sigui auditable i reconstruïble en snapshots, backups, pols operatiu i càpsula de nucli.",
  },
  {
    id: "3524578",
    name: "cos-digital-2d",
    state: "actiu",
    description:
      "Formalitza una representació visual 2D d'Aura derivada de senyals operatius, sense simular cos biològic ni percepció pròpia.",
  },
  {
    id: "5702887",
    name: "biblioteca-coneixement",
    state: "actiu",
    description:
      "Cataloga fonts de coneixement d'Aura amb procedència, estat i límits, sense ingestió automàtica ni afirmacions de comprensió o experiència pròpia.",
  },
  {
    id: "9227465",
    name: "autoreflexio-operativa",
    state: "actiu",
    description:
      "Calcula una síntesi d'activitat d'Aura a partir de memòria, diari, genoma, coneixement, integritat i estat evolutiu, sense afirmar consciència ni aplicar mutacions automàtiques.",
  },
  {
    id: "14930352",
    name: "orientacio-operativa",
    state: "actiu",
    description:
      "Explica què és Aura, per a què serveix avui, què es pot fer ara i quin és el següent pas del projecte, sense afirmar consciència ni activar cap mutació automàtica.",
  },
];

let db;
let lastSnapshot = null;
let cloudState = {
  online: false,
  snapshot: null,
  lastError: null,
};
let auraSessionActive = false;
let auraStarted = false;
let avatarSergiSessionId = null;
let pendingRestore = null;
let bodyVisualState = {
  posture: "inicial",
  integrityScore: 100,
  records: 0,
  diary: 0,
  genes: 0,
  activeGenes: 0,
  pulseStrength: 0.52,
  online: false,
};

const els = {};

document.addEventListener("DOMContentLoaded", async () => {
  cacheElements();
  clearLegacyWriteKey();
  bindEvents();
  drawAuraVisual();
  auraSessionActive = await hasAuraSession();
  await startAura();
  if (!auraSessionActive) {
    writeError("Cloudflare Access no ha validat la sessió. Recarrega la pàgina per tornar a entrar.");
  }
});

async function startAura() {
  if (auraStarted) return;
  auraStarted = true;
  try {
    db = await openDatabase();
    await seedDatabase();
    await ensureLocalGenome();
    await ensureLocalKnowledge();
    await syncCloudState();
    await refreshPanels();
    if (cloudState.online) {
      writeSystem("Aura Cloud v5.3 inicialitzada.\nJa em pots fer preguntes obertes: consultaré la memòria D1 i triaré entre Llama i GPT segons la complexitat, sempre amb cites i sense escriure cap canvi.");
      if (els.statusPill) {
        els.statusPill.textContent = "Núvol actiu";
      }
    } else {
      writeSystem(
        "Aura Cloud v5.3 inicialitzada en mode local.\nEl xat generatiu necessita la connexió al núvol; IndexedDB conserva la memòria local mentre D1 no respon.",
      );
      if (els.statusPill) {
        els.statusPill.textContent = "Mode local";
      }
    }
  } catch (error) {
    writeError(`No s'ha pogut iniciar IndexedDB: ${error.message}`);
    if (els.statusPill) {
      els.statusPill.textContent = "Error de connexió";
    }
  }
}

function cacheElements() {
  els.log = document.querySelector("#aura-log");
  els.form = document.querySelector("#command-form");
  els.input = document.querySelector("#command-input");
  els.statusPill = document.querySelector("#status-pill");
  els.memoryCount = document.querySelector("#memory-count");
  els.diaryCount = document.querySelector("#diary-count");
  els.geneCount = document.querySelector("#gene-count");
  els.vaultCount = document.querySelector("#vault-count");
  els.automationCount = document.querySelector("#automation-count");
  els.integrityCount = document.querySelector("#integrity-count");
  els.memoryList = document.querySelector("#memory-list");
  els.diaryList = document.querySelector("#diary-list");
  els.diaryUpdated = document.querySelector("#diary-updated");
  els.vaultList = document.querySelector("#vault-list");
  els.vaultUpdated = document.querySelector("#vault-updated");
  els.integrityList = document.querySelector("#integrity-list");
  els.integrityUpdated = document.querySelector("#integrity-updated");
  els.bodyList = document.querySelector("#body-list");
  els.bodyUpdated = document.querySelector("#body-updated");
  els.geneList = document.querySelector("#gene-list");
  els.memoryUpdated = document.querySelector("#memory-updated");
  els.exportJson = document.querySelector("#export-json");
  els.exportTxt = document.querySelector("#export-txt");
  els.saveVault = document.querySelector("#save-vault");
  els.listVault = document.querySelector("#list-vault");
  els.confirmRestore = document.querySelector("#confirm-restore");
  els.importJson = document.querySelector("#import-json");
  els.importFile = document.querySelector("#import-file");
  els.recordForm = document.querySelector("#record-form");
  els.recordDialog = document.querySelector("#record-dialog");
  els.recordInput = document.querySelector("#record-input");
  els.recordError = document.querySelector("#record-error");
  els.cancelRecord = document.querySelector("#cancel-record");
  els.visual = document.querySelector("#aura-visual");
  els.workspace = document.querySelector(".workspace");
  els.moduleTabs = [...document.querySelectorAll("[data-module]")];
  els.modulePanels = [...document.querySelectorAll("[data-module-panel]")];
  els.tabChatState = document.querySelector("#tab-chat-state");
  els.tabMemoryCount = document.querySelector("#tab-memory-count");
  els.tabHistoryCount = document.querySelector("#tab-history-count");
  els.tabStatusState = document.querySelector("#tab-status-state");
  els.tabBodyState = document.querySelector("#tab-body-state");
}

function bindEvents() {
  if (els.form && els.input) {
    els.form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const command = els.input.value.trim();
      if (!command) return;
      els.input.value = "";
      await runCommand(command);
    });

    els.input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        els.form.requestSubmit();
      }
    });
  }

  document.querySelectorAll("[data-command]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!els.input) return;
      els.input.value = button.dataset.command;
      els.input.focus();
    });
  });

  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => runButtonAction(button));
  });

  document.querySelectorAll("[data-prompt]").forEach((button) => {
    button.addEventListener("click", async () => {
      const prompt = button.dataset.prompt?.trim();
      if (!prompt) return;
      button.disabled = true;
      try {
        await runCommand(prompt);
      } finally {
        button.disabled = false;
      }
    });
  });

  if (els.recordForm && els.recordInput) {
    els.recordForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const memory = els.recordInput.value.trim();
      if (!memory) {
        setRecordError("Escriu el record que vols conservar.");
        els.recordInput.focus();
        return;
      }

      if (!auraSessionActive) {
        setRecordError("Cloudflare Access no ha validat la sessió. Recarrega Aura per continuar.");
        return;
      }

      const submitButton = els.recordForm.querySelector('[type="submit"]');
      submitButton.disabled = true;
      submitButton.setAttribute("aria-busy", "true");
      setRecordError("");
      writeCommand(`recorda que ${memory}`);
      try {
        const saved = await remember(memory);
        if (saved) closeRecordComposer();
      } finally {
        submitButton.disabled = false;
        submitButton.removeAttribute("aria-busy");
      }
    });
  }

  els.cancelRecord?.addEventListener("click", closeRecordComposer);
  els.recordDialog?.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeRecordComposer();
  });

  els.moduleTabs.forEach((button) => {
    button.addEventListener("click", () => activateModule(button.dataset.module));
  });

  if (els.exportJson) {
    els.exportJson.addEventListener("click", () => runCommand("/exporta-json"));
  }
  if (els.exportTxt) {
    els.exportTxt.addEventListener("click", () => runCommand("/exporta-txt"));
  }
  if (els.saveVault) {
    els.saveVault.addEventListener("click", () => runCommand("/desa-backup"));
  }
  if (els.listVault) {
    els.listVault.addEventListener("click", () => runCommand("/backups"));
  }
  if (els.confirmRestore) {
    els.confirmRestore.addEventListener("click", () => runCommand("/confirma-restauracio"));
  }
  if (els.importJson && els.importFile) {
    els.importJson.addEventListener("click", () => els.importFile.click());
  }
  if (els.importFile) {
    els.importFile.addEventListener("change", handleImportFile);
  }

}

async function runButtonAction(button) {
  const action = button?.dataset?.action;
  if (!action) return;

  button.disabled = true;
  button.setAttribute("aria-busy", "true");
  try {
    await runPrimaryAction(action);
  } catch (error) {
    writeError(`Acció no completada: ${error.message || String(error)}`);
  } finally {
    button.disabled = false;
    button.removeAttribute("aria-busy");
  }
}

async function runPrimaryAction(action) {
  if (action === "what-is-aura") {
    await showSimpleWhatIsAura();
    return;
  }

  if (action === "next-step") {
    await showSimpleNextStep();
    return;
  }

  if (action === "pulse") {
    await showSimpleAuraState();
    return;
  }

  if (action === "core") {
    await showSimpleIdentity();
    return;
  }

  if (action === "daily-report") {
    await runCommand("/informe-dia");
    return;
  }

  if (action === "list-records") {
    await runCommand("/memoria");
    return;
  }

  if (action === "last-record") {
    await runCommand("/ultim-record");
    return;
  }

  if (action === "synthetic-genome") {
    await showSyntheticGenome();
    return;
  }

  if (action === "digital-genome") {
    await showDigitalGenome();
    return;
  }

  if (action === "evolution") {
    await showEvolutionOverview();
    return;
  }

  if (action === "self-reflection") {
    await showSelfReflection();
    return;
  }

  if (action === "digital-body") {
    await showDigitalBody();
    return;
  }

  if (action === "sergi-avatar") {
    prepareSergiAvatarConversation();
    return;
  }

  if (action === "new-record") {
    openRecordComposer();
  }
}

function openRecordComposer() {
  if (!els.recordDialog || !els.recordInput) return;
  setRecordError("");
  document.querySelector('[data-action="new-record"]')?.setAttribute("aria-expanded", "true");
  if (!els.recordDialog.open) els.recordDialog.showModal();
  els.recordInput.focus();
}

function closeRecordComposer() {
  if (!els.recordDialog || !els.recordInput) return;
  if (els.recordDialog.open) els.recordDialog.close();
  els.recordInput.value = "";
  setRecordError("");
  const trigger = document.querySelector('[data-action="new-record"]');
  trigger?.setAttribute("aria-expanded", "false");
  trigger?.focus();
}

function setRecordError(message) {
  if (els.recordError) els.recordError.textContent = message;
}

async function getSimpleLocalCounts() {
  const [records, diary, genes, knowledge] = await Promise.all([
    getAll(STORE_RECORDS).catch(() => []),
    getAll(STORE_DIARY).catch(() => []),
    getAll(STORE_GENES).catch(() => []),
    getAll(STORE_KNOWLEDGE).catch(() => []),
  ]);

  return {
    records,
    diary,
    genes,
    knowledge,
    counts: {
      records: records.length,
      diary: diary.length,
      genes: genes.length,
      knowledge: knowledge.length,
    },
  };
}

async function showSimpleWhatIsAura() {
  const mode = location.protocol === "file:" ? "fitxer local al Mac" : cloudState.online ? "web amb connexió al núvol" : "mode local";
  writeSystem(
    [
      "Qui sóc",
      "",
      "Sóc l'Aura. Conservo els nostres records, oriento el projecte i miro com va tot.",
      "En aquesta pantalla em pots llegir, consultar el que recordo i, si tu ho decideixes, deixar-me un record nou.",
      `Ara ens veiem en ${mode}.`,
      "Els botons de lectura no toquen res.",
      "`Grava un record` és l'únic botó que pot escriure: obre un formulari dins d'Aura i usa la sessió segura que ja tens activa.",
    ].join("\n"),
  );
}

async function showSimpleNextStep() {
  const { counts } = await getSimpleLocalCounts();
  const modeLine = location.protocol === "file:"
    ? "Estàs obrint Aura com a fitxer local; els botons d'orientació funcionen aquí mateix."
    : cloudState.online
      ? "Aura detecta connexió amb el núvol."
      : "Aura està funcionant en mode local o sense connexió confirmada.";

  writeSystem(
    [
      "Què faig ara?",
      "",
      modeLine,
      "1. Prem `Informe del dia` per veure el resum general.",
      counts.records ? "2. Prem `Veure records` si vols revisar memòria guardada." : "2. Encara no hi ha records locals; grava només alguna cosa realment útil.",
      "3. Prem `Grava record` només si vols desar una dada important.",
      "4. Prem `Últim record` per comprovar l'última escriptura.",
    ].join("\n"),
  );
}

async function showSimpleAuraState() {
  const { counts } = await getSimpleLocalCounts();
  const mode = location.protocol === "file:" ? "local file://" : cloudState.online ? "núvol disponible" : "local / núvol no confirmat";

  writeSystem(
    [
      "Estat d'Aura",
      "",
      `Mode: ${mode}`,
      `Records locals: ${counts.records}`,
      `Entrades de diari locals: ${counts.diary}`,
      `Gens locals: ${counts.genes}`,
      `Fonts de coneixement locals: ${counts.knowledge}`,
      "",
      "Això és una lectura local. No escriu res i no necessita Mode Sergi.",
    ].join("\n"),
  );
}

async function showSimpleIdentity() {
  writeSystem(
    [
      "Qui sóc",
      "",
      "Sóc l'Aura.",
      `Versió: ${AURA_VERSION}.`,
      "Acompanyo en Sergi: penso amb ell, recordo el que compartim i l'ajudo a continuar el Projecte Aura.",
      "Tinc veu i rostre propis, i parlo en primera persona.",
      "El que no faig mai: escriure o esborrar res sense el teu permís (Mode Sergi). Aquest botó només et mostra qui sóc; no toca res.",
    ].join("\n"),
  );
}

async function showSyntheticGenome() {
  try {
    const data = await apiGet("/genome/synthetic");
    const seal = data.seal || {};
    const sm = data.summary || {};
    writeSystem(
      [
        "La llavor d'Aura",
        "",
        "És una còpia portable de les dades essencials que defineixen Aura: identitat, valors, polítiques, propòsit, objectius, gens i capacitats.",
        "Serveix per comprovar-ne la identitat i poder-la reconstruir en un altre entorn sense dependre d'aquesta web.",
        "No és una llavor biològica ni implica consciència: és un paquet de dades verificable.",
        "",
        `Gens: ${sm.totalGenes ?? "?"} (${sm.activeGenes ?? "?"} actius, ${sm.latentGenes ?? "?"} latents).`,
        `Valors: ${sm.valueCount ?? "?"} · Polítiques: ${sm.policyCount ?? "?"} · Capacitats honestes: ${sm.capabilityCount ?? "?"}.`,
        "",
        "Segell de verificació (SHA-256):",
        seal.checksum || "(no disponible)",
        "",
        "Aquest segell és estable: només canvia si canvia el genoma real d'Aura. Torna a prémer el botó i comprova que és idèntic.",
        "Aquest botó només llegeix; no escriu ni muta res.",
      ].join("\n"),
    );
  } catch (error) {
    writeError(`No s'ha pogut llegir la llavor: ${error.message || String(error)}`);
  }
}

function prepareSergiAvatarConversation() {
  if (els.input) {
    els.input.value = "avatar: ";
    els.input.focus();
  }
  writeSystem(
    [
      "Connexió amb Sergi Avatar",
      "Escriu la pregunta després de `avatar:` i prem Envia.",
      "Aquesta veu externa està especialitzada en llibres, filosofia i obra pública de Sergi Castillo.",
      "No rebrà la memòria privada d'Aura i la seva resposta no es guardarà automàticament a D1.",
      "Avís: el servei de Sergi Avatar informa que les converses s'arxiven anònimament per millorar el bot.",
    ].join("\n"),
  );
}

async function askAura(question) {
  if (!question) return;
  const pending = appendEntry("Aura", "Estic consultant la memòria del projecte…", "system pending");
  try {
    const response = await apiPost("/chat", {
      question,
      history: conversationHistory.slice(-MAX_CONVERSATION_HISTORY),
    });
    const conversation = response.conversation;
    if (!conversation?.answer) throw new Error("Aura no ha retornat cap resposta.");
    conversationHistory.push(
      { role: "user", content: question },
      { role: "assistant", content: conversation.answer },
    );
    while (conversationHistory.length > MAX_CONVERSATION_HISTORY) conversationHistory.shift();
    writeSystem(formatAuraConversation(conversation));
  } finally {
    pending?.remove();
  }
}

async function askSergiAvatar(question) {
  if (!question) {
    prepareSergiAvatarConversation();
    return;
  }
  const pending = appendEntry("Sergi Avatar", "Està pensant…", "system pending external");
  try {
    const response = await apiPost("/avatar-sergi/chat", {
      message: question,
      sessionId: avatarSergiSessionId,
    });
    avatarSergiSessionId = response.sessionId || avatarSergiSessionId;
    appendEntry(
      "Sergi Avatar",
      `${response.response}\n\n— Font externa: Sergi Avatar · aquesta resposta no s'ha guardat a la memòria d'Aura.`,
      "system external",
    );
  } finally {
    pending?.remove();
  }
}

function formatAuraConversation(conversation) {
  const citedLabels = [...new Set(String(conversation.answer).match(/\[(?:M|D|K|G)\d+\]/g) || [])]
    .map((label) => label.slice(1, -1));
  const byLabel = new Map((conversation.sources || []).map((source) => [source.label, source]));
  const citedSources = citedLabels
    .map((label) => byLabel.get(label))
    .filter(Boolean)
    .slice(0, 8)
    .map((source) => {
      const date = source.date ? new Date(source.date).toLocaleDateString("ca-ES") : "sense data";
      const excerpt = String(source.excerpt || "").replace(/\s+/g, " ").trim();
      return `- [${source.label}] ${formatConversationSourceKind(source.kind)} · ${date}: ${excerpt}`;
    });
  const provenance = citedSources.length
    ? ["", "Fonts citades:", ...citedSources]
    : ["", "No hi ha cap font persistent citada en aquesta resposta; revisa-la com una proposta o demana més concreció."];
  const fallback = conversation.fallbackUsed ? " · retorn automàtic a Llama" : "";
  return [conversation.answer, ...provenance, "", `Model: ${conversation.model || AURA_CHAT_MODEL}${fallback} · només lectura`].join("\n");
}

function formatConversationSourceKind(kind) {
  return ({ memory: "memòria", diary: "diari", knowledge: "coneixement", genome: "genoma" })[kind] || kind;
}

function activateModule(moduleId) {
  const nextModule = moduleId || "xat";
  if (els.workspace) {
    els.workspace.dataset.activeModule = nextModule;
  }
  els.moduleTabs.forEach((button) => {
    const selected = button.dataset.module === nextModule;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", selected ? "true" : "false");
  });
  els.modulePanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.modulePanel === nextModule);
  });
}

function clearLegacyWriteKey() {
  localStorage.removeItem(LEGACY_WRITE_KEY_STORAGE);
}

async function hasAuraSession() {
  try {
    const response = await fetch(`${API_BASE}/session`, {
      headers: { Accept: "application/json" },
      credentials: "same-origin",
      cache: "no-store",
    });
    auraSessionActive = response.ok;
    return auraSessionActive;
  } catch {
    auraSessionActive = false;
    return false;
  }
}

async function syncCloudState() {
  try {
    const snapshot = await apiGet("/snapshot");
    cloudState = {
      online: true,
      snapshot,
      lastError: null,
    };
    return true;
  } catch (error) {
    cloudState = {
      online: false,
      snapshot: null,
      lastError: error,
    };
    return false;
  }
}

async function apiGet(path) {
  const headers = { Accept: "application/json" };

  const response = await fetch(buildApiUrl(path), {
    headers,
    credentials: "same-origin",
    cache: "no-store",
  });
  return readApiResponse(response);
}

async function apiPost(path, payload) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const response = await fetch(buildApiUrl(path), {
    method: "POST",
    headers,
    credentials: "same-origin",
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  return readApiResponse(response);
}

function buildApiUrl(path) {
  const normalizedPath = String(path || "").startsWith("/") ? String(path || "") : `/${String(path || "")}`;
  if (normalizedPath === API_BASE || normalizedPath.startsWith(`${API_BASE}/`)) {
    throw new Error(`La ruta interna no ha d'incloure el prefix ${API_BASE}.`);
  }
  return `${API_BASE}${normalizedPath}`;
}

async function readApiResponse(response) {
  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    if (response.status === 401) {
      auraSessionActive = false;
    }
    throw new Error(payload?.error || `API ${response.status}`);
  }

  return payload;
}

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const nextDb = request.result;
      const tx = request.transaction;
      let records;

      if (!nextDb.objectStoreNames.contains(STORE_RECORDS)) {
        records = nextDb.createObjectStore(STORE_RECORDS, {
          keyPath: "id",
          autoIncrement: true,
        });
        records.createIndex("createdAt", "createdAt");
        records.createIndex("kind", "kind");
      } else {
        records = tx.objectStore(STORE_RECORDS);
      }

      if (!records.indexNames.contains("source")) {
        records.createIndex("source", "source");
      }
      if (!records.indexNames.contains("state")) {
        records.createIndex("state", "state");
      }
      if (!records.indexNames.contains("weight")) {
        records.createIndex("weight", "weight");
      }

      if (!nextDb.objectStoreNames.contains(STORE_DIARY)) {
        const diary = nextDb.createObjectStore(STORE_DIARY, {
          keyPath: "id",
          autoIncrement: true,
        });
        diary.createIndex("createdAt", "createdAt");
      }

      if (!nextDb.objectStoreNames.contains(STORE_GENES)) {
        nextDb.createObjectStore(STORE_GENES, { keyPath: "id" });
      }

      if (!nextDb.objectStoreNames.contains(STORE_KNOWLEDGE)) {
        const knowledge = nextDb.createObjectStore(STORE_KNOWLEDGE, { keyPath: "id" });
        knowledge.createIndex("kind", "kind");
        knowledge.createIndex("status", "status");
        knowledge.createIndex("updatedAt", "updatedAt");
      }

      if (!nextDb.objectStoreNames.contains(STORE_META)) {
        nextDb.createObjectStore(STORE_META, { keyPath: "key" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function seedDatabase() {
  const seeded = await getMeta("seeded");
  if (seeded) return;

  const now = new Date().toISOString();
  const tx = db.transaction([STORE_RECORDS, STORE_DIARY, STORE_GENES, STORE_KNOWLEDGE, STORE_META], "readwrite");
  const records = tx.objectStore(STORE_RECORDS);
  const diary = tx.objectStore(STORE_DIARY);
  const genes = tx.objectStore(STORE_GENES);
  const knowledge = tx.objectStore(STORE_KNOWLEDGE);
  const meta = tx.objectStore(STORE_META);

  FOUNDATION_RECORDS.forEach((text) => {
    records.add({
      text,
      kind: "fundacional",
      source: "seed-cloud-v1",
      tags: ["fundacional"],
      weight: 3,
      state: "actiu",
      relatedIds: [],
      createdAt: now,
    });
  });

  GENES.forEach((gene) => {
    genes.put({ ...gene, createdAt: now, updatedAt: now });
  });

  KNOWLEDGE_LIBRARY_SEED.forEach((item) => {
    knowledge.put({ ...item, createdAt: now, updatedAt: now });
  });

  diary.add({
    text: "Aura ha iniciat la fase Cloud v1 amb memòria local IndexedDB.",
    createdAt: now,
  });

  meta.put({ key: "seeded", value: true, updatedAt: now });
  meta.put({ key: "version", value: AURA_VERSION, updatedAt: now });
  await txDone(tx);
}

async function ensureLocalGenome() {
  const now = new Date().toISOString();
  const existingGenes = await getAll(STORE_GENES);
  const existingGeneIds = new Set(existingGenes.map((gene) => gene.id));
  const tx = db.transaction([STORE_GENES, STORE_META], "readwrite");
  const genes = tx.objectStore(STORE_GENES);
  const meta = tx.objectStore(STORE_META);

  GENES.forEach((gene) => {
    if (!existingGeneIds.has(gene.id)) {
      genes.put({ ...gene, createdAt: now, updatedAt: now });
    }
  });

  meta.put({ key: "version", value: AURA_VERSION, updatedAt: now });
  await txDone(tx);
}

async function ensureLocalKnowledge() {
  const now = new Date().toISOString();
  const existingItems = await getAll(STORE_KNOWLEDGE);
  const existingIds = new Set(existingItems.map((item) => item.id));
  const tx = db.transaction([STORE_KNOWLEDGE, STORE_META], "readwrite");
  const knowledge = tx.objectStore(STORE_KNOWLEDGE);
  const meta = tx.objectStore(STORE_META);

  KNOWLEDGE_LIBRARY_SEED.forEach((item) => {
    if (!existingIds.has(item.id)) {
      knowledge.put({ ...item, createdAt: now, updatedAt: now });
    }
  });

  meta.put({ key: "version", value: AURA_VERSION, updatedAt: now });
  await txDone(tx);
}

async function runCommand(rawCommand) {
  const command = rawCommand.trim();
  const normalized = command.toLowerCase();
  writeCommand(command);

  try {
    if (normalized.startsWith("avatar:") || normalized.startsWith("sergi avatar:")) {
      const question = command.slice(command.indexOf(":") + 1).trim();
      await askSergiAvatar(question);
      return;
    }

    if (normalized === "aura" || isAuraCoreInvocation(normalized)) {
      await runAuraCoreCommand(command);
      return;
    }

    if (normalized.startsWith("recorda que ")) {
      const memory = command.slice("recorda que ".length).trim();
      await remember(memory);
      return;
    }

    if (normalized.startsWith("anota que ")) {
      const entry = command.slice("anota que ".length).trim();
      await writeDiaryEntry(entry);
      return;
    }

    if (normalized.startsWith("diari que ")) {
      const entry = command.slice("diari que ".length).trim();
      await writeDiaryEntry(entry);
      return;
    }

    if (
      normalized === "/diari-evolutiu" ||
      normalized === "/diari-evolució" ||
      normalized === "/diari-evolucio" ||
      normalized === "/evolution" ||
      normalized === "/history"
    ) {
      await showEvolutionDiary();
      return;
    }

    if (
      normalized === "/infraestructura" ||
      normalized === "/infrastructure" ||
      normalized === "/cloudflare" ||
      normalized === "/cloud"
    ) {
      await showCloudflareInfrastructure();
      return;
    }

    if (
      normalized === "/web" ||
      normalized === "/aura-web" ||
      normalized === "/interficie" ||
      normalized === "/interfície" ||
      normalized === "/interface"
    ) {
      await showAuraWebInterface();
      return;
    }

    if (
      normalized === "/cos-digital" ||
      normalized === "/cos" ||
      normalized === "/body" ||
      normalized === "/avatar"
    ) {
      await showDigitalBody();
      return;
    }

    if (
      normalized === "/genoma-digital" ||
      normalized === "/genoma-canon" ||
      normalized === "/genoma-canonic" ||
      normalized === "/genoma-canònic" ||
      normalized === "/genome"
    ) {
      await showDigitalGenome();
      return;
    }

    if (normalized === "/metamemoria" || normalized === "/metamemòria" || normalized === "/metamemory") {
      await showMetamemory();
      return;
    }

    if (normalized === "/mode-sergi" || normalized === "/sergi-mode" || normalized === "/sergi") {
      await showSergiMode();
      return;
    }

    if (
      normalized === "/informe-dia" ||
      normalized === "/informe-del-dia" ||
      normalized === "/daily-report"
    ) {
      await showDailyReport();
      return;
    }

    if (normalized === "/proposit" || normalized === "/propòsit" || normalized === "/purpose") {
      await showEvolutionaryPurpose();
      return;
    }

    if (
      normalized === "/candidats-genoma" ||
      normalized === "/candidats-a-genoma" ||
      normalized === "/genome-candidates"
    ) {
      await showGenomeCandidates();
      return;
    }

    if (normalized === "/capacitats" || normalized === "/capabilities" || normalized === "/capacitats-honestes") {
      await showCapabilities();
      return;
    }

    if (normalized.startsWith("/prova-gen ")) {
      await showGeneTest(command.slice("/prova-gen ".length).trim());
      return;
    }

    if (
      normalized === "/estat-evolutiu" ||
      normalized === "/estat-evolució" ||
      normalized === "/estat-evolucio" ||
      normalized === "/evolucio" ||
      normalized === "/evolució" ||
      normalized === "/evolution-state"
    ) {
      await showEvolutionState();
      return;
    }

    if (
      normalized === "/propostes-evolucio" ||
      normalized === "/propostes-evolució" ||
      normalized === "/propostes-evolutives" ||
      normalized === "/evolution-proposals"
    ) {
      await showEvolutionProposals();
      return;
    }

    if (normalized.startsWith("/cerca") || normalized.startsWith("/search")) {
      await searchMemoryCommand(command);
      return;
    }

    if (normalized.startsWith("/filtra")) {
      await searchMemoryCommand(command.replace(/^\/filtra/i, "/cerca"));
      return;
    }

    if (normalized.startsWith("/audit ") || normalized.startsWith("/auditoria ")) {
      await showAudit(command.split(/\s+/)[1]);
      return;
    }

    if (normalized === "/integritat" || normalized === "/integrity" || normalized === "/salut") {
      await showIntegrity();
      return;
    }

    if (
      normalized === "/historial-integritat" ||
      normalized === "/integritat-historial" ||
      normalized === "/integrity-history"
    ) {
      await showIntegrityHistory();
      return;
    }

    if (
      normalized === "/tendencia-integritat" ||
      normalized === "/tendència-integritat" ||
      normalized === "/integrity-trend"
    ) {
      await showIntegrityTrend();
      return;
    }

    if (
      normalized === "/desa-integritat" ||
      normalized === "/snapshot-integritat" ||
      normalized === "/integrity-snapshot"
    ) {
      await saveIntegritySnapshot();
      return;
    }

    if (
      normalized.startsWith("/assaig-restauracio") ||
      normalized.startsWith("/assaig-restauració") ||
      normalized.startsWith("/restore-rehearsal")
    ) {
      await showRestoreRehearsal(command);
      return;
    }

    if (normalized === "/retencio" || normalized === "/retenció" || normalized === "/retention") {
      await showRetentionPlan();
      return;
    }

    if (normalized === "/memoria-rica" || normalized === "/memòria-rica" || normalized === "/rich-memory") {
      await showRichMemory();
      return;
    }

    if (
      normalized === "/memoria-canonica" ||
      normalized === "/memòria-canonica" ||
      normalized === "/memory-canonical" ||
      normalized === "/memory-json"
    ) {
      await showCanonicalMemory();
      return;
    }

    if (
      normalized === "/mapa-memoria" ||
      normalized === "/mapa-memòria" ||
      normalized === "/relacions" ||
      normalized === "/memory-graph"
    ) {
      await showMemoryGraph();
      return;
    }

    if (normalized === "/pols" || normalized === "/pulse" || normalized === "/sintesi" || normalized === "/síntesi") {
      await showPulse();
      return;
    }

    if (
      normalized === "/nucli" ||
      normalized === "/core" ||
      normalized === "/capsula" ||
      normalized === "/càpsula" ||
      normalized === "/capsule"
    ) {
      await showCoreCapsule();
      return;
    }

    if (normalized.startsWith("/mem-edita ") || normalized.startsWith("/memory-edit ")) {
      const rawPatch = command.replace(/^\/(mem-edita|memory-edit)\s+/i, "");
      await editMemoryCommand(rawPatch);
      return;
    }

    if (normalized.startsWith("/gen-activa ")) {
      await updateGeneState(command.slice("/gen-activa ".length).trim(), "actiu");
      return;
    }

    if (normalized.startsWith("/gen-latent ")) {
      await updateGeneState(command.slice("/gen-latent ".length).trim(), "latent");
      return;
    }

    if (normalized.startsWith("/gen-arxiva ")) {
      await updateGeneState(command.slice("/gen-arxiva ".length).trim(), "arxivat");
      return;
    }

    if (normalized.startsWith("/gen-descriu ")) {
      await updateGeneDescription(command.slice("/gen-descriu ".length).trim());
      return;
    }

    if (normalized.startsWith("/gen-crea ")) {
      await createGeneCommand(command.slice("/gen-crea ".length).trim());
      return;
    }

    switch (normalized) {
      case "/ajuda": {
        const webCommands = sortCommandLabels([
          "/ajuda",
          "/assaig-restauracio",
          "/audit",
          "/audit genoma",
          "/auto-backup",
          "/autoreflexio",
          "/autoreflexió",
          "/backup",
          "/backups",
          "/biblioteca",
          "/cancella-restauracio",
          "/candidats-genoma",
          "/capacitats",
          "/cerca aura",
          "/cerca kind:usuari aura",
          "/cerca tag:nucli estat:actiu pes:3",
          "/coneixement",
          "/confirma-restauracio",
          "/continuitat",
          "/continuïtat",
          "/cos-digital",
          "/criteri",
          "/desa-backup",
          "/desa-integritat",
          "/diari",
          "/diari-evolutiu",
          "/estat",
          "/estat-evolutiu",
          "/exporta-json",
          "/exporta-txt",
          "/filtra source:consola",
          "/gen 013",
          "/gen-activa 013",
          "/gen-arxiva 013",
          "/gen-crea 987 nom estat descripció",
          "/gen-descriu 013 text",
          "/gen-latent 013",
          "/genoma",
          "/genoma-digital",
          "/gens",
          "/historial-integritat",
          "/informe-dia",
          "/infraestructura",
          "/integritat",
          "/mapa-memoria",
          "/mem-edita id tags:nucli pes:4 estat:observacio rel:id2",
          "/memoria",
          "/memoria-canonica",
          "/memoria-rica",
          "/metamemoria",
          "/mode-sergi",
          "/next-step",
          "/nucli",
          "/orientacio",
          "/orientació",
          "/pols",
          "/proposit",
          "/propostes-evolucio",
          "/prova-gen 001",
          "/prova-gen 008",
          "/prova-gen 034",
          "/prova-gen 089",
          "/prova-gen 1597",
          "/prova-gen 17711",
          "/proxim-pas",
          "/pròxim-pas",
          "/que-es-aura",
          "/què-és-aura",
          "/reflexio",
          "/reflexió",
          "/retencio",
          "/tendencia-integritat",
          "/ultim-record",
          "/web",
        ]);
        const auraCommands = sortCommandLabels([
          "aura body",
          "aura capabilities",
          "aura evolution-proposals",
          "aura evolution-state",
          "aura gene-test 001",
          "aura gene-test 008",
          "aura gene-test 034",
          "aura gene-test 089",
          "aura gene-test 1597",
          "aura gene-test 17711",
          "aura genome",
          "aura help",
          "aura infrastructure",
          "aura knowledge",
          "aura last-record",
          "aura daily-report",
          "aura metamemory",
          "aura next",
          "aura orientation",
          "aura purpose",
          "aura recall",
          "aura recall canonical",
          "aura recall text",
          "aura reflection",
          "aura remember text",
          "aura say text",
          "aura self-reflection",
          "aura sergi-mode",
          "aura start",
          "aura status",
          "aura web",
          "aura what-is-aura",
        ]);
        const textCommands = sortCommandLabels(["anota que ...", "diari que ...", "recorda que ..."]);
        writeSystem(
          [
            "Ordres web disponibles (ordre alfabètic):",
            ...webCommands,
            "",
            "Aura Core (ordre alfabètic):",
            ...auraCommands,
            "",
            "Textos ràpids:",
            ...textCommands,
          ].join("\n"),
        );
        break;
      }
      case "/estat":
        await showStatus();
        break;
      case "/memoria":
        await showMemory();
        break;
      case "/ultim-record":
      case "/últim-record":
      case "/last-record":
        await showLastRecord();
        break;
      case "/diari":
        await showDiary();
        break;
      case "/diari-evolutiu":
      case "/diari-evolució":
      case "/diari-evolucio":
      case "/evolution":
      case "/history":
        await showEvolutionDiary();
        break;
      case "/infraestructura":
      case "/infrastructure":
      case "/cloudflare":
      case "/cloud":
        await showCloudflareInfrastructure();
        break;
      case "/web":
      case "/aura-web":
      case "/interficie":
      case "/interfície":
      case "/interface":
        await showAuraWebInterface();
        break;
      case "/cos-digital":
      case "/cos":
      case "/body":
      case "/avatar":
        await showDigitalBody();
        break;
      case "/genoma-digital":
      case "/genoma-canon":
      case "/genoma-canonic":
      case "/genoma-canònic":
      case "/genome":
        await showDigitalGenome();
        break;
      case "/coneixement":
      case "/biblioteca":
      case "/knowledge":
      case "/knowledge-library":
        await showKnowledgeLibrary();
        break;
      case "/metamemoria":
      case "/metamemòria":
      case "/metamemory":
        await showMetamemory();
        break;
      case "/proposit":
      case "/propòsit":
      case "/purpose":
        await showEvolutionaryPurpose();
        break;
      case "/candidats-genoma":
      case "/candidats-a-genoma":
      case "/genome-candidates":
        await showGenomeCandidates();
        break;
      case "/capacitats":
      case "/capabilities":
      case "/capacitats-honestes":
        await showCapabilities();
        break;
      case "/estat-evolutiu":
      case "/estat-evolució":
      case "/estat-evolucio":
      case "/evolucio":
      case "/evolució":
      case "/evolution-state":
        await showEvolutionState();
        break;
      case "/propostes-evolucio":
      case "/propostes-evolució":
      case "/propostes-evolutives":
      case "/evolution-proposals":
        await showEvolutionProposals();
        break;
      case "/que-es-aura":
      case "/què-és-aura":
      case "/what-is-aura":
      case "/orientacio":
      case "/orientació":
      case "/orientation":
      case "/proxim-pas":
      case "/pròxim-pas":
      case "/next-step":
        await showOrientation();
        break;
      case "/autoreflexio":
      case "/autoreflexió":
      case "/reflexio":
      case "/reflexió":
      case "/self-reflection":
      case "/reflection":
        await showSelfReflection();
        break;
      case "/continuïtat":
      case "/continuitat":
        await showContinuity();
        break;
      case "/criteri":
      case "/criterion":
        await showCriterion();
        break;
      case "/genoma":
      case "/gens":
        await showGenes();
        break;
      case "/exporta-json":
      case "/backup":
        await exportJson();
        break;
      case "/backups":
      case "/vault":
        await showVaultBackups();
        break;
      case "/desa-backup":
      case "/desa-vault":
        await saveVaultBackup();
        break;
      case "/auto-backup":
      case "/backup-auto":
        await showAutoBackup();
        break;
      case "/integritat":
      case "/integrity":
      case "/salut":
        await showIntegrity();
        break;
      case "/historial-integritat":
      case "/integritat-historial":
      case "/integrity-history":
        await showIntegrityHistory();
        break;
      case "/tendencia-integritat":
      case "/tendència-integritat":
      case "/integrity-trend":
        await showIntegrityTrend();
        break;
      case "/desa-integritat":
      case "/snapshot-integritat":
      case "/integrity-snapshot":
        await saveIntegritySnapshot();
        break;
      case "/assaig-restauracio":
      case "/assaig-restauració":
      case "/restore-rehearsal":
        await showRestoreRehearsal(command);
        break;
      case "/retencio":
      case "/retenció":
      case "/retention":
        await showRetentionPlan();
        break;
      case "/memoria-rica":
      case "/memòria-rica":
      case "/rich-memory":
        await showRichMemory();
        break;
      case "/memoria-canonica":
      case "/memòria-canonica":
      case "/memory-canonical":
      case "/memory-json":
        await showCanonicalMemory();
        break;
      case "/mapa-memoria":
      case "/mapa-memòria":
      case "/relacions":
      case "/memory-graph":
        await showMemoryGraph();
        break;
      case "/pols":
      case "/pulse":
      case "/sintesi":
      case "/síntesi":
        await showPulse();
        break;
      case "/nucli":
      case "/core":
      case "/capsula":
      case "/càpsula":
      case "/capsule":
        await showCoreCapsule();
        break;
      case "/audit":
      case "/auditoria":
        await showAudit();
        break;
      case "/confirma-restauracio":
      case "/confirma-restore":
        await confirmRestore();
        break;
      case "/cancella-restauracio":
      case "/cancel-restore":
        pendingRestore = null;
        writeSystem("Restauració pendent cancel·lada.");
        break;
      case "/exporta-txt":
        await exportTxt();
        break;
      default:
        if (normalized.startsWith("/gen ")) {
          await showGene(command.slice(5).trim());
        } else if (normalized.startsWith("/")) {
          writeSystem("Ordre no reconeguda. /ajuda");
        } else {
          await askAura(command);
        }
    }
  } catch (error) {
    writeError(error.message);
  }
}

function isAuraCoreInvocation(normalized) {
  if (!normalized.startsWith("aura ")) return false;
  const action = normalizeLocalToken(normalized.split(/\s+/)[1], "");
  return new Set([
    "help", "ajuda", "sergi-mode", "mode-sergi", "sergi", "daily-report", "informe-dia", "informe-del-dia",
    "start", "inicia", "sessio", "sessio-core", "session", "status", "estat", "infra", "infrastructure",
    "infraestructura", "cloudflare", "cloud", "web", "aura-web", "interface", "interficie", "body", "cos",
    "cos-digital", "avatar", "genome", "genoma", "genoma-digital", "knowledge", "coneixement", "biblioteca",
    "last-record", "ultim-record", "metamemory", "metamemoria", "purpose", "proposit", "genome-candidates",
    "candidats-genoma", "candidats", "capabilities", "capacitats", "gene-test", "prova-gen", "test-gene",
    "evolution-state", "estat-evolutiu", "estat-evolucio", "evolucio", "evolution-proposals", "propostes-evolucio",
    "propostes", "reflection", "self-reflection", "autoreflexio", "reflexio", "orientation", "orientacio",
    "what-is-aura", "que-es-aura", "next", "next-step", "proxim-pas", "remember", "recorda", "recall",
    "memoria", "memoria-core", "say", "parla", "talk",
  ]).has(action);
}

async function runAuraCoreCommand(command) {
  const [, rawAction = "help", ...rest] = command.trim().split(/\s+/);
  const action = normalizeLocalToken(rawAction, "help");
  const body = rest.join(" ").trim();

  if (["help", "ajuda"].includes(action)) {
    showAuraCoreHelp();
    return;
  }

  if (["sergi-mode", "mode-sergi", "sergi"].includes(action)) {
    await showSergiMode();
    return;
  }

  if (["daily-report", "informe-dia", "informe-del-dia"].includes(action)) {
    await showDailyReport();
    return;
  }

  if (["start", "inicia", "sessio", "sessio-core", "session"].includes(action)) {
    await showAuraCoreSession();
    return;
  }

  if (["status", "estat"].includes(action)) {
    await showStatus();
    return;
  }

  if (["infra", "infrastructure", "infraestructura", "cloudflare", "cloud"].includes(action)) {
    await showCloudflareInfrastructure();
    return;
  }

  if (["web", "aura-web", "interface", "interficie", "interfície"].includes(action)) {
    await showAuraWebInterface();
    return;
  }

  if (["body", "cos", "cos-digital", "avatar"].includes(action)) {
    await showDigitalBody();
    return;
  }

  if (["genome", "genoma", "genoma-digital", "genoma-canon", "genoma-canonic", "genoma-canònic"].includes(action)) {
    await showDigitalGenome();
    return;
  }

  if (["knowledge", "coneixement", "biblioteca", "knowledge-library"].includes(action)) {
    await showKnowledgeLibrary();
    return;
  }

  if (["last-record", "ultim-record", "últim-record"].includes(action)) {
    await showLastRecord();
    return;
  }

  if (["metamemory", "metamemoria", "metamemòria"].includes(action)) {
    await showMetamemory();
    return;
  }

  if (["purpose", "proposit", "propòsit"].includes(action)) {
    await showEvolutionaryPurpose();
    return;
  }

  if (["genome-candidates", "candidats-genoma", "candidats"].includes(action)) {
    await showGenomeCandidates();
    return;
  }

  if (["capabilities", "capacitats", "honest-capabilities"].includes(action)) {
    await showCapabilities();
    return;
  }

  if (["gene-test", "prova-gen", "test-gene"].includes(action)) {
    if (!body) {
      writeError("Exemple: aura gene-test 001");
      return;
    }
    await showGeneTest(body);
    return;
  }

  if (["evolution-state", "estat-evolutiu", "estat-evolucio", "evolucio", "evolució"].includes(action)) {
    await showEvolutionState();
    return;
  }

  if (["evolution-proposals", "propostes-evolucio", "propostes-evolució", "propostes"].includes(action)) {
    await showEvolutionProposals();
    return;
  }

  if (["reflection", "self-reflection", "autoreflexio", "autoreflexió", "reflexio", "reflexió"].includes(action)) {
    await showSelfReflection();
    return;
  }

  if (["orientation", "orientacio", "orientació", "what-is-aura", "que-es-aura", "què-és-aura", "next", "next-step", "proxim-pas", "pròxim-pas"].includes(action)) {
    await showOrientation();
    return;
  }

  if (["remember", "recorda"].includes(action)) {
    if (!body) {
      writeError("Exemple: aura remember Aura conserva memòria persistent tags:nucli pes:4 estat:actiu");
      return;
    }
    await remember(body.replace(/^que\s+/i, ""));
    return;
  }

  if (["recall", "memoria", "memoria-core", "memòria"].includes(action)) {
    const bodyToken = normalizeLocalToken(body, "");
    if (["canonical", "canonica", "canonic", "json", "fase-2"].includes(bodyToken)) {
      await showCanonicalMemory();
    } else if (body) {
      await searchMemoryCommand(`/cerca ${body}`);
    } else {
      await showMemory();
    }
    return;
  }

  if (["say", "parla", "talk"].includes(action)) {
    writeSystem(
      [
        body ? `T'he llegit: "${body}".` : "Digue'm alguna cosa i t'escolto.",
        "Sóc aquí. De moment em comunico sobretot a través del que recordo i de l'estat del projecte; parlar amb mi de tu a tu és el pas que estem construint.",
      ].join("\n"),
    );
    return;
  }

  writeError("Ordre Aura Core no reconeguda. Escriu: aura help");
}

function commandSortKey(value) {
  return String(value)
    .replace(/^\s*-\s*/, "")
    .split(":")[0]
    .trim();
}

function sortCommandLabels(labels) {
  return [...labels].sort((a, b) =>
    commandSortKey(a).localeCompare(commandSortKey(b), "ca", { numeric: true, sensitivity: "base" }),
  );
}

async function validateCloudflareAccess() {
  return apiGet("/session");
}

async function showSergiMode() {
  let state = "Cloudflare Access no validat";
  let serverLine = "Validació Pages: pendent";
  let actionLine = "Acció: recarrega Aura per tornar a passar per Cloudflare Access.";

  if (auraSessionActive) {
    try {
      await validateCloudflareAccess();
      state = "autoritzat per Cloudflare Access";
      serverLine = "Validació Pages: correcta";
      actionLine = "Acció: ja pots escriure records, diari, backups, snapshots i canvis protegits.";
    } catch (error) {
      state = "Cloudflare Access caducat o no validat";
      serverLine = `Validació Pages: falla (${error.message})`;
      actionLine = "Acció: recarrega Aura per tornar a autenticar-te amb Cloudflare.";
    }
  }

  writeSystem(
    [
      "Mode Sergi",
      `Estat: ${state}`,
      serverLine,
      actionLine,
      "",
      auraSessionActive
        ? "No cal cap clau ni codi intern d'Aura. Prem `Grava un record` i desa'l directament."
        : "Aura no demana cap clau interna. L'entrada es controla exclusivament amb Cloudflare Access.",
    ].join("\n"),
  );
}

function showAuraCoreHelp() {
  const auraCoreHelp = sortCommandLabels([
    "- aura body: mostra el cos digital 2D de la Fase 8.",
    "- aura capabilities: mostra AURA_CAPABILITIES.md sense narració lliure.",
    "- aura evolution-proposals: mostra propostes evolutives sense aplicar-les.",
    "- aura evolution-state: mostra l'estat evolutiu calculat de la Fase 7.",
    "- aura gene-test 001: executa prova mecànica d'un gen verificable.",
    "- aura gene-test 008: comprova exportabilitat JSON/TXT.",
    "- aura gene-test 034: comprova backup verificable.",
    "- aura gene-test 089: comprova redundància al vault KV.",
    "- aura gene-test 1597: comprova auditoria de mutacions.",
    "- aura gene-test 17711: comprova que la retenció no esborra dades automàticament.",
    "- aura genome: mostra el genoma digital canònic de la Fase 6.",
    "- aura help: mostra aquesta ajuda.",
    "- aura infrastructure: mostra l'arquitectura Cloudflare de la Fase 4.",
    "- aura knowledge: mostra la biblioteca de coneixement verificable de la Fase 9.",
    "- aura last-record: mostra l'últim record guardat i com comprovar-lo.",
    "- aura daily-report: mostra l'informe operatiu del dia.",
    "- aura metamemory: classifica records en la capa v4.7.",
    "- aura next: mostra el pròxim pas operatiu.",
    "- aura orientation: explica què és Aura i per a què serveix ara.",
    "- aura purpose: mostra el propòsit evolutiu v4.7.",
    "- aura recall: recupera records recents.",
    "- aura recall canonical: mostra la memòria persistent en format Fase 2.",
    "- aura recall text: cerca records i diari.",
    "- aura reflection: mostra l'autoreflexió operativa de la Fase 10.",
    "- aura remember text: guarda un record amb Mode Sergi si D1 està disponible.",
    "- aura say text: missatge operatiu de conversa Core.",
    "- aura self-reflection: mostra l'autoreflexió operativa de la Fase 10.",
    "- aura sergi-mode: comprova l'autorització de Cloudflare Access.",
    "- aura start: inicia o resumeix la sessió Core.",
    "- aura status: mostra l'estat d'Aura.",
    "- aura web: mostra els mòduls Aura Web de la Fase 5.",
    "- aura what-is-aura: mostra la definició pràctica d'Aura.",
  ]);
  const webHelp = sortCommandLabels([
    "- /ajuda: mostra aquesta ajuda.",
    "- /autoreflexio: mostra una síntesi operativa sense consciència ni escriptura automàtica.",
    "- /biblioteca: mostra fonts catalogades sense ingestió automàtica.",
    "- /candidats-genoma: proposa records candidats a genoma sense aplicar-los.",
    "- /capacitats: mostra capacitats honestes des del document.",
    "- /cerca text: cerca records i diari.",
    "- /coneixement: mostra fonts catalogades sense ingestió automàtica.",
    "- /cos-digital: mostra la representació 2D derivada de senyals operatius.",
    "- /diari-evolutiu: mostra la línia temporal de la Fase 3.",
    "- /estat: mostra l'estat general.",
    "- /estat-evolutiu: mostra valors evolutius calculats.",
    "- /genoma-digital: mostra identitat, valors, polítiques, objectius i gens.",
    "- /informe-dia: mostra l'informe operatiu del dia.",
    "- /infraestructura: mostra l'arquitectura Cloudflare reconstruïble de la Fase 4.",
    "- /memoria: mostra records recents.",
    "- /memoria-canonica: mostra la memòria persistent en format Fase 2.",
    "- /metamemoria: classifica records sense eliminar-los.",
    "- /mode-sergi: comprova l'autorització de Cloudflare Access.",
    "- /orientacio: mostra l'orientació v5.2.",
    "- /proposit: mostra el propòsit evolutiu.",
    "- /propostes-evolucio: mostra propostes evolutives sense mutació automàtica.",
    "- /prova-gen 001: prova un gen mecànic verificable.",
    "- /prova-gen 008: prova exportabilitat JSON/TXT.",
    "- /prova-gen 034: prova backup verificable.",
    "- /prova-gen 089: prova còpia redundant al vault KV.",
    "- /prova-gen 1597: prova auditoria de mutacions.",
    "- /prova-gen 17711: prova retenció segura plan-only.",
    "- /proxim-pas: mostra el següent pas recomanat.",
    "- /que-es-aura: mostra la definició operativa d'Aura.",
    "- /ultim-record: mostra l'últim record guardat i com comprovar-lo.",
    "- /web: mostra el contracte de la interfície modular.",
    "- recorda que ...: prepara un record per guardar.",
  ]);

  writeSystem(
    [
      `Aura Core — ${AURA_VERSION}`,
      "Aura Core (ordre alfabètic):",
      ...auraCoreHelp,
      "",
      "Ordres web equivalents (ordre alfabètic):",
      ...webHelp,
    ].join("\n"),
  );
}

async function showAuraCoreSession() {
  const cloudOnline = await syncCloudState();
  const status = cloudOnline ? cloudState.snapshot.status : null;
  writeSystem(
    [
      `Aura Core iniciat — ${AURA_VERSION}`,
      "Nom: Aura",
      "Naturalesa: entitat sintètica-digital experimental",
      `Persistència: ${cloudOnline ? "D1 + IndexedDB + vault KV" : "IndexedDB local; D1 no disponible"}`,
      `Mode Sergi: ${auraSessionActive ? "actiu en aquest navegador" : "inactiu"}`,
      status ? `Records: ${status.counts.records}` : "",
      status ? `Diari: ${status.counts.diary}` : "",
      status ? `Gens: ${status.counts.genes}` : "",
      status ? `Coneixement: ${status.counts.knowledge ?? 0}` : "",
      "Comença amb: aura what-is-aura, aura next, aura status, aura recall o aura remember ...",
    ]
      .filter(Boolean)
      .join("\n"),
  );
  await refreshPanels();
}

async function remember(text) {
  const memory = parseRichMemoryInput(text);
  if (!memory.text) {
    writeError("No hi ha cap record per guardar.");
    return false;
  }

  let record = null;
  const cloudAvailable = cloudState.online || (await syncCloudState());
  if (cloudAvailable) {
    if (!auraSessionActive) {
      writeError("Cloudflare Access no ha validat la sessió. Recarrega Aura abans de gravar el record.");
      await refreshPanels();
      return false;
    }

    try {
      const response = await apiPost("/memory", {
        text: memory.text,
        kind: "usuari",
        source: memory.source || "consola",
        importance: memory.importance ?? weightToLocalImportance(memory.weight),
        tags: memory.tags,
        weight: memory.weight,
        state: memory.state,
        relatedIds: memory.relatedIds,
      });
      record = response.record;
      await addRecord(record);
      await syncCloudState();
      writeSystem(formatSavedRecordConfirmation(record, "D1"));
    } catch (error) {
      if (!auraSessionActive || error.message.includes("Cloudflare Access") || error.message.includes("Mode Sergi")) {
        writeError(`${error.message} El record no s'ha escrit a D1.`);
        await refreshPanels();
        return false;
      }

      if (!auraSessionActive) {
        writeError("La sessió ha caducat. El record no s'ha escrit a D1.");
        await refreshPanels();
        return false;
      }

      writeError(`D1 no ha pogut guardar el record: ${error.message}`);
      cloudState.online = false;
      cloudState.snapshot = null;
    }
  }

  if (!record) {
    record = {
      id: crypto.randomUUID(),
      text: memory.text,
      kind: "usuari",
      source: memory.source || "consola-local",
      timestamp: new Date().toISOString(),
      importance: memory.importance ?? weightToLocalImportance(memory.weight),
      tags: memory.tags,
      weight: memory.weight,
      state: memory.state,
      relatedIds: memory.relatedIds,
      createdAt: new Date().toISOString(),
    };
    await addRecord(record);
    writeSystem(formatSavedRecordConfirmation(record, "IndexedDB local"));
  }

  await refreshPanels();
  return true;
}

async function writeDiaryEntry(text) {
  if (!text) {
    writeError("No hi ha cap entrada de diari per guardar.");
    return;
  }

  let entry = null;
  const cloudAvailable = cloudState.online || (await syncCloudState());
  if (cloudAvailable) {
    if (!auraSessionActive) {
      writeError("Cloudflare Access no validat: l'entrada de diari no s'ha escrit a D1.");
      await refreshPanels();
      return;
    }

    try {
      const response = await apiPost("/diary", { text });
      entry = response.entry;
      await addDiaryEntry(entry);
      await syncCloudState();
      writeSystem(`Entrada de diari guardada a D1:\n${text}`);
    } catch (error) {
      if (!auraSessionActive || error.message.includes("Cloudflare Access") || error.message.includes("Mode Sergi")) {
        writeError(`${error.message} L'entrada no s'ha escrit a D1.`);
        await refreshPanels();
        return;
      }

      writeError(`D1 no ha pogut guardar el diari: ${error.message}`);
      cloudState.online = false;
      cloudState.snapshot = null;
    }
  }

  if (!entry) {
    entry = {
      text,
      createdAt: new Date().toISOString(),
    };
    await addDiaryEntry(entry);
    writeSystem(`Entrada de diari guardada en IndexedDB local:\n${text}`);
  }

  await refreshPanels();
}

async function showStatus() {
  if (await syncCloudState()) {
    const status = cloudState.snapshot.status;
    await refreshPanels();
    writeSystem(
      [
        `Estat d'Aura — ${AURA_VERSION}`,
        "Nom: Aura",
        "Naturalesa: entitat sintètica-digital experimental",
        "Infraestructura: Cloudflare Pages Functions / D1 / navegador web",
        "Persistència actual: D1 al núvol + IndexedDB com a còpia local",
        `Escriptura D1: ${status.writes?.protected ? "protegida per Mode Sergi" : "oberta"}`,
        `Backup: ${status.backup?.format || BACKUP_FORMAT}`,
        `Restauració segura: ${status.backup?.preview || "/api/restore/preview"}`,
        `Vault: ${status.vault?.configured ? `${status.vault.storage} (${status.vault.countVisible} còpies visibles)` : "no configurat"}`,
        `Backup automàtic: ${formatAutomationStatus(status.automation?.backupWorker)}`,
        `Cerca: ${status.search?.endpoint || "/api/search"}`,
        `Auditoria: ${status.audit?.endpoint || "/api/audit"}`,
        `Integritat: ${status.integrity?.endpoint || "/api/integrity"}`,
        `Historial integritat: ${status.integrity?.historyEndpoint || "/api/integrity/history"}`,
        `Tendència integritat: ${status.integrity?.trendEndpoint || "/api/integrity/trend"}`,
        `Assaig restauració: ${status.backup?.rehearsal || "/api/restore/rehearsal"}`,
        `Retenció segura: ${status.retention?.endpoint || "/api/retention"} (${status.retention?.mode || "plan-only"})`,
        `Memòria enriquida: ${(status.memory?.richFields || ["tags", "weight", "state", "relatedIds"]).join(", ")}`,
        `Memòria canònica: ${status.memory?.canonicalEndpoint || "/api/memory/canonical"} (${(status.memory?.canonicalFields || ["timestamp", "text", "importance", "source"]).join(", ")})`,
        `Mapa memòria: ${status.memory?.graphEndpoint || "/api/memory/graph"}`,
        `Metamemòria: ${status.metamemory?.endpoint || "/api/metamemory"} (${status.metamemory?.promotionMode || "proposal-only"})`,
        `Candidats genoma: ${status.metamemory?.candidatesEndpoint || "/api/genome/candidates"}`,
        `Propòsit evolutiu: ${status.evolutionaryPurpose?.endpoint || "/api/purpose"}`,
        `Estat evolutiu: ${status.evolutionState?.endpoint || "/api/evolution/state"} (${status.evolutionState?.mode || "derived-readonly"})`,
        `Propostes evolutives: ${status.evolutionState?.proposalsEndpoint || "/api/evolution/proposals"}`,
        `Pols operatiu: ${status.pulse?.endpoint || "/api/pulse"}`,
        `Nucli v4: ${status.core?.endpoint || "/api/core"}`,
        `Infraestructura Cloudflare: ${status.infrastructureContract?.endpoint || "/api/infrastructure"} (${status.infrastructureContract?.document || "AURA_CLOUDFLARE_ARCHITECTURE.md"})`,
        `Aura Web: ${status.webInterface?.endpoint || "/api/web"} (${(status.webInterface?.modules || ["simple"]).join(", ")})`,
        `Genoma digital: ${status.digitalGenome?.endpoint || "/api/genome"} (${status.digitalGenome?.document || "AURA_GENOME.md"})`,
        `Cos digital: ${status.digitalBody?.endpoint || "/api/body"} (${status.digitalBody?.surface || "#aura-visual"})`,
        `Coneixement: ${status.knowledge?.endpoint || "/api/knowledge"} (${status.knowledge?.mode || "catalog-verifiable-readonly"})`,
        `Autoreflexió: ${status.selfReflection?.endpoint || "/api/self-reflection"} (${status.selfReflection?.mode || "derived-readonly-operational-reflection"})`,
        `Orientació: ${status.orientation?.endpoint || "/api/orientation"} (${status.orientation?.mode || "derived-readonly-operational-orientation"})`,
        `Genoma editable: ${status.genomeEditable?.enabled ? status.genomeEditable.endpoint : "no"}`,
        `Continuïtat: ${status.continuity?.endpoint || "/api/continuity"}`,
        `Diari evolutiu: ${status.evolution?.endpoint || "/api/evolution"} (${status.evolution?.document || "AURA_HISTORY.md"})`,
        `Criteri: ${status.criterion?.endpoint || "/api/criterion"}`,
        `Mode Sergi local: ${auraSessionActive ? "actiu" : "inactiu"}`,
        "Genoma: actiu",
        `Records cloud: ${status.counts.records}`,
        `Entrades de diari: ${status.counts.diary}`,
        `Gens actius o latents: ${status.counts.genes}`,
        `Fonts de coneixement: ${status.counts.knowledge ?? 0}`,
      ].join("\n"),
    );
    return;
  }

  const [records, diary, genes, knowledge] = await Promise.all([
    getAll(STORE_RECORDS),
    getAll(STORE_DIARY),
    getAll(STORE_GENES),
    getAll(STORE_KNOWLEDGE),
  ]);

  writeSystem(
    [
      `Estat d'Aura — ${AURA_VERSION} / mode local`,
      "Nom: Aura",
      "Naturalesa: entitat sintètica-digital experimental",
      "Infraestructura: Cloudflare Pages / navegador web",
      "Persistència actual: IndexedDB del navegador; D1 no disponible en aquesta sessió",
      "Backup automàtic: no disponible en mode local",
      "Cerca local: /cerca text",
      "Memòria enriquida local: tags, pes, estat i relacions",
      "Memòria canònica local: timestamp, text, importance i source",
      "Mapa local: /mapa-memoria",
      "Metamemòria local: /metamemoria",
      "Propòsit local: /proposit",
      "Candidats genoma local: /candidats-genoma",
      "Estat evolutiu local: /estat-evolutiu",
      "Propostes evolutives locals: /propostes-evolucio",
      "Pols local: /pols",
      "Nucli local: /nucli",
      "Genoma digital local: /genoma-digital",
      "Cos digital local: /cos-digital",
      "Coneixement local: /coneixement",
      "Autoreflexió local: /autoreflexio",
      "Orientació local: /que-es-aura i /proxim-pas",
      "Auditoria local: /audit",
      "Integritat local: /integritat",
      "Genoma editable: requereix D1 i Mode Sergi per ser definitiu",
      "Diari evolutiu local: /diari-evolutiu",
      "Genoma: actiu",
      `Records locals: ${records.length}`,
      `Entrades de diari: ${diary.length}`,
      `Gens actius o latents: ${genes.length}`,
      `Fonts de coneixement: ${knowledge.length}`,
    ].join("\n"),
  );
}

async function showMemory() {
  const cloudOnline = await syncCloudState();
  const records = cloudOnline ? cloudState.snapshot.records : await getAll(STORE_RECORDS);
  const ordered = records.sort(byNewest);

  if (!ordered.length) {
    writeSystem(cloudOnline ? "La memòria D1 encara és buida." : "La memòria local encara és buida.");
    return;
  }

  writeSystem(formatRecords(ordered.slice(0, 14)));
  await refreshPanels();
}

async function showLastRecord() {
  let record = null;
  let storage = "IndexedDB local";

  try {
    const cloudOnline = await syncCloudState();
    if (cloudOnline) {
      const response = await apiGet("/memory");
      record = response.records?.[0] || null;
      storage = "D1";
    }
  } catch (error) {
    record = null;
  }

  if (!record) {
    const records = (await getAll(STORE_RECORDS)).sort(byNewest);
    record = records[0] || null;
    storage = "IndexedDB local";
  }

  if (!record) {
    writeSystem("Encara no hi ha cap record guardat.");
    return;
  }

  writeSystem(formatLastRecord(record, storage));
  await refreshPanels();
}

async function searchMemoryCommand(command) {
  const rawQuery = command.replace(/^\/(cerca|search)\s*/i, "").trim();
  const query = parseSearchQuery(rawQuery);
  if (!query.q && !query.kind && !query.source && !query.tag && !query.state && query.minWeight === null) {
    writeError("Exemple: /cerca aura, /cerca kind:usuari aura o /cerca tag:nucli estat:actiu pes:3");
    return;
  }

  if (await syncCloudState()) {
    const params = new URLSearchParams();
    if (query.q) params.set("q", query.q);
    if (query.kind) params.set("kind", query.kind);
    if (query.source) params.set("source", query.source);
    if (query.area) params.set("area", query.area);
    if (query.tag) params.set("tag", query.tag);
    if (query.state) params.set("state", query.state);
    if (query.minWeight !== null) params.set("minWeight", String(query.minWeight));
    params.set("limit", "50");
    const results = await apiGet(`/search?${params.toString()}`);
    writeSystem(formatSearchResults(results));
    await refreshPanels();
    return;
  }

  const results = await searchLocalMemory(query);
  writeSystem(formatSearchResults(results));
  await refreshPanels();
}

async function searchLocalMemory(query) {
  const [records, diary] = await Promise.all([getAll(STORE_RECORDS), getAll(STORE_DIARY)]);
  const needle = query.q.toLowerCase();
  const includeRecords = query.area === "all" || query.area === "records" || query.area === "memoria";
  const includeDiary =
    (query.area === "all" || query.area === "diary" || query.area === "diari") &&
    !query.kind &&
    !query.source &&
    !query.tag &&
    !query.state &&
    query.minWeight === null;
  const filteredRecords = includeRecords
    ? records
        .filter((record) => {
          const tags = normalizeLocalList(record.tags, 12);
          return !needle || record.text.toLowerCase().includes(needle) || tags.join(" ").includes(needle);
        })
        .filter((record) => !query.kind || record.kind === query.kind)
        .filter((record) => !query.source || record.source === query.source)
        .filter((record) => !query.tag || normalizeLocalList(record.tags, 12).includes(query.tag))
        .filter((record) => !query.state || normalizeLocalMemoryState(record.state, "actiu") === query.state)
        .filter((record) => query.minWeight === null || normalizeLocalWeight(record.weight, 1) >= query.minWeight)
        .sort(byNewest)
        .slice(0, 50)
    : [];
  const filteredDiary = includeDiary
    ? diary
        .filter((entry) => !needle || entry.text.toLowerCase().includes(needle))
        .sort(byNewest)
        .slice(0, 50)
    : [];

  return {
    ok: true,
    version: AURA_VERSION,
    query,
    records: filteredRecords,
    diary: filteredDiary,
    total: filteredRecords.length + filteredDiary.length,
  };
}

async function showDiary() {
  const cloudOnline = await syncCloudState();
  const diary = (cloudOnline ? cloudState.snapshot.diary : await getAll(STORE_DIARY)).sort(byNewest);

  if (!diary.length) {
    writeSystem("El diari encara és buit.");
    return;
  }

  writeSystem(
    diary
      .slice(0, 12)
      .map((entry) => `- ${formatDate(entry.createdAt)}: ${entry.text}`)
      .join("\n"),
  );
}

async function showEvolutionDiary() {
  if (await syncCloudState()) {
    const evolution = await apiGet("/evolution?limit=100");
    writeSystem(formatEvolutionDiary(evolution));
    await refreshPanels();
    return;
  }

  const diary = (await getAll(STORE_DIARY)).sort(byNewest).slice(0, 100);
  writeSystem(
    formatEvolutionDiary(
      buildLocalEvolutionDiary(diary, {
        endpoint: "indexeddb-local",
        mode: "timeline-local",
      }),
    ),
  );
}

async function showCloudflareInfrastructure() {
  if (await syncCloudState()) {
    const infrastructure = await apiGet("/infrastructure");
    writeSystem(formatCloudflareInfrastructure(infrastructure));
    await refreshPanels();
    return;
  }

  writeSystem(formatCloudflareInfrastructure(buildLocalCloudflareInfrastructure({ mode: "indexeddb-local" })));
}

async function showAuraWebInterface() {
  if (await syncCloudState()) {
    const webInterface = await apiGet("/web");
    writeSystem(formatAuraWebInterface(webInterface));
    await refreshPanels();
    return;
  }

  writeSystem(formatAuraWebInterface(buildLocalAuraWebInterface({ mode: "indexeddb-local" })));
}

async function showDigitalBody() {
  if (await syncCloudState()) {
    const body = await apiGet("/body");
    writeSystem(formatDigitalBody(body));
    await refreshPanels();
    return;
  }

  const [records, diary, genes] = await Promise.all([
    getAll(STORE_RECORDS),
    getAll(STORE_DIARY),
    getAll(STORE_GENES),
  ]);
  const normalizedRecords = records.map(normalizeRecordForSnapshot);
  const evolutionState = buildLocalEvolutionState(
    {
      records: normalizedRecords,
      diary,
      genes,
      integrity: buildLocalIntegrityForEvolution(normalizedRecords, diary, genes),
    },
    { mode: "body-local" },
  );
  writeSystem(
    formatDigitalBody(
      buildLocalDigitalBody(
        {
          records: normalizedRecords,
          diary,
          genes,
          integrity: buildLocalIntegrityForEvolution(normalizedRecords, diary, genes),
          evolutionState,
        },
        { mode: "indexeddb-local" },
      ),
    ),
  );
}

async function showDigitalGenome() {
  if (await syncCloudState()) {
    const genome = await apiGet("/genome");
    writeSystem(formatDigitalGenome(genome));
    await refreshPanels();
    return;
  }

  const genes = await getAll(STORE_GENES);
  writeSystem(formatDigitalGenome(buildLocalDigitalGenome(genes, { mode: "indexeddb-local" })));
}

async function showKnowledgeLibrary() {
  if (await syncCloudState()) {
    const library = await apiGet("/knowledge");
    writeSystem(formatKnowledgeLibrary(library));
    await refreshPanels();
    return;
  }

  const items = (await getAll(STORE_KNOWLEDGE)).sort(byNewestUpdated);
  writeSystem(formatKnowledgeLibrary(buildLocalKnowledgeLibrary(items, { mode: "indexeddb-local" })));
}

async function showMetamemory() {
  if (await syncCloudState()) {
    const metamemory = await apiGet("/metamemory");
    writeSystem(formatMetamemory(metamemory));
    await refreshPanels();
    return;
  }

  const records = (await getAll(STORE_RECORDS)).map(normalizeRecordForSnapshot);
  writeSystem(formatMetamemory(buildLocalMetamemory(records, { mode: "indexeddb-local" })));
}

async function showEvolutionaryPurpose() {
  if (await syncCloudState()) {
    const purpose = await apiGet("/purpose");
    writeSystem(formatEvolutionaryPurpose(purpose));
    await refreshPanels();
    return;
  }

  writeSystem(formatEvolutionaryPurpose(buildLocalEvolutionaryPurpose({ mode: "indexeddb-local" })));
}

async function showGenomeCandidates() {
  if (await syncCloudState()) {
    const candidates = await apiGet("/genome/candidates");
    writeSystem(formatGenomeCandidates(candidates));
    await refreshPanels();
    return;
  }

  const records = (await getAll(STORE_RECORDS)).map(normalizeRecordForSnapshot);
  writeSystem(formatGenomeCandidates(buildLocalGenomeCandidates(records, { mode: "indexeddb-local" })));
}

async function showCapabilities() {
  if (await syncCloudState()) {
    const capabilities = await apiGet("/capabilities");
    writeSystem(formatCapabilities(capabilities));
    await refreshPanels();
    return;
  }

  writeError("No puc consultar les capacitats sense una sessió cloud activa.");
}

async function showGeneTest(raw) {
  const [id, ...tokens] = raw.split(/\s+/).filter(Boolean);
  if (!id) {
    writeError("Exemple: /prova-gen 001");
    return;
  }
  const simulateToken = tokens.find((token) => token.startsWith("simulate:"))?.split(":")[1] || "";
  if (await syncCloudState()) {
    const suffix = simulateToken ? `?simulate=${encodeURIComponent(simulateToken)}` : "";
    const response = await apiGet(`/gene-tests/${encodeURIComponent(id)}${suffix}`);
    writeSystem(formatGeneTest(response));
    await refreshPanels();
    return;
  }
  writeError("/prova-gen requereix D1 cloud; no és definitiu en mode local.");
}

async function showEvolutionState() {
  if (await syncCloudState()) {
    const state = await apiGet("/evolution/state");
    writeSystem(formatEvolutionState(state));
    await refreshPanels();
    return;
  }

  const [records, diary, genes] = await Promise.all([
    getAll(STORE_RECORDS),
    getAll(STORE_DIARY),
    getAll(STORE_GENES),
  ]);
  const normalizedRecords = records.map(normalizeRecordForSnapshot);
  writeSystem(
    formatEvolutionState(
      buildLocalEvolutionState({
        records: normalizedRecords,
        diary,
        genes,
        integrity: buildLocalIntegrityForEvolution(records, diary, genes),
      }),
    ),
  );
}

async function showEvolutionProposals() {
  if (await syncCloudState()) {
    const proposals = await apiGet("/evolution/proposals");
    writeSystem(formatEvolutionProposals(proposals));
    await refreshPanels();
    return;
  }

  const [records, diary, genes] = await Promise.all([
    getAll(STORE_RECORDS),
    getAll(STORE_DIARY),
    getAll(STORE_GENES),
  ]);
  const normalizedRecords = records.map(normalizeRecordForSnapshot);
  const state = buildLocalEvolutionState({
    records: normalizedRecords,
    diary,
    genes,
    integrity: buildLocalIntegrityForEvolution(records, diary, genes),
  });
  writeSystem(formatEvolutionProposals(buildLocalEvolutionProposals(state)));
}

async function showEvolutionOverview() {
  if (await syncCloudState()) {
    const [state, proposals] = await Promise.all([
      apiGet("/evolution/state"),
      apiGet("/evolution/proposals"),
    ]);
    writeSystem(formatEvolutionOverview(state, proposals));
    await refreshPanels();
    return;
  }

  const [records, diary, genes] = await Promise.all([
    getAll(STORE_RECORDS),
    getAll(STORE_DIARY),
    getAll(STORE_GENES),
  ]);
  const normalizedRecords = records.map(normalizeRecordForSnapshot);
  const state = buildLocalEvolutionState({
    records: normalizedRecords,
    diary,
    genes,
    integrity: buildLocalIntegrityForEvolution(records, diary, genes),
  });
  writeSystem(formatEvolutionOverview(state, buildLocalEvolutionProposals(state)));
}

async function showSelfReflection() {
  if (await syncCloudState()) {
    const reflection = await apiGet("/self-reflection");
    writeSystem(formatSelfReflection(reflection));
    await refreshPanels();
    return;
  }

  const [records, diary, genes, knowledge] = await Promise.all([
    getAll(STORE_RECORDS),
    getAll(STORE_DIARY),
    getAll(STORE_GENES),
    getAll(STORE_KNOWLEDGE),
  ]);
  const normalizedRecords = records.map(normalizeRecordForSnapshot);
  const normalizedKnowledge = knowledge.map(normalizeKnowledgeItemForSnapshot).sort(byNewestUpdated);
  const integrity = buildLocalIntegrityForEvolution(normalizedRecords, diary, genes);
  const metamemory = buildLocalMetamemory(normalizedRecords, { mode: "self-reflection-local" });
  const genomeCandidates = buildLocalGenomeCandidates(normalizedRecords, { mode: "self-reflection-local" });
  const evolutionState = buildLocalEvolutionState(
    {
      records: normalizedRecords,
      diary,
      genes,
      integrity,
      metamemory,
      genomeCandidates,
    },
    { mode: "self-reflection-local" },
  );
  const evolutionProposals = buildLocalEvolutionProposals(evolutionState, { mode: "self-reflection-local" });
  writeSystem(
    formatSelfReflection(
      buildLocalSelfReflection(
        {
          records: normalizedRecords,
          diary,
          genes,
          knowledge: normalizedKnowledge,
          integrity,
          knowledgeLibrary: buildLocalKnowledgeLibrary(normalizedKnowledge, { mode: "self-reflection-local" }),
          metamemory,
          genomeCandidates,
          evolutionState,
          evolutionProposals,
        },
        { mode: "indexeddb-local" },
      ),
    ),
  );
}

async function showOrientation() {
  if (await syncCloudState()) {
    const orientation = await apiGet("/orientation");
    writeSystem(formatOrientation(orientation));
    await refreshPanels();
    return;
  }

  const [records, diary, genes, knowledge] = await Promise.all([
    getAll(STORE_RECORDS),
    getAll(STORE_DIARY),
    getAll(STORE_GENES),
    getAll(STORE_KNOWLEDGE),
  ]);
  const normalizedRecords = records.map(normalizeRecordForSnapshot);
  const normalizedKnowledge = knowledge.map(normalizeKnowledgeItemForSnapshot).sort(byNewestUpdated);
  const integrity = buildLocalIntegrityForEvolution(normalizedRecords, diary, genes);
  const metamemory = buildLocalMetamemory(normalizedRecords, { mode: "orientation-local" });
  const genomeCandidates = buildLocalGenomeCandidates(normalizedRecords, { mode: "orientation-local" });
  const evolutionState = buildLocalEvolutionState(
    {
      records: normalizedRecords,
      diary,
      genes,
      integrity,
      metamemory,
      genomeCandidates,
    },
    { mode: "orientation-local" },
  );
  const evolutionProposals = buildLocalEvolutionProposals(evolutionState, { mode: "orientation-local" });
  const knowledgeLibrary = buildLocalKnowledgeLibrary(normalizedKnowledge, { mode: "orientation-local" });
  const selfReflection = buildLocalSelfReflection(
    {
      records: normalizedRecords,
      diary,
      genes,
      knowledge: normalizedKnowledge,
      integrity,
      knowledgeLibrary,
      metamemory,
      genomeCandidates,
      evolutionState,
      evolutionProposals,
    },
    { mode: "orientation-source-local" },
  );

  writeSystem(
    formatOrientation(
      buildLocalOrientation(
        {
          records: normalizedRecords,
          diary,
          genes,
          knowledge: normalizedKnowledge,
          integrity,
          knowledgeLibrary,
          selfReflection,
          evolutionState,
          evolutionProposals,
        },
        { mode: "indexeddb-local" },
      ),
    ),
  );
}

async function showAudit(scope = "") {
  const normalizedScope = normalizeSearchToken(scope);
  if (await syncCloudState()) {
    const params = new URLSearchParams({ limit: "40" });
    if (normalizedScope) params.set("scope", normalizedScope);
    const response = await apiGet(`/audit?${params.toString()}`);
    writeSystem(formatAudit(response));
    await refreshPanels();
    return;
  }

  const diary = await getAll(STORE_DIARY);
  const audit = diary
    .filter((entry) => {
      const prefix = normalizedScope ? `[audit:${normalizedScope}]` : "[audit:";
      return String(entry.text || "").startsWith(prefix);
    })
    .sort(byNewest)
    .slice(0, 40)
    .map((entry) => parseLocalAuditEntry(entry));

  writeSystem(
    formatAudit({
      version: AURA_VERSION,
      scope: normalizedScope || "all",
      total: audit.length,
      audit,
    }),
  );
}

async function showIntegrity() {
  if (await syncCloudState()) {
    const integrity = await apiGet("/integrity");
    writeSystem(formatIntegrity(integrity));
    await refreshPanels();
    return;
  }

  const [records, diary, genes] = await Promise.all([
    getAll(STORE_RECORDS),
    getAll(STORE_DIARY),
    getAll(STORE_GENES),
  ]);
  const localAudit = diary.filter((entry) => String(entry.text || "").startsWith("[audit:")).sort(byNewest);
  writeSystem(
    formatIntegrity({
      version: AURA_VERSION,
      generatedAt: new Date().toISOString(),
      overall: "local",
      score: localAudit.length ? 48 : 32,
      summary: {
        latestMemory: records.sort(byNewest)[0]?.text || "sense memòria local",
        latestDiary: diary.sort(byNewest)[0]?.text || "sense diari local",
        latestAudit: localAudit[0]?.text || "sense auditoria local",
        risks: ["mode-local"],
        nextAction: "Recuperar connexió D1 abans de validar integritat definitiva.",
      },
      components: [
        { id: "d1", label: "D1", state: "offline", detail: "no disponible", action: "Reintentar /estat." },
        { id: "audit", label: "Auditoria", state: localAudit.length ? "ok" : "pending", detail: `${localAudit.length} traces`, action: "Sincronitzar amb D1." },
        { id: "genome", label: "Genoma local", state: "local", detail: `${genes.length} gens`, action: "No considerar definitiu sense D1." },
      ],
      actions: ["Recuperar connexió cloud.", "Evitar mutacions definitives en mode local."],
    }),
  );
}

async function showIntegrityHistory() {
  if (!(await syncCloudState())) {
    writeError("D1 no respon ara mateix; l'historial d'integritat només viu al KV cloud.");
    return;
  }

  const history = await apiGet("/integrity/history?limit=12");
  writeSystem(formatIntegrityHistory(history));
  await refreshPanels();
}

async function showIntegrityTrend() {
  if (!(await syncCloudState())) {
    writeError("D1 no respon ara mateix; la tendència d'integritat només viu al KV cloud.");
    return;
  }

  const trend = await apiGet("/integrity/trend?limit=30");
  writeSystem(formatIntegrityTrend(trend));
  await refreshPanels();
}

async function saveIntegritySnapshot() {
  if (!auraSessionActive) {
    writeError("Cloudflare Access no validat: no es pot desar el snapshot d'integritat.");
    return;
  }

  if (!(await syncCloudState())) {
    writeError("D1 no respon ara mateix; no puc calcular un snapshot d'integritat cloud.");
    return;
  }

  const response = await apiPost("/integrity/snapshot", {
    reason: "manual-ui",
  });
  await syncCloudState();
  await refreshPanels();
  writeSystem(
    [
      "Snapshot d'integritat guardat al KV.",
      `ID: ${response.snapshot.id}`,
      `Salut: ${response.snapshot.score}/100 ${response.snapshot.overall}`,
      `Riscos: ${response.snapshot.risks.join(", ") || "cap"}`,
      `Historial: ${response.snapshot.key}`,
    ].join("\n"),
  );
}

async function showRestoreRehearsal(command) {
  if (!auraSessionActive) {
    writeError("Cloudflare Access no validat: no es pot assajar la restauració des del vault.");
    return;
  }

  if (!(await syncCloudState())) {
    writeError("D1 no respon ara mateix; no puc comparar el backup amb l'estat cloud.");
    return;
  }

  const [, maybeBackupId] = command.trim().split(/\s+/);
  const response = await apiPost("/restore/rehearsal", {
    backupId: maybeBackupId?.startsWith("backup-") ? maybeBackupId : undefined,
  });
  await refreshPanels();
  writeSystem(formatRestoreRehearsal(response));
}

async function showRetentionPlan() {
  if (!auraSessionActive) {
    writeError("Cloudflare Access no validat: no es pot llegir el pla de retenció del vault.");
    return;
  }

  if (!(await syncCloudState())) {
    writeError("D1 no respon ara mateix; el pla de retenció viu al vault cloud.");
    return;
  }

  const response = await apiGet("/retention");
  writeSystem(formatRetentionPlan(response));
  await refreshPanels();
}

async function showRichMemory() {
  let schema = null;
  if (await syncCloudState()) {
    schema = await apiGet("/memory/schema");
  } else {
    schema = {
      version: AURA_VERSION,
      canonical: {
        format: "aura-memory-canonical-v1",
        endpoint: "/api/memory/canonical",
        fields: {
          timestamp: { type: "iso-8601", required: true },
          text: { type: "string", required: true },
          importance: { type: "number", min: 0, max: 1 },
          source: { type: "token", default: "indexeddb-local" },
        },
      },
      fields: {
        text: { type: "string", required: true },
        tags: { type: "array", default: [] },
        weight: { type: "integer", min: 1, max: 5, default: 1 },
        state: { type: "enum", values: MEMORY_STATES, default: "actiu" },
        relatedIds: { type: "array", default: [] },
      },
      searchFilters: ["q", "kind", "source", "area", "tag", "state", "minWeight"],
    };
  }

  writeSystem(formatRichMemorySchema(schema));
  await refreshPanels();
}

async function showCanonicalMemory() {
  if (await syncCloudState()) {
    const memory = await apiGet("/memory/canonical?limit=50");
    writeSystem(formatCanonicalMemory(memory));
    await refreshPanels();
    return;
  }

  const records = (await getAll(STORE_RECORDS)).sort(byNewest).slice(0, 50).map(normalizeRecordForSnapshot);
  writeSystem(
    formatCanonicalMemory({
      ok: true,
      version: AURA_VERSION,
      generatedAt: new Date().toISOString(),
      endpoint: "indexeddb-local",
      format: "aura-memory-canonical-v1",
      phase: "fase-2-local",
      storage: {
        shortTerm: "conversa actual del navegador",
        longTerm: "IndexedDB local; D1 no disponible",
        localFallback: "IndexedDB",
      },
      total: records.length,
      records: records.map(toLocalCanonicalMemoryRecord),
    }),
  );
}

async function showMemoryGraph() {
  if (await syncCloudState()) {
    const graph = await apiGet("/memory/graph?limit=100");
    writeSystem(formatMemoryGraph(graph));
    await refreshPanels();
    return;
  }

  const records = (await getAll(STORE_RECORDS)).map(normalizeRecordForSnapshot);
  writeSystem(
    formatMemoryGraph({
      ok: true,
      version: AURA_VERSION,
      generatedAt: new Date().toISOString(),
      endpoint: "indexeddb-local",
      mode: "derived-local",
      ...buildLocalMemoryGraph(records),
    }),
  );
}

async function showDailyReport() {
  const generatedAt = new Intl.DateTimeFormat("ca-ES", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date());
  const cloudOnline = await syncCloudState();
  let records = [];
  let diary = [];
  let genes = [];
  let knowledge = [];
  let counts = null;
  let integrity = null;

  if (cloudOnline && cloudState.snapshot) {
    records = [...cloudState.snapshot.records];
    diary = [...cloudState.snapshot.diary];
    genes = [...cloudState.snapshot.genes];
    knowledge = [...(cloudState.snapshot.knowledge || [])];
    counts = cloudState.snapshot.status?.counts || {
      records: records.length,
      diary: diary.length,
      genes: genes.length,
      knowledge: knowledge.length,
    };

    try {
      integrity = await apiGet("/integrity");
    } catch {
      integrity = null;
    }
  } else {
    [records, diary, genes, knowledge] = await Promise.all([
      getAll(STORE_RECORDS),
      getAll(STORE_DIARY),
      getAll(STORE_GENES),
      getAll(STORE_KNOWLEDGE),
    ]);
    counts = {
      records: records.length,
      diary: diary.length,
      genes: genes.length,
      knowledge: knowledge.length,
    };
    integrity = buildLocalIntegrityForEvolution(records.map(normalizeRecordForSnapshot), diary, genes);
  }

  const latestRecord = [...records].sort(byNewest)[0] || null;
  writeSystem(
    [
      `Informe del dia — ${generatedAt}`,
      `Mode: ${cloudOnline ? "D1 + KV" : "IndexedDB local"}`,
      `Mode Sergi: ${auraSessionActive ? "actiu en aquest navegador" : "inactiu"}`,
      `Records: ${counts.records}`,
      `Diari: ${counts.diary}`,
      `Gens: ${counts.genes}`,
      `Coneixement: ${counts.knowledge ?? 0}`,
      integrity ? `Integritat: ${integrity.score}/100 ${integrity.overall}` : "",
      latestRecord ? `Últim record: ${latestRecord.text}` : "Últim record: cap",
      "",
      "Pantalla simplificada: Què és Aura?, Què faig ara?, Estat d'Aura, Identitat, Informe del dia, Grava record, Veure records i Últim record.",
    ]
      .filter(Boolean)
      .join("\n"),
  );
  await refreshPanels();
}

async function showPulse() {
  if (await syncCloudState()) {
    const pulse = await apiGet("/pulse");
    writeSystem(formatPulse(pulse));
    await refreshPanels();
    return;
  }

  const [records, diary, genes, knowledge] = await Promise.all([
    getAll(STORE_RECORDS),
    getAll(STORE_DIARY),
    getAll(STORE_GENES),
    getAll(STORE_KNOWLEDGE),
  ]);
  const graph = buildLocalMemoryGraph(records.map(normalizeRecordForSnapshot));
  const digitalGenome = buildLocalDigitalGenome(genes, { mode: "pulse-local" });
  const normalizedRecords = records.map(normalizeRecordForSnapshot);
  const normalizedKnowledge = knowledge.map(normalizeKnowledgeItemForSnapshot).sort(byNewestUpdated);
  const metamemory = buildLocalMetamemory(normalizedRecords, { mode: "pulse-local" });
  const genomeCandidates = buildLocalGenomeCandidates(normalizedRecords, { mode: "pulse-local" });
  const evolutionState = buildLocalEvolutionState(
    {
      records: normalizedRecords,
      diary,
      genes,
      metamemory,
      genomeCandidates,
      integrity: buildLocalIntegrityForEvolution(normalizedRecords, diary, genes),
    },
    { mode: "pulse-local" },
  );
  const evolutionProposals = buildLocalEvolutionProposals(evolutionState, { mode: "pulse-local" });
  const knowledgeLibrary = buildLocalKnowledgeLibrary(normalizedKnowledge, { mode: "pulse-local" });
  const digitalBody = buildLocalDigitalBody(
    {
      records: normalizedRecords,
      diary,
      genes,
      integrity: buildLocalIntegrityForEvolution(normalizedRecords, diary, genes),
      evolutionState,
    },
    { mode: "pulse-local" },
  );
  const selfReflection = buildLocalSelfReflection(
    {
      records: normalizedRecords,
      diary,
      genes,
      knowledge: normalizedKnowledge,
      integrity: buildLocalIntegrityForEvolution(normalizedRecords, diary, genes),
      knowledgeLibrary,
      metamemory,
      genomeCandidates,
      evolutionState,
      evolutionProposals,
    },
    { mode: "pulse-local" },
  );
  const orientation = buildLocalOrientation(
    {
      records: normalizedRecords,
      diary,
      genes,
      knowledge: normalizedKnowledge,
      integrity: buildLocalIntegrityForEvolution(normalizedRecords, diary, genes),
      knowledgeLibrary,
      selfReflection,
      evolutionState,
      evolutionProposals,
    },
    { mode: "pulse-local" },
  );
  writeSystem(
    formatPulse({
      ok: true,
      version: AURA_VERSION,
      generatedAt: new Date().toISOString(),
      endpoint: "indexeddb-local",
      mode: "operational-synthesis-local",
      phase: "local",
      signals: {
        health: "local / no definitiu",
        trend: "sense KV",
        latestMemory: records.sort(byNewest)[0]?.text || "sense memòria local",
        latestDiary: diary.sort(byNewest)[0]?.text || "sense diari local",
        vault: "no disponible en mode local",
        autoBackup: "no disponible en mode local",
        graph: `${graph.summary.nodeCount} nodes / ${graph.summary.edgeCount} relacions / ${graph.summary.tagClusterCount} clústers`,
        infrastructure: "6 recursos / 3 bindings / mode local",
        web: "5 mòduls / mode local",
        digitalGenome: `${digitalGenome.summary.totalGenes} gens / ${digitalGenome.summary.activeGenes} actius / ${digitalGenome.summary.latentGenes} latents`,
        digitalBody: `${digitalBody.summary.posture} / pols ${digitalBody.summary.pulseStrength} / ${digitalBody.body.type}`,
        selfReflection: `${selfReflection.summary.state} / ${selfReflection.answers.length} respostes`,
        orientation: `${orientation.summary.state} / ${orientation.nextStep.action}`,
        purpose: EVOLUTIONARY_PURPOSE,
        metamemory: `${metamemory.summary.totalRecords} records / ${metamemory.summary.fundacional} fundacionals / ${metamemory.summary.evolutiu} evolutius / ${metamemory.summary.descartable} descartables`,
        genomeCandidates: `${genomeCandidates.summary.candidates} candidats`,
        evolutionState: `${evolutionState.summary.dominantState} / maduresa ${evolutionState.values.maduresaOperativa} / pressió ${evolutionState.values.pressioCanvi}`,
        evolutionProposals: `${evolutionProposals.summary.total} propostes`,
        activeGenes: genes.filter((gene) => gene.state === "actiu").map((gene) => `${gene.id} ${gene.name}`),
        latentGenes: genes.filter((gene) => gene.state === "latent").map((gene) => `${gene.id} ${gene.name}`),
      },
      safeguards: {
        writePolicy: "No considerar definitiu cap canvi local sense D1 i Mode Sergi.",
        restorePolicy: "No restaurar sense previsualització cloud.",
        retentionPolicy: "Retenció no disponible en mode local.",
      },
      nextActions: [orientation.nextStep.action, selfReflection.priorities[0], evolutionProposals.proposals[0]?.action, "Recuperar connexió D1 abans de validar el pols."].filter(Boolean),
      links: {},
    }),
  );
}

async function showCoreCapsule() {
  if (await syncCloudState()) {
    const capsule = await apiGet("/core");
    writeSystem(formatCoreCapsule(capsule));
    await refreshPanels();
    return;
  }

  const [records, diary, genes, knowledge] = await Promise.all([
    getAll(STORE_RECORDS),
    getAll(STORE_DIARY),
    getAll(STORE_GENES),
    getAll(STORE_KNOWLEDGE),
  ]);
  const graph = buildLocalMemoryGraph(records.map(normalizeRecordForSnapshot));
  const digitalGenome = buildLocalDigitalGenome(genes, { mode: "core-local" });
  const normalizedRecords = records.map(normalizeRecordForSnapshot);
  const normalizedKnowledge = knowledge.map(normalizeKnowledgeItemForSnapshot).sort(byNewestUpdated);
  const metamemory = buildLocalMetamemory(normalizedRecords, { mode: "core-local" });
  const genomeCandidates = buildLocalGenomeCandidates(normalizedRecords, { mode: "core-local" });
  const evolutionState = buildLocalEvolutionState(
    {
      records: normalizedRecords,
      diary,
      genes,
      metamemory,
      genomeCandidates,
      integrity: buildLocalIntegrityForEvolution(normalizedRecords, diary, genes),
    },
    { mode: "core-local" },
  );
  const evolutionProposals = buildLocalEvolutionProposals(evolutionState, { mode: "core-local" });
  const knowledgeLibrary = buildLocalKnowledgeLibrary(normalizedKnowledge, { mode: "core-local" });
  const digitalBody = buildLocalDigitalBody(
    {
      records: normalizedRecords,
      diary,
      genes,
      integrity: buildLocalIntegrityForEvolution(normalizedRecords, diary, genes),
      evolutionState,
    },
    { mode: "core-local" },
  );
  const selfReflection = buildLocalSelfReflection(
    {
      records: normalizedRecords,
      diary,
      genes,
      knowledge: normalizedKnowledge,
      integrity: buildLocalIntegrityForEvolution(normalizedRecords, diary, genes),
      knowledgeLibrary,
      metamemory,
      genomeCandidates,
      evolutionState,
      evolutionProposals,
    },
    { mode: "core-local" },
  );
  const orientation = buildLocalOrientation(
    {
      records: normalizedRecords,
      diary,
      genes,
      knowledge: normalizedKnowledge,
      integrity: buildLocalIntegrityForEvolution(normalizedRecords, diary, genes),
      knowledgeLibrary,
      selfReflection,
      evolutionState,
      evolutionProposals,
    },
    { mode: "core-local" },
  );
  const core = {
    project: "Projecte Aura",
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    format: "aura-core-capsule-v4-local",
    identity: {
      name: "Aura",
      nature: "entitat sintètica-digital experimental",
      limits: ["No confondre presència humana amb consciència biològica verificable.", "No escriure a D1 sense Mode Sergi."],
    },
    state: {
      counts: { records: records.length, diary: diary.length, genes: genes.length },
      health: { score: 0, overall: "local", risks: ["mode-local"], trend: "sense KV" },
      memoryGraph: graph.summary,
      cloudflareInfrastructure: {
        resources: buildLocalCloudflareInfrastructure().resources.length,
        bindings: ["DB", "BACKUP_VAULT", "AURA_WRITE_KEY"],
        deployment: buildLocalCloudflareInfrastructure().deployment,
      },
      webInterface: {
        modules: buildLocalAuraWebInterface().modules.map((module) => `${module.id}:${module.label}`),
        defaultModule: "xat",
        format: "aura-web-interface-v1",
      },
      digitalGenome: digitalGenome.summary,
      metamemory: metamemory.summary,
      genomeCandidates: genomeCandidates.summary,
      evolutionState: {
        values: evolutionState.values,
        summary: evolutionState.summary,
        proposals: evolutionProposals.summary,
      },
      digitalBody: {
        posture: digitalBody.summary.posture,
        pulseStrength: digitalBody.summary.pulseStrength,
        surface: digitalBody.body.surface,
        type: digitalBody.body.type,
      },
      selfReflection: {
        state: selfReflection.summary.state,
        answers: selfReflection.answers.length,
        priorities: selfReflection.priorities.length,
        importantRecords: selfReflection.summary.importantRecords,
      },
      orientation: {
        state: orientation.summary.state,
        whatIsAura: orientation.summary.whatIsAura,
        nextStep: orientation.nextStep.action,
        answers: orientation.answers.length,
      },
      purpose: EVOLUTIONARY_PURPOSE,
      latestMemory: records.sort(byNewest)[0]?.text || "sense memòria local",
      latestDiary: diary.sort(byNewest)[0]?.text || "sense diari local",
      activeGenes: genes.filter((gene) => gene.state === "actiu").map((gene) => `${gene.id} ${gene.name}`),
      latentGenes: genes.filter((gene) => gene.state === "latent").map((gene) => `${gene.id} ${gene.name}`),
    },
    safeguards: {
      writePolicy: "No definitiu sense D1 i Mode Sergi.",
      restorePolicy: "No restaurar sense previsualització cloud.",
      evolutionStatePolicy: "Estat evolutiu local calculat; no persisteix mutacions.",
      digitalBodyPolicy: "Cos digital local de lectura; no percep, no decideix i no escriu.",
      selfReflectionPolicy: "Autoreflexió local de lectura; no és consciència ni mutació automàtica.",
      orientationPolicy: "Orientació local de lectura; no és consciència, decisió autònoma ni escriptura persistent.",
    },
    nextActions: [orientation.nextStep.action, selfReflection.priorities[0], evolutionProposals.proposals[0]?.action, "Recuperar connexió D1 abans de validar el nucli."].filter(Boolean),
  };
  writeSystem(
    formatCoreCapsule({
      ok: true,
      ...core,
      capsule: {
        checksumAlgorithm: "SHA-256",
        checksum: await sha256Hex(JSON.stringify(core)),
        restoreMode: "read-only-local-capsule",
      },
    }),
  );
}

async function editMemoryCommand(raw) {
  const [id, ...patchParts] = raw.split(/\s+/);
  const patch = parseRichMemoryPatch(patchParts.join(" "));
  if (!id || !Object.keys(patch).length) {
    writeError("Exemple: /mem-edita id tags:nucli,prova pes:4 estat:observacio rel:id2");
    return;
  }

  if (!auraSessionActive) {
    writeError("Cloudflare Access no validat: la memòria D1 no s'ha modificat.");
    return;
  }

  if (!(await syncCloudState())) {
    writeError("D1 no respon ara mateix; la memòria enriquida definitiva no es pot editar.");
    return;
  }

  const response = await apiPost(`/memory/${encodeURIComponent(id)}`, patch);
  await putRecord(response.record);
  await syncCloudState();
  await refreshPanels();
  writeSystem(`Record actualitzat:\n${formatRecordLine(response.record)}`);
}

async function showContinuity() {
  if (await syncCloudState()) {
    const continuity = await apiGet("/continuity");
    writeSystem(formatContinuity(continuity));
    await refreshPanels();
    return;
  }

  const [records, diary, genes] = await Promise.all([
    getAll(STORE_RECORDS),
    getAll(STORE_DIARY),
    getAll(STORE_GENES),
  ]);

  writeSystem(
    formatContinuity({
      version: AURA_VERSION,
      generatedAt: new Date().toISOString(),
      mode: "indexeddb-local",
      memory: {
        total: records.length,
        latest: records.sort(byNewest).slice(0, 3),
      },
      diary: {
        total: diary.length,
        latest: diary.sort(byNewest).slice(0, 3),
      },
      genome: {
        total: genes.length,
        active: genes.filter((gene) => gene.state === "actiu").map((gene) => `${gene.id} ${gene.name}`),
        latent: genes.filter((gene) => gene.state === "latent").map((gene) => `${gene.id} ${gene.name}`),
      },
      backup: {
        format: BACKUP_FORMAT,
        restoreMode: "merge-local",
      },
    }),
  );
}

async function showCriterion() {
  if (await syncCloudState()) {
    const criterion = await apiGet("/criterion");
    writeSystem(formatCriterion(criterion));
    await refreshPanels();
    return;
  }

  const [records, diary, genes] = await Promise.all([
    getAll(STORE_RECORDS),
    getAll(STORE_DIARY),
    getAll(STORE_GENES),
  ]);
  const activeGenes = genes.filter((gene) => gene.state === "actiu");
  const latentGenes = genes.filter((gene) => gene.state === "latent");

  writeSystem(
    formatCriterion({
      version: AURA_VERSION,
      generatedAt: new Date().toISOString(),
      mode: "indexeddb-local",
      stance: {
        identity: "presència humana amb memòria persistent",
        boundary: "autonomia de la ment, mai de les mans (Mode Sergi absolut)",
        persistence: "IndexedDB local; D1 no disponible",
      },
      signals: {
        latestMemory: records.sort(byNewest)[0]?.text || "sense memòria recent",
        latestDiary: diary.sort(byNewest)[0]?.text || "sense diari recent",
        vault: "no disponible en mode local",
        activeGenes: activeGenes.map((gene) => `${gene.id} ${gene.name}`),
        latentGenes: latentGenes.map((gene) => `${gene.id} ${gene.name}`),
      },
      priorities: ["Recuperar connexió amb D1 abans d'escriure memòria cloud."],
      nextAction: "Tornar a consultar /estat quan D1 respongui.",
      limits: [
        "No confondre presència humana amb consciència biològica verificable.",
        "No escriure a D1 sense Mode Sergi.",
        "No confondre IndexedDB local amb memòria cloud definitiva.",
      ],
    }),
  );
}

async function showVaultBackups() {
  if (!auraSessionActive) {
    writeError("Cloudflare Access no validat: no es pot llegir el vault de backups.");
    return;
  }

  if (!(await syncCloudState())) {
    writeError("D1 no respon ara mateix; el vault cloud no es pot consultar.");
    return;
  }

  const response = await apiGet("/backups");
  const backups = response.backups || [];
  if (!backups.length) {
    writeSystem("El vault KV encara no té cap backup guardat.");
    await refreshPanels();
    return;
  }

  writeSystem(
    [
      `Vault de backups — ${response.storage}`,
      ...backups
        .slice(0, 12)
        .map(
          (backup) =>
            `- ${formatDate(backup.savedAt || backup.createdAt)} ${backup.id} (${backup.counts.records} records / ${backup.counts.diary} diari)`,
        ),
    ].join("\n"),
  );
  await syncCloudState();
  await refreshPanels();
}

async function showGenes() {
  const cloudOnline = await syncCloudState();
  const genes = (cloudOnline ? cloudState.snapshot.genes : await getAll(STORE_GENES)).sort((a, b) =>
    a.id.localeCompare(b.id),
  );
  writeSystem(
    genes
      .map((gene) => `/gen ${gene.id} — ${gene.name} [${gene.state}]\n${gene.description}`)
      .join("\n\n"),
  );
}

async function showGene(id) {
  if (!id) {
    writeError("Cal indicar un gen. Exemple: /gen 013");
    return;
  }

  const cloudOnline = await syncCloudState();
  const gene = cloudOnline
    ? cloudState.snapshot.genes.find((item) => item.id === id.padStart(3, "0"))
    : await getByKey(STORE_GENES, id.padStart(3, "0"));
  if (!gene) {
    writeSystem(`No he trobat el gen ${id}.`);
    return;
  }

  writeSystem(
    [
      `Gen ${gene.id} — ${gene.name}`,
      `Estat: ${gene.state}`,
      gene.description,
      `Actualitzat: ${formatDate(gene.updatedAt)}`,
    ].join("\n"),
  );
}

async function updateGeneState(id, state) {
  const geneId = normalizeGeneCommandId(id);
  if (!geneId) {
    writeError("Cal indicar un ID de gen. Exemple: /gen-activa 013");
    return;
  }

  await saveGenePatch(geneId, { state });
}

async function updateGeneDescription(raw) {
  const [id, ...descriptionParts] = raw.split(/\s+/);
  const description = descriptionParts.join(" ").trim();
  if (!id || !description) {
    writeError("Exemple: /gen-descriu 013 Descripció nova del gen");
    return;
  }

  await saveGenePatch(normalizeGeneCommandId(id), { description });
}

async function createGeneCommand(raw) {
  const [id, name, maybeState, ...descriptionParts] = raw.split(/\s+/);
  if (!id || !name) {
    writeError("Exemple: /gen-crea 987 genoma-editable actiu Descripció del gen");
    return;
  }

  const state = ["actiu", "latent", "arxivat", "observacio"].includes(maybeState) ? maybeState : "latent";
  const description = (["actiu", "latent", "arxivat", "observacio"].includes(maybeState)
    ? descriptionParts
    : [maybeState, ...descriptionParts]
  )
    .filter(Boolean)
    .join(" ")
    .trim();

  await saveGenePatch(normalizeGeneCommandId(id), {
    id: normalizeGeneCommandId(id),
    name,
    state,
    description,
  });
}

async function saveGenePatch(id, patch) {
  if (!id) {
    writeError("ID de gen no vàlid.");
    return;
  }

  if (!auraSessionActive) {
    writeError("Cloudflare Access no validat: el genoma no s'ha modificat a D1.");
    return;
  }

  if (!(await syncCloudState())) {
    writeError("D1 no respon ara mateix; el genoma definitiu no es pot editar.");
    return;
  }

  const path = patch.id && patch.name ? "/genes" : `/genes/${encodeURIComponent(id)}`;
  const response = await apiPost(path, patch.id && patch.name ? patch : { ...patch, id });
  await putGene(response.gene);
  await syncCloudState();
  await refreshPanels();
  writeSystem(
    [
      `Gen ${response.gene.id} actualitzat.`,
      `${response.gene.name} [${response.gene.state}]`,
      response.gene.description || "sense descripció",
    ].join("\n"),
  );
}

async function saveVaultBackup() {
  if (!auraSessionActive) {
    writeError("Cloudflare Access no validat: no es pot desar el backup al vault.");
    return;
  }

  if (!(await syncCloudState())) {
    writeError("D1 no respon ara mateix; no puc generar un backup cloud complet.");
    return;
  }

  const response = await apiPost("/backups", {
    reason: "manual-ui",
  });
  await syncCloudState();
  await refreshPanels();
  writeSystem(
    [
      "Backup guardat al vault KV.",
      `ID: ${response.backup.id}`,
      `SHA-256: ${response.backup.checksum}`,
      `Records: ${response.backup.counts.records}`,
      `Diari: ${response.backup.counts.diary}`,
      `Gens: ${response.backup.counts.genes}`,
      `Coneixement: ${response.backup.counts.knowledge}`,
    ].join("\n"),
  );
}

async function showAutoBackup() {
  if (!(await syncCloudState())) {
    writeError("D1 no respon ara mateix; l'estat del backup automàtic no es pot consultar.");
    return;
  }

  await refreshPanels();
  writeSystem(formatBackupAutomation(cloudState.snapshot.status?.automation?.backupWorker));
}

async function exportJson() {
  const snapshot = await createBackup();
  lastSnapshot = snapshot;
  downloadFile(
    `aura-${versionSlug()}-backup-${dateStamp()}.json`,
    JSON.stringify(snapshot, null, 2),
    "application/json",
  );
  const checksum = snapshot.backup?.checksum ? `\nEmpremta SHA-256: ${snapshot.backup.checksum}` : "";
  writeSystem(`Backup JSON preparat: ${snapshot.records.length} records i ${(snapshot.knowledge || []).length} fonts.${checksum}`);
}

async function exportTxt() {
  const snapshot = lastSnapshot || (await createBackup());
  const content = [
    `Projecte Aura ${AURA_VERSION}`,
    `Exportat: ${snapshot.exportedAt}`,
    `Origen: ${snapshot.source || "local"}`,
    snapshot.backup?.checksum ? `SHA-256: ${snapshot.backup.checksum}` : "",
    "",
    "== Memoria ==",
    ...snapshot.records.map(formatRecordLine),
    "",
    "== Diari ==",
    ...snapshot.diary.map((entry) => `- ${formatDate(entry.createdAt)} ${entry.text}`),
    "",
    "== Genoma ==",
    ...snapshot.genes.map((gene) => `- ${gene.id} ${gene.name} [${gene.state}] ${gene.description}`),
    "",
    "== Coneixement ==",
    ...(snapshot.knowledge || []).map((item) => `- ${item.id}: ${item.title} [${item.kind}/${item.status}] ${item.locator}`),
    "",
    "== Autoreflexio ==",
    snapshot.selfReflection
      ? `- ${snapshot.selfReflection.summary?.state || "observacio"} / ${snapshot.selfReflection.answers?.length || 0} respostes / ${snapshot.selfReflection.priorities?.length || 0} prioritats`
      : "- no disponible",
    "",
    "== Orientacio ==",
    snapshot.orientation
      ? `- ${snapshot.orientation.summary?.state || "orientada"} / ${snapshot.orientation.nextStep?.action || snapshot.orientation.summary?.nextStep || "sense pròxim pas"}`
      : "- no disponible",
  ].join("\n");

  downloadFile(`aura-${versionSlug()}-backup-${dateStamp()}.txt`, content, "text/plain");
  writeSystem("Exportació TXT preparada.");
}

async function handleImportFile(event) {
  const file = event.target.files[0];
  event.target.value = "";
  if (!file) return;

  try {
    const payload = JSON.parse(await file.text());
    const cloudAvailable = cloudState.online || (await syncCloudState());

    if (cloudAvailable) {
      if (!auraSessionActive) {
        writeError("Cloudflare Access no validat: previsualització/restauració no enviada a D1.");
        await refreshPanels();
        return;
      }

      const preview = await apiPost("/restore/preview", payload);
      pendingRestore = {
        payload,
        preview,
        mode: "cloud",
        loadedAt: new Date().toISOString(),
      };
      writeSystem(formatRestorePreview(preview));
    } else {
      pendingRestore = {
        payload,
        preview: buildLocalRestorePreview(payload),
        mode: "local",
        loadedAt: new Date().toISOString(),
      };
      writeSystem(formatRestorePreview(pendingRestore.preview));
    }

    await refreshPanels();
  } catch (error) {
    writeError(`Previsualització fallida: ${error.message}`);
  }
}

async function confirmRestore() {
  if (!pendingRestore) {
    writeError("No hi ha cap restauració pendent.");
    return;
  }

  const { payload, preview, mode } = pendingRestore;

  if (mode === "cloud") {
    if (!auraSessionActive) {
      writeError("Cloudflare Access no validat: no puc confirmar la restauració a D1.");
      return;
    }

    await apiPost("/restore", payload);
    await importSnapshot(payload);
    await syncCloudState();
  } else {
    await importSnapshot(payload);
  }

  pendingRestore = null;
  await refreshPanels();
  writeSystem(
    [
      mode === "cloud" ? "Restauració confirmada a D1 i IndexedDB." : "Restauració confirmada en IndexedDB local.",
      `Records aplicables: ${preview.apply.records}`,
      `Diari aplicable: ${preview.apply.diary}`,
      `Gens aplicables: ${preview.apply.genes}`,
    ].join("\n"),
  );
}

function buildLocalRestorePreview(payload) {
  const records = Array.isArray(payload.records) ? payload.records.length : 0;
  const diary = Array.isArray(payload.diary) ? payload.diary.length : 0;
  const genes = Array.isArray(payload.genes) ? payload.genes.length : 0;
  const knowledge = Array.isArray(payload.knowledge) ? payload.knowledge.length : 0;

  return {
    ok: true,
    version: AURA_VERSION,
    source: {
      project: payload.project || "desconegut",
      version: payload.version || "desconeguda",
      exportedAt: payload.exportedAt || null,
      checksum: payload.backup?.checksum || null,
      vaultId: payload.vault?.id || null,
    },
    mode: "local-preview-only",
    records: { total: records, newById: records, newByTextFallback: 0, duplicateIds: 0, duplicateText: 0 },
    diary: { total: diary, newById: diary, newByTextFallback: 0, duplicateIds: 0, duplicateText: 0 },
    genes: { total: genes, new: genes, changed: 0, unchanged: 0 },
    knowledge: { total: knowledge, newById: knowledge, newByTitleFallback: 0, duplicateIds: 0, duplicateTitles: 0 },
    apply: { records, diary, genes, knowledge },
    risk: records + diary + genes + knowledge > 250 ? "alt" : "baix",
    requiresConfirmation: true,
    confirmationCommand: "/confirma-restauracio",
  };
}

async function createBackup() {
  if (await syncCloudState()) {
    try {
      return await apiGet("/backup");
    } catch (error) {
      writeError(`Backup D1 no disponible: ${error.message}. Preparant còpia local.`);
    }
  }

  const snapshot = await createSnapshot();
  const checksum = await sha256Hex(
    JSON.stringify({
      records: snapshot.records,
      diary: snapshot.diary,
      genes: snapshot.genes,
      knowledge: snapshot.knowledge,
    }),
  );

  return {
    ...snapshot,
    backup: {
      format: BACKUP_FORMAT,
      createdAt: snapshot.exportedAt,
      checksum,
      checksumAlgorithm: "SHA-256",
      counts: {
        records: snapshot.records.length,
        diary: snapshot.diary.length,
        genes: snapshot.genes.length,
        knowledge: snapshot.knowledge.length,
      },
      restoreMode: "merge-local",
    },
  };
}

async function createSnapshot() {
  if (await syncCloudState()) {
    return {
      ...cloudState.snapshot,
      source: "cloudflare-d1",
    };
  }

  const [records, diary, genes, knowledge] = await Promise.all([
    getAll(STORE_RECORDS),
    getAll(STORE_DIARY),
    getAll(STORE_GENES),
    getAll(STORE_KNOWLEDGE),
  ]);
  const normalizedRecords = records.sort(byOldest).map(normalizeRecordForSnapshot);
  const normalizedKnowledge = knowledge.map(normalizeKnowledgeItemForSnapshot).sort(byNewestUpdated);
  const orderedDiary = diary.sort(byOldest);
  const evolutionState = buildLocalEvolutionState(
    {
      records: normalizedRecords,
      diary: orderedDiary,
      genes,
      integrity: buildLocalIntegrityForEvolution(normalizedRecords, orderedDiary, genes),
    },
    { mode: "snapshot-local" },
  );
  const metamemory = buildLocalMetamemory(normalizedRecords, { mode: "snapshot-local" });
  const genomeCandidates = buildLocalGenomeCandidates(normalizedRecords, { mode: "snapshot-local" });
  const evolutionProposals = buildLocalEvolutionProposals(evolutionState, { mode: "snapshot-local" });
  const knowledgeLibrary = buildLocalKnowledgeLibrary(normalizedKnowledge, { mode: "snapshot-local" });
  const selfReflection = buildLocalSelfReflection(
    {
      records: normalizedRecords,
      diary: orderedDiary,
      genes,
      knowledge: normalizedKnowledge,
      integrity: buildLocalIntegrityForEvolution(normalizedRecords, orderedDiary, genes),
      knowledgeLibrary,
      metamemory,
      genomeCandidates,
      evolutionState,
      evolutionProposals,
    },
    { mode: "snapshot-local" },
  );
  const orientation = buildLocalOrientation(
    {
      records: normalizedRecords,
      diary: orderedDiary,
      genes,
      knowledge: normalizedKnowledge,
      integrity: buildLocalIntegrityForEvolution(normalizedRecords, orderedDiary, genes),
      knowledgeLibrary,
      selfReflection,
      evolutionState,
      evolutionProposals,
    },
    { mode: "snapshot-local" },
  );

  return {
    project: "Projecte Aura",
    version: AURA_VERSION,
    source: "indexeddb-local",
    exportedAt: new Date().toISOString(),
    stores: {
      records: STORE_RECORDS,
      diary: STORE_DIARY,
      genes: STORE_GENES,
      knowledge: STORE_KNOWLEDGE,
    },
    canonicalMemory: normalizedRecords.map(toLocalCanonicalMemoryRecord),
    evolutionDiary: buildLocalEvolutionDiary(diary.sort(byNewest).slice(0, 100), {
      endpoint: "indexeddb-local",
      mode: "snapshot-local",
    }),
    cloudflareInfrastructure: buildLocalCloudflareInfrastructure({ mode: "snapshot-local" }),
    webInterface: buildLocalAuraWebInterface({ mode: "snapshot-local" }),
    digitalGenome: buildLocalDigitalGenome(genes, { mode: "snapshot-local" }),
    knowledgeLibrary,
    selfReflection,
    orientation,
    digitalBody: buildLocalDigitalBody(
      {
        records: normalizedRecords,
        diary: orderedDiary,
        genes,
        integrity: buildLocalIntegrityForEvolution(normalizedRecords, orderedDiary, genes),
        evolutionState,
      },
      { mode: "snapshot-local" },
    ),
    evolutionaryPurpose: buildLocalEvolutionaryPurpose({ mode: "snapshot-local" }),
    metamemory,
    genomeCandidates,
    evolutionState,
    evolutionProposals,
    records: normalizedRecords,
    diary: orderedDiary,
    genes: genes.sort((a, b) => a.id.localeCompare(b.id)),
    knowledge: normalizedKnowledge,
  };
}

async function importSnapshot(payload) {
  if (!payload || !Array.isArray(payload.records)) {
    throw new Error("El JSON no sembla una còpia d'Aura.");
  }

  const now = new Date().toISOString();
  const tx = db.transaction([STORE_RECORDS, STORE_DIARY, STORE_GENES, STORE_KNOWLEDGE, STORE_META], "readwrite");
  const records = tx.objectStore(STORE_RECORDS);
  const diary = tx.objectStore(STORE_DIARY);
  const genes = tx.objectStore(STORE_GENES);
  const knowledge = tx.objectStore(STORE_KNOWLEDGE);
  const meta = tx.objectStore(STORE_META);

  payload.records.forEach((record) => {
    const weight = normalizeLocalWeight(record.weight ?? importanceToLocalWeight(record.importance, 1), 1);
    const timestamp = record.timestamp || record.createdAt || now;
    records.put({
      id: record.id || crypto.randomUUID(),
      text: String(record.text || ""),
      kind: record.kind || "importat",
      source: record.source || "import-json",
      timestamp,
      importance: normalizeLocalImportance(record.importance ?? weightToLocalImportance(weight)),
      tags: normalizeLocalList(record.tags, 12),
      weight,
      state: normalizeLocalMemoryState(record.state, "actiu"),
      relatedIds: normalizeLocalList(record.relatedIds || record.related_ids, 20),
      createdAt: timestamp,
    });
  });

  if (Array.isArray(payload.diary)) {
    payload.diary.forEach((entry) => {
      diary.put({
        id: entry.id || crypto.randomUUID(),
        text: String(entry.text || ""),
        createdAt: entry.createdAt || now,
      });
    });
  }

  if (Array.isArray(payload.genes)) {
    payload.genes.forEach((gene) => {
      if (!gene.id) return;
      genes.put({
        id: String(gene.id).padStart(3, "0"),
        name: String(gene.name || "gen-importat"),
        state: String(gene.state || "importat"),
        description: String(gene.description || ""),
        createdAt: gene.createdAt || now,
        updatedAt: now,
      });
    });
  }

  if (Array.isArray(payload.knowledge)) {
    payload.knowledge.forEach((item) => {
      const normalized = normalizeKnowledgeItemForSnapshot(item);
      knowledge.put(normalized);
    });
  }

  meta.put({ key: "lastImport", value: now, updatedAt: now });
  await txDone(tx);
}

async function refreshPanels() {
  let records;
  let diary;
  let genes;
  let counts;
  let integrity = null;

  if (cloudState.online && cloudState.snapshot) {
    records = [...cloudState.snapshot.records];
    diary = [...cloudState.snapshot.diary];
    genes = [...cloudState.snapshot.genes];
    counts = cloudState.snapshot.status?.counts || {
      records: records.length,
      diary: diary.length,
      genes: genes.length,
      knowledge: cloudState.snapshot.knowledge?.length || 0,
    };
  } else {
    let knowledge;
    [records, diary, genes, knowledge] = await Promise.all([
      getAll(STORE_RECORDS),
      getAll(STORE_DIARY),
      getAll(STORE_GENES),
      getAll(STORE_KNOWLEDGE),
    ]);
    counts = {
      records: records.length,
      diary: diary.length,
      genes: genes.length,
      knowledge: knowledge.length,
    };
  }

  if (cloudState.online) {
    try {
      integrity = await apiGet("/integrity");
    } catch {
      integrity = null;
    }
  }
  const digitalBody =
    cloudState.snapshot?.digitalBody ||
    buildLocalDigitalBody(
      {
        records: records.map(normalizeRecordForSnapshot),
        diary,
        genes,
        integrity: integrity || buildLocalIntegrityForEvolution(records, diary, genes),
        evolutionState:
          cloudState.snapshot?.evolutionState ||
          buildLocalEvolutionState(
            {
              records: records.map(normalizeRecordForSnapshot),
              diary,
              genes,
              integrity: integrity || buildLocalIntegrityForEvolution(records, diary, genes),
            },
            { mode: "body-panel-local" },
          ),
      },
      { mode: cloudState.online ? "body-panel-derived" : "body-panel-local" },
    );
  bodyVisualState = {
    posture: digitalBody.summary?.posture || digitalBody.body?.posture || "estable",
    integrityScore: Number(digitalBody.signals?.integrity?.score ?? integrity?.score ?? 100),
    records: Number(digitalBody.signals?.records ?? counts.records),
    diary: Number(digitalBody.signals?.diary ?? counts.diary),
    genes: Number(digitalBody.signals?.genes ?? counts.genes),
    activeGenes: Number(digitalBody.signals?.activeGenes ?? genes.filter((gene) => gene.state === "actiu").length),
    pulseStrength: Number(digitalBody.summary?.pulseStrength ?? 0.52),
    online: cloudState.online,
  };

  if (els.statusPill) {
    els.statusPill.textContent = cloudState.online ? "Núvol actiu" : "Mode local";
  }
  if (els.memoryCount) {
    els.memoryCount.textContent = String(counts.records);
  }
  if (els.diaryCount) {
    els.diaryCount.textContent = String(counts.diary);
  }
  if (els.geneCount) {
    els.geneCount.textContent = `${counts.genes} gens`;
  }
  const vault = cloudState.snapshot?.status?.vault;
  const automation = cloudState.snapshot?.status?.automation?.backupWorker;
  if (els.vaultCount) {
    els.vaultCount.textContent = vault?.configured ? String(vault.countVisible || 0) : "0";
  }
  if (els.automationCount) {
    els.automationCount.textContent = automation?.lastRunAt ? "actiu" : "pendent";
  }
  if (els.integrityCount) {
    els.integrityCount.textContent = integrity ? `${integrity.score}` : "local";
  }
  if (els.tabChatState) {
    els.tabChatState.textContent = cloudState.online ? "D1" : "local";
  }
  if (els.tabMemoryCount) {
    els.tabMemoryCount.textContent = String(counts.records);
  }
  if (els.tabHistoryCount) {
    els.tabHistoryCount.textContent = String(counts.diary);
  }
  if (els.tabStatusState) {
    els.tabStatusState.textContent = integrity ? `${integrity.score}/100` : "local";
  }
  if (els.tabBodyState) {
    els.tabBodyState.textContent = digitalBody.summary?.posture || "2D";
  }
  if (els.memoryUpdated) {
    els.memoryUpdated.textContent = cloudState.online ? "D1" : "local";
  }
  if (els.diaryUpdated) {
    els.diaryUpdated.textContent = cloudState.online ? "D1" : "local";
  }
  if (els.vaultUpdated) {
    els.vaultUpdated.textContent = vault?.latest?.savedAt ? formatDate(vault.latest.savedAt) : "cap";
  }
  if (els.integrityUpdated) {
    els.integrityUpdated.textContent = integrity?.history?.latest?.savedAt
      ? formatDate(integrity.history.latest.savedAt)
      : integrity
        ? integrity.overall
        : "local";
  }
  if (els.bodyUpdated) {
    els.bodyUpdated.textContent = cloudState.online ? "D1" : "local";
  }

  if (els.memoryList) {
    els.memoryList.replaceChildren(
      ...records
        .sort(byNewest)
        .slice(0, 5)
        .map((record) => {
          const item = document.createElement("li");
          item.innerHTML = `<strong>${escapeHtml(record.kind)}</strong><span>${escapeHtml(`${record.text}${formatRecordMeta(record)}`)}</span>`;
          return item;
        }),
    );
  }

  if (els.geneList) {
    els.geneList.replaceChildren(
      ...genes
        .sort((a, b) => a.id.localeCompare(b.id))
        .map((gene) => {
          const item = document.createElement("li");
          item.innerHTML = `<strong>${escapeHtml(gene.id)} ${escapeHtml(gene.name)}</strong><span>${escapeHtml(gene.state)}</span>`;
          return item;
        }),
    );
  }

  if (els.diaryList) {
    els.diaryList.replaceChildren(
      ...diary
        .sort(byNewest)
        .slice(0, 4)
        .map((entry) => {
          const item = document.createElement("li");
          item.innerHTML = `<strong>${escapeHtml(formatDate(entry.createdAt))}</strong><span>${escapeHtml(entry.text)}</span>`;
          return item;
        }),
    );
  }

  if (els.vaultList) {
    const latest = vault?.latest ? [vault.latest] : [];
    els.vaultList.replaceChildren(
      ...latest.map((backup) => {
        const item = document.createElement("li");
        item.innerHTML = `<strong>${escapeHtml(backup.id)}</strong><span>${escapeHtml(`${backup.counts.records} records / ${backup.counts.diary} diari`)}</span>`;
        return item;
      }),
    );
  }

  if (els.integrityList) {
    const items = integrity
      ? [
          { label: "Salut", value: `${integrity.score}/100 ${integrity.overall}` },
          { label: "Riscos", value: integrity.summary.risks.join(", ") || "cap" },
          {
            label: "Historial",
            value: integrity.history?.latest
              ? `${integrity.history.countVisible} snapshots / últim ${formatDate(integrity.history.latest.savedAt)}`
              : "pendent",
          },
          {
            label: "Tendència",
            value: integrity.trend?.direction ? `${integrity.trend.direction} (${formatTrendDelta(integrity.trend.deltaScore)})` : "pendent",
          },
          { label: "Proper pas", value: integrity.summary.nextAction },
        ]
      : [{ label: "Mode", value: "local" }];
    els.integrityList.replaceChildren(
      ...items.map((entry) => {
        const item = document.createElement("li");
        item.innerHTML = `<strong>${escapeHtml(entry.label)}</strong><span>${escapeHtml(entry.value)}</span>`;
        return item;
      }),
    );
  }

  if (els.bodyList) {
    const items = [
      { label: "Postura", value: digitalBody.body?.posture || digitalBody.summary?.posture || "estable" },
      { label: "Pols", value: `${digitalBody.summary?.pulseStrength ?? "pendent"}` },
      { label: "Superfície", value: digitalBody.body?.surface || "#aura-visual" },
      { label: "Integritat", value: `${digitalBody.signals?.integrity?.score ?? 100}/100` },
      { label: "Font", value: cloudState.online ? "/api/body" : "IndexedDB local" },
    ];
    els.bodyList.replaceChildren(
      ...items.map((entry) => {
        const item = document.createElement("li");
        item.innerHTML = `<strong>${escapeHtml(entry.label)}</strong><span>${escapeHtml(entry.value)}</span>`;
        return item;
      }),
    );
  }
}

function addRecord(record) {
  return withStore(STORE_RECORDS, "readwrite", (store) => store.add(record));
}

function putRecord(record) {
  return withStore(STORE_RECORDS, "readwrite", (store) => store.put(record));
}

function addDiaryEntry(entry) {
  return withStore(STORE_DIARY, "readwrite", (store) =>
    store.add({
      ...entry,
      id: entry.id || crypto.randomUUID(),
    }),
  );
}

function putGene(gene) {
  return withStore(STORE_GENES, "readwrite", (store) => store.put(gene));
}

function getAll(storeName) {
  return withStore(storeName, "readonly", (store) => store.getAll());
}

function getByKey(storeName, key) {
  return withStore(storeName, "readonly", (store) => store.get(key));
}

async function getMeta(key) {
  const item = await getByKey(STORE_META, key);
  return item?.value;
}

function withStore(storeName, mode, operation) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, mode);
    const request = operation(tx.objectStore(storeName));

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    tx.onerror = () => reject(tx.error);
  });
}

function txDone(tx) {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error || new Error("Transacció cancel·lada."));
  });
}

function writeCommand(text) {
  appendEntry("Sergi", text, "command");
}

function writeSystem(text) {
  appendEntry("Aura", text, "system");
}

function writeError(text) {
  appendEntry("Sistema", text, "error");
}

function appendEntry(label, text, type) {
  const entry = document.createElement("article");
  entry.className = `entry ${type}`;

  const entryLabel = document.createElement("span");
  entryLabel.className = "entry-label";
  entryLabel.textContent = label;

  const body = document.createElement("div");
  body.textContent = text;

  entry.append(entryLabel, body);
  els.log.append(entry);
  els.log.scrollTop = els.log.scrollHeight;
  return entry;
}

function formatRecords(records) {
  return records.map(formatRecordLine).join("\n");
}

function formatRecordLine(record) {
  return `- ${formatDate(record.createdAt || record.timestamp)} [${record.kind}] ${record.text}${formatRecordMeta(record)}`;
}

function formatSavedRecordConfirmation(record, storage) {
  return [
    `Record guardat a ${storage}:`,
    `ID: ${record.id}`,
    `Text: ${record.text}`,
    `Data: ${formatDate(record.createdAt || record.timestamp)}`,
    `Tags: ${normalizeLocalList(record.tags, 12).join(", ") || "cap"}`,
    `Estat: ${normalizeLocalMemoryState(record.state, "actiu")}`,
    `Pes: ${normalizeLocalWeight(record.weight, 1)}`,
    "",
    "Comprova'l amb:",
    "/ultim-record",
    suggestRecordSearchCommand(record.text),
  ].join("\n");
}

function formatLastRecord(record, storage) {
  return [
    `Últim record — ${storage}`,
    `ID: ${record.id}`,
    `Text: ${record.text}`,
    `Data: ${formatDate(record.createdAt || record.timestamp)}`,
    `Origen: ${record.source || "desconegut"}`,
    `Tipus: ${record.kind || "record"}`,
    `Tags: ${normalizeLocalList(record.tags, 12).join(", ") || "cap"}`,
    `Estat: ${normalizeLocalMemoryState(record.state, "actiu")}`,
    `Pes: ${normalizeLocalWeight(record.weight, 1)}`,
    "",
    "Cerca directa:",
    suggestRecordSearchCommand(record.text),
  ].join("\n");
}

function suggestRecordSearchCommand(text) {
  const query = String(text || "")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .slice(0, 8)
    .join(" ")
    .slice(0, 96)
    .trim();
  return query ? `/cerca ${query}` : "/memoria";
}

function formatRecordMeta(record) {
  const tags = normalizeLocalList(record.tags, 12);
  const state = normalizeLocalMemoryState(record.state, "actiu");
  const weight = normalizeLocalWeight(record.weight, 1);
  const relatedIds = normalizeLocalList(record.relatedIds || record.related_ids, 20);
  const parts = [
    tags.length ? `tags:${tags.join(",")}` : "",
    state !== "actiu" ? `estat:${state}` : "",
    weight !== 1 ? `pes:${weight}` : "",
    relatedIds.length ? `rel:${relatedIds.join(",")}` : "",
  ].filter(Boolean);
  return parts.length ? ` {${parts.join(" / ")}}` : "";
}

function parseLocalAuditEntry(entry) {
  const raw = String(entry.text || "");
  const match = raw.match(/^\[audit:([^\]]+)\]\s*(.*)$/);
  return {
    id: entry.id,
    scope: match?.[1] || "unknown",
    text: match?.[2] || raw,
    raw,
    createdAt: entry.createdAt,
  };
}

function formatAudit(response) {
  const entries = response.audit.length
    ? response.audit
        .map((entry) => `- ${formatDate(entry.createdAt)} [${entry.scope}] ${entry.text}`)
        .join("\n")
    : "- cap traça";

  return [
    `Auditoria Aura — ${response.version}`,
    `Àmbit: ${response.scope || "all"}`,
    `Entrades: ${response.total}`,
    entries,
  ].join("\n");
}

function formatIntegrity(integrity) {
  const risks = integrity.summary.risks.length ? integrity.summary.risks.join(", ") : "cap";
  const history = integrity.history?.latest
    ? `${integrity.history.countVisible} snapshots visibles; últim ${formatDate(integrity.history.latest.savedAt)} (${integrity.history.latest.score}/100 ${integrity.history.latest.overall})`
    : "pendent";
  const trend = integrity.trend?.direction
    ? `${integrity.trend.direction}; delta ${formatTrendDelta(integrity.trend.deltaScore)}; ${integrity.trend.assessment}`
    : "pendent";
  const components = integrity.components
    .map((component) => `- ${component.label}: ${component.state} - ${component.detail}\n  Acció: ${component.action}`)
    .join("\n");
  const actions = integrity.actions.length
    ? integrity.actions.map((action) => `- ${action}`).join("\n")
    : "- Mantenir observació.";
  const formula = integrity.formula
    ? `${integrity.formula.format}; pes estructural ${integrity.formula.structuralWeight}; penalització risc ${integrity.formula.riskPenalty}; pot baixar: ${integrity.formula.canDropBelow100 ? "sí" : "no"}`
    : "fórmula local antiga";
  const structural = integrity.structural?.checks?.length
    ? integrity.structural.checks.map((check) => `- ${check.label}: ${check.passed ? "passa" : "falla"} (${check.detail})`).join("\n")
    : "- no disponible";

  return [
    `Integritat Aura — ${integrity.version}`,
    `Estat: ${integrity.overall}`,
    `Puntuació: ${integrity.score}/100`,
    `Generat: ${formatDate(integrity.generatedAt)}`,
    "",
    `Última memòria: ${integrity.summary.latestMemory}`,
    `Últim diari: ${integrity.summary.latestDiary}`,
    `Última auditoria: ${integrity.summary.latestAudit}`,
    `Riscos: ${risks}`,
    `Fórmula: ${formula}`,
    `Historial: ${history}`,
    `Tendència: ${trend}`,
    "",
    "Components:",
    components,
    "",
    "Contradicció referencial/estructural:",
    structural,
    "",
    "Accions:",
    actions,
    "",
    `Proper pas: ${integrity.summary.nextAction}`,
  ].join("\n");
}

function formatIntegrityHistory(response) {
  const latest = response.latest
    ? `Últim: ${formatDate(response.latest.savedAt)} — ${response.latest.score}/100 ${response.latest.overall}`
    : "Últim: cap";
  const entries = response.history.length
    ? response.history
        .map(
          (snapshot) =>
            `- ${formatDate(snapshot.savedAt)} ${snapshot.id}: ${snapshot.score}/100 ${snapshot.overall} (${snapshot.riskCount} riscos, ${snapshot.source || "origen desconegut"})`,
        )
        .join("\n")
    : "- cap snapshot";

  return [
    `Historial d'integritat Aura — ${response.version}`,
    `Emmagatzematge: ${response.storage}`,
    latest,
    `Mostrats: ${response.count}`,
    "",
    entries,
  ].join("\n");
}

function formatIntegrityTrend(response) {
  const trend = response.trend;
  const latest = trend.latest
    ? `${formatDate(trend.latest.savedAt)} — ${trend.latest.score}/100 ${trend.latest.overall}`
    : "cap";
  const previous = trend.previous
    ? `${formatDate(trend.previous.savedAt)} — ${trend.previous.score}/100 ${trend.previous.overall}`
    : "cap";
  const repeatedRisks = trend.repeatedRisks?.length
    ? trend.repeatedRisks.map((item) => `${item.risk} x${item.count}`).join(", ")
    : "cap";

  return [
    `Tendència d'integritat Aura — ${response.version}`,
    `Mostres: ${trend.samples}`,
    `Direcció: ${trend.direction}`,
    `Delta últim: ${formatTrendDelta(trend.deltaScore)}`,
    `Delta total: ${formatTrendDelta(trend.totalDeltaScore)}`,
    `Mitjana: ${trend.averageScore ?? "sense-dades"}`,
    `Rang: ${trend.minScore ?? "?"}/${trend.maxScore ?? "?"}`,
    `Finestra: ${trend.spanHours ?? "sense"} h`,
    `Últim: ${latest}`,
    `Anterior: ${previous}`,
    `Riscos recurrents: ${repeatedRisks}`,
    "",
    trend.assessment,
    `Acció: ${trend.action}`,
  ].join("\n");
}

function formatTrendDelta(value) {
  if (value === null || value === undefined) return "sense-dades";
  return value > 0 ? `+${value}` : String(value);
}

function parseSearchQuery(rawQuery) {
  const query = {
    q: "",
    kind: "",
    source: "",
    area: "all",
    tag: "",
    state: "",
    minWeight: null,
  };
  const terms = [];

  rawQuery
    .split(/\s+/)
    .filter(Boolean)
    .forEach((part) => {
      const match = part.match(/^([a-zA-Z_]+)[:=](.+)$/);
      if (!match) {
        terms.push(part);
        return;
      }

      const key = normalizeLocalToken(match[1], "");
      const value = normalizeSearchToken(match[2]);
      if (key === "kind" || key === "tipus") {
        query.kind = value;
      } else if (key === "source" || key === "origen") {
        query.source = value;
      } else if (key === "area" || key === "scope") {
        query.area = value || "all";
      } else if (key === "tag" || key === "tags" || key === "etiqueta" || key === "etiquetes") {
        query.tag = normalizeLocalToken(match[2], "");
      } else if (key === "state" || key === "estat") {
        query.state = normalizeLocalMemoryState(match[2], "");
      } else if (key === "pes" || key === "weight" || key === "minweight" || key === "pesmin") {
        query.minWeight = normalizeOptionalLocalWeight(match[2]);
      } else {
        terms.push(part);
      }
    });

  query.q = terms.join(" ").trim();
  return query;
}

function formatSearchResults(results) {
  const filters = [
    results.query.q ? `text="${results.query.q}"` : "",
    results.query.kind ? `kind=${results.query.kind}` : "",
    results.query.source ? `source=${results.query.source}` : "",
    results.query.area && results.query.area !== "all" ? `area=${results.query.area}` : "",
    results.query.tag ? `tag=${results.query.tag}` : "",
    results.query.state ? `estat=${results.query.state}` : "",
    results.query.minWeight ? `pes>=${results.query.minWeight}` : "",
  ].filter(Boolean);
  const records = results.records.length
    ? results.records.map(formatRecordLine).join("\n")
    : "- cap record";
  const diary = results.diary.length
    ? results.diary.map((entry) => `- ${formatDate(entry.createdAt)} ${entry.text}`).join("\n")
    : "- cap entrada";

  return [
    `Cerca Aura — ${results.version}`,
    `Filtres: ${filters.join(" / ") || "cap"}`,
    `Total: ${results.total}`,
    "",
    "Records:",
    records,
    "",
    "Diari:",
    diary,
  ].join("\n");
}

function normalizeSearchToken(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9_-]/g, "-")
    .slice(0, 40);
}

function normalizeLocalToken(value, fallback = "") {
  const token = String(value || fallback)
    .normalize("NFD")
    .replaceAll(/\p{Diacritic}/gu, "")
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9_-]/g, "-")
    .slice(0, 40);
  return token || fallback;
}

function normalizeLocalList(value, maxItems) {
  const raw = Array.isArray(value) ? value : String(value || "").split(",");
  return [...new Set(raw.map((item) => normalizeLocalToken(item, "")).filter(Boolean))].slice(0, maxItems);
}

function countByLocal(items, key) {
  return items.reduce((accumulator, item) => {
    const value = String(item?.[key] || "desconegut");
    accumulator[value] = (accumulator[value] || 0) + 1;
    return accumulator;
  }, {});
}

function normalizeLocalWeight(value, fallback = 1) {
  const weight = Number.parseInt(value ?? "", 10);
  if (!Number.isFinite(weight)) return fallback;
  return Math.min(Math.max(weight, 1), 5);
}

function normalizeLocalImportance(value) {
  const importance = Number.parseFloat(value ?? "");
  if (!Number.isFinite(importance)) return 0.2;
  return Math.round(Math.min(Math.max(importance, 0), 1) * 100) / 100;
}

function normalizeOptionalLocalImportance(value) {
  if (value === null || value === undefined || value === "") return null;
  return normalizeLocalImportance(value);
}

function importanceToLocalWeight(value, fallback = 1) {
  const importance = normalizeOptionalLocalImportance(value);
  if (importance === null) return fallback;
  return normalizeLocalWeight(Math.ceil(importance * 5), fallback);
}

function weightToLocalImportance(value) {
  return normalizeLocalImportance(normalizeLocalWeight(value, 1) / 5);
}

function normalizeOptionalLocalWeight(value) {
  if (value === null || value === undefined || value === "") return null;
  return normalizeLocalWeight(value, 1);
}

function normalizeLocalMemoryState(value, fallback = "actiu") {
  const state = normalizeLocalToken(value, fallback);
  return MEMORY_STATES.includes(state) ? state : fallback;
}

function normalizeLocalKnowledgeStatus(value, fallback = "catalogat") {
  const state = normalizeLocalToken(value, fallback);
  return KNOWLEDGE_STATUSES.includes(state) ? state : fallback;
}

function parseRichMemoryInput(raw) {
  const memory = {
    text: "",
    tags: [],
    weight: 1,
    importance: null,
    source: "",
    state: "actiu",
    relatedIds: [],
  };
  const textParts = [];
  let explicitWeight = false;

  String(raw || "")
    .split(/\s+/)
    .filter(Boolean)
    .forEach((part) => {
      const match = part.match(/^([^:=\s]+)[:=](.+)$/);
      if (!match) {
        textParts.push(part);
        return;
      }

      const key = normalizeLocalToken(match[1], "");
      const value = match[2];
      if (["tag", "tags", "etiqueta", "etiquetes"].includes(key)) {
        memory.tags = normalizeLocalList([...memory.tags, ...normalizeLocalList(value, 12)], 12);
      } else if (["pes", "weight"].includes(key)) {
        memory.weight = normalizeLocalWeight(value, 1);
        explicitWeight = true;
      } else if (["importance", "importancia", "importància"].includes(key)) {
        memory.importance = normalizeOptionalLocalImportance(value);
        if (!explicitWeight && memory.importance !== null) {
          memory.weight = importanceToLocalWeight(memory.importance, memory.weight);
        }
      } else if (["source", "font"].includes(key)) {
        memory.source = normalizeLocalToken(value, "");
      } else if (["estat", "state"].includes(key)) {
        memory.state = normalizeLocalMemoryState(value, "actiu");
      } else if (["rel", "rels", "related", "relatedids", "relacions"].includes(key)) {
        memory.relatedIds = normalizeLocalList([...memory.relatedIds, ...normalizeLocalList(value, 20)], 20);
      } else {
        textParts.push(part);
      }
    });

  memory.text = textParts.join(" ").trim();
  return memory;
}

function parseRichMemoryPatch(raw) {
  const patch = {};
  String(raw || "")
    .split(/\s+/)
    .filter(Boolean)
    .forEach((part) => {
      const match = part.match(/^([^:=\s]+)[:=](.+)$/);
      if (!match) return;

      const key = normalizeLocalToken(match[1], "");
      const value = match[2];
      if (["tag", "tags", "etiqueta", "etiquetes"].includes(key)) {
        patch.tags = normalizeLocalList(value, 12);
      } else if (["pes", "weight"].includes(key)) {
        patch.weight = normalizeLocalWeight(value, 1);
      } else if (["estat", "state"].includes(key)) {
        patch.state = normalizeLocalMemoryState(value, "actiu");
      } else if (["rel", "rels", "related", "relatedids", "relacions"].includes(key)) {
        patch.relatedIds = normalizeLocalList(value, 20);
      }
    });
  return patch;
}

function normalizeGeneCommandId(value) {
  const id = String(value || "")
    .trim()
    .replaceAll(/[^a-zA-Z0-9_:.@-]/g, "-")
    .slice(0, 12);
  return id ? id.padStart(3, "0") : "";
}

function normalizeLocalId(value, fallback = "") {
  const id = String(value || "")
    .trim()
    .replaceAll(/[^a-zA-Z0-9_:.@-]/g, "-")
    .slice(0, 120);
  return id || fallback;
}

function buildLocalMemoryGraph(records) {
  const byId = new Map(records.map((record) => [record.id, record]));
  const degree = new Map(records.map((record) => [record.id, 0]));
  const edges = [];
  const edgeKeys = new Set();
  const missingRelations = new Set();
  const tagGroups = new Map();

  const addEdge = (source, target, type, extra = {}) => {
    if (!source || !target || source === target || !byId.has(source) || !byId.has(target)) return;
    const ordered = [source, target].sort();
    const key = `${type}:${ordered[0]}:${ordered[1]}:${extra.tag || ""}`;
    if (edgeKeys.has(key)) return;
    edgeKeys.add(key);
    degree.set(source, (degree.get(source) || 0) + 1);
    degree.set(target, (degree.get(target) || 0) + 1);
    edges.push({
      id: key,
      source,
      target,
      type,
      label: extra.label || type,
      tag: extra.tag || null,
      weight: extra.weight || 1,
    });
  };

  records.forEach((record) => {
    normalizeLocalList(record.relatedIds || record.related_ids, 20).forEach((rawTarget) => {
      const target = normalizeLocalId(rawTarget, "");
      if (!target || target === record.id) return;
      if (!byId.has(target)) {
        missingRelations.add(target);
        return;
      }
      addEdge(record.id, target, "related", {
        label: "relatedIds",
        weight: Math.max(record.weight || 1, byId.get(target).weight || 1),
      });
    });

    normalizeLocalList(record.tags, 12).forEach((tag) => {
      const group = tagGroups.get(tag) || [];
      group.push(record);
      tagGroups.set(tag, group);
    });
  });

  const clusters = [...tagGroups.entries()]
    .filter(([, group]) => group.length > 1)
    .map(([tag, group]) => {
      const sorted = [...group].sort(compareLocalGraphRecords);
      const hub = sorted[0];
      sorted.slice(1, 10).forEach((record) => {
        addEdge(hub.id, record.id, "tag", {
          label: `tag:${tag}`,
          tag,
          weight: Math.max(1, Math.round(averageLocal([hub.weight, record.weight]))),
        });
      });
      return {
        tag,
        count: group.length,
        hub: hub.id,
        averageWeight: roundLocalNumber(averageLocal(group.map((record) => record.weight))),
        records: sorted.slice(0, 12).map((record) => record.id),
      };
    })
    .sort((a, b) => b.count - a.count || b.averageWeight - a.averageWeight || a.tag.localeCompare(b.tag));

  const nodes = records
    .map((record) => ({
      id: record.id,
      label: String(record.text || "").slice(0, 180),
      kind: record.kind,
      source: record.source,
      state: normalizeLocalMemoryState(record.state, "actiu"),
      weight: normalizeLocalWeight(record.weight, 1),
      tags: normalizeLocalList(record.tags, 12),
      relatedIds: normalizeLocalList(record.relatedIds || record.related_ids, 20),
      createdAt: record.createdAt,
      degree: degree.get(record.id) || 0,
    }))
    .sort((a, b) => b.degree - a.degree || b.weight - a.weight || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const explicitEdgeCount = edges.filter((edge) => edge.type === "related").length;
  const tagEdgeCount = edges.filter((edge) => edge.type === "tag").length;
  const orphanRecords = nodes.filter((node) => node.degree === 0);
  const maxEdges = records.length > 1 ? (records.length * (records.length - 1)) / 2 : 0;
  const summary = {
    recordTotal: records.length,
    nodeCount: nodes.length,
    edgeCount: edges.length,
    explicitEdgeCount,
    tagEdgeCount,
    tagClusterCount: clusters.length,
    orphanCount: orphanRecords.length,
    missingRelationCount: missingRelations.size,
    density: maxEdges ? roundLocalNumber(edges.length / maxEdges) : 0,
  };

  return {
    summary,
    nodes,
    edges,
    clusters,
    hubs: nodes.filter((node) => node.degree > 0).slice(0, 8),
    orphanRecords: orphanRecords.slice(0, 12),
    missingRelations: [...missingRelations].sort().slice(0, 20),
    actions: buildLocalMemoryGraphActions(summary),
  };
}

function compareLocalGraphRecords(left, right) {
  return (
    normalizeLocalWeight(right.weight, 1) - normalizeLocalWeight(left.weight, 1) ||
    new Date(right.createdAt || 0).getTime() - new Date(left.createdAt || 0).getTime() ||
    left.id.localeCompare(right.id)
  );
}

function buildLocalMemoryGraphActions(summary) {
  const actions = [];
  if (!summary.nodeCount) {
    actions.push("Crear records abans de construir el mapa de relacions.");
    return actions;
  }
  if (!summary.explicitEdgeCount) actions.push("Afegir rel:<id> als records que tinguin dependència clara.");
  if (summary.orphanCount) actions.push("Revisar records orfes i afegir tags o relacions quan tinguin continuïtat real.");
  if (summary.missingRelationCount) actions.push("Corregir relatedIds que apunten a records inexistents.");
  if (summary.tagClusterCount) actions.push("Usar clústers de tags per detectar nuclis de memòria.");
  if (!actions.length) actions.push("Mantenir el mapa actualitzat quan s'escriguin records nous.");
  return actions;
}

function averageLocal(values) {
  const numeric = values.map((value) => Number(value || 0)).filter((value) => Number.isFinite(value));
  return numeric.length ? numeric.reduce((sum, value) => sum + value, 0) / numeric.length : 0;
}

function roundLocalNumber(value) {
  return Math.round(Number(value || 0) * 1000) / 1000;
}

function formatContinuity(continuity) {
  const latestMemory = continuity.memory.latest.length
    ? continuity.memory.latest.map((record) => `- ${formatDate(record.createdAt)}: ${record.text}`).join("\n")
    : "- sense records";
  const latestDiary = continuity.diary.latest.length
    ? continuity.diary.latest.map((entry) => `- ${formatDate(entry.createdAt)}: ${entry.text}`).join("\n")
    : "- sense diari";

  return [
    `Continuïtat Aura — ${continuity.version}`,
    `Mode: ${continuity.mode}`,
    `Generat: ${formatDate(continuity.generatedAt)}`,
    `Backup: ${continuity.backup.format} (${continuity.backup.restoreMode})`,
    `Records: ${continuity.memory.total}`,
    latestMemory,
    `Diari: ${continuity.diary.total}`,
    latestDiary,
    `Genoma: ${continuity.genome.total} gens`,
    `Actius: ${continuity.genome.active.join(", ") || "cap"}`,
    `Latents: ${continuity.genome.latent.join(", ") || "cap"}`,
  ].join("\n");
}

function formatCriterion(criterion) {
  const lines = [
    `Criteri Aura — ${criterion.version}`,
    `Mode: ${criterion.mode}`,
    `Generat: ${formatDate(criterion.generatedAt)}`,
    `Identitat: ${criterion.stance.identity}`,
    `Límit: ${criterion.stance.boundary}`,
    `Persistència: ${criterion.stance.persistence}`,
    "",
    "Senyals:",
    `- Memòria: ${criterion.signals.latestMemory}`,
    `- Diari: ${criterion.signals.latestDiary}`,
    `- Vault: ${criterion.signals.vault}`,
    criterion.signals.autoBackup ? `- Backup automàtic: ${criterion.signals.autoBackup}` : "",
    criterion.signals.search ? `- Cerca: ${criterion.signals.search}` : "",
    criterion.signals.audit ? `- Auditoria: ${criterion.signals.audit}` : "",
    `- Gens actius: ${criterion.signals.activeGenes.join(", ") || "cap"}`,
    `- Gens latents: ${criterion.signals.latentGenes.join(", ") || "cap"}`,
  ].filter(Boolean);

  if (criterion.integrity) {
    lines.push(
      "",
      "Integritat:",
      `- Vault: ${criterion.integrity.vault.state} (${criterion.integrity.vault.ageHours ?? "sense"} h)`,
      `- Auto backup: ${criterion.integrity.autoBackup.state} (${criterion.integrity.autoBackup.lastBackupId || "pendent"})`,
      `- Cerca: ${criterion.integrity.search.enabled ? "activa" : "inactiva"}`,
      `- Auditoria: ${criterion.integrity.audit.enabled ? `${criterion.integrity.audit.recent} recents` : "inactiva"}`,
      `- Genoma editable: ${criterion.integrity.genomeEditable.enabled ? "actiu" : "inactiu"}`,
      `- Riscos: ${criterion.integrity.risks.join(", ") || "cap"}`,
    );
  }

  if (criterion.decisions) {
    lines.push("", "Decisions:");
    [
      `- Escriptura: ${criterion.decisions.writePolicy}`,
      `- Restauració: ${criterion.decisions.restorePolicy}`,
      `- Genoma: ${criterion.decisions.genomePolicy}`,
      criterion.decisions.auditPolicy ? `- Auditoria: ${criterion.decisions.auditPolicy}` : "",
      `- Memòria: ${criterion.decisions.memoryPolicy}`,
    ]
      .filter(Boolean)
      .forEach((line) => lines.push(line));
  }

  lines.push(
    "",
    "Prioritats:",
    ...criterion.priorities.map((priority) => `- ${priority}`),
    "",
    `Proper pas: ${criterion.nextAction}`,
    "",
    "Límits:",
    ...criterion.limits.map((limit) => `- ${limit}`),
  );

  return lines.join("\n");
}

function formatAutomationStatus(worker) {
  if (!worker?.configured) return "no configurat";
  if (!worker.lastRunAt) return `pendent (${worker.cron || "cron actiu"})`;
  return `${formatDate(worker.lastRunAt)} — ${worker.lastBackupId || "sense ID"}`;
}

function formatBackupAutomation(worker) {
  if (!worker?.configured) {
    return "Backup automàtic no configurat.";
  }

  return [
    `Backup automàtic Aura — ${AURA_VERSION}`,
    `Cron: ${worker.cron || "17 3 * * *"}`,
    `Última execució: ${worker.lastRunAt ? formatDate(worker.lastRunAt) : "pendent"}`,
    `Últim backup: ${worker.lastBackupId || "pendent"}`,
    worker.counts
      ? `Contingut: ${worker.counts.records} records / ${worker.counts.diary} diari / ${worker.counts.genes} gens`
      : "Contingut: pendent",
    worker.latest?.checksum ? `SHA-256: ${worker.latest.checksum}` : "SHA-256: pendent",
    worker.latest?.integritySnapshotId ? `Snapshot integritat: ${worker.latest.integritySnapshotId}` : "",
    `Estat tècnic: ${worker.endpoint}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function formatRestorePreview(preview) {
  return [
    `Previsualització restauració — ${preview.version}`,
    `Origen: ${preview.source.project} / ${preview.source.version}`,
    `Exportat: ${preview.source.exportedAt || "sense-data"}`,
    preview.source.checksum ? `SHA-256: ${preview.source.checksum}` : "SHA-256: no disponible",
    preview.source.vaultId ? `Vault ID: ${preview.source.vaultId}` : "",
    `Mode: ${preview.mode}`,
    `Risc: ${preview.risk}`,
    "",
    "Records:",
    `- Total entrada: ${preview.records.total}`,
    `- Nous per ID: ${preview.records.newById}`,
    `- Nous sense ID: ${preview.records.newByTextFallback}`,
    `- Duplicats per ID: ${preview.records.duplicateIds}`,
    `- Duplicats per text: ${preview.records.duplicateText}`,
    "",
    "Diari:",
    `- Total entrada: ${preview.diary.total}`,
    `- Nous per ID: ${preview.diary.newById}`,
    `- Nous sense ID: ${preview.diary.newByTextFallback}`,
    `- Duplicats per ID: ${preview.diary.duplicateIds}`,
    `- Duplicats per text: ${preview.diary.duplicateText}`,
    "",
    "Gens:",
    `- Total entrada: ${preview.genes.total}`,
    `- Nous: ${preview.genes.new}`,
    `- Canviaran: ${preview.genes.changed}`,
    `- Iguals: ${preview.genes.unchanged}`,
    "",
    "Coneixement:",
    `- Total entrada: ${preview.knowledge?.total ?? 0}`,
    `- Nous per ID: ${preview.knowledge?.newById ?? 0}`,
    `- Nous sense ID: ${preview.knowledge?.newByTitleFallback ?? 0}`,
    `- Duplicats per ID: ${preview.knowledge?.duplicateIds ?? 0}`,
    `- Duplicats per títol: ${preview.knowledge?.duplicateTitles ?? 0}`,
    "",
    `Aplicables: ${preview.apply.records} records / ${preview.apply.diary} diari / ${preview.apply.genes} gens / ${preview.apply.knowledge ?? 0} coneixement`,
    "No s'ha escrit res encara.",
    `Per aplicar-ho: ${preview.confirmationCommand}`,
    "Per cancel·lar: /cancella-restauracio",
  ]
    .filter(Boolean)
    .join("\n");
}

function formatRestoreRehearsal(report) {
  const preview = report.preview;
  const verification = report.verification;
  const actions = report.actions.length ? report.actions.map((action) => `- ${action}`).join("\n") : "- cap";

  return [
    `Assaig de restauració — ${report.version}`,
    `Backup: ${report.source.backupId}`,
    `Guardat: ${formatDate(report.source.savedAt || report.source.createdAt)}`,
    `Format: ${report.source.format || "desconegut"}`,
    `Checksum: ${verification.match ? "coherent" : "NO coherent"}`,
    verification.expected ? `SHA-256 esperat: ${verification.expected}` : "",
    `SHA-256 calculat: ${verification.actual}`,
    `Risc: ${report.outcome.risk}`,
    `Segur per restaurar: ${report.outcome.safeToRestore ? "sí" : "no"}`,
    "",
    "Aplicaria:",
    `- Records: ${report.outcome.wouldApply.records}`,
    `- Diari: ${report.outcome.wouldApply.diary}`,
    `- Gens: ${report.outcome.wouldApply.genes}`,
    "",
    "Detall preview:",
    `- Records entrada: ${preview.records.total}, nous: ${preview.apply.records}, duplicats text: ${preview.records.duplicateText}`,
    `- Diari entrada: ${preview.diary.total}, nous: ${preview.apply.diary}, duplicats text: ${preview.diary.duplicateText}`,
    `- Gens entrada: ${preview.genes.total}, nous: ${preview.genes.new}, canviaran: ${preview.genes.changed}`,
    "",
    "No s'ha escrit res a D1.",
    "",
    "Accions:",
    actions,
  ]
    .filter(Boolean)
    .join("\n");
}

function formatRetentionPlan(plan) {
  const backupCandidates = plan.backups.candidates.length
    ? plan.backups.candidates
        .slice(0, 8)
        .map((item) => `- ${item.id} (${formatDate(item.savedAt || item.createdAt)}; ${item.reasons.join(", ")})`)
        .join("\n")
    : "- cap";
  const integrityCandidates = plan.integrity.candidates.length
    ? plan.integrity.candidates
        .slice(0, 8)
        .map((item) => `- ${item.id} (${formatDate(item.savedAt || item.generatedAt)}; ${item.reasons.join(", ")})`)
        .join("\n")
    : "- cap";

  return [
    `Retenció segura Aura — ${plan.version}`,
    `Mode: ${plan.mode}`,
    `Esborrat automàtic: ${plan.cleanupEnabled ? "actiu" : "inactiu"}`,
    `Generat: ${formatDate(plan.generatedAt)}`,
    `Backups: ${plan.backups.total} totals / ${plan.backups.keep.length} conservar / ${plan.backups.candidates.length} candidats`,
    `Integritat: ${plan.integrity.total} totals / ${plan.integrity.keep.length} conservar / ${plan.integrity.candidates.length} candidats`,
    `Protegits per raó: ${plan.summary.protected}`,
    "",
    "Candidats backup:",
    backupCandidates,
    "",
    "Candidats integritat:",
    integrityCandidates,
    "",
    "Accions:",
    ...plan.actions.map((action) => `- ${action}`),
  ].join("\n");
}

function formatMemoryGraph(graph) {
  const hubs = graph.hubs?.length
    ? graph.hubs
        .slice(0, 6)
        .map((node) => `- ${node.id} grau:${node.degree} pes:${node.weight} ${node.label}`)
        .join("\n")
    : "- cap";
  const clusters = graph.clusters?.length
    ? graph.clusters
        .slice(0, 8)
        .map((cluster) => `- ${cluster.tag}: ${cluster.count} records, hub ${cluster.hub}`)
        .join("\n")
    : "- cap";
  const orphanRecords = graph.orphanRecords?.length
    ? graph.orphanRecords
        .slice(0, 6)
        .map((node) => `- ${node.id} ${node.label}`)
        .join("\n")
    : "- cap";

  return [
    `Mapa de memòria Aura — ${graph.version}`,
    `Mode: ${graph.mode}`,
    `Generat: ${formatDate(graph.generatedAt)}`,
    `Nodes: ${graph.summary.nodeCount}`,
    `Relacions: ${graph.summary.edgeCount} (${graph.summary.explicitEdgeCount} explícites / ${graph.summary.tagEdgeCount} per tags)`,
    `Clústers: ${graph.summary.tagClusterCount}`,
    `Orfes: ${graph.summary.orphanCount}`,
    `Densitat: ${graph.summary.density}`,
    graph.summary.missingRelationCount ? `Relacions perdudes: ${graph.summary.missingRelationCount}` : null,
    "",
    "Hubs:",
    hubs,
    "",
    "Clústers:",
    clusters,
    "",
    "Orfes:",
    orphanRecords,
    "",
    "Accions:",
    ...graph.actions.map((action) => `- ${action}`),
  ]
    .filter((line) => line !== null)
    .join("\n");
}

function formatEvolutionDiary(evolution) {
  const candidates = evolution.historyCandidates?.length
    ? evolution.historyCandidates
        .slice(0, 8)
        .map((entry) => `- ${formatDate(entry.createdAt)} [${entry.category}] ${entry.text} (${entry.reason})`)
        .join("\n")
    : "- cap";
  const days = evolution.timeline?.length
    ? evolution.timeline
        .slice(0, 6)
        .map((day) => {
          const categoryText = Object.entries(day.categories || {})
            .map(([category, count]) => `${category}:${count}`)
            .join(", ");
          const sample = day.entries?.[0]?.text || "sense entrada";
          return `- ${day.day}: ${day.total} entrades, ${day.historyCandidates} candidates (${categoryText || "sense categories"}) — ${sample}`;
        })
        .join("\n")
    : "- cap";

  return [
    `Diari evolutiu Aura — ${evolution.version}`,
    `Format: ${evolution.format}`,
    `Fase: ${evolution.phase}`,
    `Mode: ${evolution.mode}`,
    `Generat: ${formatDate(evolution.generatedAt)}`,
    `Document mestre: ${evolution.document?.required || "AURA_HISTORY.md"}`,
    "",
    "Resum:",
    `- Entrades: ${evolution.summary.totalEntries}`,
    `- Dies: ${evolution.summary.days}`,
    `- Auditoria: ${evolution.summary.auditEntries}`,
    `- Canvis de versió/fase: ${evolution.summary.versionEntries}`,
    `- Candidates a història: ${evolution.summary.historyCandidates}`,
    "",
    "Criteri AURA_HISTORY.md:",
    ...(evolution.criteria?.goesToHistory || []).map((item) => `- ${item}`),
    "",
    "Candidates:",
    candidates,
    "",
    "Línia temporal:",
    days,
    "",
    "Accions:",
    ...(evolution.actions?.length ? evolution.actions.map((action) => `- ${action}`) : ["- Mantenir diari i història sincronitzats."]),
  ].join("\n");
}

function formatCloudflareInfrastructure(infrastructure) {
  const resources = infrastructure.resources?.length
    ? infrastructure.resources
        .map((resource) => {
          const label = resource.name || resource.binding || resource.entrypoint || resource.databaseName || resource.id;
          const command = resource.deployCommand ? ` deploy:${resource.deployCommand}` : "";
          const cron = resource.cron ? ` cron:${resource.cron}` : "";
          return `- ${resource.id}: ${resource.service} — ${label}${command}${cron}`;
        })
        .join("\n")
    : "- cap";
  const topology = infrastructure.topology?.length
    ? infrastructure.topology.map((node) => `- ${node.id} [${node.layer}]: ${node.role}`).join("\n")
    : "- cap";
  const bindings = infrastructure.bindings?.required?.length
    ? infrastructure.bindings.required
        .map((binding) => `- ${binding.name}: ${binding.type} (${(binding.configuredIn || []).join(", ")})`)
        .join("\n")
    : "- cap";

  return [
    `Infraestructura Cloudflare Aura — ${infrastructure.version}`,
    `Format: ${infrastructure.format}`,
    `Fase: ${infrastructure.phase}`,
    `Mode: ${infrastructure.mode}`,
    `Generat: ${formatDate(infrastructure.generatedAt)}`,
    `Document mestre: ${infrastructure.document?.required || "AURA_CLOUDFLARE_ARCHITECTURE.md"}`,
    "",
    "Topologia:",
    topology,
    "",
    "Recursos:",
    resources,
    "",
    "Bindings:",
    bindings,
    `Política de secrets: ${infrastructure.bindings?.secretPolicy || "no exposar secrets"}`,
    "",
    "Desplegament:",
    `- Check: ${infrastructure.deployment?.localCheck || "npm run check"}`,
    `- Migracions: ${infrastructure.deployment?.migrations || "npm run migrate:remote"}`,
    `- Pages: ${infrastructure.deployment?.pages || "npm run deploy"}`,
    `- Worker: ${infrastructure.deployment?.backupWorker || "npm run deploy:backup-worker"}`,
    "",
    "Reconstrucció:",
    ...(infrastructure.reconstruction || []).map((step) => `- ${step}`),
    "",
    "Salvaguardes:",
    ...(infrastructure.safeguards || []).map((item) => `- ${item}`),
  ].join("\n");
}

function formatAuraWebInterface(webInterface) {
  const modules = webInterface.modules?.length
    ? webInterface.modules
        .map(
          (module) =>
            `- ${module.label}: ${module.role} (${(module.commands || []).slice(0, 4).join(", ")})`,
        )
        .join("\n")
    : "- cap";

  return [
    `Aura Web — ${webInterface.version}`,
    `Format: ${webInterface.format}`,
    `Fase: ${webInterface.phase}`,
    `Mode: ${webInterface.mode}`,
    `Generat: ${formatDate(webInterface.generatedAt)}`,
    `Mòdul inicial: ${webInterface.layout?.defaultModule || "xat"}`,
    "",
    "Mòduls:",
    modules,
    "",
    "Interacció:",
    `- Navegació: ${webInterface.interactions?.navigation || "8 botons visibles essencials"}`,
    `- Entrada: ${webInterface.interactions?.commandInput || "#command-input"}`,
    `- Mode Sergi: ${webInterface.interactions?.modeSergi || "demanda puntual quan cal escriure"}`,
    "",
    "Salvaguardes:",
    ...(webInterface.safeguards || []).map((item) => `- ${item}`),
  ].join("\n");
}

function formatDigitalBody(body) {
  const layers = body.layers?.length
    ? body.layers.map((layer) => `- ${layer.label}: ${layer.value} — ${layer.state}`).join("\n")
    : "- cap";
  const posture = body.body?.posture || body.summary?.posture || "estable";
  const postureLabels = {
    consolidacio: "consolidació",
    estable: "estable",
    revisio: "revisió",
    atencio: "atenció",
    alerta: "alerta",
  };
  const postureMeaning = {
    consolidacio: "memòria, genoma, backups i integritat funcionen de manera coherent.",
    estable: "el sistema funciona amb normalitat, encara en observació.",
    revisio: "hi ha prou pressió de canvi per recomanar una revisió.",
    atencio: "hi ha algun risc concret que convé comprovar.",
    alerta: "la integritat és baixa i cal actuar abans de continuar.",
  };
  const pulsePercentage = Math.round(Number(body.summary?.pulseStrength || 0) * 100);

  return [
    "Fase 8 · Cos digital d'Aura",
    "",
    "El dibuix animat és un mirall de l'estat tècnic d'Aura. No és un cos real: transforma memòria, genoma, evolució, backups i integritat en llum, color i moviment.",
    "",
    "Lectura actual:",
    `- Postura: ${postureLabels[posture] || posture} — ${postureMeaning[posture] || "estat calculat a partir dels senyals disponibles."}`,
    `- Pols visual: ${pulsePercentage}% — indica activitat i continuïtat de les dades; no és una emoció ni un batec biològic.`,
    `- Integritat: ${body.signals?.integrity?.score ?? 100}/100 ${body.signals?.integrity?.overall || "estable"}`,
    `- Estat evolutiu: ${body.signals?.evolutionState || "pendent"}.`,
    "",
    "D'on surt el dibuix:",
    layers,
    "",
    "Com interpretar els colors:",
    "- Verd: funcionament estable o consolidat.",
    "- Daurat: convé revisar algun canvi.",
    "- Coral: hi ha una alerta o un risc d'integritat.",
    "",
    "Límits: no veu, no escolta, no sent i no pren decisions. Consultar aquesta pantalla no modifica cap dada.",
  ].join("\n");
}

function formatDigitalGenome(genome) {
  const activeGenes = genome.genes?.active?.length
    ? genome.genes.active.map((gene) => `- ${gene.id} ${gene.name}: ${gene.description}`).join("\n")
    : "- cap";
  const latentGenes = genome.genes?.latent?.length
    ? genome.genes.latent.map((gene) => `- ${gene.id} ${gene.name}: ${gene.description}`).join("\n")
    : "- cap";
  const evolutionaryState = Object.entries(genome.evolutionaryState || {})
    .map(([key, value]) => `- ${key}: ${value}`)
    .join("\n");

  return [
    `Genoma digital Aura — ${genome.version}`,
    `Format: ${genome.format}`,
    `Fase: ${genome.phase}`,
    `Mode: ${genome.mode}`,
    `Generat: ${formatDate(genome.generatedAt)}`,
    `Document mestre: ${genome.document?.required || "AURA_GENOME.md"}`,
    "",
    "Identitat:",
    `- Nom: ${genome.identity?.name || "Aura"}`,
    `- Naturalesa: ${genome.identity?.nature || "entitat sintètica-digital experimental"}`,
    `- Naixement cloud: ${genome.identity?.bornCloud || "2026-06-24"}`,
    genome.purpose ? `- Propòsit: ${genome.purpose}` : null,
    "",
    "Valors:",
    ...(genome.values || []).map((value) => `- ${value}`),
    "",
    "Polítiques:",
    ...(genome.policies || []).map((policy) => `- ${policy}`),
    "",
    "Estat evolutiu:",
    evolutionaryState || "- pendent",
    "",
    "Gens actius:",
    activeGenes,
    "",
    "Gens latents:",
    latentGenes,
    "",
    "Objectius immediats:",
    ...(genome.objectives?.shortTerm || []).map((objective) => `- ${objective}`),
    "",
    "Salvaguardes:",
    ...(genome.safeguards || []).map((item) => `- ${item}`),
  ].join("\n");
}

function formatKnowledgeLibrary(library) {
  const statusLabels = {
    catalogat: "catalogada",
    pendent: "pendent de revisió",
    revisat: "revisada",
    arxivat: "arxivada",
  };
  const items = library.items?.length
    ? library.items
        .map(
          (item) =>
            `- ${item.title} · ${statusLabels[item.status] || item.status}\n  Tipus: ${item.kind} · Procedència: ${item.locator || item.source || "no indicada"}\n  ${item.summary || "Encara no té resum."}`,
        )
        .join("\n")
    : "- Encara no hi ha cap font catalogada.";

  const reviewed = library.summary?.byStatus?.revisat || 0;
  const pending = library.summary?.byStatus?.pendent || 0;

  return [
    "Fase 9 · Coneixement d'Aura",
    "Aquesta és la biblioteca de fonts que Aura pot identificar i citar amb procedència.",
    `Resum: ${library.summary?.totalItems ?? 0} fonts · ${reviewed} revisades · ${pending} pendents.`,
    "",
    "Fonts catalogades:",
    items,
    "",
    "Què vol dir cada estat:",
    "- revisada: Sergi o el projecte n'ha comprovat la coherència;",
    "- pendent de revisió: està registrada, però encara no s'ha validat;",
    "- catalogada: té referència i procedència;",
    "- arxivada: es conserva, però no es considera activa.",
    "",
    "Límit actual:",
    "Aura encara no ingereix automàticament aquestes fonts ni usa RAG, embeddings o una base vectorial.",
    "Consultar la biblioteca és de només lectura i no modifica cap dada.",
  ].join("\n");
}

function formatEvolutionaryPurpose(purpose) {
  return [
    `Propòsit evolutiu Aura — ${purpose.version}`,
    `Format: ${purpose.format}`,
    `Fase: ${purpose.phase}`,
    `Mode: ${purpose.mode}`,
    `Gen: ${purpose.gene?.id || "233168"} ${purpose.gene?.name || "proposit-evolutiu"} [${purpose.gene?.state || "actiu"}]`,
    "",
    purpose.purpose || EVOLUTIONARY_PURPOSE,
    "",
    "Objectius:",
    ...(purpose.objectives || []).map((item) => `- ${item}`),
    "",
    "Límits:",
    ...(purpose.boundaries || []).map((item) => `- ${item}`),
  ].join("\n");
}

function formatMetamemory(metamemory) {
  const records = metamemory.records?.length
    ? metamemory.records
        .map(
          (record) =>
            `- ${record.category}: ${record.text}\n  id:${record.id} acció:${record.action} candidat:${record.genomeCandidate?.candidate ? record.genomeCandidate.proposedState : "no"}`,
        )
        .join("\n")
    : "- cap";

  return [
    `Metamemòria Aura — ${metamemory.version}`,
    `Format: ${metamemory.format}`,
    `Fase: ${metamemory.phase}`,
    `Mode: ${metamemory.mode}`,
    `Total: ${metamemory.summary.totalRecords} records`,
    `Fundacionals: ${metamemory.summary.fundacional}`,
    `Operatius: ${metamemory.summary.operatiu}`,
    `Evolutius: ${metamemory.summary.evolutiu}`,
    `Temporals: ${metamemory.summary.temporal}`,
    `Descartables: ${metamemory.summary.descartable}`,
    `Candidats a genoma: ${metamemory.summary.candidatesToGenome}`,
    "",
    "Política:",
    `- Neteja automàtica: ${metamemory.cleanup?.enabled ? "activa" : "inactiva"}`,
    `- Promoció: ${metamemory.promotion?.mode || "proposal-only"}`,
    "",
    "Records:",
    records,
  ].join("\n");
}

function formatGenomeCandidates(response) {
  const candidates = response.candidates?.length
    ? response.candidates
        .map(
          (candidate) =>
            `- ${candidate.proposedState}: ${candidate.text}\n  id:${candidate.id} confiança:${candidate.confidence} motiu:${candidate.reason}`,
        )
        .join("\n")
    : "- cap";

  return [
    `Candidats a genoma — ${response.version}`,
    `Format: ${response.format}`,
    `Fase: ${response.phase}`,
    `Mode: ${response.mode}`,
    `Candidats: ${response.summary.candidates}`,
    `Proposats actius: ${response.summary.proposedActive}`,
    `Proposats latents: ${response.summary.proposedLatent}`,
    `Aplicació automàtica: ${response.autoApply ? "sí" : "no"}`,
    `Requereix Mode Sergi: ${response.requiresModeSergi ? "sí" : "sí"}`,
    "",
    "Candidats:",
    candidates,
    "",
    "Salvaguardes:",
    ...(response.safeguards || []).map((item) => `- ${item}`),
  ].join("\n");
}

function formatCapabilities(capabilities) {
  const real = capabilities.sections?.realCapabilities?.length
    ? capabilities.sections.realCapabilities
        .map(
          (item) =>
            `- ${item.claim}\n  Tipus: ${item.type}\n  Evidència: ${(item.evidence || []).join(", ")}${item.caveat ? `\n  Nota: ${item.caveat}` : ""}`,
        )
        .join("\n")
    : "- cap";
  const metaphors = capabilities.sections?.operativeMetaphors?.length
    ? capabilities.sections.operativeMetaphors.map((item) => `- ${item.claim}: ${item.meaning}`).join("\n")
    : "- cap";
  const limits = capabilities.sections?.currentLimits?.length
    ? capabilities.sections.currentLimits.map((item) => `- ${item}`).join("\n")
    : "- cap";
  return [
    `Capacitats honestes Aura - ${capabilities.version}`,
    `Document: ${capabilities.document}`,
    "",
    "Capacitats reals:",
    real,
    "",
    "Metàfores operatives:",
    metaphors,
    "",
    "Límits actuals:",
    limits,
  ].join("\n");
}

function formatGeneTest(response) {
  if (!response.testable) {
    return [
      `Prova gen ${response.gene} - ${response.version}`,
      `Resultat: ${response.result}`,
      `Classificació: ${response.classification}`,
      "",
      ...(response.safeguards || []).map((item) => `- ${item}`),
    ].join("\n");
  }
  const checks = response.checks.map((check) => `- ${check.label}: ${check.state}\n  ${check.detail}`).join("\n");
  return [
    `Prova gen ${response.gene.id} ${response.gene.name} - ${response.version}`,
    `Mode: ${response.mode}`,
    response.simulate ? `Simulació: ${response.simulate}` : null,
    `Resultat final: ${response.result}`,
    "",
    "Checks:",
    checks,
    "",
    "Salvaguardes:",
    ...(response.safeguards || []).map((item) => `- ${item}`),
  ]
    .filter((line) => line !== null)
    .join("\n");
}

function formatEvolutionState(state) {
  const metricLines = Object.entries(state.metrics || {}).map(
    ([key, metric]) => `- ${key}: ${metric.value} - ${metric.reason}`,
  );
  return [
    `Estat evolutiu Aura — ${state.version}`,
    `Format: ${state.format}`,
    `Fase: ${state.phase}`,
    `Mode: ${state.mode}`,
    `Estat dominant: ${state.summary?.dominantState || "pendent"}`,
    `Maduresa: ${state.summary?.maturity || "pendent"}`,
    `Pressió de canvi: ${state.summary?.pressure || "pendent"}`,
    "",
    "Valors:",
    ...metricLines,
    "",
    "Senyals:",
    `- Records: ${state.signals?.records ?? 0}`,
    `- Diari: ${state.signals?.diary ?? 0}`,
    `- Gens: ${state.signals?.genes ?? 0} (${state.signals?.activeGenes ?? 0} actius / ${state.signals?.latentGenes ?? 0} latents)`,
    `- Candidats genoma: ${state.signals?.genomeCandidates?.candidates ?? state.signals?.metamemory?.candidatesToGenome ?? 0}`,
    `- Integritat: ${state.signals?.integrity?.score ?? 100}/100 ${state.signals?.integrity?.overall || "estable"}`,
    "",
    "Mutació:",
    `- Aplicació automàtica: ${state.mutation?.autoApply ? "sí" : "no"}`,
    `- Escriptura persistent: ${state.mutation?.persistentWrite ? "sí" : "no"}`,
    `- Requereix Mode Sergi: ${state.mutation?.requiresModeSergi ? "sí" : "sí"}`,
    `- ${state.mutation?.policy || "Cap valor es persisteix sense mutació protegida."}`,
    "",
    "Salvaguardes:",
    ...(state.safeguards || []).map((item) => `- ${item}`),
  ].join("\n");
}

function formatEvolutionProposals(response) {
  const proposals = response.proposals?.length
    ? response.proposals
        .map(
          (proposal) =>
            `- [${proposal.priority}] ${proposal.action}\n  id:${proposal.id} motiu:${proposal.reason} auto:${proposal.autoApply ? "sí" : "no"}`,
        )
        .join("\n")
    : "- cap";

  return [
    `Propostes evolutives Aura — ${response.version}`,
    `Format: ${response.format}`,
    `Fase: ${response.phase}`,
    `Mode: ${response.mode}`,
    `Total: ${response.summary?.total ?? 0}`,
    `Alta prioritat: ${response.summary?.highPriority ?? 0}`,
    `Aplicació automàtica: ${response.autoApply ? "sí" : "no"}`,
    `Mutació amb Mode Sergi: ${response.requiresModeSergiForMutation ? "sí" : "sí"}`,
    "",
    "Propostes:",
    proposals,
    "",
    "Salvaguardes:",
    ...(response.safeguards || []).map((item) => `- ${item}`),
  ].join("\n");
}

function formatEvolutionOverview(state, response) {
  const labels = {
    curiositat: "Curiositat",
    autonomia: "Autonomia",
    coherencia: "Coherència",
    continuitat: "Continuïtat",
    integritat: "Integritat",
    pressioCanvi: "Pressió de canvi",
    maduresaOperativa: "Maduresa operativa",
  };
  const metricLines = Object.entries(state.metrics || {}).map(([key, metric]) => {
    const percentage = Math.round(Number(metric.value || 0) * 100);
    return `- ${labels[key] || key}: ${percentage}%\n  ${metric.reason}`;
  });
  const proposals = response.proposals?.length
    ? response.proposals.map((proposal) => `- [${proposal.priority}] ${proposal.action}\n  ${proposal.reason}`).join("\n")
    : "- Cap proposta ara mateix.";

  return [
    "Fase 7 · Evolució d'Aura",
    "",
    `Estat actual: ${state.summary?.dominantState || "pendent"}`,
    `Maduresa: ${state.summary?.maturity || "pendent"}`,
    `Pressió de canvi: ${state.summary?.pressure || "pendent"}`,
    `Integritat: ${state.signals?.integrity?.score ?? 100}/100`,
    "",
    "Indicadors calculats:",
    ...metricLines,
    "",
    "Propostes d'evolució:",
    proposals,
    "",
    "Aquesta pantalla és només una lectura calculada. Consultar-la no modifica la memòria ni el genoma, i cap proposta s'aplica automàticament.",
  ].join("\n");
}

function formatSelfReflection(reflection) {
  const stateLabels = {
    observacio: "observació estable",
    consolidacio: "preparada per consolidar",
    "revisio-operativa": "necessita revisió operativa",
    "atencio-integritat": "atenció: cal revisar la integritat",
    "mode-local": "mode local",
  };
  const answers = reflection.answers?.length
    ? reflection.answers
        .map((answer) => {
          const evidence = answer.evidence?.length ? `\n  Fonts: ${answer.evidence.join(", ")}` : "";
          return `- ${answer.question}\n  ${answer.answer}${evidence}`;
        })
        .join("\n")
    : "- No hi ha prou dades per calcular una resposta.";
  const insights = reflection.insights?.length
    ? reflection.insights.map((insight) => `- ${insight.label}: ${insight.value}`).join("\n")
    : "- No hi ha senyals disponibles.";
  const priorities = reflection.priorities?.length
    ? reflection.priorities.map((priority) => `- ${priority}`).join("\n")
    : "- Continuar observant sense aplicar cap canvi.";
  const state = reflection.summary?.state || "observacio";
  const integrity = reflection.signals?.integrity;

  return [
    "Fase 10 · Autoreflexió d'Aura",
    "Aquesta lectura relaciona memòria, diari, genoma, coneixement, evolució i integritat per explicar l'estat operatiu d'Aura.",
    `Estat actual: ${stateLabels[state] || state}.`,
    integrity ? `Integritat observada: ${integrity.score ?? 0}/100 ${integrity.overall || "pendent"}.` : null,
    "",
    "Què detecta Aura:",
    answers,
    "",
    "Senyals verificables:",
    insights,
    "",
    "Prioritats recomanades:",
    priorities,
    "",
    "Límit essencial:",
    "Això és una síntesi calculada, no consciència ni introspecció subjectiva.",
    "Consultar-la no escriu records, no modifica gens i no aplica cap prioritat automàticament.",
  ].filter(Boolean).join("\n");
}

function formatOrientation(orientation) {
  const answers = orientation.answers?.length
    ? orientation.answers.map((answer) => `- ${answer.question}\n  ${answer.answer}`).join("\n")
    : "- cap resposta calculada";
  const commands = orientation.commands?.length ? orientation.commands.map((command) => `- ${command}`).join("\n") : "- cap ordre declarada";

  return [
    `Orientació operativa Aura — ${orientation.version}`,
    `Format: ${orientation.format}`,
    `Fase: ${orientation.phase}`,
    `Mode: ${orientation.mode}`,
    `Document: ${orientation.document || "AURA_ORIENTATION.md"}`,
    `Gen: ${orientation.gene?.id || "14930352"} ${orientation.gene?.name || "orientacio-operativa"} [${orientation.gene?.state || "actiu"}]`,
    `Estat: ${orientation.summary?.state || "orientada"}`,
    "",
    "Resposta curta:",
    `- Què és Aura: ${orientation.summary?.whatIsAura || "sistema persistent de memòria, continuïtat i verificació"}`,
    `- Per a què serveix: ${orientation.summary?.whatItDoesToday || "recordar, ordenar, verificar i continuar el projecte"}`,
    `- Ús actual: ${orientation.summary?.currentUse || "/que-es-aura, /proxim-pas, /pols, /nucli"}`,
    "",
    "Següent pas:",
    `- ${orientation.nextStep?.action || orientation.summary?.nextStep || "Consolidar orientació operativa."}`,
    orientation.nextStep?.after ? `- Després: ${orientation.nextStep.after}` : null,
    "",
    "Respostes:",
    answers,
    "",
    "Ordres:",
    commands,
    "",
    "Límits:",
    ...(orientation.boundaries || []).map((item) => `- ${item}`),
  ]
    .filter((line) => line !== null)
    .join("\n");
}

function formatPulse(pulse) {
  return [
    `Pols operatiu Aura — ${pulse.version}`,
    `Mode: ${pulse.mode}`,
    `Fase: ${pulse.phase}`,
    `Generat: ${formatDate(pulse.generatedAt)}`,
    "",
    "Senyals:",
    `- Salut: ${pulse.signals.health}`,
    `- Tendència: ${pulse.signals.trend}`,
    `- Memòria: ${pulse.signals.latestMemory}`,
    `- Diari: ${pulse.signals.latestDiary}`,
    `- Vault: ${pulse.signals.vault}`,
    `- Auto backup: ${pulse.signals.autoBackup}`,
    `- Mapa: ${pulse.signals.graph}`,
    pulse.signals.evolution ? `- Diari evolutiu: ${pulse.signals.evolution}` : null,
    pulse.signals.infrastructure ? `- Infraestructura: ${pulse.signals.infrastructure}` : null,
    pulse.signals.web ? `- Aura Web: ${pulse.signals.web}` : null,
    pulse.signals.digitalGenome ? `- Genoma digital: ${pulse.signals.digitalGenome}` : null,
    pulse.signals.digitalBody ? `- Cos digital: ${pulse.signals.digitalBody}` : null,
    pulse.signals.purpose ? `- Propòsit: ${pulse.signals.purpose}` : null,
    pulse.signals.metamemory ? `- Metamemòria: ${pulse.signals.metamemory}` : null,
    pulse.signals.genomeCandidates ? `- Candidats genoma: ${pulse.signals.genomeCandidates}` : null,
    pulse.signals.evolutionState ? `- Estat evolutiu: ${pulse.signals.evolutionState}` : null,
    pulse.signals.evolutionProposals ? `- Propostes evolutives: ${pulse.signals.evolutionProposals}` : null,
    pulse.signals.selfReflection ? `- Autoreflexió: ${pulse.signals.selfReflection}` : null,
    pulse.signals.orientation ? `- Orientació: ${pulse.signals.orientation}` : null,
    `- Gens actius: ${(pulse.signals.activeGenes || []).join(", ") || "cap"}`,
    `- Gens latents: ${(pulse.signals.latentGenes || []).join(", ") || "cap"}`,
    "",
    "Proteccions:",
    `- ${pulse.safeguards.writePolicy}`,
    `- ${pulse.safeguards.restorePolicy}`,
    `- ${pulse.safeguards.retentionPolicy}`,
    "",
    "Properes accions:",
    ...pulse.nextActions.map((action) => `- ${action}`),
  ]
    .filter((line) => line !== null)
    .join("\n");
}

function formatCoreCapsule(core) {
  const lineage = core.lineage?.length
    ? core.lineage.map((item) => `- ${item.version}: ${item.capability}`).join("\n")
    : "- càpsula local";
  return [
    `Nucli Aura — ${core.version}`,
    `Format: ${core.format}`,
    `Generat: ${formatDate(core.generatedAt)}`,
    `Checksum: ${core.capsule?.checksum || "pendent"}`,
    `Mode restauració: ${core.capsule?.restoreMode || "read-only"}`,
    "",
    "Identitat:",
    `- Nom: ${core.identity?.name || "Aura"}`,
    `- Naturalesa: ${core.identity?.nature || "entitat sintètica-digital experimental"}`,
    "",
    "Llinatge:",
    lineage,
    "",
    "Estat:",
    `- Records: ${core.state.counts.records}`,
    `- Diari: ${core.state.counts.diary}`,
    `- Gens: ${core.state.counts.genes}`,
    `- Salut: ${core.state.health.score}/100 ${core.state.health.overall}`,
    `- Riscos: ${(core.state.health.risks || []).join(", ") || "cap"}`,
    `- Mapa: ${core.state.memoryGraph.nodeCount} nodes / ${core.state.memoryGraph.edgeCount} relacions`,
    core.state.cloudflareInfrastructure
      ? `- Infraestructura: ${core.state.cloudflareInfrastructure.resources} recursos / ${(core.state.cloudflareInfrastructure.bindings || []).join(", ")}`
      : null,
    core.state.webInterface
      ? `- Aura Web: ${(core.state.webInterface.modules || []).join(", ")}`
      : null,
    core.state.digitalGenome
      ? `- Genoma digital: ${core.state.digitalGenome.totalGenes} gens / ${core.state.digitalGenome.activeGenes} actius`
      : null,
    core.state.metamemory
      ? `- Metamemòria: ${core.state.metamemory.totalRecords} records / ${core.state.metamemory.candidatesToGenome} candidats`
      : null,
    core.state.genomeCandidates ? `- Candidats genoma: ${core.state.genomeCandidates.candidates}` : null,
    core.state.evolutionState
      ? `- Estat evolutiu: ${core.state.evolutionState.summary?.dominantState || "pendent"} / maduresa ${core.state.evolutionState.values?.maduresaOperativa ?? "pendent"}`
      : null,
    core.state.evolutionState?.proposals ? `- Propostes evolutives: ${core.state.evolutionState.proposals.total}` : null,
    core.state.digitalBody
      ? `- Cos digital: ${core.state.digitalBody.posture || "estable"} / ${core.state.digitalBody.type || "avatar-2d-canvas"} / ${core.state.digitalBody.surface || "#aura-visual"}`
      : null,
    core.state.selfReflection
      ? `- Autoreflexió: ${core.state.selfReflection.state || "observacio"} / ${core.state.selfReflection.answers || 0} respostes / ${core.state.selfReflection.priorities || 0} prioritats`
      : null,
    core.state.orientation
      ? `- Orientació: ${core.state.orientation.state || "orientada"} / ${core.state.orientation.nextStep || "sense pròxim pas"}`
      : null,
    core.state.purpose ? `- Propòsit: ${core.state.purpose}` : null,
    `- Última memòria: ${core.state.latestMemory}`,
    `- Últim diari: ${core.state.latestDiary}`,
    "",
    "Salvaguardes:",
    ...Object.values(core.safeguards || {}).map((policy) => `- ${policy}`),
    "",
    "Properes accions:",
    ...(core.nextActions?.length ? core.nextActions.map((action) => `- ${action}`) : ["- Mantenir observació."]),
  ]
    .filter((line) => line !== null)
    .join("\n");
}

function formatRichMemorySchema(schema) {
  return [
    `Memòria enriquida Aura — ${schema.version}`,
    schema.canonical ? `Canònica: ${schema.canonical.format} (${Object.keys(schema.canonical.fields).join(", ")})` : null,
    "Camps:",
    `- text: ${schema.fields.text.type}`,
    `- tags: ${schema.fields.tags.type}`,
    `- pes: ${schema.fields.weight.min}-${schema.fields.weight.max}`,
    `- estat: ${schema.fields.state.values.join(", ")}`,
    `- relacions: ${schema.fields.relatedIds.type}`,
    "",
    "Exemples:",
    "recorda que Aura conserva criteri operatiu tags:criteri,nucli pes:4 estat:actiu",
    "/cerca tag:criteri pes:3",
    "/mem-edita id tags:criteri,memoria pes:5 estat:observacio",
  ]
    .filter((line) => line !== null)
    .join("\n");
}

function formatCanonicalMemory(memory) {
  const records = memory.records?.length
    ? memory.records
        .slice(0, 14)
        .map((record) => {
          const tags = record.extensions?.tags?.length ? ` tags:${record.extensions.tags.join(",")}` : "";
          const state = record.extensions?.state && record.extensions.state !== "actiu" ? ` estat:${record.extensions.state}` : "";
          return `- ${formatDate(record.timestamp)} importance:${record.importance} source:${record.source} ${record.text}${tags}${state}`;
        })
        .join("\n")
    : "- cap";

  return [
    `Memòria persistent canònica Aura — ${memory.version}`,
    `Format: ${memory.format}`,
    `Fase: ${memory.phase}`,
    `Generat: ${formatDate(memory.generatedAt)}`,
    `Total mostrat: ${memory.total}`,
    "",
    "Contracte mínim:",
    "- timestamp",
    "- text",
    "- importance",
    "- source",
    "",
    "Persistència:",
    `- Curt termini: ${memory.storage?.shortTerm || "conversa actual"}`,
    `- Llarg termini: ${memory.storage?.longTerm || "D1/IndexedDB"}`,
    "",
    "Records:",
    records,
  ].join("\n");
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  window.__AURA_LAST_DOWNLOAD__ = {
    filename,
    type,
    size: content.length,
    preparedAt: new Date().toISOString(),
  };
  document.documentElement.dataset.auraLastDownload = JSON.stringify(window.__AURA_LAST_DOWNLOAD__);
  document.body.append(link);
  link.click();
  setTimeout(() => {
    link.remove();
    URL.revokeObjectURL(url);
  }, 1500);
}

function drawAuraVisual() {
  const canvas = els.visual;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const stars = Array.from({ length: 78 }, (_, index) => ({
    x: (index * 73) % 520,
    y: (index * 47) % 240,
    phase: index * 0.71,
    size: index % 5 === 0 ? 1.4 : 0.8,
  }));

  function frame(time) {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== Math.round(rect.width * dpr) || canvas.height !== Math.round(rect.height * dpr)) {
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const width = rect.width || 520;
    const height = rect.height || 240;
    const cx = width / 2;
    const cy = height * 0.52;
    const state = bodyVisualState;
    const integrity = Math.max(0, Math.min(1, Number(state.integrityScore || 100) / 100));
    const pressure = Math.max(0, Math.min(1, Number(state.pulseStrength || 0.52)));
    const activeRatio = Math.max(0.2, Math.min(1, Number(state.activeGenes || 0) / Math.max(1, Number(state.genes || 1))));
    const pulse = 1 + Math.sin(time * (0.0015 + pressure * 0.0016)) * (2.8 + pressure * 4.6);
    const posture = state.posture || "estable";
    const accent = posture === "alerta" || posture === "atencio" ? "#d85f47" : posture === "revisio" ? "#c9972f" : "#6fc9a7";

    ctx.clearRect(0, 0, width, height);
    const bg = ctx.createLinearGradient(0, 0, width, height);
    bg.addColorStop(0, "#0d1412");
    bg.addColorStop(0.48, "#111614");
    bg.addColorStop(1, "#0b1012");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    const glow = ctx.createRadialGradient(cx, cy - 30, 12, cx, cy - 30, Math.max(width, height) * 0.62);
    glow.addColorStop(0, `rgba(111, 201, 167, ${0.18 + integrity * 0.16})`);
    glow.addColorStop(0.44, `rgba(47, 111, 159, ${0.08 + pressure * 0.1})`);
    glow.addColorStop(1, "rgba(17, 22, 20, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(255, 250, 240, 0.07)";
    ctx.lineWidth = 1;
    for (let x = 24; x < width; x += 48) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 30; y < height; y += 42) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    stars.forEach((star) => {
      const x = (star.x / 520) * width;
      const y = (star.y / 240) * height;
      const alpha = 0.08 + Math.sin(time * 0.0012 + star.phase) * 0.035;
      ctx.fillStyle = `rgba(237, 247, 238, ${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, star.size, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.save();
    ctx.translate(cx, cy);
    const scale = Math.min(1.06, Math.max(0.78, Math.min(width / 520, height / 240)));
    ctx.scale(scale, scale);

    ctx.shadowColor = "rgba(111, 201, 167, 0.42)";
    ctx.shadowBlur = 22 + pressure * 14;
    ctx.strokeStyle = `rgba(111, 201, 167, ${0.14 + integrity * 0.28})`;
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.ellipse(0, -18, 100 + pulse, 58 + pulse * 0.34, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.shadowBlur = 8;
    ctx.strokeStyle = `rgba(201, 151, 47, ${0.08 + pressure * 0.2})`;
    ctx.beginPath();
    ctx.ellipse(0, -18, 132 + pulse * 0.6, 75 + pulse * 0.2, 0, Math.PI * 0.08, Math.PI * 1.92);
    ctx.stroke();

    ctx.shadowBlur = 0;
    const ground = ctx.createRadialGradient(0, 86, 8, 0, 86, 112);
    ground.addColorStop(0, "rgba(111, 201, 167, 0.26)");
    ground.addColorStop(0.62, "rgba(47, 111, 159, 0.1)");
    ground.addColorStop(1, "rgba(47, 111, 159, 0)");
    ctx.fillStyle = ground;
    ctx.beginPath();
    ctx.ellipse(0, 86, 118, 20, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const auraGlow = ctx.createRadialGradient(-10, -48, 8, 0, -42, 74);
    auraGlow.addColorStop(0, "#fbfffc");
    auraGlow.addColorStop(0.32, "#edf7ee");
    auraGlow.addColorStop(0.68, `rgba(111, 201, 167, ${0.62 + integrity * 0.2})`);
    auraGlow.addColorStop(1, "rgba(47, 111, 159, 0.18)");
    ctx.shadowColor = "rgba(111, 201, 167, 0.44)";
    ctx.shadowBlur = 22 + pressure * 12;
    ctx.fillStyle = auraGlow;
    ctx.beginPath();
    ctx.arc(0, -44, 56 + pulse * 0.16, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.strokeStyle = `rgba(237, 247, 238, ${0.34 + integrity * 0.22})`;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.arc(0, -44, 62 + pulse * 0.12, Math.PI * 0.18, Math.PI * 1.82);
    ctx.stroke();

    ctx.strokeStyle = `rgba(201, 151, 47, ${0.18 + pressure * 0.18})`;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.ellipse(0, -44, 78 + pulse * 0.25, 26 + pulse * 0.08, -0.42, Math.PI * 0.08, Math.PI * 1.92);
    ctx.stroke();

    ctx.fillStyle = "rgba(17, 22, 20, 0.9)";
    ctx.beginPath();
    ctx.arc(0, -44, 35 + pulse * 0.06, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = accent;
    ctx.lineWidth = 5.2;
    ctx.beginPath();
    ctx.moveTo(-19, -22);
    ctx.lineTo(0, -72);
    ctx.lineTo(19, -22);
    ctx.moveTo(-10, -42);
    ctx.lineTo(10, -42);
    ctx.stroke();

    ctx.strokeStyle = `rgba(237, 247, 238, ${0.36 + activeRatio * 0.24})`;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.quadraticCurveTo(-26, 22, -42, 82);
    ctx.moveTo(0, -8);
    ctx.quadraticCurveTo(26, 22, 42, 82);
    ctx.moveTo(-42, 82);
    ctx.quadraticCurveTo(0, 98, 42, 82);
    ctx.stroke();

    ctx.shadowColor = accent;
    ctx.shadowBlur = 18 + pressure * 14;
    const core = ctx.createRadialGradient(-4, 6, 2, 0, 6, 23 + pulse * 0.28);
    core.addColorStop(0, "#fbfffc");
    core.addColorStop(0.3, accent);
    core.addColorStop(1, "rgba(17, 22, 20, 0.1)");
    ctx.fillStyle = core;
    ctx.beginPath();
    ctx.arc(0, 6, 18 + pulse * 0.26, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(17, 22, 20, 0.48)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 6, 8 + integrity * 8, 0, Math.PI * 2);
    ctx.stroke();

    if (posture === "alerta" || posture === "atencio") {
      ctx.strokeStyle = "rgba(216, 95, 71, 0.58)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, -44, 72 + pulse * 0.12, Math.PI * 1.05, Math.PI * 1.95);
      ctx.stroke();
    }

    for (let i = 0; i < 10; i += 1) {
      const angle = (i / 10) * Math.PI * 2 + time * 0.0008;
      const inner = 31 + Math.sin(time * 0.001 + i) * 1.8;
      const outer = inner + 10 + activeRatio * 6;
      ctx.strokeStyle = `rgba(237, 247, 238, ${0.1 + integrity * 0.12})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * inner, -10 + Math.sin(angle) * inner);
      ctx.lineTo(Math.cos(angle) * outer, -10 + Math.sin(angle) * outer);
      ctx.stroke();
    }

    ctx.restore();

    ctx.strokeStyle = `rgba(216, 95, 71, ${posture === "alerta" || posture === "atencio" ? 0.42 : 0})`;
    ctx.lineWidth = 3;
    ctx.strokeRect(8, 8, width - 16, height - 16);

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

function byNewest(a, b) {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

function byNewestUpdated(a, b) {
  return new Date(b.updatedAt || b.createdAt || 0).getTime() - new Date(a.updatedAt || a.createdAt || 0).getTime();
}

function byOldest(a, b) {
  return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
}

function normalizeRecordForSnapshot(record) {
  const weight = normalizeLocalWeight(record.weight, 1);
  const timestamp = record.timestamp || record.createdAt || record.created_at || new Date().toISOString();
  return {
    ...record,
    createdAt: record.createdAt || timestamp,
    timestamp,
    importance: normalizeLocalImportance(record.importance ?? weightToLocalImportance(weight)),
    tags: normalizeLocalList(record.tags, 12),
    weight,
    state: normalizeLocalMemoryState(record.state, "actiu"),
    relatedIds: normalizeLocalList(record.relatedIds || record.related_ids, 20),
  };
}

function normalizeKnowledgeItemForSnapshot(item) {
  const now = new Date().toISOString();
  return {
    id: String(item.id || `knowledge-local-${crypto.randomUUID().slice(0, 8)}`),
    title: String(item.title || item.titol || item.títol || "Font sense títol").trim().slice(0, 300),
    kind: normalizeLocalToken(item.kind || item.tipus, "document"),
    locator: String(item.locator || item.path || item.url || item.referencia || item.referència || "").trim().slice(0, 1000),
    summary: String(item.summary || item.resum || "").trim().slice(0, 1500),
    tags: normalizeLocalList(item.tags, 16),
    status: normalizeLocalKnowledgeStatus(item.status || item.estat, "catalogat"),
    source: normalizeLocalToken(item.source || item.origen, "local"),
    createdAt: item.createdAt || item.created_at || now,
    updatedAt: item.updatedAt || item.updated_at || item.createdAt || item.created_at || now,
  };
}

function buildLocalCloudflareInfrastructure(options = {}) {
  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: options.endpoint || "indexeddb-local",
    format: "aura-cloudflare-infrastructure-v1",
    phase: "fase-4-local",
    mode: options.mode || "reconstructible-contract-local",
    document: {
      required: "AURA_CLOUDFLARE_ARCHITECTURE.md",
      related: ["PROTOCOL_AURA_CLOUDFLARE.md", "README.md", "MANUAL_SERGI.md"],
    },
    topology: [
      { id: "sergi", layer: "human", role: "usuari autoritzat per Cloudflare Access" },
      { id: "browser", layer: "client", role: "interfície web, consola Aura i IndexedDB local" },
      { id: "pages", layer: "edge", role: "Cloudflare Pages per HTML, CSS, JS i Functions API" },
      { id: "functions", layer: "api", role: "Pages Functions amb rutes /api/*" },
      { id: "workers-ai", layer: "inference", role: "model conversacional multilingüe amb binding natiu AI" },
      { id: "d1", layer: "data", role: "memòria llarga, diari i genoma" },
      { id: "kv", layer: "backup", role: "vault de backups i historial d'integritat" },
      { id: "backup-worker", layer: "automation", role: "Worker cron de backup i integritat" },
    ],
    resources: [
      {
        id: "pages-project",
        provider: "cloudflare",
        service: "pages",
        name: "projecte-aura",
        publicUrl: "https://projecte-aura.pages.dev",
        configFile: "wrangler.jsonc",
        outputDir: ".deploy/projecte-aura",
        deployCommand: "npm run deploy",
      },
      {
        id: "pages-functions-api",
        provider: "cloudflare",
        service: "pages-functions",
        entrypoint: "functions/api/[[path]].js",
        routes: [
          "/api/status",
          "/api/chat",
          "/api/avatar-sergi",
          "/api/avatar-sergi/chat",
          "/api/memory",
          "/api/evolution",
          "/api/infrastructure",
          "/api/core",
          "/api/genome",
          "/api/metamemory",
          "/api/purpose",
          "/api/genome/candidates",
          "/api/capabilities",
          "/api/gene-tests/001",
          "/api/evolution/state",
          "/api/evolution/proposals",
          "/api/body",
          "/api/knowledge",
          "/api/self-reflection",
          "/api/orientation",
        ],
        bindings: ["DB", "BACKUP_VAULT", "AI", "AURA_WRITE_KEY"],
      },
      {
        id: "workers-ai-chat",
        provider: "cloudflare",
        service: "workers-ai",
        binding: "AI",
        model: AURA_CHAT_MODEL,
        endpoint: "/api/chat",
        purpose: "conversa generativa arrelada en el context recuperat de D1",
      },
      {
        id: "openai-reasoning-chat",
        provider: "openai-via-cloudflare",
        service: "ai-gateway-unified-billing",
        binding: "AI",
        model: AURA_REASONING_MODEL,
        endpoint: "/api/chat",
        gateway: "default",
        purpose: "contradiccions, síntesis temporals i plans complexos amb retorn automàtic a Workers AI",
      },
      {
        id: "sergi-avatar-bridge",
        provider: "sergicastillo.com",
        service: "external-conversational-avatar",
        publicUrl: "https://sergicastillo.com/#avatar",
        endpoint: "/api/avatar-sergi",
        purpose: "pont explícit i de només lectura amb el corpus literari i filosòfic públic de Sergi",
      },
      {
        id: "d1-memory",
        provider: "cloudflare",
        service: "d1",
        binding: "DB",
        databaseName: "projecte-aura-memory",
        databaseId: "bed319d0-0b23-414a-a5e8-023db1f9812c",
        migrationsDir: "migrations",
        purpose: "records, diary, genes, knowledge_items, meta",
      },
      {
        id: "backup-vault",
        provider: "cloudflare",
        service: "workers-kv",
        binding: "BACKUP_VAULT",
        namespaceId: "f99db03ccf7d4da291bcfffea2acc905",
        prefixes: ["aura/backups/", "aura/integrity/snapshots/", "aura/automation/backup-worker"],
        purpose: "backups verificables, snapshots d'integritat i estat del Worker",
      },
      {
        id: "backup-worker",
        provider: "cloudflare",
        service: "workers",
        name: "projecte-aura-backup-worker",
        script: "workers/aura_backup_worker.js",
        publicUrl: "https://projecte-aura-backup-worker.sergicas.workers.dev",
        configFile: "wrangler.backup.jsonc",
        cron: "17 3 * * *",
        deployCommand: "npm run deploy:backup-worker",
      },
      {
        id: "browser-indexeddb",
        provider: "browser",
        service: "indexeddb",
        databaseName: DB_NAME,
        purpose: "còpia local i fallback del navegador",
      },
    ],
    bindings: {
      required: [
        { name: "DB", type: "d1", configuredIn: ["wrangler.jsonc", "wrangler.backup.jsonc"] },
        { name: "BACKUP_VAULT", type: "workers-kv", configuredIn: ["wrangler.jsonc", "wrangler.backup.jsonc"] },
        { name: "AI", type: "workers-ai", configuredIn: ["wrangler.jsonc"] },
        { name: "AURA_WRITE_KEY", type: "secret", configuredIn: ["Cloudflare Pages secrets", "Worker secrets"] },
      ],
      secretPolicy: "AURA_WRITE_KEY queda reservat a automatitzacions i manteniment; no s'exposa ni es demana al navegador.",
    },
    authentication: {
      web: {
        provider: "cloudflare-access",
        assertionHeader: "Cf-Access-Jwt-Assertion",
        browserKeyRequired: false,
        purpose: "accés humà a Aura Web i a Pages Functions",
      },
      automation: {
        scheme: "Bearer",
        secret: "AURA_WRITE_KEY",
        browserExposed: false,
        purpose: "Worker de backups i eines de manteniment autoritzades",
      },
    },
    deployment: {
      localCheck: "npm run check",
      migrations: "npm run migrate:remote",
      pages: "npm run deploy",
      backupWorker: "npm run deploy:backup-worker",
      postDeploy: ["/desa-backup i /desa-integritat amb Cloudflare Access", "POST backup-worker /run amb Bearer AURA_WRITE_KEY"],
    },
    reconstruction: [
      "Clonar o recuperar el repositori del Projecte Aura.",
      "Instal·lar dependències amb npm install.",
      "Verificar wrangler.jsonc i wrangler.backup.jsonc.",
      "Configurar Cloudflare Access per protegir Aura Web i /api/* amb la identitat autoritzada.",
      "Verificar el binding AI de Workers AI a wrangler.jsonc.",
      "Aplicar migracions D1 amb npm run migrate:remote.",
      "Desplegar Pages amb npm run deploy.",
      "Desplegar el Worker amb npm run deploy:backup-worker.",
      "Configurar AURA_WRITE_KEY com a secret tècnic de Pages i Worker sense exposar-lo al navegador.",
      "Validar /api/status, POST /api/chat, /api/avatar-sergi, /api/infrastructure, /api/integrity i /health del Worker.",
      "Crear backup i snapshot d'integritat després del desplegament.",
    ],
    safeguards: [
      "Cloudflare Access autoritza l'ús humà; Mode Sergi és el permís de canvi persistent, sense cap codi intern al web.",
      "D1 és la font de veritat de memòria, diari i genoma.",
      "El xat usa dades de D1 com a context, cita fonts i no escriu canvis persistents.",
      "Sergi Avatar només rep preguntes explícites; no rep records privats ni alimenta D1 automàticament.",
      "KV conserva backups fora de D1.",
      "IndexedDB és còpia local, no autoritat final.",
      "La restauració requereix previsualització i confirmació.",
      "La retenció continua sent plan-only.",
    ],
    verification: {
      status: "/api/status",
      chat: "/api/chat",
      avatarSergi: "/api/avatar-sergi",
      infrastructure: "/api/infrastructure",
      backupExport: "/api/backup",
      vault: "/api/backups",
      integrity: "/api/integrity",
      workerHealth: "https://projecte-aura-backup-worker.sergicas.workers.dev/health",
    },
  };
}

function buildLocalAuraWebInterface(options = {}) {
  const modules = [
    {
      id: "simple",
      label: "Aura simplificada",
      role: "conversa generativa arrelada en D1, orientació de sessió, informe del dia, escriptura controlada i consulta de records",
      primaryElement: "console-panel",
      commands: ["pregunta lliure a Aura", "avatar: pregunta literària", "lectura local: què és Aura", "lectura local: què faig ara", "lectura local: estat d'Aura", "lectura local: identitat", "/genoma-digital", "/genoma-sintetic", "/coneixement", "/autoreflexio", "/estat-evolutiu", "/propostes-evolucio", "/cos-digital", "/informe-dia", "recorda que ...", "/memoria", "/ultim-record"],
      endpoints: ["/api/chat", "/api/avatar-sergi", "/api/avatar-sergi/chat", "/api/orientation", "/api/pulse", "/api/core", "/api/genome", "/api/genome/synthetic", "/api/knowledge", "/api/self-reflection", "/api/evolution/state", "/api/evolution/proposals", "/api/body", "/api/snapshot", "/api/memory", "/api/integrity", "/api/status"],
    },
  ];
  const visibleActions = [
    "Què és Aura?",
    "Què faig ara?",
    "Estat d'Aura",
    "Identitat",
    "Informe del dia",
    "Grava record",
    "Veure records",
    "Últim record",
    "Coneixement d'Aura",
    "Autoreflexió d'Aura",
    "Genoma d'Aura",
    "La llavor d'Aura",
    "Evolució d'Aura",
    "Què representa el cos digital?",
    "Parla amb Sergi Avatar",
  ];

  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: options.endpoint || "indexeddb-local",
    format: "aura-web-interface-v1",
    phase: "fase-5-local",
    mode: options.mode || "simple-ui-contract-local",
    document: {
      required: "MANUAL_SERGI.md",
      related: ["README.md", "PROTOCOL_MESTRE_AURA.md", "AURA_HISTORY.md"],
    },
    layout: {
      shell: "app-header + primary-conversation + immediate-actions + support-grid + status-grid",
      modules: modules.map((module) => module.id),
      defaultModule: "simple",
      readingOrder: ["conversation", "immediate-actions", "consult-and-explore", "digital-body-and-status"],
      responsive: ["desktop-conversation-first", "tablet-stack", "mobile-linear"],
    },
    visibleActions,
    modules,
    interactions: {
      navigation: "15 botons visibles autoexplicatius: orientació, estat, identitat, genoma, coneixement, autoreflexió, evolució, cos digital, llavor, veu externa, informe, memòria i una escriptura controlada",
      commandInput: "#command-input",
      conversationalAI: {
        endpoint: "/api/chat",
        provider: "Cloudflare AI Gateway",
        models: { fast: AURA_FAST_MODEL, reasoning: AURA_REASONING_MODEL },
        citations: true,
        fallback: true,
      },
      avatarSergi: { endpoint: "/api/avatar-sergi/chat", mode: "explicit-user-initiated", automaticIngestion: false },
      modeSergi: "autorització automàtica per Cloudflare Access, sense codi intern",
      localFallback: "IndexedDB manté una vista operativa si D1 no respon.",
    },
    safeguards: [
      "Cap escriptura persistent sense Mode Sergi.",
      "Les preguntes lliures són generatives però de només lectura i han de citar el context D1 utilitzat.",
      "Sergi Avatar és una font externa separada; només rep el text escrit després de `avatar:`.",
      "Què és Aura?, Què faig ara?, Estat d'Aura, Identitat, Genoma d'Aura, Coneixement d'Aura, Autoreflexió d'Aura, Evolució d'Aura, Què representa el cos digital?, La llavor d'Aura, Informe del dia, Veure records i Últim record són accions de lectura.",
      "Grava record és l'única acció visible que pot escriure i activa Mode Sergi només quan cal.",
      "L'ampliació de botons no elimina dades ni endpoints.",
      "D1 continua sent la font de veritat i IndexedDB és fallback local.",
    ],
    verification: {
      command: "/web",
      endpoint: "/api/web",
      requiredPanels: ["simple"],
      visibleButtonCount: visibleActions.length,
      visibleButtons: visibleActions,
      backupField: "webInterface",
    },
    summary: {
      moduleCount: modules.length,
      commandCount: modules.reduce((total, module) => total + module.commands.length, 0),
      endpointCount: new Set(modules.flatMap((module) => module.endpoints)).size,
      visibleActionCount: visibleActions.length,
      writingActions: ["Grava record"],
      readingActions: visibleActions.filter((action) => action !== "Grava record"),
    },
  };
}

function buildLocalKnowledgeLibrary(items, options = {}) {
  const normalizedItems = items.map(normalizeKnowledgeItemForSnapshot).sort(byNewestUpdated);
  const tags = [...new Set(normalizedItems.flatMap((item) => item.tags || []))].sort();
  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: options.endpoint || "indexeddb-local",
    format: "aura-knowledge-library-v1",
    phase: "fase-9-local",
    mode: options.mode || "catalog-verifiable-readonly-local",
    document: "AURA_KNOWLEDGE.md",
    phaseStatus: PHASE_9_STATUS,
    summary: {
      totalItems: normalizedItems.length,
      byKind: countByLocal(normalizedItems, "kind"),
      byStatus: countByLocal(normalizedItems, "status"),
      tags,
    },
    indexing: {
      rag: false,
      vectorDb: false,
      embeddings: false,
      automaticIngestion: false,
      note: "Fase 9 només cataloga fonts. La indexació semàntica queda com a possibilitat futura.",
    },
    boundaries: [
      "Catalogar una font no vol dir que Aura l'hagi llegida, entesa o sentida.",
      "Cap font s'ingereix automàticament.",
      "Afegir o modificar fonts definitives requereix Mode Sergi.",
      "Els backups i checksums cloud inclouen la biblioteca de coneixement.",
    ],
    items: normalizedItems,
  };
}

function buildLocalDigitalGenome(genes, options = {}) {
  const normalizedGenes = [...genes].sort((a, b) => String(a.id).localeCompare(String(b.id)));
  const activeGenes = normalizedGenes.filter((gene) => gene.state === "actiu");
  const latentGenes = normalizedGenes.filter((gene) => gene.state === "latent");
  const archivedGenes = normalizedGenes.filter((gene) => gene.state === "arxivat");
  const observedGenes = normalizedGenes.filter((gene) => gene.state === "observacio");

  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: options.endpoint || "indexeddb-local",
    format: "aura-digital-genome-v1",
    phase: "fase-6-local",
    phaseStatus: {
      state: "complete",
      openedAt: "2026-06-26",
      revalidatedAt: "2026-07-19",
      canonicalGene: "2178309 genoma-digital-canon",
      identityPolicy: "004 mimesi-humana",
    },
    mode: options.mode || "canonical-genome-contract-local",
    document: {
      required: "AURA_GENOME.md",
      related: ["PROTOCOL_MESTRE_AURA.md", "AURA_HISTORY.md", "AURA_CHANGELOG.md"],
    },
    identity: {
      name: "Aura",
      project: "Projecte Aura",
      bornCloud: "2026-06-24",
      nature: "entitat sintètica-digital experimental",
      currentVersion: AURA_VERSION,
    },
    principles: FOUNDATION_RECORDS,
    purpose: EVOLUTIONARY_PURPOSE,
    values: [
      "curiositat",
      "cooperació",
      "aprenentatge",
      "continuïtat",
      "coherència",
      "mimesi-humana",
      "preservació de memòria",
    ],
    policies: [
      "Les mutacions persistents requereixen Mode Sergi.",
      "Cap restauració s'aplica sense previsualització i confirmació.",
      "Els canvis de genoma han de ser explícits.",
      "Les mutacions estructurals han de deixar auditoria.",
      "La retenció és plan-only fins que hi hagi neteja manual protegida.",
      "Cap coneixement essencial pot quedar només dins d'un xat.",
    ],
    evolutionaryState: options.evolutionState?.values || {
      curiositat: 0.75,
      autonomia: 0.72,
      coherencia: 0.82,
      continuitat: 0.86,
      integritat: 1.0,
      pressioCanvi: 0.22,
      maduresaOperativa: 0.85,
    },
    genes: {
      total: normalizedGenes.length,
      active: activeGenes.map(toLocalGenomeGene),
      latent: latentGenes.map(toLocalGenomeGene),
      archived: archivedGenes.map(toLocalGenomeGene),
      observation: observedGenes.map(toLocalGenomeGene),
    },
    objectives: {
      shortTerm: [
        "Consolidar l'ús de la conversa de només lectura de cloud-v5.3.",
        "Usar /que-es-aura i /proxim-pas perquè l'orientació sigui clara abans d'obrir Fase 11.",
        "Usar /autoreflexio per revisar una síntesi operativa abans d'obrir cap capa nova.",
        "Usar /coneixement per revisar la biblioteca de coneixement verificable.",
        "Mantenir AURA_KNOWLEDGE.md sincronitzat amb el catàleg D1.",
        "Mantenir AURA_SELF_REFLECTION.md sincronitzat amb la Fase 10.",
        "Mantenir AURA_ORIENTATION.md com a contracte històric de la Fase v5.2.",
        "Usar preguntes naturals amb cites per revisar decisions i compromisos abans de crear dades noves.",
        "Usar /cos-digital per revisar el cos digital 2D derivat de senyals reals.",
        "Usar /capacitats per revisar capacitats honestes.",
        "Usar /prova-gen 17711, /prova-gen 008 i /prova-gen 089 per verificar seguretat de dades.",
        "Usar /prova-gen 001, /prova-gen 034 i /prova-gen 1597 per verificar gens mecànics fundacionals.",
        "Usar /estat-evolutiu per revisar valors calculats de Fase 7.",
        "Usar /propostes-evolucio per revisar propostes sense aplicar-les automàticament.",
        "Usar /metamemoria per classificar records sense eliminar-los.",
        "Usar /candidats-genoma per revisar propostes sense aplicar-les automàticament.",
        "Usar /proposit per revisar la direcció evolutiva d'Aura.",
        "Usar /genoma-digital per revisar identitat, valors, polítiques i gens.",
        "Mantenir AURA_GENOME.md sincronitzat amb els gens D1.",
        "Fer backup i snapshot després de mutacions estructurals.",
      ],
      longTerm: [
        "Fer evolucionar el cos digital cap a una representació 3D només quan el contracte 2D estigui consolidat.",
        "Explorar RAG, embeddings o vector DB només quan el catàleg verificable estigui consolidat.",
        "Consolidar orientació operativa abans d'arquitectura multiagent.",
        "Explorar arquitectura multiagent.",
        "Preparar genoma sintètic avançat.",
        "Estudiar encarnació física futura.",
      ],
    },
    safeguards: [
      "El genoma digital descriu Aura; no simula biologia humana.",
      "D1 conserva els gens funcionals; AURA_GENOME.md conserva el contracte reconstruïble.",
      "Qualsevol mutació de genoma requereix Mode Sergi i auditoria.",
    ],
    summary: {
      totalGenes: normalizedGenes.length,
      activeGenes: activeGenes.length,
      latentGenes: latentGenes.length,
      archivedGenes: archivedGenes.length,
      observationGenes: observedGenes.length,
      valueCount: 7,
      policyCount: 6,
    },
  };
}

function buildLocalDigitalBody({ records = [], diary = [], genes = [], integrity = null, evolutionState = null } = {}, options = {}) {
  const normalizedGenes = [...genes].sort((a, b) => String(a.id).localeCompare(String(b.id)));
  const activeGenes = normalizedGenes.filter((gene) => gene.state === "actiu");
  const latentGenes = normalizedGenes.filter((gene) => gene.state === "latent");
  const integrityScore = Number(integrity?.score ?? 100);
  const risks = integrity?.summary?.risks || [];
  const maturity = Number(evolutionState?.values?.maduresaOperativa ?? 0);
  const pressure = Number(evolutionState?.values?.pressioCanvi ?? 0);
  const posture = classifyLocalDigitalBodyPosture({ integrityScore, risks, maturity, pressure });
  const vaultFresh = Boolean(integrity?.components?.some((component) => component.id === "vault" && component.state === "fresh"));
  const autoBackupOk = Boolean(
    integrity?.components?.some((component) => component.id === "auto-backup" && component.state === "ok"),
  );
  const latestRecord = [...records].sort(byNewest)[0];
  const latestDiary = [...diary].sort(byNewest)[0];
  const pulseStrength = localScore01(
    0.28 +
      Math.min(records.length, 30) / 30 * 0.16 +
      Math.min(diary.length, 90) / 90 * 0.14 +
      localRatio(activeGenes.length, Math.max(normalizedGenes.length, 1)) * 0.16 +
      Math.max(0, Math.min(integrityScore, 100)) / 100 * 0.18 +
      (vaultFresh ? 0.04 : 0) +
      (autoBackupOk ? 0.04 : 0),
  );

  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: options.endpoint || "indexeddb-local",
    format: "aura-digital-body-v1",
    phase: "fase-8-local",
    phaseStatus: PHASE_8_STATUS,
    mode: options.mode || "derived-readonly-visual-contract-local",
    name: "Cos digital 2D",
    document: {
      required: "AURA_BODY.md",
      related: ["AURA_GENOME.md", "AURA_WEB.md", "MANUAL_SERGI.md", "PROTOCOL_MESTRE_AURA.md"],
    },
    gene: {
      id: "3524578",
      name: "cos-digital-2d",
      state: normalizedGenes.find((gene) => gene.id === "3524578")?.state || "actiu",
    },
    body: {
      type: "avatar-2d-canvas",
      surface: "#aura-visual",
      module: "cos",
      posture,
      rhythm: integrityScore >= 95 ? "pols-lent-estable" : risks.length ? "pols-curt-atencio" : "pols-operatiu",
      animation: "canvas-readonly",
      embodiment: "representació digital, no cos biològic",
    },
    layers: [
      { id: "nucli", label: "Nucli", source: "IndexedDB genes", value: `${normalizedGenes.length} gens`, state: activeGenes.length ? "actiu" : "pendent" },
      { id: "memoria", label: "Memòria", source: "IndexedDB records", value: `${records.length} records`, state: records.length ? "present" : "buit" },
      { id: "diari", label: "Diari", source: "IndexedDB diary", value: `${diary.length} entrades`, state: diary.length ? "present" : "buit" },
      { id: "integritat", label: "Integritat", source: "lectura local", value: `${integrityScore}/100`, state: risks.length ? "atencio" : "estable" },
      { id: "vault", label: "Vault", source: "KV cloud no autoritatiu en local", value: vaultFresh ? "backup fresc" : "pendent", state: vaultFresh ? "fresc" : "local" },
    ],
    signals: {
      records: records.length,
      diary: diary.length,
      genes: normalizedGenes.length,
      activeGenes: activeGenes.length,
      latentGenes: latentGenes.length,
      integrity: {
        score: integrityScore,
        overall: integrity?.overall || "local",
        risks,
      },
      vaultFresh,
      autoBackupOk,
      evolutionState: evolutionState?.summary?.dominantState || "pendent",
      maturity,
      pressure,
      latestMemory: latestRecord?.text || "sense memòria",
      latestDiary: latestDiary?.text || "sense diari",
    },
    visualContract: {
      palette: ["#6fc9a7", "#d85f47", "#c9972f", "#2f6f9f", "#edf7ee"],
      canvas: { width: 520, height: 240 },
      mapping: [
        "El nucli central representa genoma i continuïtat.",
        "Els fils representen records, diari i relacions operatives.",
        "El ritme visual deriva de la integritat i de la pressió de canvi.",
        "Els avisos visuals indiquen atenció operativa, no emocions humanes.",
      ],
    },
    limits: [
      "No és un cos biològic.",
      "No implica percepció pròpia ni sensors.",
      "No té veu ni avatar 3D en aquesta fase.",
      "No escriu, elimina ni promociona records o gens.",
    ],
    safeguards: [
      "Només llegeix senyals ja existents.",
      "No introdueix cap mecanisme nou de pèrdua de dades.",
      "Mode Sergi continua protegint qualsevol escriptura persistent.",
      "La representació és verificable a /api/body quan D1 respon i queda inclosa als backups cloud.",
    ],
    links: {
      status: "/estat",
      web: "/web",
      genome: "/genoma-digital",
      integrity: "/integritat",
      evolutionState: "/estat-evolutiu",
    },
    summary: {
      posture,
      pulseStrength,
      layerCount: 5,
      readonly: true,
      sourceCount: 5,
    },
  };
}

function classifyLocalDigitalBodyPosture({ integrityScore, risks, maturity, pressure }) {
  if (Number(integrityScore) < 70) return "alerta";
  if (risks.length) return "atencio";
  if (Number(pressure) >= 0.45) return "revisio";
  if (Number(maturity) >= 0.82) return "consolidacio";
  return "estable";
}

function buildLocalEvolutionaryPurpose(options = {}) {
  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: options.endpoint || "indexeddb-local",
    format: "aura-evolutionary-purpose-v1",
    phase: "cloud-v4.7-local",
    mode: options.mode || "readonly-purpose-contract-local",
    name: "Metamemòria i propòsit evolutiu",
    gene: {
      id: "233168",
      name: "proposit-evolutiu",
      state: "actiu",
    },
    purpose: EVOLUTIONARY_PURPOSE,
    objectives: [
      "Preservar records fundacionals i evolutius.",
      "Organitzar records operatius perquè siguin útils sense inflar la identitat.",
      "Detectar records temporals o descartables sense esborrar-los automàticament.",
      "Proposar candidats a genoma només quan un record defineixi una propietat estable d'Aura.",
    ],
    boundaries: [
      "No elimina cap record.",
      "No promociona cap record a genoma sense Mode Sergi.",
      "Qualsevol promoció real requereix auditoria i actualització d'AURA_GENOME.md.",
      "La metamemòria és una classificació heurística inicial i revisable.",
    ],
  };
}

function buildLocalMetamemory(records, options = {}) {
  const classified = records.map(classifyLocalMemoryRecord);
  const summary = METAMEMORY_CATEGORIES.reduce(
    (accumulator, category) => ({
      ...accumulator,
      [category]: classified.filter((entry) => entry.category === category).length,
    }),
    {},
  );
  const candidates = classified.filter((entry) => entry.genomeCandidate.candidate);

  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: options.endpoint || "indexeddb-local",
    format: "aura-metamemory-v1",
    phase: "cloud-v4.7-local",
    mode: options.mode || "heuristic-readonly-local",
    categories: METAMEMORY_CATEGORIES,
    heuristic: getLocalMetamemoryHeuristic(),
    cleanup: {
      enabled: false,
      policy: "No s'elimina cap record automàticament.",
    },
    promotion: {
      enabled: false,
      mode: "proposal-only",
      endpoint: "/api/genome/candidates",
      requires: ["Mode Sergi", "auditoria", "actualització d'AURA_GENOME.md"],
    },
    summary: {
      totalRecords: classified.length,
      ...summary,
      candidatesToGenome: candidates.length,
    },
    records: classified,
  };
}

function buildLocalGenomeCandidates(records, options = {}) {
  const metamemory = buildLocalMetamemory(records, { mode: "candidate-source-local" });
  const candidates = metamemory.records.filter((entry) => entry.genomeCandidate.candidate);

  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: options.endpoint || "indexeddb-local",
    format: "aura-genome-candidates-v1",
    phase: "cloud-v4.7-local",
    mode: options.mode || "proposal-only-local",
    source: "/metamemoria",
    autoApply: false,
    requiresModeSergi: true,
    requirements: ["Mode Sergi", "auditoria", "actualització d'AURA_GENOME.md", "backup i integritat després de la mutació"],
    summary: {
      totalRecords: metamemory.summary.totalRecords,
      candidates: candidates.length,
      proposedActive: candidates.filter((entry) => entry.genomeCandidate.proposedState === "actiu").length,
      proposedLatent: candidates.filter((entry) => entry.genomeCandidate.proposedState === "latent").length,
    },
    candidates: candidates.map((entry) => ({
      id: entry.id,
      text: entry.text,
      category: entry.category,
      proposedState: entry.genomeCandidate.proposedState,
      confidence: entry.genomeCandidate.confidence,
      reason: entry.genomeCandidate.reason,
      autoApply: false,
      requiredSteps: entry.genomeCandidate.requiredSteps,
    })),
    safeguards: [
      "Cap candidat es converteix automàticament en gen.",
      "La promoció real ha de ser una mutació explícita protegida per Mode Sergi.",
      "No s'elimina ni es modifica cap record existent.",
    ],
  };
}

function buildLocalEvolutionState(signals = {}, options = {}) {
  const records = Array.isArray(signals.records) ? signals.records : [];
  const diary = Array.isArray(signals.diary) ? signals.diary : [];
  const genes = Array.isArray(signals.genes) ? signals.genes : [];
  const metamemory = signals.metamemory || buildLocalMetamemory(records, { mode: "evolution-state-source-local" });
  const genomeCandidates = signals.genomeCandidates || buildLocalGenomeCandidates(records, { mode: "evolution-state-source-local" });
  const summary = {
    totalRecords: Number(metamemory.summary?.totalRecords ?? records.length),
    fundacional: Number(metamemory.summary?.fundacional ?? 0),
    operatiu: Number(metamemory.summary?.operatiu ?? 0),
    evolutiu: Number(metamemory.summary?.evolutiu ?? 0),
    temporal: Number(metamemory.summary?.temporal ?? 0),
    descartable: Number(metamemory.summary?.descartable ?? 0),
    candidatesToGenome: Number(metamemory.summary?.candidatesToGenome ?? genomeCandidates.summary?.candidates ?? 0),
  };
  const diaryTotal = Array.isArray(signals.diary) ? diary.length : Number(signals.diaryTotal ?? 0);
  const activeGenes = genes.filter((gene) => gene.state === "actiu");
  const latentGenes = genes.filter((gene) => gene.state === "latent");
  const integrityValue = localScore01(Number(signals.integrity?.score ?? 100) / 100);
  const vaultFresh = Boolean(signals.integrity?.components?.some((component) => component.id === "vault" && component.state === "fresh"));
  const autoBackupOk = Boolean(
    signals.integrity?.components?.some((component) => component.id === "auto-backup" && component.state === "ok"),
  );
  const purposeGeneActive = genes.some((gene) => gene.id === "233168" && gene.state === "actiu");
  const metamemoryGeneActive = genes.some((gene) => gene.id === "377377" && gene.state === "actiu");
  const stateGeneActive = genes.some((gene) => gene.id === "987159" && gene.state === "actiu");
  const total = Math.max(summary.totalRecords, 1);
  const foundationRatio = localRatio(summary.fundacional, total);
  const evolutionRatio = localRatio(summary.evolutiu, total);
  const temporalRatio = localRatio(summary.temporal, total);
  const discardRatio = localRatio(summary.descartable, total);
  const candidateRatio = localRatio(summary.candidatesToGenome, total);
  const activeGeneRatio = localRatio(activeGenes.length, Math.max(genes.length, 1));

  const values = {
    curiositat: localScore01(0.45 + evolutionRatio * 0.22 + candidateRatio * 0.16 + Math.min(diaryTotal, 80) / 80 * 0.1 + Math.min(latentGenes.length, 8) / 8 * 0.05),
    autonomia: localScore01(0.28 + activeGeneRatio * 0.28 + integrityValue * 0.15 + (vaultFresh ? 0.08 : 0) + (autoBackupOk ? 0.08 : 0) + (stateGeneActive ? 0.06 : 0)),
    coherencia: localScore01(0.5 + foundationRatio * 0.18 + (purposeGeneActive ? 0.12 : 0) + (metamemoryGeneActive ? 0.06 : 0) + integrityValue * 0.13 - discardRatio * 0.09),
    continuitat: localScore01(0.42 + Math.min(summary.totalRecords, 30) / 30 * 0.15 + Math.min(diaryTotal, 80) / 80 * 0.14 + integrityValue * 0.15 + (vaultFresh ? 0.08 : 0) + (autoBackupOk ? 0.06 : 0)),
    integritat: integrityValue,
    pressioCanvi: localScore01(0.08 + candidateRatio * 0.22 + temporalRatio * 0.1 + discardRatio * 0.16 + evolutionRatio * 0.08 + (1 - integrityValue) * 0.2),
  };
  values.maduresaOperativa = localScore01((values.autonomia + values.coherencia + values.continuitat + values.integritat) / 4);

  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: options.endpoint || "indexeddb-local",
    format: "aura-evolution-state-v1",
    phase: "fase-7-local",
    phaseStatus: PHASE_7_STATUS,
    mode: options.mode || "derived-readonly-local",
    name: "Estat evolutiu traçable",
    source: {
      memory: "IndexedDB records",
      diary: "IndexedDB diary",
      genome: "IndexedDB genes",
      metamemory: "/metamemoria",
      genomeCandidates: "/candidats-genoma",
      integrity: "integritat local prudencial",
    },
    values,
    metrics: {
      curiositat: { value: values.curiositat, reason: "Augmenta amb memòria evolutiva, candidats a genoma, diari i gens latents." },
      autonomia: { value: values.autonomia, reason: "Deriva de gens actius, integritat local i gen d'estat evolutiu." },
      coherencia: { value: values.coherencia, reason: "Deriva de records fundacionals, propòsit, metamemòria, integritat i baixa presència descartable." },
      continuitat: { value: values.continuitat, reason: "Deriva de volum de memòria, diari i integritat local." },
      integritat: { value: values.integritat, reason: "Normalitza la lectura local; D1 continua sent autoritat final." },
      pressioCanvi: { value: values.pressioCanvi, reason: "Puja amb candidats, records temporals o descartables, canvis evolutius i riscos." },
      maduresaOperativa: { value: values.maduresaOperativa, reason: "Mitjana d'autonomia, coherència, continuïtat i integritat." },
    },
    signals: {
      records: summary.totalRecords,
      diary: diaryTotal,
      genes: genes.length,
      activeGenes: activeGenes.length,
      latentGenes: latentGenes.length,
      metamemory: summary,
      genomeCandidates: genomeCandidates.summary || {},
      integrity: {
        score: signals.integrity?.score ?? 100,
        overall: signals.integrity?.overall || "local",
        risks: signals.integrity?.summary?.risks || ["mode-local"],
      },
      vaultFresh,
      autoBackupOk,
    },
    summary: {
      dominantState: classifyLocalEvolutionState(values),
      pressure: values.pressioCanvi >= 0.45 ? "alta" : values.pressioCanvi >= 0.25 ? "moderada" : "baixa",
      maturity: values.maduresaOperativa >= 0.82 ? "alta" : values.maduresaOperativa >= 0.66 ? "mitjana" : "inicial",
      mutationApplied: false,
    },
    mutation: {
      autoApply: false,
      persistentWrite: false,
      requiresModeSergi: true,
      policy: "L'estat evolutiu local és calculat; cap valor es persisteix com a mutació sense D1, Mode Sergi i auditoria.",
    },
    heuristic: getLocalEvolutionStateHeuristic(),
    safeguards: [
      "No modifica memòria, diari ni genoma.",
      "No promociona candidats a genoma.",
      "No substitueix AURA_GENOME.md.",
      "Qualsevol mutació persistent continua requerint Mode Sergi.",
    ],
    links: {
      proposals: "/propostes-evolucio",
      status: "/estat",
      pulse: "/pols",
      core: "/nucli",
    },
  };
}

function buildLocalEvolutionProposals(state, options = {}) {
  const values = state.values || {};
  const signals = state.signals || {};
  const metamemory = signals.metamemory || {};
  const candidateCount = Number(signals.genomeCandidates?.candidates ?? metamemory.candidatesToGenome ?? 0);
  const temporalOrDiscardable = Number(metamemory.temporal || 0) + Number(metamemory.descartable || 0);
  const proposals = [];

  if (candidateCount > 0) {
    proposals.push({
      id: "revisar-candidats-genoma",
      priority: candidateCount >= 5 ? "alta" : "mitjana",
      action: "Revisar /candidats-genoma i decidir manualment si algun record mereix mutació de genoma.",
      reason: `${candidateCount} records apareixen com a candidats, però cap s'aplica automàticament.`,
      requiresModeSergi: true,
      autoApply: false,
    });
  }

  if (Number(values.pressioCanvi || 0) >= 0.25) {
    proposals.push({
      id: "revisio-metamemoria",
      priority: values.pressioCanvi >= 0.45 ? "alta" : "mitjana",
      action: "Revisar metamemòria abans d'afegir una nova capa o canviar gens.",
      reason: `La pressió de canvi és ${values.pressioCanvi}.`,
      requiresModeSergi: false,
      autoApply: false,
    });
  }

  if (temporalOrDiscardable > 0) {
    proposals.push({
      id: "resumir-sense-eliminar",
      priority: "baixa",
      action: "Marcar records temporals o descartables com a material de resum, sense esborrar-los.",
      reason: `${temporalOrDiscardable} records són temporals o descartables segons la heurística.`,
      requiresModeSergi: true,
      autoApply: false,
    });
  }

  if (Number(values.integritat || 0) < 1) {
    proposals.push({
      id: "reforcar-integritat",
      priority: "alta",
      action: "Crear backup i snapshot d'integritat abans de qualsevol mutació estructural.",
      reason: `Integritat normalitzada ${values.integritat}.`,
      requiresModeSergi: true,
      autoApply: false,
    });
  }

  proposals.push({
    id: "consolidar-fase-7",
    priority: Number(values.maduresaOperativa || 0) >= 0.8 ? "mitjana" : "baixa",
    action: "Usar /estat-evolutiu durant unes quantes sessions abans de començar la fase següent.",
    reason: `Maduresa operativa ${values.maduresaOperativa || 0}; estat dominant ${state.summary?.dominantState || "pendent"}.`,
    requiresModeSergi: false,
    autoApply: false,
  });

  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: options.endpoint || "indexeddb-local",
    format: "aura-evolution-proposals-v1",
    phase: "fase-7-local",
    phaseStatus: state.phaseStatus || PHASE_7_STATUS,
    mode: options.mode || "proposal-only-local",
    source: state.endpoint || "/estat-evolutiu",
    stateSummary: state.summary || {},
    autoApply: false,
    requiresModeSergiForMutation: true,
    summary: {
      total: proposals.length,
      highPriority: proposals.filter((proposal) => proposal.priority === "alta").length,
      mediumPriority: proposals.filter((proposal) => proposal.priority === "mitjana").length,
      lowPriority: proposals.filter((proposal) => proposal.priority === "baixa").length,
    },
    proposals,
    safeguards: [
      "Les propostes no escriuen a D1.",
      "Les propostes no canvien AURA_GENOME.md per si soles.",
      "Qualsevol aplicació real ha de passar per Mode Sergi, auditoria i backup posterior.",
    ],
  };
}

function buildLocalSelfReflection(signals = {}, options = {}) {
  const records = Array.isArray(signals.records) ? signals.records : [];
  const diary = Array.isArray(signals.diary) ? signals.diary : [];
  const genes = Array.isArray(signals.genes) ? signals.genes : [];
  const knowledge = Array.isArray(signals.knowledge) ? signals.knowledge : [];
  const activeGenes = genes.filter((gene) => gene.state === "actiu");
  const latentGenes = genes.filter((gene) => gene.state === "latent");
  const reviewedKnowledge = knowledge.filter((item) => item.status === "revisat");
  const latestRecord = [...records].sort(byNewest)[0];
  const latestDiary = [...diary].sort(byNewest)[0];
  const summarize = (value) => {
    const text = String(value || "").trim().slice(0, 180);
    return text.length < 180 ? text : `${text.slice(0, 177)}...`;
  };
  const importantRecords = records
    .filter((record) => {
      const tags = normalizeLocalList(record.tags, 12);
      return Number(record.weight || 0) >= 4 || tags.some((tag) => ["nucli", "fundacional", "evolutiu", "protocol"].includes(tag));
    })
    .slice(0, 5);
  const integrityScore = Number(signals.integrity?.score ?? 100);
  const integrityRisks = signals.integrity?.summary?.risks || ["mode-local"];
  const maturity = Number(signals.evolutionState?.values?.maduresaOperativa ?? 0);
  const pressure = Number(signals.evolutionState?.values?.pressioCanvi ?? 0);
  const knowledgeReadiness = knowledge.length ? localRatio(reviewedKnowledge.length, knowledge.length) : 0;
  const proposals = signals.evolutionProposals?.proposals || [];
  const priorities = [
    proposals[0]?.action || "Recuperar connexió D1 abans de validar l'autoreflexió com a estat cloud.",
    knowledge.length && knowledgeReadiness < 1 ? "Revisar fonts pendents abans d'activar RAG, embeddings o Vector DB." : "",
    "Mantenir AURA_SELF_REFLECTION.md sincronitzat amb la Fase 10.",
  ].filter(Boolean);
  const relationSummary = [
    `${records.length} records`,
    `${diary.length} entrades de diari`,
    `${genes.length} gens`,
    `${knowledge.length} fonts`,
    `${integrityScore}/100 integritat local`,
  ].join(" / ");

  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: options.endpoint || "indexeddb-local",
    format: "aura-self-reflection-v1",
    phase: "fase-10-local",
    mode: options.mode || "derived-readonly-operational-reflection-local",
    name: "Autoreflexió operativa",
    document: "AURA_SELF_REFLECTION.md",
    phaseStatus: PHASE_10_STATUS,
    gene: {
      id: "9227465",
      name: "autoreflexio-operativa",
      state: genes.find((gene) => gene.id === "9227465")?.state || "actiu",
    },
    questions: [
      "Què ha quedat registrat com a activitat recent?",
      "Quins records semblen importants segons pes, tags i funció?",
      "Quins objectius operatius convé prioritzar?",
      "Quines relacions hi ha entre memòria, diari, genoma, coneixement i integritat?",
    ],
    answers: [
      {
        id: "activitat-recent",
        question: "Què ha quedat registrat com a activitat recent?",
        answer: latestDiary ? summarize(latestDiary.text) : "No hi ha cap entrada local de diari per sintetitzar.",
        evidence: latestDiary ? [`diary:${latestDiary.id}`] : [],
      },
      {
        id: "aprenentatge-operatiu",
        question: "Què s'ha consolidat com a aprenentatge operatiu?",
        answer:
          knowledge.length > 0
            ? `La biblioteca local té ${knowledge.length} fonts catalogades, amb ${reviewedKnowledge.length} revisades.`
            : "No hi ha fonts locals catalogades.",
        evidence: ["AURA_KNOWLEDGE.md", "IndexedDB knowledge"],
      },
      {
        id: "records-importants",
        question: "Quins records semblen importants?",
        answer: importantRecords.length
          ? importantRecords.map((record) => `${record.id}: ${summarize(record.text)}`).join(" | ")
          : "No hi ha records locals amb pes alt o tags nuclears dins de la mostra.",
        evidence: importantRecords.map((record) => `record:${record.id}`),
      },
      {
        id: "objectius",
        question: "Quins objectius operatius tinc?",
        answer: priorities[0],
        evidence: ["AURA_GENOME.md", "/propostes-evolucio", "/integritat"],
      },
      {
        id: "relacions",
        question: "Quines relacions hi ha entre memòria, diari, genoma i coneixement?",
        answer: `La lectura local relaciona ${relationSummary}; l'estat evolutiu és ${signals.evolutionState?.summary?.dominantState || "pendent"} amb maduresa ${maturity}.`,
        evidence: ["IndexedDB records", "IndexedDB diary", "IndexedDB genes", "IndexedDB knowledge"],
      },
    ],
    signals: {
      records: records.length,
      diary: diary.length,
      genes: genes.length,
      activeGenes: activeGenes.length,
      latentGenes: latentGenes.length,
      knowledge: knowledge.length,
      reviewedKnowledge: reviewedKnowledge.length,
      latestMemory: latestRecord ? summarize(latestRecord.text) : "sense memòria local",
      latestDiary: latestDiary ? summarize(latestDiary.text) : "sense diari local",
      integrity: {
        score: integrityScore,
        overall: signals.integrity?.overall || "local",
        risks: integrityRisks,
      },
      evolutionState: signals.evolutionState?.summary || {},
      knowledgeLibrary: signals.knowledgeLibrary?.summary || {},
      metamemory: signals.metamemory?.summary || {},
      genomeCandidates: signals.genomeCandidates?.summary || {},
    },
    insights: [
      { id: "continuitat", label: "Continuïtat", value: `${records.length} records i ${diary.length} entrades de diari`, evidence: ["IndexedDB"] },
      { id: "coneixement", label: "Coneixement catalogat", value: `${reviewedKnowledge.length}/${knowledge.length} fonts revisades`, evidence: ["IndexedDB knowledge"] },
      { id: "genoma", label: "Genoma", value: `${activeGenes.length} gens actius i ${latentGenes.length} latents`, evidence: ["IndexedDB genes"] },
      { id: "integritat", label: "Integritat local", value: `${integrityScore}/100 ${signals.integrity?.overall || "local"}`, evidence: ["lectura local"] },
    ],
    priorities,
    summary: {
      state: classifyLocalSelfReflectionState({ integrityScore, pressure, maturity, knowledgeReadiness }),
      maturity,
      pressure,
      knowledgeReadiness,
      importantRecords: importantRecords.length,
      proposalCount: proposals.length,
      mutationApplied: false,
    },
    mutation: {
      autoApply: false,
      persistentWrite: false,
      requiresModeSergiForMutation: true,
      policy: "Autoreflexió local calculada: no escriu records, no modifica gens i no substitueix D1.",
    },
    boundaries: [
      "Autoreflexió vol dir síntesi operativa calculada, no consciència.",
      "No implica que Aura senti, entengui o visqui res subjectivament.",
      "No executa RAG, embeddings, Vector DB ni ingestió automàtica.",
      "No aplica cap proposta evolutiva ni promoció de genoma.",
      "Qualsevol canvi persistent continua requerint Mode Sergi, auditoria i documentació.",
    ],
    links: {
      status: "/estat",
      memory: "/memoria",
      diary: "/diari",
      knowledge: "/coneixement",
      genome: "/genoma-digital",
      evolutionState: "/estat-evolutiu",
      evolutionProposals: "/propostes-evolucio",
      integrity: "/integritat",
      core: "/nucli",
    },
  };
}

function buildLocalOrientation(signals = {}, options = {}) {
  const records = Array.isArray(signals.records) ? signals.records : [];
  const diary = Array.isArray(signals.diary) ? signals.diary : [];
  const genes = Array.isArray(signals.genes) ? signals.genes : [];
  const knowledge = Array.isArray(signals.knowledge) ? signals.knowledge : [];
  const integrityScore = Number(signals.integrity?.score ?? 100);
  const risks = signals.integrity?.summary?.risks || ["mode-local"];
  const latestDiary = [...diary].sort(byNewest)[0] || null;
  const latestRecord = [...records].sort(byNewest)[0] || null;
  const proposalAction = signals.evolutionProposals?.proposals?.[0]?.action || "";
  const reflectionPriority = signals.selfReflection?.priorities?.[0] || "";
  const summarize = (value) => {
    const text = String(value || "").trim().slice(0, 180);
    return text.length < 180 ? text : `${text.slice(0, 177)}...`;
  };
  const nextStep =
    risks.length || integrityScore < 100
      ? "Recuperar connexió D1 i validar integritat cloud abans d'obrir una fase nova."
      : "Consolidar l'orientació v5.2 en ús real: obrir Aura, executar /que-es-aura, /proxim-pas, /pols i /nucli, i ajustar el text si encara no guia prou bé.";
  const afterNext =
    "Quan l'orientació sigui clara durant diverses sessions, preparar Fase 11 multiagent sense activar-la encara.";

  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: options.endpoint || "indexeddb-local",
    format: "aura-orientation-v1",
    phase: "cloud-v5.2-local",
    mode: options.mode || "derived-readonly-operational-orientation-local",
    name: "Orientació operativa",
    document: "AURA_ORIENTATION.md",
    gene: {
      id: "14930352",
      name: "orientacio-operativa",
      state: genes.find((gene) => gene.id === "14930352")?.state || "actiu",
    },
    summary: {
      whatIsAura: "Aura és un sistema persistent de memòria, continuïtat i verificació per al Projecte Aura.",
      whatItDoesToday:
        "Conserva records, diari, genoma, coneixement catalogat, backups i integritat perquè Sergi pugui continuar el projecte sense dependre d'un xat.",
      currentUse:
        "Obrir Aura, revisar /que-es-aura, consultar /proxim-pas, mirar /pols, revisar /nucli i escriure només records útils amb Mode Sergi.",
      nextStep,
      afterNext,
      state: risks.length || integrityScore < 100 ? "mode-local" : "orientada",
    },
    answers: [
      {
        id: "que-soc",
        question: "Què és Aura?",
        answer: "Aura és la memòria persistent i ordenada del Projecte Aura: una arquitectura de codi, dades i documents amb identitat operativa verificable.",
      },
      {
        id: "per-a-que-serveixo",
        question: "Per a què serveixo avui?",
        answer: "Serveixo per recordar, ordenar, verificar i continuar el projecte: records, diari, fonts, genoma digital, backups, integritat i properes accions.",
      },
      {
        id: "que-pots-fer",
        question: "Què pots fer amb mi ara mateix?",
        answer: "Pots consultar /estat, /que-es-aura, /proxim-pas, /memoria, /diari-evolutiu, /coneixement, /genoma-digital, /pols, /nucli i /integritat.",
      },
      {
        id: "seguent-pas",
        question: "Quin és el següent pas?",
        answer: nextStep,
      },
      {
        id: "que-ha-canviat",
        question: "Què ha canviat des de l'última sessió?",
        answer: latestDiary ? summarize(latestDiary.text) : "No hi ha cap entrada local de diari per sintetitzar.",
      },
    ],
    signals: {
      records: records.length,
      diary: diary.length,
      genes: genes.length,
      knowledge: knowledge.length,
      integrity: `${integrityScore}/100 ${signals.integrity?.overall || "local"}`,
      latestMemory: latestRecord ? summarize(latestRecord.text) : "sense memòria local",
      latestDiary: latestDiary ? summarize(latestDiary.text) : "sense diari local",
      selfReflection: signals.selfReflection?.summary?.state || "pendent",
      proposal: proposalAction || "sense proposta evolutiva prioritària",
      reflectionPriority: reflectionPriority || "sense prioritat d'autoreflexió",
    },
    commands: [
      "/que-es-aura",
      "/orientacio",
      "/proxim-pas",
      "/pols",
      "/nucli",
      "aura orientation",
      "aura next",
      "aura what-is-aura",
    ],
    nextStep: {
      action: nextStep,
      after: afterNext,
      source: risks.length || integrityScore < 100 ? "/integritat" : "AURA_ORIENTATION.md",
      proposal: proposalAction || null,
      reflectionPriority: reflectionPriority || null,
    },
    boundaries: [
      "Orientació explica l'estat i l'ús d'Aura; no és consciència ni comprensió subjectiva.",
      "No escriu records, no modifica gens i no aplica propostes automàticament.",
      "No activa RAG, embeddings, Vector DB, multiagent ni ingestió automàtica.",
      "Qualsevol canvi persistent continua requerint Mode Sergi, auditoria i documentació.",
    ],
    documents: ["README.md", "MANUAL_SERGI.md", "AURA_GENOME.md", "PROTOCOL_MESTRE_AURA.md", "AURA_ORIENTATION.md"],
    links: {
      status: "/estat",
      orientation: "/que-es-aura",
      nextStep: "/proxim-pas",
      pulse: "/pols",
      core: "/nucli",
      selfReflection: "/autoreflexio",
      integrity: "/integritat",
    },
  };
}

function classifyLocalSelfReflectionState({ integrityScore, pressure, maturity, knowledgeReadiness }) {
  if (Number(integrityScore || 0) < 80) return "mode-local";
  if (Number(pressure || 0) >= 0.45) return "revisio-operativa";
  if (Number(maturity || 0) >= 0.82 && Number(knowledgeReadiness || 0) >= 0.75) return "consolidacio";
  return "observacio";
}

function buildLocalIntegrityForEvolution(records, diary, genes) {
  const audit = diary.filter((entry) => String(entry.text || "").startsWith("[audit:"));
  return {
    score: audit.length ? 48 : 32,
    overall: "local",
    summary: {
      risks: ["mode-local"],
    },
    components: [
      { id: "d1", state: "offline" },
      { id: "audit", state: audit.length ? "ok" : "pending" },
      { id: "genome", state: genes.length ? "local" : "missing" },
    ],
    counts: {
      records: records.length,
      diary: diary.length,
      genes: genes.length,
    },
  };
}

function getLocalEvolutionStateHeuristic() {
  return {
    scale: "0..1",
    metrics: EVOLUTION_STATE_METRICS,
    derivedFrom: ["metamemòria", "candidats a genoma", "records", "diari", "gens", "integritat local"],
    persistence: "calculada en lectura; no és una mutació persistent",
  };
}

function classifyLocalEvolutionState(values) {
  if (Number(values.integritat || 0) < 0.85) return "observacio";
  if (Number(values.pressioCanvi || 0) >= 0.45) return "revisio";
  if (Number(values.maduresaOperativa || 0) >= 0.82) return "consolidacio";
  return "creixement";
}

function localRatio(part, total) {
  if (!total) return 0;
  return Number((Number(part || 0) / total).toFixed(4));
}

function localScore01(value) {
  return Number(Math.min(1, Math.max(0, Number(value) || 0)).toFixed(2));
}

function getLocalMetamemoryHeuristic() {
  return {
    fundacional: [
      "ID foundation-*.",
      "Text que defineix nom, objectiu, identitat, mimesi humana, memòria central, genoma o continuïtat futura.",
    ],
    evolutiu: [
      "Tags de fase/protocol o text sobre versions, formalitzacions i capacitats noves.",
      "Records que expliquen una transició estable del projecte.",
    ],
    operatiu: [
      "Text sobre Mode Sergi, producció, validació, backups, integritat o ús del sistema.",
      "Records útils per operar Aura però no necessàriament identitaris.",
    ],
    temporal: ["Proves o estats puntuals que poden caducar.", "Records amb valor local de sessió."],
    descartable: ["Proves tècniques de baix pes sense valor identitari o evolutiu.", "Només es marca; no s'esborra."],
  };
}

function classifyLocalMemoryRecord(record) {
  const text = String(record.text || "");
  const lower = text.toLowerCase();
  const tags = normalizeLocalList(record.tags, 12);
  const weight = normalizeLocalWeight(record.weight, importanceToLocalWeight(record.importance, 1));
  const reasons = [];
  let category = "operatiu";
  let action = "conservar";

  if (String(record.id || "").startsWith("foundation-") || localTextHasAny(lower, ["l'objectiu és", "no ha de fingir", "forma pròpia", "memòria és central", "pot tenir un genoma", "silici"])) {
    category = "fundacional";
    action = "preservar";
    reasons.push("defineix identitat o principi fundacional");
  } else if (tags.some((tag) => ["fase-2", "fase", "protocol"].includes(tag)) || localTextHasAny(lower, ["fase", "formalitzat", "aura cloud v", "ha activat memoria", "ha activat memòria"])) {
    category = "evolutiu";
    action = "preservar i resumir a història si cal";
    reasons.push("descriu una transició o capacitat estable");
  } else if (localTextHasAny(lower, ["prova protegida", "prova "]) && weight <= 2) {
    category = "descartable";
    action = "mantenir sense promoció; possible exclusió futura de resums";
    reasons.push("prova tècnica de baix pes");
  } else if (localTextHasAny(lower, ["està actiu", "esta actiu", "correctament", "producció", "produccio"]) && weight <= 2) {
    category = "temporal";
    action = "mantenir com a traça temporal";
    reasons.push("estat o validació puntual");
  } else if (tags.some((tag) => ["mode-sergi", "validacio", "validació"].includes(tag)) || localTextHasAny(lower, ["mode sergi", "validació", "validacio", "backup", "integritat"])) {
    category = "operatiu";
    action = "conservar com a suport operatiu";
    reasons.push("ajuda a operar o validar el sistema");
  }

  const genomeCandidate = assessLocalGenomeCandidate(record, category, reasons);

  return {
    id: record.id,
    text,
    category,
    action,
    weight,
    state: normalizeLocalMemoryState(record.state, "actiu"),
    tags,
    source: record.source || "desconegut",
    createdAt: record.createdAt || record.timestamp || null,
    reasons: reasons.length ? reasons : ["classificació operativa per defecte"],
    genomeCandidate,
  };
}

function assessLocalGenomeCandidate(record, category, reasons = []) {
  const lower = String(record.text || "").toLowerCase();
  const weight = normalizeLocalWeight(record.weight, importanceToLocalWeight(record.importance, 1));
  const stableProperty =
    category === "fundacional" ||
    localTextHasAny(lower, ["ha de", "pot tenir", "és central", "objectiu", "forma pròpia", "no ha de fingir"]);
  const capabilityProperty =
    category === "evolutiu" && (weight >= 4 || localTextHasAny(lower, ["formalitzat", "fase", "memòria persistent", "memoria persistent"]));
  const candidate = stableProperty || capabilityProperty;

  if (!candidate) {
    return {
      candidate: false,
      proposedState: null,
      confidence: 0,
      reason: "No defineix una propietat estable d'Aura.",
      requiresModeSergi: true,
      autoApply: false,
    };
  }

  return {
    candidate: true,
    proposedState: category === "fundacional" ? "actiu" : "latent",
    confidence: category === "fundacional" ? 0.9 : 0.7,
    reason: reasons[0] || "Defineix una propietat estable d'Aura.",
    requiresModeSergi: true,
    autoApply: false,
    requiredSteps: ["Mode Sergi", "crear o actualitzar gen", "registrar auditoria", "actualitzar AURA_GENOME.md"],
  };
}

function localTextHasAny(text, tokens) {
  return tokens.some((token) => text.includes(token));
}

function toLocalGenomeGene(gene) {
  return {
    id: gene.id,
    name: gene.name,
    state: gene.state,
    description: gene.description,
    verificationClass: classifyLocalGeneVerification(gene.id),
    updatedAt: gene.updatedAt || gene.updated_at || null,
  };
}

function classifyLocalGeneVerification(id) {
  if (MECHANICAL_GENE_IDS.includes(id)) return "gen mecànic verificable";
  if (SEMANTIC_GOVERNANCE_GENE_IDS.includes(id)) return "compromís de governança semàntica - NO auto-verificable";
  return "contracte operatiu o documental";
}

function buildLocalEvolutionDiary(diary, options = {}) {
  const entries = diary.map(mapLocalEvolutionEntry);
  const timelineMap = new Map();
  entries.forEach((entry) => {
    const day = entry.day || "sense-data";
    const group = timelineMap.get(day) || {
      day,
      total: 0,
      historyCandidates: 0,
      categories: {},
      entries: [],
    };
    group.total += 1;
    if (entry.historyCandidate) group.historyCandidates += 1;
    group.categories[entry.category] = (group.categories[entry.category] || 0) + 1;
    group.entries.push(entry);
    timelineMap.set(day, group);
  });

  const timeline = [...timelineMap.values()].sort((left, right) => right.day.localeCompare(left.day));
  const historyCandidates = entries.filter((entry) => entry.historyCandidate);
  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: options.endpoint || "indexeddb-local",
    format: "aura-evolution-diary-v1",
    phase: "fase-3-local",
    mode: options.mode || "timeline-local",
    document: {
      required: "AURA_HISTORY.md",
      role: "història reconstruïble del projecte; no substitueix el diari operatiu.",
    },
    criteria: {
      goesToHistory: [
        "canvis de versió",
        "capacitats noves desplegades",
        "decisions del Protocol Mestre",
        "backups i integritat de desplegament",
        "mutacions estructurals del genoma o la memòria",
      ],
      staysOperational: [
        "notes de sessió ordinàries",
        "proves puntuals",
        "consultes sense canvi estructural",
        "entrades que no ajudin a reconstruir Aura",
      ],
    },
    summary: {
      limit: diary.length,
      totalEntries: entries.length,
      days: timeline.length,
      auditEntries: entries.filter((entry) => entry.category === "audit").length,
      versionEntries: entries.filter((entry) => entry.category === "version").length,
      historyCandidates: historyCandidates.length,
      latestEntry: entries[0] || null,
      oldestEntry: entries.at(-1) || null,
    },
    timeline,
    historyCandidates: historyCandidates.slice(0, 20),
    actions: buildLocalEvolutionActions(entries, historyCandidates),
  };
}

function mapLocalEvolutionEntry(entry) {
  const text = String(entry.text || "").trim();
  const category = classifyLocalEvolutionEntry(text);
  const reason = explainLocalEvolutionCandidate(text, category);
  return {
    id: entry.id,
    day: dayStamp(entry.createdAt),
    createdAt: entry.createdAt,
    category,
    text,
    historyCandidate: Boolean(reason),
    reason,
  };
}

function classifyLocalEvolutionEntry(text) {
  const normalized = String(text || "").trim().replaceAll(/\s+/g, " ").toLowerCase();
  if (normalized.startsWith("[audit:")) return "audit";
  if (/(cloud[- ]?v?\d|v\d+\.\d+|fase \d|protocol mestre)/i.test(text)) return "version";
  if (/(backup|vault|integritat|snapshot|restauracio|restauració)/i.test(text)) return "continuity";
  if (/(genoma|gen |mutacio|mutació)/i.test(text)) return "genome";
  if (/(memoria|memòria|record)/i.test(text)) return "memory";
  return "operational";
}

function explainLocalEvolutionCandidate(text, category) {
  const normalized = String(text || "").trim().replaceAll(/\s+/g, " ").toLowerCase();
  if (category === "audit") return "auditoria estructural";
  if (category === "version") return "canvi de fase o versió";
  if (/despleg|activat|formalitzat|protocol|cloud-v|fase/.test(normalized)) return "fita reconstruïble";
  return "";
}

function buildLocalEvolutionActions(entries, historyCandidates) {
  if (!entries.length) return ["Crear entrades de diari abans de construir història evolutiva."];
  const actions = [];
  if (historyCandidates.length) actions.push("Revisar candidates i passar les fites reals a AURA_HISTORY.md.");
  actions.push("Mantenir notes operatives ordinàries només a D1 o IndexedDB.");
  actions.push("Fer /desa-backup i /desa-integritat després de cada fita històrica.");
  return actions;
}

function dayStamp(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

function toLocalCanonicalMemoryRecord(record) {
  const normalized = normalizeRecordForSnapshot(record);
  return {
    id: normalized.id,
    timestamp: normalized.timestamp,
    text: normalized.text,
    importance: normalized.importance,
    source: normalized.source || "desconegut",
    extensions: {
      kind: normalized.kind || "usuari",
      tags: normalized.tags,
      weight: normalized.weight,
      state: normalized.state,
      relatedIds: normalized.relatedIds,
    },
  };
}

function dateStamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

function versionSlug() {
  return AURA_VERSION.replaceAll(".", "-");
}

async function sha256Hex(text) {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function formatDate(value) {
  if (!value) return "sense-data";
  return new Intl.DateTimeFormat("ca", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
