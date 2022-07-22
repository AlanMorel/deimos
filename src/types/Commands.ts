import { ChannelSession } from "@/network/sessions/ChannelSession";
import { ChatPacket } from "@/packets/ChatPacket";
import { UserSyncPacket } from "@/packets/UserSyncPacket";
import { ChatType } from "@/types/ChatType";
import { CoordS } from "@/types/coords/CoordS";
import { SyncState } from "@/types/SyncState";

export class Commands {
    public static process(session: ChannelSession, command: string): boolean {
        const args = command.toLowerCase().split(" ");

        switch (args[0]) {
            case "coord":
                this.handleCoordCommand(session);
                return true;
            case "teleport":
                this.handleTeleportCommand(session, args);
                return true;
        }

        return false;
    }

    private static handleCoordCommand(session: ChannelSession): void {
        const message = session.player.coord.toString();
        session.send(ChatPacket.send(session, message, ChatType.All));
    }

    private static handleTeleportCommand(session: ChannelSession, args: string[]): void {
        const x = parseInt(args[1]);
        const y = parseInt(args[2]);
        const z = parseInt(args[3]);

        const newCoord = new CoordS(x, y, z);

        const syncState = new SyncState();
        syncState.coord = newCoord;

        session.player.coord = newCoord;
        session.field?.broadcast(UserSyncPacket.syncUser(session.player, [syncState]));
    }
}
