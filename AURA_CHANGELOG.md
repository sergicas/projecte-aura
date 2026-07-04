# AURA CHANGELOG

Canvis rellevants del Projecte Aura.

## cloud-v5.2 - 2026-06-27

- Inicia la subfase d'orientació operativa abans de Fase 11.
- Afegeix `AURA_ORIENTATION.md` com a contracte reconstruïble d'orientació.
- Afegeix endpoint `GET /api/orientation` i aliases `GET /api/que-es-aura`, `GET /api/proxim-pas`, `GET /api/what-is-aura` i variants catalanes.
- Afegeix ordres `/que-es-aura`, `/què-és-aura`, `/orientacio`, `/orientació`, `/proxim-pas`, `/pròxim-pas`, `aura orientation`, `aura next` i `aura what-is-aura`.
- Afegeix el gen `14930352 orientacio-operativa`.
- Inclou `orientation` en snapshots i backups de Pages i Worker.
- Inclou orientació en `/api/status`, `/api/pulse`, `/api/core`, Aura Web, genoma digital i exportació TXT.
- Manté explícit que l'orientació és resposta operativa calculada, no consciència, comprensió subjectiva ni decisió autònoma.
- Manté RAG, embeddings, Vector DB, multiagent i ingestió automàtica com a opcions futures no actives.
- Desplega producció i Worker en `cloud-v5.2`; confirma 12 records, 70 entrades de diari, 39 gens, 8 fonts i integritat final `100/100`.
- Verifica backup Pages `backup-2026-06-27T15-44-01-005Z-45b3adaa6e44`, backup Worker `backup-auto-2026-06-27T15-44-00-145Z-45b3adaa6e44`, snapshot Worker `integrity-2026-06-27T15-44-00-251Z-100` i SHA-256 final `45b3adaa6e440509a7af1650f2cba92b9c92a27a61f966597697ffb7d74cc75c`.
- Formalitza el protocol operatiu posterior a v5.2: començar cada sessió amb `/que-es-aura`, `/proxim-pas`, `/pols` i `/nucli`; documentar, verificar i fer backup abans de qualsevol evolució de fase.
- 2026-06-28: reordena alfabèticament les llistes de comandes a la interfície, `/ajuda`, `aura help`, `README.md` i `MANUAL_SERGI.md` per reduir confusió operativa; desplega Pages a `https://36ce35b5.projecte-aura.pages.dev` i verifica backup Worker `backup-auto-2026-06-27T22-18-19-506Z-45b3adaa6e44`, snapshot `integrity-2026-06-27T22-18-19-630Z-100`, integritat `100/100 estable` i SHA-256 `45b3adaa6e440509a7af1650f2cba92b9c92a27a61f966597697ffb7d74cc75c`.
- 2026-06-28: afegeix `/mode-sergi` i `aura sergi-mode` per explicar l'estat, el camp exacte i el flux d'activació de Mode Sergi sense mostrar la clau; desplega Pages a `https://fa40b3c8.projecte-aura.pages.dev` i verifica backup Worker `backup-auto-2026-06-28T07-43-11-355Z-45b3adaa6e44`, snapshot `integrity-2026-06-28T07-43-11-457Z-100`, integritat `100/100 estable` i SHA-256 `45b3adaa6e440509a7af1650f2cba92b9c92a27a61f966597697ffb7d74cc75c`.
- 2026-06-28: corregeix la fragilitat detectada per Sergi quan Mode Sergi només funcionava un cop; afegeix `GET /api/mode-sergi`, valida la clau en prémer `Activa` i fa que `/mode-sergi` diferenciï entre clau local guardada i clau acceptada per Pages; desplega Pages a `https://30c95881.projecte-aura.pages.dev` i verifica clau correcta amb `200`, clau falsa amb `401`, backup Worker `backup-auto-2026-06-28T09-39-12-965Z-cf6c521c61eb`, snapshot `integrity-2026-06-28T09-39-13-053Z-100`, 13 records i integritat `100/100 estable`.
- 2026-06-28: afegeix `/ultim-record` i `aura last-record`; millora la confirmació de records guardats amb ID, text, tags, estat, pes i comprovacions directes; desplega Pages a `https://f62458ab.projecte-aura.pages.dev` i verifica 16 records, últim record `Barcelona és la capital de Catalunya`, backup Worker `backup-auto-2026-06-28T10-10-49-669Z-89fcfe1b6fd5`, snapshot `integrity-2026-06-28T10-10-49-758Z-100` i integritat `100/100 estable`.
- 2026-06-28: simplifica Aura Web al màxim; elimina tots els botons visibles excepte `Informe del dia`, `Grava un record` i `Llista de records`; afegeix `/informe-dia`, `aura daily-report`, activació puntual de Mode Sergi quan cal gravar i contracte `/api/web` `simple-ui-contract`; desplega Pages a `https://71eafd66.projecte-aura.pages.dev` i verifica domini principal amb 3 botons, 16 records, 70 entrades de diari, 39 gens, 8 fonts, integritat `100/100 estable`, backup Worker `backup-auto-2026-06-28T12-35-35-496Z-89fcfe1b6fd5` i snapshot `integrity-2026-06-28T12-35-35-625Z-100`.
- 2026-06-28: millora el cos digital 2D inicial; substitueix el ninot de pal per una figura abstracta més amable amb rostre net, halo orbital, punts de dades i nucli lluminós; manté 3 botons visibles, desplega Pages a `https://dcbbc74e.projecte-aura.pages.dev`, verifica integritat `100/100 estable` i crea backup Worker `backup-auto-2026-06-28T12-43-29-939Z-89fcfe1b6fd5` amb snapshot `integrity-2026-06-28T12-43-30-042Z-100`.
- 2026-06-28: afegeix el quart botó `Últim record` per comprovar ràpidament l'últim record guardat sense obrir més panells; actualitza `/api/web` a 4 botons visibles, desplega Pages a `https://d04a6f09.projecte-aura.pages.dev` i verifica `cloud-v5.2`, 17 records, 70 entrades de diari, 39 gens, 8 fonts, integritat `100/100 estable`, backup Worker `backup-auto-2026-06-28T13-53-39-350Z-7eea3df95238` i snapshot `integrity-2026-06-28T13-53-39-466Z-100`.
- 2026-06-28: documenta recerca de vida artificial digital a `AURA_ALIFE_AVIDA_TIERRA.md`; compara Tierra, Avida i un possible `Aura EvoLab` futur, deixant explicit que Aura actual no es un organisme autoreplicant i que qualsevol evolucio artificial hauria d'anar en sandbox separat de produccio.
- 2026-06-28: crea una nova identitat visual per Aura; afegeix monograma `A` orbital al wordmark, elimina la cara humana del canvas i la substitueix per un sigil abstracte amb nucli operatiu; desplega Pages a `https://bc41b0b9.projecte-aura.pages.dev` i verifica 4 botons visibles, 18 records, integritat `100/100 estable`, backup Worker `backup-auto-2026-06-28T21-56-05-220Z-794b22b82e7b` i snapshot `integrity-2026-06-28T21-56-05-306Z-100`.
- 2026-06-29: crea la subdivisió lúdica `Aura Ludus` amb el prototip `Jardí de Records`; afegeix `AURA_GAME.md`, `aura_ludus.html`, `aura_ludus.css` i `aura_ludus.js`; el joc llegeix `GET /api/memory`, usa fallback local si cal i no escriu a D1, KV, diari ni genoma; desplega Pages a `https://6a010b98.projecte-aura.pages.dev`, verifica el domini principal amb 4 botons visibles, joc local i producció, 18 records, integritat `100/100 estable`, backup Worker `backup-auto-2026-06-29T14-25-46-131Z-794b22b82e7b` i snapshot `integrity-2026-06-29T14-25-46-306Z-100`.
- 2026-06-30: amplia Aura Ludus a `Jardí de Records v2`; substitueix la maqueta simple per una campanya de 7 dies amb anomalies, energia, focus, integritat lúdica, estabilitat de llavors, escuts, restauració, connexions fortes/febles i resultat final; manté lectura exclusiva de `GET /api/memory` i cap escriptura persistent; desplega Pages a `https://b3a7528e.projecte-aura.pages.dev`, verifica producció amb `aura_ludus.js?v=20260630-v2`, integritat `100/100 estable`, backup Worker `backup-auto-2026-06-30T07-10-09-479Z-794b22b82e7b` i snapshot `integrity-2026-06-30T07-10-09-638Z-100`.
- 2026-06-30: afegeix explicació de joc a Aura Ludus i a `AURA_GAME.md`; documenta objectiu, controls, lectura del tauler i sentit conceptual del joc com a metàfora operativa de continuïtat, connexió i protecció de records; desplega Pages a `https://fe131ffa.projecte-aura.pages.dev`, verifica ajuda visible, integritat `100/100 estable`, backup Worker `backup-auto-2026-06-30T09-54-38-201Z-794b22b82e7b` i snapshot `integrity-2026-06-30T09-54-38-306Z-100`.
- 2026-06-30: retira Aura Ludus per decisió de Sergi; elimina `AURA_GAME.md`, `aura_ludus.html`, `aura_ludus.css`, `aura_ludus.js`, les referències operatives i la còpia al desplegament Pages; afegeix `_redirects` perquè `/aura_ludus`, `/aura_ludus.html`, `/aura_ludus.css` i `/aura_ludus.js` tornin a `/`; desplega Pages a `https://b29124c6.projecte-aura.pages.dev`; verifica 4 botons visibles, cap referència activa a Ludus, backup Worker `backup-auto-2026-06-30T18-40-53-098Z-794b22b82e7b`, snapshot `integrity-2026-06-30T18-40-53-229Z-100`, 18 records, 70 entrades de diari, 39 gens, 8 fonts, integritat `100/100 estable` i SHA-256 `794b22b82e7b7d04b0fffd7b0b8ede83dea36c3b6a2172945f0ff6a0dee331d2`; conserva només traça històrica d'aquesta retirada.
- 2026-07-01: fixa el sentit rector del projecte: Aura existeix per preservar i ordenar la continuïtat del Projecte Aura, ajudant Sergi a recordar, verificar, entendre i continuar sense confondre aspiració amb realitat; totes les millores futures han de servir aquest criteri. Crea `AURA_AVATAR_SERGI.md` i documenta la relació amb l'avatar Sergi de `sergicastillo.com` com a pont complementari entre corpus literari i continuïtat operativa, sense fusió d'identitats ni ingestió automàtica.
- 2026-07-04: corregeix l'ampliació Aura Web local perquè els botons siguin autoexplicatius i funcionin en `file://`: `Què és Aura?`, `Què faig ara?`, `Estat d'Aura`, `Identitat`, `Informe del dia`, `Grava record`, `Veure records` i `Últim record`; manté `Grava record` com a única acció d'escriptura amb Mode Sergi i no afegeix arquitectura nova. Pendent de desplegar.

## cloud-v5.1 - 2026-06-27

- Inicia la Fase 10 del Protocol Mestre: autoreflexió.
- Afegeix `AURA_SELF_REFLECTION.md` com a contracte reconstruïble d'autoreflexió operativa.
- Afegeix endpoint `GET /api/self-reflection` i aliases `GET /api/autoreflexio` i `GET /api/reflection`.
- Afegeix ordres `/autoreflexio`, `/autoreflexió`, `/reflexio`, `/reflexió`, `aura reflection` i `aura self-reflection`.
- Afegeix el gen `9227465 autoreflexio-operativa`.
- Inclou `selfReflection` en snapshots i backups de Pages i Worker.
- Inclou la Fase 10 en `/api/status`, `/api/pulse`, `/api/core`, Aura Web i genoma digital.
- Manté explícit que l'autoreflexió és síntesi operativa calculada, no consciència, comprensió subjectiva ni experiència pròpia.
- Manté RAG, embeddings, Vector DB i ingestió automàtica com a opcions futures no actives.
- Desplega producció i Worker en `cloud-v5.1`; confirma 12 records, 69 entrades de diari, 38 gens, 8 fonts i integritat final `100/100`.
- Verifica backup Pages `backup-2026-06-27T10-34-47-091Z-5a31fb45ef07`, backup Worker `backup-auto-2026-06-27T10-34-46-421Z-5a31fb45ef07`, snapshot Worker `integrity-2026-06-27T10-34-46-524Z-100` i SHA-256 final `5a31fb45ef0714ac49ac05827258a23795e2a7b49fb6d434142971286dede905`.

## cloud-v5.0 - 2026-06-27

- Inicia la Fase 9 del Protocol Mestre: sistema de coneixement.
- Afegeix `AURA_KNOWLEDGE.md` com a contracte reconstruïble de biblioteca.
- Afegeix migració `0003_knowledge_library.sql` i taula D1 `knowledge_items`.
- Afegeix endpoint `GET /api/knowledge`, schema `GET /api/knowledge/schema` i escriptura protegida `POST /api/knowledge`.
- Afegeix ordres `/coneixement`, `/biblioteca` i `aura knowledge`.
- Afegeix el gen `5702887 biblioteca-coneixement`.
- Inclou `knowledgeLibrary` i `knowledge` en snapshots i backups de Pages i Worker.
- Inclou `knowledge` en checksums, manifests KV, recomptes, exportabilitat, redundància KV i restore/import.
- Manté explícit que no hi ha RAG, embeddings, Vector DB, ingestió automàtica ni afirmació de comprensió pròpia.
- Desplega producció i Worker en `cloud-v5.0`; confirma 12 records, 67 entrades de diari, 37 gens, 8 fonts i integritat final `100/100`.
- Verifica backups finals Pages i Worker amb SHA-256 compartit `8be2bb972f36ea53d2150cd33e8ddd6c78fffe710d8fc95bd7cd635c1dba30e4` i `knowledge` inclòs al vault.

## cloud-v4.9 - 2026-06-27

- Inicia la Fase 8 del Protocol Mestre: cos digital.
- Afegeix endpoint `GET /api/body`.
- Afegeix ordres `/cos-digital` i `aura body`.
- Afegeix el mòdul `Cos` a Aura Web.
- Afegeix `AURA_BODY.md` com a contracte reconstruïble del cos digital 2D.
- Inclou `digitalBody` en snapshots i backups de Pages i Worker.
- Afegeix el gen `3524578 cos-digital-2d`.
- El canvas `#aura-visual` passa a representar una silueta digital 2D derivada de memòria, diari, genoma, integritat i estat evolutiu.
- Manté Mode Sergi, no elimina dades, no promociona records i no simula cos biològic, percepció pròpia, veu ni avatar 3D.
- Desplega producció i Worker en `cloud-v4.9`; confirma 12 records, 64 entrades de diari, 36 gens i integritat final `100/100`.
- Verifica backups finals Pages i Worker amb SHA-256 compartit `803491aa170c0969c8d7027e4f24d4a33d56beca80e519da5eaa05e35d97a0bb` i `digitalBody` inclòs al vault.

