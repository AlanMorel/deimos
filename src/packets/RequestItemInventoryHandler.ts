import { PacketReader } from "../crypto/protocol/PacketReader";
import { ChannelPacketHandler } from "../handlers/ChannelPacketHandler";
import { ChannelSession } from "../network/sessions/ChannelSession";
import { Logger } from "../tools/Logger";

enum Mode {
    Move = 0x3,
    Drop = 0x4,
    DropBound = 0x5,
    Sort = 0xa
}

export class RequestItemInventoryhandler implements ChannelPacketHandler {
    public handle(session: ChannelSession, packet: PacketReader): void {
        const mode = packet.readByte();

        switch (mode) {
            case Mode.Move:
                this.handleMove(session, packet);
                break;
            case Mode.Drop:
                this.handleDrop(session, packet);
                break;
            case Mode.DropBound:
                this.handleDropBound(session, packet);
                break;
            case Mode.Sort:
                this.handleSort(session, packet);
                break;
            default:
                Logger.unknownMode(this, mode);
                break;
        }
    }

    private handleMove(session: ChannelSession, packet: PacketReader): void {
        const uid = packet.readLong();
        const dstSlot = packet.readShort();
        session.player.inventory.moveItem(session, uid, dstSlot);
    }

    private handleDrop(session: ChannelSession, packet: PacketReader): void {
        // TODO: make sure items are tradable?
        const uid = packet.readLong();
        const amount = packet.readInt();
        session.player.inventory.dropItem(session, uid, amount, false);
    }

    private handleDropBound(session: ChannelSession, packet: PacketReader): void {
        const uid = packet.readLong();
        session.player.inventory.dropItem(session, uid, 0, true);
    }

    private handleSort(session: ChannelSession, packet: PacketReader): void {
        const tab = packet.readShort();
        session.player.inventory.sortInventory(session, tab);
    }
}
