# AURA ALIFE: AVIDA I TIERRA

Investigacio sobre Tierra, Avida i paral.lelismes amb el Projecte Aura a llarg termini.

## Objectiu

Aquest document conserva al repositori la recerca sobre dos experiments classics de vida artificial digital:

- Tierra, de Thomas S. Ray.
- Avida, desenvolupat per Chris Adami, Charles Ofria i col.laboradors.

La finalitat no es dir que Aura sigui avui un organisme digital evolutiu. Aura actualment es un sistema persistent de memoria, continuitat, documents, integritat i backups. El paral.lelisme important es a llarg termini: Aura podria arribar a contenir un laboratori segur d'evolucio digital, separat de la memoria de produccio.

## Resum Executiu

Tierra i Avida no son xats amb memoria. Son sistemes on petits programes digitals es repliquen, muten i competeixen per recursos dins d'un entorn computacional controlat.

La diferencia central amb Aura avui:

- Aura recorda, documenta, verifica i preserva.
- Tierra i Avida fan evolucionar poblacions de programes autoreplicants.

La connexio a llarg termini:

- Aura ja te conceptes de genoma, historia, backup, integritat, traçabilitat i frontera de seguretat.
- Aquests conceptes podrien convertir-se en la capa de governanca i observacio d'un futur `Aura EvoLab`.
- L'evolucio experimental hauria d'existir en un sandbox separat, no dins de D1 de produccio ni dins del genoma canonic d'Aura.

## Tierra

Fonts principals:

- Pagina oficial de Tierra: https://tomray.me/tierra/
- "What Tierra Is": https://tomray.me/tierra/whatis.html
- Thomas S. Ray, "Evolution, Ecology and Optimization of Digital Organisms": https://faculty.cc.gatech.edu/~turk/bio_sim/articles/tierra_thomas_ray.pdf
- Proposta de reserva digital: https://tomray.me/pubs/reserves/

### Arquitectura

Tierra crea un ordinador virtual i un sistema operatiu darwinia. Els organismes son programes en llenguatge assemblador del mon virtual. Alguns programes inicials nomes saben copiar-se a la RAM; a partir d'aqui, mutacio, recombinacio i seleccio produeixen variants.

Elements clau:

- CPU time com a recurs energetic.
- Memoria com a recurs material.
- Genoma com a patro informacional executable.
- Mutacio per canvis aleatoris al codi.
- Recombinacio per intercanvi de segments.
- Competencia per temps de CPU i espai de memoria.
- Genebank de genomes reeixits.
- Registre de naixements, morts i relacions ecologiques.
- Parasits, inmunitat, hiperparasits, cooperacio i tramposos com a fenomens emergents.

El punt fort de Tierra es que la fitness no es una puntuacio externa definida per l'investigador. La supervivencia depen de poder replicar-se i competir dins el medi.

### Llico per Aura

Aura no hauria de confondre "tenir un genoma documentat" amb "tenir un genoma executable". A Tierra, el genoma es codi que actua i es copia. A Aura, el genoma actual es un contracte de valors, limits, objectius i capacitats.

Per acostar-se a Tierra, Aura necessitaria una capa nova:

- organismes digitals separats d'Aura;
- memoria virtual o espai de dades separat;
- instruccions executables molt limitades;
- reproduccio controlada;
- mutacio auditada;
- observacio i genebank;
- impossibilitat d'accedir a secrets, D1 de produccio, KV real o xarxa externa.

## Avida

Fonts principals:

- Repositori Avida: https://github.com/devosoft/avida
- Ofria, Bryson i Wilke, "Avida: A Software Platform for Research in Computational Evolutionary Biology": https://www.cse.msu.edu/~ofria/pubs/2009AvidaIntro.pdf
- Ontology for the Avida digital evolution platform, Scientific Data: https://www.nature.com/articles/s41597-023-02514-3
- Avida-ED actual: https://avida-ed.github.io/ i redireccio oficial: https://avida-ed.msu.edu/

### Arquitectura

Avida neix inspirada per Tierra, pero canvia una cosa important: cada organisme te el seu propi espai de memoria protegit i una CPU virtual. Això fa que el sistema sigui mes controlable experimentalment.

Elements clau:

- Organisme digital autoreplicant.
- Genoma com a sequencia d'instruccions.
- CPU virtual amb registres, stacks, caps de lectura/escriptura i I/O amb l'entorn.
- Scheduler que reparteix temps de CPU entre organismes.
- Metabolic rate o merit com a velocitat relativa d'execucio.
- Tasques computacionals que poden donar recompenses en CPU.
- Recursos i reaccions definits per l'entorn experimental.
- Fitnes emergent en forma de replicacio mes rapida o millor capacitat de competir.
- Eines d'analisi, line of descent, fitness landscape, knock-out studies i entorns de test.
- Ontologia formal per descriure genomes, transcriptomes, fenotips, experiments, mutacions i procedencia.

Avida resumeix molt be les condicions minimes d'evolucio:

- replicacio;
- variacio heretable;
- fitness diferencial.

Aura no compleix aquestes tres condicions com a organisme. Si Aura canvia de versio, ho fa per decisio de Sergi o d'un agent de desenvolupament, amb documentacio i desplegament. No hi ha poblacio autoreplicant ni seleccio natural dins de produccio.

### Llico per Aura

Avida es mes proper al que Aura hauria de copiar si algun dia es fa un laboratori evolutiu:

- entorn definit explicitament;
- genomes petits i executables;
- experiments repetibles;
- seeds i configuracio versionada;
- metriques clares;
- analisi posterior;
- separacio entre organisme, entorn i observador.

