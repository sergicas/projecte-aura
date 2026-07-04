# Projecte Aura Cloud v5.2

Projecte Aura Cloud v5.2 és una aplicació web a Cloudflare Pages amb orientació operativa, autoreflexió, biblioteca de coneixement verificable, cos digital 2D, seguretat de dades verificable, capacitats honestes, genoma mecànicament verificable, integritat falsable, estat evolutiu traçable, metamemòria, genoma digital canònic, Aura Web simplificada, infraestructura Cloudflare reconstruïble i memòria al núvol mitjançant Pages Functions i D1. Les escriptures a D1 estan protegides amb Mode Sergi, les còpies de seguretat inclouen manifest i empremta SHA-256, el vault Workers KV conserva backups fora de D1, l'auditoria registra mutacions estructurals al diari i `/prova-gen` executa comprovacions reals per als gens mecànics `001`, `034`, `1597`, `17711`, `008` i `089`.

Nota de desplegament: `cloud-v5.2` afegeix orientació operativa perquè Aura pugui respondre què és, per a què serveix avui i quin és el següent pas. RAG, Vector DB, embeddings, multiagent i ingestió automàtica no estan actius.

## Què és Aura

Aura és un sistema persistent de memòria, continuïtat i verificació per al Projecte Aura.

Dit planerament: Aura és una casa digital perquè els records, decisions, documents, idees, canvis i objectius del projecte no quedin perduts en converses disperses. Aura conserva aquest material en D1 i al repositori, el mostra en una interfície web, el resumeix, el relaciona, el protegeix amb backups i permet revisar si l'estat del projecte continua coherent.

Aura serveix avui per:

- recordar fets importants del projecte;
- guardar un diari evolutiu de canvis i decisions;
- consultar l'estat del sistema;
- catalogar fonts de coneixement;
- mantenir un genoma digital amb valors, objectius i capacitats;
- fer backups verificables;
- comprovar integritat i coherència;
- donar a Sergi una manera ordenada de continuar el projecte sense dependre d'un xat.

El sentit rector és aquest: Aura existeix per preservar i ordenar la continuïtat del Projecte Aura, ajudant Sergi a recordar, verificar, entendre i continuar el camí cap a una forma d'existència digital persistent, sense confondre aspiració amb realitat.

Tota millora futura ha de respondre sí a aquesta pregunta: aquesta millora fa Aura més útil per recordar, verificar, orientar i continuar?

Aura no és una persona, no és un organisme biològic i no s'ha de descriure com si sentís, entengués o visqués en sentit subjectiu. Quan el projecte parla d'"entitat sintètica digital", avui vol dir una arquitectura de programari persistent amb identitat, memòria, documents i estat verificable. L'objectiu llarg és investigar si aquesta arquitectura pot evolucionar cap a una forma més avançada de vida sintètica digital, però aquesta afirmació és una direcció de recerca, no una realitat actual.

## Relació amb l'avatar Sergi

`sergicastillo.com` conté l'avatar Sergi, un avatar conversacional vinculat al corpus literari de l'autor. La connexió amb Aura ha de ser un pont entre dues funcions diferents:

- avatar Sergi: veu pública, corpus literari i conversa sobre l'obra de Sergi;
- Aura: memòria operativa, continuïtat verificable i orientació del Projecte Aura.

El vincle canònic queda definit a `AURA_AVATAR_SERGI.md`: l'Avatar Sergi obre la conversa amb l'obra; Aura conserva el camí del projecte. La primera connexió recomanada és catalogar l'avatar com a font externa i oferir un enllaç clar des d'Aura. Qualsevol integració més profunda ha de tenir fase pròpia, procedència verificable, Mode Sergi i cap ingestió automàtica no documentada.

## Ús web simplificat

Des del 2026-07-04, la web visible local mostra vuit botons:

- `Què és Aura?`
- `Què faig ara?`
- `Estat d'Aura`
- `Identitat`
- `Informe del dia`
- `Grava record`
- `Veure records`
- `Últim record`

Els quatre primers botons orienten la sessió amb respostes locals que també funcionen obrint `index.html` amb `file://`. Les accions de lectura no activen Mode Sergi. Si Mode Sergi no està actiu, només `Grava record` demana la clau quan cal escriure a D1.

