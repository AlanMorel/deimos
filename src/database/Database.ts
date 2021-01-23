import { Connection, getConnectionManager } from "typeorm";
import Configs from "../Configs";
import { AccountEntity } from "./entities/Account";
import { CharacterEntity } from "./entities/Character";

export class Database {

    private static readonly instance = new Database();

    private connection: Connection;

    private constructor() {
        const connectionManager = getConnectionManager();
        this.connection = connectionManager.create({
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
    }

    public static connect(): Promise<Connection> {
        return this.instance.connection.connect();
    }
}
