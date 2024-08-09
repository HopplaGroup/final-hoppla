FROM node:22 AS base
RUN npm install -g bun

FROM base AS install

WORKDIR /dev
COPY package.json bun.lockb ./
COPY prisma ./prisma
RUN ls -la
RUN bun install --frozen-lockfile

WORKDIR /prod
COPY package.json bun.lockb ./
# COPY prisma ./prisma
# in production prisma would not be installed i think so
RUN bun install --frozen-lockfile --production

FROM base AS build
WORKDIR /build
# what is workdir here? is it /app? or when new stage workdir is rest to root one, what what is main one if not specify workdir?
COPY --from=install /dev/node_modules node_modules
COPY . .
ENV NODE_ENV=production
RUN bun run build > /dev/null

FROM base AS release
WORKDIR /app

COPY --from=install /prod/node_modules node_modules
COPY --from=build /build/src src
COPY --from=build /build/package.json .

CMD [ "bun", "run", "start" ]