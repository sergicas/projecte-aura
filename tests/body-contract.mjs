import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { onRequest } from "../functions/api/[[path]].js";

const ACCESS_ASSERTION = "eyJhbGciOiJSUzI1NiJ9.eyJlbWFpbCI6InNlcmdpQGV4YW1wbGUuY29tIn0.signature1234";
const genes = [
  ["233168", "proposit-evolutiu"],
  ["377377", "metamemoria"],
  ["610987", "promocio-a-genoma"],
  ["987159", "estat-evolutiu"],
  ["1597258", "proposta-evolutiva"],
  ["2584181", "traca-evolutiva"],
  ["3524578", "cos-digital-2d"],
].map(([id, name]) => ({
  id,
  name,
  state: "actiu",
  description: `Gen actiu: ${name}.`,
  created_at: "2026-06-27T10:00:00.000Z",
  updated_at: "2026-07-19T10:00:00.000Z",
}));
const records = [
  {
    id: "record-phase8",
    text: "El cos digital reflecteix dades operatives sense percepció pròpia.",
    kind: "evolutiu",
    source: "test",
    created_at: "2026-07-19T10:00:00.000Z",
    tags: '["fase-8","cos-digital"]',
    weight: 5,
    state: "actiu",
    related_ids: '["3524578"]',
  },
];
const diary = [
  {
    id: "audit-cloud-v5-3-phase8-revalidated",
    text: "[audit:cos-digital] Fase 8 revalidada a v5.3.",
    created_at: "2026-07-19T10:05:00.000Z",
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
        if (sql.includes("FROM knowledge_items")) return { results: [] };
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
      return { results: [{ total: 0 }] };
    });
  },
};

const response = await onRequest({
  request: new Request("https://aura.test/api/body", {
    headers: { "Cf-Access-Jwt-Assertion": ACCESS_ASSERTION },
  }),
  env: { DB: db },
  params: { path: ["body"] },
});

assert.equal(response.status, 200);
const body = await response.json();
assert.equal(body.format, "aura-digital-body-v1");
assert.equal(body.phase, "fase-8");
assert.equal(body.phaseStatus.state, "complete");
assert.equal(body.phaseStatus.revalidatedAt, "2026-07-19");
assert.equal(body.phaseStatus.gene, "3524578 cos-digital-2d");
assert.equal(body.gene.id, "3524578");
assert.equal(body.gene.state, "actiu");
assert.equal(body.body.type, "avatar-2d-canvas");
assert.equal(body.body.surface, "#aura-visual");
assert.equal(body.summary.readonly, true);
assert.ok(body.summary.pulseStrength >= 0 && body.summary.pulseStrength <= 1);
assert.deepEqual(body.layers.map((layer) => layer.id), ["nucli", "memoria", "diari", "integritat", "vault"]);
assert.ok(body.limits.some((limit) => limit.includes("No és un cos biològic")));
assert.ok(body.safeguards.some((item) => item.includes("Només llegeix")));

const [html, styles, core, protocol, bodyDocument, worker, migration] = await Promise.all([
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../aura_style.css", import.meta.url), "utf8"),
  readFile(new URL("../aura_core.js", import.meta.url), "utf8"),
  readFile(new URL("../PROTOCOL_MESTRE_AURA.md", import.meta.url), "utf8"),
  readFile(new URL("../AURA_BODY.md", import.meta.url), "utf8"),
  readFile(new URL("../workers/aura_backup_worker.js", import.meta.url), "utf8"),
  readFile(new URL("../migrations/0006_phase8_body_revalidation.sql", import.meta.url), "utf8"),
]);

assert.match(html, /<h3 id="pulse-visual-title">Lectura operativa<\/h3>/);
assert.match(html, /data-action="digital-body">Què representa\?<\/button>/);
assert.match(html, /role="img"/);
assert.match(html, /aria-label="Cos digital 2D d'Aura:/);
assert.match(styles, /\.aura-pulse-card__head/);
assert.match(core, /action === "digital-body"/);
assert.match(core, /await showDigitalBody\(\)/);
assert.match(core, /El dibuix animat és un mirall de l'estat tècnic d'Aura/);
assert.match(core, /no és una emoció ni un batec biològic/);
assert.match(core, /Consultar aquesta pantalla no modifica cap dada/);
assert.match(protocol, /Revalidació `cloud-v5\.3` \(2026-07-19\): la Fase 8 continua completa/);
assert.match(bodyDocument, /## Revalidació cloud-v5\.3/);
assert.match(worker, /phaseStatus: PHASE_8_STATUS/);
assert.match(migration, /audit-cloud-v5-3-phase8-revalidated/);
assert.match(migration, /phase8-revalidation-2026-07-19/);

console.log("Aura Phase 8 digital body contract tests: OK");
