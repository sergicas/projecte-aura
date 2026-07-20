import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { onRequest } from "../functions/api/[[path]].js";

const ACCESS_ASSERTION = "eyJhbGciOiJSUzI1NiJ9.eyJlbWFpbCI6InNlcmdpQGV4YW1wbGUuY29tIn0.signature1234";
const records = [
  {
    id: "phase10-record",
    text: "Aura relaciona dades verificables sense afirmar consciència.",
    kind: "auditoria",
    source: "test",
    created_at: "2026-07-20T10:00:00.000Z",
    tags: '["fase-10","autoreflexio"]',
    weight: 5,
    state: "actiu",
    related_ids: '["9227465"]',
  },
];
const diary = [
  {
    id: "audit-cloud-v5-3-phase10-revalidated",
    text: "[audit:autoreflexio] Fase 10 revalidada a cloud-v5.3.",
    created_at: "2026-07-20T10:05:00.000Z",
  },
];
const genes = [
  {
    id: "9227465",
    name: "autoreflexio-operativa",
    state: "actiu",
    description: "Calcula una síntesi operativa de només lectura.",
    created_at: "2026-06-27T10:00:00.000Z",
    updated_at: "2026-07-20T10:00:00.000Z",
  },
];
const knowledge = [
  {
    id: "knowledge-self-reflection",
    title: "Contracte d'autoreflexió",
    kind: "document",
    locator: "AURA_SELF_REFLECTION.md",
    summary: "Defineix fonts, sortida i límits de l'autoreflexió operativa.",
    tags: '["fase-10","autoreflexio"]',
    status: "revisat",
    source: "repositori",
    created_at: "2026-06-27T10:00:00.000Z",
    updated_at: "2026-07-20T10:00:00.000Z",
  },
];

const db = {
  prepare(sql) {
    return {
      sql,
      bind() { return this; },
      async first() {
        if (sql.includes("FROM meta")) return { value: "cloud-v5.3" };
        return null;
      },
      async all() {
        if (sql.includes("FROM records")) return { results: records };
        if (sql.includes("FROM diary")) return { results: diary };
        if (sql.includes("FROM genes")) return { results: genes };
        if (sql.includes("FROM knowledge_items")) return { results: knowledge };
        return { results: [] };
      },
    };
  },
  async batch(statements) {
    return statements.map((statement) => {
      const sql = statement.sql || "";
      if (sql.includes("records")) return { results: [{ total: records.length }] };
      if (sql.includes("diary")) return { results: [{ total: diary.length }] };
      if (sql.includes("genes")) return { results: [{ total: genes.length }] };
      if (sql.includes("knowledge_items")) return { results: [{ total: knowledge.length }] };
      return { results: [{ total: 0 }] };
    });
  },
};

const response = await onRequest({
  request: new Request("https://aura.test/api/self-reflection", {
    headers: { "Cf-Access-Jwt-Assertion": ACCESS_ASSERTION },
  }),
  env: { DB: db },
  params: { path: ["self-reflection"] },
});

assert.equal(response.status, 200);
const body = await response.json();
assert.equal(body.format, "aura-self-reflection-v1");
assert.equal(body.phase, "fase-10");
assert.equal(body.phaseStatus.state, "complete");
assert.equal(body.phaseStatus.revalidatedAt, "2026-07-20");
assert.equal(body.phaseStatus.gene, "9227465 autoreflexio-operativa");
assert.equal(body.gene.id, "9227465");
assert.equal(body.gene.state, "actiu");
assert.equal(body.answers.length, 5);
assert.equal(body.insights.length, 4);
assert.equal(body.mutation.autoApply, false);
assert.equal(body.mutation.persistentWrite, false);
assert.equal(body.summary.mutationApplied, false);
assert.ok(body.boundaries.some((item) => item.includes("no consciència")));

const [html, core, protocol, reflectionDocument, genome, worker, migration] = await Promise.all([
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../aura_core.js", import.meta.url), "utf8"),
  readFile(new URL("../PROTOCOL_MESTRE_AURA.md", import.meta.url), "utf8"),
  readFile(new URL("../AURA_SELF_REFLECTION.md", import.meta.url), "utf8"),
  readFile(new URL("../AURA_GENOME.md", import.meta.url), "utf8"),
  readFile(new URL("../workers/aura_backup_worker.js", import.meta.url), "utf8"),
  readFile(new URL("../migrations/0008_phase10_self_reflection_revalidation.sql", import.meta.url), "utf8"),
]);

assert.match(html, /data-action="self-reflection">Autoreflexió d'Aura<\/button>/);
assert.match(core, /Fase 10 · Autoreflexió d'Aura/);
assert.match(core, /action === "self-reflection"[\s\S]*?await showSelfReflection\(\);/);
assert.match(core, /Què detecta Aura:/);
assert.match(core, /Senyals verificables:/);
assert.match(core, /Això és una síntesi calculada, no consciència ni introspecció subjectiva/);
assert.match(protocol, /Revalidació `cloud-v5\.3` \(2026-07-20\): la Fase 10 continua completa/);
assert.match(reflectionDocument, /## Revalidació cloud-v5\.3/);
assert.match(genome, /Revalidació de Fase 10/);
assert.match(worker, /phaseStatus: PHASE_10_STATUS/);
assert.match(migration, /audit-cloud-v5-3-phase10-revalidated/);
assert.match(migration, /phase10-revalidation-2026-07-20/);

console.log("Aura Phase 10 self-reflection contract tests: OK");
