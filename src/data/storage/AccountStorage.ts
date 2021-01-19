export class AccountStorage {

    public static storage: AccountStorage = new AccountStorage();

    public accounts: Map<BigInt, BigInt[]> = new Map<BigInt, BigInt[]>();

    public constructor() {
        this.accounts.set(1n, [1n, 2n]);
    }

    public getCharacterIDs(accountId: BigInt): BigInt[] {
        return this.accounts.get(accountId) || new Array<BigInt>();
    }

    public getNextCharacterID(accountId: BigInt): BigInt {
        return BigInt(this.getCharacterIDs(accountId).length + 1);
    }

    public addCharacterID(accountId: BigInt, characterId: BigInt): void {
        const characterIDs = this.getCharacterIDs(accountId);
        characterIDs.push(characterId);
        this.accounts.set(accountId, characterIDs);
    }
}
