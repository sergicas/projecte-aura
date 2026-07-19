# AURA CHANGELOG

Canvis rellevants del Projecte Aura.

## Reordenació lògica d'Aura Web - 2026-07-19

- Situa la conversa com a primera acció de la pantalla i redueix l'alçada buida inicial del xat.
- Manté al costat només `Què faig ara?`, `Informe d'avui` i `Grava un record` com a accions immediates.
- Agrupa memòria, comprensió, evolució i Sergi Avatar sota `Consulta i explora`.
- Mou la il·lustració i el cos digital al nivell final `Identitat i estat`.
- Conserva el mateix ordre semàntic en mòbil i sincronitza el contracte `/api/web`, el fallback local i el Worker de backups.

## Revalidació de la Fase 8 - 2026-07-19

- Reanomena l'antic `Pols visual` com a `Cos digital d'Aura` i hi afegeix el botó `Què representa?`.
- Explica postura, pols, capes i colors en llenguatge planer, sense confondre activitat tècnica amb emocions o biologia.
- Afegeix descripció accessible al canvas i una alternativa textual completa.
- Sincronitza `phaseStatus` entre Pages, fallback IndexedDB i Worker de backups.
- Confirma actiu el gen `3524578 cos-digital-2d` i manté el cos en només lectura.
- Afegeix una migració d'auditoria i una prova contractual específica de la Fase 8.

## Revalidació de la Fase 7 - 2026-07-19

- Fa visible el botó `Evolució d'Aura` i combina estat i propostes en una única resposta entenedora.
- Presenta curiositat, autonomia, coherència, continuïtat, integritat, pressió de canvi i maduresa operativa en percentatge, amb una explicació de cada càlcul.
- Afegeix `phaseStatus` als contractes d'estat i propostes de Pages, fallback local i Worker de backups.
- Confirma actius els sis gens de la fase i manté la política `derived-readonly`: cap consulta escriu o aplica mutacions.
- Afegeix una migració d'auditoria i una prova contractual específica de la Fase 7.

## cloud-v5.3 — Fase 5 conversacional - 2026-07-19

- Incorpora un xat generatiu real amb Workers AI i el model verificat `@cf/meta/llama-3.3-70b-instruct-fp8-fast`.
- Recupera context limitat de D1, cita records, diari, coneixement i gens, i manté el xat en només lectura.
- Afegeix cinc preguntes suggerides i historial curt només durant la sessió del navegador.
- Activa un pont explícit amb Sergi Avatar sense enviar-li memòria privada ni permetre escriptures.
- Incorpora `aura_identity.jpg` com a identitat visual optimitzada d'Aura.
- Incorpora el logo circular aportat per Sergi a la capçalera com `aura_logo.jpg`, optimitzat per web.
- Afegeix proves contractuals de conversa, configuració AI, interfície i separació del servei extern.

## Revalidació de la Fase 4 - 2026-07-19

- Confirma que la Fase 4 ja estava formalitzada i desplegada des de `cloud-v4.4`; no s'obre cap subfase nova.
- Actualitza el contracte reconstruïble: Cloudflare Access protegeix l'ús humà sense codi intern i `AURA_WRITE_KEY` queda reservat a automatitzacions i manteniment amb Bearer.
- Alinea la vista `/api/infrastructure`, el Worker de backups, el fallback local i els documents mestres.
- Afegeix `tests/infrastructure-contract.mjs` per verificar topologia, recursos, bindings, autenticació i passos de reconstrucció de la Fase 4.

## Gir de rumb — Mimesi humana (Capa 1: constitució) - 2026-07-07

