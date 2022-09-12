import { Accounts } from "@/database/controllers/Accounts";
import { Characters } from "@/database/controllers/Characters";

export default class Database {
    private static accounts = new Accounts();
    private static characters = new Characters();

    public static getAccounts(): Accounts {
        return Database.accounts;
    }

    public static getCharacters(): Characters {
        return Database.characters;
    }
}