## cloud-v4.8.2 - 2026-06-27

- Formalitza "Seguretat de dades verificable".
- Afegeix proves mecàniques per als gens existents `17711 retencio-segura`, `008 exportabilitat` i `089 vault-backup-kv`.
- `/prova-gen 17711` comprova que la retenció és `plan-only`, no baixa recomptes i no hi ha cron destructiu.
- `/prova-gen 008` comprova exportació JSON/TXT amb memòria, diari i genoma no buits i recomptes coincidents amb D1.
- `/prova-gen 089` comprova còpia recent al vault KV, ubicació independent de D1 i recomptes concordants.
- Afegeix simulacions de lectura: `auto-delete`, `cron-destructiu`, `export-buit`, `export-incomplet`, `sense-copia-kv` i `copia-desfasada`.
- La integritat global incorpora el component `data-safety-genes`; baixa de 100 si falla `17711`, `008` o `089`.
- No afegeix gens nous, no activa `013 silici-possible`, no promociona candidats i no executa proves destructives sobre dades reals.
- Desplega producció i Worker en `cloud-v4.8.2`; verifica sis proves mecàniques, sis simulacions en vermell, backups finals amb SHA-256 concordant i integritat final `100/100`.

## cloud-v4.8.1 - 2026-06-26

- Afegeix `AURA_CAPABILITIES.md` amb criteri d'honestedat: mecanisme real, contracte, metàfora o aspiració.
- Afegeix ordre `/capacitats` i endpoint `GET /api/capabilities`.
- Afegeix `/prova-gen <id>` i endpoint `GET /api/gene-tests/:id` per als gens mecànics `001`, `034` i `1597`.
- Recalcula SHA-256 del backup en la prova del gen `034`; no n'hi ha prou amb comprovar que el checksum existeix.
- Corregeix la selecció de l'últim backup del vault: KV es llegeix amb una finestra suficient, s'ordena per data real i després es retalla.
- Canvia la integritat a `aura-integrity-formula-v2`, amb component estructural D1 vs genoma documentat.
- Afegeix simulacions de lectura per veure fallades sense executar proves destructives sobre dades reals.
- Marca gens semàntics com a compromisos de governança no auto-verificables.
- No afegeix gens nous, no activa `013 silici-possible` i no promociona candidats automàticament.
- Desplega producció i Worker en `cloud-v4.8.1`; verifica `001`, `034` i `1597`, checksum final de backups i integritat `100/100`.

