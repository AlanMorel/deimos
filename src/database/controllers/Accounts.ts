import { Controller } from "@/database/controllers/Controller";
import { AccountEntity, AccountRow } from "@/database/entities/Account";
import { Account } from "@/types/Account";

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
        return new Account(id, from.username, from.password);
    }

    protected toDatabase(to: Account): AccountRow {
        return {
            id: to.id.toString(),
            username: to.username,
            password: to.password
        };
    }
}
