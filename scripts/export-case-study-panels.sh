#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIR="$ROOT/public/landing/case-studies"

for name in timforce case-2 case-3; do
  chromium --headless=new --disable-gpu --hide-scrollbars \
    --screenshot="$DIR/panel-bg-$name.png" \
    --window-size=1142,968 \
    --default-background-color=00000000 \
    "file://$DIR/panel-bg-$name.svg"
done
