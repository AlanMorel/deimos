import Configs from "../Configs";
import { Packet } from "../crypto/protocol/Packet";
import { PacketHandler } from "../handlers/PacketHandler";
import { HexColor } from "./HexColor";

interface Color {
    r: number;
    b: number;
    g: number;
}

export class Logger {
    public static log(message: string, hex: HexColor = HexColor.BLUE): void {
        const color = this.hexToColor(hex);
        console.log("\u001b[38;2;" + color.r + ";" + color.g + ";" + color.b + "m" + message + "\u001b[0m");
    }

    public static error(error: string): void {
        this.log(error, HexColor.ORANGE);
    }

    public static debug(message: string, hex: HexColor = HexColor.PURPLE): void {
        if (Configs.settings.logDebugs) {
            this.log(message, hex);
        }
    }

    public static send(opcode: string, packet: Packet): void {
        this.packet("SEND", opcode, packet, HexColor.RED);
    }

    public static recv(opcode: string, packet: Packet): void {
        this.packet("RECV", opcode, packet, HexColor.GREEN);
    }

    public static packet(prefix: string, opcode: string, packet: Packet, color: HexColor): void {
        if (Configs.settings.logPackets) {
            this.log("[" + prefix + "] " + opcode + ": " + packet.toString(), color);
        }
    }

    public static unknownMode(handler: PacketHandler, mode: number): void {
        this.error("Unknown mode 0x" + mode.toString(16).toUpperCase() + " in " + handler.constructor.name);
    }

    private static hexToColor(color: number): Color {
        const r = color >> 16;
        const g = (color >> 8) & 0xff;
        const b = color & 0xff;

        return { r, g, b };
    }
}
