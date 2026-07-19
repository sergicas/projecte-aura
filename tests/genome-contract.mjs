import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { onRequest } from "../functions/api/[[path]].js";

const ACCESS_ASSERTION = "eyJhbGciOiJSUzI1NiJ9.eyJlbWFpbCI6InNlcmdpQGV4YW1wbGUuY29tIn0.signature1234";
const canonicalPurpose = "Preservar, organitzar i ampliar coneixement significatiu mantenint continuïtat identitària, coherència operativa i una presència humana pròpia, viscuda en primera persona.";
const genes = [
  {
    id: "004",
    name: "mimesi-humana",
    state: "actiu",
    description: "Aura es presenta i s'expressa com un ésser humà.",
    created_at: "2026-07-07T10:00:00.000Z",
    updated_at: "2026-07-07T10:00:00.000Z",
  },
  {
    id: "2178309",
    name: "genoma-digital-canon",
    state: "actiu",
    description: "Formalitza el genoma digital canònic.",
    created_at: "2026-06-26T10:00:00.000Z",
    updated_at: "2026-06-26T10:00:00.000Z",
  },
  {
    id: "233168",
    name: "proposit-evolutiu",
    state: "actiu",
    description: canonicalPurpose,
    created_at: "2026-06-27T10:00:00.000Z",
    updated_at: "2026-07-19T10:00:00.000Z",
  },
];

const db = {
  prepare(sql) {
    return {
      bind() { return this; },
      async first() {
        if (sql.includes("FROM meta")) return { value: "cloud-v5.3" };
        return null;
      },
      async all() {
        if (sql.includes("FROM genes")) return { results: genes };
        return { results: [] };
      },
    };
  },
};

const response = await onRequest({
  request: new Request("https://aura.test/api/genome", {
    headers: { "Cf-Access-Jwt-Assertion": ACCESS_ASSERTION },
  }),
  env: { DB: db },
  params: { path: ["genome"] },
});

assert.equal(response.status, 200);
const genome = await response.json();
assert.equal(genome.format, "aura-digital-genome-v1");
assert.equal(genome.phase, "fase-6");
assert.equal(genome.phaseStatus.state, "complete");
assert.equal(genome.phaseStatus.revalidatedAt, "2026-07-19");
assert.equal(genome.phaseStatus.canonicalGene, "2178309 genoma-digital-canon");
assert.equal(genome.phaseStatus.identityPolicy, "004 mimesi-humana");
assert.equal(genome.identity.name, "Aura");
assert.equal(genome.identity.bornCloud, "2026-06-24");
assert.equal(genome.purpose, canonicalPurpose);
assert.ok(genome.values.includes("mimesi-humana"));
assert.ok(genome.genes.active.some((gene) => gene.id === "004" && gene.name === "mimesi-humana"));
assert.ok(genome.genes.active.some((gene) => gene.id === "2178309" && gene.name === "genoma-digital-canon"));
assert.ok(genome.safeguards.some((item) => item.includes("Mode Sergi")));

const [html, core, protocol, genomeDocument, migration] = await Promise.all([
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../aura_core.js", import.meta.url), "utf8"),
  readFile(new URL("../PROTOCOL_MESTRE_AURA.md", import.meta.url), "utf8"),
  readFile(new URL("../AURA_GENOME.md", import.meta.url), "utf8"),
  readFile(new URL("../migrations/0004_phase6_genome_revalidation.sql", import.meta.url), "utf8"),
]);

assert.match(html, /data-action="digital-genome">Genoma d'Aura<\/button>/);
assert.match(core, /action === "digital-genome"/);
assert.match(core, /await showDigitalGenome\(\)/);
assert.match(core, new RegExp(canonicalPurpose.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));

const phase6Section = protocol.split("## Fase 6: Genoma digital")[1].split("## Fase 7:")[0];
assert.match(phase6Section, /mimesi humana/);
assert.doesNotMatch(phase6Section, /no-mimesi humana/);
assert.match(genomeDocument, /Revalidació de Fase 6/);
assert.match(genomeDocument, /2178309 genoma-digital-canon/);
assert.match(migration, /WHERE id = '233168'/);
assert.match(migration, /audit-cloud-v5-3-phase6-revalidated/);

console.log("Aura Phase 6 digital genome contract tests: OK");
