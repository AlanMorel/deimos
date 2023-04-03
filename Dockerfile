FROM node:alpine as base

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod

COPY . .

RUN pnpm prisma generate && pnpm ts:check

ENV NODE_ENV production

CMD ["pnpm", "start"]