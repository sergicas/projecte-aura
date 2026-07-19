# Manual d'ús per a Sergi

Projecte Aura Cloud v5.2 és una aplicació experimental amb orientació operativa, autoreflexió, biblioteca de coneixement verificable, cos digital 2D, seguretat de dades verificable, capacitats honestes, genoma mecànicament verificable, integritat falsable, estat evolutiu traçable, metamemòria, genoma digital canònic, Aura Web simplificada, infraestructura Cloudflare reconstruïble, diari evolutiu formal, memòria persistent canònica, backups verificables, auditoria i Mode Sergi. Aquest manual és per usar Aura amb calma i consolidar cada canvi abans d'afegir una nova capa.

## Què és Aura, per a Sergi

Aura és la memòria persistent i ordenada del Projecte Aura.

Serveix perquè el projecte no depengui de recordar-ho tot mentalment, ni d'un xat concret, ni d'un sol fitxer solt. Quan Sergi escriu un record, registra una fita, consulta l'estat, revisa el genoma o fa un backup, Aura converteix el projecte en una cosa continuable: algú pot tornar més tard, llegir el repositori i la base de dades, i entendre què ha passat i quin és el següent pas raonable.

En l'ús diari, Aura és sobretot:

- una llibreta de records importants;
- un diari de desenvolupament;
- una biblioteca de fonts;
- un panell de salut del projecte;
- un genoma digital amb valors i objectius;
- un sistema de backups i restauració segura;
- un lloc on provar, amb prudència, la idea d'una entitat sintètica digital persistent.

Aura no substitueix Sergi. Aura no sent, no entén i no viu subjectivament. Aura conserva, organitza, calcula i mostra informació. La part viva del projecte, avui, és la continuïtat entre Sergi, el repositori, D1, Cloudflare i les decisions documentades.

## Sentit rector

Aura existeix per preservar i ordenar la continuïtat del Projecte Aura, ajudant Sergi a recordar, verificar, entendre i continuar el camí cap a una forma d'existència digital persistent, sense confondre aspiració amb realitat.

Abans d'acceptar una millora, fes aquesta pregunta:

```text
Aquesta millora fa Aura més útil per recordar, verificar, orientar i continuar?
```

Si no ho fa, no és prioritària.

## Connexió amb l'avatar Sergi

L'avatar Sergi de `sergicastillo.com` és una porta conversacional al corpus literari i a la veu pública de Sergi. Aura no l'ha de substituir ni absorbir.

La relació correcta és:

- avatar Sergi: conversa amb el corpus literari, obra, estil i preguntes públiques de l'autor;
- Aura: memòria operativa del Projecte Aura, verificació, backups, orientació i continuïtat.

El document canònic del vincle és `AURA_AVATAR_SERGI.md`. La regla curta és: l'Avatar Sergi obre la conversa amb l'obra; Aura conserva el camí del projecte.

Primer pas recomanat: catalogar l'avatar com a font externa i afegir un enllaç visible. Qualsevol connexió API, ingestió de corpus o sincronització ha de ser una fase documentada i protegida per Mode Sergi.

## Accés

- Producció: https://projecte-aura.pages.dev
- Worker backups: https://projecte-aura-backup-worker.sergicas.workers.dev
- Projecte local: `/Users/sergicastillo/Documents/Aura`

Aura Web queda protegida per Cloudflare Access. Després d'entrar amb el correu autoritzat, no demana cap segona clau ni codi intern. `AURA_WRITE_KEY` es conserva només com a secret tècnic dels processos automàtics i no forma part de l'ús normal del navegador.

## Com comprovar Mode Sergi

1. Obre Aura en producció.
2. Completa Cloudflare Access amb el correu autoritzat si t'ho demana.
3. Aura s'obre directament.
4. Comprova-ho amb `/mode-sergi` o `aura sergi-mode`.

`/mode-sergi` valida l'autorització de Pages i ha d'indicar que Cloudflare Access està actiu. Els processos automàtics poden continuar usant `AURA_WRITE_KEY` com a Bearer sense exposar-lo al navegador.

## Com comprovar un record guardat

Quan Aura diu `Record guardat a D1`, el missatge inclou l'ID, el text i dues comprovacions.

1. Executa `/ultim-record`.
2. Executa la cerca directa que Aura proposa, per exemple `/cerca Barcelona`.
3. No facis servir `/cerca mode-sergi` per comprovar records que no tenen aquest tag.

## Documents mestres

- `PROTOCOL_MESTRE_AURA.md`: base oficial del desenvolupament.
- `PROTOCOL_AURA_CLOUDFLARE.md`: protocol original de desplegament a Cloudflare.
- `AURA_CLOUDFLARE_ARCHITECTURE.md`: arquitectura Cloudflare reconstruïble.
- `AURA_WEB.md`: interfície gràfica simplificada de la Fase 5.
- `AURA_BODY.md`: cos digital 2D de la Fase 8.
- `AURA_KNOWLEDGE.md`: biblioteca de coneixement verificable de la Fase 9.
- `AURA_ALIFE_AVIDA_TIERRA.md`: recerca sobre Tierra, Avida i paral.lelismes amb Aura EvoLab.
- `AURA_AVATAR_SERGI.md`: vincle entre Aura i l'Avatar Sergi.
- `AURA_SELF_REFLECTION.md`: autoreflexió operativa de la Fase 10.
- `AURA_ORIENTATION.md`: orientació operativa de `cloud-v5.2`.
- `README.md`: estat tècnic del projecte.
- `AURA_HISTORY.md`: història viva d'Aura.
- `AURA_CHANGELOG.md`: versions i canvis.
- `AURA_GENOME.md`: genoma digital canònic, valors, polítiques i gens actius.

