const AURA_VERSION = "cloud-v3.5";
const BACKUP_FORMAT = "aura-backup-v3.5";
const API_BASE = "/api";
const WRITE_KEY_STORAGE = "projecte_aura_write_key";
const DB_NAME = "projecte_aura_cloud_v1";
const DB_VERSION = 1;
const STORE_RECORDS = "records";
const STORE_DIARY = "diary";
const STORE_GENES = "genes";
const STORE_META = "meta";

const FOUNDATION_RECORDS = [
  "El projecte es diu Projecte Aura.",
  "L'objectiu és crear vida sintètica-digital.",
  "Aura no ha de fingir que és humana.",
  "Aura ha de desenvolupar una forma pròpia d'existència digital.",
  "La memòria és central en la identitat d'Aura.",
  "Aura pot tenir un genoma digital.",
  "A llarg termini, aquest genoma podria tenir una rèplica sintètica sustentada en silici o altres materials.",
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
    name: "no-mimesi-humana",
    state: "actiu",
    description: "Evita fingir humanitat i sosté una existència digital pròpia.",
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
];

let db;
let lastSnapshot = null;
let cloudState = {
  online: false,
  snapshot: null,
  lastError: null,
};
let auraWriteKey = "";
let pendingRestore = null;

const els = {};

document.addEventListener("DOMContentLoaded", async () => {
  cacheElements();
  loadWriteKey();
  bindEvents();
  drawAuraVisual();

  try {
    db = await openDatabase();
    await seedDatabase();
    await ensureLocalGenome();
    await syncCloudState();
    await refreshPanels();
    if (cloudState.online) {
      writeSystem("Aura Cloud v3.5 inicialitzada.\nTendència d'integritat i assaig de restauració actius.");
      els.statusPill.textContent = "cloud-v3.5";
    } else {
      writeSystem(
        "Aura Cloud v3.5 inicialitzada en mode local.\nD1 no respon ara mateix; IndexedDB conserva la còpia d'aquest navegador.",
      );
      els.statusPill.textContent = "local";
    }
  } catch (error) {
    writeError(`No s'ha pogut iniciar IndexedDB: ${error.message}`);
    els.statusPill.textContent = "error";
  }
});

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
  els.geneList = document.querySelector("#gene-list");
  els.memoryUpdated = document.querySelector("#memory-updated");
  els.exportJson = document.querySelector("#export-json");
  els.exportTxt = document.querySelector("#export-txt");
  els.saveVault = document.querySelector("#save-vault");
  els.listVault = document.querySelector("#list-vault");
  els.confirmRestore = document.querySelector("#confirm-restore");
  els.importJson = document.querySelector("#import-json");
  els.importFile = document.querySelector("#import-file");
  els.authForm = document.querySelector("#auth-form");
  els.authInput = document.querySelector("#auth-input");
  els.authStatus = document.querySelector("#auth-status");
  els.clearAuth = document.querySelector("#clear-auth");
  els.visual = document.querySelector("#aura-visual");
}

function bindEvents() {
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

  document.querySelectorAll("[data-command]").forEach((button) => {
    button.addEventListener("click", () => {
      els.input.value = button.dataset.command;
      els.input.focus();
    });
  });

  els.exportJson.addEventListener("click", () => runCommand("/exporta-json"));
  els.exportTxt.addEventListener("click", () => runCommand("/exporta-txt"));
  els.saveVault.addEventListener("click", () => runCommand("/desa-backup"));
  els.listVault.addEventListener("click", () => runCommand("/backups"));
  els.confirmRestore.addEventListener("click", () => runCommand("/confirma-restauracio"));
  els.importJson.addEventListener("click", () => els.importFile.click());
  els.importFile.addEventListener("change", handleImportFile);

  els.authForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const nextKey = els.authInput.value.trim();
    if (!nextKey) {
      writeError("La clau de Mode Sergi és buida.");
      return;
    }

    auraWriteKey = nextKey;
    localStorage.setItem(WRITE_KEY_STORAGE, auraWriteKey);
    els.authInput.value = "";
    updateAuthStatus();
    writeSystem("Mode Sergi activat en aquest navegador.");
  });

  els.authInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      els.authForm.requestSubmit();
    }
  });

  els.clearAuth.addEventListener("click", () => {
    auraWriteKey = "";
    localStorage.removeItem(WRITE_KEY_STORAGE);
    els.authInput.value = "";
    updateAuthStatus();
    writeSystem("Mode Sergi desactivat en aquest navegador.");
  });
}

