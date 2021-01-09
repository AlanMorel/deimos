import * as crypto from 'crypto';
import { Packet } from '../tools/Packet';
import { PacketReader } from '../tools/PacketReader';
import { PacketWriter } from '../tools/PacketWriter';
import { ICrypter } from './ICrypter';
import { Rand32 } from './Rand32';
import { RearrangeCrypter } from './RearrangeCrypter';
import { TableCrypter } from './TableCrypter';
import { XORCrypter } from './XorCrypter';

export class Cipher {
    private HEADER_SIZE: number = 6;

    private version: number;
    private encryptSeq: ICrypter[];
    private decryptSeq: ICrypter[];

    private iv: number;

    public transform: (buffer: Buffer) => Packet;

    constructor(version: number, iv: number, blockIV: number) {
        this.version = version;
        this.iv = iv;
        this.transform = (buffer: Buffer) => new Packet(buffer);

        let cryptSeq = this.initCryptSeq(version, blockIV);
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
        let crypt: ICrypter[] = new Array<ICrypter>(4);
        crypt[RearrangeCrypter.getIndex(version)] = new RearrangeCrypter();
        crypt[XORCrypter.getIndex(version)] = new XORCrypter(version);
        crypt[TableCrypter.getIndex(version)] = new TableCrypter(version);

        let cryptSeq: ICrypter[] = new Array<ICrypter>();
        while (blockIV > 0) {
            let crypter: ICrypter = crypt[blockIV % 10];
            if (crypter != null) {
                cryptSeq.push(crypter);
            }
            blockIV = Math.floor(blockIV / 10);
        }
        return cryptSeq;
    }

    private encrypt(packet: Buffer): Packet {
        for (let crypter of this.encryptSeq) {
            crypter.encrypt(packet);
        }
        return this.writeHeader(packet);
    }

    private decrypt(packet: Buffer): Packet {
        let reader = new PacketReader(packet);
        let packetSize = this.readHeader(reader);

        packet = reader.read(packetSize);
        for (let crypter of this.decryptSeq) {
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
        let encSeq: number = packet.readUShort();
        let decSeq: number = this.decodeSeqBase(encSeq);
        if (decSeq != this.version) {
            console.log("Packet has invalid sequence header: " + decSeq);
        }
        let packetSize = packet.readInt();
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
        let decSeq: number = (this.iv >>> 16) ^ encSeq;
        this.advanceIV();
        return decSeq;
    }
}