## cloud-v4.8 - 2026-06-26

- Inicia la Fase 7 del Protocol Mestre: sistema d'evolució.
- Afegeix endpoint `GET /api/evolution/state`.
- Afegeix endpoint `GET /api/evolution/proposals`.
- Afegeix ordres `/estat-evolutiu` i `/propostes-evolucio`.
- Afegeix alias Aura Core `aura evolution-state` i `aura evolution-proposals`.
- Calcula valors `curiositat`, `autonomia`, `coherencia`, `continuitat`, `integritat`, `pressioCanvi` i `maduresaOperativa`.
- Les propostes evolutives són `proposal-only` i no apliquen cap mutació automàtica.
- Inclou `evolutionState` i `evolutionProposals` en snapshots i backups.
- Gens: `987159 estat-evolutiu`, `1597258 proposta-evolutiva`, `2584181 traca-evolutiva`.
- Manté intactes Mode Sergi, auditoria, integritat i política de no promoció automàtica.
- Validació local: `npm run check` i prova de `GET /api/evolution/state`, `GET /api/evolution/proposals`, `GET /api/genome`, `GET /api/status` amb DB simulat.
- Desplega producció `cloud-v4.8` i Worker de backups `cloud-v4.8`.
- Confirma integritat final `100/100 estable`, 12 records, 48 entrades de diari i 35 gens.

