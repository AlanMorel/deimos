import { SendOp } from "@/constants/SendOp";
import { Packet } from "@/crypto/protocol/Packet";
import { PacketWriter } from "@/crypto/protocol/PacketWriter";

enum Mode {
    ENTER = 0x0
}

export class FieldEntrancePacket {
    public static enter(): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.FIELD_ENTRANCE);
        packet.writeByte(Mode.ENTER);
        packet.writeInt(0); // count

        return packet;
    }
}
