import { SendOp } from "@/constants/SendOp";
import { Packet } from "@/crypto/protocol/Packet";
import { PacketWriter } from "@/crypto/protocol/PacketWriter";

enum Mode {
    NAME_TAKEN = 0xb
}

export class CharacterCreatePacket {
    public static nameTaken(): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.CHARACTER_CREATE);
        packet.writeByte(Mode.NAME_TAKEN);
        packet.writeShort();

        return packet;
    }
}
