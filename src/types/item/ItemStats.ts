import { Gemstone } from "./Gemstone";
import { ItemStat } from "./ItemStat";

export class ItemStats {

    public basicAttributes: Array<ItemStat> = new Array<ItemStat>();
    public bonusAttributes: Array<ItemStat> = new Array<ItemStat>();

    public totalSockets: number = 0;
    public gemstones: Array<Gemstone> = new Array<Gemstone>();
}
