const AURA_VERSION = "cloud-v2.2";
const BACKUP_FORMAT = "aura-backup-v2.2";
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
];

let db;
let lastSnapshot = null;
let cloudState = {
  online: false,
  snapshot: null,
  lastError: null,
};
let auraWriteKey = "";

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
      writeSystem("Aura Cloud v2.2 inicialitzada.\nBackup verificable actiu i escriptura protegida per Mode Sergi.");
      els.statusPill.textContent = "cloud-v2.2";
    } else {
      writeSystem(
        "Aura Cloud v2.2 inicialitzada en mode local.\nD1 no respon ara mateix; IndexedDB conserva la còpia d'aquest navegador.",
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
  els.memoryList = document.querySelector("#memory-list");
  els.geneList = document.querySelector("#gene-list");
  els.memoryUpdated = document.querySelector("#memory-updated");
  els.exportJson = document.querySelector("#export-json");
  els.exportTxt = document.querySelector("#export-txt");
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
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { Accept: "application/json" },
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
  const tx = db.transaction([STORE_GENES, STORE_META], "readwrite");
  const genes = tx.objectStore(STORE_GENES);
  const meta = tx.objectStore(STORE_META);

  GENES.forEach((gene) => {
    genes.put({ ...gene, createdAt: now, updatedAt: now });
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

    switch (normalized) {
      case "/ajuda":
        writeSystem(
          [
            "Ordres disponibles:",
            "/ajuda",
            "/estat",
            "/memoria",
            "/diari",
            "/genoma",
            "/gens",
            "/gen 013",
            "/exporta-json",
            "/exporta-txt",
            "/backup",
            "recorda que ...",
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
      case "/genoma":
      case "/gens":
        await showGenes();
        break;
      case "/exporta-json":
      case "/backup":
        await exportJson();
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

async function showStatus() {
  if (await syncCloudState()) {
    const status = cloudState.snapshot.status;
    await refreshPanels();
    writeSystem(
      [
        "Estat d'Aura — cloud-v2.2",
        "Nom: Aura",
        "Naturalesa: entitat sintètica-digital experimental",
        "Infraestructura: Cloudflare Pages Functions / D1 / navegador web",
        "Persistència actual: D1 al núvol + IndexedDB com a còpia local",
        `Escriptura D1: ${status.writes?.protected ? "protegida per Mode Sergi" : "oberta"}`,
        `Backup: ${status.backup?.format || BACKUP_FORMAT}`,
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
      "Estat d'Aura — cloud-v2.2 / mode local",
      "Nom: Aura",
      "Naturalesa: entitat sintètica-digital experimental",
      "Infraestructura: Cloudflare Pages / navegador web",
      "Persistència actual: IndexedDB del navegador; D1 no disponible en aquesta sessió",
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

async function exportJson() {
  const snapshot = await createBackup();
  lastSnapshot = snapshot;
  downloadFile(
    `aura-cloud-v2-2-backup-${dateStamp()}.json`,
    JSON.stringify(snapshot, null, 2),
    "application/json",
  );
  const checksum = snapshot.backup?.checksum ? `\nEmpremta SHA-256: ${snapshot.backup.checksum}` : "";
  writeSystem(`Backup JSON preparat: ${snapshot.records.length} records.${checksum}`);
}

async function exportTxt() {
  const snapshot = lastSnapshot || (await createSnapshot());
  const content = [
    "Projecte Aura Cloud v2.2",
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

  downloadFile(`aura-cloud-v2-2-backup-${dateStamp()}.txt`, content, "text/plain");
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
        writeError("Mode Sergi inactiu: importació no enviada a D1.");
        await refreshPanels();
        return;
      }

      await apiPost("/restore", payload);
      await importSnapshot(payload);
      await syncCloudState();
    } else {
      await importSnapshot(payload);
    }

    await refreshPanels();
    writeSystem(cloudState.online ? "Importació JSON completada a D1 i IndexedDB." : "Importació JSON completada en local.");
  } catch (error) {
    writeError(`Importació fallida: ${error.message}`);
  }
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
    records.add({
      text: String(record.text || ""),
      kind: record.kind || "importat",
      source: record.source || "import-json",
      createdAt: record.createdAt || now,
    });
  });

  if (Array.isArray(payload.diary)) {
    payload.diary.forEach((entry) => {
      diary.add({
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

  els.statusPill.textContent = cloudState.online ? cloudState.snapshot.status?.version || AURA_VERSION : "local";
  els.memoryCount.textContent = String(counts.records);
  els.diaryCount.textContent = String(counts.diary);
  els.geneCount.textContent = `${counts.genes} gens`;
  els.memoryUpdated.textContent = cloudState.online ? "D1" : "local";

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
}

function addRecord(record) {
  return withStore(STORE_RECORDS, "readwrite", (store) => store.add(record));
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
