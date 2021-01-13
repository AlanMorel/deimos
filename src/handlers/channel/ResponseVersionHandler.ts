import { PacketReader } from "../../crypto/protocol/PacketReader";
import { Session } from "../../network/Session";
import { RequestKeyPacket } from "../../packets/RequestKeyPacket";
import { UnknownSyncPacket } from "../../packets/UnknownSyncPacket";
import { PacketHandler } from "../PacketHandler";

export class ResponseVersionHandler implements PacketHandler {

    public handle(session: Session, packet: PacketReader): void {
        const version = packet.readUInt();

        session.send(UnknownSyncPacket.sync());
        session.send(RequestKeyPacket.key());
    }
}
