
FROM node:22 AS base

WORKDIR /app

RUN npm install -g bun

FROM base AS install

RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
COPY prisma /temp/dev/prisma
RUN cd /temp/dev && bun install --frozen-lockfile

RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
COPY prisma /temp/prod/prisma
RUN cd /temp/prod && bun install --frozen-lockfile --production

FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .
ENV NODE_ENV=production

FROM base AS release

COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /app/src ./src
COPY --from=prerelease /app/package.json .

CMD [ "bun", "run", "start" ]