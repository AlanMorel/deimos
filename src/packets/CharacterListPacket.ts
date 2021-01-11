import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";
import { Player } from "../types/Player";

enum Mode {
    ADD = 0x0,
    START_LIST = 0x3,
    END_LIST = 0x4
}

export class CharacterListPacket {

    public static addEntries(characters: Array<Player>): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.CHARACTER_LIST);
        packet.writeByte(Mode.ADD);
        packet.writeByte(characters.length);

        for (const character of characters) {
            // write characters
        }

        return packet;
    }

    public static startList(): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.CHARACTER_LIST);
        packet.writeByte(Mode.START_LIST);

        return packet;
    }

    public static endList(): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.CHARACTER_LIST);
        packet.writeByte(Mode.END_LIST);
        packet.writeBoolean(false);

        return packet;
    }
}
