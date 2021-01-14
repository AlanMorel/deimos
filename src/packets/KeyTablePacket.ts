import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";

enum Mode {
    REQUEST = 0x0,
}

export class KeyTablePacket {

    public static requestDefault(): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.KEY_TABLE);
        packet.writeByte(Mode.REQUEST);
        packet.writeBoolean(true);

        return packet;
    }
}
