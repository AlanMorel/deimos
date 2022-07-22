import { Cipher } from "@/crypto/cipher/Cipher";
import { Packet } from "@/crypto/protocol/Packet";
import { PacketWriter } from "@/crypto/protocol/PacketWriter";

export class SendCipher extends Cipher {
    public constructor(version: number, iv: number, blockIV: number) {
        super(version, iv, blockIV);
    }

    public encrypt(packet: Buffer): Packet {
        for (const crypter of this.cryptSeq) {
            crypter.encrypt(packet);
        }
        return this.writeHeader(packet);
    }

    public writeHeader(packet: Buffer): Packet {
        const encSeq = this.encodeSeqBase();

        const writer = new PacketWriter(packet.length + Cipher.HEADER_SIZE);
        writer.writeUShort(encSeq);
        writer.writeInt(packet.length);
        writer.write(packet);

        return writer;
    }

    private encodeSeqBase(): number {
        const encSeq = this.version ^ (this.iv >>> 16);

        this.advanceIV();

        return encSeq;
    }
}
