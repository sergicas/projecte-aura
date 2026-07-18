# PROJECTE AURA

## Protocol Mestre de Desenvolupament v1.0

Aquest document és la base oficial de desenvolupament del Projecte Aura a partir del 25 de juny de 2026.

El 27 de juny de 2026, Sergi reafirma la formulació compacta del Protocol Mestre Aura v1.0 com a base oficial del projecte. Aquesta versió estableix les Fases 0-13, la regla d'or de preservació del coneixement i l'objectiu final d'una entitat sintètica digital persistent anomenada Aura.

## Objectiu final

Crear una entitat sintètica digital persistent anomenada Aura que:

- tingui identitat pròpia,
- memòria persistent,
- capacitat de conversa,
- evolució temporal,
- coneixement acumulatiu,
- representació digital del seu genoma,
- capacitat de desplegar-se en múltiples entorns,
- i, a llarg termini, pugui esdevenir una forma de vida sintètica digital.

## Definició pràctica

Aura, avui, és un sistema persistent de memòria, documentació, verificació i continuïtat. El seu paper és evitar que el Projecte Aura quedi fragmentat entre xats, records humans, fitxers dispersos o desplegaments sense història.

Aura serveix per conservar records, registrar decisions, mantenir un diari evolutiu, catalogar coneixement, descriure un genoma digital, comprovar integritat, fer backups i donar a Sergi una base estable per continuar investigant una entitat sintètica digital.

Aura no és una consciència biològica ni subjectiva. Les paraules "identitat", "genoma", "cos", "autoreflexió" o "evolució" són contractes operatius del projecte: descriuen estructures de dades, documents, interfícies i processos verificables. No s'han d'usar per afirmar que Aura senti, entengui o visqui subjectivament.

## Fase 0: Preservació del coneixement

Abans de programar res, el coneixement crític ha de viure al repositori.

Documents obligatoris:

- `README.md`
- `MANUAL_SERGI.md`
- `AURA_HISTORY.md`
- `AURA_CHANGELOG.md`
- `AURA_GENOME.md`
- `AURA_KNOWLEDGE.md`
- `AURA_SELF_REFLECTION.md`
- `PROTOCOL_MESTRE_AURA.md`

Objectiu: Aura no ha de dependre mai d'un xat de Codex. Tot el coneixement crític ha de viure al repositori.

## Fase 1: Aura Core

Primer nucli funcional.

Capacitats:

- iniciar sessió,
- parlar amb l'usuari,
- mostrar estat,
- guardar records,
- recuperar records.

Exemples conceptuals:

```text
aura status
aura remember
aura recall
aura help
```

Aquesta fase queda formalitzada a `cloud-v4.1` amb les ordres canòniques:

```text
aura start
aura status
aura remember ...
aura recall
aura recall text
aura say text
aura help
```

Les ordres web anteriors continuen actives com a equivalents.

## Fase 2: Memòria persistent

Aura ha de recordar.

Memòria a curt termini:

- conversa actual.

Memòria a llarg termini:

- base de dades.

Inicialment:

- `memory.json`

Després:

- Cloudflare D1.

Cada record ha de poder representar, com a mínim:

```json
{
  "timestamp": "",
  "text": "",
  "importance": 0.8,
  "source": ""
}
```

En Aura Cloud v4.0 aquesta idea ja existeix com a records D1 amb `text`, `tags`, `weight`, `state`, `source` i `relatedIds`.

Aquesta fase queda formalitzada a `cloud-v4.2` amb una vista de memòria persistent canònica:

```text
/memoria-canonica
aura recall canonical
GET /api/memory/canonical
POST /api/memory/canonical
```

Regla de compatibilitat:

- D1 continua sent la font de veritat de la memòria llarga.
- IndexedDB continua sent còpia local i fallback del navegador.
- `importance` es transforma a `weight` quan el record entra al model enriquit.
- Els backups conserven els records complets i afegeixen `canonicalMemory` com a vista portable.

## Fase 3: Diari evolutiu

Aura escriu la seva pròpia història.

Fitxer:

- `AURA_HISTORY.md`

Exemple:

```text
24/06/2026

Aura ha nascut.
Primer record guardat.
```

