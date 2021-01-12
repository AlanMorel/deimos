import { PacketReader } from "../../crypto/protocol/PacketReader";
import { PacketWriter } from "../../crypto/protocol/PacketWriter";

export class Color {

    private alpha: number;
    private red: number;
    private green: number;
    private blue: number;

    public constructor(alpha: number, red: number, green: number, blue: number) {
        this.alpha = alpha;
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    public static read(packet: PacketReader): Color {
        const blue = packet.readByte();
        const green = packet.readByte();
        const red = packet.readByte();
        const alpha = packet.readByte();

        return new Color(alpha, red, green, blue);
    }

    public static write(packet: PacketWriter, color: Color): void {
        packet.writeByte(color.blue);
        packet.writeByte(color.green);
        packet.writeByte(color.red);
        packet.writeByte(color.alpha);
    }
}
