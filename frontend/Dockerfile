FROM node:22.6.0 AS base
RUN npm install -g pnpm
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma
COPY schema.zmodel ./
RUN pnpm install 

COPY . .

ARG NEXT_PUBLIC_KINDE_CONNECTION_GOOGLE
ENV NEXT_PUBLIC_KINDE_CONNECTION_GOOGLE=${NEXT_PUBLIC_KINDE_CONNECTION_GOOGLE}

ARG NEXT_PUBLIC_VAPID_PUBLIC_KEY
ENV NEXT_PUBLIC_VAPID_PUBLIC_KEY=${NEXT_PUBLIC_VAPID_PUBLIC_KEY}

RUN pnpm build

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["sh", "-c", "pnpm prisma migrate deploy && pnpm start"]
