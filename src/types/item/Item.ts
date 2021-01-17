import { GuidGenerator } from "../../tools/GuidGenerator";
import { Color } from "../color/Color";
import { ItemColor } from "../color/ItemColor";
import { HairData } from "../HairData";
import { InventoryTab } from "../InventoryTab";
import { Player } from "../Player";
import { TransferFlag } from "../TransferFlag";
import { ItemSlot } from "./ItemSlot";
import { ItemStats } from "./ItemStats";

export class Item {

    public inventoryTab: InventoryTab;
    public itemSlot: ItemSlot;
    public slotMax: number;
    public isTemplate: boolean = false;

    public readonly id: number;
    public readonly uid: bigint = GuidGenerator.generateLong();
    public slot: number = -1;
    public amount: number = 1;
    public rarity: number = 0;

    public creationTime: bigint = BigInt(0);
    public expiryTime: bigint = BigInt(0);

    public timesAttributesChanged: number = 0;
    public isLocked: boolean = false;
    public unlockTime: bigint = BigInt(0);
    public remainingGlamorForges: number = 0;
    public enchants: number = 0;

    // EnchantExp (10000 = 100%) for Peachy
    public enchantExp: number = 0;
    public canRepackage: boolean = true; // if false, item becomes untradable
    public charges: number = 0;
    public transferFlag: TransferFlag = TransferFlag.None;
    public remainingTrades: number = 0;

    // For friendship badges
    public pairedCharacterId: bigint = BigInt(0);
    public pairedCharacterName: string = "";

    public owner?: Player;

    public color: ItemColor = new ItemColor(new Color(0, 0, 0, -1), new Color(0, 0, 0, -1), new Color(0, 0, 0, -1), 0);

    public hairData?: HairData;
    public faceDecorationData?: Buffer;

    public appearanceFlag?: number;

    public stats: ItemStats = new ItemStats();

    public constructor(id: number, itemSlot: ItemSlot) {
        this.id = id;
        this.inventoryTab = InventoryTab.Outfit; // TODO: read from metadata
        this.itemSlot = itemSlot; // TODO: read from metadata
        this.slotMax = 100; // TODO: read from metadata
        this.isTemplate = false; // TODO: read from metadata
    }
}