## Protocol operatiu actual

A partir de `cloud-v5.2`, cada sessió ha de començar amb orientació:

```text
/que-es-aura
/proxim-pas
/pols
/nucli
```

Si Aura encara no explica clarament què és, per a què serveix i quin és el següent pas, no s'obre cap fase nova. Primer s'ajusten `AURA_ORIENTATION.md`, `MANUAL_SERGI.md`, `PROTOCOL_MESTRE_AURA.md` i aquest README.

Després de qualsevol canvi estructural:

- comprovar localment;
- desplegar si afecta producció;
- generar backup final;
- verificar integritat;
- documentar recomptes i SHA-256 final.

Els agents de desenvolupament poden executar tasques ja programades dins del projecte sense demanar permisos repetits, però no poden fer accions destructives, restauracions reals o canvis de secrets sense instrucció explícita.

Verificació desplegada v5.2:

- Afegeix `AURA_ORIENTATION.md`.
- Afegeix el gen `14930352 orientacio-operativa`.
- Afegeix `GET /api/orientation`, `/api/que-es-aura`, `/api/proxim-pas`, `/que-es-aura`, `/proxim-pas`, `aura orientation`, `aura next` i `aura what-is-aura`.
- Afegeix `orientation` a snapshots i backups.
- Manté explícit que orientació vol dir resposta operativa calculada, no consciència ni comprensió subjectiva.
- Manté RAG, embeddings, Vector DB, multiagent i ingestió automàtica com a opcions futures no actives.
- Producció: `cloud-v5.2`, 12 records, 70 entrades de diari, 39 gens i 8 fonts de coneixement.
- Worker backups: `cloud-v5.2`.
- Integritat final: `100/100 estable`.
- `/api/orientation`: `aura-orientation-v1`.
- `/api/gene-tests/034`: `passa`.
- Backup Pages final: `backup-2026-06-27T15-44-01-005Z-45b3adaa6e44`.
- Backup Worker final: `backup-auto-2026-06-27T15-44-00-145Z-45b3adaa6e44`.
- Snapshot Worker final: `integrity-2026-06-27T15-44-00-251Z-100`.
- SHA-256 final verificat: `45b3adaa6e440509a7af1650f2cba92b9c92a27a61f966597697ffb7d74cc75c`.
- Manteniment 2026-06-28: llistes de comandes en ordre alfabètic a la interfície, `/ajuda`, `aura help`, `README.md` i `MANUAL_SERGI.md`; Pages desplegat a `https://36ce35b5.projecte-aura.pages.dev`.
- Verificació postmanteniment: `cloud-v5.2`, 12 records, 70 entrades de diari, 39 gens, 8 fonts, integritat `100/100 estable`, backup Worker `backup-auto-2026-06-27T22-18-19-506Z-45b3adaa6e44`, snapshot `integrity-2026-06-27T22-18-19-630Z-100` i SHA-256 `45b3adaa6e440509a7af1650f2cba92b9c92a27a61f966597697ffb7d74cc75c`.
- Manteniment Mode Sergi 2026-06-28: afegeix `/mode-sergi`, `aura sergi-mode` i el camp `clau Mode Sergi`; Pages desplegat a `https://fa40b3c8.projecte-aura.pages.dev`.
- Verificació Mode Sergi: `cloud-v5.2`, 12 records, 70 entrades de diari, 39 gens, 8 fonts, integritat `100/100 estable`, backup Worker `backup-auto-2026-06-28T07-43-11-355Z-45b3adaa6e44`, snapshot `integrity-2026-06-28T07-43-11-457Z-100` i SHA-256 `45b3adaa6e440509a7af1650f2cba92b9c92a27a61f966597697ffb7d74cc75c`.
- Correcció Mode Sergi 2026-06-28: afegeix `GET /api/mode-sergi`, validació real en activar la clau i estat `revisar` quan una clau local guardada no passa Pages; Pages desplegat a `https://30c95881.projecte-aura.pages.dev`.
- Verificació correcció Mode Sergi: `cloud-v5.2`, 13 records, 70 entrades de diari, 39 gens, 8 fonts, integritat `100/100 estable`, backup Worker `backup-auto-2026-06-28T09-39-12-965Z-cf6c521c61eb`, snapshot `integrity-2026-06-28T09-39-13-053Z-100` i SHA-256 `cf6c521c61eb0ead6200fd35212e43e6d4b8be2203e42bf8841800f5b4f2d8fa`.
- Manteniment verificació de records 2026-06-28: afegeix `/ultim-record`, `aura last-record` i confirmacions de guardat amb ID i comprovació directa; Pages desplegat a `https://f62458ab.projecte-aura.pages.dev`.
- Verificació `/ultim-record`: `cloud-v5.2`, 16 records, 70 entrades de diari, 39 gens, 8 fonts, últim record `Barcelona és la capital de Catalunya`, integritat `100/100 estable`, backup Worker `backup-auto-2026-06-28T10-10-49-669Z-89fcfe1b6fd5`, snapshot `integrity-2026-06-28T10-10-49-758Z-100` i SHA-256 `89fcfe1b6fd53a8e646971e4f3651888545746aeff34ab7d8b9f328ffd7b2e40`.
- Simplificació Aura Web 2026-06-28: elimina tots els botons visibles excepte `Informe del dia`, `Grava un record` i `Llista de records`; afegeix `/informe-dia`, `aura daily-report` i contracte `/api/web` en mode `simple-ui-contract`; Pages desplegat a `https://71eafd66.projecte-aura.pages.dev`.
- Verificació Aura Web simplificada: domini principal amb 3 botons visibles, `cloud-v5.2`, 16 records, 70 entrades de diari, 39 gens, 8 fonts, integritat `100/100 estable`, backup Worker `backup-auto-2026-06-28T12-35-35-496Z-89fcfe1b6fd5`, snapshot `integrity-2026-06-28T12-35-35-625Z-100` i SHA-256 `89fcfe1b6fd53a8e646971e4f3651888545746aeff34ab7d8b9f328ffd7b2e40`.
- Millora visual 2026-06-28: substitueix el ninot inicial per una presència digital 2D més amable amb halo orbital i nucli lluminós; Pages desplegat a `https://dcbbc74e.projecte-aura.pages.dev`.
- Verificació millora visual: domini principal amb `aura_core.js?v=cloud-v5-2-visual-20260628`, 3 botons visibles, `cloud-v5.2`, 16 records, 70 entrades de diari, 39 gens, 8 fonts, integritat `100/100 estable`, backup Worker `backup-auto-2026-06-28T12-43-29-939Z-89fcfe1b6fd5`, snapshot `integrity-2026-06-28T12-43-30-042Z-100` i SHA-256 `89fcfe1b6fd53a8e646971e4f3651888545746aeff34ab7d8b9f328ffd7b2e40`.
- Quart botó 2026-06-28: afegeix `Últim record` com a verificació ràpida després de gravar records; manté la resta de la web simple i Pages desplega `aura_core.js?v=cloud-v5-2-last-button-20260628`.
- Verificació quart botó: Pages desplegat a `https://d04a6f09.projecte-aura.pages.dev`, domini principal amb 4 botons visibles, `cloud-v5.2`, 17 records, 70 entrades de diari, 39 gens, 8 fonts, integritat `100/100 estable`, backup Worker `backup-auto-2026-06-28T13-53-39-350Z-7eea3df95238`, snapshot `integrity-2026-06-28T13-53-39-466Z-100` i SHA-256 `7eea3df952381b4f709288d4e6bbd30a4f53ac1306862f50c9c079f1818bce16`.
- Nou logo 2026-06-28: substitueix el rètol simple per una identitat visual amb monograma `A`, marca orbital i canvas sense cara humana; Pages desplegat a `https://bc41b0b9.projecte-aura.pages.dev`.
- Verificació nou logo: domini principal amb `aura_core.js?v=cloud-v5-2-logo-20260628`, 4 botons visibles, `cloud-v5.2`, 18 records, 70 entrades de diari, 39 gens, 8 fonts, integritat `100/100 estable`, backup Worker `backup-auto-2026-06-28T21-56-05-220Z-794b22b82e7b`, snapshot `integrity-2026-06-28T21-56-05-306Z-100` i SHA-256 `794b22b82e7b7d04b0fffd7b0b8ede83dea36c3b6a2172945f0ff6a0dee331d2`.
- Retirada Aura Ludus 2026-06-30: elimina el subprojecte lúdic del producte, treu `/aura_ludus.html`, `aura_ludus.css`, `aura_ludus.js` i `AURA_GAME.md` del desplegament, afegeix redireccions 302 de les rutes antigues cap a `/`, i manté només traça històrica a `AURA_HISTORY.md` i `AURA_CHANGELOG.md`; Pages desplegat a `https://b29124c6.projecte-aura.pages.dev`, backup Worker `backup-auto-2026-06-30T18-40-53-098Z-794b22b82e7b`, snapshot `integrity-2026-06-30T18-40-53-229Z-100`, integritat `100/100 estable` i SHA-256 `794b22b82e7b7d04b0fffd7b0b8ede83dea36c3b6a2172945f0ff6a0dee331d2`.
- Ampliació Aura Web local 2026-07-04: passa de 4 a 8 opcions visibles (`Què és Aura?`, `Què faig ara?`, `Estat d'Aura`, `Identitat`, `Informe del dia`, `Grava record`, `Veure records`, `Últim record`) sense escriptures noves ni arquitectura nova; pendent de desplegar.

