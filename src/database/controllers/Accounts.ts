import { getRepository } from "typeorm";
import { Account, AccountEntity } from "../entities/Account";

export class Accounts {

    public static async getByCredentials(username: string, password: string): Promise<Account | undefined> {
        const repository = getRepository<Account>(AccountEntity);
        const account = repository.findOne({
            where: {
                username: username,
                password: password
            }
        });
        return account;
    }
}
