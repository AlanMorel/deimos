import { Connection, getConnectionManager } from "typeorm";
import Configs from "../Configs";
import { Accounts } from "./controllers/Accounts";
import { Characters } from "./controllers/Characters";
import { AccountEntity } from "./entities/Account";
import { CharacterEntity } from "./entities/Character";

export class Database {
    private static instance: Database;

    private connection: Connection;

    private accounts: Accounts = new Accounts();
    private characters: Characters = new Characters();

    private constructor(connection: Connection) {
        this.connection = connection;
    }

    public static async connect(): Promise<void> {
        const connectionManager = getConnectionManager();
        const connection = connectionManager.create({
            type: "mysql",
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT ?? "3306"),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_SCHEMA,
            logging: Configs.settings.logQueries,
            synchronize: process.env.NODE_ENV === "development",
            entities: [AccountEntity, CharacterEntity]
        });

        await connection.connect();

        this.instance = new Database(connection);
    }

    public static getAccounts(): Accounts {
        return this.instance.accounts;
    }

    public static getCharacters(): Characters {
        return this.instance.characters;
    }
}
