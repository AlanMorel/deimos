import { PacketWriter } from "@/crypto/protocol/PacketWriter";

export class PlayerStat {
    public total: number;
    public min: number;
    public max: number;

    public constructor(total: number, min: number, max: number) {
        this.total = total;
        this.min = min;
        this.max = max;
    }

    public static write(packet: PacketWriter, stat: PlayerStat): void {
        packet.writeInt(stat.total);
        packet.writeInt(stat.min);
        packet.writeInt(stat.max);
    }
}
