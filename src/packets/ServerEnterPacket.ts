import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";
import { ChannelSession } from "../network/sessions/ChannelSession";

export class ServerEnterPacket {
    public static enter(session: ChannelSession): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.SERVER_ENTER);
        packet.writeInt(session.player.objectId);
        packet.writeBigInt(session.player.characterId);
        packet.writeShort(session.channel.id);
        packet.writeBigInt(session.player.experience);
        packet.writeBigInt(session.player.restExperience);
        packet.writeBigInt(session.player.wallet.meso.amount);

        packet.writeBigInt(session.player.wallet.meret.amount);
        packet.writeLong(); // Merets
        // These Merets are added up. If set, previous are ignored.

        packet.writeLong(); // Game Merets
        packet.writeLong(); // Event Merets

        packet.writeLong();

        packet.writeBigInt(session.player.wallet.valorToken.amount);
        packet.writeBigInt(session.player.wallet.treva.amount);
        packet.writeBigInt(session.player.wallet.rue.amount);
        packet.writeBigInt(session.player.wallet.haviFruit.amount);
        packet.writeLong();
        packet.writeLong();
        packet.writeLong();
        packet.writeLong();
        packet.writeBigInt(session.player.wallet.mesoToken.amount);
        packet.writeUnicodeString(session.player.profileUrl);
        packet.writeByte();
        packet.writeByte();

        // REQUIRED OR CRASH
        // Unlocked Hidden Maps (Not on WorldMap)
        const unlockedHiddenMaps = [52000065];
        packet.writeShort(unlockedHiddenMaps.length);
        for (const mapId of unlockedHiddenMaps) {
            packet.writeInt(mapId);
        }

        // Unlocked Maps (On WorldMap)
        const unlockedMaps = [2000062];
        packet.writeShort(unlockedMaps.length);
        for (const mapId of unlockedMaps) {
            packet.writeInt(mapId);
        }

        packet.writeLong();
        packet.writeUnicodeString("");
        packet.writeUnicodeString("");
        packet.writeUnicodeString("");
        packet.writeUnicodeString("");
        packet.writeUnicodeString("");

        return packet;
    }
}
