import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const core = await readFile(new URL("../aura_core.js", import.meta.url), "utf8");
const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const styles = await readFile(new URL("../aura_style.css", import.meta.url), "utf8");
const packageJson = await readFile(new URL("../package.json", import.meta.url), "utf8");

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
assert.doesNotMatch(html, /aura_face|aura-face|Rostre d'Aura/, "La interfície no ha de carregar la fotografia.");
assert.doesNotMatch(styles, /aura-face|aura-mark--face/, "Els estils de la fotografia s'han d'eliminar.");
assert.doesNotMatch(packageJson, /aura_face\.jpg/, "El desplegament no ha d'incloure la fotografia.");
assert.match(html, /<span class="aura-mark-core">A<\/span>/, "Aura ha de conservar una marca abstracta sense fotografia.");

await assert.rejects(
  access(new URL("../aura_face.jpg", import.meta.url)),
  (error) => error?.code === "ENOENT",
  "El fitxer de la fotografia no ha de continuar al repositori.",
);

console.log("Aura UI contract tests: OK");
