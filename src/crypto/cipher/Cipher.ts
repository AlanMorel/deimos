import * as crypto from "crypto";
import { Crypter } from "../crypters/Crypter";
import { RearrangeCrypter } from "../crypters/RearrangeCrypter";
import { TableCrypter } from "../crypters/TableCrypter";
import { XORCrypter } from "../crypters/XorCrypter";
import { Rand32 } from "../Rand32";

export abstract class Cipher {

    protected static readonly HEADER_SIZE: number = 6;

    protected version: number;
    protected iv: number;
    protected cryptSeq: Crypter[];

    protected constructor(version: number, iv: number, blockIV: number) {
        this.version = version;
        this.iv = iv;
        this.cryptSeq = this.initCryptSeq(blockIV);
    }

    private initCryptSeq(blockIV: number): Crypter[] {
        const crypts = this.getCrypts();
        const cryptSeq = Array<Crypter>();

        while (blockIV > 0) {
            const crypter: Crypter = crypts[blockIV % 10];

            if (crypter != null) {
                cryptSeq.push(crypter);
            }

            blockIV = Math.floor(blockIV / 10);
        }

        return cryptSeq;
    }

    private getCrypts(): Crypter[] {
        const crypts = Array<Crypter>(4);
        crypts[Crypter.getIndex(this.version, RearrangeCrypter.INDEX)] = new RearrangeCrypter();
        crypts[Crypter.getIndex(this.version, XORCrypter.INDEX)] = new XORCrypter(this.version);
        crypts[Crypter.getIndex(this.version, TableCrypter.INDEX)] = new TableCrypter(this.version);
        return crypts;
    }

    public advanceIV(): void {
        this.iv = Rand32.crtRand(this.iv);
    }

    public static generateIv(): Buffer {
        return crypto.randomBytes(4);
    }
}
