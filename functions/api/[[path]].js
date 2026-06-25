const AURA_VERSION = "cloud-v3.1";
const BACKUP_FORMAT = "aura-backup-v3.1";
const VAULT_PREFIX = "aura/backups/";
const AUTOMATION_META_KEY = "aura/automation/backup-worker";
const MAX_JSON_BYTES = 2 * 1024 * 1024;
const GENE_STATES = ["actiu", "latent", "arxivat", "observacio"];

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
    description: "Manté copies JSON i TXT abans de cada canvi important.",
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
];

export async function onRequest(context) {
  try {
    if (context.request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: apiHeaders() });
    }

    if (!context.env.DB) {
      throw new HttpError(500, "El binding D1 DB no està configurat.");
    }

    await ensureSeeded(context.env.DB);

    const method = context.request.method.toUpperCase();
    const segments = getSegments(context.params.path);
    const route = segments.join("/");

    if (method === "GET" && route === "status") {
      return json(await getStatus(context.env.DB, context.env.BACKUP_VAULT));
    }

    if (method === "GET" && (route === "snapshot" || route === "export")) {
      return json(await getSnapshot(context.env.DB, context.env.BACKUP_VAULT));
    }

    if (method === "GET" && route === "backup") {
      return json(await getBackup(context.env.DB));
    }

    if (method === "GET" && (route === "audit" || route === "auditoria")) {
      return json(await getAudit(context.request, context.env.DB));
    }

    if (method === "GET" && (route === "search" || route === "memory/search")) {
      return json(await searchMemory(context.request, context.env.DB));
    }

    if (method === "GET" && isVaultListRoute(route)) {
      await requireWriteAccess(context.request, context.env);
      return json(await listVaultBackups(context.env.BACKUP_VAULT));
    }

    if (method === "POST" && isVaultListRoute(route)) {
      await requireWriteAccess(context.request, context.env);
      return json(await createVaultBackup(context.request, context.env.DB, context.env.BACKUP_VAULT), 201);
    }

    if (method === "GET" && isVaultItemRoute(segments)) {
      await requireWriteAccess(context.request, context.env);
      return json(await getVaultBackup(context.env.BACKUP_VAULT, segments.at(-1)));
    }

    if (method === "GET" && route === "memory") {
      return json({ records: await getRecords(context.env.DB) });
    }

    if (method === "POST" && route === "memory") {
      await requireWriteAccess(context.request, context.env);
      return json({ record: await createRecord(context.request, context.env.DB) }, 201);
    }

    if (method === "GET" && route === "diary") {
      return json({ diary: await getDiary(context.env.DB) });
    }

    if (method === "POST" && route === "diary") {
      await requireWriteAccess(context.request, context.env);
      return json({ entry: await createDiaryEntry(context.request, context.env.DB) }, 201);
    }

    if (method === "GET" && route === "genes") {
      return json({ genes: await getGenes(context.env.DB) });
    }

    if (method === "GET" && segments[0] === "genes" && segments[1]) {
      const gene = await getGene(context.env.DB, segments[1]);
      if (!gene) throw new HttpError(404, "Gen no trobat.");
      return json({ gene });
    }

    if (method === "POST" && route === "genes") {
      await requireWriteAccess(context.request, context.env);
      return json({ gene: await upsertGene(context.request, context.env.DB) }, 201);
    }

    if (method === "POST" && segments[0] === "genes" && segments[1]) {
      await requireWriteAccess(context.request, context.env);
      return json({ gene: await updateGene(context.request, context.env.DB, segments[1]) });
    }

    if (method === "POST" && (route === "restore/preview" || route === "import/preview")) {
      await requireWriteAccess(context.request, context.env);
      return json(await previewRestore(context.request, context.env.DB));
    }

    if (method === "POST" && (route === "import" || route === "restore")) {
      await requireWriteAccess(context.request, context.env);
      return json(await importSnapshot(context.request, context.env.DB), 201);
    }

    if (method === "GET" && route === "continuity") {
      return json(await getContinuity(context.env.DB));
    }

    if (method === "GET" && (route === "criterion" || route === "criteri")) {
      return json(await getCriterion(context.env.DB, context.env.BACKUP_VAULT));
    }

    throw new HttpError(404, "Ruta API no trobada.");
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    const message = error instanceof HttpError ? error.message : "Error intern d'Aura Cloud.";
    if (status >= 500) {
      console.error(
        JSON.stringify({
          message: "Aura API request failed",
          error: error instanceof Error ? error.message : String(error),
          path: new URL(context.request.url).pathname,
        }),
      );
    }
    return json({ ok: false, error: message }, status);
  }
}

