import { PacketWriter } from "../crypto/protocol/PacketWriter";
import { PlayerStats } from "../types/player/PlayerStats";

export class FieldPacket {
    public static writeTotalStats(packet: PacketWriter, stats: PlayerStats): void {
        packet.writeByte(0x23);

        packet.writeLong(stats.hp.total);
        packet.writeInt(stats.atkSpd.total);
        packet.writeInt(stats.moveSpd.total);
        packet.writeInt(stats.mountSpeed.total);
        packet.writeInt(stats.jumpHeight.total);

        packet.writeLong(stats.hp.min);
        packet.writeInt(stats.atkSpd.min);
        packet.writeInt(stats.moveSpd.min);
        packet.writeInt(stats.mountSpeed.min);
        packet.writeInt(stats.jumpHeight.min);

        packet.writeLong(stats.hp.max);
        packet.writeInt(stats.atkSpd.max);
        packet.writeInt(stats.moveSpd.max);
        packet.writeInt(stats.mountSpeed.max);
        packet.writeInt(stats.jumpHeight.max);
    }
}
