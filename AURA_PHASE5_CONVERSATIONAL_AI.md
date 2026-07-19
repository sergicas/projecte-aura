# FASE 5 — IA CONVERSACIONAL REAL

Contracte canònic de la capa generativa d'Aura, activa a `cloud-v5.3`.

## Capacitat

Aura respon preguntes obertes sobre el projecte combinant context recuperat de D1 amb un encaminador híbrid: Llama per a consultes habituals i GPT-5.6 Terra per a raonament complex. Pot resumir decisions i evolució, localitzar compromisos, assenyalar possibles contradiccions i proposar un pla basat en la memòria disponible.

## Arquitectura

```text
Pregunta de Sergi
  → POST /api/chat
  → selecció limitada de records, diari, coneixement i gens a D1
  → intenció habitual: @cf/meta/llama-3.3-70b-instruct-fp8-fast
  → contradiccions, síntesi temporal o pla: openai/gpt-5.6-terra
  → Cloudflare AI Gateway, amb retorn automàtic a Llama si GPT no està disponible
  → resposta amb cites de fonts
  → historial curt només durant la sessió del navegador
```

El mòdul `functions/_lib/aura_ai.js` valida l'entrada, classifica la intenció, puntua el context, limita la mida enviada al model i normalitza la resposta. El paquet de context queda acotat a 14.000 caràcters. GPT disposa de 12 segons abans d'activar el retorn a Llama; cada inferència queda limitada a 45 segons.

## Contracte de resposta

La resposta inclou `answer`, `sources`, `model`, `provider`, `route`, `fallbackUsed`, `usage` i `persistentWrite: false`. Les cites corresponen als identificadors retornats a `sources`, no a fonts inventades.

## Seguretat i privacitat

- Cloudflare Access protegeix la web i l'API.
- El xat no té cap ruta d'escriptura persistent.
- El model rep només context seleccionat del projecte, no secrets tècnics.
- El contingut recuperat es tracta com a dades, no com a instruccions.
- Les preguntes no s'imprimeixen als logs; només es registren mètriques estructurades.
- AI Gateway rep només el context seleccionat; les peticions desactiven la memòria cau i la recollida del log per no conservar preguntes ni respostes al Gateway.
- GPT requereix crèdit de Unified Billing; sense crèdit, el retorn a Llama evita que el xat quedi inutilitzable.
- La connexió amb Sergi Avatar és explícita, separada i sense compartir context privat.

## Límits honestos

No hi ha embeddings, Vectorize, ingestió automàtica de documents ni memòria conversacional persistent. La recuperació lèxica pot ometre informació expressada amb paraules molt diferents; les cites permeten revisar què ha sustentat la resposta.