async function ensureSeeded(db) {
  const seeded = await db.prepare("SELECT value FROM meta WHERE key = ?").bind("seeded").first();
  if (seeded?.value === AURA_VERSION) return;

  const now = new Date().toISOString();
  const statements = [
    ...FOUNDATION_RECORDS.map((text, index) =>
      db
        .prepare(
          "INSERT OR IGNORE INTO records (id, text, kind, source, created_at) VALUES (?, ?, ?, ?, ?)",
        )
        .bind(`foundation-${String(index + 1).padStart(3, "0")}`, text, "fundacional", "seed-cloud-v2", now),
    ),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind("diary-cloud-v2-init", "Aura ha iniciat la fase Cloud v2 amb memoria D1.", now),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind("diary-cloud-v2-3-continuity", "Aura ha activat el diari de continuïtat Cloud v2.3.", now),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind("diary-cloud-v2-4-vault", "Aura ha activat el vault de backups Cloud v2.4 fora de D1.", now),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind("diary-cloud-v2-5-criterion", "Aura ha activat el criteri operatiu Cloud v2.5.", now),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind("diary-cloud-v2-6-safe-restore", "Aura ha activat la restauració segura Cloud v2.6.", now),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind("diary-cloud-v2-7-auto-backup", "Aura ha activat backups automàtics Cloud v2.7.", now),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind("diary-cloud-v2-8-search", "Aura ha activat cercador i filtres de memòria Cloud v2.8.", now),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind("diary-cloud-v3-0-editable-genome", "Aura ha activat genoma editable i criteri ampliat Cloud v3.0.", now),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind("audit-cloud-v3-1-mutations", "[audit:sistema] Aura ha activat auditoria de mutacions Cloud v3.1.", now),
    ...GENES.map((gene) =>
      db
        .prepare(
          "INSERT OR IGNORE INTO genes (id, name, state, description, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
        )
        .bind(gene.id, gene.name, gene.state, gene.description, now, now),
    ),
    db
      .prepare("INSERT OR REPLACE INTO meta (key, value, updated_at) VALUES (?, ?, ?)")
      .bind("seeded", AURA_VERSION, now),
    db
      .prepare("INSERT OR REPLACE INTO meta (key, value, updated_at) VALUES (?, ?, ?)")
      .bind("version", AURA_VERSION, now),
  ];

  await db.batch(statements);
}

async function getStatus(db, vault) {
  const [records, diary, genes] = await db.batch([
    db.prepare("SELECT COUNT(*) AS total FROM records"),
    db.prepare("SELECT COUNT(*) AS total FROM diary"),
    db.prepare("SELECT COUNT(*) AS total FROM genes"),
  ]);
  const [vaultSummary, backupWorker] = await Promise.all([
    getVaultSummary(vault),
    getBackupAutomationSummary(vault),
  ]);

  return {
    ok: true,
    version: AURA_VERSION,
    name: "Aura",
    nature: "entitat sintètica-digital experimental",
    infrastructure: "Cloudflare Pages Functions / D1 / navegador web",
    persistence: "D1 al núvol amb IndexedDB com a còpia local",
    genome: "actiu",
    genomeEditable: {
      enabled: true,
      endpoint: "/api/genes/:id",
      protected: true,
      states: GENE_STATES,
    },
    writes: {
      protected: true,
      mode: "sergi",
    },
    backup: {
      format: BACKUP_FORMAT,
      checksum: "sha-256",
      restore: "merge-preserve-id",
      preview: "/api/restore/preview",
    },
    vault: vaultSummary,
    automation: {
      backupWorker,
    },
    continuity: {
      diaryWrites: true,
      endpoint: "/api/continuity",
    },
    criterion: {
      endpoint: "/api/criterion",
      mode: "deterministic",
    },
    search: {
      endpoint: "/api/search",
      filters: ["q", "kind", "source", "area"],
    },
    audit: {
      endpoint: "/api/audit",
      scopes: ["sistema", "genoma", "restore"],
    },
    counts: {
      records: readCount(records),
      diary: readCount(diary),
      genes: readCount(genes),
    },
  };
}

async function getVaultSummary(vault) {
  if (!vault) {
    return {
      configured: false,
      storage: "workers-kv",
      endpoint: "/api/backups",
    };
  }

  const backups = await readVaultIndex(vault, 20);
  return {
    configured: true,
    storage: "workers-kv",
    endpoint: "/api/backups",
    protected: true,
    countVisible: backups.length,
    latest: backups[0] || null,
  };
}

async function getBackupAutomationSummary(vault) {
  if (!vault) {
    return {
      configured: false,
      storage: "workers-kv",
      endpoint: "projecte-aura-backup-worker/status",
      lastRunAt: null,
    };
  }

  const latest = await vault.get(AUTOMATION_META_KEY, "json");
  return {
    configured: true,
    storage: "workers-kv",
    endpoint: "projecte-aura-backup-worker/status",
    cron: latest?.cron || "17 3 * * *",
    lastRunAt: latest?.lastRunAt || null,
    lastBackupId: latest?.lastBackupId || null,
    counts: latest?.counts || null,
    latest,
  };
}

