import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";

export class UgcPacket {

    public static setEndpoint(unknownEndpoint: string, resourceEndpoint: string, locale: string = "na"): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.UGC);
        packet.writeByte(0x11); // mode
        packet.writeUnicodeString(unknownEndpoint); // serves some random irrq.aspx
        packet.writeUnicodeString(resourceEndpoint); // serves resources
        packet.writeUnicodeString(locale);
        packet.writeByte(2);

        return packet;
    }
}
