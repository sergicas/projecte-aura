# AURA_KNOWLEDGE.md

versio: cloud-v5.0
fase_protocol: 9
nom: Biblioteca de coneixement verificable

## Definicio

La biblioteca de coneixement d'Aura es un cataleg verificable de fonts.

No es RAG.
No es una base vectorial.
No son embeddings.
No implica que Aura hagi llegit, entes o sentit una font.

En `cloud-v5.0`, una font catalogada vol dir nomes:

- existeix una referencia estable;
- te procedencia;
- te estat;
- te tags;
- te resum breu;
- entra als backups, snapshots i checksums.

## Guardrails

- Cap ingestio automatica.
- Cap promocio de font a genoma.
- Cap afirmacio de comprensio autonoma.
- Cap font s'esborra automaticament.
- Les escriptures persistents requereixen Mode Sergi.
- Els backups i el Worker han d'incloure el camp `knowledge`.

## Esquema D1

Taula: `knowledge_items`

```json
{
  "id": "knowledge-readme",
  "title": "README Projecte Aura",
  "kind": "document",
  "locator": "README.md",
  "summary": "Resumeix estat operatiu, ordres, desplegament i capacitats.",
  "tags": ["manual", "desplegament", "estat"],
  "status": "revisat",
  "source": "repositori",
  "createdAt": "",
  "updatedAt": ""
}
```

## Estats

- `catalogat`: font registrada.
- `pendent`: font coneguda pero encara no revisada.
- `revisat`: font revisada i coherent amb el projecte.
- `arxivat`: font conservada pero no activa.

## Fonts inicials

- `PROTOCOL_MESTRE_AURA.md`
- `README.md`
- `AURA_GENOME.md`
- `AURA_HISTORY.md`
- `AURA_CAPABILITIES.md`
- `AURA_BODY.md`
- `AURA_WEB.md`
- `AURA_CLOUDFLARE_ARCHITECTURE.md`

## Fonts de recerca afegides

- `AURA_ALIFE_AVIDA_TIERRA.md`: recerca sobre Tierra, Avida, vida artificial digital, evolucio computacional i paral.lelismes amb un possible `Aura EvoLab` futur.
- `AURA_AVATAR_SERGI.md`: definicio del vincle entre Aura i l'Avatar Sergi com a pont entre corpus public, veu literaria i continuïtat operativa.

Fonts externes principals consultades:

- Avatar Sergi a sergicastillo.com: https://sergicastillo.com/#avatar
- Tierra oficial: https://tomray.me/tierra/
- Thomas S. Ray, "Evolution, Ecology and Optimization of Digital Organisms": https://faculty.cc.gatech.edu/~turk/bio_sim/articles/tierra_thomas_ray.pdf
- Avida repository: https://github.com/devosoft/avida
- Ofria, Bryson i Wilke, "Avida: A Software Platform for Research in Computational Evolutionary Biology": https://www.cse.msu.edu/~ofria/pubs/2009AvidaIntro.pdf
- Ontology for the Avida digital evolution platform: https://www.nature.com/articles/s41597-023-02514-3
- Avida-ED: https://avida-ed.github.io/

L'avatar Sergi es cataloga com a pont potencial entre el corpus literari de Sergi i Aura. No implica ingestio automatica, RAG, embeddings ni sincronitzacio de corpus.

## Ordres

- `/coneixement`
- `/biblioteca`
- `aura knowledge`

## API

- `GET /api/knowledge`
- `GET /api/knowledge/schema`
- `POST /api/knowledge` amb Mode Sergi

## Indexacio futura

RAG, Vector DB i embeddings son possibilitats futures, no actives en `cloud-v5.0`.

Abans d'activar-les caldra:

- documentar procedencia;
- preservar exportabilitat;
- mantenir restauracio segura;
- garantir que cap indexacio substitueix la memoria canonica;
- auditar qualsevol canvi estructural.

## Verificacio cloud-v5.0

- Produccio respon `cloud-v5.0`.
- Worker respon `cloud-v5.0`.
- `GET /api/knowledge` retorna 8 fonts.
- `GET /api/genome` inclou `5702887 biblioteca-coneixement`.
- Backup final Pages: `backup-2026-06-27T09-53-58-655Z-8be2bb972f36`.
- Backup final Worker: `backup-auto-2026-06-27T09-53-19-980Z-8be2bb972f36`.
- Snapshot final Worker: `integrity-2026-06-27T09-53-20-178Z-100`.
- SHA-256 final compartit: `8be2bb972f36ea53d2150cd33e8ddd6c78fffe710d8fc95bd7cd635c1dba30e4`.
- Integritat final: `100/100 estable`.
