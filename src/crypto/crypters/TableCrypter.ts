import { Crypter } from "@/crypto/crypters/Crypter";
import { Rand32 } from "@/crypto/Rand32";

export class TableCrypter extends Crypter {
    public static readonly INDEX: number = 3;
    private static readonly TABLE_SIZE: number = 1 << 8;

    private decrypted: Buffer = Buffer.alloc(TableCrypter.TABLE_SIZE);
    private encrypted: Buffer = Buffer.alloc(TableCrypter.TABLE_SIZE);

    public constructor(version: number) {
        super();

        for (let i = 0; i < TableCrypter.TABLE_SIZE; i++) {
            this.encrypted[i] = i;
        }

        this.shuffle(this.encrypted, version);
        for (let i = 0; i < TableCrypter.TABLE_SIZE; i++) {
            this.decrypted[this.encrypted[i]] = i;
        }
    }

    public encrypt(src: Buffer): void {
        for (let i = 0; i < src.length; i++) {
            src[i] = this.encrypted[src[i]];
        }
    }

    public decrypt(src: Buffer): void {
        for (let i = 0; i < src.length; i++) {
            src[i] = this.decrypted[src[i]];
        }
    }

    private shuffle(data: Buffer, version: number): void {
        const rand32 = new Rand32(Math.pow(version, 2));
        for (let i = TableCrypter.TABLE_SIZE - 1; i >= 1; i--) {
            const rand = rand32.random() % (i + 1);

            const swap = data[i];
            data[i] = data[rand];
            data[rand] = swap;
        }
    }
}
