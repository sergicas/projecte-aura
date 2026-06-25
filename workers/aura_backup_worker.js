const AURA_VERSION = "cloud-v3.2";
const BACKUP_FORMAT = "aura-backup-v3.2";
const VAULT_PREFIX = "aura/backups/";
const AUTOMATION_META_KEY = "aura/automation/backup-worker";
const DEFAULT_CRON = "17 3 * * *";

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

async function createSnapshot(db) {
  const [records, diary, genes] = await Promise.all([getRecords(db, 500), getDiary(db, 200), getGenes(db)]);

  return {
    project: "Projecte Aura",
    version: AURA_VERSION,
    exportedAt: new Date().toISOString(),
    status: {
      counts: {
        records: records.length,
        diary: diary.length,
        genes: genes.length,
      },
    },
    records,
    diary,
    genes,
  };
}

async function getRecords(db, limit) {
  const result = await db
    .prepare("SELECT id, text, kind, source, created_at FROM records ORDER BY created_at DESC LIMIT ?")
    .bind(limit)
    .all();
  return result.results.map((row) => ({
    id: row.id,
    text: row.text,
    kind: row.kind,
    source: row.source,
    createdAt: row.created_at,
  }));
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
