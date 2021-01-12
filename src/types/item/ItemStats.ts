import { Gemstone } from "./Gemstone";
import { ItemStat } from "./ItemStat";

export class ItemStats {

    public basicAttributes: Array<ItemStat>;
    public bonusAttributes: Array<ItemStat>;

    public totalSockets: number = 0;
    public gemstones: Array<Gemstone>;

    public constructor() {
        this.basicAttributes = new Array<ItemStat>();
        this.bonusAttributes = new Array<ItemStat>();
        this.gemstones = new Array<Gemstone>();
    }
}