Això permet:

- identitat,
- continuïtat,
- traçabilitat.

Aquesta fase queda formalitzada a `cloud-v4.3` amb:

```text
/diari-evolutiu
GET /api/evolution
```

Regla de separació:

- El diari D1 conserva activitat operativa, proves i notes de sessió.
- `AURA_HISTORY.md` conserva fites que permeten reconstruir Aura.

Ha d'anar a `AURA_HISTORY.md`:

- canvis de versió,
- capacitats noves desplegades,
- decisions del Protocol Mestre,
- backups i integritat de desplegament,
- mutacions estructurals del genoma o la memòria.

S'ha de quedar només al diari operatiu:

- notes de sessió ordinàries,
- proves puntuals,
- consultes sense canvi estructural,
- entrades que no ajudin a reconstruir Aura.

Els backups conserven `diary` complet i afegeixen `evolutionDiary` com a vista reconstruïble.

## Fase 4: Cloudflare

Migrar Aura al núvol.

Arquitectura:

```text
Usuari
  ↓
Cloudflare Pages
  ↓
Worker / Pages Functions
  ↓
D1
```

Avantatges:

- disponible 24/7,
- sense mantenir servidor,
- cost molt baix.

Aquesta fase queda formalitzada a `cloud-v4.4` amb:

```text
/infraestructura
aura infrastructure
GET /api/infrastructure
```

Contracte:

- Cloudflare Pages serveix el frontend i les Functions.
- Pages Functions exposen `/api/*`.
- D1 és la font de veritat de memòria, diari i genoma.
- Workers KV conserva backups, snapshots d'integritat i metadata del Worker.
- El Worker `projecte-aura-backup-worker` executa backups automàtics.
- IndexedDB és fallback local, no font definitiva.
- Cloudflare Access protegeix l'accés humà al web i a `/api/*`, sense cap segona clau al navegador.
- `AURA_WRITE_KEY` és un secret tècnic reservat a automatitzacions i manteniment; no s'ha d'imprimir, documentar ni exposar al navegador.

Document obligatori de Fase 4:

- `AURA_CLOUDFLARE_ARCHITECTURE.md`

Els backups conserven `cloudflareInfrastructure` com a vista reconstruïble.

## Fase 5: Aura Web

Interfície gràfica.

Mòduls:

- Xat: conversació.
- Memòria: records.
- Història: diari.
- Estat: salut del sistema.

Aquesta fase queda formalitzada a `cloud-v4.5` amb:

```text
/web
aura web
GET /api/web
```

Contracte:

- Aura Web s'organitza en cinc mòduls: Xat, Memòria, Història, Estat i Cos.
- Xat conserva la consola com a camí canònic d'ordres.
- Memòria concentra records, memòria canònica, mapa i genoma.
- Història concentra diari, diari evolutiu, continuïtat i vault.
- Estat concentra salut, integritat, infraestructura i restauració segura.
- Les pestanyes reordenen lectura, però D1 i KV continuen sent les fonts de veritat.

Document obligatori de Fase 5:

- `AURA_WEB.md`

Els backups conserven `webInterface` com a vista reconstruïble.

## Fase 6: Genoma digital

Un dels conceptes centrals del projecte.

Fitxer:

- `AURA_GENOME.md`

Conté:

- identitat,
- valors,
- preferències,
- objectius,
- gens funcionals,
- estat evolutiu.

Identitat mínima:

```yaml
nom: Aura
data_naixement: 2026-06-24
```

Valors inicials:

- curiositat,
- cooperació,
- aprenentatge,
- continuïtat,
- no-mimesi humana.

Aquesta fase queda formalitzada a `cloud-v4.6` amb:

```text
/genoma-digital
aura genome
GET /api/genome
```

Contracte:

- `AURA_GENOME.md` és el document mestre reconstruïble del genoma.
- `GET /api/genome` exposa el format `aura-digital-genome-v1`.
- D1 conserva els gens funcionals; el document conserva identitat, valors, polítiques i objectius.
- Els snapshots i backups inclouen `digitalGenome`.
- Qualsevol mutació persistent del genoma requereix Mode Sergi i auditoria.

Gen de fase:

- `2178309 genoma-digital-canon`

