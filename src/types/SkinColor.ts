import { PacketReader } from "../crypto/protocol/PacketReader";
import { Color } from "./Color";

export class SkinColor {

    private primary: Color;
    private secondary: Color;

    private constructor(primary: Color, secondary: Color) {
        this.primary = primary;
        this.secondary = secondary;
    }

    public static read(packet: PacketReader): SkinColor {
        const primary = Color.read(packet);
        const secondary = Color.read(packet);

        return new SkinColor(primary, secondary);
    }
}
