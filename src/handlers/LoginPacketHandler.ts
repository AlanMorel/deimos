import { PacketReader } from "@/crypto/protocol/PacketReader";
import { PacketHandler } from "@/handlers/PacketHandler";
import { LoginSession } from "@/network/sessions/LoginSession";

export abstract class LoginPacketHandler implements PacketHandler {
    public abstract handle(session: LoginSession, packet: PacketReader): void;
}
