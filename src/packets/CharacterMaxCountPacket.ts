import { SendOp } from "@/constants/SendOp";
import { Packet } from "@/crypto/protocol/Packet";
import { PacketWriter } from "@/crypto/protocol/PacketWriter";

export class CharacterMaxCountPacket {
    public static setMax(unlocked: number, total: number): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.CHAR_MAX_COUNT);
        packet.writeInt(unlocked);
        packet.writeInt(total);

        return packet;
    }
}
