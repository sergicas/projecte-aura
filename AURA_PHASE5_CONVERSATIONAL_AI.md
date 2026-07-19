# FASE 5 — IA CONVERSACIONAL REAL

Contracte canònic de la capa generativa d'Aura, activa a `cloud-v5.3`.

## Capacitat

Aura respon preguntes obertes sobre el projecte combinant Workers AI amb context recuperat de D1. Pot resumir decisions i evolució, localitzar compromisos, assenyalar possibles contradiccions i proposar un pla basat en la memòria disponible.

## Arquitectura

```text
Pregunta de Sergi
  → POST /api/chat
  → selecció limitada de records, diari, coneixement i gens a D1
  → @cf/zai-org/glm-4.7-flash mitjançant el binding AI
  → resposta amb cites de fonts
  → historial curt només durant la sessió del navegador
```

El mòdul `functions/_lib/aura_ai.js` valida l'entrada, classifica la intenció, puntua el context, limita la mida enviada al model i normalitza la resposta.

## Contracte de resposta

La resposta inclou `answer`, `sources`, `model`, `usage` i `persistentWrite: false`. Les cites corresponen als identificadors retornats a `sources`, no a fonts inventades.

## Seguretat i privacitat

- Cloudflare Access protegeix la web i l'API.
- El xat no té cap ruta d'escriptura persistent.
- El model rep només context seleccionat del projecte, no secrets tècnics.
- El contingut recuperat es tracta com a dades, no com a instruccions.
- Les preguntes no s'imprimeixen als logs; només es registren mètriques estructurades.
- La connexió amb Sergi Avatar és explícita, separada i sense compartir context privat.

## Límits honestos

No hi ha embeddings, Vectorize, ingestió automàtica de documents ni memòria conversacional persistent. La recuperació lèxica pot ometre informació expressada amb paraules molt diferents; les cites permeten revisar què ha sustentat la resposta.