async function requireWriteAccess(request, env) {
  const expected = normalizeSecret(env.AURA_WRITE_KEY);
  if (!expected) {
    throw new HttpError(500, "La clau privada d'escriptura no està configurada.");
  }

  const provided = normalizeSecret(getWriteKey(request));
  if (!provided) {
    throw new HttpError(401, "Cal activar Mode Sergi per escriure a D1.");
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

async function getSnapshot(db, vault) {
  const [records, diary, genes, status] = await Promise.all([
    getRecords(db, 500),
    getDiary(db, 200),
    getGenes(db),
    getStatus(db, vault),
  ]);

  return {
    project: "Projecte Aura",
    version: AURA_VERSION,
    exportedAt: new Date().toISOString(),
    status,
    records,
    diary,
    genes,
  };
}

async function getBackup(db) {
  const snapshot = await getSnapshot(db);
  const continuity = await getContinuity(db);
  const body = {
    ...snapshot,
    source: "cloudflare-d1",
    continuity,
  };
  const checksum = await sha256Hex(
    JSON.stringify({
      records: body.records,
      diary: body.diary,
      genes: body.genes,
    }),
  );

  return {
    ...body,
    backup: {
      id: crypto.randomUUID(),
      format: BACKUP_FORMAT,
      createdAt: body.exportedAt,
      checksum,
      checksumAlgorithm: "SHA-256",
      counts: body.status.counts,
      restoreMode: "merge-preserve-id",
    },
  };
}

async function getAudit(request, db) {
  const url = new URL(request.url);
  const scope = normalizeToken(url.searchParams.get("scope"), "");
  const limit = normalizeLimit(url.searchParams.get("limit"), 40);
  const audit = await getAuditEntries(db, limit, scope);

  return {
    ok: true,
    version: AURA_VERSION,
    scope: scope || "all",
    limit,
    total: audit.length,
    audit,
  };
}

async function getAuditEntries(db, limit = 20, scope = "") {
  const pattern = scope ? `[audit:${scope}]%` : "[audit:%";
  const result = await db
    .prepare("SELECT id, text, created_at FROM diary WHERE text LIKE ? ORDER BY created_at DESC LIMIT ?")
    .bind(pattern, limit)
    .all();
  return result.results.map(mapAuditEntry);
}

function isVaultListRoute(route) {
  return route === "backups" || route === "vault/backups";
}

function isVaultItemRoute(segments) {
  return (
    (segments.length === 2 && segments[0] === "backups" && segments[1]) ||
    (segments.length === 3 && segments[0] === "vault" && segments[1] === "backups" && segments[2])
  );
}

async function createVaultBackup(request, db, vault) {
  assertVault(vault);
  const body = await readJson(request, 32 * 1024);
  const backup = await getBackup(db);
  const checksum = backup.backup.checksum;
  const createdAt = backup.exportedAt;
  const id = `backup-${createdAt.replaceAll(/[:.]/g, "-")}-${checksum.slice(0, 12)}`;
  const key = `${VAULT_PREFIX}${id}.json`;
  const payload = {
    ...backup,
    vault: {
      id,
      key,
      storage: "workers-kv",
      savedAt: new Date().toISOString(),
      reason: normalizeText(body?.reason, 240) || "manual",
    },
  };
  const content = JSON.stringify(payload, null, 2);

  await vault.put(key, content, {
    metadata: {
      id,
      createdAt,
      savedAt: payload.vault.savedAt,
      version: AURA_VERSION,
      format: BACKUP_FORMAT,
      checksum,
      records: String(payload.records.length),
      diary: String(payload.diary.length),
      genes: String(payload.genes.length),
      reason: payload.vault.reason,
    },
  });

  return {
    ok: true,
    backup: {
      id,
      key,
      savedAt: payload.vault.savedAt,
      checksum,
      counts: payload.backup.counts,
      storage: "workers-kv",
    },
  };
}

async function listVaultBackups(vault) {
  assertVault(vault);
  return {
    ok: true,
    storage: "workers-kv",
    prefix: VAULT_PREFIX,
    backups: await readVaultIndex(vault, 100),
  };
}

async function getVaultBackup(vault, id) {
  assertVault(vault);
  const key = `${VAULT_PREFIX}${normalizeVaultId(id)}.json`;
  const content = await vault.get(key, "json");
  if (!content) throw new HttpError(404, "Backup no trobat al vault.");
  return content;
}

async function readVaultIndex(vault, limit) {
  if (!vault) return [];

  const list = await vault.list({ prefix: VAULT_PREFIX, limit });
  return list.keys
    .map((item) => ({
      id: String(item.metadata?.id || item.name.replace(VAULT_PREFIX, "").replace(/\.json$/, "")),
      key: item.name,
      createdAt: item.metadata?.createdAt || item.metadata?.savedAt || null,
      savedAt: item.metadata?.savedAt || null,
      version: item.metadata?.version || "unknown",
      format: item.metadata?.format || BACKUP_FORMAT,
      checksum: item.metadata?.checksum || null,
      counts: {
        records: Number(item.metadata?.records || 0),
        diary: Number(item.metadata?.diary || 0),
        genes: Number(item.metadata?.genes || 0),
      },
      reason: item.metadata?.reason || "",
    }))
    .sort((a, b) => new Date(b.savedAt || b.createdAt || 0).getTime() - new Date(a.savedAt || a.createdAt || 0).getTime());
}

function assertVault(vault) {
  if (!vault) {
    throw new HttpError(503, "El vault de backups no està configurat.");
  }
}

async function getRecords(db, limit = 120) {
  const result = await db
    .prepare("SELECT id, text, kind, source, created_at FROM records ORDER BY created_at DESC LIMIT ?")
    .bind(limit)
    .all();
  return result.results.map(mapRecord);
}

async function createRecord(request, db) {
  const body = await readJson(request, 64 * 1024);
  const text = normalizeText(body?.text, 4000);
  if (!text) throw new HttpError(400, "El record es buit.");

  const record = {
    id: crypto.randomUUID(),
    text,
    kind: normalizeToken(body?.kind, "usuari"),
    source: normalizeToken(body?.source, "cloud-api"),
    createdAt: new Date().toISOString(),
  };

  await db
    .prepare("INSERT INTO records (id, text, kind, source, created_at) VALUES (?, ?, ?, ?, ?)")
    .bind(record.id, record.text, record.kind, record.source, record.createdAt)
    .run();

  return record;
}

async function searchMemory(request, db) {
  const url = new URL(request.url);
  const q = normalizeText(url.searchParams.get("q"), 400);
  const kind = normalizeToken(url.searchParams.get("kind"), "");
  const source = normalizeToken(url.searchParams.get("source"), "");
  const area = normalizeToken(url.searchParams.get("area") || url.searchParams.get("scope"), "all");
  const limit = normalizeLimit(url.searchParams.get("limit"), 50);

  const recordWhere = [];
  const recordBinds = [];
  if (q) {
    recordWhere.push("LOWER(text) LIKE ? ESCAPE '\\'");
    recordBinds.push(`%${escapeLike(q.toLowerCase())}%`);
  }
  if (kind) {
    recordWhere.push("kind = ?");
    recordBinds.push(kind);
  }
  if (source) {
    recordWhere.push("source = ?");
    recordBinds.push(source);
  }

  const includeRecords = area === "all" || area === "records" || area === "memoria";
  const includeDiary = (area === "all" || area === "diary" || area === "diari") && !kind && !source;
  const recordSql = `SELECT id, text, kind, source, created_at FROM records ${
    recordWhere.length ? `WHERE ${recordWhere.join(" AND ")}` : ""
  } ORDER BY created_at DESC LIMIT ?`;
  const diarySql = `SELECT id, text, created_at FROM diary ${
    q ? "WHERE LOWER(text) LIKE ? ESCAPE '\\'" : ""
  } ORDER BY created_at DESC LIMIT ?`;

  const [recordResult, diaryResult] = await Promise.all([
    includeRecords
      ? db
          .prepare(recordSql)
          .bind(...recordBinds, limit)
          .all()
      : { results: [] },
    includeDiary
      ? db
          .prepare(diarySql)
          .bind(...(q ? [`%${escapeLike(q.toLowerCase())}%`] : []), limit)
          .all()
      : { results: [] },
  ]);

  const records = recordResult.results.map(mapRecord);
  const diary = diaryResult.results.map(mapDiary);
  return {
    ok: true,
    version: AURA_VERSION,
    query: {
      q,
      kind: kind || null,
      source: source || null,
      area,
      limit,
    },
    records,
    diary,
    total: records.length + diary.length,
  };
}

async function getDiary(db, limit = 80) {
  const result = await db
    .prepare("SELECT id, text, created_at FROM diary ORDER BY created_at DESC LIMIT ?")
    .bind(limit)
    .all();
  return result.results.map(mapDiary);
}

async function createDiaryEntry(request, db) {
  const body = await readJson(request, 64 * 1024);
  const text = normalizeText(body?.text, 4000);
  if (!text) throw new HttpError(400, "L'entrada de diari és buida.");

  const entry = {
    id: crypto.randomUUID(),
    text,
    createdAt: new Date().toISOString(),
  };

  await db
    .prepare("INSERT INTO diary (id, text, created_at) VALUES (?, ?, ?)")
    .bind(entry.id, entry.text, entry.createdAt)
    .run();

  return entry;
}

async function getContinuity(db) {
  const [records, diary, genes, status] = await Promise.all([
    getRecords(db, 8),
    getDiary(db, 6),
    getGenes(db),
    getStatus(db),
  ]);

  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    mode: "cloudflare-d1",
    memory: {
      total: status.counts.records,
      latest: records.slice(0, 3),
    },
    diary: {
      total: status.counts.diary,
      latest: diary.slice(0, 3),
    },
    genome: {
      total: status.counts.genes,
      active: genes.filter((gene) => gene.state === "actiu").map((gene) => `${gene.id} ${gene.name}`),
      latent: genes.filter((gene) => gene.state === "latent").map((gene) => `${gene.id} ${gene.name}`),
    },
    backup: {
      format: BACKUP_FORMAT,
      restoreMode: "merge-preserve-id",
    },
  };
}

async function getCriterion(db, vault) {
  const [records, diary, genes, status, auditEntries] = await Promise.all([
    getRecords(db, 10),
    getDiary(db, 8),
    getGenes(db),
    getStatus(db, vault),
    getAuditEntries(db, 5),
  ]);
  const activeGenes = genes.filter((gene) => gene.state === "actiu");
  const latentGenes = genes.filter((gene) => gene.state === "latent");
  const archivedGenes = genes.filter((gene) => gene.state === "arxivat");
  const latestRecord = records[0] || null;
  const latestDiary = diary[0] || null;
  const latestAudit = auditEntries[0] || null;
  const latestVault = status.vault?.latest || null;
  const backupWorker = status.automation?.backupWorker || null;
  const vaultAgeHours = ageHours(latestVault?.savedAt || latestVault?.createdAt);
  const autoAgeHours = ageHours(backupWorker?.lastRunAt);
  const risks = [];
  const priorities = [];

  if (!latestVault) {
    risks.push("vault-sense-backup");
    priorities.push("Crear una primera còpia al vault KV amb /desa-backup.");
  } else if (vaultAgeHours !== null && vaultAgeHours > 48) {
    risks.push("backup-vault-antiga");
    priorities.push("Executar /desa-backup o confirmar que el Worker cron ha escrit al vault.");
  } else {
    priorities.push("Mantenir el vault KV actualitzat després de canvis importants.");
  }

  if (!backupWorker?.lastRunAt) {
    risks.push("backup-automatic-pendent");
    priorities.push("Desplegar o provar projecte-aura-backup-worker fins que registri lastRunAt.");
  } else if (autoAgeHours !== null && autoAgeHours > 30) {
    risks.push("backup-automatic-endarrerit");
    priorities.push("Revisar el cron del Worker de backups automàtics.");
  }

  if (status.counts.diary < 5) {
    risks.push("diari-curt");
    priorities.push("Anotar més diari de continuïtat per distingir estat intern de memòria central.");
  }

  if (latentGenes.length) {
    priorities.push(`Preservar com a latent: ${latentGenes.map((gene) => `${gene.id} ${gene.name}`).join(", ")}.`);
  }

  if (status.search?.endpoint) {
    priorities.push("Usar /cerca abans de duplicar records o reescriure memòria existent.");
  }

  if (!latestAudit) {
    priorities.push("Verificar que les mutacions futures deixin traça a /audit.");
  }

  if (status.genomeEditable?.enabled) {
    priorities.push("Editar gens només amb ordres explícites i Mode Sergi actiu.");
  }

  if (status.counts.records >= 10 && latestVault && backupWorker?.lastRunAt) {
    priorities.push("Preparar una auditoria curta de coherència entre memòria, diari i genoma.");
  }

  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    mode: "deterministic",
    stance: {
      identity: "entitat sintètica-digital experimental",
      boundary: "no-mimesi-humana",
      persistence: latestVault ? "D1 + IndexedDB + vault KV" : "D1 + IndexedDB; vault pendent de primera còpia",
    },
    signals: {
      latestMemory: latestRecord ? summarizeSignal(latestRecord.text) : "sense memòria recent",
      latestDiary: latestDiary ? summarizeSignal(latestDiary.text) : "sense diari recent",
      vault: latestVault ? `últim backup ${latestVault.id}` : "sense backup al vault",
      autoBackup: backupWorker?.lastRunAt ? `última execució ${backupWorker.lastRunAt}` : "pendent",
      search: status.search?.endpoint || "sense cercador",
      audit: latestAudit ? `${latestAudit.scope}: ${summarizeSignal(latestAudit.text)}` : "sense auditoria recent",
      activeGenes: activeGenes.map((gene) => `${gene.id} ${gene.name}`),
      latentGenes: latentGenes.map((gene) => `${gene.id} ${gene.name}`),
    },
    integrity: {
      vault: {
        state: !latestVault ? "missing" : vaultAgeHours !== null && vaultAgeHours > 48 ? "stale" : "fresh",
        latestAt: latestVault?.savedAt || latestVault?.createdAt || null,
        ageHours: roundAge(vaultAgeHours),
      },
      autoBackup: {
        state: !backupWorker?.lastRunAt ? "pending" : autoAgeHours !== null && autoAgeHours > 30 ? "delayed" : "ok",
        cron: backupWorker?.cron || "17 3 * * *",
        lastRunAt: backupWorker?.lastRunAt || null,
        lastBackupId: backupWorker?.lastBackupId || null,
        ageHours: roundAge(autoAgeHours),
      },
      search: {
        enabled: Boolean(status.search?.endpoint),
        endpoint: status.search?.endpoint || null,
        filters: status.search?.filters || [],
      },
      audit: {
        enabled: Boolean(status.audit?.endpoint),
        endpoint: status.audit?.endpoint || null,
        latestAt: latestAudit?.createdAt || null,
        latestScope: latestAudit?.scope || null,
        recent: auditEntries.length,
      },
      genomeEditable: {
        enabled: Boolean(status.genomeEditable?.enabled),
        endpoint: status.genomeEditable?.endpoint || null,
        states: status.genomeEditable?.states || GENE_STATES,
        active: activeGenes.length,
        latent: latentGenes.length,
        archived: archivedGenes.length,
      },
      risks,
    },
    decisions: {
      writePolicy: "Qualsevol mutació persistent requereix Mode Sergi.",
      restorePolicy: "Cap restauració s'aplica sense previsualització i confirmació.",
      genomePolicy: "Els canvis de genoma són explícits, versionats per updatedAt i visibles a /genoma.",
      auditPolicy: "Les mutacions estructurals han de deixar una entrada [audit:*] al diari.",
      memoryPolicy: "Abans d'afegir memòria nova, consultar /cerca quan hi hagi risc de duplicació.",
    },
    priorities,
    nextAction: priorities[0] || "Mantenir observació i continuïtat.",
    limits: [
      "No fingir humanitat.",
      "No escriure a D1 sense Mode Sergi.",
      "No substituir backup verificable per memòria implícita del navegador.",
    ],
  };
}

