import { PacketReader } from "../../crypto/protocol/PacketReader";
import { LoginSession } from "../../network/sessions/LoginSession";
import { LoginPacketHandler } from "../LoginPacketHandler";

export class ResponseKeyHandler implements LoginPacketHandler {

    public handle(session: LoginSession, packet: PacketReader): void {
        session.accountId = packet.readLong();
    }
}
