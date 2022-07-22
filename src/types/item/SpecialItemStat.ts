import { PacketWriter } from "@/crypto/protocol/PacketWriter";
import { SpecialItemAttribute } from "@/types/item/SpecialItemAttribute";

export class SpecialItemStat {
    public type: SpecialItemAttribute;
    public value: number;
    public unknown: number;

    public constructor(type: SpecialItemAttribute, value: number, unknown: number) {
        this.type = type;
        this.value = value;
        this.unknown = unknown;
    }

    public static write(packet: PacketWriter, specialItemStat: SpecialItemStat): void {
        packet.writeShort(specialItemStat.type);
        packet.writeInt(specialItemStat.value);
        packet.writeInt(specialItemStat.unknown);
    }
}
