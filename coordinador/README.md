# Coordinador Fase 11 — Pas 2

Mecanisme real del patró **coordinador → agent → memòria** de la Fase 11.

## Estat

```yaml
fase: 11-multiagent
pas: 2 (mecanisme coordinador real)
format: aura-coordinador-v1
document_canonic: coordinador/README.md
script: coordinador/coordinador.mjs
data_obertura: 2026-07-06
estat: viu (dry-run per defecte; escriu amb --write i Mode Sergi)
```

> Nota d'honestedat: el coordinador **no entén** ni interpreta els fitxers dels agents. Fa una **extracció mecànica** (títol + secció de prioritats/resum) i la desa com un record de procedència. La síntesi intel·ligent la fan els agents en generar els seus fitxers; el coordinador només consolida i persisteix.

## Què fa

1. Llegeix els **fitxers d'agents del dia** a les carpetes locals (`briefings/AAAA-MM-DD.md`, `escriptor/AAAA-MM-DD.md`).
2. N'extreu mecànicament el titular i la secció de prioritats o resum.
3. Consolida un **únic record diari** amb data i procedència (quins agents, quins fitxers).
4. El desa a la memòria de l'Aura (D1) via `POST /api/memory` amb **Mode Sergi**.

Amb això, per primera vegada, la informació de la vida real de Sergi (que avui viu en fitxers dispersos) **entra a la memòria persistent de l'Aura** de manera traçable.

## Contracte i límits

- **Additiu:** només afegeix un record; no esborra ni modifica res existent.
- **Només lectura cap enfora:** llegeix fitxers locals; l'única escriptura és a la D1 de l'Aura.
- **Mode Sergi obligatori:** l'escriptura usa la clau local `.aura-write-key` (mai s'imprimeix ni es documenta el valor).
- **Idempotent:** si ja existeix el record coordinador d'aquell dia, no en crea un de duplicat (llevat de `--force`).
- **Dry-run per defecte:** sense `--write`, mostra el record que crearia però no escriu res.
- **Extracció honesta:** cap afirmació de comprensió; el record diu explícitament que és una consolidació mecànica de procedència.

## Ús

```bash
# Verificar (dry-run): mostra el record del dia sense escriure
node coordinador/coordinador.mjs

# Un dia concret
node coordinador/coordinador.mjs --date 2026-07-06

# Escriure de veritat a la memòria de l'Aura (requereix .aura-write-key)
node coordinador/coordinador.mjs --write

# Forçar reescriptura encara que ja existeixi el record del dia
node coordinador/coordinador.mjs --write --force
```

## Format del record

```yaml
kind: coordinador
source: coordinador-fase-11
tags: [fase-11, coordinador, briefing-diari, AAAA-MM-DD]
weight: 2
state: actiu
text: |
  Coordinació Fase 11 — <data llegible>.
  <Agent>: <titular>. <prioritats/resum>
  ...
  Consolidació mecànica de fitxers d'agents locals (procedència).
```

## Agents que consolida

| Agent | Carpeta | Fitxer del dia |
|---|---|---|
| Comunicacions | `briefings/` | `AAAA-MM-DD.md` |
| Escriptor | `escriptor/` | `AAAA-MM-DD.md` |

Afegir un agent nou és afegir una entrada a `AGENTS` dins `coordinador.mjs`.

## Verificació del pas (protocol del projecte)

- El coordinador es genera sense escriure a cap servei extern.
- El record queda desat a D1 amb Mode Sergi, amb data i procedència.
- La integritat es manté `100/100 estable`.
- Es documenta el recompte de records nou a `AURA_CHANGELOG.md`.

## Pròxims passos (dins la Fase 11)

- Programar el coordinador perquè s'executi cada matí després dels agents (launchd), en mode `--write`.
- Quan sigui estable i verificat, valorar la promoció del gen `39088169 coordinacio-multiagent` amb Mode Sergi, auditoria i backup.
