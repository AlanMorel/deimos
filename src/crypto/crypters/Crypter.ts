export abstract class Crypter {

    public abstract encrypt(src: Buffer): void;
    public abstract decrypt(src: Buffer): void;

    public static getIndex(version: number, index: number): number {
        return (version + index) % 3 + 1;
    }
}
