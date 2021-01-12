import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";
import { Endpoint } from "../network/Endpoint";

enum Mode {
    SET = 0x1
}

export class ServerListPacket {

    public static setServers(serverName: string, endpoints: Endpoint[], unknownData: Buffer): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.SERVER_LIST);
        packet.writeByte(Mode.SET);
        packet.writeInt(0x1);
        packet.writeUnicodeString(serverName);
        packet.writeByte(4); // IPv4?
        packet.writeUShort(endpoints.length);
        for (const endpoint of endpoints) {
            packet.writeUnicodeString(endpoint.getAddress());
            packet.writeUShort(endpoint.getPort());
        }
        packet.writeInt(100); // constant?
        packet.writeShort(unknownData.length);
        for (const byte of unknownData) {
            packet.writeShort(byte);
        }

        return packet;
    }
}
