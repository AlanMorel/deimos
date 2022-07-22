import { PacketReader } from "@/crypto/protocol/PacketReader";
import { ResponseVersionHelper } from "@/handlers/helpers/ResponseVersionHelper";
import { LoginPacketHandler } from "@/handlers/LoginPacketHandler";
import { LoginSession } from "@/network/sessions/LoginSession";
import { RequestLoginPacket } from "@/packets/RequestLoginPacket";

export class ResponseVersionHandler implements LoginPacketHandler {
    public handle(session: LoginSession, packet: PacketReader): void {
        ResponseVersionHelper.handle(session, packet);

        session.send(RequestLoginPacket.login());
    }
}
