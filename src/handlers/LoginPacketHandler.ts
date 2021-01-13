import { PacketReader } from "../crypto/protocol/PacketReader";
import { Session } from "../network/Session";
import { PacketHandler } from "./PacketHandler";

export abstract class LoginPacketHandler implements PacketHandler {

    public abstract handle(session: Session, packet: PacketReader): void;

}