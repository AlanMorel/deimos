import { ICrypter } from "./ICrypter";

export class RearrangeCrypter implements ICrypter {
    private static INDEX: number = 1;

    public static getIndex(version: number): number {
        return (version + this.INDEX) % 3 + 1;
    }

    public encrypt(src: Buffer): void {
        let len = src.length >> 1;
        for (let i = 0; i < len; i++) {
            let swap = src[i];
            src[i] = src[i + len];
            src[i + len] = swap;
        }
    }

    public decrypt(src: Buffer): void {
        let len = src.length >> 1;
        for (let i = 0; i < len; i++) {
            let swap = src[i];
            src[i] = src[i + len];
            src[i + len] = swap;
        }
    }
}

