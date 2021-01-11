import { PacketReader } from "../crypto/protocol/PacketReader";
import { Session } from "../network/Session";

export interface PacketHandler {

    handle(session: Session, packet: PacketReader): void;

}
