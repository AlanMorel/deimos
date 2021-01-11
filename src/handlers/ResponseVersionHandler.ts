import { PacketReader } from "../crypto/protocol/PacketReader";
import { Session } from "../network/Session";
import { RequestLoginPacket } from "../packets/RequestLoginPacket";
import { PacketHandler } from "./PacketHandler";

export class ResponseVersionHandler implements PacketHandler {

    public handle(packet: PacketReader, session: Session): void {
        session.send(RequestLoginPacket.login());
    }
}