async function getGenes(db) {
  const result = await db
    .prepare("SELECT id, name, state, description, created_at, updated_at FROM genes ORDER BY id ASC")
    .all();
  return result.results.map(mapGene);
}

async function getGene(db, id) {
  const gene = await db
    .prepare("SELECT id, name, state, description, created_at, updated_at FROM genes WHERE id = ?")
    .bind(String(id).padStart(3, "0"))
    .first();
  return gene ? mapGene(gene) : null;
}

async function upsertGene(request, db) {
  const body = await readJson(request, 64 * 1024);
  const id = normalizeGeneId(body?.id);
  if (!id) throw new HttpError(400, "Cal indicar ID de gen.");

  const now = new Date().toISOString();
  const existing = await getGene(db, id);
  const gene = {
    id,
    name: normalizeToken(body?.name, existing?.name || "gen-editat"),
    state: normalizeGeneState(body?.state, existing?.state || "latent"),
    description: normalizeText(body?.description ?? existing?.description, 1000),
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };
  const auditText = existing
    ? `Gen ${gene.id} ${gene.name} actualitzat: ${describeGeneChanges(existing, gene)}.`
    : `Gen ${gene.id} ${gene.name} creat en estat ${gene.state}.`;

  await db.batch([
    db
      .prepare("INSERT OR REPLACE INTO genes (id, name, state, description, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)")
      .bind(gene.id, gene.name, gene.state, gene.description, gene.createdAt, gene.updatedAt),
    createAuditStatement(db, "genoma", auditText, now),
  ]);

  return gene;
}

