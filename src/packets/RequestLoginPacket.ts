import { SendOp } from "../constants/SendOp";
import { Packet } from "../tools/Packet";
import { PacketWriter } from "../tools/PacketWriter";

export class RequestLoginPacket {

    public static login(): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.REQUEST_LOGIN);

        return packet;
    }
}