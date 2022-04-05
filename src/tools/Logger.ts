import { bgRed, blue, gray, green, magenta, red } from "picocolors";
import { Formatter } from "picocolors/types";
import Configs from "../Configs";
import { Packet } from "../crypto/protocol/Packet";
import { PacketHandler } from "../handlers/PacketHandler";

export class Logger {
    public static log(message: string, formatter: Formatter = blue, prefix: string = "log"): void {
        let content = `${formatter(message)}`;

        if (Configs.settings.logPrefix) {
            content = `${formatter(`[${prefix.toUpperCase()}]`)} ${content}`;
        }

        if (Configs.settings.logTimestamps) {
            const timestamp = this.getTimestamp();
            content = `${gray(timestamp)} ${content}`;
        }

        console.log(`${content}`);
    }

    public static error(error: string): void {
        this.log(error, bgRed, "error");
    }

    public static debug(message: string, formatter: Formatter = magenta): void {
        if (Configs.settings.logDebugs) {
            this.log(message, formatter, "debug");
        }
    }

    public static send(opcode: string, packet: Packet): void {
        this.packet("SEND", opcode, packet, red);
    }

    public static recv(opcode: string, packet: Packet): void {
        this.packet("RECV", opcode, packet, green);
    }

    public static packet(prefix: string, opcode: string, packet: Packet, formatter: Formatter): void {
        if (Configs.settings.logPackets) {
            this.log(`${opcode} ${packet.toString()}`, formatter, prefix);
        }
    }

    public static unknownMode(handler: PacketHandler, mode: number): void {
        this.error(`Unknown mode 0x${mode.toString(16).toUpperCase()} in ${handler.constructor.name}`);
    }

    private static getTimestamp(): string {
        return new Date().toLocaleDateString("en-US", Configs.settings.timestampOptions);
    }
}
