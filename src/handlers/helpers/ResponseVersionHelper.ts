import { PacketReader } from "../../crypto/protocol/PacketReader";
import { Session } from "../../network/sessions/Session";

export class ResponseVersionHelper {

    public static handle(session: Session, packet: PacketReader): void {
        const version = packet.readUInt();
        // +4 Bytes CONST(2F 00 02 00)

        // TODO: disconnect/log if version mismatch
    }
}
