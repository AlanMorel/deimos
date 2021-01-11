import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";
import { Player } from "../types/Player";

export class CharacterListPacket {

    public static addEntries(characters: Array<Player>): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.CHARACTER_LIST);
        packet.writeByte(0x0); // mode
        packet.writeByte(characters.length);

        for (const character of characters) {
            // write characters
        }

        return packet;
    }

    public static startList(): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.CHARACTER_LIST);
        packet.writeByte(0x3); // mode

        return packet;
    }

    public static endList(): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.CHARACTER_LIST);
        packet.writeByte(0x4); // mode
        packet.writeBoolean(false);

        return packet;
    }
}
