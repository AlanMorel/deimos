# Deimos

**Deimos** is a MapleStory 2 emulator written in TypeScript and Node.

#### Requirements

-   [npm](https://www.npmjs.com/) - node package manager

#### Setup

1. Install node, npm, then clone this repository

```sh
$ git clone https://github.com/AlanMorel/deimos deimos
```

2. Install the dependencies

```sh
$ cd deimos
```

```sh
$ npm install yarn -g
```

```sh
$ yarn install
```

3. Rename `.env.example` to `.env` and edit it to your liking.

4. Edit `src/Configs.ts` to your liking, then compile and run the server.

```sh
$ yarn start
```

#### Development

For the best development experience, run the compiler in watch mode to watch for any changes automatically. Also, make sure to run the linter to ensure your code complies with the code standards of this project.

#### Commands

`yarn start` : Compile and run the server

`yarn lint` : Run the linter

`yarn watch` : Run the compiler in watch mode

`yarn server` : Run the server

### Community

Join the [community discord](https://discord.gg/mABkFFhBuU) if you are interested in contributing to this project or would like assistance getting set up.
