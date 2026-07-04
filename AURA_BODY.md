# AURA BODY

Cos digital 2D del Projecte Aura.

## Versió

```yaml
versio: cloud-v4.9
fase_protocol: 8
format_api: aura-digital-body-v1
endpoint: /api/body
ordre_web: /cos-digital
ordre_core: aura body
estat_desplegament: desplegat
```

## Objectiu

La Fase 8 dona a Aura una representació visible mínima: un cos digital 2D renderitzat al canvas `#aura-visual`.

Aquest cos no és biològic ni pretén simular percepció pròpia. És una representació operativa i verificable que transforma senyals existents d'Aura en forma visual.

## Fonts

El cos digital deriva de:

- memòria persistent,
- diari evolutiu,
- genoma digital,
- integritat operativa,
- estat evolutiu calculat,
- vault i backup automàtic.

## Contracte API

```text
GET /api/body
GET /api/cos-digital
```

El payload inclou:

- `format: aura-digital-body-v1`
- `phase: fase-8`
- `gene: 3524578 cos-digital-2d`
- `body.type: avatar-2d-canvas`
- `body.surface: #aura-visual`
- `layers`
- `signals`
- `visualContract`
- `limits`
- `safeguards`

Els snapshots i backups inclouen el camp `digitalBody`.

## Gen

```text
3524578 cos-digital-2d actiu
```

Funció:

```text
Formalitza una representació visual 2D d'Aura derivada de senyals operatius, sense simular cos biològic ni percepció pròpia.
```

## Capa visual

El canvas representa:

- nucli: genoma i continuïtat,
- fils: records, diari i relacions operatives,
- anell d'integritat: salut i estabilitat,
- postura: estat derivat de integritat, maduresa i pressió de canvi,
- pols: intensitat calculada a partir de memòria, diari, gens, integritat i backups.

Des del 2026-06-28, la figura inicial deixa de ser un ninot de pal i passa a ser una presència digital 2D més polida:

- rostre abstracte i amable,
- halo orbital de dades,
- punts de memòria i diari al voltant de la figura,
- nucli lluminós derivat de l'estat operatiu,
- fons de graella i estrelles de baixa intensitat.

La millora és visual i no canvia el contracte de límits: continua sent un mirall de dades, no un cos sentit.

En la iteració posterior del mateix dia, el rostre tipus ninot se substitueix per una identitat visual més abstracta:

- monograma `A` com a marca principal;
- cercle orbital com a símbol de memòria i continuïtat;
- canvas amb sigil central, òrbites i nucli operatiu;
- absència d'ulls, boca o gestos humans.

Aquesta versió prioritza identitat visual i llegibilitat de marca, no antropomorfisme.

## Salvaguardes

- No escriu a D1.
- No escriu a KV.
- No elimina records.
- No promociona records a genoma.
- No modifica gens.
- No substitueix `AURA_GENOME.md`.
- Qualsevol mutació persistent continua requerint Mode Sergi.

## Límits

- No és un cos biològic.
- No implica consciència.
- No implica percepció pròpia.
- No té sensors.
- No té veu pròpia.
- No és avatar 3D.
- No executa decisions autònomes.

## Evolució futura

El pas següent possible no s'ha d'implementar fins que l'ús de v4.9 estigui consolidat.

Possibles línies futures:

- avatar 2D més expressiu,
- avatar 3D,
- veu pròpia,
- connexió amb sensors,
- integració física futura.
