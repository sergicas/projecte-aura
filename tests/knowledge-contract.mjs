import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { onRequest } from "../functions/api/[[path]].js";

const ACCESS_ASSERTION = "eyJhbGciOiJSUzI1NiJ9.eyJlbWFpbCI6InNlcmdpQGV4YW1wbGUuY29tIn0.signature1234";
const knowledge = [
  {
    id: "knowledge-protocol-master",
    title: "Protocol Mestre Aura",
    kind: "protocol",
    locator: "PROTOCOL_MESTRE_AURA.md",
    summary: "Defineix fases, regla d'or i límits del projecte.",
    tags: '["protocol","governanca"]',
    status: "revisat",
    source: "repositori",
    created_at: "2026-06-27T10:00:00.000Z",
    updated_at: "2026-07-20T10:00:00.000Z",
  },
  {
    id: "knowledge-notes-pending",
    title: "Notes de recerca pendents",
    kind: "nota",
    locator: "notes/recerca.md",
    summary: "Material catalogat que encara s'ha de revisar.",
    tags: '["recerca"]',
    status: "pendent",
    source: "repositori",
    created_at: "2026-07-20T10:00:00.000Z",
    updated_at: "2026-07-20T10:00:00.000Z",
  },
];

const db = {
  prepare(sql) {
    return {
      sql,
      bind() { return this; },
      async first() { return null; },
      async all() {
        if (sql.includes("FROM knowledge_items")) return { results: knowledge };
        return { results: [] };
      },
    };
  },
  async batch(statements) {
    return statements.map(() => ({ results: [{ total: 0 }] }));
  },
};

const response = await onRequest({
  request: new Request("https://aura.test/api/knowledge", {
    headers: { "Cf-Access-Jwt-Assertion": ACCESS_ASSERTION },
  }),
  env: { DB: db },
  params: { path: ["knowledge"] },
});

assert.equal(response.status, 200);
const body = await response.json();
assert.equal(body.format, "aura-knowledge-library-v1");
assert.equal(body.phase, "fase-9");
assert.equal(body.phaseStatus.state, "complete");
assert.equal(body.phaseStatus.revalidatedAt, "2026-07-20");
assert.equal(body.phaseStatus.gene, "5702887 biblioteca-coneixement");
assert.equal(body.summary.totalItems, 2);
assert.equal(body.summary.byStatus.revisat, 1);
assert.equal(body.summary.byStatus.pendent, 1);
assert.equal(body.indexing.rag, false);
assert.equal(body.indexing.automaticIngestion, false);
assert.ok(body.boundaries.some((item) => item.includes("no vol dir que Aura l'hagi llegida")));

const [html, styles, core, protocol, knowledgeDocument, worker, migration] = await Promise.all([
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../aura_style.css", import.meta.url), "utf8"),
  readFile(new URL("../aura_core.js", import.meta.url), "utf8"),
  readFile(new URL("../PROTOCOL_MESTRE_AURA.md", import.meta.url), "utf8"),
  readFile(new URL("../AURA_KNOWLEDGE.md", import.meta.url), "utf8"),
  readFile(new URL("../workers/aura_backup_worker.js", import.meta.url), "utf8"),
  readFile(new URL("../migrations/0007_phase9_knowledge_revalidation.sql", import.meta.url), "utf8"),
]);

assert.match(html, /<h3 id="knowledge-actions-title">Coneixement<\/h3>/);
assert.match(html, /data-action="knowledge">Coneixement d'Aura<\/button>/);
assert.match(styles, /\.action-group--wide/);
assert.match(core, /\["knowledge", "coneixement", "biblioteca", "knowledge-library"\]\.includes\(action\)/);
assert.match(core, /Fase 9 · Coneixement d'Aura/);
assert.match(core, /Què vol dir cada estat:/);
assert.match(core, /Consultar la biblioteca és de només lectura/);
assert.match(protocol, /Revalidació `cloud-v5\.3` \(2026-07-20\): la Fase 9 continua completa/);
assert.match(knowledgeDocument, /## Revalidació cloud-v5\.3/);
assert.match(worker, /phaseStatus: PHASE_9_STATUS/);
assert.match(worker, /"39088169"/);
assert.match(worker, /"63245986"/);
assert.match(migration, /audit-cloud-v5-3-phase9-revalidated/);
assert.match(migration, /phase9-revalidation-2026-07-20/);

console.log("Aura Phase 9 knowledge contract tests: OK");
