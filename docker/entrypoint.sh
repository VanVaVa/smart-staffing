#!/bin/sh
set -e

./docker/wait-for-db.sh

npx prisma migrate deploy

if [ -f "./server.js" ]; then
  exec node server.js
fi

exec npm run start
