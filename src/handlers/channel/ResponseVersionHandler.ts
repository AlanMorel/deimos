import { PacketReader } from "../../crypto/protocol/PacketReader";
import { ChannelSession } from "../../network/sessions/ChannelSession";
import { RequestKeyPacket } from "../../packets/RequestKeyPacket";
import { UnknownSyncPacket } from "../../packets/UnknownSyncPacket";
import { ChannelPacketHandler } from "../ChannelPacketHandler";

export class ResponseVersionHandler implements ChannelPacketHandler {

    public handle(session: ChannelSession, packet: PacketReader): void {
        const version = packet.readUInt();

        session.send(UnknownSyncPacket.sync());
        session.send(RequestKeyPacket.key());
    }
}
