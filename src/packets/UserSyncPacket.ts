import { SendOp } from "@/constants/SendOp";
import { Packet } from "@/crypto/protocol/Packet";
import { PacketWriter } from "@/crypto/protocol/PacketWriter";
import { Player } from "@/types/player/Player";
import { SyncState } from "@/types/SyncState";

export class UserSyncPacket {
    public static syncUser(player: Player, syncStates: SyncState[]): Packet {
        const packet = new PacketWriter();

        packet.writeShort(SendOp.USER_SYNC);
        packet.writeInt(player.objectId);

        packet.writeByte(syncStates.length);
        for (const syncState of syncStates) {
            SyncState.write(packet, syncState);
        }

        return packet;
    }
}
