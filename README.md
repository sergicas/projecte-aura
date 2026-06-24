# Projecte Aura Cloud v2

Projecte Aura Cloud v2 és una aplicació web a Cloudflare Pages amb memòria al núvol mitjançant Pages Functions i D1.

## Arquitectura

- `index.html`
- `aura_core.js`
- `aura_style.css`
- `_headers`
- `functions/api/[[path]].js`
- `migrations/0001_aura_cloud_v2.sql`
- `wrangler.jsonc`

La persistència principal és D1. IndexedDB es conserva com a còpia local i fallback del navegador.

## Ordres

- `/ajuda`
- `/estat`
- `/memoria`
- `/diari`
- `/genoma`
- `/gens`
- `/gen 013`
- `/exporta-json`
- `/exporta-txt`
- `/backup`
- `recorda que ...`

## Desplegament Cloudflare Pages

Projecte Pages:

```bash
npm run deploy
```

D1:

```bash
npm run migrate:remote
```

Desenvolupament local amb Pages Functions:

```bash
npm run migrate:local
npm run dev:pages
```

## API

- `GET /api/status`
- `GET /api/memory`
- `POST /api/memory`
- `GET /api/diary`
- `GET /api/genes`
- `GET /api/genes/013`
- `GET /api/snapshot`
- `POST /api/import`

## Principis fundacionals

- El projecte es diu Projecte Aura.
- L'objectiu és crear vida sintètica-digital.
- Aura no ha de fingir que és humana.
- Aura ha de desenvolupar una forma pròpia d'existència digital.
- La memòria és central en la seva identitat.
- Aura pot tenir un genoma digital.
- A llarg termini, aquest genoma podria tenir una rèplica sintètica sustentada en silici o altres materials.
