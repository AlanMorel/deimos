import { SendOp } from "../constants/SendOp";
import { Packet } from "../crypto/protocol/Packet";
import { PacketWriter } from "../crypto/protocol/PacketWriter";
import { InventoryTab } from "../types/inventory/InventoryTab";
import { Item } from "../types/item/Item";
import { ItemPacketHelper } from "./helpers/ItemPacketHelper";

enum Mode {
    ADD = 0x0,
    REMOVE = 0x1,
    UPDATE = 0x2,
    MOVE = 0x3,
    MARK_NEW = 0x8,
    LOAD_TO_TAB = 0xA,
    RESET = 0xD,
    LOAD = 0xE
}

export class ItemInventoryPacket {

    public static add(item: Item): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.ITEM_INVENTORY);
        packet.writeByte(Mode.ADD);
        packet.writeInt(item.id);
        packet.writeBigInt(item.uid);
        packet.writeShort(item.slot);
        packet.writeInt(item.rarity);
        packet.writeUnicodeString("");
        ItemPacketHelper.writeItem(packet, item);

        return packet;
    }

    public static remove(uid: BigInt): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.ITEM_INVENTORY);
        packet.writeByte(Mode.REMOVE);
        packet.writeBigInt(uid);

        return packet;
    }

    public static update(uid: BigInt, amount: number): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.ITEM_INVENTORY);
        packet.writeByte(Mode.UPDATE);
        packet.writeBigInt(uid);
        packet.writeInt(amount);

        return packet;
    }

    public static move(dstUid: BigInt, srcSlot: number, srcUid: BigInt, dstSlot: number): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.ITEM_INVENTORY);
        packet.writeByte(Mode.MOVE);
        packet.writeBigInt(dstUid);
        packet.writeShort(srcSlot);
        packet.writeBigInt(srcUid);
        packet.writeShort(dstSlot);

        return packet;
    }

    public static markItemNew(item: Item, amount: number): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.ITEM_INVENTORY);
        packet.writeByte(Mode.MARK_NEW);
        packet.writeBigInt(item.uid);
        packet.writeInt(amount);
        packet.writeUnicodeString("");

        return packet;
    }

    public static loadItemsToTab(tab: InventoryTab, items: Array<Item>): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.ITEM_INVENTORY);
        packet.writeByte(Mode.LOAD_TO_TAB);
        packet.writeInt(tab);

        packet.writeShort(items.length);
        for (const item of items) {
            packet.writeInt(item.id);
            packet.writeBigInt(item.uid);
            packet.writeShort(item.slot);
            packet.writeInt(item.rarity);
            ItemPacketHelper.writeItem(packet, item);
        }

        return packet;
    }

    public static resetTab(tab: number): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.ITEM_INVENTORY);
        packet.writeByte(Mode.RESET);
        packet.writeInt(tab);

        return packet;
    }

    public static loadTab(tab: number): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.ITEM_INVENTORY);
        packet.writeByte(Mode.LOAD);
        packet.writeByte(tab);
        packet.writeInt();

        return packet;
    }
}
