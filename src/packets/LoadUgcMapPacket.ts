import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";

export class LoadUgcMapPacket {
    public static loadMap(): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.LOAD_UGC_MAP);

        for (let i = 0; i < 9; i++) {
            packet.writeByte();
        }

        return packet;
    }
}
