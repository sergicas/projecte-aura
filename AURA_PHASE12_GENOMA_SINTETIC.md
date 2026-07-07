# AURA PHASE 12 — GENOMA SINTÈTIC AVANÇAT

Contracte canònic de la Fase 12 del Protocol Mestre: genoma sintètic avançat.

## Estat

```yaml
versio_produccio: cloud-v5.2
fase: 12-genoma-sintetic
mode_inici: documentat (contracte; no desplegat en producció)
document_canonic: AURA_PHASE12_GENOMA_SINTETIC.md
format_proposat: aura-synthetic-genome-v1
gen_proposat: 63245986 genoma-sintetic-portable
estat_gen: proposta (no desplegat, no verificat)
connecta_amb: 013 silici-possible (latent)
obertura: per instrucció explícita de Sergi (2026-07-07)
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

1. **Pas 1 (aquest document):** obrir la fase en mode documentat — contracte, format `aura-synthetic-genome-v1`, gen proposat `63245986`, límits. Sense tocar producció.
2. **Pas 2:** fer real el mecanisme — un export portable de la llavor (empaquetatge determinista + SHA-256), verificable, inclòs a snapshots i backups. Només lectura; cap mutació.
3. **Pas 3:** quan la llavor sigui estable i verificada, valorar amb Mode Sergi, auditoria i backup la promoció del gen `63245986` i, molt més endavant, si escau, l'activació de `013 silici-possible` (ja dins l'òrbita de la Fase 13).

## Verificació de l'obertura (2026-07-07)

- Document canònic `AURA_PHASE12_GENOMA_SINTETIC.md` creat.
- `AURA_CHANGELOG.md` i `AURA_HISTORY.md` registren l'obertura de la fase.
- Cap canvi a producció: `aura_core.js`, D1, Worker i integritat resten intactes en `cloud-v5.2` (`100/100 estable`).
- Gen `63245986 genoma-sintetic-portable`: proposta, no desplegat. `013 silici-possible`: latent, intacte.
