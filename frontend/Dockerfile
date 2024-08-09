# FROM oven/bun:1 AS bunbase
FROM node:20-alpine AS base

### Dependencies ###
FROM base AS deps
RUN apk add --no-cache libc6-compat git

RUN apk --no-cache add ca-certificates wget
RUN wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub
RUN wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.28-r0/glibc-2.28-r0.apk
RUN apk add --no-cache --force-overwrite glibc-2.28-r0.apk

RUN npm install -g bun

# Setup pnpm environment
ENV PNPM_HOME="/pnpm"
ENV BUN_HOME="/root/.bun/bin"
ENV PATH="$PNPM_HOME:$PATH"
ENV PATH="$BUN_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@latest --activate

WORKDIR /app/frontend

COPY frontend/package.json frontend/pnpm-lock.yaml ./
COPY frontend/prisma/schema.prisma ./prisma/schema.prisma
RUN pnpm install --frozen-lockfile --prefer-frozen-lockfile

WORKDIR /app/backend
COPY backend/package.json backend/bun.lockb ./
COPY backend/prisma/schema.prisma ./prisma/schema.prisma
RUN bun install --frozen-lockfile

# Builder
FROM base AS builder

WORKDIR /app/backend
COPY --from=deps /app/backend/node_modules ./node_modules
COPY backend ./

RUN corepack enable
RUN corepack prepare pnpm@latest --activate

WORKDIR /app/frontend

ARG BACKEND_URL
ENV BACKEND_URL=${BACKEND_URL}

COPY --from=deps /app/frontend/node_modules ./node_modules
COPY frontend ./
RUN pnpm build


### Production image runner ###
FROM base AS runner

# Set NODE_ENV to production
ENV NODE_ENV production

# Disable Next.js telemetry
# Learn more here: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# Set correct permissions for nextjs user and don't run as root
RUN addgroup nodejs
RUN adduser -SDH nextjs
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/frontend/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/frontend/public ./public

USER nextjs

# Exposed port (for orchestrators and dynamic reverse proxies)
# EXPOSE 3000
# ENV PORT 3000
# ENV HOSTNAME "0.0.0.0"

ARG BACKEND_URL
ENV BACKEND_URL=${BACKEND_URL}

# Run the nextjs app
CMD ["node", "server.js"]
