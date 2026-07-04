# Article Diari Gratuït

Automatització local per a macOS que busca cada matí un article o assaig recent, gratuït i accessible sense mur de pagament, el desa a `~/Desktop/Articles/AAAA-MM/` i manté un historial local per no repetir articles.

## Què fa

* Consulta fonts obertes prioritzant RSS.
* Filtra articles publicats durant els últims 14 dies.
* Evita URL ja descarregats amb `data/history.json`.
* Descarta pàgines amb senyals de paywall, subscripció obligatòria o registre obligatori.
* No intenta cap bypass de paywalls.
* Desa només una versió: HTML.
* Desa HTML net quan l'extracció és fiable.
* Si l'extracció falla, desa l'HTML original.
* Mostra una notificació de macOS: `Article diari descarregat: [títol]`.

## Instal·lació

Des d'aquesta carpeta:

```bash
cd /Users/sergicastillo/Documents/Aura/article_diari_gratuit
./scripts/install_launchd.sh
```

Això desplega una còpia executable a `~/Library/Application Support/ArticleDiariGratuit`, crea un entorn virtual `.venv`, instal·la dependències, crea `~/Desktop/Articles`, escriu el LaunchAgent a `~/Library/LaunchAgents/com.sergicastillo.article-diari-gratuit.plist` i el carrega amb `launchctl`.

L'execució diària queda programada a les 08:00. També s'executa quan es carrega el LaunchAgent i fa comprovacions horàries. Abans de les 08:00 no descarrega res, i el registre anti-duplicats evita que baixi més d'un article al dia.

## Execució manual

Prova sense descarregar res:

```bash
"$HOME/Library/Application Support/ArticleDiariGratuit/scripts/run_once.sh" --dry-run --no-notify
```

Descarrega una recomanació ara:

```bash
"$HOME/Library/Application Support/ArticleDiariGratuit/scripts/run_once.sh"
```

Si ja hi ha una execució registrada avui i vols forçar una nova cerca:

```bash
"$HOME/Library/Application Support/ArticleDiariGratuit/scripts/run_once.sh" --force
```

## Sortida

Els fitxers es creen dins:

```text
~/Desktop/Articles/2026-07/
```

El patró és:

```text
AAAA-MM-DD_mitja_titol-curt.html
```

Si no hi ha cap recomanació fiable:

```text
AAAA-MM-DD_cap-recomanacio-fiable-avui.html
```

## Fonts

Les fonts es configuren a `sources.json`. Les inicials són Aeon, Psyche, Quanta Magazine, Nautilus, The Conversation, MIT Technology Review només si és obert, Noema Magazine, Public Domain Review, Lapham's Quarterly només si és obert, Works in Progress, Edge i MIT Press Reader.

Cada font pot incloure una llista de feeds i una pàgina inicial. Si un feed canvia, el codi intenta descobrir RSS/Atom des de la pàgina inicial.

## Logs

```text
~/Library/Logs/ArticleDiariGratuit/out.log
~/Library/Logs/ArticleDiariGratuit/error.log
```

## Desinstal·lació

```bash
cd /Users/sergicastillo/Documents/Aura/article_diari_gratuit
./scripts/uninstall_launchd.sh
```

Això descarrega i elimina el LaunchAgent. No elimina els articles desats ni `data/history.json`.