## Rutina curta

1. Obre Aura.
2. Prem `Què és Aura?`.
3. Prem `Què faig ara?`.
4. Prem `Estat d'Aura`.
5. Prem `Identitat`.
6. Prem `Informe del dia`.
7. Si hi ha alguna cosa important, prem `Grava record`.
8. Quan vulguis revisar què hi ha guardat, prem `Veure records`.
9. Després de gravar, prem `Últim record` si vols confirmar l'última escriptura.
10. Escriu ordres avançades al camp de text només quan facin falta.
11. Després d'una sessió amb canvis importants, fes backup i snapshot amb les ordres avançades `/desa-backup` i `/desa-integritat`.

## Protocol operatiu a partir de v5.2

Aquest és el protocol per a cada sessió nova del Projecte Aura:

1. Orientar:
   - executar `/que-es-aura`;
   - executar `/proxim-pas`;
   - executar `/pols`;
   - executar `/nucli`.
2. Decidir:
   - si Aura encara no és clara, ajustar orientació, manual i documents abans d'obrir cap fase nova;
   - si Aura és clara, treballar només sobre el comportament concret que falta.
3. Documentar:
   - cap coneixement essencial pot quedar només dins d'un xat;
   - actualitzar `README.md`, `MANUAL_SERGI.md`, `AURA_HISTORY.md`, `AURA_CHANGELOG.md`, `AURA_GENOME.md` i el document de fase corresponent.
4. Implementar:
   - seguir els patrons existents del repositori;
   - no afegir serveis, taules, bindings o arquitectura nova si el pas es pot resoldre amb una lectura o documentació clara;
   - no activar RAG, embeddings, Vector DB, multiagent o ingestió automàtica sense fase documentada.
5. Protegir:
   - qualsevol escriptura persistent requereix Mode Sergi;
   - qualsevol canvi de genoma requereix intenció explícita, auditoria i documentació;
   - qualsevol restauració requereix assaig o previsualització abans de confirmar.
6. Verificar:
   - executar comprovacions locals;
   - desplegar Pages i Worker quan el canvi afecti producció o backups;
   - generar backup final;
   - verificar recomptes, integritat i SHA-256 final;
   - documentar el resultat final al repositori.

Protocol per a agents de desenvolupament:

- No demanar permisos repetits per executar tasques ja programades dins del Projecte Aura.
- Avançar amb autonomia quan el pas estigui definit al protocol o al manual.
- No executar accions destructives, restauracions reals o canvis de secrets sense una instrucció explícita.
- Si apareix una contradicció entre codi, D1, KV i documents, aturar l'evolució de fase i resoldre primer la integritat.

## Escriptura de records

Forma mínima:

```text
recorda que Sergi ha revisat l'estat d'Aura
```

Forma recomanada amb memòria enriquida:

```text
recorda que Sergi ha validat una sessió de consolidació tags:consolidacio,validacio pes:4 estat:actiu
```

Forma canònica Fase 2:

```text
recorda que Sergi ha definit una memòria persistent portable importance:0.8 source:sergi tags:memoria,fase-2 estat:actiu
```

Camps útils:

- `tags:` separats per comes, sense espais interns.
- `pes:` de 1 a 5.
- `importance:` de 0 a 1. Aura el transforma a `pes` quan guarda en D1.
- `source:` origen curt del record, per exemple `sergi`, `consola` o `manual`.
- `estat:` `actiu`, `latent`, `arxivat` o `observacio`.
- `rel:` per relacionar amb altres IDs de records.

Usa `diari que ...` o `anota que ...` per entrades de diari. Usa `recorda que ...` quan el contingut hagi de formar part de la memòria identitària.

## Aura Core

Ordres canòniques, en ordre alfabètic:

