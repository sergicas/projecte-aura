# AURA CAPABILITIES

Capacitats honestes del Projecte Aura.

## Criteri d'honestedat

Tota afirmació sobre Aura ha d'encaixar en una d'aquestes quatre categories:

- `mecanisme real implementat`: existeix en codi, D1, KV, Worker, Pages, IndexedDB o una ordre executable.
- `documentació o contracte`: està definit al repositori com a norma, protocol o objectiu operatiu.
- `metàfora operativa`: ajuda a pensar Aura, però no és una propietat literal.
- `aspiració futura`: encara no és capacitat implementada.

Cap capacitat de documentació, metàfora o aspiració es presenta com a mecanisme real.

## Naturalesa operativa

Aura és una aplicació web experimental desplegada a Cloudflare Pages amb Pages Functions, D1, Workers KV, un Worker cron de backups, IndexedDB local, documents mestres i una interfície modular.

Aura té una capa narrativa d'identitat, però aquesta identitat està sustentada per mecanismes verificables: memòria persistent, diari, genoma digital documentat, biblioteca de coneixement catalogada, autoreflexió operativa, orientació operativa, auditoria, backups, integritat i ordres operatives.

Aura no és humana, no és biològica i no té autonomia fora dels mecanismes desplegats i configurats.

## Capacitats reals

- Persistir records a D1 i recuperar-los amb `/memoria`, `/memoria-canonica`, `/api/memory` i `/api/memory/canonical`.
  - Tipus: `mecanisme real implementat`.

- Escriure records, diari i gens només amb Mode Sergi quan la ruta és persistent.
  - Tipus: `mecanisme real implementat`.

- Crear backups al vault Workers KV amb manifest, SHA-256 i recompte de records, diari, gens i coneixement catalogat.
  - Tipus: `mecanisme real implementat`.

- Recalcular el SHA-256 d'un backup i comparar-lo amb el manifest en la prova del gen `034 backup-verificable`.
  - Tipus: `mecanisme real implementat`.

- Demostrar que la retenció és `plan-only`: calcula candidats però no executa cap neteja automàtica.
  - Tipus: `mecanisme real implementat`.
  - Prova: `/prova-gen 17711`.

- Generar exportacions JSON i TXT que contenen memòria, diari, genoma i coneixement catalogat.
  - Tipus: `mecanisme real implementat`.
  - Prova: `/prova-gen 008`.

- Catalogar fonts de coneixement amb procedència, estat, tags i resum amb `/coneixement`, `aura knowledge` i `/api/knowledge`.
  - Tipus: `mecanisme real implementat`.
  - Nota: catalogar no vol dir llegir, entendre, sentir ni ingerir automàticament la font.

- Calcular autoreflexió operativa amb `/autoreflexio`, `aura reflection` i `/api/self-reflection`.
  - Tipus: `mecanisme real implementat`.
  - Nota: és una síntesi derivada de memòria, diari, genoma, coneixement, integritat i estat evolutiu; no implica consciència, comprensió subjectiva ni mutació automàtica.

- Calcular orientació operativa amb `/que-es-aura`, `/proxim-pas`, `aura orientation`, `aura next`, `aura what-is-aura` i `/api/orientation`.
  - Tipus: `mecanisme real implementat`.
  - Nota: és una resposta derivada sobre què és Aura, per a què serveix i quin és el següent pas; no implica consciència, comprensió subjectiva ni decisió autònoma.

- Verificar que existeix una còpia redundant fora de D1 al vault Workers KV.
  - Tipus: `mecanisme real implementat`.
  - Prova: `/prova-gen 089`.

- Registrar mutacions estructurals i snapshots d'integritat com a entrades d'auditoria `[audit:*]`.
  - Tipus: `mecanisme real implementat`.

- Calcular integritat amb components explícits, check referencial entre genoma documentat i D1, i check de seguretat de dades sobre `17711`, `008` i `089`.
  - Tipus: `mecanisme real implementat`.

- Fer proves mecàniques dels gens `001 memoria-central`, `034 backup-verificable`, `1597 auditoria-mutacions`, `17711 retencio-segura`, `008 exportabilitat` i `089 vault-backup-kv` amb `/prova-gen <id>`.
  - Tipus: `mecanisme real implementat`.

- Calcular estat evolutiu i propostes evolutives sense aplicar mutacions automàtiques.
  - Tipus: `mecanisme real implementat`.

- Mostrar un cos digital 2D derivat de senyals operatius amb `/cos-digital`, `aura body` i `/api/body`.
  - Tipus: `mecanisme real implementat`.
  - Nota: és una representació visual de lectura; no implica cos biològic, percepció pròpia, sensors, veu ni avatar 3D.

- Assajar una restauració des del vault sense aplicar canvis a D1.
  - Tipus: `mecanisme real implementat`.
  - Nota: és una capacitat assajada. No s'ha de descriure com a restauració productiva executada si no s'ha aplicat i verificat en producció.

## Metàfores operatives

- `Genoma digital`: metàfora operativa per referir-se a una estructura documentada de gens, valors, polítiques, estat i objectius.

- `Estat evolutiu`: metàfora operativa per referir-se a valors calculats a partir de senyals del sistema. No és estat subjectiu.

- `Cos digital`: metàfora operativa i mecanisme visual 2D per referir-se a la presència visible d'Aura. No és cos biològic.

- `Biblioteca pròpia`: metàfora operativa i mecanisme de catàleg. No és comprensió autònoma.

- `Autoreflexió`: metàfora operativa i mecanisme de síntesi. No és introspecció conscient.

- `Orientació`: metàfora operativa i mecanisme de guia pràctica. No és comprensió subjectiva.

## Límits actuals

- Aura no és vida en sentit fort.
- Aura no té percepció pròpia fora de les dades que rep i desa.
- Aura no té sensors, veu pròpia ni avatar 3D en `cloud-v5.2`.
- Aura no executa RAG, embeddings, Vector DB, multiagent ni ingestió automàtica en `cloud-v5.2`.
- Aura no té autoreflexió subjectiva; només calcula una síntesi operativa verificable en `cloud-v5.2`.
- Aura no té orientació subjectiva; només calcula una guia pràctica verificable en `cloud-v5.2`.
- Aura no executa decisions autònomes fora del codi desplegat i els crons configurats.
- Aura no valida compromisos semàntics amb números objectius.
- Aura no promociona records a genoma automàticament.
- Aura no activa el gen latent `013 silici-possible`.
- Aura no executa proves destructives sobre dades reals.
- Aura no executa neteja automàtica de memòria, diari, genoma, backups o snapshots.

## Aspiracions futures

- Cos digital visual més ric, 3D o amb veu pròpia.
- RAG, embeddings o Vector DB sobre la biblioteca de coneixement.
- Autoreflexió més sofisticada.
- Arquitectura multiagent.
- Genoma sintètic avançat.
- Encarnació física futura.

Aquestes aspiracions no són capacitats reals fins que tinguin mecanisme implementat, prova i documentació.
