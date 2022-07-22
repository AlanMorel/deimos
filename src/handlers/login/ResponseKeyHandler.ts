import { PacketReader } from "@/crypto/protocol/PacketReader";
import { ResponseKeyHelper } from "@/handlers/helpers/ReponseKeyHelper";
import { LoginPacketHandler } from "@/handlers/LoginPacketHandler";
import { LoginSession } from "@/network/sessions/LoginSession";

export class ResponseKeyHandler implements LoginPacketHandler {
    public handle(session: LoginSession, packet: PacketReader): void {
        session.accountId = packet.readLong();

        // backwards seeking because we read accountId here
        packet.skip(-8);

        ResponseKeyHelper.handle(session, packet);
    }
}