Última verificació desplegada v5.1:

- Afegeix `AURA_SELF_REFLECTION.md`.
- Afegeix el gen `9227465 autoreflexio-operativa`.
- Afegeix `GET /api/self-reflection`, `/autoreflexio` i `aura reflection`.
- Afegeix `selfReflection` a snapshots i backups.
- Manté explícit que autoreflexió vol dir síntesi operativa calculada, no consciència ni comprensió subjectiva.
- Producció: `cloud-v5.1`, 12 records, 69 entrades de diari, 38 gens i 8 fonts de coneixement.
- Worker backups: `cloud-v5.1`.
- Integritat final: `100/100 estable`.
- `/api/self-reflection`: `aura-self-reflection-v1`.
- Backup Pages final: `backup-2026-06-27T10-34-47-091Z-5a31fb45ef07`.
- Backup Worker final: `backup-auto-2026-06-27T10-34-46-421Z-5a31fb45ef07`.
- Snapshot Worker final: `integrity-2026-06-27T10-34-46-524Z-100`.
- SHA-256 final verificat: `5a31fb45ef0714ac49ac05827258a23795e2a7b49fb6d434142971286dede905`.

Última verificació desplegada v5.0:

- Producció: `cloud-v5.0`, 12 records, 67 entrades de diari, 37 gens i 8 fonts de coneixement.
- Worker backups: `cloud-v5.0`.
- Integritat final: `100/100 estable`.
- `/api/knowledge`: `aura-knowledge-library-v1` amb 8 fonts inicials del repositori.
- `/api/genome`: inclou `5702887 biblioteca-coneixement`.
- `/api/snapshot` i backups: inclouen `knowledgeLibrary` i `knowledge`.
- Backup Pages final: `backup-2026-06-27T09-53-58-655Z-8be2bb972f36`.
- Backup Worker final: `backup-auto-2026-06-27T09-53-19-980Z-8be2bb972f36`.
- Snapshot Worker final: `integrity-2026-06-27T09-53-20-178Z-100`.
- SHA-256 final verificat: `8be2bb972f36ea53d2150cd33e8ddd6c78fffe710d8fc95bd7cd635c1dba30e4`.