async function updateGene(request, db, id) {
  const body = await readJson(request, 64 * 1024);
  const geneId = normalizeGeneId(id);
  const existing = await getGene(db, geneId);
  if (!existing) throw new HttpError(404, "Gen no trobat.");

  const updated = {
    id: existing.id,
    name: body?.name === undefined ? existing.name : normalizeToken(body.name, existing.name),
    state: body?.state === undefined ? existing.state : normalizeGeneState(body.state, existing.state),
    description:
      body?.description === undefined ? existing.description : normalizeText(body.description, 1000),
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString(),
  };
  const auditText = `Gen ${updated.id} ${updated.name} actualitzat: ${describeGeneChanges(existing, updated)}.`;

  await db.batch([
    db
      .prepare("UPDATE genes SET name = ?, state = ?, description = ?, updated_at = ? WHERE id = ?")
      .bind(updated.name, updated.state, updated.description, updated.updatedAt, updated.id),
    createAuditStatement(db, "genoma", auditText, updated.updatedAt),
  ]);

  return updated;
}

async function previewRestore(request, db) {
  const payload = await readJson(request, MAX_JSON_BYTES);
  if (!payload || !Array.isArray(payload.records)) {
    throw new HttpError(400, "El JSON no sembla una còpia d'Aura.");
  }

  const incomingRecords = payload.records.slice(0, 500).filter((record) => normalizeText(record?.text, 4000));
  const incomingDiary = Array.isArray(payload.diary)
    ? payload.diary.slice(0, 200).filter((entry) => normalizeText(entry?.text, 4000))
    : [];
  const incomingGenes = Array.isArray(payload.genes) ? payload.genes.slice(0, 50).filter((gene) => gene?.id) : [];

  const [existingRecords, existingDiary, existingGenes] = await Promise.all([
    getRecords(db, 1000),
    getDiary(db, 500),
    getGenes(db),
  ]);

  const recordIds = new Set(existingRecords.map((record) => record.id));
  const recordTexts = new Set(existingRecords.map((record) => normalizeComparable(record.text)));
  const diaryIds = new Set(existingDiary.map((entry) => entry.id));
  const diaryTexts = new Set(existingDiary.map((entry) => normalizeComparable(entry.text)));
  const genesById = new Map(existingGenes.map((gene) => [gene.id, gene]));

  const records = summarizeIncomingItems(incomingRecords, recordIds, recordTexts);
  const diary = summarizeIncomingItems(incomingDiary, diaryIds, diaryTexts);
  const genes = incomingGenes.reduce(
    (summary, gene) => {
      const id = String(gene.id).padStart(3, "0").slice(0, 12);
      const existing = genesById.get(id);
      if (!existing) {
        summary.new += 1;
        return summary;
      }

      const changed =
        normalizeText(gene.name, 80) !== existing.name ||
        normalizeGeneState(gene.state, existing.state) !== existing.state ||
        normalizeText(gene.description, 1000) !== existing.description;
      if (changed) summary.changed += 1;
      else summary.unchanged += 1;
      return summary;
    },
    { total: incomingGenes.length, new: 0, changed: 0, unchanged: 0 },
  );

  const apply = {
    records: records.newById + records.newByTextFallback,
    diary: diary.newById + diary.newByTextFallback,
    genes: genes.new + genes.changed,
  };

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
    mode: "preview-only",
    records,
    diary,
    genes,
    apply,
    risk: classifyRestoreRisk(records, diary, genes),
    requiresConfirmation: true,
    confirmationCommand: "/confirma-restauracio",
  };
}

