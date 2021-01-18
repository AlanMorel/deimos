import Configs from "../../Configs";
import { PacketReader } from "../../crypto/protocol/PacketReader";
import { Session } from "../../network/sessions/Session";
import { Logger } from "../../tools/Logger";

export class ResponseVersionHelper {

    public static handle(session: Session, packet: PacketReader): void {
        const version = packet.readUInt();
        // +4 Bytes CONST(2F 00 02 00)

        if (version != Configs.version) {
            Logger.error("There was a version mismatch");
        }
    }
}
