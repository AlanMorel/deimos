import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";
import { Time } from "../tools/Time";

export class UnknownSyncPacket {

    public static sync(): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.UNKNOWN_SYNC);
        packet.writeByte();
        packet.writeInt(Time.getTickCount());

        return packet;
    }
}
