import { SendOp } from "../constants/SendOp";
import { ServerIp } from "../handlers/ResponseLoginHandler";
import { Packet } from "../tools/Packet";
import { PacketWriter } from "../tools/PacketWriter";

export class ServerListPacket {

    public static setServers(serverName: string, serverIps: ServerIp[]): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.SERVER_LIST);
        packet.writeByte(0x1);
        packet.writeInt(0x1);
        packet.writeUnicodeString(serverName);
        packet.writeByte(4); // IPv4?
        packet.writeUShort(serverIps.length);
        for (const ip of serverIps) {
            packet.writeUnicodeString(ip.address);
            packet.writeUShort(ip.port);
        }
        packet.writeInt(100); // constant?

        // Looks like length 9, then 1-9 in scrambled order
        packet.writeHexString("09 00 01 00 04 00 07 00 02 00 05 00 08 00 03 00 06 00 09 00");

        return packet;
    }
}