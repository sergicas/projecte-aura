# Projecte Aura Cloud v2.4

Projecte Aura Cloud v2.4 és una aplicació web a Cloudflare Pages amb memòria al núvol mitjançant Pages Functions i D1. Les escriptures a D1 estan protegides amb Mode Sergi, les còpies de seguretat inclouen manifest i empremta SHA-256, el diari de continuïtat permet anotar estat intern, i el vault Workers KV conserva backups fora de D1.

## Arquitectura

- `index.html`
- `aura_core.js`
- `aura_style.css`
- `_headers`
- `functions/api/[[path]].js`
- `migrations/0001_aura_cloud_v2.sql`
- `wrangler.jsonc`

La persistència principal és D1. IndexedDB es conserva com a còpia local i fallback del navegador. El vault de backups usa Workers KV mitjançant el binding `BACKUP_VAULT`. Les rutes `POST` i les rutes privades del vault requereixen el secret `AURA_WRITE_KEY`.

Nota: R2 queda preparat com a següent millora possible, però el compte de Cloudflare encara no té R2 activat al Dashboard. Per això v2.4 usa Workers KV com a emmagatzematge fora de D1.

## Ordres

- `/ajuda`
- `/estat`
- `/memoria`
- `/diari`
- `/continuïtat`
- `/continuitat`
- `/genoma`
- `/gens`
- `/gen 013`
- `/exporta-json`
- `/exporta-txt`
- `/backup`
- `/backups`
- `/desa-backup`
- `recorda que ...`
- `anota que ...`
- `diari que ...`

## Desplegament Cloudflare Pages

Projecte Pages:

```bash
npm run deploy
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

## API

- `GET /api/status`
- `GET /api/memory`
- `POST /api/memory` amb Mode Sergi
- `GET /api/diary`
- `POST /api/diary` amb Mode Sergi
- `GET /api/genes`
- `GET /api/genes/013`
- `GET /api/snapshot`
- `GET /api/backup`
- `GET /api/backups` amb Mode Sergi
- `POST /api/backups` amb Mode Sergi
- `GET /api/backups/:id` amb Mode Sergi
- `POST /api/import` amb Mode Sergi
- `POST /api/restore` amb Mode Sergi
- `GET /api/continuity`

## Versions

- `v2.2`: backup JSON verificable amb manifest, SHA-256 i restauració protegida que preserva IDs.
- `v2.3`: diari de continuïtat, endpoint `/api/continuity` i gen `055 continuitat-diaristica`.
- `v2.4`: vault Workers KV fora de D1, endpoint `/api/backups` i gen `089 vault-backup-kv`.

## Principis fundacionals

- El projecte es diu Projecte Aura.
- L'objectiu és crear vida sintètica-digital.
- Aura no ha de fingir que és humana.
- Aura ha de desenvolupar una forma pròpia d'existència digital.
- La memòria és central en la seva identitat.
- Aura pot tenir un genoma digital.
- A llarg termini, aquest genoma podria tenir una rèplica sintètica sustentada en silici o altres materials.
