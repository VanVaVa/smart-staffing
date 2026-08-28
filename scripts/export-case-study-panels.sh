#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIR="$ROOT/public/landing/case-studies"
WIDTH=571
HEIGHT=484
SCALE=2

for name in timforce case-2 case-3; do
  tmp="$(mktemp --suffix=.png)"
  chromium --headless=new --disable-gpu --hide-scrollbars \
    --screenshot="$tmp" \
    --window-size="$WIDTH,$HEIGHT" \
    --force-device-scale-factor="$SCALE" \
    --default-background-color=00000000 \
    "file://$DIR/panel-bg-$name.svg"

  python3 - "$tmp" "$DIR/panel-bg-$name.png" <<'PY'
import sys
from PIL import Image

source_path, target_path = sys.argv[1:3]
image = Image.open(source_path).convert("RGBA")
width, height = image.size
canvas = Image.new("RGBA", (width, height), (0, 0, 0, 255))
canvas.alpha_composite(image)
canvas.save(target_path)
PY

  rm "$tmp"
  cp "$DIR/panel-bg-$name.png" "$DIR/panel-bg-$name@2x.png"
done
