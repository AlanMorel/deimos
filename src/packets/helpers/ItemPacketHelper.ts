import { Packet } from "../../crypto/protocol/Packet";
import { PacketWriter } from "../../crypto/protocol/PacketWriter";
import { ItemColor } from "../../types/color/ItemColor";
import { FaceDecoration } from "../../types/item/FaceDecoration";
import { Hair } from "../../types/item/Hair";
import { Item } from "../../types/item/Item";
import { ItemSlot } from "../../types/item/ItemSlot";
import { ItemStat } from "../../types/item/ItemStat";
import { ItemStats } from "../../types/item/ItemStats";
import { SpecialItemStat } from "../../types/item/SpecialItemStat";
import { UgcPacketHelper } from "./UgcPacketHelper";

export class ItemPacketHelper {

    public static writeItem(packet: PacketWriter, item: Item): Packet {
        packet.writeInt(item.amount);
        packet.writeInt();
        packet.writeInt(-1);
        packet.writeBigInt(item.creationTime);
        packet.writeBigInt(item.expiryTime);
        packet.writeLong();
        packet.writeInt(item.timesAttributesChanged);
        packet.writeInt();
        packet.writeBoolean(item.isLocked);
        packet.writeBigInt(item.unlockTime);
        packet.writeShort(item.remainingGlamorForges);
        packet.writeByte();
        packet.writeInt();
        ItemPacketHelper.writeAppearance(packet, item);
        ItemPacketHelper.writeStats(packet, item.stats);
        packet.writeInt(item.enchants);
        packet.writeInt(item.enchantExp);
        packet.writeBoolean(true); // Enchant based peachy charges, otherwise always require 10 charges
        packet.writeLong();
        packet.writeInt();
        packet.writeInt();
        packet.writeBoolean(item.canRepackage);
        packet.writeInt(item.charges);
        ItemPacketHelper.writeStatDiff(packet, item.stats, item.stats);

        if (item.isTemplate) {
            // Not implemented, causes issues for non-default character creation outfits
            ItemPacketHelper.writeTemplate(packet);
        }

        // TODO: write pets

        packet.writeInt(item.transferFlag);
        packet.writeByte();
        packet.writeInt();
        packet.writeInt();
        packet.writeByte();
        packet.writeByte();

        // CharBound means untradable, unsellable, bound to char (ignores TransferFlag)
        const isCharBound = item.owner != null;
        packet.writeBoolean(isCharBound);
        if (isCharBound && item.owner) {
            packet.writeBigInt(item.owner.characterId);
            packet.writeUnicodeString(item.owner.name);
        }

        ItemPacketHelper.writeSockets(packet, item.stats);

        packet.writeBigInt(item.pairedCharacterId);
        if (item.pairedCharacterId != 0n) {
            packet.writeUnicodeString(item.pairedCharacterName);
            packet.writeBoolean(false);
        }

        // Bound to character
        packet.writeLong();
        packet.writeUnicodeString("");

        return packet;
    }

    public static writeEquip(packet: PacketWriter, slot: ItemSlot, item: Item): void {
        packet.writeInt(item.id);
        packet.writeBigInt(item.uid);
        packet.writeUnicodeString(ItemSlot[slot]);
        packet.writeInt(1);
        ItemPacketHelper.writeItem(packet, item);
    }

    public static writeTemplate(packet: PacketWriter): void {
        UgcPacketHelper.writeUgc(packet);
        packet.writeLong();
        packet.writeInt();
        packet.writeInt();
        packet.writeInt();
        packet.writeLong();
        packet.writeInt();
        packet.writeLong();
        packet.writeLong();
        packet.writeUnicodeString("");
    }

    public static writeStats(packet: PacketWriter, stats: ItemStats): void {
        packet.writeByte();
        const basicAttributes = stats.basicAttributes;
        packet.writeShort(basicAttributes.length);

        for (const stat of basicAttributes) {
            ItemStat.write(packet, stat);
        }

        packet.writeShort();
        packet.writeInt(); // SpecialAttributes

        // Another basic attributes block
        packet.writeShort();
        packet.writeShort();
        packet.writeInt();

        const bonusAttributes = stats.bonusAttributes;
        packet.writeShort(bonusAttributes.length);

        for (const stat of bonusAttributes) {
            ItemStat.write(packet, stat);
        }

        packet.writeShort();
        packet.writeInt(); // SpecialAttributes

        // Ignore other attributes
        for (let i = 0; i < 6; i++) {
            packet.writeShort();
            packet.writeShort();
            packet.writeInt();
        }
    }

    public static writeAppearance(packet: PacketWriter, item: Item): void {
        ItemColor.write(packet, item.color);
        packet.writeInt(item.appearanceFlag);
        // Positioning Data
        switch (item.itemSlot) {
            case ItemSlot.CP:
                for (let i = 0; i < 13; i++) {
                    packet.writeByte(0);
                }
                break;
            case ItemSlot.HR:
                const hair = item as Hair;
                Hair.write(packet, hair);
                break;
            case ItemSlot.FD:
                const faceDecoration = item as FaceDecoration;
                packet.write(faceDecoration.data);
                break;
        }
        return;
    }

    private static writeSockets(packet: PacketWriter, stats: ItemStats): Packet {
        packet.writeByte();
        packet.writeByte(stats.totalSockets);
        for (let i = 0; i < stats.totalSockets; i++) {

            if (i >= stats.gemstones.length) {
                packet.writeBoolean(false); // Locked
                continue;
            }

            packet.writeBoolean(true); // Unlocked

            const gem = stats.gemstones[i];
            packet.writeInt(gem.id);
            packet.writeBoolean(gem.ownerId != 0n);

            if (gem.ownerId != 0n) {
                packet.writeBigInt(gem.ownerId);
                packet.writeUnicodeString(gem.ownerName);
            }

            packet.writeBoolean(gem.unknown != 0n);
            if (gem.unknown != 0n) {
                packet.writeByte();
                packet.writeBigInt(gem.unknown);
            }
        }

        return packet;
    }

    private static writeStatDiff(packet: PacketWriter, oldStats: ItemStats, newStats: ItemStats): Packet {

        // TODO: Find stat diffs
        const generalStatDiff = new Array<ItemStat>();
        packet.writeByte(generalStatDiff.length);
        for (const stat of generalStatDiff) {
            ItemStat.write(packet, stat);
        }

        packet.writeInt(); // ???

        const statDiff = new Array<ItemStat>();
        packet.writeInt(statDiff.length);
        for (const stat of statDiff) {
            ItemStat.write(packet, stat);
        }

        const bonusStatDiff = new Array<SpecialItemStat>();
        packet.writeInt(bonusStatDiff.length);
        for (const stat of bonusStatDiff) {
            SpecialItemStat.write(packet, stat);
        }

        return packet;
    }
}
