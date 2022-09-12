import { Controller } from "@/database/controllers/Controller";
import prisma from "@/database/Prisma";
import { AccountRow } from "@/database/RowTypes";
import { Account } from "@/types/Account";

export class Accounts extends Controller<AccountRow, Account> {
    public async getByCredentials(username: string, password: string): Promise<Account | null> {
        const account = await prisma.accounts.findFirst({
            where: {
                username: username,
                password: password
            }
        });

        if (!account) {
            return null;
        }

        return this.fromDatabase(account);
    }

    public fromDatabase(from: AccountRow): Account {
        const id = BigInt(from.id);
        return new Account(id, from.username, from.password);
    }

    public toDatabase(to: Account): AccountRow {
        return {
            id: to.id,
            username: to.username,
            password: to.password
        };
    }
}
