import { PacketReader } from "../crypto/protocol/PacketReader";
import { LoginSession } from "../network/sessions/LoginSession";
import { PacketHandler } from "./PacketHandler";

export abstract class LoginPacketHandler implements PacketHandler {

    public abstract handle(session: LoginSession, packet: PacketReader): void;

}