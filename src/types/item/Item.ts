import { GuidGenerator } from "../../tools/GuidGenerator";
import { EquipColor } from "../color/EquipColor";
import { HairData } from "../HairData";
import { InventoryTab } from "../InvetoryTab";
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
    public uid: bigint;
    public slot: number;
    public amount: number;
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
    public canRepackage: boolean = false;
    public charges: number = 0;
    public transferFlag: TransferFlag = TransferFlag.None;
    public remainingTrades: number = 0;

    // For friendship badges
    public pairedCharacterId: bigint = BigInt(0);
    public pairedCharacterName: string = "";

    public owner?: Player;

    public color?: EquipColor;

    public hairData?: HairData;

    public faceDecorationData?: Buffer;
    public appearanceFlag?: number;

    public stats: ItemStats;

    public constructor(id: number) {
        this.id = id;
        this.uid = GuidGenerator.generateLong();
        this.inventoryTab = InventoryTab.Outfit; // TODO: read from metadata
        this.itemSlot = ItemSlot.CL; // TODO: read from metadata
        this.slotMax = 100; // TODO: read from metadata
        this.isTemplate = false; // TODO: read from metadata
        this.slot = -1;
        this.amount = 1;
        this.stats = new ItemStats();
        this.canRepackage = true; // if false, item becomes untradable
    }
}
