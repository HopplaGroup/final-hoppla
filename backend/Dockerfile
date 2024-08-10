FROM node:22 AS base

RUN npm install -g bun

FROM base AS install

WORKDIR /temp/dev
COPY package.json bun.lockb ./
COPY prisma ./prisma
RUN bun install --frozen-lockfile --prefer-frozen-lockfile

WORKDIR /temp/prod
COPY package.json bun.lockb ./
COPY prisma ./prisma
RUN bun install --frozen-lockfile --prefer-frozen-lockfile --production

FROM base AS prerelease
WORKDIR /app
COPY --from=install /temp/dev/node_modules node_modules
COPY . .
ENV NODE_ENV=production

FROM base AS release
WORKDIR /app
COPY --from=install /temp/prod/node_modules ./node_modules
COPY --from=prerelease /app/src ./src
COPY --from=prerelease /app/package.json ./

RUN groupadd -r appuser && useradd -r -g appuser appuser

RUN chown -R appuser:appuser .

USER appuser

CMD [ "bun", "run", "start" ]