#!/usr/bin/env bash
set -euo pipefail

LABEL="com.sergicastillo.article-diari-gratuit"
PLIST="$HOME/Library/LaunchAgents/$LABEL.plist"
RUNTIME_DIR="$HOME/Library/Application Support/ArticleDiariGratuit"

launchctl bootout "gui/$UID" "$PLIST" >/dev/null 2>&1 || true
launchctl disable "gui/$UID/$LABEL" >/dev/null 2>&1 || true
rm -f "$PLIST"

echo "Automatització desinstal·lada: $LABEL"
echo "No s'han esborrat ni els articles de ~/Desktop/Articles ni el runtime local."
echo "Runtime conservat: $RUNTIME_DIR"
