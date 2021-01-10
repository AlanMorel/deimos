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

    private initCryptSeq(blockIV: number): Array<Crypter> {
        const crypt: Crypter[] = new Array<Crypter>(4);
        crypt[RearrangeCrypter.getIndex(this.version)] = new RearrangeCrypter();
        crypt[XORCrypter.getIndex(this.version)] = new XORCrypter(this.version);
        crypt[TableCrypter.getIndex(this.version)] = new TableCrypter(this.version);

        const cryptSeq: Crypter[] = new Array<Crypter>();
        while (blockIV > 0) {
            const crypter: Crypter = crypt[blockIV % 10];

            if (crypter != null) {
                cryptSeq.push(crypter);
            }

            blockIV = Math.floor(blockIV / 10);
        }
        return cryptSeq;
    }

    public advanceIV(): void {
        this.iv = Rand32.crtRand(this.iv);
    }

    public static generateIv(): Buffer {
        return crypto.randomBytes(4);
    }
}