import { Packet } from "../../tools/Packet";
import { PacketReader } from "../../tools/PacketReader";
import { Cipher } from "./Cipher";

export class RecvCipher extends Cipher {

    public constructor(version: number, iv: number, blockIV: number) {
        super(version, iv, blockIV);
        this.cryptSeq.reverse();
    }

    public decrypt(packet: Buffer): Packet {
        const reader = new PacketReader(packet);
        const packetSize = this.readHeader(reader);

        packet = reader.read(packetSize);
        for (const crypter of this.cryptSeq) {
            crypter.decrypt(packet);
        }

        return new Packet(packet);
    }

    public readHeader(packet: PacketReader): number {
        const encSeq: number = packet.readUShort();
        const decSeq: number = this.decodeSeqBase(encSeq);

        if (decSeq != this.version) {
            console.log("Packet has invalid sequence header: " + decSeq);
        }

        const packetSize = packet.readInt();
        if (packet.length < packetSize + Cipher.HEADER_SIZE) {
            console.log("Packet has invalid length: " + packet.length);
        }

        return packetSize;
    }

    private decodeSeqBase(encSeq: number): number {
        const decSeq: number = (this.iv >>> 16) ^ encSeq;

        this.advanceIV();

        return decSeq;
    }
}