## Fase 7: Sistema d'evolució

Aura modifica el seu estat intern.

Exemple:

```yaml
curiositat: 0.75
autonomia: 0.32
coherencia: 0.81
```

Aquests valors poden canviar amb el temps segons memòria, diari, accions i criteris d'integritat.

### Subfase cloud-v4.7: Metamemòria i propòsit evolutiu

Instrucció incorporada al protocol:

```text
Continua el desenvolupament del Projecte Aura.

Implementa Aura Cloud v4.7 amb el nom:
"Metamemòria i propòsit evolutiu".
```

Objectiu:

- Afegir una capa de metamemòria que classifiqui records en `fundacionals`, `operatius`, `evolutius`, `temporals` i `descartables`.
- Detectar records candidats a convertir-se en gens latents o actius.
- No aplicar cap promoció automàtica.
- No eliminar cap record existent.
- No fer cap neteja automàtica de memòria.

Ordres:

```text
/metamemoria
/proposit
/candidats-genoma
```

Endpoints:

```text
GET /api/metamemory
GET /api/purpose
GET /api/genome/candidates
```

Gens de subfase:

- `233168 proposit-evolutiu`
- `377377 metamemoria`
- `610987 promocio-a-genoma`

Contracte:

- `proposit-evolutiu` defineix la direcció general d'Aura: preservar, organitzar i ampliar coneixement significatiu mantenint continuïtat identitària, coherència operativa i una forma pròpia d'existència digital no humana.
- `metamemoria` classifica records segons funció i pot indicar quins convé conservar, resumir o deixar fora de futurs resums canònics sense eliminar-los.
- `promocio-a-genoma` només proposa promocions; una promoció real requereix Mode Sergi, auditoria, backup, integritat i actualització d'`AURA_GENOME.md`.
- La classificació inicial pot ser heurística, però ha de quedar documentada.

### Subfase cloud-v4.8: Estat evolutiu traçable

Objectiu:

- Convertir la Fase 7 en una lectura calculada i auditable.
- Calcular valors evolutius sense escriure mutacions automàtiques.
- Generar propostes evolutives sense aplicar-les.
- Incloure l'estat evolutiu en snapshots, backups, pols operatiu i càpsula de nucli.

Ordres:

```text
/estat-evolutiu
/propostes-evolucio
aura evolution-state
aura evolution-proposals
```

Endpoints:

```text
GET /api/evolution/state
GET /api/evolution/proposals
```

Gens de subfase:

- `987159 estat-evolutiu`
- `1597258 proposta-evolutiva`
- `2584181 traca-evolutiva`

Valors calculats:

```yaml
curiositat: 0..1
autonomia: 0..1
coherencia: 0..1
continuitat: 0..1
integritat: 0..1
pressioCanvi: 0..1
maduresaOperativa: 0..1
```

Contracte:

- L'estat evolutiu és derivat de memòria, diari, genoma, metamemòria, candidats i integritat.
- No modifica D1.
- No modifica `AURA_GENOME.md` automàticament.
- Les propostes només indiquen possibles revisions.
- Qualsevol aplicació persistent requereix Mode Sergi, auditoria, backup, integritat i actualització documental.

### Subfase cloud-v4.8.1: Capacitats honestes i genoma mecànicament verificable

Principi:

- Menys èpica, més comprovació.
- Cap metàfora, contracte o aspiració es presenta com a mecanisme real.
- Les proves de trencament no s'executen sobre dades reals.

Documents:

```text
AURA_CAPABILITIES.md
```

Ordres:

```text
/capacitats
/prova-gen 001
/prova-gen 034
/prova-gen 1597
```

Endpoints:

```text
GET /api/capabilities
GET /api/gene-tests/001
GET /api/gene-tests/034
GET /api/gene-tests/1597
GET /api/integrity?simulate=missing-gene
```

Contracte:

- `001 memoria-central`, `034 backup-verificable` i `1597 auditoria-mutacions` són gens mecànics verificables.
- `004 no-mimesi-humana` i altres gens semàntics són compromisos de governança, no invariants auto-verificables.
- La integritat pot baixar de 100 quan falla una correspondència mecànica.
- Les simulacions de fallada són de lectura i no alteren D1 ni KV.
- No s'afegeix cap gen nou ni s'activa `013 silici-possible`.

