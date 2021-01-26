# Deimos
**Deimos** is a MapleStory 2 emulator written in TypeScript and Node.

#### Requirements
- [npm](https://www.npmjs.com/) - node package manager

#### Setup

1) To setup **Deimos**, install Node, npm, then clone this repository.

```sh
$ git clone https://github.com/AlanMorel/Deimos deimos
```

2) Install the node dependencies

```sh
$ cd deimos
```
```sh
$ npm install
```

3) Rename `.env.example` to `.env` and edit it to your liking.

4) Edit `src/Configs.ts` to your liking, then compile and run the server.

```sh
$ npm run start
```

#### Development

For the best development experience, run the compiler in watch mode to watch for any changes automatically. Also, make sure to run the linter to ensure your code complies with the code standards of this project.

#### Commands

`npm run start` : Compile and run the server

`npm run lint` : Run the linter

`npm run watch` : Run the compiler in watch mode

`npm run server` : Run the server

### Community

Join the [community discord](https://discord.gg/mABkFFhBuU) if you are interested in contributing to this project or would like assistance getting set up.
