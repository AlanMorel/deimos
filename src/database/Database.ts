import Configs from "@/Configs";
import { Accounts } from "@/database/controllers/Accounts";
import { Characters } from "@/database/controllers/Characters";
import { AccountEntity } from "@/database/entities/Account";
import { CharacterEntity } from "@/database/entities/Character";
import { Connection, getConnectionManager } from "typeorm";

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
            host: Configs.database.host,
            port: Configs.database.port,
            username: Configs.database.username,
            password: Configs.database.passsword,
            database: Configs.database.database,
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
