import { PacketReader } from "../../crypto/protocol/PacketReader";
import { PacketWriter } from "../../crypto/protocol/PacketWriter";

export class Color {

    private blue: number;
    private green: number;
    private red: number;
    private alpha: number;

    public constructor(blue: number, green: number, red: number, alpha: number) {
        this.blue = blue;
        this.green = green;
        this.red = red;
        this.alpha = alpha;
    }

    public static read(packet: PacketReader): Color {
        const blue = packet.readByte();
        const green = packet.readByte();
        const red = packet.readByte();
        const alpha = packet.readByte();

        return new Color(blue, green, red, alpha);
    }

    public static write(packet: PacketWriter, color: Color): void {
        packet.writeByte(color.blue);
        packet.writeByte(color.green);
        packet.writeByte(color.red);
        packet.writeByte(color.alpha);
    }
}