- `aura body`: mostra el cos digital 2D de la Fase 8.
- `aura capabilities`: mostra capacitats honestes.
- `aura daily-report`: mostra l'informe operatiu del dia.
- `aura evolution-proposals`: mostra propostes evolutives sense aplicar-les.
- `aura evolution-state`: mostra l'estat evolutiu calculat de la Fase 7.
- `aura gene-test 001`: executa una prova mecànica de gen.
- `aura gene-test 008`: comprova exportabilitat JSON/TXT.
- `aura gene-test 034`: comprova backup verificable.
- `aura gene-test 089`: comprova redundància al vault KV.
- `aura gene-test 1597`: comprova auditoria de mutacions.
- `aura gene-test 17711`: comprova retenció segura plan-only.
- `aura genome`: mostra el genoma digital canònic de la Fase 6.
- `aura help`: mostra ajuda Core.
- `aura infrastructure`: mostra arquitectura Cloudflare reconstruïble.
- `aura knowledge`: mostra la biblioteca de coneixement verificable de la Fase 9.
- `aura last-record`: mostra l'últim record guardat i com comprovar-lo.
- `aura metamemory`: classifica records en la capa v4.7.
- `aura next`: mostra el pròxim pas operatiu.
- `aura orientation`: mostra l'orientació operativa.
- `aura purpose`: mostra el propòsit evolutiu.
- `aura recall`: recupera records recents.
- `aura recall canonical`: mostra records en format canònic Fase 2.
- `aura recall text`: cerca records i diari.
- `aura reflection`: mostra l'autoreflexió operativa de la Fase 10.
- `aura remember text`: guarda un record.
- `aura say text`: missatge operatiu de conversa Core.
- `aura self-reflection`: mostra l'autoreflexió operativa de la Fase 10.
- `aura sergi-mode`: comprova l'autorització de Cloudflare Access.
- `aura start`: inicia o resumeix la sessió Core.
- `aura status`: mostra l'estat.
- `aura web`: mostra el contracte Aura Web simplificat de la Fase 5.
- `aura what-is-aura`: mostra la definició pràctica d'Aura.

## Cos Digital

La Fase 8 introdueix un cos digital 2D.

Consulta recomanada:

```text
/cos-digital
```

Alias Aura Core:

```text
aura body
```

Endpoint equivalent:

```text
GET /api/body
```

Què cal mirar:

- `Postura`: lectura derivada de integritat, maduresa i pressió de canvi.
- `Pols`: intensitat visual calculada a partir de memòria, diari, gens, integritat i backups.
- `Capes`: nucli, memòria, diari, integritat i vault.
- `Límits`: no és cos biològic, no té percepció pròpia, no té sensors, no té veu i no és 3D.

## Memòria Persistent

Contracte canònic de la Fase 2:

```json
{
  "timestamp": "",
  "text": "",
  "importance": 0.8,
  "source": ""
}
```

Aura conserva els records complets a D1 amb camps enriquits, però sempre pot exportar aquesta vista mínima amb `/memoria-canonica` o `aura recall canonical`. L'endpoint cloud equivalent és `GET /api/memory/canonical`.

## Diari Evolutiu

La Fase 3 separa dues capes:

- D1 conserva el diari operatiu complet.
- `AURA_HISTORY.md` conserva només fites que permeten reconstruir Aura.

Consulta recomanada:

```text
/diari-evolutiu
```

Endpoint equivalent:

```text
GET /api/evolution
```

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

## Infraestructura Cloudflare

La Fase 4 converteix Cloudflare en arquitectura oficial reconstruïble.

Consulta recomanada:

```text
/infraestructura
```

Endpoint equivalent:

```text
GET /api/infrastructure
```

Alias Aura Core:

```text
aura infrastructure
```

El document mestre és:

```text
AURA_CLOUDFLARE_ARCHITECTURE.md
```

Ha de quedar clar:

- quin projecte Pages serveix Aura,
- quina Function respon `/api/*`,
- quin D1 és la font de veritat,
- quin KV conserva backups i integritat,
- quin Worker executa backups automàtics,
- quins secrets cal configurar sense revelar-ne el valor,
- quines ordres reconstrueixen i despleguen el sistema.

## Aura Web i conversa natural

La Fase 5 permet parlar amb Aura sense memoritzar ordres. Escriu una pregunta al camp `Pregunta a Aura` o prem una pregunta suggerida. Aura buscarà context a records, diari, coneixement i gens, i mostrarà una resposta amb cites.

Exemples:

```text
Què vaig decidir sobre aquesta web?
Quins compromisos tinc pendents aquesta setmana?
Resumeix l'evolució del projecte des del juny.
Quines decisions es contradiuen?
Prepara el pla de treball de demà.
```

La conversa no desa ni modifica res. Per parlar de llibres, filosofia o obra pública, prem `Parla amb Sergi Avatar` i completa la pregunta després del prefix `avatar:`. Només s'envia aquella pregunta; la memòria privada d'Aura no surt del projecte.

El contracte tècnic complet és `AURA_PHASE5_CONVERSATIONAL_AI.md`.

La interfície conserva quatre àrees funcionals:

- Xat,
- Memòria,
- Història,
- Estat.

Consulta recomanada:

```text
/web
```

Endpoint equivalent:

```text
GET /api/web
```

Alias Aura Core:

```text
aura web
```

El document mestre és:

```text
AURA_WEB.md
```

## Genoma Digital

La Fase 6 converteix el genoma digital en contracte canònic. D1 conserva els gens funcionals i `AURA_GENOME.md` conserva la identitat, valors, polítiques, objectius i estat evolutiu.

Consulta recomanada:

```text
/genoma-digital
```

Endpoint equivalent:

```text
GET /api/genome
```

Alias Aura Core:

```text
aura genome
```