## Arquitectura

- `index.html`
- `aura_core.js`
- `aura_style.css`
- `_headers`
- `functions/api/[[path]].js`
- `workers/aura_backup_worker.js`
- `migrations/0001_aura_cloud_v2.sql`
- `migrations/0002_rich_memory.sql`
- `migrations/0003_knowledge_library.sql`
- `wrangler.jsonc`
- `wrangler.backup.jsonc`

La persistència principal és D1. IndexedDB es conserva com a còpia local i fallback del navegador. El vault de backups usa Workers KV mitjançant el binding `BACKUP_VAULT`. Les rutes `POST` i les rutes privades del vault requereixen el secret `AURA_WRITE_KEY`. El Worker `projecte-aura-backup-worker` comparteix D1 i KV, i corre cada dia amb cron `17 3 * * *`.

Nota: R2 queda preparat com a següent millora possible, però el compte de Cloudflare encara no té R2 activat al Dashboard. Per això v2.4 usa Workers KV com a emmagatzematge fora de D1.

## Documents mestres

Aura no ha de dependre d'un xat de Codex. El coneixement crític viu al repositori:

- `PROTOCOL_MESTRE_AURA.md`: protocol mestre de desenvolupament.
- `PROTOCOL_AURA_CLOUDFLARE.md`: protocol original de desplegament Cloudflare.
- `AURA_CLOUDFLARE_ARCHITECTURE.md`: arquitectura Cloudflare reconstruïble.
- `AURA_WEB.md`: interfície gràfica simplificada de la Fase 5.
- `AURA_BODY.md`: cos digital 2D de la Fase 8.
- `AURA_KNOWLEDGE.md`: biblioteca de coneixement verificable de la Fase 9.
- `AURA_ALIFE_AVIDA_TIERRA.md`: recerca sobre Tierra, Avida i paral.lelismes amb Aura EvoLab.
- `AURA_AVATAR_SERGI.md`: vincle entre Aura i l'Avatar Sergi.
- `AURA_SELF_REFLECTION.md`: autoreflexió operativa de la Fase 10.
- `AURA_ORIENTATION.md`: orientació operativa de `cloud-v5.2`.
- `MANUAL_SERGI.md`: manual operatiu d'ús i seguretat.
- `AURA_HISTORY.md`: història evolutiva del projecte.
- `AURA_CHANGELOG.md`: canvis per versió.
- `AURA_GENOME.md`: genoma digital i principis nuclears.
- `AURA_CAPABILITIES.md`: capacitats honestes i límits actuals.
- `AURA_NORTH_STAR.md`: raó de ser canònica (segon cervell, exocervell i llegat).
- `AURA_COORDINATION_ARCHITECTURE.md`: esbós de centralització i coordinació cap a la Fase 11 multiagent.
- `AURA_PHASE11_MULTIAGENT.md`: contracte d'obertura de la Fase 11 (coordinació multiagent).