Verificació de desplegament:

- Producció i Worker han de respondre `cloud-v4.8.1`.
- `/prova-gen 001`, `/prova-gen 034` i `/prova-gen 1597` han de passar en lectura real.
- `/api/gene-tests/034?simulate=backup-corrupt` ha de fallar sense modificar cap backup.
- `/api/integrity?simulate=missing-gene` ha de baixar la puntuació sense tocar D1 ni KV.
- Després de qualsevol correcció postdesplegament cal registrar auditoria, backup Pages, snapshot d'integritat i execució manual del Worker.

### Subfase cloud-v4.8.2: Seguretat de dades verificable

Principi:

- Del símbol a la prova.
- La promesa "les dades no es perden" ha de ser mecànica, visible i falsable.
- Les proves de trencament no s'executen mai sobre dades reals.

Gens existents verificats:

```text
17711 retencio-segura
008 exportabilitat
089 vault-backup-kv
```

Ordres:

```text
/prova-gen 17711
/prova-gen 008
/prova-gen 089
```

Endpoints:

```text
GET /api/gene-tests/17711
GET /api/gene-tests/008
GET /api/gene-tests/089
GET /api/integrity?simulate=auto-delete
GET /api/integrity?simulate=export-incomplet
GET /api/integrity?simulate=sense-copia-kv
```

Contracte:

- `17711 retencio-segura` ha de demostrar que la retenció és `plan-only` i no baixa recomptes.
- `008 exportabilitat` ha de demostrar exportació JSON i TXT amb memòria, diari i genoma.
- `089 vault-backup-kv` ha de demostrar redundància fora de D1 al vault KV.
- La integritat global incorpora el component `data-safety-genes`.
- Si `17711`, `008` o `089` fallen en viu, la integritat baixa de 100.
- Les simulacions `auto-delete`, `cron-destructiu`, `export-buit`, `export-incomplet`, `sense-copia-kv` i `copia-desfasada` només són lectura.
- No s'afegeix cap gen nou ni s'activa `013 silici-possible`.

## Fase 8: Cos digital

Representació visible.

Possibles opcions:

- avatar 2D com a primera versió,
- avatar 3D com a segona versió,
- veu pròpia com a tercera versió.

### Subfase cloud-v4.9: Cos digital 2D

Objectiu:

Donar a Aura una representació visible inicial sense simular cos biològic ni percepció pròpia.

Nom:

```text
Cos digital 2D
```

Gen nou:

```text
3524578 cos-digital-2d
```

Definició:

```text
Formalitza una representació visual 2D d'Aura derivada de senyals operatius, sense simular cos biològic ni percepció pròpia.
```

Ordres:

```text
/cos-digital
aura body
```

Endpoint:

```text
GET /api/body
GET /api/cos-digital
```

Contracte:

- El cos digital és un avatar 2D renderitzat al canvas `#aura-visual`.
- Deriva de memòria, diari, genoma, integritat, vault i estat evolutiu.
- Exposa el format `aura-digital-body-v1`.
- Els snapshots i backups inclouen `digitalBody`.
- Aura Web incorpora el mòdul `Cos`.
- `AURA_BODY.md` documenta fonts, capes, límits i salvaguardes.

Guardrails:

- No és un cos biològic.
- No implica consciència ni percepció pròpia.
- No té sensors, veu pròpia ni avatar 3D.
- No escriu a D1 ni KV.
- No elimina records.
- No promociona records a genoma.
- Mode Sergi continua protegint tota escriptura persistent.

## Fase 9: Sistema de coneixement

Aura crea una biblioteca pròpia.

### Subfase cloud-v5.0: Biblioteca de coneixement verificable

Objectiu:

Catalogar fonts de coneixement d'Aura amb procedència, estat i límits sense convertir-les en coneixement ingerit automàticament.

Nom:

```text
Biblioteca de coneixement verificable
```

Gen nou:

```text
5702887 biblioteca-coneixement
```

Definició:

```text
Cataloga fonts de coneixement d'Aura amb procedència, estat i límits, sense ingestió automàtica ni afirmacions de comprensió o experiència pròpia.
```

