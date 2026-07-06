#!/usr/bin/env node
// Coordinador Fase 11 — Pas 2
// Patró coordinador → agent → memòria.
// Llegeix els fitxers d'agents del dia, n'extreu mecànicament el titular i les
// prioritats/resum, i desa un únic record consolidat a la memòria de l'Aura (D1)
// amb Mode Sergi. Additiu, idempotent i només lectura cap enfora.
//
// Ús:
//   node coordinador/coordinador.mjs                 # dry-run (mostra, no escriu)
//   node coordinador/coordinador.mjs --date 2026-07-06
//   node coordinador/coordinador.mjs --write         # escriu a D1 amb Mode Sergi
//   node coordinador/coordinador.mjs --write --force # reescriu encara que ja existeixi

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const API_BASE = "https://projecte-aura.pages.dev";
const WRITE_KEY_PATH = join(REPO, ".aura-write-key");

// Agents que el coordinador consolida. Afegir-ne un és afegir una entrada aquí.
const AGENTS = [
  { nom: "Comunicacions", carpeta: "briefings" },
  { nom: "Escriptor", carpeta: "escriptor" },
];

const MAX_HIGHLIGHT = 700; // caràcters per agent
const RECORD_TAG = "coordinador-diari"; // marca d'idempotència

function parseArgs(argv) {
  const args = { write: false, force: false, date: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--write") args.write = true;
    else if (a === "--force") args.force = true;
    else if (a === "--date") args.date = argv[++i];
  }
  return args;
}

function todayISODate() {
  // Data local en format AAAA-MM-DD.
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function readableDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  const mesos = [
    "gener", "febrer", "març", "abril", "maig", "juny",
    "juliol", "agost", "setembre", "octubre", "novembre", "desembre",
  ];
  return `${d} de ${mesos[m - 1]} de ${y}`;
}

// Extracció mecànica: titular (H1) + primera secció de prioritats/resum/estat,
// o, si no n'hi ha, el primer paràgraf real (saltant la línia de metadades en _cursiva_).
function extractHighlights(markdown) {
  const lines = markdown.split(/\r?\n/);
  let title = "";
  const sectionKeywords = /(priorit|resum|estat|novetat)/i;

  for (const line of lines) {
    const h1 = line.match(/^#\s+(.*)$/);
    if (h1) {
      title = h1[1].trim();
      break;
    }
  }

  // Busca una secció "## ..." amb paraula clau i en recull les línies fins la següent secció.
  let sectionLines = [];
  for (let i = 0; i < lines.length; i++) {
    const h2 = lines[i].match(/^##\s+(.*)$/);
    if (h2 && sectionKeywords.test(h2[1])) {
      for (let j = i + 1; j < lines.length; j++) {
        if (/^##\s+/.test(lines[j])) break;
        if (lines[j].trim()) sectionLines.push(lines[j].trim());
      }
      break;
    }
  }

  // Fallback: primer paràgraf real (no títol, no metadades en _cursiva_, no buit).
  if (sectionLines.length === 0) {
    for (const line of lines) {
      const t = line.trim();
      if (!t) continue;
      if (/^#/.test(t)) continue;
      if (/^_.*_$/.test(t)) continue;
      sectionLines.push(t);
      break;
    }
  }

  let highlight = sectionLines.join(" ").replace(/\s+/g, " ").trim();
  // Neteja marques markdown lleugeres per fer el record més llegible.
  highlight = highlight.replace(/\*\*/g, "").replace(/`/g, "");
  if (highlight.length > MAX_HIGHLIGHT) {
    highlight = highlight.slice(0, MAX_HIGHLIGHT - 1).trimEnd() + "…";
  }
  return { title, highlight };
}

async function loadAgentFiles(date) {
  const found = [];
  for (const agent of AGENTS) {
    const rel = `${agent.carpeta}/${date}.md`;
    try {
      const md = await readFile(join(REPO, rel), "utf8");
      found.push({ agent, rel, ...extractHighlights(md) });
    } catch {
      // Agent sense fitxer avui: se salta (no és un error).
    }
  }
  return found;
}

function buildRecord(date, agentFiles) {
  const parts = [`Coordinació Fase 11 — ${readableDate(date)}.`, ""];
  for (const f of agentFiles) {
    const cap = f.title ? `${f.agent.nom}: ${f.title}.` : `${f.agent.nom}:`;
    parts.push(`${cap} ${f.highlight}`.trim());
  }
  parts.push("");
  const fonts = agentFiles.map((f) => f.rel).join(", ");
  parts.push(`Consolidació mecànica de fitxers d'agents locals (procedència: ${fonts}). Només lectura cap enfora.`);

  return {
    text: parts.join("\n"),
    kind: "coordinador",
    source: "coordinador-fase-11",
    tags: ["fase-11", "coordinador", RECORD_TAG, date],
    weight: 2,
    state: "actiu",
  };
}

async function alreadyExists(date) {
  const res = await fetch(`${API_BASE}/api/memory`);
  if (!res.ok) throw new Error(`GET /api/memory ha fallat: ${res.status}`);
  const data = await res.json();
  const records = data.records || [];
  return records.some(
    (r) =>
      r.source === "coordinador-fase-11" &&
      Array.isArray(r.tags) &&
      r.tags.includes(date),
  );
}

async function writeRecord(record) {
  let key;
  try {
    key = (await readFile(WRITE_KEY_PATH, "utf8")).trim();
  } catch {
    throw new Error(`No s'ha pogut llegir la clau Mode Sergi a ${WRITE_KEY_PATH}`);
  }
  const res = await fetch(`${API_BASE}/api/memory`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Aura-Write-Key": key,
    },
    body: JSON.stringify(record),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`POST /api/memory ha fallat: ${res.status} ${body?.error || ""}`);
  }
  return body.record;
}

async function integrityScore() {
  try {
    const res = await fetch(`${API_BASE}/api/integrity`);
    const data = await res.json();
    return data.score ?? "?";
  } catch {
    return "?";
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const date = args.date || todayISODate();

  console.log(`\n== Coordinador Fase 11 — ${date} ==\n`);

  const agentFiles = await loadAgentFiles(date);
  if (agentFiles.length === 0) {
    console.log(`Cap fitxer d'agent trobat per al ${date}. Res a consolidar.`);
    return;
  }

  console.log(`Agents amb fitxer avui: ${agentFiles.map((f) => f.agent.nom).join(", ")}\n`);

  const record = buildRecord(date, agentFiles);
  console.log("--- Record que es desaria ---");
  console.log(record.text);
  console.log(`\ntags: ${record.tags.join(", ")} · kind: ${record.kind} · source: ${record.source} · weight: ${record.weight}`);
  console.log("-----------------------------\n");

  const exists = await alreadyExists(date);
  if (exists && !args.force) {
    console.log(`Ja existeix el record coordinador del ${date}. No es duplica (usa --force per reescriure).`);
    return;
  }

  if (!args.write) {
    console.log("Mode dry-run: no s'ha escrit res. Afegeix --write per desar-ho a la memòria de l'Aura.");
    return;
  }

  console.log("Escrivint a la memòria de l'Aura (D1) amb Mode Sergi…");
  const saved = await writeRecord(record);
  console.log(`✔ Record desat. id: ${saved.id}`);
  console.log(`  createdAt: ${saved.createdAt}`);
  const score = await integrityScore();
  console.log(`  integritat actual: ${score}/100`);
}

main().catch((err) => {
  console.error(`\n✖ Error: ${err.message}`);
  process.exit(1);
});
