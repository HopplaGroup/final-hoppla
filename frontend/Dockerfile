FROM node:22 AS base
FROM base AS deps
RUN npm install -g pnpm
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma
RUN pnpm install --frozen-lockfile --prefer-frozen-lockfile

FROM base AS builder
RUN npm install -g pnpm

WORKDIR /app

ARG BACKEND_URL
ENV BACKEND_URL=${BACKEND_URL}

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM base AS runner

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

RUN groupadd -r appuser && useradd -r -g appuser appuser

RUN chown -R appuser:appuser .next

USER appuser

ARG BACKEND_URL
ENV BACKEND_URL=${BACKEND_URL}

CMD ["node", "server.js"]
