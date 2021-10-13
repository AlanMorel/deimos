import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";

export class RequestLoginPacket {
    public static login(): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.REQUEST_LOGIN);

        return packet;
    }
}