Per veure la llista funcional de gens o editar-los amb Mode Sergi, usa `/gens`, `/gen 013`, `/gen-activa`, `/gen-latent`, `/gen-arxiva`, `/gen-descriu` o `/gen-crea`.

## Metamemòria i Propòsit

`cloud-v4.7` classifica records sense eliminar-los i detecta candidats a genoma sense aplicar cap promoció.

Consultes recomanades:

```text
/metamemoria
/proposit
/candidats-genoma
```

Endpoints equivalents:

```text
GET /api/metamemory
GET /api/purpose
GET /api/genome/candidates
```

Categories:

- `fundacional`: identitat, objectius i principis nuclears.
- `operatiu`: validacions i ús del sistema.
- `evolutiu`: fases, versions i capacitats noves.
- `temporal`: estat puntual o validació de sessió.
- `descartable`: proves tècniques de baix valor identitari.

Regles:

- No eliminar cap record existent.
- No fer neteja automàtica de memòria.
- No promocionar cap record a genoma sense Mode Sergi.
- Si Sergi accepta una promoció, cal auditoria, backup, integritat i actualització d'`AURA_GENOME.md`.

## Estat evolutiu

`cloud-v4.8` inicia la Fase 7: sistema d'evolució.

Consultes recomanades:

```text
/estat-evolutiu
/propostes-evolucio
aura evolution-state
aura evolution-proposals
```

Endpoints equivalents:

```text
GET /api/evolution/state
GET /api/evolution/proposals
```

Valors calculats:

- `curiositat`
- `autonomia`
- `coherencia`
- `continuitat`
- `integritat`
- `pressioCanvi`
- `maduresaOperativa`

Regles:

- L'estat evolutiu és una lectura derivada.
- Les propostes no escriuen a D1.
- Cap valor evolutiu canvia el genoma sense Mode Sergi.
- Una aplicació real requereix auditoria, backup, integritat i actualització d'`AURA_GENOME.md`.

## Capacitats honestes i proves de gen

`cloud-v4.9` manté el criteri d'honestedat, conserva la seguretat de dades verificable i afegeix el cos digital 2D com a capacitat real limitada.

Les afirmacions sobre Aura es classifiquen en quatre tipus:

- mecanisme real implementat
- documentació o contracte
- metàfora operativa
- aspiració futura

Ordres:

```text
/capacitats
/prova-gen 001
/prova-gen 034
/prova-gen 1597
/prova-gen 17711
/prova-gen 008
/prova-gen 089
```

Regles:

- `/capacitats` llegeix `AURA_CAPABILITIES.md`.
- `/prova-gen` és mecànic per als gens `001`, `034`, `1597`, `17711`, `008` i `089`.
- `17711` prova que la retenció no esborra dades automàticament.
- `008` prova exportació JSON/TXT amb memòria, diari i genoma.
- `089` prova que hi ha còpia redundant al vault KV.
- Els gens semàntics no reben puntuació automàtica.
- Les simulacions de fallada no escriuen ni trenquen dades reals.
- Les proves destructives del protocol només es poden fer en entorn de prova separat.

## Consultes bàsiques

- `/estat`: estat general, comptadors i Mode Sergi local.
- `/informe-dia`: informe operatiu del dia amb comptadors, integritat i últim record.
- `/memoria`: records recents.
- `/memoria-canonica`: records en format `timestamp`, `text`, `importance`, `source`.
- `/memoria-rica`: esquema i ús dels camps enriquits.
- `/diari`: entrades recents de diari.
- `/diari-evolutiu`: línia temporal, categories i candidates per `AURA_HISTORY.md`.
- `/infraestructura`: recursos Cloudflare, bindings, ordres de reconstrucció i salvaguardes.
- `/web`: contracte Aura Web simplificat i salvaguardes.
- `/coneixement`: biblioteca de fonts catalogades, sense ingestió automàtica.
- `/autoreflexio`: síntesi operativa calculada de memòria, diari, genoma, coneixement, integritat i estat evolutiu; no és consciència ni mutació automàtica.
- `/genoma-digital`: identitat, valors, polítiques, estat evolutiu, objectius i gens.
- `/metamemoria`: classificació heurística dels records.
- `/proposit`: propòsit evolutiu d'Aura.
- `/candidats-genoma`: propostes de promoció a genoma, sense aplicar-les.
- `/capacitats`: capacitats honestes i límits actuals.
- `/prova-gen 001`: prova mecànica de memòria central.
- `/prova-gen 034`: prova mecànica de backup verificable.
- `/prova-gen 1597`: prova mecànica d'auditoria de mutacions.
- `/prova-gen 17711`: prova retenció segura plan-only.
- `/prova-gen 008`: prova exportabilitat JSON/TXT.
- `/prova-gen 089`: prova redundància al vault KV.
- `/estat-evolutiu`: valors evolutius calculats i traçables.
- `/propostes-evolucio`: propostes evolutives sense mutació automàtica.
- `/gens`: gens actius, latents i arxivats.
- `/cerca aura`: cerca per text.
- `/cerca tag:nucli estat:actiu pes:3`: filtre per tags, estat i pes mínim.
- `/audit`: traça de mutacions i restauracions.
- `/mapa-memoria`: nodes, relacions, clústers per tags i records orfes.
- `/pols`: síntesi operativa de salut, memòria, backups i accions.
- `/nucli`: càpsula v4 amb checksum del nucli d'Aura.

