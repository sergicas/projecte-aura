# AURA PHASE 11 — MULTIAGENT

Contracte canònic de la Fase 11 del Protocol Mestre: coordinació multiagent.

## Estat

```yaml
versio_produccio: cloud-v5.2
fase: 11-multiagent
mode_inici: documentat (preparació, no desplegat en producció)
document_canonic: AURA_PHASE11_MULTIAGENT.md
disseny_base: AURA_COORDINATION_ARCHITECTURE.md
format: aura-multiagent-v1
gen_proposat: 39088169 coordinacio-multiagent
estat_gen: proposta (no desplegat, no verificat)
obertura: per instrucció explícita de Sergi
data: 2026-07-04
```

> Nota d'honestedat: la Fase 11 s'obre **per instrucció explícita de Sergi**, tal com exigeix `AURA_ORIENTATION.md`. S'inicia en **mode documentat**: fixa el contracte, l'estructura d'agents i els límits. **No** activa agents autònoms en producció, **no** modifica `aura_core.js` ni D1, i el gen `39088169` és una **proposta**. La seva promoció real requereix Mode Sergi, auditoria i actualització d'`AURA_GENOME.md`.

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
- **Agent Comerç (botiga)** — *exclòs.* La botiga Shopify la gestiona una altra persona; queda fora de la Fase 11.

## Contracte de coordinació

- El coordinador reparteix la feina per domini i consolida els resultats a la memòria d'Aura.
- Cada agent és **additiu**: no esborra ni modifica dades existents.
- Cap a serveis externs, els agents comencen en **només lectura**; qualsevol escriptura externa és un pas posterior explícit.
- Tota escriptura persistent a Aura requereix **Mode Sergi**.
- El registre durador per defecte és el **repositori** (fitxers com `briefings/`), perquè Aura es pugui reconstruir sense dependre de la xarxa ni d'un xat.

## Primer agent viu

L'**Agent Comunicacions** ja funciona: la tasca `briefing-diari-aura` s'executa cada matí, recull correu + agenda + senyals del negoci, en fa un resum i el desa a `briefings/AAAA-MM-DD.md`. Verificat amb `briefings/2026-07-04.md`. És la primera peça real de la Fase 11 i estableix el patró coordinador → agent → memòria.

## Límits (heretats del projecte)

- Cap acció destructiva ni a Aura ni als serveis externs.
- Cap ingestió automàtica de correu, corpus o catàleg sense fase documentada i procedència.
- Qualsevol experiment amb agents autònoms va en **sandbox separat de producció** (`AURA_ALIFE_AVIDA_TIERRA.md`).
- Aura coordina, cataloga, conserva i mostra; no sent, no entén ni viu en sentit subjectiu.

## Pròxims passos

La fase creix **un agent cada vegada**, no tot de cop:

1. Afinar l'**Agent Escriptor**: fixar les URL de Goodreads dels llibres de Sergi a `escriptor/goodreads.txt` i, si es vol, activar campanyes de gifting reals amb vistiplau.
2. Definir el **pont de l'Agent Obra i Veu** amb l'avatar Sergi com a font catalogada.
3. Quan diversos agents siguin estables i verificats, valorar la promoció del gen `39088169` amb Mode Sergi i auditoria.

## Verificació de l'obertura

- Document canònic `AURA_PHASE11_MULTIAGENT.md` creat.
- `AURA_CHANGELOG.md` i `AURA_HISTORY.md` registren l'obertura de la fase.
- Cap canvi a producció: `aura_core.js`, D1, Worker i integritat resten intactes en `cloud-v5.2`.
- Gen `39088169 coordinacio-multiagent`: proposta, no desplegat.
- Agent Comunicacions operatiu i verificat (`briefings/2026-07-04.md`).
