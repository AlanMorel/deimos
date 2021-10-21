import chalk from "chalk";
import dotenv from "dotenv";
import Configs from "./Configs";
import { Metadata } from "./data/metadata/Metadata";
import { Database } from "./database/Database";
import { ChannelServer } from "./network/servers/ChannelServer";
import { LoginServer } from "./network/servers/LoginServer";
import { Logger } from "./tools/Logger";

export class App {
    public constructor() {
        Logger.log(Configs.name + " has started", chalk.yellow);

        this.loadEnvironmentVariables();
        this.loadMetaata();
        this.initializeDatabase();
        this.startLoginServer();
        this.startWorlds();
    }

    private loadEnvironmentVariables(): void {
        if (dotenv.config().parsed) {
            Logger.log("Environment variables loaded successfully", chalk.magenta);
        } else {
            Logger.error("Failed to load environment variables");
        }
    }

    private loadMetaata(): void {
        if (Configs.settings.loadMetadata) {
            Metadata.load();
            Logger.log("Metadata loaded successfully", chalk.magenta);
        } else {
            Logger.error("Metadata loading disabled");
        }
    }

    private initializeDatabase(): void {
        Database.connect().then(() => {
            Logger.log("Database connection established successfully", chalk.magenta);
        });
    }

    private startLoginServer(): void {
        new LoginServer(Configs.login.host, Configs.login.port);
    }

    private startWorlds(): void {
        for (const world of Configs.worlds) {
            for (const [id, channel] of world.channels.entries()) {
                new ChannelServer(world.name, id + 1, channel.host, channel.port);
            }
        }
    }
}
