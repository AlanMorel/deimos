import { InventoryTab } from "../../types/inventory/InventoryTab";
import { ItemSlot } from "../../types/item/ItemSlot";

export interface ItemMetadataInterface {
    id: number;
    slot: ItemSlot;
    tab: InventoryTab;
    slotMax: number;
    isTemplate: boolean;
}

export class ItemMetadata implements ItemMetadataInterface {

    private static readonly storage = new Map<number, ItemMetadata>();

    public id: number;
    public slot: ItemSlot;
    public tab: InventoryTab;
    public slotMax: number;
    public isTemplate: boolean;

    private constructor(id: number, slot: ItemSlot, tab: InventoryTab, slotMax: number, isTemplate: boolean) {
        this.id = id;
        this.slot = slot;
        this.tab = tab;
        this.slotMax = slotMax;
        this.isTemplate = isTemplate;
    }

    public static getTab(id: number): InventoryTab {
        return this.getItem(id)?.tab ?? InventoryTab.Outfit;
    }

    public static getSlot(id: number): number {
        return this.getItem(id)?.slot ?? 0;
    }

    public static getSlotMax(id: number): number {
        return this.getItem(id)?.slotMax ?? 1;
    }

    public static getIsTemplate(id: number): boolean {
        return this.getItem(id)?.isTemplate ?? false;
    }

    private static getItem(id: number): ItemMetadata | undefined {
        return this.storage.get(id);
    }

    public static load(items: Array<ItemMetadataInterface>): void {
        items.forEach(item => {
            const slotName = item.slot ? item.slot : ItemSlot[ItemSlot.NONE];
            const slot = ItemSlot[slotName as keyof typeof ItemSlot];

            const tabName = item.tab ? item.tab : InventoryTab[InventoryTab.Outfit];
            const tab = InventoryTab[tabName as keyof typeof InventoryTab];

            const slotMax = item.slotMax ?? 1;

            const isTemplate = item.isTemplate ?? false;

            const itemMetadata = new ItemMetadata(item.id, slot, tab, slotMax, isTemplate);
            this.storage.set(item.id, itemMetadata);
        });
    }
}