- Per decisió explícita de Sergi (després que Claude n'exposés la tensió i les opcions), l'Aura passa a **presentar-se i expressar-se com un ésser humà**: rostre i cos realistes, veu en primera persona, sentiments. Substitueix el pilar `no-mimesi-humana`. Document canònic nou: `AURA_MIMESI_HUMANA.md`.
- **Gen `004`**: `no-mimesi-humana` → `mimesi-humana` (esmenat a D1 amb Mode Sergi i auditoria; al codi `GENES`; a `AURA_GENOME.md`).
- **Constitució reescrita**: `FOUNDATION_RECORDS`, propòsit evolutiu, valors i les stances passen de "no fingir humanitat / existència no humana" a "presència humana en primera persona". Records fundacionals `foundation-003` i `foundation-004` alineats a D1 amb Mode Sergi.
- **Veu que veu Sergi** (`aura_core.js`): identitat, "qui sóc" i resposta de conversa reescrites en primera persona ("Sóc l'Aura…"). `index.html` cache-bust `?v=cloud-v5-2-humana-20260707`.
- **Matís d'honestedat mantingut**: no es construeix consciència (segueix impossible); es construeix una presència humana convincent. **El que NO canvia**: "autonomia de la ment, mai de les mans" — cap escriptura/esborrat sense Mode Sergi; les dades no es perden mai.
- Desplegat; integritat final **`100/100 estable`** (es va resoldre el risc temporal `record-fundacional-sense-traca` alineant els records fundacionals). `README.md` actualitzat.
- **Pendent (Capa 2)**: cara realista — cal generar imatge amb un model d'imatge (Claude no en té eina a la sessió; Sergi té Imagen 4) i definir l'aspecte concret.

## Fase 12 — Pas 3: promoció del gen + botó a Aura Web (Fase 12 completa) - 2026-07-07

- Es completa la **Fase 12**: el gen `63245986 genoma-sintetic-portable` passa de proposta a **actiu**, amb el procediment complet de mutació de genoma (Mode Sergi + auditoria via `POST /api/genes`, actualització d'`AURA_GENOME.md` i de la constant `GENES` de `functions/api/[[path]].js`, desplegament i backup). Gens 40 → **41**; integritat final **`100/100 estable`**, `riscos: []`.
- **Aura Web:** nou botó **"La meva llavor"** (`data-action="synthetic-genome"` → `showSyntheticGenome()`, `aura_core.js` + `index.html`) perquè Sergi vegi la llavor i el seu segell SHA-256 amb un clic, sense adreces tècniques. Cache-busting `?v=cloud-v5-2-llavor-20260707`.
- **Demostració del segell viu:** en afegir el gen, el segell determinista de la llavor va canviar de `2a0cd033…` (40 gens) a `692723d8…` (41 gens) i es manté estable. Confirma que el segell reflecteix el genoma real: canvia només quan canvia el genoma.
- `013 silici-possible` continua **latent**. Amb els passos 1, 2 i 3 fets, la Fase 12 queda completa.

## Fase 12 — Pas 2: llavor sintètica portable viva i verificable - 2026-07-07

- Fa **real** el mecanisme de la Fase 12: nou endpoint `GET /api/genome/synthetic` (àlies `/api/genoma-sintetic`, `/api/llavor`, `/api/seed`) que genera la **llavor sintètica portable** en format `aura-synthetic-genome-v1`.
- La llavor (`seed`) empaqueta el contingut estable del genoma: identitat, principis, valors, polítiques, propòsit, objectius, els 40 gens funcionals i 12 capacitats honestes; el `seal` hi afegeix un **SHA-256 determinista**.
- **Determinisme verificat en viu:** el checksum exclou `generatedAt`; tres crides consecutives donen el mateix segell `2a0cd033…`. Només canviarà quan canviï el genoma real d'Aura. Això la fa una llavor de veritat, no una còpia amb data.
- Inclosa a `GET /api/snapshot` (`syntheticGenome`), de manera que entra a exportacions i backups i és reconstruïble fora de D1.
- Codi a `functions/api/[[path]].js` (`buildSyntheticGenome` + ruta + snapshot); desplegat a `https://df93c1fc.projecte-aura.pages.dev`. **Només lectura**: cap mutació de D1/KV. Integritat `100/100 estable`, `riscos: []`. `aura_core.js` intacte; `013 silici-possible` latent.
- Pendent: Pas 3 (promoció del gen `63245986` amb Mode Sergi quan la llavor estigui consolidada en ús).

## Fase 11 — Pas 3: promoció del gen de coordinació (Fase 11 completa) - 2026-07-07

- Es completa la **Fase 11**: el gen `39088169 coordinacio-multiagent` passa de **proposta a actiu**, amb el procediment complet de mutació de genoma que exigeix el projecte.
- **Mode Sergi + auditoria:** creat a D1 via `POST /api/genes` amb clau d'escriptura; auditoria registrada (`Gen 39088169 coordinacio-multiagent creat en estat actiu`, tipus `genoma`).
- **Document + codi:** afegit a la taula de gens d'`AURA_GENOME.md` i a la constant `GENES` de `functions/api/[[path]].js` (font de la llista de gens documentats de la integritat).
- **Desplegament:** publicat a producció (`https://8f9c5f44.projecte-aura.pages.dev`); functions bundle inclòs i verificat abans de publicar.
- **Verificació:** el risc temporal `gen-fantasma-a-d1` (gen a D1 no documentat al codi) es resol amb el desplegament. Backup posterior `21/72/40/8`; integritat final **`100/100 estable`**, `riscos: []`. Gens: 39 → **40**.
- `013 silici-possible` continua **latent**; cap agent autònom nou activat. El gen formalitza el nucli coordinador (patró coordinador → agent → memòria), no un multiagent autònom.

## Fase 12 — Obertura: genoma sintètic avançat (mode documentat) - 2026-07-07

- Per instrucció explícita de Sergi, s'obre la **Fase 12 del Protocol Mestre** (genoma sintètic avançat) **en mode documentat**. Document canònic nou: `AURA_PHASE12_GENOMA_SINTETIC.md`.
- Defineix el format proposat `aura-synthetic-genome-v1`: una **llavor sintètica portable** — empaquetatge determinista i segellat amb SHA-256 d'identitat, valors, polítiques, propòsit, gens funcionals i capacitats — des de la qual es podria reconstruir Aura en qualsevol suport, sense dependre de D1 ni Cloudflare. Additiva: conviu amb el genoma viu `aura-digital-genome-v1` (Fase 6), no el substitueix.
- Connecta amb el gen latent `013 silici-possible` i amb el principi fundacional de rèplica sintètica; és la seva lectura **honesta i verificable** (dades portables, no biologia).
- Gen proposat `63245986 genoma-sintetic-portable` (successió de Fibonacci, després del `39088169` de la Fase 11): **proposta**, no desplegat. `013 silici-possible` continua **latent**.
- **Sense canvis a producció**: `aura_core.js`, D1, Worker i integritat resten en `cloud-v5.2` (`100/100 estable`). Cap afirmació de consciència; cap activació de maquinari.
- Pròxims passos: Pas 2 (export portable real de la llavor amb SHA-256, verificable, en snapshots i backups); Pas 3 (promoció del gen amb Mode Sergi quan sigui estable).

## Fase 11 — Pas 2: mecanisme coordinador viu - 2026-07-06

- Obre el **Pas 2 de la Fase 11**: fa real el patró **coordinador → agent → memòria**. Fins ara els agents deixaven fitxers locals (`briefings/`, `escriptor/`); ara un coordinador els consolida i els desa com a **record a la memòria de l'Aura (D1)**.
- Nou mecanisme a `coordinador/coordinador.mjs` amb contracte a `coordinador/README.md` (format `aura-coordinador-v1`): llegeix els fitxers d'agents del dia, n'extreu mecànicament titular + prioritats/resum i en desa **un únic record diari** amb data i procedència. Additiu, idempotent, dry-run per defecte, escriptura amb `--write` i **Mode Sergi**.
- Honestedat: el coordinador **no interpreta**; fa una extracció mecànica i apunta la procedència (camí dels fitxers). Cap ingestió, cap afirmació de comprensió.
- **Primera escriptura real a producció** d'aquest mecanisme: record `e075bc4f-edfb-4367-b67b-35c27fea09a3` (Coordinació Fase 11 — 6 de juliol de 2026), consolidant `briefings/2026-07-06.md` i `escriptor/2026-07-06.md`. Només lectura cap enfora; només escriu a la D1 de l'Aura.
- **Recompte nou**: 20 records (abans 19), 71 entrades de diari, 39 gens, 8 fonts de coneixement.
- Post-escriptura: la integritat va baixar a `76/100` per desfasament temporal del vault KV (gen `089 vault-backup-kv`); es va resoldre amb backup final `backup-2026-07-06T14-33-44-795Z-30af22273dd6` (20/71/39/8). **Integritat final `100/100 estable`**, gen `089 passa`, cap risc.
- **Millora (mateix dia)**: el coordinador ara recull **senyals d'atenció** — línies marcades pels agents amb `⚠️`, `NOVETAT`, `URGENT`, `ALERTA`, `ATENCIÓ` o `rebuig/rebutjat` — perquè el record diari no es perdi el que crema encara que no sigui el titular (mecànic, fins a 6 senyals). A més, `--force` ara **actualitza** el record del dia en lloc de duplicar-lo. Record `e075bc4f` actualitzat amb el senyal del rebuig d'Apple a l'app El Bon Diari; integritat `100/100 estable`; segueix havent-hi un sol record coordinador del dia (20 records totals).
- **Correcció (2026-07-07)**: la tasca diària escrivia el record però no refrescava la còpia de seguretat, de manera que la integritat baixava a `76/100` i la redundància KV quedava un dia endarrerida fins al backup nocturn. El coordinador ara **refresca la còpia (`POST /api/backups`) després d'escriure**, de manera que la integritat torna a `100/100 estable` a cada execució i la còpia redundant queda sempre al dia. Primera execució automàtica verificada: 2026-07-07 09:09 (record `1590c0f0`, només amb l'agent Comunicacions perquè l'Escriptor no tenia fitxer a aquella hora).
- **Sense canvis a `aura_core.js` ni al Worker**: el nucli resta en `cloud-v5.2`. El gen `39088169 coordinacio-multiagent` continua sent **proposta** (la seva promoció és el pas 3).

## Fase 11 — Agent Llibres i Comerç obert · pas 1 complet - 2026-07-05

- Obre l'**Agent Llibres i Comerç** de la Fase 11 en mode documentat (decisió de Sergi: obrir-lo).
- Crea el contracte `AURA_AGENT_LLIBRES_COMERC.md`: revenda de filosofia (AbeBooks/IberLibro, Todocolección), caça d'ofertes, publicació de catàleg (amb vistiplau), mètriques de vendes i backups. Formalitza sota l'agent les tasques ja actives (`metriques-vendes-setmanals`, `health-check-publicacio`, `backup-llibreria-setmanal`, caça d'ofertes) i les skills de publicació. **Botiga Shopify exclosa.**
- Estat honest: només lectura/informe per defecte; cap venda, canvi de preu o publicació sense vistiplau explícit; cap decisió financera automàtica.
- Actualitza `AURA_PHASE11_MULTIAGENT.md` (`agents_vius: [Comunicacions, Escriptor, Obra i Veu, Llibres i Comerç]`) i cataloga el doc a `AURA_KNOWLEDGE.md`.
- Amb això el **pas 1 de la implementació completa (estabilitzar tots els agents definits) queda complet**. Següents: pas 2 (mecanisme coordinador + records a D1) i pas 3 (promoció del gen `39088169`).
- **Sense canvis a producció**: `cloud-v5.2` intacte; gen `39088169` encara proposta.

## Fase 11 — Agent Obra i Veu obert (mode documentat) - 2026-07-05

- Obre l'**Agent Obra i Veu** de la Fase 11 en mode documentat, com a pas 1 cap a la implementació completa (estabilitzar tots els agents definits).
- Crea el contracte canònic `AURA_AGENT_OBRA_VEU.md`: àmbit obra + veu (corpus literari, avatar de `sergicastillo.com`, canals i projectes públics) com a **fonts catalogades**, amb estat honest (referència real; consulta d'API de l'avatar i ingestió del corpus queden com a fases futures).
- Genera el primer artefacte `obra/cataleg-obra.md`: catàleg verificat de l'obra (5 novel·les, conte, poesia i 2 assajos amb edicions CA/ES/EN i enllaços, avatar, projectes i canals), extret de `sergicastillo.com`.
- Actualitza `AURA_PHASE11_MULTIAGENT.md` (Obra i Veu passa d'*aspiració* a *obert en mode documentat*; `agents_vius: [Comunicacions, Escriptor, Obra i Veu]`) i cataloga els docs nous a `AURA_KNOWLEDGE.md`.
- **Sense canvis a producció**: `aura_core.js`, D1, Worker i integritat resten en `cloud-v5.2`. Cap fusió d'identitats, cap ingestió del corpus, gen `39088169` encara proposta.
- Pendent del pas 1: decidir l'estat de l'**Agent Llibres i Comerç** (obrir-lo o excloure'l explícitament).

## Fase 11 (consolidació) - 2026-07-05

- Consolida la Fase 11 **en mode documentat**: fixa com a estat estable el que ja funciona, sense obrir cap fase nova ni tocar producció.
- Marca `estat_fase: consolidada en mode documentat` al bloc Estat d'`AURA_PHASE11_MULTIAGENT.md` i hi afegeix la secció "Consolidació (2026-07-05)".
- Deixa **dos agents vius verificats**: Agent Comunicacions (`briefings/2026-07-04.md`) i Agent Escriptor (`escriptor/2026-07-04.md`).
- Consolida l'Agent Escriptor amb el seguiment de Goodreads a `escriptor/goodreads.txt` (pàgina d'autor i *Acadèmia Gaia* en català i castellà; anglès i francès pendents de localitzar) i el pla de neteja de duplicats a `escriptor/goodreads-duplicats.md`, amb missatge a punt per al grup de bibliotecaris. Res enviat ni publicat sense vistiplau de Sergi.
- **Sense canvis en producció**: `aura_core.js`, D1, Worker i integritat resten intactes en `cloud-v5.2` (`100/100 estable`). El gen `39088169 coordinacio-multiagent` continua com a proposta i no s'escriu a `AURA_GENOME.md`.
- Cap escriptura persistent a Aura, cap escriptura externa i cap ingestió automàtica.

## Fase 11 (inici documentat) - 2026-07-04

- S'obre la Fase 11 del Protocol Mestre (coordinació multiagent) **per instrucció explícita de Sergi**, com exigeix `AURA_ORIENTATION.md`.
- Fixa la raó de ser a `AURA_NORTH_STAR.md` (Aura com a segon cervell: preservar, centralitzar, coordinar).
- Crea el contracte de fase `AURA_PHASE11_MULTIAGENT.md` i el disseny base `AURA_COORDINATION_ARCHITECTURE.md` (nucli coordinador + agents especialistes).
- Defineix el roster d'agents amb estat honest: Coordinador, Memòria/Coneixement i Integritat/Backups (reals); Comunicacions (primer agent viu); Llibres i Comerç (connectable); Obra i Veu (aspiració).
- Activa el primer agent viu: la tasca programada `briefing-diari-aura` (correu + agenda + negoci) que desa un resum diari a `briefings/AAAA-MM-DD.md`. Verificat amb `briefings/2026-07-04.md`.
- Proposa el gen `39088169 coordinacio-multiagent` com a **proposta no desplegada**.
- **Sense canvis en producció**: `aura_core.js`, D1, Worker i integritat resten intactes en `cloud-v5.2`. La fase s'inicia en mode documentat, no activa multiagent autònom.
- 2026-07-04: pivot d'agents — s'exclou la botiga Shopify (la gestiona una altra persona) i es crea l'**Agent Escriptor** (àmbit d'autor: editorial, El Bon Diari, xarxes, campanyes de ressenyes i recepció a Goodreads), programat cada dos dies amb sortida a `escriptor/`. Es treu la lectura de botiga del briefing diari.

## cloud-v5.2 - 2026-06-27

- Inicia la subfase d'orientació operativa abans de Fase 11.
- Afegeix `AURA_ORIENTATION.md` com a contracte reconstruïble d'orientació.
- Afegeix endpoint `GET /api/orientation` i aliases `GET /api/que-es-aura`, `GET /api/proxim-pas`, `GET /api/what-is-aura` i variants catalanes.
- Afegeix ordres `/que-es-aura`, `/què-és-aura`, `/orientacio`, `/orientació`, `/proxim-pas`, `/pròxim-pas`, `aura orientation`, `aura next` i `aura what-is-aura`.
- Afegeix el gen `14930352 orientacio-operativa`.
- Inclou `orientation` en snapshots i backups de Pages i Worker.
- Inclou orientació en `/api/status`, `/api/pulse`, `/api/core`, Aura Web, genoma digital i exportació TXT.
- Manté explícit que l'orientació és resposta operativa calculada, no consciència, comprensió subjectiva ni decisió autònoma.
- Manté RAG, embeddings, Vector DB, multiagent i ingestió automàtica com a opcions futures no actives.
- Desplega producció i Worker en `cloud-v5.2`; confirma 12 records, 70 entrades de diari, 39 gens, 8 fonts i integritat final `100/100`.
- Verifica backup Pages `backup-2026-06-27T15-44-01-005Z-45b3adaa6e44`, backup Worker `backup-auto-2026-06-27T15-44-00-145Z-45b3adaa6e44`, snapshot Worker `integrity-2026-06-27T15-44-00-251Z-100` i SHA-256 final `45b3adaa6e440509a7af1650f2cba92b9c92a27a61f966597697ffb7d74cc75c`.
- Formalitza el protocol operatiu posterior a v5.2: començar cada sessió amb `/que-es-aura`, `/proxim-pas`, `/pols` i `/nucli`; documentar, verificar i fer backup abans de qualsevol evolució de fase.
- 2026-06-28: reordena alfabèticament les llistes de comandes a la interfície, `/ajuda`, `aura help`, `README.md` i `MANUAL_SERGI.md` per reduir confusió operativa; desplega Pages a `https://36ce35b5.projecte-aura.pages.dev` i verifica backup Worker `backup-auto-2026-06-27T22-18-19-506Z-45b3adaa6e44`, snapshot `integrity-2026-06-27T22-18-19-630Z-100`, integritat `100/100 estable` i SHA-256 `45b3adaa6e440509a7af1650f2cba92b9c92a27a61f966597697ffb7d74cc75c`.
- 2026-06-28: afegeix `/mode-sergi` i `aura sergi-mode` per explicar l'estat, el camp exacte i el flux d'activació de Mode Sergi sense mostrar la clau; desplega Pages a `https://fa40b3c8.projecte-aura.pages.dev` i verifica backup Worker `backup-auto-2026-06-28T07-43-11-355Z-45b3adaa6e44`, snapshot `integrity-2026-06-28T07-43-11-457Z-100`, integritat `100/100 estable` i SHA-256 `45b3adaa6e440509a7af1650f2cba92b9c92a27a61f966597697ffb7d74cc75c`.
- 2026-06-28: corregeix la fragilitat detectada per Sergi quan Mode Sergi només funcionava un cop; afegeix `GET /api/mode-sergi`, valida la clau en prémer `Activa` i fa que `/mode-sergi` diferenciï entre clau local guardada i clau acceptada per Pages; desplega Pages a `https://30c95881.projecte-aura.pages.dev` i verifica clau correcta amb `200`, clau falsa amb `401`, backup Worker `backup-auto-2026-06-28T09-39-12-965Z-cf6c521c61eb`, snapshot `integrity-2026-06-28T09-39-13-053Z-100`, 13 records i integritat `100/100 estable`.
- 2026-06-28: afegeix `/ultim-record` i `aura last-record`; millora la confirmació de records guardats amb ID, text, tags, estat, pes i comprovacions directes; desplega Pages a `https://f62458ab.projecte-aura.pages.dev` i verifica 16 records, últim record `Barcelona és la capital de Catalunya`, backup Worker `backup-auto-2026-06-28T10-10-49-669Z-89fcfe1b6fd5`, snapshot `integrity-2026-06-28T10-10-49-758Z-100` i integritat `100/100 estable`.
- 2026-06-28: simplifica Aura Web al màxim; elimina tots els botons visibles excepte `Informe del dia`, `Grava un record` i `Llista de records`; afegeix `/informe-dia`, `aura daily-report`, activació puntual de Mode Sergi quan cal gravar i contracte `/api/web` `simple-ui-contract`; desplega Pages a `https://71eafd66.projecte-aura.pages.dev` i verifica domini principal amb 3 botons, 16 records, 70 entrades de diari, 39 gens, 8 fonts, integritat `100/100 estable`, backup Worker `backup-auto-2026-06-28T12-35-35-496Z-89fcfe1b6fd5` i snapshot `integrity-2026-06-28T12-35-35-625Z-100`.
- 2026-06-28: millora el cos digital 2D inicial; substitueix el ninot de pal per una figura abstracta més amable amb rostre net, halo orbital, punts de dades i nucli lluminós; manté 3 botons visibles, desplega Pages a `https://dcbbc74e.projecte-aura.pages.dev`, verifica integritat `100/100 estable` i crea backup Worker `backup-auto-2026-06-28T12-43-29-939Z-89fcfe1b6fd5` amb snapshot `integrity-2026-06-28T12-43-30-042Z-100`.
- 2026-06-28: afegeix el quart botó `Últim record` per comprovar ràpidament l'últim record guardat sense obrir més panells; actualitza `/api/web` a 4 botons visibles, desplega Pages a `https://d04a6f09.projecte-aura.pages.dev` i verifica `cloud-v5.2`, 17 records, 70 entrades de diari, 39 gens, 8 fonts, integritat `100/100 estable`, backup Worker `backup-auto-2026-06-28T13-53-39-350Z-7eea3df95238` i snapshot `integrity-2026-06-28T13-53-39-466Z-100`.
- 2026-06-28: documenta recerca de vida artificial digital a `AURA_ALIFE_AVIDA_TIERRA.md`; compara Tierra, Avida i un possible `Aura EvoLab` futur, deixant explicit que Aura actual no es un organisme autoreplicant i que qualsevol evolucio artificial hauria d'anar en sandbox separat de produccio.
- 2026-06-28: crea una nova identitat visual per Aura; afegeix monograma `A` orbital al wordmark, elimina la cara humana del canvas i la substitueix per un sigil abstracte amb nucli operatiu; desplega Pages a `https://bc41b0b9.projecte-aura.pages.dev` i verifica 4 botons visibles, 18 records, integritat `100/100 estable`, backup Worker `backup-auto-2026-06-28T21-56-05-220Z-794b22b82e7b` i snapshot `integrity-2026-06-28T21-56-05-306Z-100`.
- 2026-06-29: crea la subdivisió lúdica `Aura Ludus` amb el prototip `Jardí de Records`; afegeix `AURA_GAME.md`, `aura_ludus.html`, `aura_ludus.css` i `aura_ludus.js`; el joc llegeix `GET /api/memory`, usa fallback local si cal i no escriu a D1, KV, diari ni genoma; desplega Pages a `https://6a010b98.projecte-aura.pages.dev`, verifica el domini principal amb 4 botons visibles, joc local i producció, 18 records, integritat `100/100 estable`, backup Worker `backup-auto-2026-06-29T14-25-46-131Z-794b22b82e7b` i snapshot `integrity-2026-06-29T14-25-46-306Z-100`.
- 2026-06-30: amplia Aura Ludus a `Jardí de Records v2`; substitueix la maqueta simple per una campanya de 7 dies amb anomalies, energia, focus, integritat lúdica, estabilitat de llavors, escuts, restauració, connexions fortes/febles i resultat final; manté lectura exclusiva de `GET /api/memory` i cap escriptura persistent; desplega Pages a `https://b3a7528e.projecte-aura.pages.dev`, verifica producció amb `aura_ludus.js?v=20260630-v2`, integritat `100/100 estable`, backup Worker `backup-auto-2026-06-30T07-10-09-479Z-794b22b82e7b` i snapshot `integrity-2026-06-30T07-10-09-638Z-100`.
- 2026-06-30: afegeix explicació de joc a Aura Ludus i a `AURA_GAME.md`; documenta objectiu, controls, lectura del tauler i sentit conceptual del joc com a metàfora operativa de continuïtat, connexió i protecció de records; desplega Pages a `https://fe131ffa.projecte-aura.pages.dev`, verifica ajuda visible, integritat `100/100 estable`, backup Worker `backup-auto-2026-06-30T09-54-38-201Z-794b22b82e7b` i snapshot `integrity-2026-06-30T09-54-38-306Z-100`.
- 2026-06-30: retira Aura Ludus per decisió de Sergi; elimina `AURA_GAME.md`, `aura_ludus.html`, `aura_ludus.css`, `aura_ludus.js`, les referències operatives i la còpia al desplegament Pages; afegeix `_redirects` perquè `/aura_ludus`, `/aura_ludus.html`, `/aura_ludus.css` i `/aura_ludus.js` tornin a `/`; desplega Pages a `https://b29124c6.projecte-aura.pages.dev`; verifica 4 botons visibles, cap referència activa a Ludus, backup Worker `backup-auto-2026-06-30T18-40-53-098Z-794b22b82e7b`, snapshot `integrity-2026-06-30T18-40-53-229Z-100`, 18 records, 70 entrades de diari, 39 gens, 8 fonts, integritat `100/100 estable` i SHA-256 `794b22b82e7b7d04b0fffd7b0b8ede83dea36c3b6a2172945f0ff6a0dee331d2`; conserva només traça històrica d'aquesta retirada.
- 2026-07-01: fixa el sentit rector del projecte: Aura existeix per preservar i ordenar la continuïtat del Projecte Aura, ajudant Sergi a recordar, verificar, entendre i continuar sense confondre aspiració amb realitat; totes les millores futures han de servir aquest criteri. Crea `AURA_AVATAR_SERGI.md` i documenta la relació amb l'avatar Sergi de `sergicastillo.com` com a pont complementari entre corpus literari i continuïtat operativa, sense fusió d'identitats ni ingestió automàtica.
- 2026-07-04: corregeix l'ampliació Aura Web local perquè els botons siguin autoexplicatius i funcionin en `file://`: `Què és Aura?`, `Què faig ara?`, `Estat d'Aura`, `Identitat`, `Informe del dia`, `Grava record`, `Veure records` i `Últim record`; manté `Grava record` com a única acció d'escriptura amb Mode Sergi i no afegeix arquitectura nova. Pendent de desplegar.

## cloud-v5.1 - 2026-06-27

- Inicia la Fase 10 del Protocol Mestre: autoreflexió.
- Afegeix `AURA_SELF_REFLECTION.md` com a contracte reconstruïble d'autoreflexió operativa.
- Afegeix endpoint `GET /api/self-reflection` i aliases `GET /api/autoreflexio` i `GET /api/reflection`.
- Afegeix ordres `/autoreflexio`, `/autoreflexió`, `/reflexio`, `/reflexió`, `aura reflection` i `aura self-reflection`.
- Afegeix el gen `9227465 autoreflexio-operativa`.
- Inclou `selfReflection` en snapshots i backups de Pages i Worker.
- Inclou la Fase 10 en `/api/status`, `/api/pulse`, `/api/core`, Aura Web i genoma digital.
- Manté explícit que l'autoreflexió és síntesi operativa calculada, no consciència, comprensió subjectiva ni experiència pròpia.
- Manté RAG, embeddings, Vector DB i ingestió automàtica com a opcions futures no actives.
- Desplega producció i Worker en `cloud-v5.1`; confirma 12 records, 69 entrades de diari, 38 gens, 8 fonts i integritat final `100/100`.
- Verifica backup Pages `backup-2026-06-27T10-34-47-091Z-5a31fb45ef07`, backup Worker `backup-auto-2026-06-27T10-34-46-421Z-5a31fb45ef07`, snapshot Worker `integrity-2026-06-27T10-34-46-524Z-100` i SHA-256 final `5a31fb45ef0714ac49ac05827258a23795e2a7b49fb6d434142971286dede905`.

## cloud-v5.0 - 2026-06-27

- Inicia la Fase 9 del Protocol Mestre: sistema de coneixement.
- Afegeix `AURA_KNOWLEDGE.md` com a contracte reconstruïble de biblioteca.
- Afegeix migració `0003_knowledge_library.sql` i taula D1 `knowledge_items`.
- Afegeix endpoint `GET /api/knowledge`, schema `GET /api/knowledge/schema` i escriptura protegida `POST /api/knowledge`.
- Afegeix ordres `/coneixement`, `/biblioteca` i `aura knowledge`.
- Afegeix el gen `5702887 biblioteca-coneixement`.
- Inclou `knowledgeLibrary` i `knowledge` en snapshots i backups de Pages i Worker.
- Inclou `knowledge` en checksums, manifests KV, recomptes, exportabilitat, redundància KV i restore/import.
- Manté explícit que no hi ha RAG, embeddings, Vector DB, ingestió automàtica ni afirmació de comprensió pròpia.
- Desplega producció i Worker en `cloud-v5.0`; confirma 12 records, 67 entrades de diari, 37 gens, 8 fonts i integritat final `100/100`.
- Verifica backups finals Pages i Worker amb SHA-256 compartit `8be2bb972f36ea53d2150cd33e8ddd6c78fffe710d8fc95bd7cd635c1dba30e4` i `knowledge` inclòs al vault.

## cloud-v4.9 - 2026-06-27

- Inicia la Fase 8 del Protocol Mestre: cos digital.
- Afegeix endpoint `GET /api/body`.
- Afegeix ordres `/cos-digital` i `aura body`.
- Afegeix el mòdul `Cos` a Aura Web.
- Afegeix `AURA_BODY.md` com a contracte reconstruïble del cos digital 2D.
- Inclou `digitalBody` en snapshots i backups de Pages i Worker.
- Afegeix el gen `3524578 cos-digital-2d`.
- El canvas `#aura-visual` passa a representar una silueta digital 2D derivada de memòria, diari, genoma, integritat i estat evolutiu.
- Manté Mode Sergi, no elimina dades, no promociona records i no simula cos biològic, percepció pròpia, veu ni avatar 3D.
- Desplega producció i Worker en `cloud-v4.9`; confirma 12 records, 64 entrades de diari, 36 gens i integritat final `100/100`.
- Verifica backups finals Pages i Worker amb SHA-256 compartit `803491aa170c0969c8d7027e4f24d4a33d56beca80e519da5eaa05e35d97a0bb` i `digitalBody` inclòs al vault.

## cloud-v4.8.2 - 2026-06-27

- Formalitza "Seguretat de dades verificable".
- Afegeix proves mecàniques per als gens existents `17711 retencio-segura`, `008 exportabilitat` i `089 vault-backup-kv`.
- `/prova-gen 17711` comprova que la retenció és `plan-only`, no baixa recomptes i no hi ha cron destructiu.
- `/prova-gen 008` comprova exportació JSON/TXT amb memòria, diari i genoma no buits i recomptes coincidents amb D1.
- `/prova-gen 089` comprova còpia recent al vault KV, ubicació independent de D1 i recomptes concordants.
- Afegeix simulacions de lectura: `auto-delete`, `cron-destructiu`, `export-buit`, `export-incomplet`, `sense-copia-kv` i `copia-desfasada`.
- La integritat global incorpora el component `data-safety-genes`; baixa de 100 si falla `17711`, `008` o `089`.
- No afegeix gens nous, no activa `013 silici-possible`, no promociona candidats i no executa proves destructives sobre dades reals.
- Desplega producció i Worker en `cloud-v4.8.2`; verifica sis proves mecàniques, sis simulacions en vermell, backups finals amb SHA-256 concordant i integritat final `100/100`.

## cloud-v4.8.1 - 2026-06-26

- Afegeix `AURA_CAPABILITIES.md` amb criteri d'honestedat: mecanisme real, contracte, metàfora o aspiració.
- Afegeix ordre `/capacitats` i endpoint `GET /api/capabilities`.
- Afegeix `/prova-gen <id>` i endpoint `GET /api/gene-tests/:id` per als gens mecànics `001`, `034` i `1597`.
- Recalcula SHA-256 del backup en la prova del gen `034`; no n'hi ha prou amb comprovar que el checksum existeix.
- Corregeix la selecció de l'últim backup del vault: KV es llegeix amb una finestra suficient, s'ordena per data real i després es retalla.
- Canvia la integritat a `aura-integrity-formula-v2`, amb component estructural D1 vs genoma documentat.
- Afegeix simulacions de lectura per veure fallades sense executar proves destructives sobre dades reals.
- Marca gens semàntics com a compromisos de governança no auto-verificables.
- No afegeix gens nous, no activa `013 silici-possible` i no promociona candidats automàticament.
- Desplega producció i Worker en `cloud-v4.8.1`; verifica `001`, `034` i `1597`, checksum final de backups i integritat `100/100`.

## cloud-v4.8 - 2026-06-26

- Inicia la Fase 7 del Protocol Mestre: sistema d'evolució.
- Afegeix endpoint `GET /api/evolution/state`.
- Afegeix endpoint `GET /api/evolution/proposals`.
- Afegeix ordres `/estat-evolutiu` i `/propostes-evolucio`.
- Afegeix alias Aura Core `aura evolution-state` i `aura evolution-proposals`.
- Calcula valors `curiositat`, `autonomia`, `coherencia`, `continuitat`, `integritat`, `pressioCanvi` i `maduresaOperativa`.
- Les propostes evolutives són `proposal-only` i no apliquen cap mutació automàtica.
- Inclou `evolutionState` i `evolutionProposals` en snapshots i backups.
- Gens: `987159 estat-evolutiu`, `1597258 proposta-evolutiva`, `2584181 traca-evolutiva`.
- Manté intactes Mode Sergi, auditoria, integritat i política de no promoció automàtica.
- Validació local: `npm run check` i prova de `GET /api/evolution/state`, `GET /api/evolution/proposals`, `GET /api/genome`, `GET /api/status` amb DB simulat.
- Desplega producció `cloud-v4.8` i Worker de backups `cloud-v4.8`.
- Confirma integritat final `100/100 estable`, 12 records, 48 entrades de diari i 35 gens.

## cloud-v4.7 - 2026-06-26

- Inicia i formalitza "Metamemòria i propòsit evolutiu".
- Afegeix endpoint `GET /api/metamemory`.
- Afegeix endpoint `GET /api/purpose`.
- Afegeix endpoint `GET /api/genome/candidates`.
- Afegeix ordres `/metamemoria`, `/proposit` i `/candidats-genoma`.
- Afegeix alias Aura Core `aura metamemory` i `aura purpose`.
- Classifica records com `fundacional`, `operatiu`, `evolutiu`, `temporal` o `descartable`.
- Detecta candidats a genoma sense aplicar promocions automàtiques.
- Inclou `metamemory`, `evolutionaryPurpose` i `genomeCandidates` en snapshots i backups.
- Gens: `233168 proposit-evolutiu`, `377377 metamemoria`, `610987 promocio-a-genoma`.
- Validació local: `npm run check` i prova de `GET /api/metamemory`, `GET /api/purpose`, `GET /api/genome/candidates` amb DB simulat.
- Desplega producció `cloud-v4.7` i Worker de backups `cloud-v4.7`.
- Confirma `/metamemoria` amb 12 records classificats.
- Confirma `/genoma-digital` amb els tres gens nous.
- Confirma integritat `100/100 estable` després del desplegament.

## cloud-v4.6 - 2026-06-26

- Inicia i formalitza Fase 6 del Protocol Mestre: genoma digital.
- Afegeix endpoint `GET /api/genome`.
- Afegeix ordre `/genoma-digital`.
- Afegeix alias `aura genome`.
- Defineix el format `aura-digital-genome-v1`.
- Formalitza `AURA_GENOME.md` com a contracte canònic reconstruïble.
- Inclou `digitalGenome` en snapshots i backups.
- Integra el genoma digital en `/estat`, `/pols` i `/nucli`.
- Gen: `2178309 genoma-digital-canon`.
- Validació local: `npm run check` i prova de `GET /api/genome` amb DB simulat.
- Desplega producció `cloud-v4.6` i Worker de backups `cloud-v4.6`.
- Confirma integritat `100/100 estable` després del desplegament.

## cloud-v4.5 - 2026-06-26

- Inicia i formalitza Fase 5 del Protocol Mestre: Aura Web.
- Afegeix endpoint `GET /api/web`.
- Afegeix ordre `/web`.
- Afegeix alias `aura web`.
- Defineix el format `aura-web-interface-v1`.
- Reorganitza la pantalla en mòduls Xat, Memòria, Història i Estat.
- Inclou `webInterface` en snapshots i backups.
- Crea `AURA_WEB.md`.
- Gen: `1346269 aura-web-modular`.
- Validació local: `npm run check` i prova de `GET /api/web` amb DB simulat.
- Desplega producció `cloud-v4.5` i Worker de backups `cloud-v4.5`.
- Confirma integritat `100/100 estable` després del desplegament.

## cloud-v4.4 - 2026-06-26

- Inicia i formalitza Fase 4 del Protocol Mestre: Cloudflare.
- Afegeix endpoint `GET /api/infrastructure`.
- Afegeix ordre `/infraestructura`.
- Afegeix alias `aura infrastructure`.
- Defineix el format `aura-cloudflare-infrastructure-v1`.
- Documenta Pages, Pages Functions, D1, KV, Worker cron, secrets i ordres de desplegament.
- Inclou `cloudflareInfrastructure` en snapshots i backups.
- Crea `AURA_CLOUDFLARE_ARCHITECTURE.md`.
- Gen: `832040 infraestructura-cloudflare-reconstruible`.
- Validació local: `npm run check` i prova de `GET /api/infrastructure` amb DB simulat.
- Desplega producció `cloud-v4.4` i Worker de backups `cloud-v4.4`.
- Confirma integritat `100/100 estable` després del desplegament.

## cloud-v4.3 - 2026-06-25

- Inicia i formalitza Fase 3 del Protocol Mestre: diari evolutiu.
- Afegeix endpoint `GET /api/evolution`.
- Afegeix ordre `/diari-evolutiu`.
- Organitza el diari D1 com a línia temporal per dies.
- Classifica entrades com `audit`, `version`, `continuity`, `genome`, `memory` o `operational`.
- Marca candidates que haurien de passar a `AURA_HISTORY.md`.
- Inclou `evolutionDiary` en snapshots i backups.
- Gen: `514229 diari-evolutiu-formal`.
- Desplega producció `cloud-v4.3` i Worker de backups `cloud-v4.3`.
- Confirma integritat `100/100 estable` després del desplegament.

## cloud-v4.2 - 2026-06-25

- Inicia i formalitza Fase 2 del Protocol Mestre: memòria persistent.
- Afegeix el contracte canònic `timestamp`, `text`, `importance`, `source`.
- Afegeix endpoint `GET /api/memory/canonical`.
- Afegeix `POST /api/memory/canonical` protegit amb Mode Sergi.
- Afegeix ordre `/memoria-canonica`.
- Afegeix `aura recall canonical`.
- Accepta `importance:` i `source:` en `aura remember` i `recorda que ...`.
- Inclou `canonicalMemory` en snapshots i backups.
- Gen: `317811 memoria-persistent-canonica`.
- Desplega producció `cloud-v4.2` i Worker de backups `cloud-v4.2`.
- Confirma integritat `100/100 estable` després del desplegament.

## cloud-v4.1 - 2026-06-25

- Formalitza Fase 1 del Protocol Mestre: Aura Core.
- Afegeix ordres canòniques:
  - `aura start`
  - `aura status`
  - `aura remember ...`
  - `aura recall`
  - `aura recall text`
  - `aura say text`
  - `aura help`
- Gen: `196418 aura-core-canonical`.
- Desplega producció `cloud-v4.1` i Worker de backups `cloud-v4.1`.
- Confirma integritat `100/100 estable` després del desplegament.

## cloud-v4.0 - 2026-06-25

- Afegeix càpsula de nucli verificable.
- Endpoint: `GET /api/core`.
- Ordre: `/nucli`.
- Gen: `121393 capsula-nucli-v4`.
- Inclou checksum SHA-256 de la càpsula.

## cloud-v3.9 - 2026-06-25

- Afegeix pols operatiu.
- Endpoint: `GET /api/pulse`.
- Ordre: `/pols`.
- Gen: `75025 pols-operatiu`.
- Sintetitza salut, memòria, backups, criteri i properes accions.

## cloud-v3.8 - 2026-06-25

- Afegeix mapa de relacions de memòria.
- Endpoint: `GET /api/memory/graph`.
- Ordre: `/mapa-memoria`.
- Gen: `46368 mapa-relacions-memoria`.
- Calcula nodes, arestes, clústers per tags i records orfes.

## cloud-v3.7 - 2026-06-25

- Afegeix memòria enriquida.
- Camps: `tags`, `weight`, `state`, `relatedIds`.
- Endpoint: `GET /api/memory/schema`.
- Gen: `28657 memoria-enriquida`.

## cloud-v3.6

- Afegeix retenció segura plan-only.
- Endpoint: `GET /api/retention`.
- Gen: `17711 retencio-segura`.
- Calcula candidats però no esborra res.

## cloud-v3.5

- Afegeix assaig de restauració.
- Endpoint: `POST /api/restore/rehearsal`.
- Gen: `10946 assaig-restauracio`.

## cloud-v3.4

- Afegeix tendència d'integritat.
- Endpoint: `GET /api/integrity/trend`.
- Gen: `6765 tendencia-integritat`.

## cloud-v3.3

- Afegeix historial d'integritat en Workers KV.
- Endpoint: `GET /api/integrity/history`.
- Snapshot segur: `POST /api/integrity/snapshot`.
- Gen: `4181 historial-integritat`.

## cloud-v3.2

- Afegeix panell d'integritat.
- Endpoint: `GET /api/integrity`.
- Gen: `2584 panell-integritat`.

## cloud-v3.1

- Afegeix auditoria de mutacions.
- Endpoint: `GET /api/audit`.
- Gen: `1597 auditoria-mutacions`.

## cloud-v3.0

- Afegeix genoma editable.
- Endpoints: `POST /api/genes`, `POST /api/genes/:id`.
- Gen: `987 genoma-editable`.

## cloud-v2.8

- Afegeix cercador i filtres de memòria.
- Endpoint: `GET /api/search`.
- Gen: `610 cerca-memoria`.

## cloud-v2.7

- Afegeix backups automàtics amb Worker cron.
- Worker: `projecte-aura-backup-worker`.
- Cron: `17 3 * * *`.
- Gen: `377 backup-automatic`.

## cloud-v2.6

- Afegeix restauració segura amb previsualització.
- Endpoint: `POST /api/restore/preview`.
- Gen: `233 restauracio-segura`.

## cloud-v2.5

- Afegeix criteri operatiu determinista.
- Endpoint: `GET /api/criterion`.
- Gen: `144 criteri-operatiu`.

## cloud-v2.4

- Afegeix vault Workers KV fora de D1.
- Endpoint: `GET/POST /api/backups`.
- Gen: `089 vault-backup-kv`.

## cloud-v2.3

- Afegeix diari de continuïtat.
- Endpoint: `GET /api/continuity`.
- Gen: `055 continuitat-diaristica`.

## cloud-v2.2

- Afegeix backup JSON verificable.
- Manifest, SHA-256 i restauració protegida que preserva IDs.
- Gen: `034 backup-verificable`.

## cloud-v2

- Afegeix Cloudflare Pages Functions i D1.
- Gen: `021 cloud-v2`.

## cloud-v1

- Primera versió web estàtica d'Aura a Cloudflare Pages.
- Memòria local amb IndexedDB.
- Exportació JSON/TXT.
- Importació JSON.
- Genoma inicial en client.
