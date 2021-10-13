import { PacketReader } from "../../crypto/protocol/PacketReader";
import { ChannelSession } from "../../network/sessions/ChannelSession";
import { LoadUgcMapPacket } from "../../packets/LoadUgcMapPacket";
import { ChannelPacketHandler } from "../ChannelPacketHandler";

export class ResponseLoadUgcMapHandler implements ChannelPacketHandler {
    public handle(session: ChannelSession, packet: PacketReader): void {
        session.send(LoadUgcMapPacket.loadMap());
    }
}
