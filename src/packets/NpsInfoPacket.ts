import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";

export class NpsInfoPacket {

    public static npsInfo(): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.NPS_INFO);
        packet.writeLong();
        packet.writeUnicodeString();

        return packet;
    }
}