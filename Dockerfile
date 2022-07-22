FROM node:alpine as base

WORKDIR /app

COPY package.json yarn.lock ./

RUN npx browserslist@latest --update-db && rm -rf node_modules && yarn install --frozen-lockfile && yarn cache clean

COPY . .

CMD ["sh", "-c", "yarn cross-env NODE_ENV=production node --loader @bleed-believer/path-alias/esm --experimental-specifier-resolution=node ./src/index.ts"]

FROM base as production
