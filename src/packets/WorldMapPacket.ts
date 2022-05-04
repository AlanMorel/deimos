import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";

export class WorldMapPacket {
    public static openMap(): Packet {
        const packetWriter = new PacketWriter();

        packetWriter.writeShort(SendOp.WORLD_MAP);

        // Expect 4 bytes
        // 0X 00 00 00 breaks map
        // 00 01 00 00 breaks map => wants 1 int
        // 00 00 0X 00 breaks map => wants 1 more byte
        // 00 00 00 0X breaks map => wants 1 more byte
        // seems like map data seems to be sent elsewhere, perhaps FIELD_ADD_USER

        packetWriter.writeByte();
        packetWriter.writeByte();
        packetWriter.writeByte();
        packetWriter.writeByte();

        return packetWriter;
    }
}