## cloud-v4.7 - 2026-06-26

- Inicia i formalitza "Metamemòria i propòsit evolutiu".
- Afegeix endpoint `GET /api/metamemory`.
- Afegeix endpoint `GET /api/purpose`.
- Afegeix endpoint `GET /api/genome/candidates`.
- Afegeix ordres `/metamemoria`, `/proposit` i `/candidats-genoma`.
- Afegeix alias Aura Core `aura metamemory` i `aura purpose`.
- Classifica records com `fundacional`, `operatiu`, `evolutiu`, `temporal` o `descartable`.
- Detecta candidats a genoma sense aplicar promocions automàtiques.
- Inclou `metamemory`, `evolutionaryPurpose` i `genomeCandidates` en snapshots i backups.
- Gens: `233168 proposit-evolutiu`, `377377 metamemoria`, `610987 promocio-a-genoma`.
- Validació local: `npm run check` i prova de `GET /api/metamemory`, `GET /api/purpose`, `GET /api/genome/candidates` amb DB simulat.
- Desplega producció `cloud-v4.7` i Worker de backups `cloud-v4.7`.
- Confirma `/metamemoria` amb 12 records classificats.
- Confirma `/genoma-digital` amb els tres gens nous.
- Confirma integritat `100/100 estable` després del desplegament.

