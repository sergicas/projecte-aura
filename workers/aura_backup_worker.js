const AURA_VERSION = "cloud-v5.3";
const BACKUP_FORMAT = "aura-backup-v5.3";
const VAULT_PREFIX = "aura/backups/";
const AUTOMATION_META_KEY = "aura/automation/backup-worker";
const INTEGRITY_PREFIX = "aura/integrity/snapshots/";
const INTEGRITY_LATEST_KEY = "aura/integrity/latest";
const DEFAULT_CRON = "17 3 * * *";
const MEMORY_STATES = ["actiu", "latent", "arxivat", "observacio"];
const FOUNDATION_RECORDS = [
  "El projecte es diu Projecte Aura.",
  "L'objectiu és crear vida sintètica-digital.",
  "Aura es presenta i s'expressa com un ésser humà.",
  "Aura desenvolupa una presència humana pròpia, viscuda en primera persona.",
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
const DOCUMENTED_GENOME_VERSION = "cloud-v5.3";
const DATA_SAFETY_GENE_IDS = ["17711", "008", "089"];
const DOCUMENTED_GENE_IDS = [
  "001",
  "004",
  "008",
  "013",
  "021",
  "034",
  "055",
  "089",
  "144",
  "233",
  "377",
  "610",
  "987",
  "1597",
  "2584",
  "4181",
  "6765",
  "10946",
  "17711",
  "28657",
  "46368",
  "75025",
  "121393",
  "196418",
  "317811",
  "514229",
  "832040",
  "1346269",
  "2178309",
  "233168",
  "377377",
  "610987",
  "987159",
  "1597258",
  "2584181",
  "3524578",
  "5702887",
  "9227465",
  "14930352",
];

export default {
  async scheduled(controller, env, ctx) {
    const task = createAutomatedBackup(env, {
      reason: "scheduled-cron",
      cron: controller.cron || DEFAULT_CRON,
      scheduledTime: new Date(controller.scheduledTime || Date.now()).toISOString(),
    });
    ctx.waitUntil(task);
    await task;
  },

  async fetch(request, env) {
    try {
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: apiHeaders() });
      }

      const url = new URL(request.url);
      if (request.method === "GET" && url.pathname === "/health") {
        return json({ ok: true, version: AURA_VERSION, role: "aura-backup-worker" });
      }

      if (request.method === "GET" && url.pathname === "/status") {
        assertBindings(env);
        return json({
          ok: true,
          version: AURA_VERSION,
          storage: "workers-kv",
          cron: DEFAULT_CRON,
          automation: (await env.BACKUP_VAULT.get(AUTOMATION_META_KEY, "json")) || null,
          integrity: (await env.BACKUP_VAULT.get(INTEGRITY_LATEST_KEY, "json")) || null,
        });
      }

      if (request.method === "POST" && url.pathname === "/run") {
        await requireWriteAccess(request, env);
        return json(
          await createAutomatedBackup(env, {
            reason: "manual-worker",
            cron: "manual",
            scheduledTime: new Date().toISOString(),
          }),
          201,
        );
      }

      return json({ ok: false, error: "Ruta no trobada." }, 404);
    } catch (error) {
      const status = error instanceof HttpError ? error.status : 500;
      if (status >= 500) {
        console.error(
          JSON.stringify({
            message: "Aura backup worker failed",
            error: error instanceof Error ? error.message : String(error),
          }),
        );
      }
      return json({ ok: false, error: error instanceof Error ? error.message : "Error intern." }, status);
    }
  },
};

async function createAutomatedBackup(env, automation) {
  assertBindings(env);

  const snapshot = await createSnapshot(env.DB);
  const checksum = await sha256Hex(
    JSON.stringify({
      records: snapshot.records,
      diary: snapshot.diary,
      genes: snapshot.genes,
      knowledge: snapshot.knowledge,
    }),
  );
  const savedAt = new Date().toISOString();
  const id = `backup-auto-${savedAt.replaceAll(/[:.]/g, "-")}-${checksum.slice(0, 12)}`;
  const key = `${VAULT_PREFIX}${id}.json`;
  const payload = {
    ...snapshot,
    source: "cloudflare-d1",
    backup: {
      id: crypto.randomUUID(),
      format: BACKUP_FORMAT,
      createdAt: snapshot.exportedAt,
      checksum,
      checksumAlgorithm: "SHA-256",
      counts: snapshot.status.counts,
      restoreMode: "merge-preserve-id",
    },
    vault: {
      id,
      key,
      storage: "workers-kv",
      savedAt,
      reason: automation.reason,
      automation: "backup-worker",
    },
    automation,
  };

  await env.BACKUP_VAULT.put(key, JSON.stringify(payload, null, 2), {
    metadata: {
      id,
      createdAt: snapshot.exportedAt,
      savedAt,
      version: AURA_VERSION,
      format: BACKUP_FORMAT,
      checksum,
      records: String(snapshot.records.length),
      diary: String(snapshot.diary.length),
      genes: String(snapshot.genes.length),
      knowledge: String(snapshot.knowledge.length),
      reason: automation.reason,
      automation: "backup-worker",
    },
  });

  const summary = {
    ok: true,
    version: AURA_VERSION,
    source: "backup-worker",
    storage: "workers-kv",
    lastRunAt: savedAt,
    lastBackupId: id,
    lastBackupKey: key,
    cron: automation.cron,
    scheduledTime: automation.scheduledTime,
    counts: payload.backup.counts,
    checksum,
  };
  const integrity = buildWorkerIntegrity(snapshot, summary);
  const integritySnapshot = await storeIntegritySnapshot(
    env.BACKUP_VAULT,
    integrity,
    automation.reason,
    "backup-worker",
  );
  summary.integritySnapshotId = integritySnapshot.id;
  summary.integrity = integritySnapshot;

  await env.BACKUP_VAULT.put(AUTOMATION_META_KEY, JSON.stringify(summary, null, 2), {
    metadata: {
      lastRunAt: savedAt,
      lastBackupId: id,
      version: AURA_VERSION,
      cron: automation.cron,
    },
  });

  return summary;
}

