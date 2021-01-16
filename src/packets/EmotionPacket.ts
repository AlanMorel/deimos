import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";

enum Mode {
    LOAD = 0x0
}

export class EmotionPacket {

    public static loadEmotions(): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.EMOTION);
        packet.writeByte(Mode.LOAD);

        const emoteList = [
            90200011, 90200004, 90200024, 90200041, 90200042,
            90200057, 90200043, 90200022, 90200031, 90200005,
            90200006, 90200003, 90200092, 90200077, 90200073,
            90200023, 90200001, 90200019, 90200020, 90200021,
            90200009, 90200027, 90200010, 90200028, 90200051,
            90200015, 90200016, 90200055, 90200060, 90200017,
            90200018, 90200093
        ];

        packet.writeInt(emoteList.length);
        for (const emoteId of emoteList) {
            packet.writeInt(emoteId);
            packet.writeInt(1);
            packet.writeLong();
        }

        return packet;
    }
}
