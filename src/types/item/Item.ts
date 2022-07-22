import { Metadata } from "@/data/metadata/Metadata";
import { GuidGenerator } from "@/tools/GuidGenerator";
import { Color } from "@/types/color/Color";
import { ItemColor } from "@/types/color/ItemColor";
import { InventoryTab } from "@/types/inventory/InventoryTab";
import { ItemSlot } from "@/types/item/ItemSlot";
import { ItemStats } from "@/types/item/ItemStats";
import { TransferFlag } from "@/types/item/TransferFlag";
import { Player } from "@/types/player/Player";

export class Item {
    public inventoryTab: InventoryTab;
    public itemSlot: ItemSlot;
    public slotMax: number;
    public isTemplate: boolean = false;

    public readonly id: number;
    public uid: bigint = GuidGenerator.generateLong();
    public slot: number = -1;
    public amount: number = 1;
    public rarity: number = 0;

    public creationTime: bigint = 0n;
    public expiryTime: bigint = 0n;

    public timesAttributesChanged: number = 0;
    public isLocked: boolean = false;
    public unlockTime: bigint = 0n;
    public remainingGlamorForges: number = 0;
    public enchants: number = 0;

    // enchantExp (10000 = 100%) for Peachy
    public enchantExp: number = 0;
    public canRepackage: boolean = true; // if false, item becomes untradable
    public charges: number = 0;
    public transferFlag: TransferFlag = TransferFlag.None;
    public remainingTrades: number = 0;

    // for friendship badges
    public pairedCharacterId: bigint = 0n;
    public pairedCharacterName: string = "";

    public owner?: Player;

    public color: ItemColor = new ItemColor(new Color(0, 0, 0, -1), new Color(0, 0, 0, -1), new Color(0, 0, 0, -1), 0);

    public appearanceFlag: number = 0;

    public stats: ItemStats = new ItemStats();

    public constructor(id: number) {
        this.id = id;
        this.inventoryTab = Metadata.getItems().getTab(id);
        this.itemSlot = Metadata.getItems().getSlot(id);
        this.slotMax = Metadata.getItems().getSlotMax(id);
        this.isTemplate = false; // TODO: ItemMetadata.getIsTemplate(id);
    }

    private static copy(item: Item): Item {
        const copy = new Item(item.id);

        // TODO: copy item stats

        return copy;
    }

    public trySplit(amount: number): Item | undefined {
        if (this.amount <= amount) {
            return;
        }

        const splitItem = Item.copy(this);

        this.amount -= amount;
        splitItem.amount = amount;
        splitItem.slot = -1;
        splitItem.uid = BigInt(process.uptime());

        return splitItem;
    }
}
