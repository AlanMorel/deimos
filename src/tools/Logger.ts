import { HexColor } from "./HexColor";

interface Color {
    r: number,
    b: number,
    g: number
};

export class Logger {

    public static log(message: string, hex: HexColor): void {
        const color = this.hexToColor(hex);
        console.log("\u001b[38;2;" + color.r + ";" + color.g + ";" + color.b + "m" + message + "\u001b[0m");
    }

    private static hexToColor(color: number): Color {
        const r = color >> 16;
        const g = color >> 8 & 0xFF;
        const b = color & 0xFF;

        return { r, g, b };
    }
}
