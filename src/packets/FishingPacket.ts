import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";

enum Mode {
    LOAD_LOG = 0x7,
}

export class FishingPacket {

    public static loadLog(): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.FISHING);
        packet.writeByte(Mode.LOAD_LOG);
        packet.writeInt(); // count

        return packet;
    }
}
