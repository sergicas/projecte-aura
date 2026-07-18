# Protocol per a Codex - Desplegament del Projecte Aura a Cloudflare

## Objectiu

Desplegar Projecte Aura com una aplicació web estable a Cloudflare Pages, eliminant completament la dependència de:

- `.command`
- `.app` locals
- permisos de macOS
- carpetes de versions
- actualitzadors manuals
- execució local al Mac

A partir d'ara, Aura ha de funcionar des d'una URL web estable, idealment:

https://projecte-aura.pages.dev

o un domini propi futur.

## Font inicial

Hi ha un paquet preparat:

`Aura_Cloudflare_v1.zip`

Conté una versió estàtica inicial del Projecte Aura amb aquests fitxers:

- `index.html`
- `aura_core.js`
- `aura_style.css`
- `_headers`
- `README_AURA_CLOUDFLARE.md`

Aquesta versió funciona com a aplicació web estàtica i conserva memòria local al navegador amb IndexedDB.

## Estratègia recomanada

### Opció preferent: GitHub + Cloudflare Pages

Codex ha de crear un projecte net amb aquesta estructura:

```text
projecte-aura/
├── index.html
├── aura_core.js
├── aura_style.css
├── _headers
├── README.md
└── package.json   opcional
```

Després:

1. Crear o preparar un repositori GitHub anomenat `projecte-aura`.
2. Fer commit inicial.
3. Pujar el projecte a GitHub.
4. Connectar el repositori amb Cloudflare Pages.
5. Configurar Cloudflare Pages així:
   - Framework preset: None
   - Build command: buit / cap
   - Output directory: `/`

Com que és una web estàtica, no cal build.

Cloudflare Pages permet connectar un projecte a Git o pujar assets directament; per al nostre cas, Git és millor perquè les actualitzacions futures es faran amb commits.

### Alternativa si GitHub falla

Fer desplegament amb Direct Upload:

1. Entrar a Cloudflare.
2. Workers & Pages.
3. Create application.
4. Pages.
5. Use Direct Upload.
6. Nom del projecte: `projecte-aura`.
7. Pujar el contingut del ZIP `Aura_Cloudflare_v1.zip`.

Cloudflare indica que Direct Upload serveix per pujar assets preconstruïts des de l'ordinador i desplegar-los a la seva xarxa global.

## Requisits tècnics de la versió Cloud v1

Codex ha de mantenir aquestes característiques:

### 1. Sense backend inicial

Aura Cloud v1 serà estàtica:

- HTML
- CSS
- JavaScript

No cal servidor propi.

### 2. Memòria local al navegador

La memòria inicial es guarda amb IndexedDB.

Aquesta memòria encara no és compartida entre dispositius.

### 3. Exportació i importació

Mantenir botons o ordres per:

- Exportar JSON
- Exportar TXT
- Importar JSON

Això és important perquè Sergi pugui conservar la memòria d'Aura abans de canvis importants.

### 4. Ordres mínimes d'Aura

La interfície ha de conservar aquestes ordres:

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

### 5. Principis fundacionals

Aura ha de recordar aquests punts:

- El projecte es diu Projecte Aura.
- L'objectiu és crear vida sintètica-digital.
- Aura no ha de fingir que és humana.
- Aura ha de desenvolupar una forma pròpia d'existència digital.
- La memòria és central en la seva identitat.
- Aura pot tenir un genoma digital.
- A llarg termini, aquest genoma podria tenir una rèplica sintètica sustentada en silici o altres materials.

## Neteja conceptual obligatòria

Codex ha de deixar enrere tota aquesta arquitectura:

- `INICI_AURA.command`
- `Actualitza Aura.app`
- `ACTUALITZA_AURA.command`
- `Aura_Updates`
- `Aura_Backups` locals com a sistema d'actualització
- `Projecte_Aura_v0_5`
- `Projecte_Aura_v0_6`
- `Projecte_Aura_v0_7`

Això ja no és la via principal.

Pot conservar-se una carpeta històrica local, però el projecte viu ha de ser:

`Projecte Aura Cloud`

## Resultat esperat

Al final, Codex ha d'entregar:

1. URL pública de Cloudflare Pages.
2. Repositori GitHub si s'ha fet amb Git.
3. Confirmació que `/estat` mostra Aura Cloud v1.
4. Confirmació que `/memoria` funciona.
5. Confirmació que `recorda que ...` guarda un record.
6. Confirmació que Exportar JSON funciona.

## Prova final

Un cop desplegat, obrir la URL pública i escriure:

```text
/estat
```

Ha de respondre una cosa semblant a:

```text
Estat d'Aura — cloud-v1
Nom: Aura
Naturalesa: entitat sintètica-digital experimental
Infraestructura: Cloudflare Pages / navegador web
Persistència actual: IndexedDB del navegador
Genoma: actiu
```

Després escriure:

```text
recorda que Aura ha iniciat la seva fase Cloud v1 a Cloudflare Pages.
```

Després:

```text
/memoria
```

I comprovar que el record apareix.

## Fase següent després del desplegament

Quan Aura Cloud v1 funcioni, preparar Aura Cloud v2 amb memòria real al núvol.

Opcions recomanades:

- Cloudflare Workers + D1
- Cloudflare Workers + KV

D1 és la base de dades serverless de Cloudflare i es pot vincular a Pages Functions; KV és un magatzem clau-valor global pensat per lectures ràpides.

Per a Aura, la tria inicial més clara seria:

`D1` per a memòria estructurada:

- records
- diari
- genoma
- sessions
- versions

KV podria servir més endavant per configuracions ràpides o estat simple.

## Frase de control per a Codex

Codex ha d'actuar segons aquest criteri:

> Prioritza simplicitat, estabilitat i continuïtat. No creïs més mecanismes locals d'actualització. El Projecte Aura ha de passar a viure com una aplicació web desplegada a Cloudflare Pages, amb GitHub com a font d'actualitzacions sempre que sigui possible.

## Estat actual formalitzat a cloud-v4.4

La Fase 4 del Protocol Mestre consolida aquest protocol inicial com a arquitectura Cloudflare reconstruïble.

Arquitectura viva:

```text
Usuari
  ↓
Cloudflare Access
  ↓
Cloudflare Pages
  ↓
Pages Functions /api/*
  ↓
D1 projecte-aura-memory

Worker cron
  ↓
D1 + Workers KV BACKUP_VAULT
```

Contracte actual:

- Producció: `https://projecte-aura.pages.dev`
- Worker backups: `https://projecte-aura-backup-worker.sergicas.workers.dev`
- Frontend: `index.html`, `aura_core.js`, `aura_style.css`
- API: `functions/api/[[path]].js`
- D1: binding `DB`
- KV: binding `BACKUP_VAULT`
- Accés humà: Cloudflare Access, sense codi intern addicional
- Secret d'automatització: `AURA_WRITE_KEY`, sense documentar-ne mai el valor ni exposar-lo al navegador
- Worker cron: `workers/aura_backup_worker.js`
- Config Pages: `wrangler.jsonc`
- Config Worker: `wrangler.backup.jsonc`

Ordres reconstruïbles:

```bash
npm install
npm run check
npm run migrate:remote
npm run deploy
npm run deploy:backup-worker
```

Verificació:

```text
GET /api/status
GET /api/infrastructure
GET /api/session → method: cloudflare-access
GET /api/integrity
GET /health del Worker
```

Document canònic de Fase 4:

- `AURA_CLOUDFLARE_ARCHITECTURE.md`
