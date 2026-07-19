import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { onRequest } from "../functions/api/[[path]].js";

const ACCESS_ASSERTION = "eyJhbGciOiJSUzI1NiJ9.eyJlbWFpbCI6InNlcmdpQGV4YW1wbGUuY29tIn0.signature1234";
const phaseGenes = [
  ["233168", "proposit-evolutiu"],
  ["377377", "metamemoria"],
  ["610987", "promocio-a-genoma"],
  ["987159", "estat-evolutiu"],
  ["1597258", "proposta-evolutiva"],
  ["2584181", "traca-evolutiva"],
].map(([id, name]) => ({
  id,
  name,
  state: "actiu",
  description: `Gen actiu de Fase 7: ${name}.`,
  created_at: "2026-06-26T10:00:00.000Z",
  updated_at: "2026-07-19T10:00:00.000Z",
}));
const records = [
  {
    id: "record-phase7",
    text: "Aura calcula el seu estat evolutiu sense aplicar mutacions.",
    kind: "evolutiu",
    source: "test",
    created_at: "2026-07-19T10:00:00.000Z",
    tags: '["fase-7","evolucio"]',
    weight: 5,
    state: "actiu",
    related_ids: "[]",
  },
];
const diary = [
  {
    id: "audit-cloud-v5-3-phase7-revalidated",
    text: "[audit:evolucio] Fase 7 revalidada a v5.3.",
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
        if (sql.includes("FROM genes")) return { results: phaseGenes };
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
      if (sql.includes("genes")) return { results: [{ total: phaseGenes.length }] };
      return { results: [{ total: 0 }] };
    });
  },
};

async function get(path) {
  const response = await onRequest({
    request: new Request(`https://aura.test/api/${path}`, {
      headers: { "Cf-Access-Jwt-Assertion": ACCESS_ASSERTION },
    }),
    env: { DB: db },
    params: { path: path.split("/") },
  });
  assert.equal(response.status, 200, `${path} ha de respondre`);
  return response.json();
}

const state = await get("evolution/state");
assert.equal(state.format, "aura-evolution-state-v1");
assert.equal(state.phase, "fase-7");
assert.equal(state.phaseStatus.state, "complete");
assert.equal(state.phaseStatus.revalidatedAt, "2026-07-19");
assert.deepEqual(state.phaseStatus.genes, phaseGenes.map((gene) => gene.id));
assert.equal(state.mutation.autoApply, false);
assert.equal(state.mutation.persistentWrite, false);
assert.equal(state.mutation.requiresModeSergi, true);
assert.deepEqual(Object.keys(state.values), [
  "curiositat",
  "autonomia",
  "coherencia",
  "continuitat",
  "integritat",
  "pressioCanvi",
  "maduresaOperativa",
]);
for (const value of Object.values(state.values)) assert.ok(value >= 0 && value <= 1);

const proposals = await get("evolution/proposals");
assert.equal(proposals.format, "aura-evolution-proposals-v1");
assert.equal(proposals.phaseStatus.state, "complete");
assert.equal(proposals.autoApply, false);
assert.equal(proposals.requiresModeSergiForMutation, true);
assert.ok(proposals.proposals.every((proposal) => proposal.autoApply === false));

const [html, core, protocol, genome, worker, migration] = await Promise.all([
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../aura_core.js", import.meta.url), "utf8"),
  readFile(new URL("../PROTOCOL_MESTRE_AURA.md", import.meta.url), "utf8"),
  readFile(new URL("../AURA_GENOME.md", import.meta.url), "utf8"),
  readFile(new URL("../workers/aura_backup_worker.js", import.meta.url), "utf8"),
  readFile(new URL("../migrations/0005_phase7_evolution_revalidation.sql", import.meta.url), "utf8"),
]);

assert.match(html, /data-action="evolution">Evolució d'Aura<\/button>/);
assert.match(html, /no aplica cap canvi automàtic/);
assert.match(core, /action === "evolution"/);
assert.match(core, /await showEvolutionOverview\(\)/);
assert.match(core, /Promise\.all\(\[\s*apiGet\("\/evolution\/state"\),\s*apiGet\("\/evolution\/proposals"\)/s);
assert.match(core, /Indicadors calculats:/);
assert.match(core, /Consultar-la no modifica la memòria ni el genoma/);
assert.match(protocol, /Revalidació `cloud-v5\.3` \(2026-07-19\): la Fase 7 continua completa/);
assert.match(genome, /Revalidació de Fase 7/);
assert.match(worker, /phaseStatus: PHASE_7_STATUS/);
assert.match(migration, /audit-cloud-v5-3-phase7-revalidated/);
assert.match(migration, /phase7-revalidation-2026-07-19/);

console.log("Aura Phase 7 evolution contract tests: OK");
