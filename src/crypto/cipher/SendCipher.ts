import { Packet } from "../../tools/Packet";
import { PacketWriter } from "../../tools/PacketWriter";
import { Crypter } from "../crypters/Crypter";
import { Cipher } from "./Cipher";

export class SendCipher extends Cipher {

    private encryptSeq: Crypter[];

    public constructor(version: number, iv: number, blockIV: number) {
        super(version, iv);

        const cryptSeq = this.initCryptSeq(version, blockIV);

        this.encryptSeq = cryptSeq;
    }

    public encrypt(packet: Buffer): Packet {
        for (const crypter of this.encryptSeq) {
            crypter.encrypt(packet);
        }
        return this.writeHeader(packet);
    }

    public writeHeader(packet: Buffer): Packet {
        const encSeq: number = this.encodeSeqBase();

        const writer = new PacketWriter(packet.length + Cipher.HEADER_SIZE);
        writer.writeUShort(encSeq);
        writer.writeInt(packet.length);
        writer.write(packet);

        return writer;
    }

    private encodeSeqBase(): number {
        const encSeq: number = this.version ^ (this.iv >>> 16);

        this.advanceIV();

        return encSeq;
    }
}