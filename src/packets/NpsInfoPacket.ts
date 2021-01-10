import { SendOp } from "../constants/SendOp";
import { Packet } from "../tools/Packet";
import { PacketWriter } from "../tools/PacketWriter";

export class NpsInfoPacket {

    public static npsInfo(): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.NPS_INFO);
        packet.writeLong();
        packet.writeUnicodeString();

        return packet;
    }
}