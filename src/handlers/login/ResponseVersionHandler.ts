import { PacketReader } from "../../crypto/protocol/PacketReader";
import { Session } from "../../network/Session";
import { RequestLoginPacket } from "../../packets/RequestLoginPacket";
import { LoginPacketHandler } from "../LoginPacketHandler";

export class ResponseVersionHandler implements LoginPacketHandler {

    public handle(session: Session, packet: PacketReader): void {
        const version = packet.readUInt();

        session.send(RequestLoginPacket.login());
    }
}