function summarizeIncomingItems(items, existingIds, existingTexts) {
  return items.reduce(
    (summary, item) => {
      const id = normalizeId(item?.id, "");
      const text = normalizeComparable(item?.text);
      if (id && existingIds.has(id)) {
        summary.duplicateIds += 1;
      } else if (existingTexts.has(text)) {
        summary.duplicateText += 1;
      } else if (id) {
        summary.newById += 1;
      } else {
        summary.newByTextFallback += 1;
      }
      return summary;
    },
    {
      total: items.length,
      newById: 0,
      newByTextFallback: 0,
      duplicateIds: 0,
      duplicateText: 0,
    },
  );
}

function classifyRestoreRisk(records, diary, genes) {
  const incoming = records.total + diary.total + genes.total;
  const changes = records.newById + records.newByTextFallback + diary.newById + diary.newByTextFallback + genes.new + genes.changed;
  if (!incoming) return "buit";
  if (changes === 0) return "sense-canvis";
  if (changes > 250 || genes.changed > 5) return "alt";
  if (changes > 50 || genes.changed > 0) return "mitja";
  return "baix";
}

function describeGeneChanges(before, after) {
  const changes = [];
  if (!before) return `estat inicial ${after.state}`;
  if (before.name !== after.name) changes.push(`nom ${before.name} -> ${after.name}`);
  if (before.state !== after.state) changes.push(`estat ${before.state} -> ${after.state}`);
  if (before.description !== after.description) changes.push("descripció actualitzada");
  return changes.join(", ") || "sense canvis materials";
}

