import { InventoryTab } from "../../../types/inventory/InventoryTab";
import { ItemSlot } from "../../../types/item/ItemSlot";
import { MetadataStorage } from "../MetadataStorage";
import { ItemMetadata } from "./ItemMetadata";

export class ItemMetadataStorage extends MetadataStorage<ItemMetadata> {
    public getTab(id: number): InventoryTab {
        return InventoryTab[this.getItem(id)?.tab ?? "OUTFIT"];
    }

    public getSlot(id: number): ItemSlot {
        return ItemSlot[this.getItem(id)?.slot ?? "NONE"];
    }

    public getSlotMax(id: number): number {
        return 1;
    }

    public getIsTemplate(id: number): boolean {
        return this.getItem(id)?.isTemplate ?? false;
    }

    public getItem(id: number): ItemMetadata | undefined {
        return this.storage.get(id);
    }

    public load(items: ItemMetadata[]): void {
        items.forEach(item => {
            this.storage.set(item.id, item);
        });
    }
}
