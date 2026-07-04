#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
PYTHON="$PROJECT_DIR/.venv/bin/python"
REQ="$PROJECT_DIR/requirements.txt"
STAMP="$PROJECT_DIR/.venv/.requirements-installed"

cd "$PROJECT_DIR"

if [ ! -x "$PYTHON" ]; then
  python3 -m venv "$PROJECT_DIR/.venv"
fi

if [ ! -f "$STAMP" ] || [ "$REQ" -nt "$STAMP" ]; then
  "$PYTHON" -m pip install --upgrade pip
  "$PYTHON" -m pip install -r "$REQ"
  touch "$STAMP"
fi

exec "$PYTHON" "$PROJECT_DIR/article_diari_gratuit.py" "$@"

