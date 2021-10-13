import { PacketReader } from "../../crypto/protocol/PacketReader";
import { ChannelSession } from "../../network/sessions/ChannelSession";
import { ChannelPacketHandler } from "../ChannelPacketHandler";

export class ClientTickSyncHandler implements ChannelPacketHandler {
    public handle(session: ChannelSession, packet: PacketReader): void {
        const serverTicks = packet.readInt();

        if (serverTicks == session.serverTick) {
            session.clientTick = packet.readInt();
        }
    }
}
