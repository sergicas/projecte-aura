#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
RUNTIME_DIR="$HOME/Library/Application Support/ArticleDiariGratuit"
LABEL="com.sergicastillo.article-diari-gratuit"
TEMPLATE="$RUNTIME_DIR/launchd/$LABEL.plist.template"
PLIST="$HOME/Library/LaunchAgents/$LABEL.plist"
LOG_DIR="$HOME/Library/Logs/ArticleDiariGratuit"
SKIP_CHECK="${ARTICLE_DIARI_SKIP_CHECK:-0}"

echo "Preparant carpetes..."
mkdir -p "$HOME/Library/LaunchAgents" "$LOG_DIR" "$HOME/Desktop/Articles" "$RUNTIME_DIR/data"

echo "Copiant projecte a: $RUNTIME_DIR"
if command -v rsync >/dev/null 2>&1; then
  rsync -a --delete \
    --exclude ".venv/" \
    --exclude "__pycache__/" \
    --exclude "*.pyc" \
    --exclude "data/history.json" \
    "$PROJECT_DIR/" "$RUNTIME_DIR/"
else
  cp -R "$PROJECT_DIR/." "$RUNTIME_DIR/"
  rm -rf "$RUNTIME_DIR/.venv" "$RUNTIME_DIR/__pycache__"
fi

if [ ! -f "$RUNTIME_DIR/data/history.json" ] && [ -f "$PROJECT_DIR/data/history.json" ]; then
  echo "Copiant historial existent..."
  cp "$PROJECT_DIR/data/history.json" "$RUNTIME_DIR/data/history.json"
fi

chmod +x "$RUNTIME_DIR/scripts/run_once.sh" "$RUNTIME_DIR/article_diari_gratuit.py"

if [ "$SKIP_CHECK" = "1" ]; then
  echo "Saltant comprovació RSS inicial."
else
  echo "Comprovant dependències i feeds RSS; pot trigar 30-60 segons..."
  "$RUNTIME_DIR/scripts/run_once.sh" --dry-run --no-notify
fi

echo "Escrivint LaunchAgent..."
sed \
  -e "s#__PROJECT_DIR__#$RUNTIME_DIR#g" \
  -e "s#__HOME__#$HOME#g" \
  "$TEMPLATE" > "$PLIST"

chmod 644 "$PLIST"

echo "Recarregant launchd..."
launchctl bootout "gui/$UID" "$PLIST" >/dev/null 2>&1 || true
launchctl bootstrap "gui/$UID" "$PLIST"
launchctl enable "gui/$UID/$LABEL"

echo "Automatització instal·lada: $LABEL"
echo "S'executarà en carregar-se, cada dia a les 08:00 i farà comprovacions horàries sense duplicar articles."
echo "Runtime: $RUNTIME_DIR"
echo "LaunchAgent: $PLIST"
echo "Logs: $LOG_DIR"
