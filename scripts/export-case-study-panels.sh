#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIR="$ROOT/public/landing/case-studies"
WIDTH=571
HEIGHT=484
SCALE=2
VIEWPORT_HEIGHT=$((HEIGHT + 200))

for name in timforce case-2 case-3; do
  tmp="$(mktemp --suffix=.png)"
  chromium --headless=new --disable-gpu --hide-scrollbars \
    --screenshot="$tmp" \
    --window-size="$WIDTH,$VIEWPORT_HEIGHT" \
    --force-device-scale-factor="$SCALE" \
    --default-background-color=00000000 \
    "file://$DIR/panel-bg-$name.svg"

  python3 - "$tmp" "$DIR/panel-bg-$name.png" "$WIDTH" "$HEIGHT" "$SCALE" <<'PY'
import sys
from PIL import Image

source_path, target_path = sys.argv[1:3]
width, height, scale = map(int, sys.argv[3:6])
target_size = width * scale, height * scale
image = Image.open(source_path).convert("RGBA")

if image.width < target_size[0] or image.height < target_size[1]:
    raise ValueError(f"Screenshot {image.size} is smaller than target {target_size}")

image = image.crop((0, 0, *target_size))
canvas = Image.new("RGBA", target_size, (0, 0, 0, 255))
canvas.alpha_composite(image)
canvas.save(target_path)
PY

  rm "$tmp"
  cp "$DIR/panel-bg-$name.png" "$DIR/panel-bg-$name@2x.png"
done
