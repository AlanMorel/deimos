import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";

export class MoveResultPacket {
    public static moveResult(): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.MOVE_RESULT);
        packet.writeShort();

        return packet;
    }
}
