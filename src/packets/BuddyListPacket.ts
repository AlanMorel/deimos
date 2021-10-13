import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";

enum Mode {
    START_LIST = 0x0f,
    END_LIST = 0x13
}

export class BuddyListPacket {
    public static startList(): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.BUDDY);
        packet.writeByte(Mode.START_LIST);

        return packet;
    }

    public static endList(): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.BUDDY);
        packet.writeByte(Mode.END_LIST);
        packet.writeInt(0);

        return packet;
    }
}
