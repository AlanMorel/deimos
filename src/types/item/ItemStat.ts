import { ItemAttribute } from "./ItemAttribute";

export class ItemStat {
    public type: ItemAttribute;
    public value: number;
    public percent: number;

    public constructor(type: ItemAttribute, value: number, percent: number) {
        this.type = type;
        this.value = value;
        this.percent = percent;
    }
}
