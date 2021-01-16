import { PacketWriter } from "../crypto/protocol/PacketWriter";
import { PlayerStats } from "../types/PlayerStats";

export class FieldPacket {

    public static writeTotalStats(packet: PacketWriter, stats: PlayerStats): void {

        packet.writeByte(0x23);

        //for (let i = 0; i < 3; i++) {
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

        //}

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
        // TODO
        packet.writeHexString("01 00 3E FF 5A 00 A4 63 12 02 3E FF 5A 00 D0 71 85 28 D0 71 85 28 0F 38 A0 00 01 00 01 00 00 00 01 00 00 00 00 00 00 00 00");
        /*short count = 0;
        packet.WriteShort(count);
        for (int i = 0; i < count; i++) {
            packet.WriteInt();
            packet.WriteInt();
            packet.WriteInt();
            packet.WriteInt();
            packet.WriteInt();
            packet.WriteInt();
            packet.WriteShort();
            packet.WriteInt();
            packet.WriteByte();
            packet.WriteLong();
        }*/
    }
}