## cloud-v4.6 - 2026-06-26

- Inicia i formalitza Fase 6 del Protocol Mestre: genoma digital.
- Afegeix endpoint `GET /api/genome`.
- Afegeix ordre `/genoma-digital`.
- Afegeix alias `aura genome`.
- Defineix el format `aura-digital-genome-v1`.
- Formalitza `AURA_GENOME.md` com a contracte canònic reconstruïble.
- Inclou `digitalGenome` en snapshots i backups.
- Integra el genoma digital en `/estat`, `/pols` i `/nucli`.
- Gen: `2178309 genoma-digital-canon`.
- Validació local: `npm run check` i prova de `GET /api/genome` amb DB simulat.
- Desplega producció `cloud-v4.6` i Worker de backups `cloud-v4.6`.
- Confirma integritat `100/100 estable` després del desplegament.

## cloud-v4.5 - 2026-06-26

- Inicia i formalitza Fase 5 del Protocol Mestre: Aura Web.
- Afegeix endpoint `GET /api/web`.
- Afegeix ordre `/web`.
- Afegeix alias `aura web`.
- Defineix el format `aura-web-interface-v1`.
- Reorganitza la pantalla en mòduls Xat, Memòria, Història i Estat.
- Inclou `webInterface` en snapshots i backups.
- Crea `AURA_WEB.md`.
- Gen: `1346269 aura-web-modular`.
- Validació local: `npm run check` i prova de `GET /api/web` amb DB simulat.
- Desplega producció `cloud-v4.5` i Worker de backups `cloud-v4.5`.
- Confirma integritat `100/100 estable` després del desplegament.