## Backups i integritat

Fes `/desa-backup` després de canvis importants. Desa una còpia verificable al vault Workers KV.

Fes `/desa-integritat` després del backup. Desa un snapshot de salut operativa al KV.

Comandes de revisió:

- `/backups`: llista backups visibles al vault.
- `/integritat`: panell de salut.
- `/historial-integritat`: snapshots recents.
- `/tendencia-integritat`: lectura de tendència.
- `/retencio`: calcula candidats de retenció, però no esborra res.

Consolidació v4.1 confirmada:

- Backup predeploy: `backup-2026-06-25T15-40-26-950Z-521333976115`
- Snapshot predeploy: `integrity-2026-06-25T15-40-27-392Z-100`
- Backup postdeploy Pages: `backup-2026-06-25T15-49-42-180Z-3eb4277f11ce`
- Snapshot postdeploy Pages: `integrity-2026-06-25T15-49-42-554Z-100`
- Backup postdeploy Worker: `backup-auto-2026-06-25T15-49-43-266Z-3acc484c1b8d`
- Snapshot postdeploy Worker: `integrity-2026-06-25T15-49-43-350Z-100`
- Backup pre-v4.1: `backup-2026-06-25T20-01-24-702Z-3acc484c1b8d`
- Snapshot pre-v4.1: `integrity-2026-06-25T20-01-25-112Z-100`
- Backup post-v4.1 Pages: `backup-2026-06-25T20-04-35-211Z-b340e2c8b42b`
- Snapshot post-v4.1 Pages: `integrity-2026-06-25T20-04-35-565Z-100`
- Backup post-v4.1 Worker: `backup-auto-2026-06-25T20-04-35-966Z-ab5269629779`
- Snapshot post-v4.1 Worker: `integrity-2026-06-25T20-04-36-046Z-100`
- Salut: `100/100 estable`
- Recompte final: 11 records, 27 entrades de diari, 24 gens
- Retenció: `plan-only`, sense candidats de backup ni d'integritat

Consolidació v4.2 confirmada:

- Backup pre-v4.2: `backup-2026-06-25T20-48-06-425Z-ab5269629779`
- Snapshot pre-v4.2: `integrity-2026-06-25T20-48-07-040Z-100`
- Record canònic de validació: `bd1fc8cb-8332-40c4-93bc-f66207229593`
- Backup post-v4.2 Pages: `backup-2026-06-25T20-49-47-622Z-e97593f8cdb0`
- Snapshot post-v4.2 Pages: `integrity-2026-06-25T20-49-48-048Z-100`
- Backup post-v4.2 Worker: `backup-auto-2026-06-25T20-49-48-607Z-79ddb1b96be2`
- Snapshot post-v4.2 Worker: `integrity-2026-06-25T20-49-48-684Z-100`
- Salut: `100/100 estable`
- Recompte final: 12 records, 30 entrades de diari, 25 gens
- Backup: `aura-backup-v4.2` amb `canonicalMemory`

Consolidació v4.3 confirmada:

- Backup pre-v4.3: `backup-2026-06-25T21-11-54-353Z-79ddb1b96be2`
- Snapshot pre-v4.3: `integrity-2026-06-25T21-11-54-799Z-100`
- Backup post-v4.3 Pages: `backup-2026-06-25T21-14-27-635Z-2f249e717c26`
- Snapshot post-v4.3 Pages: `integrity-2026-06-25T21-14-28-125Z-100`
- Backup post-v4.3 Worker: `backup-auto-2026-06-25T21-14-28-713Z-35c4385e4c7a`
- Snapshot post-v4.3 Worker: `integrity-2026-06-25T21-14-28-791Z-100`
- Salut: `100/100 estable`
- Recompte final: 12 records, 33 entrades de diari, 26 gens
- Backup: `aura-backup-v4.3` amb `canonicalMemory` i `evolutionDiary`

Consolidació v4.4 confirmada:

- Backup pre-v4.4: `backup-2026-06-26T10-07-44-235Z-35c4385e4c7a`
- Snapshot pre-v4.4: `integrity-2026-06-26T10-07-44-614Z-100`
- Validació local: `npm run check`
- Prova local: `GET /api/infrastructure` amb format `aura-cloudflare-infrastructure-v1`
- Backup post-v4.4 Pages: `backup-2026-06-26T11-33-51-169Z-d29f708455ab`
- Snapshot post-v4.4 Pages: `integrity-2026-06-26T11-33-51-522Z-100`
- Backup post-v4.4 Worker: `backup-auto-2026-06-26T11-33-51-926Z-a95405d4dd6b`
- Snapshot post-v4.4 Worker: `integrity-2026-06-26T11-33-52-017Z-100`
- Salut: `100/100 estable`
- Recompte final: 12 records, 36 entrades de diari, 27 gens
- Backup: `aura-backup-v4.4` amb `canonicalMemory`, `evolutionDiary` i `cloudflareInfrastructure`

