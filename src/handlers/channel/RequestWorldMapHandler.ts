import { PacketReader } from "../../crypto/protocol/PacketReader";
import { ChannelSession } from "../../network/sessions/ChannelSession";
import { WorldMapPacket } from "../../packets/WorldMapPacket";
import { ChannelPacketHandler } from "../ChannelPacketHandler";

export class RequestWorldMap implements ChannelPacketHandler {
    public handle(session: ChannelSession, packet: PacketReader): void {
        const mode: number = packet.readByte();

        switch (mode) {
            case 0:
                session.send(WorldMapPacket.openMap());
                break;
        }
        packet.readByte(); // unused byte
        const tab: number = packet.readInt(); // tab number
    }
}
