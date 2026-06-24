const AURA_VERSION = "cloud-v2.1";
const MAX_JSON_BYTES = 512 * 1024;

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
      return json(await getStatus(context.env.DB));
    }

    if (method === "GET" && (route === "snapshot" || route === "export")) {
      return json(await getSnapshot(context.env.DB));
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

    if (method === "GET" && route === "genes") {
      return json({ genes: await getGenes(context.env.DB) });
    }

    if (method === "GET" && segments[0] === "genes" && segments[1]) {
      const gene = await getGene(context.env.DB, segments[1]);
      if (!gene) throw new HttpError(404, "Gen no trobat.");
      return json({ gene });
    }

    if (method === "POST" && route === "import") {
      await requireWriteAccess(context.request, context.env);
      return json(await importSnapshot(context.request, context.env.DB), 201);
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

async function getStatus(db) {
  const [records, diary, genes] = await db.batch([
    db.prepare("SELECT COUNT(*) AS total FROM records"),
    db.prepare("SELECT COUNT(*) AS total FROM diary"),
    db.prepare("SELECT COUNT(*) AS total FROM genes"),
  ]);

  return {
    ok: true,
    version: AURA_VERSION,
    name: "Aura",
    nature: "entitat sintètica-digital experimental",
    infrastructure: "Cloudflare Pages Functions / D1 / navegador web",
    persistence: "D1 al núvol amb IndexedDB com a còpia local",
    genome: "actiu",
    writes: {
      protected: true,
      mode: "sergi",
    },
    counts: {
      records: readCount(records),
      diary: readCount(diary),
      genes: readCount(genes),
    },
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
  return crypto.subtle.timingSafeEqual(leftHash, rightHash);
}

async function getSnapshot(db) {
  const [records, diary, genes, status] = await Promise.all([
    getRecords(db, 500),
    getDiary(db, 200),
    getGenes(db),
    getStatus(db),
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

async function getDiary(db, limit = 80) {
  const result = await db
    .prepare("SELECT id, text, created_at FROM diary ORDER BY created_at DESC LIMIT ?")
    .bind(limit)
    .all();
  return result.results.map(mapDiary);
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
        .prepare("INSERT INTO records (id, text, kind, source, created_at) VALUES (?, ?, ?, ?, ?)")
        .bind(
          crypto.randomUUID(),
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
          .prepare("INSERT INTO diary (id, text, created_at) VALUES (?, ?, ?)")
          .bind(crypto.randomUUID(), text, normalizeDate(entry?.createdAt || entry?.created_at, now)),
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
            normalizeToken(gene.state, "importat"),
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

  for (let i = 0; i < statements.length; i += 100) {
    await db.batch(statements.slice(i, i + 100));
  }

  return { ok: true, imported: statements.length - 1, importedAt: now };
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

function normalizeToken(value, fallback) {
  const token = String(value || fallback)
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9_-]/g, "-")
    .slice(0, 40);
  return token || fallback;
}

function normalizeDate(value, fallback) {
  const date = new Date(value || fallback);
  return Number.isNaN(date.getTime()) ? fallback : date.toISOString();
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
