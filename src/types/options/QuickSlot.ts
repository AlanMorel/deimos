import { PacketWriter } from "../../crypto/protocol/PacketWriter";

export class QuickSlot {
    public skillId: number = 0;
    public itemId: number = 0;
    public itemUid: BigInt = 0n;

    public constructor(skillId: number = 0, itemId: number = 0, itemUid: BigInt = 0n) {
        this.skillId = skillId;
        this.itemId = itemId;
        this.itemUid = itemUid;
    }

    public static write(packet: PacketWriter, quickSlot: QuickSlot): void {
        packet.writeInt(quickSlot.skillId);
        packet.writeInt(quickSlot.itemId);
        packet.writeBigInt(quickSlot.itemUid);
    }
}
