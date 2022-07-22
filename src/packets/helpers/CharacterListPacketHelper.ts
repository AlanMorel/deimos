import { PacketWriter } from "@/crypto/protocol/PacketWriter";
import { ItemPacketHelper } from "@/packets/helpers/ItemPacketHelper";
import { SkinColor } from "@/types/color/SkinColor";
import { CoordF } from "@/types/coords/CoordF";
import { Item } from "@/types/item/Item";
import { ItemSlot } from "@/types/item/ItemSlot";
import { Player } from "@/types/player/Player";

export class CharacterListPacketHelper {
    public static writeCharacterEntry(packet: PacketWriter, player: Player): void {
        CharacterListPacketHelper.writeCharacter(packet, player);

        packet.writeUnicodeString(player.profileUrl);
        packet.writeLong();

        packet.writeByte(player.equips.size);
        player.equips.forEach((equip: Item, slot: ItemSlot) => {
            ItemPacketHelper.writeEquip(packet, slot, equip);
        });

        const badgeCount = 0;
        packet.writeByte(badgeCount);
        for (let i = 0; i < badgeCount; i++) {
            packet.writeByte();

            packet.writeInt(); // BRANCH HERE if Badge
            // Badge data here is causing a LOT of potential branching...
            packet.writeLong();
            packet.writeInt();
        }

        const boolValue = false;
        packet.writeBoolean(boolValue);
        if (boolValue) {
            packet.writeLong();
            packet.writeLong();
            const otherBoolValue = true;
            packet.writeBoolean(otherBoolValue);
            if (otherBoolValue) {
                packet.writeInt();
                packet.writeLong();
                packet.writeUnicodeString("abc");
                packet.writeInt();
            }
        }
    }

    public static writeCharacter(packet: PacketWriter, player: Player): void {
        packet.writeBigInt(player.accountId);
        packet.writeBigInt(player.characterId);
        packet.writeUnicodeString(player.name);
        packet.writeByte(player.gender);
        packet.writeByte(1);
        packet.writeLong();
        packet.writeInt();
        packet.writeInt(player.mapId);
        packet.writeInt(player.mapId); // Sometimes 0
        packet.writeInt();
        packet.writeShort(player.level);
        packet.writeShort();
        packet.writeInt(player.job / 10);
        packet.writeInt(player.getJobId());
        packet.writeInt(); // CurHp?
        packet.writeInt(); // MaxHp?
        packet.writeShort();
        packet.writeLong();
        packet.writeLong(); // Some timestamp
        packet.writeLong();
        packet.writeInt();
        CoordF.write(packet, player.rotation); // NOT char Coord/UnknownCoord
        packet.writeInt();
        SkinColor.write(packet, player.skinColor);
        packet.writeBigInt(player.creationTime);

        for (const trophyCount of player.trophy) {
            packet.writeInt(trophyCount);
        }

        packet.writeLong(); // some uid
        packet.writeUnicodeString(player.guildName);
        packet.writeUnicodeString(player.motto);

        packet.writeUnicodeString(player.profileUrl);

        const clubCount = 0;
        packet.writeByte(clubCount); // # Clubs
        for (let i = 0; i < clubCount; i++) {
            const clubBool = true;
            packet.writeBoolean(clubBool);
            if (clubBool) {
                packet.writeLong();
                packet.writeUnicodeString("club name");
            }
        }
        packet.writeByte();
        for (let i = 0; i < 12; i++) {
            packet.writeInt(); // ???
        }

        // Some function call on CCharacterList property
        packet.writeUnicodeString("");
        packet.writeBigInt(player.unknownId); // THIS MUST BE CORRECT... BYPASS KEY...
        packet.writeLong(2000);
        packet.writeLong(3000);
        // End

        const countA = 0;
        packet.writeInt(countA);
        for (let i = 0; i < countA; i++) {
            packet.writeLong();
        }

        packet.writeByte();
        packet.writeByte();
        packet.writeLong();
        packet.writeInt();
        packet.writeInt();
        packet.writeLong(); // Timestamp
        packet.writeInt(player.prestigeLevel);
        packet.writeLong(); // Timestamp

        const countB = 0;
        packet.writeInt(countB);
        for (let i = 0; i < countB; i++) {
            packet.writeLong();
        }

        const countC = 0;
        packet.writeInt(countC);
        for (let i = 0; i < countC; i++) {
            packet.writeLong();
        }

        packet.writeShort();
        packet.writeLong();
    }

    public static WriteEquip(packet: PacketWriter, slot: ItemSlot, item: Item): void {
        packet.writeInt(item.id);
        packet.writeBigInt(item.uid);
        packet.writeUnicodeString(slot.toString());
        packet.writeInt(1);
        ItemPacketHelper.writeItem(packet, item);
    }
}
