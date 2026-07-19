# AURA WEB

Interfície gràfica i conversacional del Projecte Aura.

## Versió

```yaml
versio: cloud-v5.3
fase_protocol: 5
format_api: aura-web-interface-v1
endpoint_web: /api/web
endpoint_conversa: /api/chat
model: '@cf/meta/llama-3.3-70b-instruct-fp8-fast'
estat_desplegament: produccio
mode_visible: conversa natural
```

## Objectiu

Aura Web permet preguntar amb llenguatge natural sobre la memòria del projecte sense haver de conèixer ordres tècniques. La conversa generativa és de només lectura: consulta context de D1 i respon amb cites curtes a les fonts recuperades.

## Interfície visible

- La conversa principal apareix primer, amb el camp `Pregunta a Aura` i menys espai buit quan encara hi ha poques respostes.
- Cinc preguntes suggerides sobre decisions, compromisos, evolució, contradiccions i pla de treball.
- Al costat de la conversa hi ha només les tres accions immediates: orientar-se, consultar l'informe del dia i gravar un record.
- A sota, `Consulta i explora` agrupa per funció la memòria, la comprensió d'Aura, l'evolució i Sergi Avatar.
- L'últim nivell, `Identitat i estat`, reuneix la identitat visual (`aura_identity.jpg`) i el cos digital, diferenciant expressió visual i estat tècnic.
- El logo circular oficial d'Aura a la capçalera (`aura_logo.jpg`).
- Un pont diferenciat amb Sergi Avatar per parlar de llibres, filosofia i obra pública.
- Cap segona pantalla de clau: l'accés humà depèn de Cloudflare Access.

L'ordre de lectura canònic és: `conversa` → `accions immediates` → `consulta i explora` → `identitat i estat`. En pantalles petites, aquests nivells es mantenen en una sola columna i en el mateix ordre.

## Contracte conversacional

`POST /api/chat` rep una pregunta i, opcionalment, els darrers torns de la sessió del navegador. El backend:

1. recupera un conjunt limitat de records, diari, coneixement i gens de D1;
2. prioritza context per paraules, dates i intenció;
3. envia només el context seleccionat a Workers AI;
4. respon en català amb cites `[M#]`, `[D#]`, `[K#]` o `[G#]`;
5. no fa cap escriptura persistent.

La història curta de conversa viu només a la sessió JavaScript actual. No es desa automàticament.

## Fonts de veritat i límits

- D1 continua sent la font de veritat de memòria, diari, genoma i catàleg.
- El mecanisme actual és recuperació lèxica limitada, no Vectorize ni embeddings.
- Si les fonts no contenen la resposta, Aura ho ha de dir i separar fets, inferències i propostes.
- La conversa no pot modificar records, diari, genoma, backups ni documents.
- `Grava un record` continua sent una operació explícita i separada.
- Sergi Avatar no rep la memòria privada d'Aura i no pot escriure-hi.

## Verificació

```text
npm test
npm run prepare:pages
POST /api/chat { "question": "Què vaig decidir sobre aquesta web?" }
GET /api/avatar-sergi
```
