import { InventoryTab } from "../../../types/inventory/InventoryTab";
import { MetadataStorage } from "../MetadataStorage";
import { ItemMetadata } from "./ItemMetadata";

export class ItemMetadataStorage extends MetadataStorage<ItemMetadata> {
    public getTab(id: number): InventoryTab {
        return this.getItem(id)?.tab ?? InventoryTab.OUTFIT;
    }

    public getSlot(id: number): number {
        return this.getItem(id)?.slot ?? 0;
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
            const itemMetadata = new ItemMetadata(
                item.id,
                item.name,
                item.slot,
                item.gem,
                item.medal,
                item.tab,
                item.rarity,
                item.stackLimit,
                item.enableBreak,
                item.sellable,
                item.transferType,
                item.tradeableCount,
                item.repackagedCount,
                item.repackageItemConsumeCount,
                item.isTwoHand,
                item.isDress,
                item.isTemplate,
                item.gender,
                item.playCount,
                item.isCustomScore,
                item.sellPrice,
                item.sellPriceCustom,
                item.fileName,
                item.skillId,
                item.recommendedJobs,
                item.breakRewards,
                item.functionData,
                item.tag,
                item.shopId,
                item.level,
                item.hairPresets,
                item.colorIndex,
                item.colorPalette,
                item.optionStatic,
                item.optionRandom,
                item.optionConstant,
                item.optionLevelFactor,
                item.isCubeSolid,
                item.housingCategory,
                item.objectId,
                item.blackMarketCategory,
                item.category
            );
            this.storage.set(item.id, itemMetadata);
        });
    }
}
