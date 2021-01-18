export class AccountStorage {

    public static storage: AccountStorage = new AccountStorage();

    public accounts: Map<BigInt, BigInt[]> = new Map<BigInt, BigInt[]>();

    public constructor() {
        this.accounts.set(BigInt(1), [
            BigInt(1),
            BigInt(2)
        ]);
    }

    public getCharacterIDs(accountId: BigInt): BigInt[] {
        const results = this.accounts.get(accountId);

        if (!results) {
            return new Array<BigInt>();
        }

        return results;
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
