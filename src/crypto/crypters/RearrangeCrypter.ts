import { Crypter } from "@/crypto/crypters/Crypter";

export class RearrangeCrypter extends Crypter {
    public static readonly INDEX: number = 1;

    public encrypt(src: Buffer): void {
        this.transform(src);
    }

    public decrypt(src: Buffer): void {
        this.transform(src);
    }

    private transform(src: Buffer): void {
        const len = src.length >> 1;
        for (let i = 0; i < len; i++) {
            const swap = src[i];
            src[i] = src[i + len];
            src[i + len] = swap;
        }
    }
}
