import { SendOp } from "@/constants/SendOp";
import { Packet } from "@/crypto/protocol/Packet";
import { PacketWriter } from "@/crypto/protocol/PacketWriter";

export class RequestKeyPacket {
    public static key(): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.REQUEST_KEY);

        return packet;
    }
}
