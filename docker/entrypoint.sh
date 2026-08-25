#!/bin/sh
set -e

./docker/wait-for-db.sh

npx prisma migrate deploy
npx prisma db seed
npx tsx prisma/sync-home-features.ts

if [ -f "./server.js" ]; then
  exec node server.js
fi

exec npm run start
