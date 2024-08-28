FROM node:22.6.0 AS base
FROM base AS deps
RUN npm install -g pnpm
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma
COPY schema.zmodel ./
RUN pnpm install --frozen-lockfile --prefer-frozen-lockfile

FROM base AS builder
RUN npm install -g pnpm

WORKDIR /app

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

CMD ["node", "server.js"]
