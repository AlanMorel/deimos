import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";
import { Time } from "../tools/Time";

export class ResponseTimeSyncPacket {
    public static request(): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.RESPONSE_TIME_SYNC);
        packet.writeByte(0x2); // mode
        packet.writeInt(Time.getTickCount());
        packet.writeLong(Time.getUnixTimeSeconds());
        packet.writeByte();
        packet.writeInt();

        return packet;
    }

    public static setInitial1(): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.RESPONSE_TIME_SYNC);
        packet.writeByte(0x1); // mode
        packet.writeInt(Time.getTickCount());
        packet.writeLong(Time.getUnixTimeSeconds());
        packet.writeByte();
        packet.writeInt();

        return packet;
    }

    public static setInitial2(): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.RESPONSE_TIME_SYNC);
        packet.writeByte(0x3); // mode
        packet.writeLong(Time.getUnixTimeSeconds());

        return packet;
    }
}
