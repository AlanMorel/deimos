import { PacketReader } from "../crypto/protocol/PacketReader";
import { Session } from "../network/Session";

export interface PacketHandler {

    handle(packet: PacketReader, session: Session): void;

}
