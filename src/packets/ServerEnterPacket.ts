import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";
import { Player } from "../types/Player";

export class ServerEnterPacket {

    public static enter(player: Player): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.SERVER_ENTER);
        packet.writeInt(100000); // TODO: replace with player.objectId
        packet.writeBigInt(player.characterId);
        packet.writeShort(1); // player.channel
        packet.writeBigInt(player.experience);
        packet.writeBigInt(player.restExperience);
        packet.writeBigInt(player.mesos);

        packet.writeBigInt(player.merets); // Merets
        packet.writeLong(); // Merets
        // These Merets are added up. If set, previous are ignored.

        packet.writeLong(); // Game Merets
        packet.writeLong(); // Event Merets

        packet.writeLong();

        packet.writeBigInt(player.valorToken);
        packet.writeBigInt(player.treva);
        packet.writeBigInt(player.rue);
        packet.writeBigInt(player.haviFruit);
        packet.writeLong();
        packet.writeLong();
        packet.writeLong();
        packet.writeLong();
        packet.writeBigInt(player.mesoToken);
        packet.writeUnicodeString(""); // player.profileUrl
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
        packet.writeUnicodeString("http://nxcache.nexon.net/maplestory2/maplenews/index.html");
        packet.writeUnicodeString("");
        packet.writeUnicodeString("^https?://test-nxcache.nexon.net ^https?://nxcache.nexon.net");
        packet.writeUnicodeString("");

        return packet;
    }
}
