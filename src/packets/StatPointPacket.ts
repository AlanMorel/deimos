import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";
import { Player } from "../types/Player";

enum StatPointPacketMode {
    TotalPoints = 0x0,
    StatDistribution = 0x1
}

export class StatPointPacket {

    public static writeTotalStatPoints(player: Player): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.STAT_POINT);
        packet.writeByte(StatPointPacketMode.TotalPoints);
        packet.writeInt(player.statPointDistribution.totalStatPoints);

        return packet;
    }
}