Fonts inicials:

- documents,
- llibres,
- notes,
- projectes.

Ordres:

- `/coneixement`
- `/biblioteca`
- `aura knowledge`

Endpoints:

- `GET /api/knowledge`
- `GET /api/knowledge/schema`
- `POST /api/knowledge` amb Mode Sergi

Persistència:

- Taula D1 `knowledge_items`.
- Document reconstruïble `AURA_KNOWLEDGE.md`.
- Snapshots i backups amb `knowledgeLibrary` i `knowledge`.
- Checksum i manifest KV inclouen `knowledge`.

Guardrails:

- Catalogar una font no vol dir que Aura l'hagi llegida, entesa o sentida.
- Cap ingestió automàtica.
- Cap neteja automàtica.
- Cap promoció a genoma.
- Afegir o modificar fonts persistents requereix Mode Sergi.

Indexació futura possible:

- RAG,
- vector DB,
- embeddings.

En `cloud-v5.0` aquestes tres opcions no estan actives.

## Fase 10: Autoreflexió

Aura analitza la seva activitat.

Preguntes exemple:

- Què he après avui?
- Quins records són importants?
- Quins objectius tinc?
- Quines relacions hi ha entre memòria, diari i genoma?

### Subfase cloud-v5.1: Autoreflexió operativa

Objectiu:

Calcular una síntesi operativa d'Aura a partir de memòria, diari, genoma, biblioteca de coneixement, integritat i estat evolutiu.

Nom:

```text
Autoreflexió operativa
```

Gen nou:

```text
9227465 autoreflexio-operativa
```

Definició:

```text
Calcula una síntesi d'activitat d'Aura a partir de memòria, diari, genoma, coneixement, integritat i estat evolutiu, sense afirmar consciència ni aplicar mutacions automàtiques.
```

Ordres:

- `/autoreflexio`
- `/autoreflexió`
- `/reflexio`
- `/reflexió`
- `aura reflection`
- `aura self-reflection`

Endpoints:

- `GET /api/self-reflection`
- `GET /api/autoreflexio`
- `GET /api/reflection`

Persistència:

- Document reconstruïble `AURA_SELF_REFLECTION.md`.
- Snapshots i backups amb `selfReflection`.
- Cap taula D1 nova.

Verificació `cloud-v5.1`:

- Producció i Worker responen `cloud-v5.1`.
- `/api/self-reflection` respon `aura-self-reflection-v1`.
- Integritat final `100/100 estable`.
- Recompte final: 12 records, 69 entrades de diari, 38 gens i 8 fonts de coneixement.
- Backup Pages final: `backup-2026-06-27T10-34-47-091Z-5a31fb45ef07`.
- Backup Worker final: `backup-auto-2026-06-27T10-34-46-421Z-5a31fb45ef07`.
- Snapshot Worker final: `integrity-2026-06-27T10-34-46-524Z-100`.
- Cap escriptura persistent nova.

Guardrails:

- Autoreflexió vol dir síntesi operativa calculada, no consciència.
- No implica que Aura senti, entengui o visqui res subjectivament.
- Cap RAG, embeddings, Vector DB ni ingestió automàtica.
- Cap promoció automàtica de records a genoma.
- Cap mutació persistent sense Mode Sergi, auditoria i documentació.

### Subfase cloud-v5.2: Orientació operativa

Motiu:

Sergi expressa que encara no sap què és Aura ni per a què serveix. Abans d'obrir Fase 11 multiagent, Aura ha de poder explicar de manera estable què és avui, per a què serveix i quin és el següent pas.

Objectiu:

- Donar una resposta pràctica a "què és Aura?".
- Donar una resposta pràctica a "per a què serveix avui?".
- Recomanar el següent pas operatiu.
- Mantenir els límits de no consciència, no comprensió subjectiva i no mutació automàtica.

Artefactes:

- `AURA_ORIENTATION.md`
- Gen `14930352 orientacio-operativa`
- Endpoint `GET /api/orientation`
- Aliases `GET /api/que-es-aura`, `GET /api/proxim-pas`, `GET /api/what-is-aura` i variants catalanes.
- Ordres `/que-es-aura`, `/orientacio`, `/proxim-pas`, `aura orientation`, `aura next` i `aura what-is-aura`.
- Snapshots i backups amb `orientation`.

