FROM node:20.1.0-alpine AS base

WORKDIR /app

ENV NODE_ENV production

RUN npm install -g pnpm@8.9.0

FROM base AS deps

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod

FROM base AS app

COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN pnpm prisma generate && pnpm ts:check

CMD ["pnpm", "start"]