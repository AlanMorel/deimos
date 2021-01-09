import { Rand32 } from "../Rand32";
import { ICrypter } from "./ICrypter";

export class XORCrypter implements ICrypter {

    private static readonly INDEX: number = 2;

    private table: Buffer;

    public constructor(version: number) {
        this.table = Buffer.alloc(2);

        const rand1: Rand32 = new Rand32(version);
        const rand2: Rand32 = new Rand32(2 * version);

        this.table[0] = rand1.randomFloat() * 255;
        this.table[1] = rand2.randomFloat() * 255;
    }

    public static getIndex(version: number): number {
        return (version + this.INDEX) % 3 + 1;
    }

    public encrypt(src: Buffer): void {
        for (let i = 0; i < src.length; i++) {
            src[i] ^= this.table[i & 1];
        }
    }

    public decrypt(src: Buffer): void {
        for (let i = 0; i < src.length; i++) {
            src[i] ^= this.table[i & 1];
        }
    }
}