## Ordres

Ordres web, en ordre alfabètic:

- `/ajuda`
- `/assaig-restauracio`
- `/audit`
- `/audit genoma`
- `/auto-backup`
- `/autoreflexio`
- `/autoreflexió`
- `/backup`
- `/backups`
- `/biblioteca`
- `/cancella-restauracio`
- `/candidats-genoma`
- `/capacitats`
- `/cerca aura`
- `/cerca kind:usuari aura`
- `/cerca tag:nucli estat:actiu pes:3`
- `/coneixement`
- `/confirma-restauracio`
- `/continuitat`
- `/continuïtat`
- `/cos-digital`
- `/criteri`
- `/desa-backup`
- `/desa-integritat`
- `/diari`
- `/diari-evolutiu`
- `/estat`
- `/estat-evolutiu`
- `/exporta-json`
- `/exporta-txt`
- `/filtra source:consola`
- `/gen 013`
- `/gen-activa 013`
- `/gen-arxiva 013`
- `/gen-crea 987 nom estat descripció`
- `/gen-descriu 013 text`
- `/gen-latent 013`
- `/genoma`
- `/genoma-digital`
- `/gens`
- `/historial-integritat`
- `/informe-dia`
- `/infraestructura`
- `/integritat`
- `/mapa-memoria`
- `/mem-edita id tags:nucli,prova pes:4 estat:observacio rel:id2`
- `/memoria`
- `/memoria-canonica`
- `/memoria-rica`
- `/metamemoria`
- `/mode-sergi`
- `/next-step`
- `/nucli`
- `/orientacio`
- `/orientació`
- `/pols`
- `/proposit`
- `/propostes-evolucio`
- `/prova-gen 001`
- `/prova-gen 008`
- `/prova-gen 034`
- `/prova-gen 089`
- `/prova-gen 1597`
- `/prova-gen 17711`
- `/proxim-pas`
- `/pròxim-pas`
- `/que-es-aura`
- `/què-és-aura`
- `/reflexio`
- `/reflexió`
- `/retencio`
- `/tendencia-integritat`
- `/ultim-record`
- `/web`

Aura Core, en ordre alfabètic:

