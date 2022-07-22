import { SendOp } from "@/constants/SendOp";
import { Packet } from "@/crypto/protocol/Packet";
import { PacketWriter } from "@/crypto/protocol/PacketWriter";
import { Time } from "@/tools/Time";

export class RequestClientTickSyncPacket {
    public static tickSync(): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.REQUEST_CLIENTTICK_SYNC);
        packet.writeInt(Time.getTickCount());

        return packet;
    }
}
