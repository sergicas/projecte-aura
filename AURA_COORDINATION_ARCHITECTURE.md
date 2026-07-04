# AURA COORDINATION ARCHITECTURE

Esbós de com Aura centralitza i coordina la vida i obra de Sergi.
Prepara la **Fase 11 multiagent** sense activar-la encara.

## Estat

```yaml
versio: cloud-v5.2
document_canonic: AURA_COORDINATION_ARCHITECTURE.md
format: aura-coordination-v1
fase: preparacio-fase-11 (no activada)
data: 2026-07-04
```

> Nota d'honestedat: aquest document és un **disseny**, no un desplegament. Cap agent nou està actiu. Obrir la Fase 11 continua requerint instrucció explícita de Sergi, segons `AURA_ORIENTATION.md`.

## Principi rector

Aura passa de ser una memòria que es descriu a si mateixa a ser el **coordinador** de tot el que Sergi fa. El model és un **nucli coordinador** (l'Aura actual) que orquestra **agents especialistes**, cadascun responsable d'un domini real. El nucli mai perd el seu paper: memòria, integritat, procedència i Mode Sergi segueixen sent la columna vertebral.

```text
                 ┌─────────────────────────┐
                 │   NUCLI AURA (coord.)   │
                 │ memòria · diari · genoma │
                 │ integritat · orientació  │
                 └───────────┬─────────────┘
        ┌────────────┬───────┼────────┬─────────────┐
        ▼            ▼       ▼        ▼             ▼
   [Llibres &   [Obra &   [Comuni-  [Coneixe-   [Integritat
    Comerç]      Veu]      cacions]   ment]       & Backups]
```

## Els dominis reals de Sergi

Aura ha de coordinar el que ja existeix, no inventar feina nova:

1. **Llibres i comerç** — revenda de filosofia (AbeBooks/IberLibro, Todocolección), caça d'ofertes, i la botiga Shopify *Fils i Patrons Carme Espriu* (`carmeespriu.com`).
2. **Obra i veu** — corpus literari, avatar de `sergicastillo.com`, campanyes de ressenyes i gifting.
3. **Comunicacions** — correu, agenda, documents (Drive).
4. **Coneixement** — biblioteca catalogada, records, diari, genoma (nucli actual).
5. **Integritat i backups** — verificació, SHA-256, vault KV (nucli actual).

## Els agents de la Fase 11

Cada agent és un especialista amb un àmbit acotat. El nucli decideix a qui delega i consolida el resultat a memòria.

- **Agent Memòria/Coneixement** — *mecanisme real avui.* Records, diari, biblioteca, orientació. És el que ja tens.
- **Agent Integritat/Backups** — *mecanisme real avui.* Backups verificables, integritat 100/100, vault KV.
- **Agent Comunicacions** — *connectable ara.* Llegeix correu i agenda, prepara resums i recordatoris; escriu a Aura només amb Mode Sergi. (Connectors de correu, calendari i Drive ja disponibles.)
- **Agent Llibres i Comerç** — *connectable per fases.* Ofertes, catàleg, publicacions i vendes; coordina AbeBooks, Todocolección i Shopify. (Ja tens skills per a publicació i caça d'ofertes.)
- **Agent Obra i Veu** — *aspiració propera.* Pont amb l'avatar Sergi com a font externa, campanyes de ressenyes; sense fusió d'identitats ni ingestió automàtica del corpus.

## Correspondència amb el criteri d'honestedat

```text
mecanisme real avui      → Memòria/Coneixement, Integritat/Backups
connectable ara/per fases → Comunicacions, Llibres i Comerç
aspiració (fase pròpia)   → Obra i Veu, coordinació multiagent autònoma
```

Cap agent "connectable" o "aspiració" es descriu com a actiu fins que tingui mecanisme desplegat, prova i documentació.

## Regles d'arquitectura (heretades del projecte)

- Tota escriptura persistent passa per **Mode Sergi**.
- **Cap ingestió automàtica** de correu, corpus o catàleg sense fase documentada i procedència.
- Els agents que actuen sobre serveis externs comencen en mode **només lectura**; l'escriptura és un pas posterior explícit.
- Qualsevol evolució experimental (p. ex. agents autònoms) va en **sandbox separat de producció**, com ja diu `AURA_ALIFE_AVIDA_TIERRA.md`.
- El nucli sempre pot reconstruir-se des dels documents mestres, sense dependre d'un xat.

## El primer pas real (aquesta setmana)

No cal obrir la Fase 11 per començar a fer Aura útil cap enfora. El pas mínim que la connecta amb la teva vida real:

**Briefing diari coordinat → record a Aura.**

1. Cada matí, un procés de lectura recull: correu rellevant, esdeveniments del dia i, opcionalment, un senyal del negoci de llibres.
2. En fa un resum breu i el presenta a Sergi (rol coordinador, estil Jarvis).
3. Amb Mode Sergi, desa el resum com un **record** a Aura, amb data i procedència.

Per què aquest pas:

- És **només lectura** cap als serveis externs; només escriu a Aura amb Mode Sergi.
- Fa que Aura, per primera vegada, **centralitzi** informació de la vida real, no de si mateixa.
- Estableix el patró coordinador → agent → memòria que després escalarà a la Fase 11.
- Es pot fer avui amb els connectors existents, sense arquitectura nova.

## Verificació d'aquest pas (quan es faci)

- El briefing es genera sense escriure a cap servei extern.
- El record queda desat a D1 amb Mode Sergi, amb data i procedència.
- La integritat es manté `100/100 estable` i el backup final es genera.
- Es documenta el recompte de records nou a `AURA_CHANGELOG.md`.