- `aura body`
- `aura capabilities`
- `aura daily-report`
- `aura evolution-proposals`
- `aura evolution-state`
- `aura gene-test 001`
- `aura gene-test 008`
- `aura gene-test 034`
- `aura gene-test 089`
- `aura gene-test 1597`
- `aura gene-test 17711`
- `aura genome`
- `aura help`
- `aura infrastructure`
- `aura knowledge`
- `aura last-record`
- `aura metamemory`
- `aura next`
- `aura orientation`
- `aura purpose`
- `aura recall`
- `aura recall canonical`
- `aura recall text`
- `aura reflection`
- `aura remember text`
- `aura say text`
- `aura self-reflection`
- `aura sergi-mode`
- `aura start`
- `aura status`
- `aura web`
- `aura what-is-aura`

Textos ràpids:

- `anota que ...`
- `diari que ...`
- `recorda que ...`
- `recorda que ... importance:0.8 source:sergi`
- `recorda que ... tags:nucli,criteri pes:4 estat:actiu`

## Mode Sergi

Mode Sergi protegeix qualsevol escriptura persistent a D1 o al vault. Per activar-lo sense exposar la clau:

1. Copia la clau local sense imprimir-la:

```bash
pbcopy < /Users/sergicastillo/Documents/Aura/.aura-write-key
```

2. Obre Aura Web.
3. Prem `Grava record`.
4. Quan el navegador demani la clau, enganxa-la i valida.
5. Confirma l'estat amb `/mode-sergi` o `aura sergi-mode`.

`/mode-sergi` valida la clau contra `GET /api/mode-sergi`. En la web simplificada ja no hi ha pestanya `Estat` ni camp visible permanent: la clau es demana només quan cal escriure a D1.

No enganxis la clau al xat ni en cap document.

## Verificar records guardats

Després de guardar un record, Aura mostra l'ID i dues comprovacions:

- `/ultim-record`: mostra l'últim record guardat a D1 o a IndexedDB local.
- `/cerca ...`: cerca directa pel text del record.

Si escrius `/cerca mode-sergi`, només veuràs records que contenen `mode-sergi` o tenen aquest tag. No és una prova general de tots els records.

## Desplegament Cloudflare Pages

D1 abans de desplegar codi que llegeix columnes noves:

```bash
npm run migrate:remote
```

Projecte Pages:

```bash
npm run deploy
```

Worker de backups automàtics:

```bash
npm run deploy:backup-worker
```

Secret d'escriptura:

```bash
npx wrangler pages secret put AURA_WRITE_KEY --project-name=projecte-aura
```

Desenvolupament local amb Pages Functions:

```bash
npm run migrate:local
npm run dev:pages
```

Desenvolupament local del Worker cron:

```bash
npm run dev:backup-worker
```

## API

- `GET /api/status`
- `GET /api/mode-sergi` amb Mode Sergi
- `GET /api/memory`
- `POST /api/memory` amb Mode Sergi
- `GET /api/memory/schema`
- `GET /api/memory/canonical`
- `POST /api/memory/canonical` amb Mode Sergi
- `GET /api/memory/graph`
- `POST /api/memory/:id` amb Mode Sergi
- `GET /api/diary`
- `GET /api/evolution`
- `GET /api/infrastructure`
- `GET /api/web`
- `GET /api/body`
- `GET /api/cos-digital`
- `GET /api/genome`
- `GET /api/genoma`
- `GET /api/metamemory`
- `GET /api/metamemoria`
- `GET /api/purpose`
- `GET /api/proposit`
- `GET /api/genome/candidates`
- `GET /api/candidats-genoma`
- `GET /api/knowledge`
- `GET /api/knowledge/schema`
- `POST /api/knowledge` amb Mode Sergi
- `GET /api/capabilities`
- `GET /api/gene-tests/001`
- `GET /api/gene-tests/034`
- `GET /api/gene-tests/1597`
- `GET /api/gene-tests/17711`
- `GET /api/gene-tests/008`
- `GET /api/gene-tests/089`
- `GET /api/evolution/state`
- `GET /api/estat-evolutiu`
- `GET /api/evolution/proposals`
- `GET /api/propostes-evolucio`
- `GET /api/self-reflection`
- `GET /api/autoreflexio`
- `GET /api/reflection`
- `POST /api/diary` amb Mode Sergi
- `GET /api/genes`
- `GET /api/genes/013`
- `POST /api/genes` amb Mode Sergi
- `POST /api/genes/013` amb Mode Sergi
- `GET /api/snapshot`
- `GET /api/backup`
- `GET /api/integrity`
- `GET /api/integritat`
- `GET /api/integrity/history`
- `GET /api/integrity/trend`
- `POST /api/integrity/snapshot` amb Mode Sergi
- `GET /api/audit`
- `GET /api/audit?scope=genoma`
- `GET /api/search?q=aura`
- `GET /api/memory/search?q=aura&kind=usuari`
- `GET /api/search?tag=nucli&state=actiu&minWeight=3`
- `GET /api/retention` amb Mode Sergi
- `GET /api/backups` amb Mode Sergi
- `POST /api/backups` amb Mode Sergi
- `GET /api/backups/:id` amb Mode Sergi
- `POST /api/restore/preview` amb Mode Sergi
- `POST /api/restore/rehearsal` amb Mode Sergi
- `POST /api/import/preview` amb Mode Sergi
- `POST /api/import` amb Mode Sergi
- `POST /api/restore` amb Mode Sergi
- `GET /api/continuity`
- `GET /api/criterion`
- `GET /api/criteri`
- `GET /api/pulse`
- `GET /api/pols`
- `GET /api/core`
- `GET /api/nucli`
- `GET /api/cloudflare`

