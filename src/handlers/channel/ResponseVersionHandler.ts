import { PacketReader } from "@/crypto/protocol/PacketReader";
import { ChannelPacketHandler } from "@/handlers/ChannelPacketHandler";
import { ResponseVersionHelper } from "@/handlers/helpers/ResponseVersionHelper";
import { ChannelSession } from "@/network/sessions/ChannelSession";
import { RequestKeyPacket } from "@/packets/RequestKeyPacket";
import { UnknownSyncPacket } from "@/packets/UnknownSyncPacket";

export class ResponseVersionHandler implements ChannelPacketHandler {
    public handle(session: ChannelSession, packet: PacketReader): void {
        ResponseVersionHelper.handle(session, packet);

        session.send(UnknownSyncPacket.sync());
        session.send(RequestKeyPacket.key());
    }
}
