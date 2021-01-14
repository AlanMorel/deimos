import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";
import { Player } from "../types/Player";

export class PrestigePacket {

    public static prestige(player: Player): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.PRESTIGE);
        packet.writeByte(0x0); // mode
        packet.writeBigInt(player.prestigeExperience);
        packet.writeInt(player.prestigeLevel);
        packet.writeBigInt(player.prestigeExperience);

        // Ranks: 2, 4, 6, 8, 10, 12, 20, 30, 40, 50, 60, 70, 80, 90
        const rankRewardsClaimed = new Array<number>();
        packet.writeInt(rankRewardsClaimed.length);
        for (const rank of rankRewardsClaimed) {
            packet.writeInt(rank);
        }

        return packet;
    }
}