async function importSnapshot(request, db) {
  const payload = await readJson(request, MAX_JSON_BYTES);
  if (!payload || !Array.isArray(payload.records)) {
    throw new HttpError(400, "El JSON no sembla una còpia d'Aura.");
  }

  const now = new Date().toISOString();
  const statements = [];

  for (const record of payload.records.slice(0, 500)) {
    const text = normalizeText(record?.text, 4000);
    if (!text) continue;
    statements.push(
      db
        .prepare("INSERT OR IGNORE INTO records (id, text, kind, source, created_at) VALUES (?, ?, ?, ?, ?)")
        .bind(
          normalizeId(record?.id, crypto.randomUUID()),
          text,
          normalizeToken(record?.kind, "importat"),
          normalizeToken(record?.source, "import-json"),
          normalizeDate(record?.createdAt || record?.created_at, now),
        ),
    );
  }

  if (Array.isArray(payload.diary)) {
    for (const entry of payload.diary.slice(0, 200)) {
      const text = normalizeText(entry?.text, 4000);
      if (!text) continue;
      statements.push(
        db
          .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
          .bind(
            normalizeId(entry?.id, crypto.randomUUID()),
            text,
            normalizeDate(entry?.createdAt || entry?.created_at, now),
          ),
      );
    }
  }

  if (Array.isArray(payload.genes)) {
    for (const gene of payload.genes.slice(0, 50)) {
      if (!gene?.id) continue;
      statements.push(
        db
          .prepare(
            "INSERT OR REPLACE INTO genes (id, name, state, description, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
          )
          .bind(
            String(gene.id).padStart(3, "0").slice(0, 12),
            normalizeText(gene.name, 80) || "gen-importat",
            normalizeGeneState(gene.state, "latent"),
            normalizeText(gene.description, 1000),
            normalizeDate(gene.createdAt || gene.created_at, now),
            now,
          ),
      );
    }
  }

  statements.push(
    db
      .prepare("INSERT OR REPLACE INTO meta (key, value, updated_at) VALUES (?, ?, ?)")
      .bind("lastImport", now, now),
  );
  const imported = statements.length - 1;
  statements.push(
    createAuditStatement(
      db,
      "restore",
      `Restauració aplicada: ${imported} operacions preparades. Origen ${payload.project || "desconegut"} / ${
        payload.version || "desconeguda"
      }.`,
      now,
    ),
  );

  for (let i = 0; i < statements.length; i += 100) {
    await db.batch(statements.slice(i, i + 100));
  }

  return { ok: true, imported, importedAt: now, audit: true };
}

