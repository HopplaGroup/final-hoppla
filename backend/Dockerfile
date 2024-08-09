FROM node:22 AS base
RUN npm install -g bun
WORKDIR /app

FROM base AS install

RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
COPY prisma/schema.prisma /temp/dev/prisma/schema.prisma
RUN cd /temp/dev && bun install --frozen-lockfile

RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
COPY prisma/schema.prisma /temp/prod/prisma/schema.prisma
RUN cd /temp/prod && bun install --frozen-lockfile 
# maybe with production huh?

FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .
ENV NODE_ENV=production

FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /app/src ./src
COPY --from=prerelease /app/prisma ./prisma
COPY --from=prerelease /app/package.json .
EXPOSE 3000/tcp
CMD [ "bun", "run", "start" ]