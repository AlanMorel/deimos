export class AccountStorage {

    public static storage: AccountStorage = new AccountStorage();

    public accounts: Map<BigInt, Array<BigInt>> = new Map<BigInt, Array<BigInt>>();

    public constructor() {
        this.accounts.set(BigInt(1), [
            BigInt(1)
        ]);
    }

    public getCharacterIDs(accountId: BigInt): Array<BigInt> {
        const results = this.accounts.get(accountId);

        if (!results) {
            return new Array<BigInt>();
        }

        return results;
    }

    public addCharacterID(accountId: BigInt, characterId: BigInt): void {
        const characterIDs = this.getCharacterIDs(accountId);
        characterIDs.push(characterId);
        this.accounts.set(accountId, characterIDs);
    }
}
