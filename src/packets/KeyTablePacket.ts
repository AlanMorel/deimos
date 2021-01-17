import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";
import { GameOptions } from "../types/GameOptions";
import { Hotbar } from "../types/HotBar";

enum Mode {
    REQUEST = 0x0,
    SEND_HOTBARS = 0x7
}

export class KeyTablePacket {

    public static requestDefault(): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.KEY_TABLE);
        packet.writeByte(Mode.REQUEST);
        packet.writeBoolean(true);

        return packet;
    }

    public static sendHotbars(options: GameOptions): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.KEY_TABLE);
        packet.writeByte(Mode.SEND_HOTBARS)
        Hotbar.write(packet, options);

        return packet;
    }
}
