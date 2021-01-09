import * as crypto from "crypto";
import { Packet } from "../tools/Packet";
import { PacketReader } from "../tools/PacketReader";
import { PacketWriter } from "../tools/PacketWriter";
import { ICrypter } from "./crypters/ICrypter";
import { RearrangeCrypter } from "./crypters/RearrangeCrypter";
import { TableCrypter } from "./crypters/TableCrypter";
import { XORCrypter } from "./crypters/XorCrypter";
import { Rand32 } from "./Rand32";

export class Cipher {
    private HEADER_SIZE: number = 6;

    private version: number;
    private encryptSeq: ICrypter[];
    private decryptSeq: ICrypter[];

    private iv: number;

    public transform: (buffer: Buffer) => Packet;

    private constructor(version: number, iv: number, blockIV: number) {
        this.version = version;
        this.iv = iv;
        this.transform = (buffer: Buffer): Packet => new Packet(buffer);

        const cryptSeq = this.initCryptSeq(version, blockIV);
        this.encryptSeq = cryptSeq;

        cryptSeq.reverse();
        this.decryptSeq = cryptSeq;
    }

    public static encryptor(version: number, iv: number, blockIV: number): Cipher {
        const cipher = new Cipher(version, iv, blockIV);
        cipher.transform = cipher.encrypt;
        return cipher;
    }

    public static decryptor(version: number, iv: number, blockIV: number): Cipher {
        const cipher = new Cipher(version, iv, blockIV);
        cipher.transform = cipher.decrypt;
        return cipher;
    }

    public static generateIv(): Buffer {
        return crypto.randomBytes(4);
    }

    private initCryptSeq(version: number, blockIV: number): Array<ICrypter> {
        const crypt: ICrypter[] = new Array<ICrypter>(4);
        crypt[RearrangeCrypter.getIndex(version)] = new RearrangeCrypter();
        crypt[XORCrypter.getIndex(version)] = new XORCrypter(version);
        crypt[TableCrypter.getIndex(version)] = new TableCrypter(version);

        const cryptSeq: ICrypter[] = new Array<ICrypter>();
        while (blockIV > 0) {
            const crypter: ICrypter = crypt[blockIV % 10];

            if (crypter != null) {
                cryptSeq.push(crypter);
            }

            blockIV = Math.floor(blockIV / 10);
        }
        return cryptSeq;
    }

    private encrypt(packet: Buffer): Packet {
        for (const crypter of this.encryptSeq) {
            crypter.encrypt(packet);
        }
        return this.writeHeader(packet);
    }

    private decrypt(packet: Buffer): Packet {
        const reader = new PacketReader(packet);
        const packetSize = this.readHeader(reader);

        packet = reader.read(packetSize);
        for (const crypter of this.decryptSeq) {
            crypter.decrypt(packet);
        }
        return new Packet(packet);
    }

    public advanceIV(): void {
        this.iv = Rand32.crtRand(this.iv);
    }

    public writeHeader(packet: Buffer): Packet {
        const encSeq = this.encodeSeqBase();

        const writer = new PacketWriter(packet.length + this.HEADER_SIZE);
        writer.writeUShort(encSeq);
        writer.writeInt(packet.length);
        writer.write(packet);

        return writer;
    }

    public readHeader(packet: PacketReader): number {
        const encSeq: number = packet.readUShort();
        const decSeq: number = this.decodeSeqBase(encSeq);

        if (decSeq != this.version) {
            console.log("Packet has invalid sequence header: " + decSeq);
        }

        const packetSize = packet.readInt();
        if (packet.length < packetSize + this.HEADER_SIZE) {
            console.log("Packet has invalid length: " + packet.length);
        }

        return packetSize;
    }

    private encodeSeqBase(): number {
        const encSeq = this.version ^ (this.iv >>> 16);

        this.advanceIV();

        return encSeq;
    }

    private decodeSeqBase(encSeq: number): number {
        const decSeq: number = (this.iv >>> 16) ^ encSeq;

        this.advanceIV();

        return decSeq;
    }
}