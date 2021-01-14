import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";

export class DynamicChannelPacket {

    public static dynamicChannel(): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.DYNAMIC_CHANNEL);
        packet.writeByte(0x0); // mode
        packet.writeShort(0xA);
        packet.writeShort(0x9);
        packet.writeShort(0x9);
        packet.writeShort(0x9);
        packet.writeShort(0x9);
        packet.writeShort(0xA);
        packet.writeShort(0xA);
        packet.writeShort(0xA);

        return packet;
    }
}
