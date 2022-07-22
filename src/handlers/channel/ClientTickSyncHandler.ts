import { PacketReader } from "@/crypto/protocol/PacketReader";
import { ChannelPacketHandler } from "@/handlers/ChannelPacketHandler";
import { ChannelSession } from "@/network/sessions/ChannelSession";

export class ClientTickSyncHandler implements ChannelPacketHandler {
    public handle(session: ChannelSession, packet: PacketReader): void {
        const serverTicks = packet.readInt();

        if (serverTicks === session.serverTick) {
            session.clientTick = packet.readInt();
        }
    }
}
