import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const core = await readFile(new URL("../aura_core.js", import.meta.url), "utf8");
const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

assert.match(
  core,
  /apiGet\(["']\/genome\/synthetic["']\)/,
  "El botó de la llavor ha de passar una ruta relativa a apiGet().",
);
assert.doesNotMatch(
  core,
  /api(?:Get|Post)\(["']\/api\//,
  "apiGet() i apiPost() ja afegeixen el prefix /api; no s'ha de duplicar.",
);
assert.match(core, /function buildApiUrl\(path\)/, "Les crides API han de validar el prefix intern.");
assert.match(html, />Què és la llavor\?<\/button>/, "El botó ha d'explicar què obrirà.");
assert.match(
  core,
  /No és una llavor biològica ni implica consciència/,
  "La resposta ha d'explicar la metàfora en llenguatge planer.",
);

console.log("Aura UI contract tests: OK");
