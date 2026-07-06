#!/bin/bash
# Wrapper del Coordinador Fase 11 per a launchd.
# S'obre via `open -g` (Terminal) perquè launchd no pot llegir ~/Documents.
# Executa el coordinador en mode --write i desa la sortida a un log datat.

REPO="/Users/sergicastillo/Documents/Aura"
NODE="/opt/homebrew/bin/node"
LOG_DIR="$HOME/Library/Logs/AuraCoordinador"
mkdir -p "$LOG_DIR"
STAMP="$(date '+%Y-%m-%d')"
LOG="$LOG_DIR/$STAMP.log"

cd "$REPO" || { echo "No s'ha pogut entrar a $REPO" >> "$LOG"; exit 1; }

{
  echo "===== Coordinador Fase 11 · $(date '+%Y-%m-%d %H:%M:%S %Z') ====="
  "$NODE" coordinador/coordinador.mjs --write
  echo ""
} >> "$LOG" 2>&1