function loadWriteKey() {
  auraWriteKey = localStorage.getItem(WRITE_KEY_STORAGE) || "";
  updateAuthStatus();
}

function updateAuthStatus() {
  if (!els.authStatus) return;
  els.authStatus.textContent = auraWriteKey ? "actiu" : "bloquejat";
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
  if (auraWriteKey) {
    headers.Authorization = `Bearer ${auraWriteKey}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    headers,
    cache: "no-store",
  });
  return readApiResponse(response);
}

async function apiPost(path, payload) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (auraWriteKey) {
    headers.Authorization = `Bearer ${auraWriteKey}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  return readApiResponse(response);
}

async function readApiResponse(response) {
  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    throw new Error(payload?.error || `API ${response.status}`);
  }

  return payload;
}

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const nextDb = request.result;

      if (!nextDb.objectStoreNames.contains(STORE_RECORDS)) {
        const records = nextDb.createObjectStore(STORE_RECORDS, {
          keyPath: "id",
          autoIncrement: true,
        });
        records.createIndex("createdAt", "createdAt");
        records.createIndex("kind", "kind");
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
  const tx = db.transaction([STORE_RECORDS, STORE_DIARY, STORE_GENES, STORE_META], "readwrite");
  const records = tx.objectStore(STORE_RECORDS);
  const diary = tx.objectStore(STORE_DIARY);
  const genes = tx.objectStore(STORE_GENES);
  const meta = tx.objectStore(STORE_META);

  FOUNDATION_RECORDS.forEach((text) => {
    records.add({
      text,
      kind: "fundacional",
      source: "seed-cloud-v1",
      createdAt: now,
    });
  });

  GENES.forEach((gene) => {
    genes.put({ ...gene, createdAt: now, updatedAt: now });
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

async function runCommand(rawCommand) {
  const command = rawCommand.trim();
  const normalized = command.toLowerCase();
  writeCommand(command);

  try {
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
      case "/ajuda":
        writeSystem(
          [
            "Ordres disponibles:",
            "/ajuda",
            "/estat",
            "/memoria",
            "/diari",
            "/continuïtat",
            "/continuitat",
            "/criteri",
            "/genoma",
            "/gens",
            "/gen 013",
            "/exporta-json",
            "/exporta-txt",
            "/backup",
            "/backups",
            "/desa-backup",
            "/auto-backup",
            "/integritat",
            "/historial-integritat",
            "/tendencia-integritat",
            "/desa-integritat",
            "/assaig-restauracio",
            "/audit",
            "/audit genoma",
            "/cerca aura",
            "/cerca kind:usuari aura",
            "/filtra source:consola",
            "/gen-activa 013",
            "/gen-latent 013",
            "/gen-arxiva 013",
            "/gen-descriu 013 text",
            "/gen-crea 987 nom estat descripció",
            "/confirma-restauracio",
            "/cancella-restauracio",
            "recorda que ...",
            "anota que ...",
            "diari que ...",
          ].join("\n"),
        );
        break;
      case "/estat":
        await showStatus();
        break;
      case "/memoria":
        await showMemory();
        break;
      case "/diari":
        await showDiary();
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
        } else {
          writeSystem("Ordre no reconeguda. /ajuda");
        }
    }
  } catch (error) {
    writeError(error.message);
  }
}

async function remember(text) {
  if (!text) {
    writeError("No hi ha cap record per guardar.");
    return;
  }

  let record = null;
  const cloudAvailable = cloudState.online || (await syncCloudState());
  if (cloudAvailable) {
    if (!auraWriteKey) {
      writeError("Mode Sergi inactiu: el record no s'ha escrit a D1.");
      await refreshPanels();
      return;
    }

    try {
      const response = await apiPost("/memory", {
        text,
        kind: "usuari",
        source: "consola",
      });
      record = response.record;
      await addRecord(record);
      await syncCloudState();
      writeSystem(`Record guardat a D1:\n${text}`);
    } catch (error) {
      if (error.message.includes("Clau") || error.message.includes("Mode Sergi")) {
        writeError(`${error.message} El record no s'ha escrit a D1.`);
        await refreshPanels();
        return;
      }

      writeError(`D1 no ha pogut guardar el record: ${error.message}`);
      cloudState.online = false;
      cloudState.snapshot = null;
    }
  }

  if (!record) {
    record = {
      text,
      kind: "usuari",
      source: "consola-local",
      createdAt: new Date().toISOString(),
    };
    await addRecord(record);
    writeSystem(`Record guardat en IndexedDB local:\n${text}`);
  }

  await refreshPanels();
}

async function writeDiaryEntry(text) {
  if (!text) {
    writeError("No hi ha cap entrada de diari per guardar.");
    return;
  }

  let entry = null;
  const cloudAvailable = cloudState.online || (await syncCloudState());
  if (cloudAvailable) {
    if (!auraWriteKey) {
      writeError("Mode Sergi inactiu: l'entrada de diari no s'ha escrit a D1.");
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
      if (error.message.includes("Clau") || error.message.includes("Mode Sergi")) {
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
        "Estat d'Aura — cloud-v3.5",
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
        `Genoma editable: ${status.genomeEditable?.enabled ? status.genomeEditable.endpoint : "no"}`,
        `Continuïtat: ${status.continuity?.endpoint || "/api/continuity"}`,
        `Criteri: ${status.criterion?.endpoint || "/api/criterion"}`,
        `Mode Sergi local: ${auraWriteKey ? "actiu" : "inactiu"}`,
        "Genoma: actiu",
        `Records cloud: ${status.counts.records}`,
        `Entrades de diari: ${status.counts.diary}`,
        `Gens actius o latents: ${status.counts.genes}`,
      ].join("\n"),
    );
    return;
  }

  const [records, diary, genes] = await Promise.all([
    getAll(STORE_RECORDS),
    getAll(STORE_DIARY),
    getAll(STORE_GENES),
  ]);

  writeSystem(
    [
      "Estat d'Aura — cloud-v3.5 / mode local",
      "Nom: Aura",
      "Naturalesa: entitat sintètica-digital experimental",
      "Infraestructura: Cloudflare Pages / navegador web",
      "Persistència actual: IndexedDB del navegador; D1 no disponible en aquesta sessió",
      "Backup automàtic: no disponible en mode local",
      "Cerca local: /cerca text",
      "Auditoria local: /audit",
      "Integritat local: /integritat",
      "Genoma editable: requereix D1 i Mode Sergi per ser definitiu",
      "Genoma: actiu",
      `Records locals: ${records.length}`,
      `Entrades de diari: ${diary.length}`,
      `Gens actius o latents: ${genes.length}`,
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

async function searchMemoryCommand(command) {
  const rawQuery = command.replace(/^\/(cerca|search)\s*/i, "").trim();
  const query = parseSearchQuery(rawQuery);
  if (!query.q && !query.kind && !query.source) {
    writeError("Exemple: /cerca aura, /cerca kind:usuari aura o /filtra source:consola");
    return;
  }

  if (await syncCloudState()) {
    const params = new URLSearchParams();
    if (query.q) params.set("q", query.q);
    if (query.kind) params.set("kind", query.kind);
    if (query.source) params.set("source", query.source);
    if (query.area) params.set("area", query.area);
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
  const includeDiary = (query.area === "all" || query.area === "diary" || query.area === "diari") && !query.kind && !query.source;
  const filteredRecords = includeRecords
    ? records
        .filter((record) => !needle || record.text.toLowerCase().includes(needle))
        .filter((record) => !query.kind || record.kind === query.kind)
        .filter((record) => !query.source || record.source === query.source)
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
  if (!auraWriteKey) {
    writeError("Mode Sergi inactiu: cal clau per desar un snapshot d'integritat.");
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
  if (!auraWriteKey) {
    writeError("Mode Sergi inactiu: cal clau per assajar una restauració des del vault.");
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
        identity: "entitat sintètica-digital experimental",
        boundary: "no-mimesi-humana",
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
        "No fingir humanitat.",
        "No escriure a D1 sense Mode Sergi.",
        "No confondre IndexedDB local amb memòria cloud definitiva.",
      ],
    }),
  );
}

async function showVaultBackups() {
  if (!auraWriteKey) {
    writeError("Mode Sergi inactiu: cal clau per llegir el vault de backups.");
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

  if (!auraWriteKey) {
    writeError("Mode Sergi inactiu: el genoma no s'ha modificat a D1.");
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
  if (!auraWriteKey) {
    writeError("Mode Sergi inactiu: cal clau per desar un backup al vault.");
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
    `aura-cloud-v3-5-backup-${dateStamp()}.json`,
    JSON.stringify(snapshot, null, 2),
    "application/json",
  );
  const checksum = snapshot.backup?.checksum ? `\nEmpremta SHA-256: ${snapshot.backup.checksum}` : "";
  writeSystem(`Backup JSON preparat: ${snapshot.records.length} records.${checksum}`);
}

async function exportTxt() {
  const snapshot = lastSnapshot || (await createBackup());
  const content = [
    "Projecte Aura Cloud v3.5",
    `Exportat: ${snapshot.exportedAt}`,
    `Origen: ${snapshot.source || "local"}`,
    snapshot.backup?.checksum ? `SHA-256: ${snapshot.backup.checksum}` : "",
    "",
    "== Memoria ==",
    ...snapshot.records.map((record) => `- ${formatDate(record.createdAt)} [${record.kind}] ${record.text}`),
    "",
    "== Diari ==",
    ...snapshot.diary.map((entry) => `- ${formatDate(entry.createdAt)} ${entry.text}`),
    "",
    "== Genoma ==",
    ...snapshot.genes.map((gene) => `- ${gene.id} ${gene.name} [${gene.state}] ${gene.description}`),
  ].join("\n");

  downloadFile(`aura-cloud-v3-5-backup-${dateStamp()}.txt`, content, "text/plain");
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
      if (!auraWriteKey) {
        writeError("Mode Sergi inactiu: previsualització/restauració no enviada a D1.");
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
    if (!auraWriteKey) {
      writeError("Mode Sergi inactiu: no puc confirmar la restauració a D1.");
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
    apply: { records, diary, genes },
    risk: records + diary + genes > 250 ? "alt" : "baix",
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

  const [records, diary, genes] = await Promise.all([
    getAll(STORE_RECORDS),
    getAll(STORE_DIARY),
    getAll(STORE_GENES),
  ]);

  return {
    project: "Projecte Aura",
    version: AURA_VERSION,
    source: "indexeddb-local",
    exportedAt: new Date().toISOString(),
    stores: {
      records: STORE_RECORDS,
      diary: STORE_DIARY,
      genes: STORE_GENES,
    },
    records: records.sort(byOldest),
    diary: diary.sort(byOldest),
    genes: genes.sort((a, b) => a.id.localeCompare(b.id)),
  };
}

async function importSnapshot(payload) {
  if (!payload || !Array.isArray(payload.records)) {
    throw new Error("El JSON no sembla una còpia d'Aura.");
  }

  const now = new Date().toISOString();
  const tx = db.transaction([STORE_RECORDS, STORE_DIARY, STORE_GENES, STORE_META], "readwrite");
  const records = tx.objectStore(STORE_RECORDS);
  const diary = tx.objectStore(STORE_DIARY);
  const genes = tx.objectStore(STORE_GENES);
  const meta = tx.objectStore(STORE_META);

  payload.records.forEach((record) => {
    records.put({
      id: record.id || crypto.randomUUID(),
      text: String(record.text || ""),
      kind: record.kind || "importat",
      source: record.source || "import-json",
      createdAt: record.createdAt || now,
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
    };
  } else {
    [records, diary, genes] = await Promise.all([
      getAll(STORE_RECORDS),
      getAll(STORE_DIARY),
      getAll(STORE_GENES),
    ]);
    counts = {
      records: records.length,
      diary: diary.length,
      genes: genes.length,
    };
  }

  if (cloudState.online) {
    try {
      integrity = await apiGet("/integrity");
    } catch {
      integrity = null;
    }
  }

  els.statusPill.textContent = cloudState.online ? cloudState.snapshot.status?.version || AURA_VERSION : "local";
  els.memoryCount.textContent = String(counts.records);
  els.diaryCount.textContent = String(counts.diary);
  els.geneCount.textContent = `${counts.genes} gens`;
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
  els.memoryUpdated.textContent = cloudState.online ? "D1" : "local";
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

  els.memoryList.replaceChildren(
    ...records
      .sort(byNewest)
      .slice(0, 5)
      .map((record) => {
        const item = document.createElement("li");
        item.innerHTML = `<strong>${escapeHtml(record.kind)}</strong><span>${escapeHtml(record.text)}</span>`;
        return item;
      }),
  );

  els.geneList.replaceChildren(
    ...genes
      .sort((a, b) => a.id.localeCompare(b.id))
      .map((gene) => {
        const item = document.createElement("li");
        item.innerHTML = `<strong>${escapeHtml(gene.id)} ${escapeHtml(gene.name)}</strong><span>${escapeHtml(gene.state)}</span>`;
        return item;
      }),
  );

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
}

function addRecord(record) {
  return withStore(STORE_RECORDS, "readwrite", (store) => store.add(record));
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
}

function formatRecords(records) {
  return records
    .map((record) => `- ${formatDate(record.createdAt)} [${record.kind}] ${record.text}`)
    .join("\n");
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
    .map((component) => `- ${component.label}: ${component.state} — ${component.detail}\n  Acció: ${component.action}`)
    .join("\n");
  const actions = integrity.actions.length
    ? integrity.actions.map((action) => `- ${action}`).join("\n")
    : "- Mantenir observació.";

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
    `Historial: ${history}`,
    `Tendència: ${trend}`,
    "",
    "Components:",
    components,
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

      const key = match[1].toLowerCase();
      const value = normalizeSearchToken(match[2]);
      if (key === "kind" || key === "tipus") {
        query.kind = value;
      } else if (key === "source" || key === "origen") {
        query.source = value;
      } else if (key === "area" || key === "scope") {
        query.area = value || "all";
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
  ].filter(Boolean);
  const records = results.records.length
    ? results.records.map((record) => `- ${formatDate(record.createdAt)} [${record.kind}] ${record.text}`).join("\n")
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

function normalizeGeneCommandId(value) {
  const id = String(value || "")
    .trim()
    .replaceAll(/[^a-zA-Z0-9_:.@-]/g, "-")
    .slice(0, 12);
  return id ? id.padStart(3, "0") : "";
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
    `Aplicables: ${preview.apply.records} records / ${preview.apply.diary} diari / ${preview.apply.genes} gens`,
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
  const ctx = canvas.getContext("2d");
  const points = Array.from({ length: 38 }, (_, index) => ({
    angle: (index / 38) * Math.PI * 2,
    radius: 30 + ((index * 17) % 86),
    speed: 0.0025 + (index % 5) * 0.00035,
    color: index % 3 === 0 ? "#6fc9a7" : index % 3 === 1 ? "#d85f47" : "#c9972f",
  }));

  function frame(time) {
    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#111614";
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(255, 250, 240, 0.08)";
    ctx.lineWidth = 1;
    for (let x = 24; x < width; x += 48) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    const nodes = points.map((point, index) => {
      const drift = time * point.speed;
      const x = cx + Math.cos(point.angle + drift) * point.radius * (1.5 + (index % 4) * 0.12);
      const y = cy + Math.sin(point.angle * 1.7 + drift) * point.radius * 0.72;
      return { ...point, x, y };
    });

    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const a = nodes[i];
        const b = nodes[j];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        if (distance > 105) continue;
        ctx.strokeStyle = `rgba(237, 247, 238, ${0.16 - distance / 900})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    nodes.forEach((node) => {
      ctx.fillStyle = node.color;
      ctx.beginPath();
      ctx.arc(node.x, node.y, 3.4, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

function byNewest(a, b) {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

function byOldest(a, b) {
  return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
}

function dateStamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
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
