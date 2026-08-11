#! /bin/bash
set -euo pipefail
docker compose --profile test up -d --force-recreate --wait postgres-test
DRIZZLE_ENV=.env.test.local npm run drizzle:migrate:all