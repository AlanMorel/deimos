import { Account } from "../../types/Account";
import { AccountEntity, AccountRow } from "../entities/Account";
import { Controller } from "./Controller";

export class Accounts extends Controller<AccountRow, Account> {
    public constructor() {
        super(AccountEntity);
    }

    public async getByCredentials(username: string, password: string): Promise<Account | undefined> {
        const account = await this.repository.findOne({
            where: {
                username: username,
                password: password
            }
        });
        if (!account) {
            return;
        }
        return this.fromDatabase(account);
    }

    protected fromDatabase(from: AccountRow): Account {
        const id = BigInt(from.id);
        const account = new Account(id, from.username, from.password);
        return account;
    }

    protected toDatabase(to: Account): AccountRow {
        const accountRow = {
            id: to.id.toString(),
            username: to.username,
            password: to.password
        };
        return accountRow;
    }
}
