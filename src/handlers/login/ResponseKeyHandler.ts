import { PacketReader } from "../../crypto/protocol/PacketReader";
import { LoginSession } from "../../network/sessions/LoginSession";
import { ResponseKeyHelper } from "../helpers/ReponseKeyHelper";
import { LoginPacketHandler } from "../LoginPacketHandler";

export class ResponseKeyHandler implements LoginPacketHandler {
    public handle(session: LoginSession, packet: PacketReader): void {
        session.accountId = packet.readLong();

        // backwards seeking because we read accountId here
        packet.skip(-8);

        ResponseKeyHelper.handle(session, packet);
    }
}
