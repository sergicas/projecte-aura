# AURA PHASE 11 — MULTIAGENT

Contracte canònic de la Fase 11 del Protocol Mestre: coordinació multiagent.

## Estat

```yaml
versio_produccio: cloud-v5.2
fase: 11-multiagent
mode_inici: documentat (preparació, no desplegat en producció)
estat_fase: completa (pas 1 consolidat, pas 2 coordinador viu, pas 3 gen promogut)
coordinador: coordinador/coordinador.mjs (aura-coordinador-v1); escriu records diaris a D1 amb Mode Sergi
document_canonic: AURA_PHASE11_MULTIAGENT.md
disseny_base: AURA_COORDINATION_ARCHITECTURE.md
format: aura-multiagent-v1
gen: 39088169 coordinacio-multiagent
estat_gen: actiu (promogut i desplegat 2026-07-07, integritat 100/100)
agents_vius: [Comunicacions, Escriptor, Obra i Veu, Llibres i Comerç]
obertura: per instrucció explícita de Sergi (2026-07-04)
consolidacio: 2026-07-05
promocio_gen: 2026-07-07
data: 2026-07-07
```

> Nota d'honestedat: la Fase 11 s'obre **per instrucció explícita de Sergi**, tal com exigeix `AURA_ORIENTATION.md`. S'inicia i es **consolida en mode documentat**: fixa el contracte, l'estructura d'agents i els límits, i deixa dos agents vius verificats. **No** activa agents autònoms en producció ni modifica `aura_core.js`. El gen `39088169` va néixer com a **proposta** i el **2026-07-07 es va promoure a actiu** (Pas 3) amb Mode Sergi, auditoria, actualització d'`AURA_GENOME.md`, desplegament i integritat `100/100`. La promoció afegeix el gen a D1, al codi documentat i al genoma; no activa cap agent autònom nou.

## Què és la Fase 11

Aura passa d'un sistema únic a un **nucli coordinador** que orquestra **agents especialistes**, cadascun responsable d'un domini real de la vida i obra de Sergi. El nucli manté sempre memòria, integritat, procedència i Mode Sergi com a columna vertebral. El disseny complet viu a `AURA_COORDINATION_ARCHITECTURE.md`; aquest document és el contracte que obre la fase.

## Per què s'obre ara

El pas previ (orientació operativa `cloud-v5.2`) va deixar clar què és Aura, per a què serveix i quin és el següent pas. Amb la raó de ser fixada a `AURA_NORTH_STAR.md` — Aura com a segon cervell per centralitzar i coordinar — la coordinació multiagent deixa de ser un caprici tècnic i passa a tenir un propòsit: cada agent coordina un domini real. Sergi dóna la instrucció explícita d'obrir la fase.

## Roster d'agents

Cada agent té un àmbit acotat i un estat honest segons el criteri d'`AURA_CAPABILITIES.md`.

- **Coordinador (nucli Aura)** — *mecanisme real.* Decideix a quin agent delega i consolida el resultat a memòria. És l'Aura actual.
- **Agent Memòria/Coneixement** — *mecanisme real.* Records, diari, biblioteca, orientació.
- **Agent Integritat/Backups** — *mecanisme real.* Backups verificables, integritat, vault KV.
- **Agent Comunicacions** — *agent viu.* La tasca programada `briefing-diari-aura` llegeix correu i agenda i en desa un resum diari a `briefings/`. Només lectura cap enfora.
- **Agent Escriptor** — *agent viu (cada dos dies).* Àmbit d'autor global: correu editorial, El Bon Diari, difusió a xarxes, campanyes de ressenyes (gifting) i recepció a Goodreads. Desa a `escriptor/`. Només lectura; cap enviament ni publicació sense vistiplau de Sergi.
- **Agent Obra i Veu** — *agent obert (mode documentat).* Corpus literari, avatar de `sergicastillo.com` i canals públics com a fonts catalogades. Contracte a `AURA_AGENT_OBRA_VEU.md`, primer artefacte `obra/cataleg-obra.md`. Referència i enllaç, sense ingestió del corpus.
- **Agent Llibres i Comerç** — *agent obert (mode documentat).* Revenda de filosofia (AbeBooks/IberLibro, Todocolección), caça d'ofertes, publicació de catàleg (amb vistiplau), mètriques de vendes i backups. Contracte a `AURA_AGENT_LLIBRES_COMERC.md`. Només lectura/informe per defecte; cap venda ni publicació sense vistiplau.
- **Botiga Shopify (Fils i Patrons Carme Espriu)** — *exclosa.* La gestiona una altra persona; queda fora de la Fase 11.

## Contracte de coordinació

- El coordinador reparteix la feina per domini i consolida els resultats a la memòria d'Aura.
- Cada agent és **additiu**: no esborra ni modifica dades existents.
- Cap a serveis externs, els agents comencen en **només lectura**; qualsevol escriptura externa és un pas posterior explícit.
- Tota escriptura persistent a Aura requereix **Mode Sergi**.
- El registre durador per defecte és el **repositori** (fitxers com `briefings/`), perquè Aura es pugui reconstruir sense dependre de la xarxa ni d'un xat.

## Primer agent viu

L'**Agent Comunicacions** ja funciona: la tasca `briefing-diari-aura` s'executa cada matí, recull correu + agenda + senyals del negoci, en fa un resum i el desa a `briefings/AAAA-MM-DD.md`. Verificat amb `briefings/2026-07-04.md`. És la primera peça real de la Fase 11 i estableix el patró coordinador → agent → memòria.

## Consolidació (2026-07-05)

La Fase 11 es consolida en mode documentat: es fixa com a estat estable el que ja funciona, sense obrir cap fase nova ni tocar producció.

