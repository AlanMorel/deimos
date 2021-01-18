import { GuidGenerator } from "../../tools/GuidGenerator";
import { Color } from "../color/Color";
import { ItemColor } from "../color/ItemColor";
import { InventoryTab } from "../InventoryTab";
import { Player } from "../player/Player";
import { HairData } from "./HairData";
import { ItemSlot } from "./ItemSlot";
import { ItemStats } from "./ItemStats";
import { TransferFlag } from "./TransferFlag";

export class Item {

    public inventoryTab: InventoryTab;
    public itemSlot: ItemSlot;
    public slotMax: number;
    public isTemplate: boolean = false;

    public readonly id: number;
    public uid: BigInt = GuidGenerator.generateLong();
    public slot: number = -1;
    public amount: number = 1;
    public rarity: number = 0;

    public creationTime: BigInt = 0n;
    public expiryTime: BigInt = 0n;

    public timesAttributesChanged: number = 0;
    public isLocked: boolean = false;
    public unlockTime: BigInt = 0n;
    public remainingGlamorForges: number = 0;
    public enchants: number = 0;

    // enchantExp (10000 = 100%) for Peachy
    public enchantExp: number = 0;
    public canRepackage: boolean = true; // if false, item becomes untradable
    public charges: number = 0;
    public transferFlag: TransferFlag = TransferFlag.None;
    public remainingTrades: number = 0;

    // for friendship badges
    public pairedCharacterId: BigInt = 0n;
    public pairedCharacterName: string = "";

    public owner?: Player;

    public color: ItemColor = new ItemColor(new Color(0, 0, 0, -1), new Color(0, 0, 0, -1), new Color(0, 0, 0, -1), 0);

    public hairData?: HairData;
    public faceDecorationData?: Buffer;

    public appearanceFlag: number = 0;

    public stats: ItemStats = new ItemStats();

    public constructor(id: number, itemSlot: ItemSlot, inventoryTab: InventoryTab = InventoryTab.Outfit) { // TODO: remove item slot from constructor once loaded from metadata
        this.id = id;
        // TODO: below read from metadata
        this.inventoryTab = inventoryTab;
        this.itemSlot = itemSlot;
        this.slotMax = 100;
        this.isTemplate = false;
    }

    private static copy(item: Item): Item {
        const copy = new Item(item.id, item.itemSlot);

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
