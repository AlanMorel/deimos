import { BlockList } from "net";
import { PacketReader } from "../../crypto/protocol/PacketReader";
import { MapMetadata } from "../../data/metadata/maps/MapMetadata";
import { MapMetadataStorage } from "../../data/metadata/maps/MapMetadataStorage";
import { ChannelSession } from "../../network/sessions/ChannelSession";
import { UserSyncPacket } from "../../packets/UserSyncPacket";
import { CoordF } from "../../types/coords/CoordF";
import { CoordS } from "../../types/coords/CoordS";
import { Player } from "../../types/player/Player";
import { SyncState } from "../../types/SyncState";
import { ChannelPacketHandler } from "../ChannelPacketHandler";

export class UserSyncHandler implements ChannelPacketHandler {
    public handle(session: ChannelSession, packet: PacketReader): void {
        packet.readByte(); // unknown mode
        session.clientTick = packet.readInt();
        session.serverTick = packet.readInt();

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

    public updatePlayer(session: ChannelSession, syncStates: SyncState[]): void {
        const { player } = session;

        const coord = new CoordF(syncStates[0].coord.x, syncStates[0].coord.y, syncStates[0].coord.z);
        const coordUnderneath = new CoordF(syncStates[0].coord.x, syncStates[0].coord.y, syncStates[0].coord.z - 50);

        const blockUnderneath = null;
        // if(isCoordSafe)
    }

    private isCoordSafe(player: Player, currentCoord: CoordS, closestCoord: CoordF): boolean {
        // MapMetadataStorage
        return false;
    }
}
