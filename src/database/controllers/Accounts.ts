import { Account, AccountEntity } from "../entities/Account";
import { Controller } from "./Controller";

export class Accounts extends Controller<Account> {

    public constructor() {
        super(AccountEntity);
    }

    public async getByCredentials(username: string, password: string): Promise<Account | undefined> {
        const account = this.repository.findOne({
            where: {
                username: username,
                password: password
            }
        });
        return account;
    }
}
