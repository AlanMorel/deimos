# Deimos

**Deimos** is a MapleStory 2 emulator written in TypeScript and Node.

## Requirements

Install node, npm, clone this repository, then install the dependencies

```sh
git clone https://github.com/AlanMorel/deimos deimos
```

```sh
cd deimos
```

```sh
npm install yarn -g
```

```sh
yarn install
```

Create a `.env` file

```sh
NODE_ENV=development

DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=root
DATABASE_PASSWORD=
DATABASE_SCHEMA=deimos
```

Edit `src/Configs.ts` to your liking, then compile and run the server.

```sh
yarn start
```

## Development

For the best development experience, run the compiler in watch mode to watch for any changes automatically. Also, make sure to run the linter to ensure your code complies with the code standards of this project.

## Commands

`yarn build` : Compile the server

`yarn start` : Compile and start the server

`yarn lint` : Run the linter

`yarn watch` : Run the compiler in watch mode

`yarn server` : Run the server

## Community

Join the [community discord](https://discord.gg/mABkFFhBuU) if you are interested in contributing to this project or would like assistance getting set up.