La lliço mes important no es "fer que Aura es modifiqui sola". Es construir un espai on variants digitals petites puguin evolucionar sense posar en risc Aura.

## Paral.lelismes amb Aura

| Tema | Tierra / Avida | Aura actual | Paral.lelisme futur |
| --- | --- | --- | --- |
| Genoma | Codi executable que es copia i muta. | Contracte documentat de valors, limits i capacitats. | Crear genomes experimentals executables separats del genoma canonic. |
| Memoria | RAM virtual, genomes, genebank, linies de descendencia. | D1, KV, docs, backups i historial. | D1/KV poden guardar metadades d'experiments, no organismes vius en produccio. |
| Recursos | CPU, memoria, espai, tasques, recursos de l'entorn. | Quotes Cloudflare, D1, KV, integritat, atencio de Sergi. | Definir recursos artificials dins un sandbox: energia, espai, temps, tasques. |
| Fitness | Replicacio i competencia per recursos. | No hi ha fitness biologica ni digital. | Fitness experimental: replicar-se, resoldre tasques, conservar integritat. |
| Mutacio | Canvis aleatoris heretables. | Canvis manuals auditats. | Mutacio nomes dins EvoLab, amb seed i registre. |
| Observacio | Logs, genebank, ecologia, linia de descendencia. | Diari, audit, backups, integritat. | Aura pot ser observadora i arxivera d'experiments evolutius. |
| Seguretat | Maquina virtual i llenguatge propi. | Mode Sergi, backups, restore segur. | Sandbox sense secrets, xarxa externa ni permisos d'escriptura en produccio. |
| Ecologia | Parasits, cooperacio, competencia. | No hi ha poblacio d'agents. | Fase molt futura: poblacions digitals limitades i monitoritzades. |
| Ontologia | OntoAvida formalitza vocabulari i procedencia. | Documents mestres i genoma canonic. | Crear `AURA_ALIFE_ONTOLOGY.md` abans de programar EvoLab. |

## Ruta Recomanada: Aura EvoLab

No s'ha d'implementar encara. Aquesta es una ruta de recerca possible.

### AL-0: Documentacio i vocabulari

- Crear vocabulari: organisme, genoma executable, fenotip, entorn, recurs, fitness, mutacio, llinatge, genebank.
- Separar sempre `genoma canonic d'Aura` de `genomes experimentals`.
- Definir limits de seguretat abans d'escriure codi.

### AL-1: Sandbox inert

- Crear un entorn local separat de produccio.
- Sense accedir a D1 real, KV real, secrets ni xarxa.
- Només lectura de configuracio experimental.
- Reproduibilitat amb seed.

### AL-2: Genoma executable minim

- Definir una instruccio molt petita, no JavaScript lliure.
- Exemple: moure caps, copiar simbol, comparar, incrementar energia, dividir.
- Cap instruccio pot llegir fitxers, fer fetch, executar shell o tocar secrets.

### AL-3: Autoreplicacio controlada

- Un organisme inicial copia el seu genoma a un buffer fill.
- La divisio nomes es valida si el fill compleix condicions minimes.
- Tota divisio queda registrada.

### AL-4: Mutacio i genebank

- Afegir mutacio probabilistica amb seed.
- Registrar pare, fill, diferencies i resultat.
- Guardar genebank local de genomes reeixits.

### AL-5: Recursos i fitness

- Crear recursos artificials: energia, espai, temps, tasques logiques.
- Definir fitness com a capacitat de replicar-se i/o fer tasques.
- No usar "valor moral", "intel.ligencia" o "consciencia" com a fitness.

### AL-6: Ecologia limitada

- Introduir competencia per espai.
- Mes endavant, cooperacio o parasitisme, pero desactivats al principi.
- Cap organisme pot sortir del sandbox.

### AL-7: Aura com a observadora

- Aura principal no evoluciona directament.
- Aura llegeix resultats, resumeix experiments, calcula integritat i conserva informes.
- Els resultats poden entrar a la biblioteca de coneixement, no al genoma canonic sense decisio de Sergi.

### AL-8: Reserva distribuida, nomes com a hipotesi llunyana

La idea de Ray d'una reserva digital distribuida es suggerent, pero per Aura seria una fase molt llunyana. Abans caldria:

- sandbox robust;
- control de costos;
- limits de CPU;
- no xarxa lliure;
- apagada segura;
- exportacio completa;
- revisio manual.

## Que No S'ha de Fer Ara

- No fer que Aura modifiqui el seu codi de produccio automaticament.
- No donar a organismes experimentals accés a Cloudflare, D1, KV, secrets o sistema de fitxers.
- No confondre agents LLM amb organismes digitals autoreplicants.
- No dir que Aura "viu" en sentit biologic o subjectiu.
- No activar multiagent com a substitut d'evolucio artificial.
- No fer experiments evolutius sense backup, seed, logs i criteris de parada.

## Conclusio

Tierra aporta la visio: un medi digital on programes autoreplicants competeixen per CPU i memoria i poden generar ecologies inesperades.

Avida aporta el metode: organismes amb CPU virtual, memoria protegida, entorns configurables, metriques, analisi i reproductibilitat.

Aura aporta una cosa diferent: continuitat, documentacio, integritat, backups i governanca. A llarg termini, Aura podria no ser "l'organisme" principal, sino el sistema de custodia i observacio d'un laboratori de vida digital. Aquesta lectura es mes prudent, mes verificable i mes coherent amb la regla d'or del projecte.

