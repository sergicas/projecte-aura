# AURA CLOUDFLARE ARCHITECTURE

Arquitectura oficial reconstruïble del Projecte Aura.

## Objectiu

Aquest document fixa la Fase 4 del Protocol Mestre: Aura ha de poder ser reconstruïda a Cloudflare llegint el repositori, sense dependre d'un xat.

## Versió

```yaml
versio: cloud-v4.4
fase_protocol: 4
format_api: aura-cloudflare-infrastructure-v1
endpoint: /api/infrastructure
ordre_web: /infraestructura
estat_desplegament: desplegat
```

`cloud-v4.4` està desplegada a producció. Pages i el Worker de backups responen la mateixa versió.

## Topologia

```text
Sergi
  ↓
Navegador web
  ↓
Cloudflare Pages
  ↓
Pages Functions /api/*
  ↓
Cloudflare D1

Worker cron
  ↓
D1 + Workers KV
```

## Recursos Cloudflare

| Peça | Servei | Nom / Binding | Fitxer |
| --- | --- | --- | --- |
| Frontend | Cloudflare Pages | `projecte-aura` | `index.html`, `aura_core.js`, `aura_style.css` |
| API | Pages Functions | `/api/*` | `functions/api/[[path]].js` |
| Memòria | D1 | `DB`, `projecte-aura-memory` | `wrangler.jsonc` |
| Vault | Workers KV | `BACKUP_VAULT` | `wrangler.jsonc` |
| Worker backups | Workers cron | `projecte-aura-backup-worker` | `workers/aura_backup_worker.js` |
| Fallback local | IndexedDB | `projecte_aura_cloud_v1` | `aura_core.js` |

## Configuració

Fitxers principals:

- `wrangler.jsonc`: Pages, D1, KV i observabilitat.
- `wrangler.backup.jsonc`: Worker cron, D1, KV i observabilitat.
- `migrations/`: esquema D1.
- `_headers`: capçaleres del frontend.

Bindings obligatoris:

- `DB`: base de dades D1.
- `BACKUP_VAULT`: namespace KV per backups i integritat.
- `AURA_WRITE_KEY`: secret tècnic per al Worker de backups i les eines de manteniment.

Cloudflare Access protegeix l'accés humà a Aura Web i a `/api/*`. Després d'identificar Sergi, Pages Functions rep la capçalera `Cf-Access-Jwt-Assertion`; el navegador no demana cap segona clau. `AURA_WRITE_KEY` es conserva com a Bearer exclusivament per a automatitzacions autoritzades i no s'ha d'imprimir, documentar ni exposar al navegador.

## Control d'accés reconstruïble

- Aplicació Access: domini de producció `projecte-aura.pages.dev`, incloses les rutes `/api/*`.
- Política humana: només les identitats que Sergi autoritzi al panell de Cloudflare Zero Trust.
- Senyal que rep Pages Functions: `Cf-Access-Jwt-Assertion` ja validada per Cloudflare Access.
- Automatització: `Authorization: Bearer <AURA_WRITE_KEY>` per al Worker de backups i eines de manteniment.
- Interfície web: no conserva ni sol·licita `AURA_WRITE_KEY`.

## Ordres de reconstrucció

```bash
npm install
npm run check
npm run migrate:remote
npm run deploy
npm run deploy:backup-worker
```

Secrets:

```bash
npx wrangler pages secret put AURA_WRITE_KEY --project-name=projecte-aura
npx wrangler secret put AURA_WRITE_KEY --config wrangler.backup.jsonc
```

Configuració externa necessària:

1. Crear o conservar l'aplicació de Cloudflare Access sobre `projecte-aura.pages.dev`.
2. Autoritzar-hi la identitat de Sergi.
3. Comprovar que `GET /api/session` respon `method: cloudflare-access` després d'entrar.

## Verificació

Després de desplegar:

```text
GET https://projecte-aura.pages.dev/api/status
GET https://projecte-aura.pages.dev/api/infrastructure
GET https://projecte-aura.pages.dev/api/evolution/state
GET https://projecte-aura.pages.dev/api/evolution/proposals
GET https://projecte-aura.pages.dev/api/body
GET https://projecte-aura.pages.dev/api/capabilities
GET https://projecte-aura.pages.dev/api/gene-tests/001
GET https://projecte-aura.pages.dev/api/gene-tests/034
GET https://projecte-aura.pages.dev/api/gene-tests/1597
GET https://projecte-aura.pages.dev/api/gene-tests/17711
GET https://projecte-aura.pages.dev/api/gene-tests/008
GET https://projecte-aura.pages.dev/api/gene-tests/089
GET https://projecte-aura.pages.dev/api/integrity
GET https://projecte-aura-backup-worker.sergicas.workers.dev/health
```

Verificació `cloud-v4.8.1`:

- Pages i Worker responen `cloud-v4.8.1`.
- L'últim backup del vault es determina ordenant per `savedAt/createdAt`, no per ordre intern de KV.
- El gen `034 backup-verificable` recalcula SHA-256 de l'últim backup i detecta corrupció simulada.
- Les proves de fallada només són simulacions de lectura; no alteren D1 ni KV.