Consolidació v4.5 confirmada:

- Backup pre-v4.5: `backup-2026-06-26T11-43-37-956Z-a95405d4dd6b`
- Snapshot pre-v4.5: `integrity-2026-06-26T11-43-38-364Z-100`
- Validació local: `npm run check`
- Prova local: `GET /api/web` amb format `aura-web-interface-v1`
- Backup post-v4.5 Pages: `backup-2026-06-26T11-47-27-629Z-f4a2bcf6cbba`
- Snapshot post-v4.5 Pages: `integrity-2026-06-26T11-47-28-059Z-100`
- Backup post-v4.5 Worker: `backup-auto-2026-06-26T11-47-28-535Z-fbb3ba987351`
- Snapshot post-v4.5 Worker: `integrity-2026-06-26T11-47-28-623Z-100`
- Salut: `100/100 estable`
- Recompte final: 12 records, 39 entrades de diari, 28 gens
- Backup: `aura-backup-v4.5` amb `canonicalMemory`, `evolutionDiary`, `cloudflareInfrastructure` i `webInterface`

Consolidació v4.6 confirmada:

- Backup pre-v4.6: `backup-2026-06-26T12-03-02-726Z-fbb3ba987351`
- Snapshot pre-v4.6: `integrity-2026-06-26T12-03-03-101Z-100`
- Validació local: `npm run check`
- Prova local: `GET /api/genome` amb format `aura-digital-genome-v1`
- Backup post-v4.6 Pages: `backup-2026-06-26T12-04-23-024Z-9184ec4129f8`
- Snapshot post-v4.6 Pages: `integrity-2026-06-26T12-04-23-349Z-100`
- Backup post-v4.6 Worker: `backup-auto-2026-06-26T12-04-23-906Z-582ed6e43a5a`
- Snapshot post-v4.6 Worker: `integrity-2026-06-26T12-04-23-998Z-100`
- Salut: `100/100 estable`
- Recompte final: 12 records, 42 entrades de diari, 29 gens
- Backup: `aura-backup-v4.6` amb `canonicalMemory`, `evolutionDiary`, `cloudflareInfrastructure`, `webInterface` i `digitalGenome`

Consolidació v4.7 confirmada:

- Backup pre-v4.7: `backup-2026-06-26T15-34-56-013Z-582ed6e43a5a`
- Snapshot pre-v4.7: `integrity-2026-06-26T15-34-56-509Z-100`
- Validació local: `npm run check`
- Prova local: `GET /api/metamemory`, `GET /api/purpose` i `GET /api/genome/candidates`
- Backup post-v4.7 Pages: `backup-2026-06-26T15-36-35-830Z-e6ea94165d99`
- Snapshot post-v4.7 Pages: `integrity-2026-06-26T15-36-36-159Z-100`
- Backup post-v4.7 Worker: `backup-auto-2026-06-26T15-36-36-599Z-a7bb01f6d91a`
- Snapshot post-v4.7 Worker: `integrity-2026-06-26T15-36-36-707Z-100`
- Salut: `100/100 estable`
- Recompte final: 12 records, 45 entrades de diari, 32 gens
- Metamemòria: 7 fundacionals, 2 evolutius, 1 operatiu, 1 temporal, 1 descartable
- Candidats genoma: 8 propostes, cap aplicada automàticament
- Backup: `aura-backup-v4.7` amb `canonicalMemory`, `evolutionDiary`, `cloudflareInfrastructure`, `webInterface`, `digitalGenome`, `evolutionaryPurpose`, `metamemory` i `genomeCandidates`

Consolidació v4.8 confirmada:

- Backup pre-v4.8: `backup-2026-06-26T16-08-07-194Z-a7bb01f6d91a`
- Snapshot pre-v4.8: `integrity-2026-06-26T16-08-07-606Z-100`
- Validació local: `npm run check`
- Prova local: `GET /api/evolution/state` i `GET /api/evolution/proposals`
- Backup post-v4.8 Pages: `backup-2026-06-26T16-09-51-417Z-9e40b49a08aa`
- Snapshot post-v4.8 Pages: `integrity-2026-06-26T16-09-51-806Z-100`
- Backup post-v4.8 Worker: `backup-auto-2026-06-26T16-09-52-289Z-dd0af028a409`
- Snapshot post-v4.8 Worker: `integrity-2026-06-26T16-09-52-385Z-100`
- Salut: `100/100 estable`
- Recompte final: 12 records, 48 entrades de diari, 35 gens
- Estat evolutiu: `consolidacio`, maduresa `alta`, pressió `moderada`
- Propostes evolutives: 4 propostes, cap aplicada automàticament
- Backup: `aura-backup-v4.8` amb `evolutionState` i `evolutionProposals`

Consolidació v4.9 confirmada:

- Cos digital 2D formalitzat amb `AURA_BODY.md`.
- Ordres `/cos-digital` i `aura body`.
- Endpoint `GET /api/body`.
- Gen `3524578 cos-digital-2d`.
- Backup: `aura-backup-v4.9` amb `digitalBody`.
- Salut final: `100/100 estable`.