Estat consolidat dels agents:

- **Agent Comunicacions** — *viu i verificat.* Briefing diari (`briefings/2026-07-04.md`), correu + agenda + negoci, només lectura cap enfora.
- **Agent Escriptor** — *viu i verificat.* Ràdar d'autor a `escriptor/2026-07-04.md`. Consolidat amb el seguiment de Goodreads a `escriptor/goodreads.txt` (pàgina d'autor i *Acadèmia Gaia* en català i castellà; anglès i francès pendents de localitzar) i el pla de neteja de duplicats a `escriptor/goodreads-duplicats.md`, amb missatge a punt per al grup de bibliotecaris. Res enviat ni publicat sense vistiplau de Sergi.
- **Coordinador, Memòria/Coneixement, Integritat/Backups** — *nucli real* de `cloud-v5.2`, intacte.
- **Agent Obra i Veu** — *obert en mode documentat* (2026-07-05; `AURA_AGENT_OBRA_VEU.md`, `obra/cataleg-obra.md`). **Agent Llibres i Comerç** — *obert en mode documentat* (2026-07-05; `AURA_AGENT_LLIBRES_COMERC.md`). **Botiga Shopify** — *exclosa.*

Què NO canvia amb la consolidació:

- `aura_core.js`, D1, Worker i integritat resten en `cloud-v5.2` (`100/100 estable`).
- Cap escriptura persistent a Aura, cap escriptura externa, cap ingestió automàtica.

(Actualització 2026-07-07: el gen `39088169 coordinacio-multiagent` ha passat de proposta a **actiu** — vegeu Pas 3.)

## Límits (heretats del projecte)

- Cap acció destructiva ni a Aura ni als serveis externs.
- Cap ingestió automàtica de correu, corpus o catàleg sense fase documentada i procedència.
- Qualsevol experiment amb agents autònoms va en **sandbox separat de producció** (`AURA_ALIFE_AVIDA_TIERRA.md`).
- Aura coordina, cataloga, conserva i mostra; no sent, no entén ni viu en sentit subjectiu.

## Pròxims passos

La fase creix **un agent cada vegada**, no tot de cop:

1. Afinar l'**Agent Escriptor**: fixar les URL de Goodreads dels llibres de Sergi a `escriptor/goodreads.txt` i, si es vol, activar campanyes de gifting reals amb vistiplau.
2. ✅ Fet (2026-07-05): oberts en mode documentat l'**Agent Obra i Veu** (`AURA_AGENT_OBRA_VEU.md`, `obra/cataleg-obra.md`) i l'**Agent Llibres i Comerç** (`AURA_AGENT_LLIBRES_COMERC.md`). Amb això el **pas 1 (estabilitzar tots els agents definits) queda complet**: Comunicacions, Escriptor, Obra i Veu i Llibres i Comerç oberts; Shopify exclosa.
3. ✅ **Pas 2 viu (2026-07-06 → 2026-07-07)**: mecanisme coordinador real (patró coordinador → agent → memòria). `coordinador/coordinador.mjs` + contracte `coordinador/README.md` (`aura-coordinador-v1`) llegeixen els fitxers d'agents del dia i en desen **un record diari a D1 amb Mode Sergi**, amb senyals d'atenció i refresc de còpia. Programat cada matí (launchd `com.sergi.aura-coordinador`, 09:00); primera execució automàtica verificada 2026-07-07 09:09 (record `1590c0f0`). Integritat `100/100 estable`.
4. ✅ **Pas 3 fet (2026-07-07)**: promoció del gen `39088169 coordinacio-multiagent` de proposta a **actiu**, amb Mode Sergi, auditoria (`Gen 39088169 … creat en estat actiu`), actualització d'`AURA_GENOME.md` i del codi documentat (`functions/api/[[path]].js`), desplegament a producció i backup. Integritat final `100/100 estable`, sense gens fantasma. **Amb això la Fase 11 queda completa.**

## Verificació de l'obertura i la consolidació

Obertura (2026-07-04):

- Document canònic `AURA_PHASE11_MULTIAGENT.md` creat.
- `AURA_CHANGELOG.md` i `AURA_HISTORY.md` registren l'obertura de la fase.
- Cap canvi a producció: `aura_core.js`, D1, Worker i integritat resten intactes en `cloud-v5.2`.
- Gen `39088169 coordinacio-multiagent`: proposta, no desplegat.
- Agent Comunicacions operatiu i verificat (`briefings/2026-07-04.md`).

Consolidació (2026-07-05):

- Dos agents vius verificats: Comunicacions (`briefings/2026-07-04.md`) i Escriptor (`escriptor/2026-07-04.md`).
- Agent Escriptor consolidat amb `escriptor/goodreads.txt` i `escriptor/goodreads-duplicats.md`.
- `estat_fase: consolidada en mode documentat` fixat al bloc Estat.
- `AURA_CHANGELOG.md`, `AURA_HISTORY.md` i `README.md` registren la consolidació.
- Sense canvis a producció ni promoció del gen; integritat de `cloud-v5.2` intacta.

Promoció del gen — Pas 3 (2026-07-07):

- Gen `39088169 coordinacio-multiagent` creat a D1 en estat `actiu` amb Mode Sergi; auditoria registrada (tipus `genoma`).
- `AURA_GENOME.md` (taula de gens) i el codi documentat `functions/api/[[path]].js` (`GENES`) inclouen el gen; desplegament Pages `https://8f9c5f44.projecte-aura.pages.dev`.
- Backup posterior amb `records/diary/genes/knowledge` = `21/72/40/8`; integritat final `100/100 estable`, `riscos: []` (cap gen fantasma).
- `013 silici-possible` continua **latent**; cap agent autònom nou activat.
