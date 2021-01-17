import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";
import { Player } from "../types/player/Player";

enum Mode {
    TOTAL_POINTS = 0x0,
    STAT_DISTRIBUTION = 0x1
}

export class StatPointPacket {

    public static writeTotalStatPoints(player: Player): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.STAT_POINT);
        packet.writeByte(Mode.TOTAL_POINTS);
        packet.writeInt(player.statPointDistribution.totalStatPoints);

        return packet;
    }
}
