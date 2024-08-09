# FROM node:22 AS base
# RUN npm install -g bun

# FROM base AS install
# RUN ls *
# WORKDIR /dev
# COPY package.json bun.lockb ./
# COPY prisma ./prisma
# # these files not copied hmmm
# RUN ls *
# RUN bun install --frozen-lockfile --prefer-frozen-lockfile

# WORKDIR /prod
# COPY package.json bun.lockb ./
# COPY prisma ./prisma
# RUN bun install --frozen-lockfile --prefer-frozen-lockfile --production

# FROM base AS build

# WORKDIR /build
# COPY --from=install /dev/node_modules node_modules
# COPY . .
# ENV NODE_ENV=production
# RUN bun run build > /dev/null

# FROM base AS release

# WORKDIR /app

# COPY --from=install /prod/node_modules node_modules
# COPY --from=build /build/src src
# COPY --from=build /build/package.json .

# CMD [ "bun", "run", "start" ]

FROM node:22 AS base

WORKDIR /app

RUN npm install -g bun
# ENV BUN_HOME="/root/.bun/bin"
# ENV PATH="$BUN_HOME:$PATH"

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