async function readJson(request, maxBytes) {
  const length = Number(request.headers.get("content-length") || 0);
  if (length > maxBytes) throw new HttpError(413, "El JSON és massa gran.");

  const text = await request.text();
  if (text.length > maxBytes) throw new HttpError(413, "El JSON és massa gran.");
  if (!text.trim()) return {};

  try {
    return JSON.parse(text);
  } catch {
    throw new HttpError(400, "JSON invalid.");
  }
}

function getSegments(path) {
  if (!path) return [];
  return Array.isArray(path) ? path : String(path).split("/");
}

function readCount(result) {
  return Number(result.results?.[0]?.total || 0);
}

function mapRecord(row) {
  return {
    id: row.id,
    text: row.text,
    kind: row.kind,
    source: row.source,
    createdAt: row.created_at,
  };
}

function mapDiary(row) {
  return {
    id: row.id,
    text: row.text,
    createdAt: row.created_at,
  };
}

function mapAuditEntry(row) {
  const raw = String(row.text || "");
  const match = raw.match(/^\[audit:([^\]]+)\]\s*(.*)$/);
  return {
    id: row.id,
    scope: match?.[1] || "unknown",
    text: match?.[2] || raw,
    raw,
    createdAt: row.created_at,
  };
}

function mapGene(row) {
  return {
    id: row.id,
    name: row.name,
    state: row.state,
    description: row.description,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function normalizeText(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

function summarizeSignal(value) {
  const text = normalizeText(value, 180);
  if (text.length < 180) return text;
  return `${text.slice(0, 177)}...`;
}

function ageHours(value) {
  if (!value) return null;
  const time = new Date(value).getTime();
  if (Number.isNaN(time)) return null;
  return (Date.now() - time) / 36e5;
}

function roundAge(value) {
  return value === null ? null : Math.round(value * 10) / 10;
}

function createAuditStatement(db, scope, text, createdAt = new Date().toISOString()) {
  const normalizedScope = normalizeToken(scope, "sistema");
  const id = `audit-${normalizedScope}-${createdAt.replaceAll(/[:.]/g, "-")}-${crypto.randomUUID().slice(0, 8)}`;
  return db
    .prepare("INSERT INTO diary (id, text, created_at) VALUES (?, ?, ?)")
    .bind(id, `[audit:${normalizedScope}] ${normalizeText(text, 3500)}`, createdAt);
}

function normalizeComparable(value) {
  return String(value || "").trim().replaceAll(/\s+/g, " ").toLowerCase();
}

function normalizeToken(value, fallback) {
  const token = String(value || fallback)
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9_-]/g, "-")
    .slice(0, 40);
  return token || fallback;
}

function normalizeId(value, fallback) {
  const id = String(value || "")
    .trim()
    .replaceAll(/[^a-zA-Z0-9_:.@-]/g, "-")
    .slice(0, 120);
  return id || fallback;
}

function normalizeGeneId(value) {
  const id = normalizeId(value, "");
  return id ? id.padStart(3, "0").slice(0, 12) : "";
}

function normalizeGeneState(value, fallback) {
  const state = normalizeToken(value, fallback);
  return GENE_STATES.includes(state) ? state : fallback;
}

function normalizeLimit(value, fallback) {
  const limit = Number.parseInt(value || "", 10);
  if (!Number.isFinite(limit)) return fallback;
  return Math.min(Math.max(limit, 1), 100);
}

function escapeLike(value) {
  return String(value).replaceAll("\\", "\\\\").replaceAll("%", "\\%").replaceAll("_", "\\_");
}

function normalizeVaultId(value) {
  const id = normalizeId(value, "");
  if (!id.startsWith("backup-")) {
    throw new HttpError(400, "Identificador de backup no vàlid.");
  }
  return id;
}

function normalizeDate(value, fallback) {
  const date = new Date(value || fallback);
  return Number.isNaN(date.getTime()) ? fallback : date.toISOString();
}

async function sha256Hex(text) {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
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
