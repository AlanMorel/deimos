FROM node:alpine as base

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod

COPY . .

RUN pnpm prisma generate && pnpm ts:check

CMD ["sh", "-c", "pnpm cross-env NODE_ENV=production node --loader @bleed-believer/path-alias/esm ./src/index.ts"]

FROM base as production
