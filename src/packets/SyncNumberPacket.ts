import { SendOp } from "@/constants/SendOp";
import { Packet } from "@/crypto/protocol/Packet";
import { PacketWriter } from "@/crypto/protocol/PacketWriter";

export class SyncNumberPacket {
    public static sync(): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.SYNC_NUMBER);
        packet.writeByte(0x0); // mode

        return packet;
    }
}
