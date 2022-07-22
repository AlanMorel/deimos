import { Gemstone } from "@/types/item/Gemstone";
import { ItemStat } from "@/types/item/ItemStat";

export class ItemStats {
    public basicAttributes: ItemStat[] = new Array<ItemStat>();
    public bonusAttributes: ItemStat[] = new Array<ItemStat>();

    public totalSockets: number = 0;
    public gemstones: Gemstone[] = new Array<Gemstone>();
}