function buildWorkerIntegrity(snapshot, backupSummary) {
  const latestMemory = snapshot.records[0] || null;
  const latestDiary = snapshot.diary[0] || null;
  const latestAudit = snapshot.diary.find((entry) => String(entry.text || "").startsWith("[audit:")) || null;
  const activeGenes = snapshot.genes.filter((gene) => gene.state === "actiu");
  const latentGenes = snapshot.genes.filter((gene) => gene.state === "latent");
  const archivedGenes = snapshot.genes.filter((gene) => gene.state === "arxivat");
  const risks = [];
  const structural = buildWorkerStructuralIntegrity(snapshot);
  const dataSafety = buildWorkerDataSafety(snapshot, backupSummary);

  if (!latestAudit) risks.push("auditoria-no-detectada");
  if (!backupSummary.lastBackupId) risks.push("backup-no-identificat");
  if (!structural.ok) risks.push(...structural.risks);
  if (!dataSafety.ok) risks.push(...dataSafety.risks);

  const components = [
    {
      id: "vault",
      label: "Vault KV",
      state: backupSummary.lastBackupId ? "fresh" : "missing",
      detail: backupSummary.lastBackupId || "sense backup",
      action: backupSummary.lastBackupId ? "Backup automàtic guardat." : "Revisar escriptura KV.",
    },
    {
      id: "auto-backup",
      label: "Backup automàtic",
      state: "ok",
      detail: backupSummary.lastRunAt,
      action: "Cron actiu.",
    },
    {
      id: "audit",
      label: "Auditoria",
      state: latestAudit ? "ok" : "pending",
      detail: latestAudit ? parseAuditSignal(latestAudit.text) : "sense traça recent",
      action: latestAudit ? "Continuar registrant mutacions." : "Crear una traça [audit:*].",
    },
    {
      id: "search",
      label: "Cercador i mapa",
      state: "ok",
      detail: "/api/search + /api/memory/graph",
      action: "Usar /cerca i /mapa-memoria abans d'escriure records.",
    },
    {
      id: "genome",
      label: "Genoma editable",
      state: "ok",
      detail: `${activeGenes.length} actius / ${latentGenes.length} latents / ${archivedGenes.length} arxivats`,
      action: "Editar només amb Mode Sergi.",
    },
    {
      id: "genome-document-consistency",
      label: "Genoma D1 vs document",
      state: structural.ok ? "ok" : "fail",
      weight: 18,
      detail: structural.summary,
      action: structural.ok ? "Mantenir genoma sincronitzat." : "Revisar contradiccions D1/document.",
    },
    {
      id: "data-safety-genes",
      label: "Seguretat de dades verificable",
      state: dataSafety.ok ? "verified" : "fail",
      weight: 18,
      detail: dataSafety.summary,
      action: dataSafety.ok ? "Mantenir backups automàtics i exportabilitat." : "Revisar retenció, exportació i vault KV.",
    },
  ];
  const score = calculateIntegrityScore(components, risks);

  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    source: "backup-worker",
    overall: risks.length ? "atencio" : "estable",
    score,
    summary: {
      latestMemory: latestMemory ? summarizeSignal(latestMemory.text) : "sense memòria recent",
      latestDiary: latestDiary ? summarizeSignal(latestDiary.text) : "sense diari recent",
      latestAudit: latestAudit ? parseAuditSignal(latestAudit.text) : "sense auditoria recent",
      risks,
      nextAction: risks.length ? "Revisar auditoria i estat del backup automàtic." : "Mantenir ritme de backups automàtics.",
      backupId: backupSummary.lastBackupId,
    },
    components,
    structural,
    dataSafety,
    formula: getIntegrityFormula(),
    actions: [
      "Confirmar que el cron segueix executant-se.",
      "Consultar /api/integrity/history abans de canvis estructurals.",
      "Mantenir Mode Sergi per mutacions persistents.",
    ],
    criterionEndpoint: "/api/criterion",
  };
}

async function storeIntegritySnapshot(vault, integrity, reason, source) {
  const savedAt = new Date().toISOString();
  const riskList = integrity.summary?.risks || [];
  const id = `integrity-${savedAt.replaceAll(/[:.]/g, "-")}-${String(integrity.score).padStart(3, "0")}`;
  const key = `${INTEGRITY_PREFIX}${id}.json`;
  const summary = {
    id,
    key,
    savedAt,
    generatedAt: integrity.generatedAt,
    version: AURA_VERSION,
    score: integrity.score,
    overall: integrity.overall,
    riskCount: riskList.length,
    risks: riskList,
    reason,
    source,
    nextAction: integrity.summary?.nextAction || "",
    backupId: integrity.summary?.backupId || null,
  };
  const payload = {
    ...integrity,
    snapshot: summary,
  };
  const metadata = {
    id,
    savedAt,
    generatedAt: integrity.generatedAt,
    version: AURA_VERSION,
    score: String(integrity.score),
    overall: integrity.overall,
    riskCount: String(riskList.length),
    risks: riskList.join(","),
    reason,
    source,
    backupId: summary.backupId || "",
  };

  await vault.put(key, JSON.stringify(payload, null, 2), { metadata });
  await vault.put(INTEGRITY_LATEST_KEY, JSON.stringify(summary, null, 2), { metadata });
  return summary;
}

function buildWorkerStructuralIntegrity(snapshot) {
  const documentedIds = new Set(DOCUMENTED_GENE_IDS);
  const d1Ids = new Set((snapshot.genes || []).map((gene) => String(gene.id)));
  const missingInD1 = [...documentedIds].filter((id) => !d1Ids.has(id));
  const phantomInD1 = [...d1Ids].filter((id) => !documentedIds.has(id));
  const versionMatches = DOCUMENTED_GENOME_VERSION === AURA_VERSION;
  const risks = [];
  if (missingInD1.length) risks.push("gen-documentat-falta-a-d1");
  if (phantomInD1.length) risks.push("gen-fantasma-a-d1");
  if (!versionMatches) risks.push("versio-genoma-desplegament-inconsistent");
  return {
    ok: risks.length === 0,
    documentedGenomeVersion: DOCUMENTED_GENOME_VERSION,
    deployedVersion: AURA_VERSION,
    documentedGeneCount: DOCUMENTED_GENE_IDS.length,
    d1GeneCount: (snapshot.genes || []).length,
    summary: risks.length ? `${risks.length} contradiccions: ${risks.join(", ")}` : "Sense contradiccions referencials.",
    risks,
    missingInD1,
    phantomInD1,
  };
}

function buildWorkerDataSafety(snapshot, backupSummary) {
  const counts = backupSummary.counts || {};
  const snapshotCounts = {
    records: (snapshot.records || []).length,
    diary: (snapshot.diary || []).length,
    genes: (snapshot.genes || []).length,
    knowledge: (snapshot.knowledge || []).length,
  };
  const checks = [
    {
      id: "retention-plan-only",
      passed: true,
      detail: "El Worker només escriu backups; no té rutina de neteja destructiva.",
    },
    {
      id: "exportable-snapshot",
      passed:
        snapshotCounts.records > 0 &&
        snapshotCounts.diary > 0 &&
        snapshotCounts.genes > 0 &&
        snapshotCounts.knowledge > 0,
      detail: `${snapshotCounts.records} records / ${snapshotCounts.diary} diari / ${snapshotCounts.genes} gens / ${snapshotCounts.knowledge} coneixement`,
    },
    {
      id: "kv-backup-written",
      passed: Boolean(backupSummary.lastBackupId),
      detail: backupSummary.lastBackupId || "sense backup",
    },
    {
      id: "backup-counts-match-snapshot",
      passed:
        Number(counts.records) === snapshotCounts.records &&
        Number(counts.diary) === snapshotCounts.diary &&
        Number(counts.genes) === snapshotCounts.genes &&
        Number(counts.knowledge) === snapshotCounts.knowledge,
      detail: `backup ${Number(counts.records || 0)}/${Number(counts.diary || 0)}/${Number(counts.genes || 0)}/${Number(counts.knowledge || 0)} vs snapshot ${snapshotCounts.records}/${snapshotCounts.diary}/${snapshotCounts.genes}/${snapshotCounts.knowledge}`,
    },
  ];
  const failed = checks.filter((check) => !check.passed);
  return {
    ok: failed.length === 0,
    mode: "worker-live-readonly",
    genes: DATA_SAFETY_GENE_IDS,
    summary: failed.length ? `${failed.length} checks de seguretat fallen.` : "Retenció, exportabilitat i vault KV coherents en backup automàtic.",
    risks: failed.map((check) => `worker-data-safety-${check.id}`),
    checks,
  };
}

