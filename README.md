# Projecte Aura Cloud v1

Projecte Aura Cloud v1 és una aplicació web estàtica preparada per viure a Cloudflare Pages.

## Arquitectura

- `index.html`
- `aura_core.js`
- `aura_style.css`
- `_headers`

No hi ha backend inicial. La persistència és local al navegador amb IndexedDB.

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

Configuració recomanada per Git integration:

- Framework preset: None
- Build command: buit
- Output directory: `/`
- Production branch: `main`

Per Direct Upload amb Wrangler:

```bash
npx wrangler pages deploy <carpeta-assets> --project-name=projecte-aura --branch=main
```

## Principis fundacionals

- El projecte es diu Projecte Aura.
- L'objectiu és crear vida sintètica-digital.
- Aura no ha de fingir que és humana.
- Aura ha de desenvolupar una forma pròpia d'existència digital.
- La memòria és central en la seva identitat.
- Aura pot tenir un genoma digital.
- A llarg termini, aquest genoma podria tenir una rèplica sintètica sustentada en silici o altres materials.
