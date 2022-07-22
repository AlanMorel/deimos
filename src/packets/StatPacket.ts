import { SendOp } from "@/constants/SendOp";
import { Packet } from "@/crypto/protocol/Packet";
import { PacketWriter } from "@/crypto/protocol/PacketWriter";
import { Player } from "@/types/player/Player";
import { PlayerStats } from "@/types/player/PlayerStats";

export class StatPacket {
    public static setStats(player: Player): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.STAT);
        packet.writeInt(player.objectId);
        packet.writeByte();
        packet.writeByte(0x23);
        PlayerStats.write(packet, player.stats);

        return packet;
    }
}
