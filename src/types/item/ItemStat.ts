import { PacketWriter } from "../../crypto/protocol/PacketWriter";
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

    public static write(packet: PacketWriter, itemStat: ItemStat): void {
        packet.writeShort(itemStat.type);
        packet.writeInt(itemStat.value);
        packet.writeInt(itemStat.percent);
    }
}
