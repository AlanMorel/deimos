import { PacketReader } from "../../crypto/protocol/PacketReader";

export class Color {

    private alpha: number;
    private red: number;
    private green: number;
    private blue: number;

    private constructor(alpha: number, red: number, green: number, blue: number) {
        this.alpha = alpha;
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    public static read(packet: PacketReader): Color {
        const alpha = packet.readByte();
        const red = packet.readByte();
        const green = packet.readByte();
        const blue = packet.readByte();

        return new Color(alpha, red, green, blue);
    }
}