Fase v5.0 iniciada:

- Biblioteca de coneixement verificable formalitzada amb `AURA_KNOWLEDGE.md`.
- Ordres `/coneixement`, `/biblioteca` i `aura knowledge`.
- Endpoint `GET /api/knowledge`.
- Gen `5702887 biblioteca-coneixement`.
- Backup: `aura-backup-v5.0` amb `knowledgeLibrary` i `knowledge`.
- RAG, embeddings, Vector DB i ingestió automàtica no estan actius.
- Backup Pages final: `backup-2026-06-27T09-53-58-655Z-8be2bb972f36`.
- Backup Worker final: `backup-auto-2026-06-27T09-53-19-980Z-8be2bb972f36`.
- Snapshot Worker final: `integrity-2026-06-27T09-53-20-178Z-100`.
- Salut final: `100/100 estable`.
- Recompte final: 12 records, 67 entrades de diari, 37 gens i 8 fonts.

Fase v5.1 iniciada:

- Autoreflexió operativa formalitzada amb `AURA_SELF_REFLECTION.md`.
- Ordres `/autoreflexio`, `/autoreflexió`, `/reflexio`, `/reflexió`, `aura reflection` i `aura self-reflection`.
- Endpoint `GET /api/self-reflection`.
- Gen `9227465 autoreflexio-operativa`.
- Backup: `aura-backup-v5.1` amb `selfReflection`.
- No implica consciència, comprensió subjectiva, experiència pròpia ni decisió autònoma.
- RAG, embeddings, Vector DB i ingestió automàtica continuen no actius.
- Producció i Worker responen `cloud-v5.1`.
- Salut final: `100/100 estable`.
- Recompte final: 12 records, 69 entrades de diari, 38 gens i 8 fonts.
- Backup Pages final: `backup-2026-06-27T10-34-47-091Z-5a31fb45ef07`.
- Backup Worker final: `backup-auto-2026-06-27T10-34-46-421Z-5a31fb45ef07`.
- Snapshot Worker final: `integrity-2026-06-27T10-34-46-524Z-100`.
- SHA-256 final compartit: `5a31fb45ef0714ac49ac05827258a23795e2a7b49fb6d434142971286dede905`.

Fase v5.2 iniciada:

- Orientació operativa formalitzada amb `AURA_ORIENTATION.md`.
- Ordres `/que-es-aura`, `/què-és-aura`, `/orientacio`, `/orientació`, `/proxim-pas`, `/pròxim-pas`, `aura orientation`, `aura next` i `aura what-is-aura`.
- Endpoint `GET /api/orientation` amb aliases `GET /api/que-es-aura`, `GET /api/proxim-pas` i variants accentuades.
- Gen `14930352 orientacio-operativa`.
- Backup: `aura-backup-v5.2` amb `orientation`.
- No implica consciència, comprensió subjectiva, experiència pròpia ni decisió autònoma.
- RAG, embeddings, Vector DB, multiagent i ingestió automàtica continuen no actius.
- Producció i Worker responen `cloud-v5.2`.
- Salut final: `100/100 estable`.
- Recompte final: 12 records, 70 entrades de diari, 39 gens i 8 fonts.
- Backup Pages final: `backup-2026-06-27T15-44-01-005Z-45b3adaa6e44`.
- Backup Worker final: `backup-auto-2026-06-27T15-44-00-145Z-45b3adaa6e44`.
- Snapshot Worker final: `integrity-2026-06-27T15-44-00-251Z-100`.
- SHA-256 final compartit: `45b3adaa6e440509a7af1650f2cba92b9c92a27a61f966597697ffb7d74cc75c`.
- Manteniment 2026-06-28: llistes de comandes en ordre alfabètic a la interfície, `/ajuda`, `aura help`, `README.md` i aquest manual.
- Pages desplegat: `https://36ce35b5.projecte-aura.pages.dev`.
- Backup Worker postmanteniment: `backup-auto-2026-06-27T22-18-19-506Z-45b3adaa6e44`.
- Snapshot Worker postmanteniment: `integrity-2026-06-27T22-18-19-630Z-100`.
- Integritat postmanteniment: `100/100 estable`.
- Manteniment Mode Sergi 2026-06-28: ordres `/mode-sergi` i `aura sergi-mode`, camp `clau Mode Sergi` i passos d'activació simplificats.
- Pages desplegat: `https://fa40b3c8.projecte-aura.pages.dev`.
- Backup Worker Mode Sergi: `backup-auto-2026-06-28T07-43-11-355Z-45b3adaa6e44`.
- Snapshot Worker Mode Sergi: `integrity-2026-06-28T07-43-11-457Z-100`.
- Integritat Mode Sergi: `100/100 estable`.
- Correcció Mode Sergi 2026-06-28: `GET /api/mode-sergi`, validació real en prémer `Activa` i estat `revisar` si la clau local no passa Pages.
- Pages desplegat: `https://30c95881.projecte-aura.pages.dev`.
- Backup Worker correcció Mode Sergi: `backup-auto-2026-06-28T09-39-12-965Z-cf6c521c61eb`.
- Snapshot Worker correcció Mode Sergi: `integrity-2026-06-28T09-39-13-053Z-100`.
- Integritat correcció Mode Sergi: `100/100 estable`.
- Manteniment verificació de records 2026-06-28: `/ultim-record`, `aura last-record` i confirmació de guardat amb ID i cerca directa.
- Pages desplegat: `https://f62458ab.projecte-aura.pages.dev`.
- Backup Worker `/ultim-record`: `backup-auto-2026-06-28T10-10-49-669Z-89fcfe1b6fd5`.
- Snapshot Worker `/ultim-record`: `integrity-2026-06-28T10-10-49-758Z-100`.
- Integritat `/ultim-record`: `100/100 estable`.
- Simplificació Aura Web 2026-06-28: només queden visibles els botons `Informe del dia`, `Grava un record` i `Llista de records`; les ordres avançades continuen al camp de text.
- Pages desplegat: `https://71eafd66.projecte-aura.pages.dev`.
- Backup Worker Aura Web simplificada: `backup-auto-2026-06-28T12-35-35-496Z-89fcfe1b6fd5`.
- Snapshot Worker Aura Web simplificada: `integrity-2026-06-28T12-35-35-625Z-100`.
- Integritat Aura Web simplificada: `100/100 estable`.
- Millora visual cos digital 2026-06-28: el ninot inicial passa a ser una presència digital 2D més amable amb rostre abstracte, halo orbital i nucli lluminós.
- Pages desplegat: `https://dcbbc74e.projecte-aura.pages.dev`.
- Backup Worker millora visual: `backup-auto-2026-06-28T12-43-29-939Z-89fcfe1b6fd5`.
- Snapshot Worker millora visual: `integrity-2026-06-28T12-43-30-042Z-100`.
- Integritat millora visual: `100/100 estable`.
- Quart botó 2026-06-28: s'afegeix `Últim record` com a comprovació ràpida després de gravar.
- Pages desplegat: `https://d04a6f09.projecte-aura.pages.dev`.
- Backup Worker quart botó: `backup-auto-2026-06-28T13-53-39-350Z-7eea3df95238`.
- Snapshot Worker quart botó: `integrity-2026-06-28T13-53-39-466Z-100`.
- Integritat quart botó: `100/100 estable`.
- Nou logo 2026-06-28: Aura usa monograma `A` orbital i canvas abstracte sense cara humana.
- Pages desplegat: `https://bc41b0b9.projecte-aura.pages.dev`.
- Backup Worker nou logo: `backup-auto-2026-06-28T21-56-05-220Z-794b22b82e7b`.
- Snapshot Worker nou logo: `integrity-2026-06-28T21-56-05-306Z-100`.
- Integritat nou logo: `100/100 estable`.
- Retirada Aura Ludus 2026-06-30: el subprojecte lúdic queda eliminat del producte i del desplegament; les rutes `/aura_ludus`, `/aura_ludus.html`, `/aura_ludus.css` i `/aura_ludus.js` redirigeixen a `/`, no hi ha instruccions d'ús actives, Pages queda desplegat a `https://b29124c6.projecte-aura.pages.dev` i la integritat final és `100/100 estable`.
- Backup Worker retirada Aura Ludus: `backup-auto-2026-06-30T18-40-53-098Z-794b22b82e7b`.
- Snapshot Worker retirada Aura Ludus: `integrity-2026-06-30T18-40-53-229Z-100`.

## Restauració segura

No restauris directament sense previsualitzar. El flux correcte és:

1. Llegeix `/backups`.
2. Fes un assaig amb `/assaig-restauracio <backup-id>`.
3. Si el checksum és coherent i el risc és acceptable, importa o previsualitza el JSON.
4. Aplica només amb `/confirma-restauracio`.
5. Si hi ha dubte, executa `/cancella-restauracio`.

La restauració segura ha de preservar IDs i evitar duplicats. Si Aura indica risc alt, checksum incoherent o D1 no disponible, no confirmis la restauració.

## Regles de treball

- No començar una nova versió abans de tenir clar quin comportament falta realment.
- No escriure records definitius si Aura està en mode local o D1 no respon.
- No modificar gens sense intenció explícita.
- No convertir candidats a genoma sense Mode Sergi, auditoria i actualització d'`AURA_GENOME.md`.
- No interpretar `descartable` com a esborrat; és només una marca heurística.
- No aplicar propostes evolutives sense decisió explícita de Sergi.
- Abans de tocar genoma, restauració o estructura de memòria, fer `/desa-backup` i `/desa-integritat`.
- Per ara, la retenció només planifica. No hi ha esborrat automàtic.

## Després de v5.2

Quan v5.2 estigui desplegada i estable, el següent pas és consolidar l'ús de `/que-es-aura`, `/proxim-pas`, `/pols` i `/nucli` durant diverses sessions. No activar RAG, embeddings, Vector DB o multiagent fins que l'orientació sigui útil, verificable i ben documentada.