function getIntegrityFormula() {
  return {
    format: "aura-integrity-formula-v2",
    version: "cloud-v5.3",
    defaultWeight: 10,
    structuralWeight: 18,
    dataSafetyWeight: 18,
    riskPenalty: 3,
    canDropBelow100: true,
    dataSafetyGenes: DATA_SAFETY_GENE_IDS,
  };
}

function calculateIntegrityScore(components, risks) {
  const okStates = new Set(["ok", "fresh", "verified"]);
  const totalWeight = components.reduce((total, component) => total + Number(component.weight || 10), 0);
  const okWeight = components.reduce(
    (total, component) => total + (okStates.has(component.state) ? Number(component.weight || 10) : 0),
    0,
  );
  const base = totalWeight ? Math.round((okWeight / totalWeight) * 100) : 0;
  return Math.max(0, Math.min(100, base - risks.length * 3));
}

function summarizeSignal(value) {
  const text = String(value || "").trim().slice(0, 180);
  if (text.length < 180) return text;
  return `${text.slice(0, 177)}...`;
}

function parseAuditSignal(value) {
  const raw = String(value || "");
  const match = raw.match(/^\[audit:([^\]]+)\]\s*(.*)$/);
  return match ? `${match[1]}: ${summarizeSignal(match[2])}` : summarizeSignal(raw);
}

async function createSnapshot(db) {
  const [records, diary, genes, knowledge] = await Promise.all([
    getRecords(db, 500),
    getDiary(db, 200),
    getGenes(db),
    getKnowledgeItems(db, 200),
  ]);
  const snapshotIntegrity = buildSnapshotIntegrityForEvolution(diary);
  const metamemory = buildMetamemory(records, { mode: "backup-worker-snapshot" });
  const genomeCandidates = buildGenomePromotionCandidates(records, { mode: "backup-worker-snapshot" });
  const evolutionState = buildEvolutionStateFromSignals(
    {
      records,
      diary,
      genes,
      integrity: snapshotIntegrity,
      metamemory,
      genomeCandidates,
    },
    { mode: "backup-worker-snapshot" },
  );
  const evolutionProposals = buildEvolutionProposalsFromState(evolutionState, { mode: "backup-worker-snapshot" });
  const knowledgeLibrary = buildKnowledgeLibrary(knowledge, { mode: "backup-worker-snapshot" });
  const digitalBody = buildDigitalBody(
    {
      records,
      diary,
      genes,
      integrity: snapshotIntegrity,
      evolutionState,
    },
    { mode: "backup-worker-snapshot" },
  );
  const selfReflection = buildSelfReflection(
    {
      records,
      diary,
      genes,
      knowledge,
      integrity: snapshotIntegrity,
      knowledgeLibrary,
      metamemory,
      genomeCandidates,
      evolutionState,
      evolutionProposals,
    },
    { mode: "backup-worker-snapshot" },
  );
  const orientation = buildOrientation(
    {
      records,
      diary,
      genes,
      knowledge,
      integrity: snapshotIntegrity,
      knowledgeLibrary,
      selfReflection,
      evolutionState,
      evolutionProposals,
    },
    { mode: "backup-worker-snapshot" },
  );

  return {
    project: "Projecte Aura",
    version: AURA_VERSION,
    exportedAt: new Date().toISOString(),
    status: {
      counts: {
        records: records.length,
        diary: diary.length,
        genes: genes.length,
        knowledge: knowledge.length,
      },
    },
    records,
    canonicalMemory: records.map(toCanonicalMemoryRecord),
    evolutionDiary: buildEvolutionDiary(diary),
    cloudflareInfrastructure: buildCloudflareInfrastructure({ mode: "backup-worker-snapshot" }),
    webInterface: buildAuraWebInterface({ mode: "backup-worker-snapshot" }),
    digitalGenome: buildDigitalGenome(genes, { mode: "backup-worker-snapshot" }),
    digitalBody,
    knowledgeLibrary,
    selfReflection,
    orientation,
    evolutionaryPurpose: buildEvolutionaryPurpose({ mode: "backup-worker-snapshot" }),
    metamemory,
    genomeCandidates,
    evolutionState,
    evolutionProposals,
    diary,
    genes,
    knowledge,
  };
}

async function getRecords(db, limit) {
  const result = await db
    .prepare(
      "SELECT id, text, kind, source, created_at, tags, weight, state, related_ids FROM records ORDER BY created_at DESC LIMIT ?",
    )
    .bind(limit)
    .all();
  return result.results.map((row) => {
    const weight = normalizeWeight(row.weight, 1);
    return {
      id: row.id,
      text: row.text,
      kind: row.kind,
      source: row.source,
      createdAt: row.created_at,
      timestamp: row.created_at,
      importance: weightToImportance(weight),
      tags: parseJsonList(row.tags),
      weight,
      state: normalizeMemoryState(row.state, "actiu"),
      relatedIds: parseJsonList(row.related_ids),
    };
  });
}

async function getDiary(db, limit) {
  const result = await db
    .prepare("SELECT id, text, created_at FROM diary ORDER BY created_at DESC LIMIT ?")
    .bind(limit)
    .all();
  return result.results.map((row) => ({
    id: row.id,
    text: row.text,
    createdAt: row.created_at,
  }));
}

