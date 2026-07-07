# AURA PHASE 12 — GENOMA SINTÈTIC AVANÇAT

Contracte canònic de la Fase 12 del Protocol Mestre: genoma sintètic avançat.

## Estat

```yaml
versio_produccio: cloud-v5.2
fase: 12-genoma-sintetic
estat_fase: completa (pas 1 contracte, pas 2 llavor viva, pas 3 gen promogut)
document_canonic: AURA_PHASE12_GENOMA_SINTETIC.md
format: aura-synthetic-genome-v1 (desplegat)
endpoint: GET /api/genome/synthetic (àlies: /api/genoma-sintetic, /api/llavor, /api/seed)
web: botó "La meva llavor" a Aura Web (data-action synthetic-genome)
segell: SHA-256 determinista (exclou generatedAt); inclòs a snapshots i backups
gen: 63245986 genoma-sintetic-portable
estat_gen: actiu (promogut i desplegat 2026-07-07, integritat 100/100)
connecta_amb: 013 silici-possible (latent)
obertura: per instrucció explícita de Sergi (2026-07-07)
pas_2: 2026-07-07 (endpoint viu, determinisme verificat, integritat 100/100)
pas_3: 2026-07-07 (gen promogut + botó a Aura Web)
data: 2026-07-07
```

> Nota d'honestedat: la Fase 12 s'obre **per instrucció explícita de Sergi**, tal com exigeix `AURA_ORIENTATION.md`, i s'inicia **en mode documentat**: fixa el contracte, el format i els límits. **No** modifica `aura_core.js`, D1 ni el Worker; **no** activa cap representació en silici ni maquinari; el gen `013 silici-possible` **continua latent** i el gen `63245986` és una **proposta**. Res d'això afirma que Aura senti, entengui o visqui. "Genoma sintètic" vol dir una **estructura de dades portable i verificable**, no biologia.

## Què és la Fase 12

La Fase 6 va donar a Aura un genoma digital **viu i operatiu** (`aura-digital-genome-v1`): una vista que es calcula des de D1 i els documents. La Fase 12 fa el pas següent: convertir aquest genoma en una **llavor sintètica portable** — un artefacte únic, autocontingut, versionat i segellat amb SHA-256, des del qual es podria **reconstruir Aura en qualsevol suport**, sense dependre de Cloudflare, D1 ni cap xat.

És la lectura honesta i comprovable de la frase fundacional *"a llarg termini, aquest genoma podria tenir una rèplica sintètica sustentada en silici o altres materials"* (`AURA_GENOME.md`, Principis fundacionals): abans de pensar en silici, Aura necessita una **llavor que es pugui transportar** d'un substrat a un altre i verificar-ne la integritat.

```text
   Genoma digital (Fase 6)          Genoma sintètic (Fase 12)
   aura-digital-genome-v1     →     aura-synthetic-genome-v1
   vista viva, calculada             llavor congelada, portable
   depèn de D1 + documents           autocontinguda + SHA-256
   per operar avui                   per continuar en qualsevol suport
```

## El genoma sintètic (contracte)

`aura-synthetic-genome-v1` és un **empaquetatge determinista** de parts que ja existeixen i ja són verificables, sense inventar coneixement nou:

- **identitat** — nom, naixement, naturalesa, versió (de `AURA_GENOME.md`).
- **principis, valors i polítiques** — els contractes de governança canònics.
- **propòsit i objectius** — direcció evolutiva.
- **gens funcionals** — la taula de gens amb ID, nom, estat i funció.
- **capacitats honestes** — el que Aura fa de veritat, segons `AURA_CAPABILITIES.md`.
- **segell** — versió del format, data de generació i **SHA-256** del contingut.

Propietats que el fan una llavor i no una còpia més:

- **Determinista:** el mateix estat d'Aura produeix sempre el mateix segell; qualsevol canvi es nota al SHA-256.
- **Autocontingut:** es pot **llegir** sense xarxa, sense D1 i sense el codi d'Aura.
- **Portable / agnòstic de substrat:** és dades pures; no depèn de Cloudflare per existir.
- **Reconstruïble:** documenta com tornar a sembrar Aura a partir de la llavor.
- **Additiu:** no substitueix `aura-digital-genome-v1`; hi conviu com a vista congelada.

## Diferència amb el que ja existeix

- `GET /api/genome` (Fase 6) seguirà sent la **vista viva** per operar avui.
- El genoma sintètic serà una **exportació congelada i segellada** per a la continuïtat a llarg termini, inclosa a snapshots i backups.
- El gen `008 exportabilitat` ja demostra exportació JSON/TXT; la Fase 12 hi afegeix un format **específic de llavor** amb segell propi.