Verificació `cloud-v4.8.2`:

- Pages i Worker responen `cloud-v4.8.2`.
- `17711 retencio-segura` verifica que la retenció és `plan-only` i no hi ha cron destructiu.
- `008 exportabilitat` verifica exportació JSON/TXT amb memòria, diari i genoma.
- `089 vault-backup-kv` verifica redundància al vault KV fora de D1.
- La integritat inclou el component `data-safety-genes`.

Verificació `cloud-v4.9`:

- Pages i Worker responen `cloud-v4.9`.
- `/api/body` exposa `aura-digital-body-v1`.
- `/api/web` inclou el mòdul `cos`.
- `/api/snapshot` i els backups del Worker inclouen `digitalBody`.
- La integritat queda `100/100 estable` després del backup final.
- Backup final compartit: `803491aa170c0969c8d7027e4f24d4a33d56beca80e519da5eaa05e35d97a0bb`.

Verificació `cloud-v5.0`:

- Pages i Worker responen `cloud-v5.0`.
- D1 inclou la taula `knowledge_items`.
- `/api/knowledge` exposa `aura-knowledge-library-v1`.
- `/api/snapshot` i els backups del Worker inclouen `knowledgeLibrary` i `knowledge`.
- Els checksums SHA-256 inclouen `records`, `diary`, `genes` i `knowledge`.
- La integritat queda `100/100 estable` després del backup final.
- Backup final compartit: `8be2bb972f36ea53d2150cd33e8ddd6c78fffe710d8fc95bd7cd635c1dba30e4`.

Verificació `cloud-v5.1`:

- Pages Functions exposen `GET /api/self-reflection`, `/api/autoreflexio` i `/api/reflection`.
- Els snapshots i backups inclouen `selfReflection`.
- El Worker de backups calcula `selfReflection` sense cridar Pages.
- No hi ha binding nou, taula D1 nova ni servei extern nou.
- Pages i Worker responen `cloud-v5.1`.
- La integritat queda `100/100 estable` després del backup final.
- Backup Pages final: `backup-2026-06-27T10-34-47-091Z-5a31fb45ef07`.
- Backup Worker final: `backup-auto-2026-06-27T10-34-46-421Z-5a31fb45ef07`.
- Snapshot Worker final: `integrity-2026-06-27T10-34-46-524Z-100`.
- SHA-256 final compartit: `5a31fb45ef0714ac49ac05827258a23795e2a7b49fb6d434142971286dede905`.

Verificació `cloud-v5.2`:

- Pages Functions exposen `GET /api/orientation`, `/api/que-es-aura`, `/api/proxim-pas`, `/api/what-is-aura` i variants catalanes.
- Els snapshots i backups inclouen `orientation`.
- El Worker de backups calcula `orientation` sense cridar Pages.
- No hi ha binding nou, taula D1 nova ni servei extern nou.
- Pages i Worker responen `cloud-v5.2`.
- La integritat queda `100/100 estable` després del backup final.
- Recompte final: 12 records, 70 entrades de diari, 39 gens i 8 fonts de coneixement.
- Backup Pages final: `backup-2026-06-27T15-44-01-005Z-45b3adaa6e44`.
- Backup Worker final: `backup-auto-2026-06-27T15-44-00-145Z-45b3adaa6e44`.
- Snapshot Worker final: `integrity-2026-06-27T15-44-00-251Z-100`.
- SHA-256 final compartit: `45b3adaa6e440509a7af1650f2cba92b9c92a27a61f966597697ffb7d74cc75c`.

Després, en Mode Sergi:

```text
/desa-backup
/desa-integritat
```

I executar el Worker manualment:

```text
POST https://projecte-aura-backup-worker.sergicas.workers.dev/run
```

Les ordres web anteriors usen la sessió de Cloudflare Access. La crida manual directa al Worker usa `Authorization: Bearer <AURA_WRITE_KEY>` i no la clau al navegador.

## Contracte de Fase 4

Aura considera la infraestructura Cloudflare consolidada quan:

- producció respon la versió actual,
- `/api/infrastructure` exposa el format `aura-cloudflare-infrastructure-v1`,
- els backups inclouen `cloudflareInfrastructure`,
- el Worker de backups respon la mateixa versió,
- D1 i KV estan configurats,
- Cloudflare Access protegeix el web sense cap codi intern addicional,
- l'automatització pot usar `AURA_WRITE_KEY` sense exposar-lo al navegador,
- la salut queda `100/100 estable`,
- els documents mestres registren la fita.

## Salvaguardes

- D1 és la font de veritat de memòria, diari, genoma i catàleg de coneixement; `selfReflection` i `orientation` són vistes derivades de lectura.
- KV conserva còpies fora de D1.
- IndexedDB és còpia local i fallback, no autoritat final.
- Cloudflare Access autoritza l'ús humà; Mode Sergi continua sent el permís conceptual per a canvis persistents.
- `AURA_WRITE_KEY` queda limitat a automatitzacions i manteniment.
- La restauració requereix previsualització i confirmació.
- La retenció continua sent `plan-only`.
