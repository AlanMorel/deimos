import { Session } from "../network/Session";
import { PacketReader } from "../tools/PacketReader";

export interface PacketHandler {

    handle(packet: PacketReader, session: Session): void;

}