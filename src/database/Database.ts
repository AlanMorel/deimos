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
    private characters: Characters = new Characters()

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
            password: Configs.database.password,
            database: Configs.database.schema,
            logging: Configs.settings.logQueries,
            synchronize: true,
            entities: [
                AccountEntity,
                CharacterEntity
            ]
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