async function getGenes(db) {
  const result = await db
    .prepare("SELECT id, name, state, description, created_at, updated_at FROM genes ORDER BY id ASC")
    .all();
  return result.results.map((row) => ({
    id: row.id,
    name: row.name,
    state: row.state,
    description: row.description,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}

async function getKnowledgeItems(db, limit) {
  const result = await db
    .prepare(
      "SELECT id, title, kind, locator, summary, tags, status, source, created_at, updated_at FROM knowledge_items ORDER BY updated_at DESC LIMIT ?",
    )
    .bind(limit)
    .all();
  return result.results.map((row) => ({
    id: row.id,
    title: row.title,
    kind: row.kind,
    locator: row.locator,
    summary: row.summary,
    tags: parseJsonList(row.tags),
    status: normalizeKnowledgeStatus(row.status, "catalogat"),
    source: row.source,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}

async function requireWriteAccess(request, env) {
  const expected = normalizeSecret(env.AURA_WRITE_KEY);
  if (!expected) {
    throw new HttpError(500, "La clau privada d'escriptura no està configurada.");
  }

  const provided = normalizeSecret(getWriteKey(request));
  if (!provided) {
    throw new HttpError(401, "Cal activar Mode Sergi per executar el backup manual.");
  }

  if (!(await timingSafeTextEqual(provided, expected))) {
    throw new HttpError(401, "Clau d'escriptura incorrecta.");
  }
}

function getWriteKey(request) {
  const authorization = request.headers.get("Authorization") || "";
  const bearer = authorization.match(/^Bearer\s+(.+)$/i);
  return bearer?.[1] || request.headers.get("X-Aura-Write-Key") || "";
}

function normalizeSecret(value) {
  return String(value || "").trim();
}

function normalizeToken(value, fallback) {
  const token = String(value || fallback)
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9_-]/g, "-")
    .slice(0, 40);
  return token || fallback;
}

function normalizeList(value, maxItems) {
  const raw = Array.isArray(value) ? value : String(value || "").split(",");
  return [...new Set(raw.map((item) => normalizeToken(item, "")).filter(Boolean))].slice(0, maxItems);
}

function parseJsonList(value) {
  if (Array.isArray(value)) return normalizeList(value, 50);
  try {
    return normalizeList(JSON.parse(value || "[]"), 50);
  } catch {
    return normalizeList(value, 50);
  }
}

function countBy(items, key) {
  return items.reduce((accumulator, item) => {
    const value = String(item?.[key] || "desconegut");
    accumulator[value] = (accumulator[value] || 0) + 1;
    return accumulator;
  }, {});
}

function normalizeWeight(value, fallback) {
  const weight = Number.parseInt(value ?? "", 10);
  if (!Number.isFinite(weight)) return fallback;
  return Math.min(Math.max(weight, 1), 5);
}

function normalizeImportance(value) {
  const importance = Number.parseFloat(value ?? "");
  if (!Number.isFinite(importance)) return 0.2;
  return Math.round(Math.min(Math.max(importance, 0), 1) * 100) / 100;
}

function weightToImportance(value) {
  return normalizeImportance(normalizeWeight(value, 1) / 5);
}

function toCanonicalMemoryRecord(record) {
  return {
    id: record.id,
    timestamp: record.timestamp || record.createdAt || null,
    text: record.text,
    importance: normalizeImportance(record.importance ?? weightToImportance(record.weight)),
    source: record.source || "desconegut",
    extensions: {
      kind: record.kind || "usuari",
      tags: normalizeList(record.tags, 12),
      weight: normalizeWeight(record.weight, 1),
      state: normalizeMemoryState(record.state, "actiu"),
      relatedIds: normalizeList(record.relatedIds, 20),
    },
  };
}

function buildCloudflareInfrastructure(options = {}) {
  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: "/api/infrastructure",
    format: "aura-cloudflare-infrastructure-v1",
    phase: "fase-4",
    mode: options.mode || "backup-worker-view",
    document: {
      required: "AURA_CLOUDFLARE_ARCHITECTURE.md",
      related: ["PROTOCOL_AURA_CLOUDFLARE.md", "README.md", "MANUAL_SERGI.md"],
    },
    topology: [
      { id: "sergi", layer: "human", role: "usuari autoritzat per Cloudflare Access" },
      { id: "browser", layer: "client", role: "interfície web, consola Aura i IndexedDB local" },
      { id: "pages", layer: "edge", role: "Cloudflare Pages per HTML, CSS, JS i Functions API" },
      { id: "functions", layer: "api", role: "Pages Functions amb rutes /api/*" },
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
        ],
        bindings: ["DB", "BACKUP_VAULT", "AURA_WRITE_KEY"],
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
        cron: DEFAULT_CRON,
        deployCommand: "npm run deploy:backup-worker",
      },
      {
        id: "browser-indexeddb",
        provider: "browser",
        service: "indexeddb",
        databaseName: "projecte_aura_cloud_v1",
        purpose: "còpia local i fallback del navegador",
      },
    ],
    bindings: {
      required: [
        { name: "DB", type: "d1", configuredIn: ["wrangler.jsonc", "wrangler.backup.jsonc"] },
        { name: "BACKUP_VAULT", type: "workers-kv", configuredIn: ["wrangler.jsonc", "wrangler.backup.jsonc"] },
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
      "Aplicar migracions D1 amb npm run migrate:remote.",
      "Desplegar Pages amb npm run deploy.",
      "Desplegar el Worker amb npm run deploy:backup-worker.",
      "Configurar AURA_WRITE_KEY com a secret tècnic de Pages i Worker sense exposar-lo al navegador.",
      "Validar /api/status, /api/infrastructure, /api/integrity i /health del Worker.",
      "Crear backup i snapshot d'integritat després del desplegament.",
    ],
    safeguards: [
      "Cloudflare Access autoritza l'ús humà; Mode Sergi és el permís de canvi persistent, sense cap codi intern al web.",
      "D1 és la font de veritat de memòria, diari i genoma.",
      "KV conserva backups fora de D1.",
      "IndexedDB és còpia local, no autoritat final.",
      "La restauració requereix previsualització i confirmació.",
      "La retenció continua sent plan-only.",
    ],
  };
}

function buildAuraWebInterface(options = {}) {
  const modules = [
    {
      id: "simple",
      label: "Aura simplificada",
      role: "conversa generativa arrelada en D1, orientació de sessió, informe del dia, escriptura controlada i consulta de records",
      primaryElement: "console-panel",
      commands: ["pregunta lliure a Aura", "avatar: pregunta literària", "lectura local: què és Aura", "lectura local: què faig ara", "lectura local: estat d'Aura", "lectura local: identitat", "/genoma-digital", "/genoma-sintetic", "/coneixement", "/estat-evolutiu", "/propostes-evolucio", "/cos-digital", "/informe-dia", "recorda que ...", "/memoria", "/ultim-record"],
      endpoints: ["/api/chat", "/api/avatar-sergi", "/api/avatar-sergi/chat", "/api/orientation", "/api/pulse", "/api/core", "/api/genome", "/api/genome/synthetic", "/api/knowledge", "/api/evolution/state", "/api/evolution/proposals", "/api/body", "/api/snapshot", "/api/memory", "/api/integrity", "/api/status"],
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
    endpoint: "/api/web",
    format: "aura-web-interface-v1",
    phase: "fase-5",
    mode: options.mode || "backup-worker-view",
    document: {
      required: "MANUAL_SERGI.md",
      related: ["README.md", "PROTOCOL_MESTRE_AURA.md", "AURA_HISTORY.md"],
    },
    layout: {
      shell: "app-header + primary-conversation + immediate-actions + support-grid + identity-grid",
      modules: modules.map((module) => module.id),
      defaultModule: "simple",
      readingOrder: ["conversation", "immediate-actions", "consult-and-explore", "identity-and-status"],
      responsive: ["desktop-conversation-first", "tablet-stack", "mobile-linear"],
    },
    visibleActions,
    modules,
    interactions: {
      navigation: "14 botons visibles autoexplicatius, agrupats per funció sota la conversa principal",
      commandInput: "#command-input",
      conversationalAI: {
        endpoint: "/api/chat",
        provider: "Cloudflare AI Gateway",
        models: { fast: "@cf/meta/llama-3.3-70b-instruct-fp8-fast", reasoning: "openai/gpt-5.6-terra" },
        citations: true,
        fallback: true,
      },
      avatarSergi: { endpoint: "/api/avatar-sergi/chat", mode: "explicit-user-initiated", automaticIngestion: false },
      modeSergi: "autorització automàtica per Cloudflare Access, sense codi intern",
      localFallback: "IndexedDB manté una vista operativa si D1 no respon.",
    },
    safeguards: [
      "Cap escriptura persistent sense Mode Sergi.",
      "La conversa principal és de només lectura i les accions queden agrupades per funció.",
      "Grava record és l'única acció visible que pot escriure.",
      "Sergi Avatar només rep la pregunta explícita, sense memòria privada.",
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

function buildKnowledgeLibrary(items, options = {}) {
  const tags = [...new Set(items.flatMap((item) => item.tags || []))].sort();
  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: "/api/knowledge",
    format: "aura-knowledge-library-v1",
    phase: "fase-9",
    mode: options.mode || "backup-worker-view",
    document: "AURA_KNOWLEDGE.md",
    phaseStatus: PHASE_9_STATUS,
    summary: {
      totalItems: items.length,
      byKind: countBy(items, "kind"),
      byStatus: countBy(items, "status"),
      tags,
    },
    indexing: {
      rag: false,
      vectorDb: false,
      embeddings: false,
      automaticIngestion: false,
    },
    boundaries: [
      "Catalogar una font no vol dir que Aura l'hagi llegida, entesa o sentida.",
      "Cap font s'ingereix automàticament.",
      "Afegir o modificar fonts requereix Mode Sergi.",
      "Els backups i checksums inclouen la biblioteca de coneixement.",
    ],
    items,
  };
}

function buildSelfReflection(signals = {}, options = {}) {
  const records = Array.isArray(signals.records) ? signals.records : [];
  const diary = Array.isArray(signals.diary) ? signals.diary : [];
  const genes = Array.isArray(signals.genes) ? signals.genes : [];
  const knowledge = Array.isArray(signals.knowledge) ? signals.knowledge : [];
  const activeGenes = genes.filter((gene) => gene.state === "actiu");
  const latentGenes = genes.filter((gene) => gene.state === "latent");
  const reviewedKnowledge = knowledge.filter((item) => item.status === "revisat");
  const latestRecord = [...records].sort((a, b) => new Date(b.createdAt || b.timestamp || 0) - new Date(a.createdAt || a.timestamp || 0))[0] || null;
  const latestDiary = [...diary].sort((a, b) => new Date(b.createdAt || b.created_at || 0) - new Date(a.createdAt || a.created_at || 0))[0] || null;
  const importantRecords = records
    .filter((record) => {
      const tags = Array.isArray(record.tags) ? record.tags : [];
      return Number(record.weight || 0) >= 4 || tags.some((tag) => ["nucli", "fundacional", "evolutiu", "protocol"].includes(tag));
    })
    .slice(0, 5);
  const integrityScore = Number(signals.integrity?.score ?? 100);
  const integrityRisks = signals.integrity?.summary?.risks || [];
  const maturity = Number(signals.evolutionState?.values?.maduresaOperativa ?? 0);
  const pressure = Number(signals.evolutionState?.values?.pressioCanvi ?? 0);
  const knowledgeReadiness = knowledge.length ? ratio(reviewedKnowledge.length, knowledge.length) : 0;
  const proposals = signals.evolutionProposals?.proposals || [];
  const priorities = [
    proposals[0]?.action || "Consolidar l'ús de /autoreflexio abans d'obrir una capa nova.",
    knowledge.length && knowledgeReadiness < 1 ? "Revisar fonts pendents abans d'activar RAG, embeddings o Vector DB." : "",
    integrityRisks.length ? "Resoldre riscos d'integritat abans de qualsevol mutació estructural." : "",
    "Mantenir AURA_SELF_REFLECTION.md sincronitzat amb aquesta lectura.",
  ].filter(Boolean);

  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: "/api/self-reflection",
    format: "aura-self-reflection-v1",
    phase: "fase-10",
    mode: options.mode || "backup-worker-derived-readonly",
    name: "Autoreflexió operativa",
    document: "AURA_SELF_REFLECTION.md",
    gene: {
      id: "9227465",
      name: "autoreflexio-operativa",
      state: genes.find((gene) => gene.id === "9227465")?.state || "actiu",
    },
    answers: [
      {
        id: "activitat-recent",
        question: "Què ha quedat registrat com a activitat recent?",
        answer: latestDiary ? summarizeSignal(latestDiary.text) : "No hi ha cap entrada de diari disponible.",
        evidence: latestDiary ? [`diary:${latestDiary.id}`] : [],
      },
      {
        id: "aprenentatge-operatiu",
        question: "Què s'ha consolidat com a aprenentatge operatiu?",
        answer:
          knowledge.length > 0
            ? `La biblioteca té ${knowledge.length} fonts catalogades, amb ${reviewedKnowledge.length} revisades.`
            : "No hi ha fonts catalogades.",
        evidence: ["AURA_KNOWLEDGE.md", "/api/knowledge"],
      },
      {
        id: "records-importants",
        question: "Quins records semblen importants?",
        answer: importantRecords.length
          ? importantRecords.map((record) => `${record.id}: ${summarizeSignal(record.text)}`).join(" | ")
          : "No hi ha records amb pes alt o tags nuclears dins de la mostra.",
        evidence: importantRecords.map((record) => `record:${record.id}`),
      },
      {
        id: "objectius",
        question: "Quins objectius operatius tinc?",
        answer: priorities[0],
        evidence: ["/api/evolution/proposals", "/api/integrity", "AURA_SELF_REFLECTION.md"],
      },
      {
        id: "relacions",
        question: "Quines relacions hi ha entre memòria, diari, genoma i coneixement?",
        answer: `La lectura relaciona ${records.length} records, ${diary.length} entrades de diari, ${genes.length} gens, ${knowledge.length} fonts i integritat ${integrityScore}/100.`,
        evidence: ["/api/memory", "/api/diary", "/api/genome", "/api/knowledge", "/api/integrity"],
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
      latestMemory: latestRecord ? summarizeSignal(latestRecord.text) : "sense memòria recent",
      latestDiary: latestDiary ? summarizeSignal(latestDiary.text) : "sense diari recent",
      integrity: {
        score: integrityScore,
        overall: signals.integrity?.overall || "estable",
        risks: integrityRisks,
      },
      evolutionState: signals.evolutionState?.summary || {},
      knowledgeLibrary: signals.knowledgeLibrary?.summary || {},
      metamemory: signals.metamemory?.summary || {},
      genomeCandidates: signals.genomeCandidates?.summary || {},
    },
    insights: [
      { id: "continuitat", label: "Continuïtat", value: `${records.length} records i ${diary.length} entrades de diari` },
      { id: "coneixement", label: "Coneixement catalogat", value: `${reviewedKnowledge.length}/${knowledge.length} fonts revisades` },
      { id: "genoma", label: "Genoma", value: `${activeGenes.length} gens actius i ${latentGenes.length} latents` },
      { id: "integritat", label: "Integritat falsable", value: `${integrityScore}/100 ${signals.integrity?.overall || "estable"}` },
    ],
    priorities,
    summary: {
      state: classifySelfReflectionState({ integrityScore, pressure, maturity, knowledgeReadiness }),
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
      policy: "Lectura calculada: no escriu records, no modifica gens i no actualitza documents per si sola.",
    },
    boundaries: [
      "Autoreflexió vol dir síntesi operativa calculada, no consciència.",
      "No implica que Aura senti, entengui o visqui res subjectivament.",
      "No executa RAG, embeddings, Vector DB ni ingestió automàtica.",
      "No aplica cap proposta evolutiva ni promoció de genoma.",
    ],
  };
}

function buildOrientation(signals = {}, options = {}) {
  const records = Array.isArray(signals.records) ? signals.records : [];
  const diary = Array.isArray(signals.diary) ? signals.diary : [];
  const genes = Array.isArray(signals.genes) ? signals.genes : [];
  const knowledge = Array.isArray(signals.knowledge) ? signals.knowledge : [];
  const integrityScore = Number(signals.integrity?.score ?? 100);
  const risks = signals.integrity?.summary?.risks || [];
  const latestDiary = [...diary].sort((a, b) => new Date(b.createdAt || b.created_at || 0) - new Date(a.createdAt || a.created_at || 0))[0] || null;
  const latestRecord = [...records].sort((a, b) => new Date(b.createdAt || b.timestamp || 0) - new Date(a.createdAt || a.timestamp || 0))[0] || null;
  const proposalAction = signals.evolutionProposals?.proposals?.[0]?.action || "";
  const reflectionPriority = signals.selfReflection?.priorities?.[0] || "";
  const nextStep =
    risks.length || integrityScore < 100
      ? "Restaurar integritat operativa amb backup KV i snapshot abans d'obrir una fase nova."
      : "Consolidar l'orientació v5.2 en ús real: obrir Aura, executar /que-es-aura, /proxim-pas, /pols i /nucli, i ajustar el text si encara no guia prou bé.";
  const afterNext =
    "Quan l'orientació sigui clara durant diverses sessions, preparar Fase 11 multiagent sense activar-la encara.";

  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: "/api/orientation",
    format: "aura-orientation-v1",
    phase: "cloud-v5.2",
    mode: options.mode || "backup-worker-derived-readonly",
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
      state: risks.length || integrityScore < 100 ? "atencio" : "orientada",
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
        answer: latestDiary ? summarizeSignal(latestDiary.text) : "No hi ha cap entrada recent de diari per sintetitzar.",
      },
    ],
    signals: {
      records: records.length,
      diary: diary.length,
      genes: genes.length,
      knowledge: knowledge.length,
      integrity: `${integrityScore}/100 ${signals.integrity?.overall || "estable"}`,
      latestMemory: latestRecord ? summarizeSignal(latestRecord.text) : "sense memòria recent",
      latestDiary: latestDiary ? summarizeSignal(latestDiary.text) : "sense diari recent",
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
      source: risks.length || integrityScore < 100 ? "/api/integrity" : "AURA_ORIENTATION.md",
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
      status: "/api/status",
      orientation: "/api/orientation",
      nextStep: "/api/proxim-pas",
      pulse: "/api/pulse",
      core: "/api/core",
      selfReflection: "/api/self-reflection",
      integrity: "/api/integrity",
    },
  };
}

function classifySelfReflectionState({ integrityScore, pressure, maturity, knowledgeReadiness }) {
  if (Number(integrityScore || 0) < 80) return "atencio-integritat";
  if (Number(pressure || 0) >= 0.45) return "revisio-operativa";
  if (Number(maturity || 0) >= 0.82 && Number(knowledgeReadiness || 0) >= 0.75) return "consolidacio";
  return "observacio";
}

function buildDigitalGenome(genes, options = {}) {
  const normalizedGenes = [...genes].sort((a, b) => String(a.id).localeCompare(String(b.id)));
  const activeGenes = normalizedGenes.filter((gene) => gene.state === "actiu");
  const latentGenes = normalizedGenes.filter((gene) => gene.state === "latent");
  const archivedGenes = normalizedGenes.filter((gene) => gene.state === "arxivat");
  const observedGenes = normalizedGenes.filter((gene) => gene.state === "observacio");

  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: "/api/genome",
    format: "aura-digital-genome-v1",
    phase: "fase-6",
    mode: options.mode || "backup-worker-view",
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
      active: activeGenes.map(toGenomeGene),
      latent: latentGenes.map(toGenomeGene),
      archived: archivedGenes.map(toGenomeGene),
      observation: observedGenes.map(toGenomeGene),
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

function buildDigitalBody({ records = [], diary = [], genes = [], integrity = null, evolutionState = null } = {}, options = {}) {
  const normalizedGenes = [...genes].sort((a, b) => String(a.id).localeCompare(String(b.id)));
  const activeGenes = normalizedGenes.filter((gene) => gene.state === "actiu");
  const latentGenes = normalizedGenes.filter((gene) => gene.state === "latent");
  const integrityScore = Number(integrity?.score ?? 100);
  const risks = integrity?.summary?.risks || [];
  const maturity = Number(evolutionState?.values?.maduresaOperativa ?? 0);
  const pressure = Number(evolutionState?.values?.pressioCanvi ?? 0);
  const posture = classifyDigitalBodyPosture({ integrityScore, risks, maturity, pressure });
  const vaultFresh = Boolean(integrity?.components?.some((component) => component.id === "vault" && component.state === "fresh"));
  const autoBackupOk = Boolean(
    integrity?.components?.some((component) => component.id === "auto-backup" && component.state === "ok"),
  );
  const latestRecord = [...records].sort((a, b) => new Date(b.createdAt || b.timestamp || 0) - new Date(a.createdAt || a.timestamp || 0))[0];
  const latestDiary = [...diary].sort((a, b) => new Date(b.createdAt || b.created_at || 0) - new Date(a.createdAt || a.created_at || 0))[0];
  const pulseStrength = score01(
    0.28 +
      Math.min(records.length, 30) / 30 * 0.16 +
      Math.min(diary.length, 90) / 90 * 0.14 +
      ratio(activeGenes.length, Math.max(normalizedGenes.length, 1)) * 0.16 +
      Math.max(0, Math.min(integrityScore, 100)) / 100 * 0.18 +
      (vaultFresh ? 0.04 : 0) +
      (autoBackupOk ? 0.04 : 0),
  );

  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: "/api/body",
    format: "aura-digital-body-v1",
    phase: "fase-8",
    phaseStatus: PHASE_8_STATUS,
    mode: options.mode || "backup-worker-view",
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
      { id: "nucli", label: "Nucli", source: "AURA_GENOME.md + D1 genes", value: `${normalizedGenes.length} gens`, state: activeGenes.length ? "actiu" : "pendent" },
      { id: "memoria", label: "Memòria", source: "D1 records", value: `${records.length} records`, state: records.length ? "present" : "buit" },
      { id: "diari", label: "Diari", source: "D1 diary", value: `${diary.length} entrades`, state: diary.length ? "present" : "buit" },
      { id: "integritat", label: "Integritat", source: "/api/integrity", value: `${integrityScore}/100`, state: risks.length ? "atencio" : "estable" },
      { id: "vault", label: "Vault", source: "Workers KV", value: vaultFresh ? "backup fresc" : "revisar backup", state: vaultFresh ? "fresc" : "pendent" },
    ],
    signals: {
      records: records.length,
      diary: diary.length,
      genes: normalizedGenes.length,
      activeGenes: activeGenes.length,
      latentGenes: latentGenes.length,
      integrity: {
        score: integrityScore,
        overall: integrity?.overall || "estable",
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
      "La representació és verificable a /api/body i queda inclosa als backups.",
    ],
    summary: {
      posture,
      pulseStrength,
      layerCount: 5,
      readonly: true,
      sourceCount: 5,
    },
  };
}

function classifyDigitalBodyPosture({ integrityScore, risks, maturity, pressure }) {
  if (Number(integrityScore) < 70) return "alerta";
  if (risks.length) return "atencio";
  if (Number(pressure) >= 0.45) return "revisio";
  if (Number(maturity) >= 0.82) return "consolidacio";
  return "estable";
}

function toGenomeGene(gene) {
  return {
    id: gene.id,
    name: gene.name,
    state: gene.state,
    description: gene.description,
    verificationClass: classifyGeneVerification(gene.id),
    updatedAt: gene.updatedAt || null,
  };
}

function classifyGeneVerification(id) {
  if (["001", "034", "1597"].includes(id)) return "gen mecànic verificable";
  if (["004", "013", "233168", "610987"].includes(id)) return "compromís de governança semàntica - NO auto-verificable";
  return "contracte operatiu o documental";
}

function buildEvolutionaryPurpose(options = {}) {
  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: "/api/purpose",
    format: "aura-evolutionary-purpose-v1",
    phase: "cloud-v4.7",
    mode: options.mode || "backup-worker-view",
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

function buildMetamemory(records, options = {}) {
  const classified = records.map(classifyMemoryRecord);
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
    endpoint: "/api/metamemory",
    format: "aura-metamemory-v1",
    phase: "cloud-v4.7",
    mode: options.mode || "backup-worker-view",
    categories: METAMEMORY_CATEGORIES,
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

function buildGenomePromotionCandidates(records, options = {}) {
  const metamemory = buildMetamemory(records, { mode: "candidate-source" });
  const candidates = metamemory.records.filter((entry) => entry.genomeCandidate.candidate);

  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: "/api/genome/candidates",
    format: "aura-genome-candidates-v1",
    phase: "cloud-v4.7",
    mode: options.mode || "proposal-only",
    source: "/api/metamemory",
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

function buildEvolutionStateFromSignals(signals = {}, options = {}) {
  const records = Array.isArray(signals.records) ? signals.records : [];
  const diary = Array.isArray(signals.diary) ? signals.diary : [];
  const genes = Array.isArray(signals.genes) ? signals.genes : [];
  const metamemory = signals.metamemory || buildMetamemory(records, { mode: "evolution-state-source" });
  const genomeCandidates = signals.genomeCandidates || buildGenomePromotionCandidates(records, { mode: "evolution-state-source" });
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
  const integrityValue = score01(Number(signals.integrity?.score ?? 100) / 100);
  const vaultFresh = Boolean(signals.integrity?.components?.some((component) => component.id === "vault" && component.state === "fresh"));
  const autoBackupOk = Boolean(
    signals.integrity?.components?.some((component) => component.id === "auto-backup" && component.state === "ok"),
  );
  const purposeGeneActive = genes.some((gene) => gene.id === "233168" && gene.state === "actiu");
  const metamemoryGeneActive = genes.some((gene) => gene.id === "377377" && gene.state === "actiu");
  const stateGeneActive = genes.some((gene) => gene.id === "987159" && gene.state === "actiu");
  const total = Math.max(summary.totalRecords, 1);
  const foundationRatio = ratio(summary.fundacional, total);
  const evolutionRatio = ratio(summary.evolutiu, total);
  const temporalRatio = ratio(summary.temporal, total);
  const discardRatio = ratio(summary.descartable, total);
  const candidateRatio = ratio(summary.candidatesToGenome, total);
  const activeGeneRatio = ratio(activeGenes.length, Math.max(genes.length, 1));

  const values = {
    curiositat: score01(0.45 + evolutionRatio * 0.22 + candidateRatio * 0.16 + Math.min(diaryTotal, 80) / 80 * 0.1 + Math.min(latentGenes.length, 8) / 8 * 0.05),
    autonomia: score01(0.28 + activeGeneRatio * 0.28 + integrityValue * 0.15 + (vaultFresh ? 0.08 : 0) + (autoBackupOk ? 0.08 : 0) + (stateGeneActive ? 0.06 : 0)),
    coherencia: score01(0.5 + foundationRatio * 0.18 + (purposeGeneActive ? 0.12 : 0) + (metamemoryGeneActive ? 0.06 : 0) + integrityValue * 0.13 - discardRatio * 0.09),
    continuitat: score01(0.42 + Math.min(summary.totalRecords, 30) / 30 * 0.15 + Math.min(diaryTotal, 80) / 80 * 0.14 + integrityValue * 0.15 + (vaultFresh ? 0.08 : 0) + (autoBackupOk ? 0.06 : 0)),
    integritat: integrityValue,
    pressioCanvi: score01(0.08 + candidateRatio * 0.22 + temporalRatio * 0.1 + discardRatio * 0.16 + evolutionRatio * 0.08 + (1 - integrityValue) * 0.2),
  };
  values.maduresaOperativa = score01((values.autonomia + values.coherencia + values.continuitat + values.integritat) / 4);

  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: "/api/evolution/state",
    format: "aura-evolution-state-v1",
    phase: "fase-7",
    phaseStatus: PHASE_7_STATUS,
    mode: options.mode || "backup-worker-view",
    name: "Estat evolutiu traçable",
    source: {
      memory: "/api/memory/canonical",
      diary: "/api/evolution",
      genome: "/api/genome",
      metamemory: "/api/metamemory",
      genomeCandidates: "/api/genome/candidates",
      integrity: "/api/integrity",
    },
    values,
    metrics: {
      curiositat: { value: values.curiositat, reason: "Augmenta amb memòria evolutiva, candidats a genoma, diari i gens latents." },
      autonomia: { value: values.autonomia, reason: "Deriva de gens actius, integritat, vault, backup automàtic i gen d'estat evolutiu." },
      coherencia: { value: values.coherencia, reason: "Deriva de records fundacionals, propòsit, metamemòria, integritat i baixa presència descartable." },
      continuitat: { value: values.continuitat, reason: "Deriva de volum de memòria, diari, integritat, vault i backup automàtic." },
      integritat: { value: values.integritat, reason: "Replica la puntuació normalitzada d'integritat." },
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
        overall: signals.integrity?.overall || "estable",
        risks: signals.integrity?.summary?.risks || [],
      },
      vaultFresh,
      autoBackupOk,
    },
    summary: {
      dominantState: classifyEvolutionState(values),
      pressure: values.pressioCanvi >= 0.45 ? "alta" : values.pressioCanvi >= 0.25 ? "moderada" : "baixa",
      maturity: values.maduresaOperativa >= 0.82 ? "alta" : values.maduresaOperativa >= 0.66 ? "mitjana" : "inicial",
      mutationApplied: false,
    },
    mutation: {
      autoApply: false,
      persistentWrite: false,
      requiresModeSergi: true,
      policy: "L'estat evolutiu és calculat; cap valor es persisteix com a mutació sense Mode Sergi, auditoria i actualització d'AURA_GENOME.md.",
    },
    heuristic: getEvolutionStateHeuristic(),
    safeguards: [
      "No modifica memòria, diari ni genoma.",
      "No promociona candidats a genoma.",
      "No substitueix AURA_GENOME.md.",
      "Qualsevol mutació persistent continua requerint Mode Sergi.",
    ],
    links: {
      proposals: "/api/evolution/proposals",
      status: "/api/status",
      pulse: "/api/pulse",
      core: "/api/core",
    },
  };
}

function buildEvolutionProposalsFromState(state, options = {}) {
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
    endpoint: "/api/evolution/proposals",
    format: "aura-evolution-proposals-v1",
    phase: "fase-7",
    phaseStatus: state.phaseStatus || PHASE_7_STATUS,
    mode: options.mode || "proposal-only",
    source: state.endpoint || "/api/evolution/state",
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

function buildSnapshotIntegrityForEvolution(diary) {
  const latestAudit = diary.find((entry) => String(entry.text || "").startsWith("[audit:")) || null;
  return {
    score: latestAudit ? 100 : 92,
    overall: latestAudit ? "estable" : "observacio",
    summary: {
      risks: latestAudit ? [] : ["auditoria-no-detectada"],
    },
    components: [
      { id: "d1", state: "ok" },
      { id: "audit", state: latestAudit ? "ok" : "pending" },
      { id: "backup-worker", state: "running" },
    ],
  };
}

function getEvolutionStateHeuristic() {
  return {
    scale: "0..1",
    metrics: EVOLUTION_STATE_METRICS,
    derivedFrom: [
      "metamemòria",
      "candidats a genoma",
      "nombre de records i diari",
      "estat dels gens",
      "integritat operativa",
      "frescor de vault i backup automàtic",
    ],
    persistence: "calculada en lectura; no és una mutació persistent",
  };
}

function classifyEvolutionState(values) {
  if (Number(values.integritat || 0) < 0.85) return "observacio";
  if (Number(values.pressioCanvi || 0) >= 0.45) return "revisio";
  if (Number(values.maduresaOperativa || 0) >= 0.82) return "consolidacio";
  return "creixement";
}

function ratio(part, total) {
  if (!total) return 0;
  return Number((Number(part || 0) / total).toFixed(4));
}

function score01(value) {
  return Number(Math.min(1, Math.max(0, Number(value) || 0)).toFixed(2));
}

function classifyMemoryRecord(record) {
  const text = String(record.text || "");
  const lower = text.toLowerCase();
  const tags = normalizeList(record.tags, 12);
  const weight = normalizeWeight(record.weight, 1);
  const reasons = [];
  let category = "operatiu";
  let action = "conservar";

  if (record.id?.startsWith("foundation-") || hasAny(lower, ["l'objectiu és", "no ha de fingir", "forma pròpia", "memòria és central", "pot tenir un genoma", "silici"])) {
    category = "fundacional";
    action = "preservar";
    reasons.push("defineix identitat o principi fundacional");
  } else if (tags.some((tag) => ["fase-2", "fase", "protocol"].includes(tag)) || hasAny(lower, ["fase", "formalitzat", "aura cloud v", "ha activat memoria", "ha activat memòria"])) {
    category = "evolutiu";
    action = "preservar i resumir a història si cal";
    reasons.push("descriu una transició o capacitat estable");
  } else if (hasAny(lower, ["prova protegida", "prova "]) && weight <= 2) {
    category = "descartable";
    action = "mantenir sense promoció; possible exclusió futura de resums";
    reasons.push("prova tècnica de baix pes");
  } else if (hasAny(lower, ["està actiu", "esta actiu", "correctament", "producció", "produccio"]) && weight <= 2) {
    category = "temporal";
    action = "mantenir com a traça temporal";
    reasons.push("estat o validació puntual");
  } else if (tags.some((tag) => ["mode-sergi", "validacio", "validació"].includes(tag)) || hasAny(lower, ["mode sergi", "validació", "validacio", "backup", "integritat"])) {
    category = "operatiu";
    action = "conservar com a suport operatiu";
    reasons.push("ajuda a operar o validar el sistema");
  }

  const genomeCandidate = assessGenomeCandidate(record, category, reasons);

  return {
    id: record.id,
    text,
    category,
    action,
    weight,
    state: normalizeMemoryState(record.state, "actiu"),
    tags,
    source: record.source || "desconegut",
    createdAt: record.createdAt || record.timestamp || null,
    reasons: reasons.length ? reasons : ["classificació operativa per defecte"],
    genomeCandidate,
  };
}

function assessGenomeCandidate(record, category, reasons = []) {
  const lower = String(record.text || "").toLowerCase();
  const weight = normalizeWeight(record.weight, 1);
  const stableProperty =
    category === "fundacional" ||
    hasAny(lower, ["ha de", "pot tenir", "és central", "objectiu", "forma pròpia", "no ha de fingir"]);
  const capabilityProperty =
    category === "evolutiu" && (weight >= 4 || hasAny(lower, ["formalitzat", "fase", "memòria persistent", "memoria persistent"]));
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

function hasAny(text, tokens) {
  return tokens.some((token) => text.includes(token));
}

function normalizeMemoryState(value, fallback) {
  const state = normalizeToken(value, fallback);
  return MEMORY_STATES.includes(state) ? state : fallback;
}

function normalizeKnowledgeStatus(value, fallback) {
  const state = normalizeToken(value, fallback);
  return KNOWLEDGE_STATUSES.includes(state) ? state : fallback;
}

function buildEvolutionDiary(diary) {
  const entries = diary.map(mapEvolutionEntry);
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
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    format: "aura-evolution-diary-v1",
    phase: "fase-3",
    mode: "backup-worker-snapshot",
    document: { required: "AURA_HISTORY.md" },
    summary: {
      totalEntries: entries.length,
      days: timeline.length,
      auditEntries: entries.filter((entry) => entry.category === "audit").length,
      versionEntries: entries.filter((entry) => entry.category === "version").length,
      historyCandidates: historyCandidates.length,
    },
    timeline,
    historyCandidates: historyCandidates.slice(0, 20),
  };
}

function mapEvolutionEntry(entry) {
  const text = String(entry.text || "").trim();
  const category = classifyEvolutionEntry(text);
  const reason = explainEvolutionCandidate(text, category);
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

function classifyEvolutionEntry(text) {
  const normalized = String(text || "").trim().replaceAll(/\s+/g, " ").toLowerCase();
  if (normalized.startsWith("[audit:")) return "audit";
  if (/(cloud[- ]?v?\d|v\d+\.\d+|fase \d|protocol mestre)/i.test(text)) return "version";
  if (/(backup|vault|integritat|snapshot|restauracio|restauració)/i.test(text)) return "continuity";
  if (/(genoma|gen |mutacio|mutació)/i.test(text)) return "genome";
  if (/(memoria|memòria|record)/i.test(text)) return "memory";
  return "operational";
}

function explainEvolutionCandidate(text, category) {
  const normalized = String(text || "").trim().replaceAll(/\s+/g, " ").toLowerCase();
  if (category === "audit") return "auditoria estructural";
  if (category === "version") return "canvi de fase o versió";
  if (/despleg|activat|formalitzat|protocol|cloud-v|fase/.test(normalized)) return "fita reconstruïble";
  return "";
}

function dayStamp(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

async function timingSafeTextEqual(left, right) {
  const encoder = new TextEncoder();
  const [leftHash, rightHash] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(left)),
    crypto.subtle.digest("SHA-256", encoder.encode(right)),
  ]);
  const leftBytes = new Uint8Array(leftHash);
  const rightBytes = new Uint8Array(rightHash);
  let mismatch = leftBytes.length ^ rightBytes.length;
  for (let index = 0; index < leftBytes.length && index < rightBytes.length; index += 1) {
    mismatch |= leftBytes[index] ^ rightBytes[index];
  }
  return mismatch === 0;
}

async function sha256Hex(text) {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function assertBindings(env) {
  if (!env.DB) throw new HttpError(500, "El binding D1 DB no està configurat.");
  if (!env.BACKUP_VAULT) throw new HttpError(500, "El binding BACKUP_VAULT no està configurat.");
}

function json(payload, status = 200) {
  return Response.json(payload, { status, headers: apiHeaders() });
}

function apiHeaders() {
  return {
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Authorization, Content-Type, X-Aura-Write-Key",
  };
}

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
