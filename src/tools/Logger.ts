import chalk from "chalk";
import Configs from "../Configs";
import { Packet } from "../crypto/protocol/Packet";
import { PacketHandler } from "../handlers/PacketHandler";

export class Logger {
    public static log(message: string, chalkConfig: chalk.Chalk = chalk.blue, prefix: string = "log"): void {
        let content = `${chalkConfig(message)}`;

        if (Configs.settings.logPrefix) {
            content = `${chalkConfig(`[${prefix.toUpperCase()}]`)} ${content}`;
        }

        if (Configs.settings.logTimestamps) {
            const timestamp = this.getTimestamp();
            content = `${chalk.gray(timestamp)} ${content}`;
        }

        console.log(`${content}`);
    }

    public static error(error: string): void {
        this.log(error, chalk.bgRed.whiteBright, "error");
    }

    public static debug(message: string, chalkConfig: chalk.Chalk = chalk.magenta): void {
        if (Configs.settings.logDebugs) {
            this.log(message, chalkConfig, "debug");
        }
    }

    public static send(opcode: string, packet: Packet): void {
        this.packet("SEND", opcode, packet, chalk.red);
    }

    public static recv(opcode: string, packet: Packet): void {
        this.packet("RECV", opcode, packet, chalk.green);
    }

    public static packet(prefix: string, opcode: string, packet: Packet, chalkConfig: chalk.Chalk): void {
        if (Configs.settings.logPackets) {
            this.log(`${opcode} ${packet.toString()}`, chalkConfig, prefix);
        }
    }

    public static unknownMode(handler: PacketHandler, mode: number): void {
        this.error(`Unknown mode 0x${mode.toString(16).toUpperCase()} in ${handler.constructor.name}`);
    }

    private static getTimestamp(): string {
        return new Date().toLocaleDateString("en-US", Configs.settings.timestampOptions);
    }
}
