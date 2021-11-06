import { PacketReader } from "../../crypto/protocol/PacketReader";
import { Session } from "../../network/sessions/Session";
import { Logger } from "../../tools/Logger";

export class LogSendHelper {
    public static handle(session: Session, packet: PacketReader): void {
        packet.readByte();
        const mode = packet.readByte();
        if (mode === 1) {
            // Some random data that isn't text...
            // Example: 56 00 00 01 03 03 00 66 70 73 9B D2 6A 42 29 73 07 44 A3 45 00 00 00 00 00 00 00 00 70 42 03 00 6D 65 6D BC 2E 01 45 B4 FA B3 43 A3 45 00 00 00 A0 FE 44 00 80 01 45 03 00 6C 61 74 00 00 00 00 00 00 00 00 A3 45 00 00 00 00 00 00 00 00 00 00
            return;
        }
        try {
            let builder = "";
            while (packet.available() > 2) {
                const message = packet.readUnicodeString();

                if (message.includes("exception")) {
                    const debug = packet.readUnicodeString();
                    Logger.log(`[${message}] ${debug}`);
                    return;
                }

                builder += message;
            }
            Logger.log(`Client Log: ${builder}`);
        } catch (error) {
            Logger.log(`Error parsing DEBUG_MSG packet:${packet} mode(${mode})`);
        }
    }
}
