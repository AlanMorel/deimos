import { Accounts } from "@/database/controllers/Accounts";
import { Characters } from "@/database/controllers/Characters";

export default class db {
    private static accounts = new Accounts();
    private static characters = new Characters();

    public static getAccounts(): Accounts {
        return db.accounts;
    }

    public static getCharacters(): Characters {
        return db.characters;
    }
}