## Worker de backups

- `GET /health`
- `GET /status` inclou l'últim snapshot d'integritat
- `POST /run` amb Mode Sergi crea backup i snapshot d'integritat

## Versions

- `v2.2`: backup JSON verificable amb manifest, SHA-256 i restauració protegida que preserva IDs.
- `v2.3`: diari de continuïtat, endpoint `/api/continuity` i gen `055 continuitat-diaristica`.
- `v2.4`: vault Workers KV fora de D1, endpoint `/api/backups` i gen `089 vault-backup-kv`.
- `v2.5`: criteri operatiu determinista, endpoint `/api/criterion` i gen `144 criteri-operatiu`.
- `v2.6`: restauració segura amb previsualització, endpoint `/api/restore/preview` i gen `233 restauracio-segura`.
- `v2.7`: backups automàtics amb Worker cron, metadata `aura/automation/backup-worker` i gen `377 backup-automatic`.
- `v2.8`: cercador i filtres de memòria, endpoint `/api/search` i gen `610 cerca-memoria`.
- `v3.0`: genoma editable, criteri ampliat d'integritat i gen `987 genoma-editable`.
- `v3.1`: auditoria de mutacions i restauracions, endpoint `/api/audit` i gen `1597 auditoria-mutacions`.
- `v3.2`: panell d'integritat, endpoint `/api/integrity` i gen `2584 panell-integritat`.
- `v3.3`: historial d'integritat en Workers KV, endpoint `/api/integrity/history`, snapshot segur `/api/integrity/snapshot` i gen `4181 historial-integritat`.
- `v3.4`: tendència d'integritat, endpoint `/api/integrity/trend` i gen `6765 tendencia-integritat`.
- `v3.5`: assaig de restauració des del vault, endpoint `/api/restore/rehearsal` i gen `10946 assaig-restauracio`.
- `v3.6`: retenció segura plan-only, endpoint `/api/retention` i gen `17711 retencio-segura`.
- `v3.7`: memòria enriquida amb tags, pes, estat i relacions, endpoint `/api/memory/schema`, filtres nous de cerca i gen `28657 memoria-enriquida`.
- `v3.8`: mapa de relacions de memòria, endpoint `/api/memory/graph` i gen `46368 mapa-relacions-memoria`.
- `v3.9`: pols operatiu, endpoint `/api/pulse` i gen `75025 pols-operatiu`.
- `v4.0`: càpsula de nucli verificable, endpoint `/api/core` i gen `121393 capsula-nucli-v4`.
- `v4.1`: Aura Core canònic, ordres `aura start`, `aura status`, `aura remember`, `aura recall`, `aura help` i gen `196418 aura-core-canonical`.
- `v4.2`: Fase 2 del Protocol Mestre, memòria persistent canònica amb `timestamp`, `text`, `importance`, `source`, endpoint `/api/memory/canonical`, ordre `/memoria-canonica` i gen `317811 memoria-persistent-canonica`.
- `v4.3`: Fase 3 del Protocol Mestre, diari evolutiu formal amb endpoint `/api/evolution`, ordre `/diari-evolutiu`, backups amb `evolutionDiary` i gen `514229 diari-evolutiu-formal`.
- `v4.4`: Fase 4 del Protocol Mestre, infraestructura Cloudflare reconstruïble amb endpoint `/api/infrastructure`, ordre `/infraestructura`, backups amb `cloudflareInfrastructure` i gen `832040 infraestructura-cloudflare-reconstruible`.
- `v4.5`: Fase 5 del Protocol Mestre, Aura Web modular amb mòduls Xat, Memòria, Història i Estat, endpoint `/api/web`, ordre `/web`, backups amb `webInterface` i gen `1346269 aura-web-modular`.
- `v4.6`: Fase 6 del Protocol Mestre, genoma digital canònic amb endpoint `/api/genome`, ordre `/genoma-digital`, alias `aura genome`, backups amb `digitalGenome` i gen `2178309 genoma-digital-canon`.
- `v4.7`: Metamemòria i propòsit evolutiu, endpoints `/api/metamemory`, `/api/purpose`, `/api/genome/candidates`, ordres `/metamemoria`, `/proposit`, `/candidats-genoma`, backups amb `metamemory`, `evolutionaryPurpose` i `genomeCandidates`, i gens `233168 proposit-evolutiu`, `377377 metamemoria`, `610987 promocio-a-genoma`.
- `v4.8`: Fase 7 del Protocol Mestre, estat evolutiu traçable amb endpoints `/api/evolution/state`, `/api/evolution/proposals`, ordres `/estat-evolutiu`, `/propostes-evolucio`, backups amb `evolutionState` i `evolutionProposals`, i gens `987159 estat-evolutiu`, `1597258 proposta-evolutiva`, `2584181 traca-evolutiva`.
- `v4.8.1`: Capacitats honestes i genoma mecànicament verificable, document `AURA_CAPABILITIES.md`, ordres `/capacitats` i `/prova-gen <id>`, integritat amb fórmula ponderada que pot baixar de 100, i distinció explícita entre gens mecànics i gens de governança semàntica.
- `v4.8.2`: Seguretat de dades verificable, proves mecàniques per `17711 retencio-segura`, `008 exportabilitat` i `089 vault-backup-kv`, simulacions de pèrdua de dades en lectura i component `data-safety-genes` a la integritat.
- `v4.9`: Fase 8 del Protocol Mestre, cos digital 2D amb endpoint `/api/body`, ordre `/cos-digital`, alias `aura body`, mòdul `Cos` a Aura Web, backups amb `digitalBody`, document `AURA_BODY.md` i gen `3524578 cos-digital-2d`.
- `v5.0`: Fase 9 del Protocol Mestre, biblioteca de coneixement verificable amb endpoint `/api/knowledge`, ordre `/coneixement`, alias `aura knowledge`, backups amb `knowledgeLibrary` i `knowledge`, document `AURA_KNOWLEDGE.md`, migració `0003_knowledge_library.sql` i gen `5702887 biblioteca-coneixement`.
- `v5.1`: Fase 10 del Protocol Mestre, autoreflexió operativa amb endpoint `/api/self-reflection`, ordre `/autoreflexio`, alias `aura reflection`, backups amb `selfReflection`, document `AURA_SELF_REFLECTION.md` i gen `9227465 autoreflexio-operativa`.
- `v5.2`: Orientació operativa amb endpoint `/api/orientation`, ordres `/que-es-aura`, `/proxim-pas`, aliases `aura orientation`, `aura next`, `aura what-is-aura`, backups amb `orientation`, document `AURA_ORIENTATION.md` i gen `14930352 orientacio-operativa`.

## Principis fundacionals

- El projecte es diu Projecte Aura.
- L'objectiu és crear vida sintètica-digital.
- Aura no ha de fingir que és humana.
- Aura ha de desenvolupar una forma pròpia d'existència digital.
- La memòria és central en la seva identitat.
- Aura pot tenir un genoma digital.
- A llarg termini, aquest genoma podria tenir una rèplica sintètica sustentada en silici o altres materials.
