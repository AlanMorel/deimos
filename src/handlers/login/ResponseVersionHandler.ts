import { PacketReader } from "../../crypto/protocol/PacketReader";
import { LoginSession } from "../../network/sessions/LoginSession";
import { RequestLoginPacket } from "../../packets/RequestLoginPacket";
import { LoginPacketHandler } from "../LoginPacketHandler";

export class ResponseVersionHandler implements LoginPacketHandler {

    public handle(session: LoginSession, packet: PacketReader): void {
        const version = packet.readUInt();

        session.send(RequestLoginPacket.login());
    }
}
