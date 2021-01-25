import { InventoryTab } from "../../../types/inventory/InventoryTab";
import { ItemSlot } from "../../../types/item/ItemSlot";
import { MetadataStorage } from "../MetadataStorage";
import { ItemMetadata } from "./ItemMetadata";

export class ItemMetadataStorage extends MetadataStorage<ItemMetadata> {

    public getTab(id: number): InventoryTab {
        return this.getItem(id)?.tab ?? InventoryTab.Outfit;
    }

    public getSlot(id: number): number {
        return this.getItem(id)?.slot ?? 0;
    }

    public getSlotMax(id: number): number {
        return this.getItem(id)?.slotMax ?? 1;
    }

    public getIsTemplate(id: number): boolean {
        return this.getItem(id)?.isTemplate ?? false;
    }

    public getItem(id: number): ItemMetadata | undefined {
        return this.storage.get(id);
    }

    public load(items: ItemMetadata[]): void {
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
