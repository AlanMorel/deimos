import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";

enum Mode {
    RESET = 0xD,
    LOAD = 0xE
}

export class ItemInventoryPacket {

    public static resetTab(tab: number): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.ITEM_INVENTORY);
        packet.writeByte(Mode.RESET);
        packet.writeInt(tab);

        return packet;
    }

    public static loadTab(tab: number): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.ITEM_INVENTORY);
        packet.writeByte(Mode.LOAD);
        packet.writeByte(tab);
        packet.writeInt();

        return packet;
    }
}
