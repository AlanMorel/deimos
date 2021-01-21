import { PacketReader } from "../../crypto/protocol/PacketReader";
import { ChannelSession } from "../../network/sessions/ChannelSession";
import { UserSyncPacket } from "../../packets/UserSyncPacket";
import { SyncState } from "../../types/SyncState";
import { ChannelPacketHandler } from "../ChannelPacketHandler";

export class UserSyncHandler implements ChannelPacketHandler {

    public handle(session: ChannelSession, packet: PacketReader): void {
        packet.readByte(); // unknown mode
        packet.readInt(); // TODO:  ClientTicks
        packet.readInt(); // TODO: ServerTicks

        const segments = packet.readByte();
        if (segments < 1) {
            return;
        }

        const syncStates = new Array<SyncState>(segments);
        for (let i = 0; i < segments; i++) {
            syncStates[i] = SyncState.read(packet);

            packet.readInt(); // ClientTicks
            packet.readInt(); // ServerTicks
        }

        // not sure if this needs to be synced here
        session.player.coord = syncStates[0].coord;
        session.player.animation = syncStates[0].animation1;

        session.field?.broadcast(UserSyncPacket.syncUser(session.player, syncStates), session);
    }
}
