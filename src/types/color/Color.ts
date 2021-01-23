import { PacketReader } from "../../crypto/protocol/PacketReader";
import { PacketWriter } from "../../crypto/protocol/PacketWriter";
import { BitConverter } from "../../tools/BitConverter";

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

    public static toValue(color: Color): number {
        const buffer = Buffer.from([color.blue, color.green, color.red, color.alpha]);
        return BitConverter.toInt32(buffer);
    }

    public static fromValue(value: number): Color {
        const colors = BitConverter.intToBytes(value);

        const blue = colors.readInt8(0);
        const green = colors.readInt8(1);
        const red = colors.readInt8(2);
        const alpha = colors.readInt8(3);

        return new Color(blue, green, red, alpha);
    }
}