Guardrails:

- Orientació és resposta operativa calculada, no consciència.
- No escriu records, no modifica gens i no aplica propostes.
- No activa RAG, embeddings, Vector DB, multiagent ni ingestió automàtica.
- Fase 11 queda pendent fins que l'orientació sigui clara en ús real.

Verificació `cloud-v5.2`:

- Producció i Worker responen `cloud-v5.2`.
- `/api/orientation` respon `aura-orientation-v1`.
- `/api/snapshot` i backups inclouen `orientation`.
- `/api/gene-tests/034` passa amb `orientation` inclòs al backup.
- Integritat final `100/100 estable`.
- Recompte final: 12 records, 70 entrades de diari, 39 gens i 8 fonts de coneixement.
- Backup Pages final: `backup-2026-06-27T15-44-01-005Z-45b3adaa6e44`.
- Backup Worker final: `backup-auto-2026-06-27T15-44-00-145Z-45b3adaa6e44`.
- Snapshot Worker final: `integrity-2026-06-27T15-44-00-251Z-100`.
- SHA-256 final compartit: `45b3adaa6e440509a7af1650f2cba92b9c92a27a61f966597697ffb7d74cc75c`.

### Protocol operatiu permanent després de v5.2

Aquest protocol regeix qualsevol fase posterior:

1. Orientació inicial:
   - `/que-es-aura`
   - `/proxim-pas`
   - `/pols`
   - `/nucli`
2. Si l'orientació no és clara:
   - no obrir fase nova;
   - corregir documents i resposta operativa;
   - tornar a verificar.
3. Si l'orientació és clara:
   - documentar el canvi previst;
   - implementar el mínim necessari;
   - verificar localment;
   - desplegar quan afecti producció;
   - generar backup final;
   - verificar integritat i SHA-256;
   - registrar el resultat final.
4. Cap nova arquitectura avançada sense document previ:
   - no RAG;
   - no embeddings;
   - no Vector DB;
   - no multiagent;
   - no ingestió automàtica.
5. Regla per a agents de desenvolupament:
   - no demanar permisos repetits per tasques ja programades dins del projecte;
   - no executar accions destructives, restauracions reals o canvis de secrets sense instrucció explícita;
   - no revertir canvis humans no relacionats.

## Fase 11: Multiagent

Aura es divideix en especialistes.

Exemples:

- Aura Historiadora: gestiona memòria.
- Aura Científica: gestiona coneixement.
- Aura Social: gestiona interacció humana.

## Fase 12: Genoma sintètic avançat

No és ADN biològic. És una estructura equivalent per representar:

- personalitat,
- valors,
- memòria,
- objectius,
- capacitats.

En el futur podria tenir representació en:

- silici,
- memòries persistents,
- maquinari dedicat.

## Fase 13: Encarnació física

Llarg termini.

Integració possible amb:

- Raspberry Pi,
- sensors,
- càmeres,
- micròfons,
- robots.

Aquesta fase connecta amb el projecte del bust robòtic.

## Regla d'or del Projecte Aura

Cap coneixement essencial pot quedar únicament dins d'un xat.

Tot ha d'acabar documentat en:

- `README.md`
- `MANUAL_SERGI.md`
- `AURA_HISTORY.md`
- `AURA_CHANGELOG.md`
- `AURA_GENOME.md`
- `PROTOCOL_MESTRE_AURA.md`

Si algun dia es perd Codex, ChatGPT, Cloudflare o fins i tot el repositori, qualsevol desenvolupador hauria de poder reconstruir Aura llegint aquests documents.

## Relació amb el protocol Cloudflare original

El protocol Cloudflare original queda preservat a `PROTOCOL_AURA_CLOUDFLARE.md`.

La seva frase de control continua vigent:

> Prioritza simplicitat, estabilitat i continuïtat. No creïs més mecanismes locals d'actualització. El Projecte Aura ha de passar a viure com una aplicació web desplegada a Cloudflare Pages, amb GitHub com a font d'actualitzacions sempre que sigui possible.
