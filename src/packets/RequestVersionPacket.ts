import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";

export class RequestVersionPacket {

    public static handshake(version: number, ivRecv: number, ivSend: number, blockIv: number, type: number): Packet {
        const packet = new PacketWriter();

        packet.writeShort(0x1);
        packet.writeUInt(version);
        packet.writeUInt(ivRecv);
        packet.writeUInt(ivSend);
        packet.writeUInt(blockIv);
        packet.writeByte(type);

        return packet;
    }
}