import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";
import { CoordF } from "../types/coords/CoordF";
import { Player } from "../types/player/Player";

enum Mode {
    LOAD_PLAYER = 0x3
}

export class ProxyGameObjectPacket {

    public static loadPlayer(player: Player): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.PROXY_GAME_OBJ);
        packet.writeByte(Mode.LOAD_PLAYER);
        packet.writeInt(player.objectId);
        packet.writeBigInt(player.accountId);
        packet.writeBigInt(player.characterId);
        packet.writeUnicodeString(player.name);
        packet.writeUnicodeString(player.profileUrl);
        packet.writeUnicodeString(player.motto);
        packet.writeByte();
        CoordF.write(packet, player.coord);
        packet.writeShort(player.level);
        packet.writeShort(player.jobGroupId);
        packet.writeInt(player.getJobId());
        packet.writeInt();
        packet.writeInt();
        packet.writeInt();
        packet.writeUnicodeString(player.homeName);
        packet.writeInt();
        packet.writeShort();

        for (const trophyCount of player.trophy) {
            packet.writeInt(trophyCount);
        }

        return packet;
    }
}
