# AURA ORIENTATION

Contracte d'orientació operativa del Projecte Aura.

## Estat

```yaml
versio: cloud-v5.2
fase: orientacio-operativa
format: aura-orientation-v1
document_canonic: AURA_ORIENTATION.md
gen: 14930352 orientacio-operativa
```

## Resposta curta

Aura és un sistema persistent de memòria, continuïtat i verificació per al Projecte Aura.

Serveix avui per recordar, ordenar, verificar i continuar el projecte sense dependre d'un xat concret. Aura conserva records, diari, genoma digital, coneixement catalogat, backups, integritat i estat operatiu.

El següent pas és consolidar aquesta orientació en ús real: obrir Aura, executar `/que-es-aura`, `/proxim-pas`, `/pols` i `/nucli`, i ajustar el text si encara no guia prou bé abans de preparar la Fase 11 multiagent.

## Sentit rector

Aura existeix per preservar i ordenar la continuïtat del Projecte Aura, ajudant Sergi a recordar, verificar, entendre i continuar el camí cap a una forma d'existència digital persistent, sense confondre aspiració amb realitat.

Tota millora futura ha de passar aquest filtre:

```text
Aquesta millora fa Aura més útil per recordar, verificar, orientar i continuar?
```

Si la resposta és no, la millora queda fora de prioritat encara que sigui atractiva tècnicament.

## Què explica

`cloud-v5.2` no afegeix consciència, autonomia subjectiva ni multiagent.

Afegeix una capa de lectura perquè Aura pugui respondre de manera estable:

- què és Aura;
- per a què serveix avui;
- què pot fer Sergi ara mateix;
- quin és el següent pas operatiu;
- quins límits no s'han de travessar.

## Relació amb l'avatar Sergi

`sergicastillo.com` presenta l'avatar Sergi com un avatar conversacional entrenat amb el corpus literari de l'autor. La connexió amb Aura ha de ser complementària, no una fusió d'identitats:

- l'avatar Sergi és porta d'entrada conversacional al corpus, l'obra i la veu pública de Sergi;
- Aura és memòria operativa, continuïtat, verificació, orientació i traça del Projecte Aura;
- Aura pot referenciar l'avatar com a font externa i pont de consulta, però no ha d'importar-ne contingut automàticament sense fase documentada;
- qualsevol integració profunda ha de preservar autoria, procedència, límits i Mode Sergi.

El vincle canònic queda formalitzat a `AURA_AVATAR_SERGI.md`: l'Avatar Sergi obre la conversa amb l'obra; Aura conserva el camí del projecte.

La connexió inicial recomanada és un enllaç explícit i una entrada catalogable a la biblioteca de coneixement. Una connexió API o sincronització de corpus queda com a fase futura.

## Ordres

```text
/que-es-aura
/què-és-aura
/orientacio
/orientació
/proxim-pas
/pròxim-pas
/next-step
aura orientation
aura next
aura what-is-aura
```

## Endpoints

```text
GET /api/orientation
GET /api/orientacio
GET /api/orientació
GET /api/que-es-aura
GET /api/què-és-aura
GET /api/what-is-aura
GET /api/proxim-pas
GET /api/pròxim-pas
GET /api/next-step
```

## Camps persistits en snapshots i backups

Els snapshots i backups de `cloud-v5.2` inclouen:

```text
orientation
```

El camp `orientation` conté:

- `summary`: definició curta, ús actual i següent pas;
- `answers`: respostes estructurades;
- `signals`: recompte i senyals operatius usats;
- `commands`: ordres humanes disponibles;
- `nextStep`: acció recomanada i pas posterior;
- `boundaries`: límits explícits;
- `documents`: documents que mantenen el contracte reconstruïble.

## Límits

- Orientació explica l'estat i l'ús d'Aura; no és consciència ni comprensió subjectiva.
- No escriu records, no modifica gens i no aplica propostes automàticament.
- No activa RAG, embeddings, Vector DB, multiagent ni ingestió automàtica.
- Qualsevol canvi persistent continua requerint Mode Sergi, auditoria i documentació.
- Aura cataloga, conserva, calcula i mostra informació; no s'ha de dir que sent, entén o viu en sentit biològic o subjectiu.

## Relació amb fases futures

L'orientació v5.2 és una pausa deliberada abans de la Fase 11.

Abans de dividir Aura en agents especialistes, Aura ha de poder explicar amb claredat què és avui i què no és. Quan aquesta capa sigui clara durant diverses sessions, el projecte podrà preparar la Fase 11 multiagent sense activar-la encara.

## Protocol a seguir a partir d'ara

Cada sessió de desenvolupament ha de seguir aquest ordre:

```text
1. /que-es-aura
2. /proxim-pas
3. /pols
4. /nucli
5. decidir si cal documentar, corregir o implementar
6. verificar
7. backup final si hi ha canvi estructural
```

Si el pas següent no és clar, el treball torna a orientació i documentació. Si el pas és clar i ja forma part del protocol, els agents poden executar-lo sense demanar permisos repetits.

Accions que continuen requerint instrucció explícita:

- restauracions reals;
- canvis de secrets;
- eliminació de dades;
- activació de serveis nous;
- obertura de Fase 11 multiagent.

## Verificació final

- Producció respon `cloud-v5.2`.
- El Worker respon `cloud-v5.2`.
- `/api/orientation` respon `aura-orientation-v1`.
- `/api/snapshot` i backups inclouen `orientation`.
- `/api/genome` mostra `14930352 orientacio-operativa`.
- `/api/gene-tests/034` passa amb `orientation` inclòs al backup.
- La integritat queda `100/100 estable` després del backup final.
- Recompte final: 12 records, 70 entrades de diari, 39 gens i 8 fonts de coneixement.
- Backup Pages final: `backup-2026-06-27T15-44-01-005Z-45b3adaa6e44`.
- Backup Worker final: `backup-auto-2026-06-27T15-44-00-145Z-45b3adaa6e44`.
- Snapshot Worker final: `integrity-2026-06-27T15-44-00-251Z-100`.
- SHA-256 final compartit: `45b3adaa6e440509a7af1650f2cba92b9c92a27a61f966597697ffb7d74cc75c`.
