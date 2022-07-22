import { AuthData } from "@/network/AuthData";

// TODO: This is mostly temporary while I think about how auth really should work
// It's mostly just required to pass login data to GameSession (which is why it's static)
export class AuthStorage {
    private static readonly authStorage = new Map<bigint, AuthData>();

    public static getData(accountId: bigint): AuthData | undefined {
        return this.authStorage.get(accountId);
    }

    public static setData(accountId: bigint, data: AuthData): void {
        this.authStorage.set(accountId, data);
    }

    public static generateToken(): number {
        return Math.floor(Math.random() * Math.floor(2 ^ 31));
    }
}
