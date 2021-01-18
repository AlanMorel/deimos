import { Gemstone } from "./Gemstone";
import { ItemStat } from "./ItemStat";

export class ItemStats {

    public basicAttributes: ItemStat[] = new Array<ItemStat>();
    public bonusAttributes: ItemStat[] = new Array<ItemStat>();

    public totalSockets: number = 0;
    public gemstones: Gemstone[] = new Array<Gemstone>();
}
