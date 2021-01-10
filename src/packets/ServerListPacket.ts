import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";
import { Endpoint } from "../interfaces/Endpoint";

export class ServerListPacket {

    public static setServers(serverName: string, endpoints: Endpoint[]): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.SERVER_LIST);
        packet.writeByte(0x1);
        packet.writeInt(0x1);
        packet.writeUnicodeString(serverName);
        packet.writeByte(4); // IPv4?
        packet.writeUShort(endpoints.length);
        for (const endpoint of endpoints) {
            packet.writeUnicodeString(endpoint.address);
            packet.writeUShort(endpoint.port);
        }
        packet.writeInt(100); // constant?

        // Looks like length 9, then 1-9 in scrambled order
        packet.writeBytes(0x09, 0x0, 0x1, 0x0, 0x4, 0x0, 0x7, 0x0, 0x2, 0x0, 0x5, 0x0, 0x8, 0x0, 0x3, 0x0, 0x6, 0x0, 0x9, 0x0);

        return packet;
    }
}