import { Crypter } from "@/crypto/crypters/Crypter";
import { Rand32 } from "@/crypto/Rand32";

export class XORCrypter extends Crypter {
    public static readonly INDEX: number = 2;

    private table: Buffer = Buffer.alloc(2);

    public constructor(version: number) {
        super();

        const rand1: Rand32 = new Rand32(version);
        const rand2: Rand32 = new Rand32(2 * version);

        this.table[0] = rand1.randomFloat() * 255;
        this.table[1] = rand2.randomFloat() * 255;
    }

    public encrypt(src: Buffer): void {
        this.transform(src);
    }

    public decrypt(src: Buffer): void {
        this.transform(src);
    }

    private transform(src: Buffer): void {
        for (let i = 0; i < src.length; i++) {
            src[i] ^= this.table[i & 1];
        }
    }
}