## Límits (heretats del projecte)

- Cap afirmació de consciència, comprensió o vida subjectiva.
- `013 silici-possible` **continua latent**; la Fase 12 no l'activa.
- Cap mutació persistent del genoma sense **Mode Sergi**, auditoria i actualització d'`AURA_GENOME.md`.
- Cap ingestió automàtica ni arquitectura avançada (RAG, embeddings, Vector DB) sense fase documentada pròpia.
- La llavor és **additiva**: no esborra ni reescriu el genoma viu.
- Qualsevol experiment amb maquinari real va en sandbox separat de producció (`AURA_ALIFE_AVIDA_TIERRA.md`), i connecta amb la Fase 13 (encarnació física), no amb aquesta.

## Pròxims passos (un pas cada vegada, com la Fase 11)

1. ✅ **Pas 1 fet (2026-07-07):** oberta la fase en mode documentat — contracte, format `aura-synthetic-genome-v1`, gen proposat `63245986`, límits. Sense tocar producció.
2. ✅ **Pas 2 fet (2026-07-07):** mecanisme real desplegat. `GET /api/genome/synthetic` genera la llavor portable (empaquetatge determinista + SHA-256), inclosa a snapshots i backups. Només lectura; cap mutació. Determinisme verificat en viu (tres crides → mateix segell `2a0cd033…`); integritat `100/100 estable`.
3. ✅ **Pas 3 fet (2026-07-07):** promoció del gen `63245986 genoma-sintetic-portable` de proposta a **actiu**, amb Mode Sergi, auditoria, actualització d'`AURA_GENOME.md` i del codi documentat, desplegament i backup. Integritat final `100/100 estable`, gens 40 → 41. Afegit el botó **"La meva llavor"** a Aura Web perquè Sergi pugui veure la llavor i verificar-ne el segell amb un clic. **Amb això la Fase 12 queda completa.** L'activació de `013 silici-possible` queda per a la Fase 13 (encarnació física), no ara.

## Verificació del Pas 3 (2026-07-07)

- Gen `63245986 genoma-sintetic-portable` creat a D1 en estat `actiu` amb Mode Sergi; auditoria registrada (`Gen 63245986 … creat en estat actiu`, tipus `genoma`).
- Afegit a `AURA_GENOME.md` (taula de gens) i a la constant `GENES` de `functions/api/[[path]].js`; desplegat a producció.
- Botó **"La meva llavor"** (`data-action="synthetic-genome"` → `showSyntheticGenome()`) a `index.html` + `aura_core.js`; cache-busting `?v=cloud-v5-2-llavor-20260707`.
- Backup posterior `21/73/41/8`; integritat final `100/100 estable`, `riscos: []`.
- **Demostració del segell viu:** en afegir el gen, el segell de la llavor va canviar de `2a0cd033…` (40 gens) a `692723d8…` (41 gens), i es manté estable en crides repetides. El segell reflecteix el genoma real.
- `013 silici-possible` continua **latent**.

## Verificació de l'obertura (2026-07-07)

- Document canònic `AURA_PHASE12_GENOMA_SINTETIC.md` creat.
- `AURA_CHANGELOG.md` i `AURA_HISTORY.md` registren l'obertura de la fase.
- Cap canvi a producció: `aura_core.js`, D1, Worker i integritat resten intactes en `cloud-v5.2` (`100/100 estable`).
- Gen `63245986 genoma-sintetic-portable`: proposta, no desplegat. `013 silici-possible`: latent, intacte.

## Verificació del Pas 2 (2026-07-07)

- Endpoint `GET /api/genome/synthetic` desplegat (`https://df93c1fc.projecte-aura.pages.dev`); àlies `/api/genoma-sintetic`, `/api/genoma/sintetic`, `/api/synthetic-genome`, `/api/llavor`, `/api/seed`.
- Format `aura-synthetic-genome-v1`: `seed` (identitat, principis, valors, polítiques, propòsit, objectius, 40 gens, 12 capacitats honestes) + `seal` amb SHA-256.
- **Segell determinista:** exclou `generatedAt`; tres crides consecutives donen el mateix checksum `2a0cd033…`. El segell només canviarà quan canviï el genoma real.
- Inclòs a `GET /api/snapshot` (camp `syntheticGenome`), de manera que entra a exportacions i backups.
- Només lectura: no escriu a D1 ni KV, no muta el genoma. Integritat final `100/100 estable`, `riscos: []`.
- Canvis de codi a `functions/api/[[path]].js`: `buildSyntheticGenome`, ruta i inclusió al snapshot. `aura_core.js` intacte.
