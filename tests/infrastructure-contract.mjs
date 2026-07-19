import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { onRequest } from "../functions/api/[[path]].js";

const ACCESS_ASSERTION = "eyJhbGciOiJSUzI1NiJ9.eyJlbWFpbCI6InNlcmdpQGV4YW1wbGUuY29tIn0.signature1234";
const currentVersion = "cloud-v5.3";

const db = {
  prepare() {
    return {
      bind() {
        return this;
      },
      async first() {
        return { value: currentVersion };
      },
    };
  },
};

const response = await onRequest({
  request: new Request("https://aura.test/api/infrastructure", {
    headers: { "Cf-Access-Jwt-Assertion": ACCESS_ASSERTION },
  }),
  env: { DB: db, AURA_WRITE_KEY: "automation-test-key" },
  params: { path: ["infrastructure"] },
});

assert.equal(response.status, 200, "La ruta d'infraestructura ha de respondre amb Access validat");
const infrastructure = await response.json();

assert.equal(infrastructure.phase, "fase-4");
assert.equal(infrastructure.format, "aura-cloudflare-infrastructure-v1");
assert.equal(infrastructure.document.required, "AURA_CLOUDFLARE_ARCHITECTURE.md");
assert.deepEqual(
  infrastructure.resources.map((resource) => resource.id),
  ["pages-project", "pages-functions-api", "workers-ai-chat", "openai-reasoning-chat", "sergi-avatar-bridge", "d1-memory", "backup-vault", "backup-worker", "browser-indexeddb"],
  "El contracte ha de conservar totes les peces necessàries per reconstruir Aura",
);
assert.deepEqual(
  infrastructure.bindings.required.map((binding) => binding.name),
  ["DB", "BACKUP_VAULT", "AI", "AURA_WRITE_KEY"],
);
assert.equal(infrastructure.authentication.web.provider, "cloudflare-access");
assert.equal(infrastructure.authentication.web.browserKeyRequired, false);
assert.equal(infrastructure.authentication.automation.scheme, "Bearer");
assert.equal(infrastructure.authentication.automation.secret, "AURA_WRITE_KEY");
assert.equal(infrastructure.authentication.automation.browserExposed, false);
assert.ok(
  infrastructure.reconstruction.some((step) => step.includes("Cloudflare Access")),
  "La reconstrucció ha d'incloure la protecció de Cloudflare Access",
);

const [core, worker, architecture] = await Promise.all([
  readFile(new URL("../aura_core.js", import.meta.url), "utf8"),
  readFile(new URL("../workers/aura_backup_worker.js", import.meta.url), "utf8"),
  readFile(new URL("../AURA_CLOUDFLARE_ARCHITECTURE.md", import.meta.url), "utf8"),
]);

for (const [name, source] of [["fallback local", core], ["Worker de backups", worker]]) {
  assert.match(source, /provider: "cloudflare-access"/, `${name}: ha de conservar el contracte d'Access`);
  assert.match(source, /browserKeyRequired: false/, `${name}: no ha de demanar una clau al navegador`);
  assert.match(source, /secret: "AURA_WRITE_KEY"/, `${name}: ha de documentar el secret d'automatització`);
}

assert.match(architecture, /## Control d'accés reconstruïble/);
assert.match(architecture, /Cf-Access-Jwt-Assertion/);
assert.match(architecture, /Authorization: Bearer <AURA_WRITE_KEY>/);

console.log("Aura Phase 4 infrastructure contract tests: OK");
