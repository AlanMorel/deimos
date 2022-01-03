import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";

export class TaxiPacket {
    public static discoverTaxi(mapId: number): Packet {
        const packetWriter = new PacketWriter();

        packetWriter.writeShort(SendOp.TAXI);
        packetWriter.writeInt(1);
        packetWriter.writeInt(mapId);
        packetWriter.writeByte(1);

        return packetWriter;
    }
}
