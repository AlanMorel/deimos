import { PacketReader } from "../crypto/protocol/PacketReader";
import { Session } from "../network/sessions/Session";

export interface PacketHandler {
    handle(session: Session, packet: PacketReader): void;
}
