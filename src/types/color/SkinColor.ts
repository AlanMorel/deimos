import { PacketReader } from "@/crypto/protocol/PacketReader";
import { PacketWriter } from "@/crypto/protocol/PacketWriter";
import { Color } from "@/types/color/Color";

export class SkinColor {
    public primary: Color;
    public secondary: Color;

    public constructor(primary: Color, secondary: Color) {
        this.primary = primary;
        this.secondary = secondary;
    }

    public static read(packet: PacketReader): SkinColor {
        const primary = Color.read(packet);
        const secondary = Color.read(packet);

        return new SkinColor(primary, secondary);
    }

    public static write(packet: PacketWriter, skinColor: SkinColor): void {
        Color.write(packet, skinColor.primary);
        Color.write(packet, skinColor.secondary);
    }
}
