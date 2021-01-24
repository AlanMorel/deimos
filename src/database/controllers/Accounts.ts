import { Player } from "../../types/player/Player";
import { Account, AccountEntity } from "../entities/Account";
import { Controller } from "./Controller";

export class Accounts extends Controller<Account, Player> {

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

    protected fromDatabase(from: Account): Player {
        throw new Error("Method not implemented.");
    }

    protected toDatabase(to: Player): Account {
        throw new Error("Method not implemented.");
    }
}
