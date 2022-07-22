import { PacketWriter } from "@/crypto/protocol/PacketWriter";
import { PlayerStats } from "@/types/player/PlayerStats";

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

        /* Alternative Stat Struct
        packet.WriteByte(); // Count
        for (int i = 0; i < count; i++) {
            packet.WriteByte(); // Type
            if (type == 4) packet.WriteLong();
            else packet.WriteInt();
        }
        */
    }

    public static writePassiveSkills(packet: PacketWriter): void {
        const count = 0;
        packet.writeShort(count);
        for (let i = 0; i < count; i++) {
            packet.writeInt(5963582);
            packet.writeInt(34759588);
            packet.writeInt(5963582);
            packet.writeInt(679834064);
            packet.writeInt(679834064);
            packet.writeInt(10500111);
            packet.writeShort(1);
            packet.writeInt(1);
            packet.writeByte(1);
            packet.writeLong();
        }
    }
}
