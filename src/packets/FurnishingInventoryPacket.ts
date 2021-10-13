import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";

enum Mode {
    START_LIST = 0x0,
    END_LIST = 0x4
}

export class FurnishingInventoryPacket {
    public static startList(): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.FURNISHING_INVENTORY);
        packet.writeByte(Mode.START_LIST);

        return packet;
    }

    public static endList(): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.FURNISHING_INVENTORY);
        packet.writeByte(Mode.END_LIST);

        return packet;
    }
}
