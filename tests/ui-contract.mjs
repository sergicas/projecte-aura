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
assert.match(html, />La llavor d'Aura<\/button>/, "El botó ha d'explicar què obrirà.");
assert.match(
  core,
  /No és una llavor biològica ni implica consciència/,
  "La resposta ha d'explicar la metàfora en llenguatge planer.",
);
assert.doesNotMatch(html, /aura_face|aura-face|Rostre d'Aura/, "La interfície no ha de carregar la fotografia.");
assert.doesNotMatch(styles, /aura-face|aura-mark--face/, "Els estils de la fotografia s'han d'eliminar.");
assert.doesNotMatch(packageJson, /aura_face\.jpg/, "El desplegament no ha d'incloure la fotografia.");
assert.match(html, /<span class="aura-mark-core">A<\/span>/, "Aura ha de conservar una marca abstracta sense fotografia.");
assert.match(html, /class="app-header"/, "La fase 3 ha de tenir una capçalera compacta.");
assert.match(html, /class="phase3-layout"/, "La fase 3 ha de separar accions i resultats.");
assert.match(html, /class="action-panel"/, "Les accions han d'estar agrupades abans de la conversa.");
assert.match(html, /class="console-head"/, "La conversa ha de tenir un títol visible.");
assert.match(html, /<button type="submit">Envia<\/button>/, "El camp d'ordres ha de tenir una acció d'enviament explícita.");
assert.doesNotMatch(html, /class="identity-band"/, "La capçalera antiga no ha de continuar ocupant la primera pantalla.");
assert.match(styles, /@media \(max-width: 620px\)/, "La interfície ha de tenir una composició mòbil específica.");
assert.match(styles, /prefers-reduced-motion: reduce/, "La interfície ha de respectar el moviment reduït.");
assert.match(html, /durant 30 dies/, "La pantalla d'accés ha d'explicar la durada de la sessió.");
assert.match(core, /Confirma la sortida/, "Tancar la sessió ha de requerir confirmació.");
assert.doesNotMatch(core, /window\.prompt\(/, "La interfície no ha de dependre de finestres prompt no compatibles.");
assert.match(html, /id="record-form"/, "Gravar un record ha de tenir un formulari integrat.");
assert.match(html, />Desa el record<\/button>/, "El formulari de record ha de tenir una acció explícita.");
assert.match(core, /openRecordComposer\(\)/, "El botó de gravar ha d'obrir el formulari integrat.");

await assert.rejects(
  access(new URL("../aura_face.jpg", import.meta.url)),
  (error) => error?.code === "ENOENT",
  "El fitxer de la fotografia no ha de continuar al repositori.",
);

console.log("Aura UI contract tests: OK");
