# AURA AGENT — LLIBRES I COMERÇ

Contracte canònic de l'Agent **Llibres i Comerç** de la Fase 11 (coordinació multiagent).

## Estat

```yaml
versio_produccio: cloud-v5.2
fase: 11-multiagent
agent: llibres-i-comerc
estat_agent: obert en mode documentat (informe + coordinació, només lectura per defecte)
document_canonic: AURA_AGENT_LLIBRES_COMERC.md
data: 2026-07-05
```

> Nota d'honestedat: aquest agent **s'obre en mode documentat**. Coordina el negoci de llibres de Sergi a partir de tasques i skills que **ja existeixen**; per defecte **informa i cataloga** (només lectura). Publicar, vendre o modificar catàlegs externs és sempre un pas posterior **amb vistiplau explícit de Sergi**. **No** modifica `aura_core.js` ni D1. La botiga Shopify queda **exclosa**. El gen `39088169 coordinacio-multiagent` continua sent proposta.

## Àmbit de l'agent

L'Agent Llibres i Comerç coordina la **dimensió comercial** del negoci de llibres de Sergi:

- **Revenda de filosofia**: catàleg i vendes a AbeBooks/IberLibro i Todocolección.
- **Caça d'ofertes**: rastreig de llibres de filosofia escassos i barats per a revenda.
- **Publicació de catàleg**: alta de llibres usats als panells de venedor (amb vistiplau).
- **Mètriques i salut**: informes de vendes i health-check dels selectors de publicació.
- **Còpies de seguretat**: backup del directori de la llibreria.

**Exclòs:** la botiga Shopify *Fils i Patrons Carme Espriu* (`carmeespriu.com`), gestionada per una altra persona, queda fora de la Fase 11.

## Estat honest (criteri d'AURA_CAPABILITIES.md)

```text
mecanisme real avui   → informes de vendes, caça d'ofertes i backups (tasques programades ja actives)
connectable (amb vistiplau) → publicació de catàleg a AbeBooks/Todocolección
aspiració (fase pròpia) → automatitzar decisions de preu o compra sense confirmació
```

## Peces ja actives (mecanisme real)

Aquestes automatitzacions ja funcionen i queden formalment sota aquest agent:

- Tasca `metriques-vendes-setmanals` — mètriques de vendes d'AbeBooks i Todocolección.
- Tasca `health-check-publicacio` — comprova que els selectors de publicació segueixen vigents.
- Tasca `backup-llibreria-setmanal` — backup datat de `~/Documents/llibreria`.
- Caça d'ofertes (`caca-gangues-diaria` / `ofertes-llibres-filosofia-diari`) — rastreig d'ofertes, activable segons convingui.
- Skills de suport: `publica-llibres`, `publica-abebooks-bulk`, `ofertes-llibres-filosofia`.

## Contracte de coordinació

- L'agent és **additiu**: no esborra ni modifica dades existents d'Aura.
- Cap als serveis externs, **només lectura/informe** per defecte; publicar o vendre és un pas posterior explícit.
- Tota escriptura persistent a Aura requereix **Mode Sergi**.
- El registre durador per defecte és el **repositori** i `~/Documents/llibreria`.

## Límits

- Cap acció destructiva ni a Aura ni als serveis externs.
- Cap publicació, canvi de preu o compra sense vistiplau explícit de Sergi.
- Cap decisió financera automàtica (preus, compres) sense confirmació.
- Botiga Shopify exclosa.
- Aura coordina, cataloga, conserva i mostra; no sent, no entén ni viu en sentit subjectiu.

## Pròxims passos de l'agent

1. Unificar els informes (vendes + ofertes + salut de publicació) en un resum coordinat, si es vol.
2. Valorar activar la caça d'ofertes de manera estable segons prioritat.
3. Fase futura documentada: consolidar els resultats a la memòria d'Aura (records D1) amb Mode Sergi.

## Verificació de l'obertura

- Document canònic `AURA_AGENT_LLIBRES_COMERC.md` creat.
- `AURA_PHASE11_MULTIAGENT.md` mou l'Agent Llibres i Comerç a *obert en mode documentat*.
- `AURA_KNOWLEDGE.md`, `AURA_CHANGELOG.md` i `AURA_HISTORY.md` registren l'obertura.
- Cap canvi a producció: `aura_core.js`, D1, Worker i integritat resten en `cloud-v5.2`. Gen `39088169`: proposta.
