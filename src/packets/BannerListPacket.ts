import { SendOp } from "../constants/SendOp";
import { Packet } from "../tools/Packet";
import { PacketWriter } from "../tools/PacketWriter";

export class BannerListPacket {

    public static setBanner(count: number): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.BANNER_LIST);
        packet.writeShort(count);
        for (let i = 0; i < count; i++) {
            packet.writeInt(); // id
            packet.writeUnicodeString("name"); // name
            packet.writeUnicodeString("merat"); // type
            packet.writeUnicodeString("");
            packet.writeUnicodeString("");
            packet.writeUnicodeString("url"); // url
            packet.writeInt(); // language
            packet.writeLong(); // timestamp
            packet.writeLong();
        }

        return packet;
    }
}