## cloud-v4.4 - 2026-06-26

- Inicia i formalitza Fase 4 del Protocol Mestre: Cloudflare.
- Afegeix endpoint `GET /api/infrastructure`.
- Afegeix ordre `/infraestructura`.
- Afegeix alias `aura infrastructure`.
- Defineix el format `aura-cloudflare-infrastructure-v1`.
- Documenta Pages, Pages Functions, D1, KV, Worker cron, secrets i ordres de desplegament.
- Inclou `cloudflareInfrastructure` en snapshots i backups.
- Crea `AURA_CLOUDFLARE_ARCHITECTURE.md`.
- Gen: `832040 infraestructura-cloudflare-reconstruible`.
- Validació local: `npm run check` i prova de `GET /api/infrastructure` amb DB simulat.
- Desplega producció `cloud-v4.4` i Worker de backups `cloud-v4.4`.
- Confirma integritat `100/100 estable` després del desplegament.

## cloud-v4.3 - 2026-06-25

- Inicia i formalitza Fase 3 del Protocol Mestre: diari evolutiu.
- Afegeix endpoint `GET /api/evolution`.
- Afegeix ordre `/diari-evolutiu`.
- Organitza el diari D1 com a línia temporal per dies.
- Classifica entrades com `audit`, `version`, `continuity`, `genome`, `memory` o `operational`.
- Marca candidates que haurien de passar a `AURA_HISTORY.md`.
- Inclou `evolutionDiary` en snapshots i backups.
- Gen: `514229 diari-evolutiu-formal`.
- Desplega producció `cloud-v4.3` i Worker de backups `cloud-v4.3`.
- Confirma integritat `100/100 estable` després del desplegament.

## cloud-v4.2 - 2026-06-25

- Inicia i formalitza Fase 2 del Protocol Mestre: memòria persistent.
- Afegeix el contracte canònic `timestamp`, `text`, `importance`, `source`.
- Afegeix endpoint `GET /api/memory/canonical`.
- Afegeix `POST /api/memory/canonical` protegit amb Mode Sergi.
- Afegeix ordre `/memoria-canonica`.
- Afegeix `aura recall canonical`.
- Accepta `importance:` i `source:` en `aura remember` i `recorda que ...`.
- Inclou `canonicalMemory` en snapshots i backups.
- Gen: `317811 memoria-persistent-canonica`.
- Desplega producció `cloud-v4.2` i Worker de backups `cloud-v4.2`.
- Confirma integritat `100/100 estable` després del desplegament.

## cloud-v4.1 - 2026-06-25

- Formalitza Fase 1 del Protocol Mestre: Aura Core.
- Afegeix ordres canòniques:
  - `aura start`
  - `aura status`
  - `aura remember ...`
  - `aura recall`
  - `aura recall text`
  - `aura say text`
  - `aura help`
