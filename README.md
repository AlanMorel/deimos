# Deimos

**Deimos** is a MapleStory 2 emulator written in TypeScript and Node.

## Requirements

Install node, pnpm, clone this repository, then install the dependencies

```sh
git clone https://github.com/AlanMorel/deimos deimos
```

```sh
cd deimos
```

```sh
npm install pnpm -g
```

```sh
pnpm install
```

Create a `.env` file

```sh
NODE_ENV=development
TZ=America/New_York

NAME=Deimos

DATABASE_SOURCE=
DATABASE_HOST=
DATABASE_PORT=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_TABLE=

DATABASE_URL=${DATABASE_SOURCE}://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_TABLE}

LOGIN_SERVER_HOST=0.0.0.0
LOGIN_SERVER_PORT=20001

LOG_DEBUGS=true
LOG_PACKETS=true
LOG_QUERIES=true
LOG_PREFIX=true
LOG_TIMESTAMP=true

LOAD_METADATA=true

FILE_HASH=
```

Edit `src/Configs.ts` to your liking, then compile and run the server.

```sh
pnpm start
```

## Community

Join the [community discord](https://discord.gg/mABkFFhBuU) if you are interested in contributing to this project or would like assistance getting set up.
