import { SendOp } from "@/constants/SendOp";
import { Packet } from "@/crypto/protocol/Packet";
import { PacketWriter } from "@/crypto/protocol/PacketWriter";
import { FieldObjectUpdate } from "@/server/fields/FieldObjectUpdate";
import { Enum } from "@/tools/Enum";
import { CoordF } from "@/types/coords/CoordF";
import { Player } from "@/types/player/Player";

enum Mode {
    LOAD_PLAYER = 0x3,
    UPDATE_PLAYER = 0x5
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
        packet.writeShort(player.job / 10);
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

    public static updatePlayer(player: Player): Packet {
        const flag = FieldObjectUpdate.Move | FieldObjectUpdate.Animate;
        const packet = new PacketWriter();

        packet.writeShort(SendOp.PROXY_GAME_OBJ);
        packet.writeByte(Mode.UPDATE_PLAYER);
        packet.writeInt(player.objectId);
        packet.writeByte(flag);

        if (Enum.hasFlag(flag, FieldObjectUpdate.Type1)) {
            packet.writeByte();
        }

        if (Enum.hasFlag(flag, FieldObjectUpdate.Move)) {
            CoordF.write(packet, player.coord);
        }

        if (Enum.hasFlag(flag, FieldObjectUpdate.Type3)) {
            packet.writeShort();
        }

        if (Enum.hasFlag(flag, FieldObjectUpdate.Type4)) {
            packet.writeShort();
            packet.writeInt();
        }

        if (Enum.hasFlag(flag, FieldObjectUpdate.Type5)) {
            packet.writeUnicodeString("Unknown");
        }

        if (Enum.hasFlag(flag, FieldObjectUpdate.Type6)) {
            packet.writeInt();
        }

        if (Enum.hasFlag(flag, FieldObjectUpdate.Animate)) {
            packet.writeShort(player.animation);
        }

        return packet;
    }
}
