import { PacketReader } from "@/crypto/protocol/PacketReader";
import { ChannelPacketHandler } from "@/handlers/ChannelPacketHandler";
import { ChannelSession } from "@/network/sessions/ChannelSession";
import { LoadUgcMapPacket } from "@/packets/LoadUgcMapPacket";

export class ResponseLoadUgcMapHandler implements ChannelPacketHandler {
    public handle(session: ChannelSession, packet: PacketReader): void {
        session.send(LoadUgcMapPacket.loadMap());
    }
}
