import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const core = await readFile(new URL("../aura_core.js", import.meta.url), "utf8");
const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const styles = await readFile(new URL("../aura_style.css", import.meta.url), "utf8");
const packageJson = await readFile(new URL("../package.json", import.meta.url), "utf8");
const api = await readFile(new URL("../functions/api/[[path]].js", import.meta.url), "utf8");
const backupWorker = await readFile(new URL("../workers/aura_backup_worker.js", import.meta.url), "utf8");

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
assert.match(html, /aura_logo\.jpg/, "La capçalera ha de mostrar el logo oficial d'Aura.");
assert.match(html, /class="app-header"/, "La fase 3 ha de tenir una capçalera compacta.");
assert.match(html, /class="phase3-layout"/, "La fase 3 ha de separar accions i resultats.");
assert.match(html, /class="action-panel"/, "Les accions immediates han d'estar agrupades al costat de la conversa.");
assert.match(html, /class="console-head"/, "La conversa ha de tenir un títol visible.");
assert.match(html, /class="support-grid"/, "Les consultes secundàries han d'estar agrupades per funció.");
assert.match(html, /class="identity-grid"/, "La identitat visual i el cos digital han de compartir un últim nivell.");
const conversationIndex = html.indexOf('class="console-panel"');
const immediateActionsIndex = html.indexOf('class="action-panel"');
const supportIndex = html.indexOf('class="support-section"');
const identityIndex = html.indexOf('class="identity-section"');
assert.ok(
  conversationIndex < immediateActionsIndex && immediateActionsIndex < supportIndex && supportIndex < identityIndex,
  "L'ordre de lectura ha de ser conversa, accions immediates, consulta i identitat/estat.",
);
assert.match(html, /<button type="submit">Envia<\/button>/, "El camp de conversa ha de tenir una acció d'enviament explícita.");
assert.match(html, /Pregunta a Aura/, "La Fase 5 ha de presentar el camp com una conversa natural.");
assert.match(html, /class="prompt-suggestions"/, "La Fase 5 ha d'oferir preguntes suggerides.");
assert.match(html, /Llama \+ GPT · només lectura/, "La interfície ha d'explicar l'encaminament híbrid i el límit d'escriptura.");
assert.match(html, /aura_identity\.jpg/, "La interfície ha de mostrar la identitat visual d'Aura.");
assert.match(core, /async function askAura\(question\)/, "El text lliure s'ha d'enviar al backend conversacional.");
assert.match(core, /async function askSergiAvatar\(question\)/, "La connexió explícita amb Sergi Avatar ha de ser operativa.");
assert.doesNotMatch(html, /class="identity-band"/, "La capçalera antiga no ha de continuar ocupant la primera pantalla.");
assert.match(styles, /@media \(max-width: 620px\)/, "La interfície ha de tenir una composició mòbil específica.");
assert.match(styles, /\.support-grid/, "La interfície ha de definir la graella de consulta secundària.");
assert.match(styles, /\.identity-grid/, "La interfície ha de definir la graella d'identitat i estat.");
for (const source of [core, api, backupWorker]) {
  assert.match(
    source,
    /readingOrder: \["conversation", "immediate-actions", "consult-and-explore", "identity-and-status"\]/,
    "El client, l'API i el backup han de conservar el mateix ordre lògic.",
  );
}
assert.match(styles, /prefers-reduced-motion: reduce/, "La interfície ha de respectar el moviment reduït.");
assert.doesNotMatch(html, /auth-gate|auth-input|type="password"/, "Aura no ha de mostrar una segona pantalla de clau.");
assert.doesNotMatch(html, /Clau de Mode Sergi|Desbloqueja Aura/, "La interfície no ha de demanar cap codi intern.");
assert.match(html, /Protegit per Cloudflare Access/, "La capçalera ha d'explicar quina protecció continua activa.");
assert.doesNotMatch(core, /loginAuraSession|showAuthGate/, "El client no ha de conservar el flux antic de desbloqueig.");
assert.doesNotMatch(core, /window\.prompt\(/, "La interfície no ha de dependre de finestres prompt no compatibles.");
assert.match(html, /id="record-form"/, "Gravar un record ha de tenir un formulari integrat.");
assert.match(html, /<dialog id="record-dialog"/, "El formulari ha d'aparèixer en una finestra visible sobre la interfície.");
assert.match(html, />Desa el record<\/button>/, "El formulari de record ha de tenir una acció explícita.");
assert.match(core, /openRecordComposer\(\)/, "El botó de gravar ha d'obrir el formulari integrat.");
assert.match(core, /recordDialog\.showModal\(\)/, "El formulari s'ha de mostrar immediatament com a diàleg modal.");
assert.doesNotMatch(
  core,
  /record\.id\?\.startsWith/,
  "El fallback local ha de normalitzar els IDs antics numèrics abans d'usar startsWith().",
);

await assert.rejects(
  access(new URL("../aura_face.jpg", import.meta.url)),
  (error) => error?.code === "ENOENT",
  "El fitxer de la fotografia no ha de continuar al repositori.",
);

await access(new URL("../aura_identity.jpg", import.meta.url));
await access(new URL("../aura_logo.jpg", import.meta.url));

console.log("Aura UI contract tests: OK");
