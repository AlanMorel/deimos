import { SendOp } from "@/constants/SendOp";
import { Packet } from "@/crypto/protocol/Packet";
import { PacketWriter } from "@/crypto/protocol/PacketWriter";

enum Mode {
    START_LIST = 0x1,
    COUNT = 0x2,
    END_LIST = 0x8
}

export class MarketInventoryPacket {
    public static startList(): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.MARKET_INVENTORY);
        packet.writeByte(Mode.START_LIST);

        return packet;
    }

    public static count(count: number): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.MARKET_INVENTORY);
        packet.writeByte(Mode.COUNT);
        packet.writeInt(count);

        return packet;
    }

    public static endList(): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.MARKET_INVENTORY);
        packet.writeByte(Mode.END_LIST);

        return packet;
    }
}
