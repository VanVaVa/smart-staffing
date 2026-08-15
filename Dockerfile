FROM node:20-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ARG DATABASE_URL=postgresql://postgres:postgres@db:5432/smart_staffing?schema=public
ENV DATABASE_URL=$DATABASE_URL

RUN gunzip -c docker/engines/schema-engine-linux-musl-openssl-3.0.x.gz > /usr/local/bin/schema-engine \
  && chmod +x /usr/local/bin/schema-engine
ENV PRISMA_SCHEMA_ENGINE_BINARY=/usr/local/bin/schema-engine

RUN npx prisma generate
RUN npx next build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
ENV PRISMA_SCHEMA_ENGINE_BINARY=/usr/local/bin/schema-engine

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs \
  && apk add --no-cache netcat-openbsd \
  && mkdir -p public/landing/uploads \
  && chown -R nextjs:nodejs public

COPY --from=builder /usr/local/bin/schema-engine /usr/local/bin/schema-engine
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./
COPY --from=builder /app/src/generated ./src/generated
COPY --from=builder /app/src/entities/landing/model ./src/entities/landing/model
COPY --from=builder /app/src/entities/landing/lib/block-parse-utils.ts ./src/entities/landing/lib/block-parse-utils.ts
COPY docker/entrypoint.sh ./docker/entrypoint.sh
COPY docker/wait-for-db.sh ./docker/wait-for-db.sh

RUN chmod +x ./docker/entrypoint.sh ./docker/wait-for-db.sh \
  && chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENTRYPOINT ["./docker/entrypoint.sh"]
