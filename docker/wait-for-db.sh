#!/bin/sh

host="${DB_HOST:-db}"
port="${DB_PORT:-5432}"
max_attempts="${DB_WAIT_ATTEMPTS:-60}"
attempt=0

while [ "$attempt" -lt "$max_attempts" ]; do
  if nc -z "$host" "$port" 2>/dev/null; then
    exit 0
  fi
  attempt=$((attempt + 1))
  sleep 2
done

echo "Timed out waiting for PostgreSQL at ${host}:${port}" >&2
exit 1