- Gen: `196418 aura-core-canonical`.
- Desplega producció `cloud-v4.1` i Worker de backups `cloud-v4.1`.
- Confirma integritat `100/100 estable` després del desplegament.

## cloud-v4.0 - 2026-06-25

- Afegeix càpsula de nucli verificable.
- Endpoint: `GET /api/core`.
- Ordre: `/nucli`.
- Gen: `121393 capsula-nucli-v4`.
- Inclou checksum SHA-256 de la càpsula.

## cloud-v3.9 - 2026-06-25

- Afegeix pols operatiu.
- Endpoint: `GET /api/pulse`.
- Ordre: `/pols`.
- Gen: `75025 pols-operatiu`.
- Sintetitza salut, memòria, backups, criteri i properes accions.

## cloud-v3.8 - 2026-06-25

- Afegeix mapa de relacions de memòria.
- Endpoint: `GET /api/memory/graph`.
- Ordre: `/mapa-memoria`.
- Gen: `46368 mapa-relacions-memoria`.
- Calcula nodes, arestes, clústers per tags i records orfes.

## cloud-v3.7 - 2026-06-25

- Afegeix memòria enriquida.
- Camps: `tags`, `weight`, `state`, `relatedIds`.
- Endpoint: `GET /api/memory/schema`.
- Gen: `28657 memoria-enriquida`.

## cloud-v3.6

- Afegeix retenció segura plan-only.
- Endpoint: `GET /api/retention`.
- Gen: `17711 retencio-segura`.
- Calcula candidats però no esborra res.

## cloud-v3.5

- Afegeix assaig de restauració.
- Endpoint: `POST /api/restore/rehearsal`.
- Gen: `10946 assaig-restauracio`.

## cloud-v3.4

- Afegeix tendència d'integritat.
- Endpoint: `GET /api/integrity/trend`.
- Gen: `6765 tendencia-integritat`.

## cloud-v3.3

- Afegeix historial d'integritat en Workers KV.
- Endpoint: `GET /api/integrity/history`.
- Snapshot segur: `POST /api/integrity/snapshot`.
- Gen: `4181 historial-integritat`.

## cloud-v3.2

- Afegeix panell d'integritat.
- Endpoint: `GET /api/integrity`.
- Gen: `2584 panell-integritat`.

## cloud-v3.1

- Afegeix auditoria de mutacions.
- Endpoint: `GET /api/audit`.
- Gen: `1597 auditoria-mutacions`.

## cloud-v3.0

- Afegeix genoma editable.
- Endpoints: `POST /api/genes`, `POST /api/genes/:id`.
- Gen: `987 genoma-editable`.

## cloud-v2.8

- Afegeix cercador i filtres de memòria.
- Endpoint: `GET /api/search`.
- Gen: `610 cerca-memoria`.

## cloud-v2.7

- Afegeix backups automàtics amb Worker cron.
- Worker: `projecte-aura-backup-worker`.
- Cron: `17 3 * * *`.
- Gen: `377 backup-automatic`.

## cloud-v2.6

- Afegeix restauració segura amb previsualització.
- Endpoint: `POST /api/restore/preview`.
- Gen: `233 restauracio-segura`.

## cloud-v2.5

- Afegeix criteri operatiu determinista.
- Endpoint: `GET /api/criterion`.
- Gen: `144 criteri-operatiu`.

## cloud-v2.4

- Afegeix vault Workers KV fora de D1.
- Endpoint: `GET/POST /api/backups`.
- Gen: `089 vault-backup-kv`.

## cloud-v2.3

- Afegeix diari de continuïtat.
- Endpoint: `GET /api/continuity`.
- Gen: `055 continuitat-diaristica`.

## cloud-v2.2

- Afegeix backup JSON verificable.
- Manifest, SHA-256 i restauració protegida que preserva IDs.
- Gen: `034 backup-verificable`.

## cloud-v2

- Afegeix Cloudflare Pages Functions i D1.
- Gen: `021 cloud-v2`.

## cloud-v1

- Primera versió web estàtica d'Aura a Cloudflare Pages.
- Memòria local amb IndexedDB.
- Exportació JSON/TXT.
- Importació JSON.
- Genoma inicial en client.
