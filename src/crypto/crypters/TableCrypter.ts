import { Rand32 } from "../Rand32";
import { ICrypter } from "./ICrypter";

export class TableCrypter implements ICrypter {

    private static INDEX: number = 3;
    private static TABLE_SIZE: number = 256;

    private decrypted: Buffer;
    private encrypted: Buffer;

    public constructor(version: number) {
        this.decrypted = Buffer.alloc(TableCrypter.TABLE_SIZE);
        this.encrypted = Buffer.alloc(TableCrypter.TABLE_SIZE);

        for (let i = 0; i < TableCrypter.TABLE_SIZE; i++) {
            this.encrypted[i] = i;
        }

        TableCrypter.shuffle(this.encrypted, version);
        for (let i = 0; i < TableCrypter.TABLE_SIZE; i++) {
            this.decrypted[this.encrypted[i]] = i;
        }
    }

    public static getIndex(version: number): number {
        return (version + this.INDEX) % 3 + 1;
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

    private static shuffle(data: Buffer, version: number): void {
        const rand32 = new Rand32(Math.pow(version, 2));
        for (let i = TableCrypter.TABLE_SIZE - 1; i >= 1; i--) {
            const rand = rand32.random() % (i + 1);

            const swap = data[i];
            data[i] = data[rand];
            data[rand] = swap;
        }
    }
}
