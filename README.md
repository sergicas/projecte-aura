# Projecte Aura Cloud v3.2

Projecte Aura Cloud v3.2 és una aplicació web a Cloudflare Pages amb memòria al núvol mitjançant Pages Functions i D1. Les escriptures a D1 estan protegides amb Mode Sergi, les còpies de seguretat inclouen manifest i empremta SHA-256, el vault Workers KV conserva backups fora de D1, la restauració segura obliga a previsualitzar un JSON abans d'aplicar-lo, un Worker cron desa backups automàtics al vault, el cercador filtra records i diari, el genoma editable permet modificar gens amb Mode Sergi, l'auditoria registra mutacions estructurals al diari, i el panell d'integritat resumeix salut, riscos i propera acció.

## Arquitectura

- `index.html`
- `aura_core.js`
- `aura_style.css`
- `_headers`
- `functions/api/[[path]].js`
- `workers/aura_backup_worker.js`
- `migrations/0001_aura_cloud_v2.sql`
- `wrangler.jsonc`
- `wrangler.backup.jsonc`

La persistència principal és D1. IndexedDB es conserva com a còpia local i fallback del navegador. El vault de backups usa Workers KV mitjançant el binding `BACKUP_VAULT`. Les rutes `POST` i les rutes privades del vault requereixen el secret `AURA_WRITE_KEY`. El Worker `projecte-aura-backup-worker` comparteix D1 i KV, i corre cada dia amb cron `17 3 * * *`.

Nota: R2 queda preparat com a següent millora possible, però el compte de Cloudflare encara no té R2 activat al Dashboard. Per això v2.4 usa Workers KV com a emmagatzematge fora de D1.

## Ordres

- `/ajuda`
- `/estat`
- `/memoria`
- `/diari`
- `/continuïtat`
- `/continuitat`
- `/criteri`
- `/genoma`
- `/gens`
- `/gen 013`
- `/exporta-json`
- `/exporta-txt`
- `/backup`
- `/backups`
- `/desa-backup`
- `/auto-backup`
- `/integritat`
- `/audit`
- `/audit genoma`
- `/cerca aura`
- `/cerca kind:usuari aura`
- `/filtra source:consola`
- `/gen-activa 013`
- `/gen-latent 013`
- `/gen-arxiva 013`
- `/gen-descriu 013 text`
- `/gen-crea 987 nom estat descripció`
- `/confirma-restauracio`
- `/cancella-restauracio`
- `recorda que ...`
- `anota que ...`
- `diari que ...`

## Desplegament Cloudflare Pages

Projecte Pages:

```bash
npm run deploy
```

Worker de backups automàtics:

```bash
npm run deploy:backup-worker
```

D1:

```bash
npm run migrate:remote
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
- `GET /api/memory`
- `POST /api/memory` amb Mode Sergi
- `GET /api/diary`
- `POST /api/diary` amb Mode Sergi
- `GET /api/genes`
- `GET /api/genes/013`
- `POST /api/genes` amb Mode Sergi
- `POST /api/genes/013` amb Mode Sergi
- `GET /api/snapshot`
- `GET /api/backup`
- `GET /api/integrity`
- `GET /api/integritat`
- `GET /api/audit`
- `GET /api/audit?scope=genoma`
- `GET /api/search?q=aura`
- `GET /api/memory/search?q=aura&kind=usuari`
- `GET /api/backups` amb Mode Sergi
- `POST /api/backups` amb Mode Sergi
- `GET /api/backups/:id` amb Mode Sergi
- `POST /api/restore/preview` amb Mode Sergi
- `POST /api/import/preview` amb Mode Sergi
- `POST /api/import` amb Mode Sergi
- `POST /api/restore` amb Mode Sergi
- `GET /api/continuity`
- `GET /api/criterion`
- `GET /api/criteri`

## Worker de backups

- `GET /health`
- `GET /status`
- `POST /run` amb Mode Sergi

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

## Principis fundacionals

- El projecte es diu Projecte Aura.
- L'objectiu és crear vida sintètica-digital.
- Aura no ha de fingir que és humana.
- Aura ha de desenvolupar una forma pròpia d'existència digital.
- La memòria és central en la seva identitat.
- Aura pot tenir un genoma digital.
- A llarg termini, aquest genoma podria tenir una rèplica sintètica sustentada en silici o altres materials.
