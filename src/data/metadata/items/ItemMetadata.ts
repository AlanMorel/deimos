import { InventoryTab } from "../../../types/inventory/InventoryTab";
import { ItemSlot } from "../../../types/item/ItemSlot";

export class ItemMetadata {

    public id: number;
    public slot: ItemSlot;
    public tab: InventoryTab;
    public slotMax: number;
    public isTemplate: boolean;

    public constructor(id: number, slot: ItemSlot, tab: InventoryTab, slotMax: number, isTemplate: boolean) {
        this.id = id;
        this.slot = slot;
        this.tab = tab;
        this.slotMax = slotMax;
        this.isTemplate = isTemplate;
    }
}
